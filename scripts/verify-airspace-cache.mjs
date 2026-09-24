// Production regression: cache failures must not erase good data; an idle first
// visitor must receive a fresh snapshot instead of a long-expired SWR response.
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { spawn } from 'node:child_process'

let offline = false, requests = 0, stamp = Date.now() - 60000
const fixture = createServer((_req, res) => {
  requests++
  if (offline) { res.writeHead(503); return res.end() }
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({ schemaVersion: 1, generatedAt: stamp,
    aircraft: { ok: true, fixture: true, observedAt: stamp, checkedAt: stamp, aircraft: [] },
    weather: { ok: true, observedAt: stamp, temp: 10 },
  }))
})
await new Promise(resolve => fixture.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${fixture.address().port}`
const base = 'http://127.0.0.1:3001'
let server, logs = ''
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
try {
  let occupied = false
  try { occupied = Boolean(await fetch(base, { signal: AbortSignal.timeout(500) })) } catch { /* free */ }
  assert.equal(occupied, false, 'Do not replace an existing port 3001 server')
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3001'], {
    env: { ...process.env, AIRSPACE_SERVICE_URL: origin }, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
  })
  server.stdout.on('data', data => { logs += data })
  server.stderr.on('data', data => { logs += data })
  for (let n = 0; n < 40; n++) {
    try { if ((await fetch(base, { signal: AbortSignal.timeout(500) })).ok) break } catch { /* starting */ }
    assert.equal(server.exitCode, null, logs)
    await sleep(250)
  }
  const read = async () => {
    const response = await fetch(`${base}/api/aircraft`)
    assert.equal(response.status, 200)
    return response.json()
  }
  const old = await read()
  assert.equal(old.delayed, true)
  await sleep(11000)
  stamp = Date.now()
  const fresh = await read()
  assert.equal(fresh.observedAt, stamp, 'old persisted entry must block for its coalesced refresh')
  assert.equal(fresh.delayed, false)
  const beforeOutage = requests
  offline = true
  await sleep(21000)
  const retained = await read()
  assert.equal(retained.observedAt, stamp, 'failed cache refresh must preserve observation')
  assert.equal(retained.delayed, true)
  await Promise.all(Array.from({ length: 20 }, read))
  assert.ok(requests <= beforeOutage + 1, 'foreground and background failures share a backoff')
  offline = false
  await sleep(16000)
  stamp = Date.now()
  assert.equal((await read()).observedAt, stamp, 'collector recovery must replace delayed snapshot')
  console.log('Production cache: idle-first-visitor freshness, last-good retention, outage coalescing and recovery passed.')
} finally {
  server?.kill()
  await new Promise(resolve => fixture.close(resolve))
}
