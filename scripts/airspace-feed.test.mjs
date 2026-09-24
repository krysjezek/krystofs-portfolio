import test from 'node:test'
import assert from 'node:assert/strict'
import { createFeed, feedConfig } from '../lib/airspace-feed.mjs'
import { mergeAircraft, normalizeAircraft, reconcileAircraft } from '../lib/aircraft.mjs'

const epoch = 1790253000000
const plane = { hex: 'abc001', flight: 'EWG7KG', lat: 50.1, lon: 14.4, seen: 0, seen_pos: 0, alt_baro: 3000, gs: 200, track: 90 }
const raw = (now, ac = [plane]) => ({ now, ac, msg: 'No error' })
function harness(config = feedConfig.aircraft) {
  let now = epoch, calls = 0, reply = () => Response.json(raw(now))
  const feed = createFeed(config, { clock: () => now, fetcher: async (...args) => { calls++; return reply(...args) } })
  return { feed, advance: ms => { now += ms }, set: fn => { reply = fn }, calls: () => calls, now: () => now }
}

test('100 simultaneous visitors share one provider request; reads do not collect', async () => {
  const h = harness()
  await Promise.all(Array.from({ length: 100 }, () => h.feed.refresh()))
  for (let n = 0; n < 100; n++) h.feed.view()
  assert.equal(h.calls(), 1)
  assert.equal(h.feed.view().aircraft.length, 1)
  await h.feed.refresh()
  assert.equal(h.calls(), 1)
})

test('outage keeps last good data for new readers, preserves age, then expires and recovers', async () => {
  const h = harness()
  await h.feed.refresh()
  h.advance(15000)
  h.set(() => { throw new Error('offline') })
  await assert.rejects(h.feed.refresh())
  const view = h.feed.view()
  assert.equal(view.ok, true)
  assert.equal(view.delayed, true)
  assert.equal(view.aircraft[0].observedAt, epoch)
  assert.equal(view.observedAt, epoch)
  await assert.rejects(h.feed.refresh(), /backoff/)
  assert.equal(h.calls(), 2)
  h.advance(120000)
  assert.deepEqual(h.feed.view().aircraft, [])
  h.set(() => Response.json(raw(h.now())))
  await h.feed.refresh()
  assert.equal(h.feed.view().delayed, false)
  assert.equal(h.feed.view().aircraft.length, 1)
})

test('provider Retry-After is respected across an exported/restored state', async () => {
  const h = harness()
  h.set(() => new Response('', { status: 429, headers: { 'Retry-After': '180' } }))
  await assert.rejects(h.feed.refresh())
  assert.equal(h.feed.view().retryAt, epoch + 180000)
  const saved = JSON.parse(JSON.stringify(h.feed.export()))
  let calls = 0
  const restored = createFeed(feedConfig.aircraft, { initial: saved, clock: () => epoch + 30000, fetcher: () => { calls++; throw new Error('unexpected request') } })
  await assert.rejects(restored.refresh(), /backoff/)
  assert.equal(calls, 0)
})

test('cold failure is unavailable, never an empty successful feed', async () => {
  const h = harness()
  h.set(() => Response.json({ invalid: true }))
  await assert.rejects(h.feed.refresh())
  assert.equal(h.feed.view().ok, false)
  assert.equal(h.feed.view().aircraft, undefined)
})

test('successful empty scans bridge a short gap, but real quiet airspace becomes empty', () => {
  const first = normalizeAircraft(raw(epoch), epoch)
  const gap = reconcileAircraft(first, normalizeAircraft(raw(epoch + 15000, []), epoch + 15000))
  assert.equal(gap.aircraft[0].carried, true)
  assert.equal(gap.aircraft[0].observedAt, epoch)
  const quiet = reconcileAircraft(gap, normalizeAircraft(raw(epoch + 45000, []), epoch + 45000))
  assert.deepEqual(quiet.aircraft, [])
})

test('positive landing or departure evidence removes aircraft without gap grace', () => {
  for (const update of [{ ...plane, alt_baro: 'ground' }, { ...plane, lat: 50.4 }]) {
    const first = normalizeAircraft(raw(epoch), epoch)
    const next = normalizeAircraft(raw(epoch + 15000, [update]), epoch + 15000)
    assert.equal(reconcileAircraft(first, next).aircraft.length, 0)
  }
})

test('duplicate/out-of-order positions cannot rewind an individual aircraft', () => {
  const first = normalizeAircraft(raw(epoch), epoch)
  const duplicate = normalizeAircraft(raw(epoch, [plane, { ...plane, lat: 50.2, seen_pos: 15 }]), epoch)
  assert.equal(duplicate.aircraft[0].lat, plane.lat)
  const later = normalizeAircraft(raw(epoch + 15000, [{ ...plane, seen_pos: 30 }]), epoch + 15000)
  assert.equal(reconcileAircraft(first, later).aircraft[0].observedAt, epoch)
})

test('stale/future provider timestamps are errors and cannot silently produce zero records', () => {
  assert.throws(() => normalizeAircraft(raw(epoch - 60000), epoch))
  assert.throws(() => normalizeAircraft(raw(epoch + 11000), epoch))
  assert.equal(normalizeAircraft(raw(epoch, [{ ...plane, hex: '__proto__' }]), epoch).aircraft.length, 0)
})

test('same observation timestamp still updates outage/recovery metadata in browser', () => {
  const snapshot = normalizeAircraft(raw(epoch), epoch)
  const first = mergeAircraft(null, { ...snapshot, delayed: false })
  const outage = mergeAircraft(first, { ...snapshot, delayed: true })
  assert.equal(outage.delayed, true)
  assert.equal(mergeAircraft(outage, { ...snapshot, delayed: false }).delayed, false)
})

test('restored stale snapshots expire without being relabelled as fresh', async () => {
  const h = harness()
  await h.feed.refresh()
  const restored = createFeed(feedConfig.aircraft, { initial: h.feed.export(), clock: () => epoch + 180000 })
  assert.equal(restored.view().delayed, true)
  assert.deepEqual(restored.view().aircraft, [])
  assert.equal(restored.view().observedAt, epoch)
})

test('weather failure retains actual METAR timestamp and values', async () => {
  const h = harness(feedConfig.weather)
  h.set(() => Response.json([{ icaoId: 'LKPR', obsTime: epoch / 1000 - 600, temp: 15 }]))
  await h.feed.refresh()
  h.advance(300000)
  h.set(() => new Response('', { status: 500 }))
  await assert.rejects(h.feed.refresh())
  assert.equal(h.feed.view().temp, 15)
  assert.equal(h.feed.view().observedAt, epoch - 600000)
  assert.equal(h.feed.view().delayed, true)
})
