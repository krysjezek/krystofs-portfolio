// Verify a real Vercel deployment; optional Netscape cookie jar from `vercel curl`.
// Cookies stay in the ignored .vercel directory and are never printed.
import assert from 'node:assert/strict'
import { readFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { chromium } from 'playwright'

const base = process.argv[2]
assert.ok(base?.startsWith('https://'), 'Pass the HTTPS portfolio deployment URL')
const output = join(tmpdir(), 'portfolio-airspace-deployed')
await mkdir(output, { recursive: true })
const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
try {
  if (process.argv[3]) {
    const lines = (await readFile(process.argv[3], 'utf8')).split('\n')
    await context.addCookies(lines.filter(line => line.split('\t').length === 7).map(line => {
      const [domain, , path, secure, expires, name, value] = line.replace(/^#HttpOnly_/, '').trim().split('\t')
      return { domain, path, secure: secure === 'TRUE', expires: Number(expires) || -1, name, value, httpOnly: line.startsWith('#HttpOnly_') }
    }))
  }
  const readTraffic = async () => {
    const response = await context.request.get(`${base}/api/aircraft`)
    assert.equal(response.status(), 200)
    const data = await response.json()
    assert.equal(data.ok, true)
    assert.ok(!data.fixture && !data.delayed, 'current real aircraft observations')
    assert.ok(Date.now() - data.observedAt < 60000)
    return data
  }
  const first = await readTraffic()
  const firstReadAt = Date.now()
  const weatherResponse = await context.request.get(`${base}/api/airport-weather`)
  assert.equal(weatherResponse.status(), 200)
  const weather = await weatherResponse.json()
  assert.equal(weather.ok, true)
  assert.ok(Date.now() - weather.observedAt < 7200000)
  const errors = [], assetErrors = []
  const page = await context.newPage()
  page.on('pageerror', error => errors.push(error.message))
  page.on('response', response => {
    if (response.status() >= 400 && /\/airspace\//.test(response.url())) assetErrors.push(response.url())
  })
  for (const width of [1440, 834, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto(base)
    await page.getByRole('button', { name: 'Prague airspace', exact: true }).click()
    const panel = page.locator('.airspace-panel')
    await page.waitForFunction(() => /^(LIVE|NO REPORTS)$/.test(document.querySelector('.airspace-badge')?.textContent || ''))
    assert.ok(await panel.evaluate(node => node.scrollWidth <= node.clientWidth))
    const marker = panel.locator('button[data-aircraft-id]').first()
    if (await marker.count()) {
      await marker.focus(); await page.keyboard.press('Enter')
      await panel.locator('.airspace-selected').waitFor()
      await page.waitForFunction(() => !document.querySelector('.airspace-selected')?.textContent.includes('Loading'))
    }
    await page.screenshot({ path: join(output, `${width}.png`) })
  }
  const elapsed = Date.now() - firstReadAt
  await page.waitForTimeout(Math.max(0, 35000 - elapsed))
  const second = await readTraffic()
  assert.ok(second.observedAt > first.observedAt, 'live collector snapshots keep advancing')
  assert.deepEqual(errors, [])
  assert.deepEqual(assetErrors, [])
  console.log(JSON.stringify({ base, aircraft: second.aircraft.length, trafficAgeMs: Date.now() - second.observedAt,
    weatherObservedAt: weather.observedAt, advancing: true, widths: [1440, 834, 390], browserErrors: 0, screenshots: output }))
} finally { await browser.close() }
