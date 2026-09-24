// Requires `npm run build` and the standalone collector running locally.
// Owns and always stops its preview process; never changes the dev server/env files.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { mkdir } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { chromium } from 'playwright'

const collectorUrl = process.env.AIRSPACE_COLLECTOR_TEST_URL || 'http://127.0.0.1:8080'
const base = 'http://127.0.0.1:3001'
const output = join(tmpdir(), 'portfolio-airspace-collector')
const health = await (await fetch(`${collectorUrl}/readyz`)).json()
assert.ok(health.feeds.aircraft.available && !health.feeds.aircraft.delayed, 'collector must have current live data')
try {
  await fetch(base, { signal: AbortSignal.timeout(1000) })
  throw new Error('Port 3001 is occupied; leave the existing server alone')
} catch (error) { if (error.message.includes('occupied')) throw error }
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3001'], {
  cwd: process.cwd(), env: { ...process.env, AIRSPACE_SERVICE_URL: collectorUrl }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
})
let logs = '', browser
server.stdout.on('data', chunk => { logs += chunk })
server.stderr.on('data', chunk => { logs += chunk })
try {
  for (let attempt = 0; attempt < 40; attempt++) {
    try { if ((await fetch(base, { signal: AbortSignal.timeout(1000) })).ok) break } catch { /* starting */ }
    assert.equal(server.exitCode, null, logs)
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  const source = await (await fetch(`${collectorUrl}/v1/snapshot`)).json()
  const apiResponse = await fetch(`${base}/api/aircraft`)
  const api = await apiResponse.json()
  assert.equal(apiResponse.status, 200)
  assert.equal(api.ok, true)
  assert.ok(Math.abs(api.checkedAt - source.aircraft.checkedAt) <= 30000, 'portfolio reads a recent collector observation within its cache window')
  assert.ok(Date.now() - api.observedAt < 60000)
  const weather = await (await fetch(`${base}/api/airport-weather`)).json()
  assert.equal(weather.observedAt, source.weather.observedAt)
  await mkdir(output, { recursive: true })
  browser = await chromium.launch()
  const errors = []
  for (const width of [1440, 834, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
    page.on('pageerror', error => errors.push(error.message))
    await page.goto(base)
    await page.getByRole('button', { name: 'Prague airspace', exact: true }).click()
    const panel = page.locator('.airspace-panel')
    await page.waitForFunction(() => /LIVE|NO REPORTS/.test(document.querySelector('.airspace-badge')?.textContent || ''))
    assert.ok(!await panel.innerText().then(text => text.includes('TEST DATA')), 'actual provider data only')
    assert.ok(await panel.evaluate(node => node.scrollWidth <= node.clientWidth))
    const marker = panel.locator('button[data-aircraft-id]').first()
    if (await marker.count()) {
      await marker.focus(); await page.keyboard.press('Enter'); await panel.locator('.airspace-selected').waitFor()
      await page.waitForFunction(() => !document.querySelector('.airspace-selected')?.textContent.includes('Loading'))
    }
    await page.screenshot({ path: join(output, `${width}.png`) })
    await page.close()
  }
  assert.deepEqual(errors, [])
  console.log(`Collector → production API → browser verified at 1440/834/390px. ${api.aircraft.length} real aircraft. Screenshots: ${output}`)
} finally {
  await browser?.close()
  server.kill()
}
