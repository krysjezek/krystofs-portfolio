import test from 'node:test'
import assert from 'node:assert/strict'
import { createCollectorReader, readCollector } from '../lib/airspace-service.mjs'

const now = 1790253000000
const valid = { schemaVersion: 1, generatedAt: now, aircraft: { ok: true, observedAt: now, aircraft: [] }, weather: { ok: false } }
const options = data => ({ clock: () => now, fetcher: async () => Response.json(data) })

test('accepts a healthy empty feed and partial weather outage', async () => {
  assert.deepEqual(await readCollector('https://collector.example', options(valid)), valid)
})

test('refuses bad envelopes and malformed records instead of breaking the map', async () => {
  for (const data of [{}, { ...valid, schemaVersion: 2 }, { ...valid, generatedAt: now + 11000 },
    { ...valid, aircraft: { ok: false } },
    { ...valid, aircraft: { ...valid.aircraft, aircraft: [null] } },
    { ...valid, aircraft: { ...valid.aircraft, aircraft: [{ id: '__proto__' }] } }]) {
    await assert.rejects(readCollector('https://collector.example', options(data)))
  }
})

test('rejects insecure public collector origins while supporting local development', async () => {
  await assert.rejects(readCollector('http://collector.example', options(valid)), /HTTPS/)
  assert.deepEqual(await readCollector('http://127.0.0.1:8080', options(valid)), valid)
})

test('upstream HTTP errors throw so Next can preserve its cached success', async () => {
  await assert.rejects(readCollector('https://collector.example', { fetcher: async () => new Response('', { status: 503 }) }))
})

test('foreground and background refresh coalesce, recover and respect a short outage backoff', async () => {
  let time = now, calls = 0, offline = false
  const read = createCollectorReader({ clock: () => time, read: async () => {
    calls++
    if (offline) throw new Error('offline')
    return { ...valid, generatedAt: time }
  } })
  await Promise.all(Array.from({ length: 100 }, () => read('https://collector.example')))
  assert.equal(calls, 1)
  time += 11000
  offline = true
  await assert.rejects(read('https://collector.example'))
  await assert.rejects(read('https://collector.example'), /backoff/)
  assert.equal(calls, 2)
  time += 15000
  offline = false
  assert.equal((await read('https://collector.example')).generatedAt, time)
  assert.equal(calls, 3)
})
