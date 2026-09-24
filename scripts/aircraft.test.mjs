import test from 'node:test'
import assert from 'node:assert/strict'
import { CENTER, displayedPosition, mergeAircraft, normalizeAircraft, project, retryDelay, smoothAircraftPose } from '../lib/aircraft.mjs'

const now = 1789571000000
const observation = { hex: 'test', lat: CENTER.lat, lon: CENTER.lon, seen_pos: 1, alt_baro: 0, gs: 0, track: 0 }
const response = ac => ({ ac, now, msg: 'No error' })

test('filters invalid, ground, old and out-of-radius reports while retaining valid zero values', () => {
  const data = normalizeAircraft(response([observation, { ...observation, hex: 'ground', alt_baro: 'ground' },
    { ...observation, hex: 'outside', lat: 51 }, { ...observation, hex: '40km-away', lat: 50.4355 }, { ...observation, lat: null },
    { ...observation, seen_pos: 130 }, { ...observation, seen_pos: null }]), now)
  assert.equal(data.aircraft.length, 1)
  assert.equal(data.aircraft[0].altitude, 0)
  assert.equal(data.aircraft[0].speed, 0)
  assert.equal(data.aircraft[0].track, 0)
  assert.equal(data.aircraft[0].callsign, null)
  assert.equal(data.aircraft[0].aircraftType, null)
  assert.equal(data.aircraft[0].observedAt, now - 1000)
})

test('malformed provider payloads cannot masquerade as empty airspace', () => {
  for (const raw of [{}, { ...response([]), msg: 'error' }, { ...response([]), now: now + 90000 }]) {
    assert.throws(() => normalizeAircraft(raw, now))
  }
  assert.deepEqual(normalizeAircraft(response([]), now).aircraft, [])
})

test('projection stops after 30 seconds and stale reports never advance', () => {
  const a = { ...normalizeAircraft(response([observation]), now).aircraft[0], speed: 300, track: 90 }
  const start = displayedPosition(a, a.observedAt)
  const estimate = displayedPosition(a, a.observedAt + 15000)
  assert.equal(start.estimated, false)
  assert.ok(estimate.point[0] > start.point[0])
  assert.equal(estimate.estimated, true)
  assert.deepEqual(displayedPosition(a, a.observedAt + 30000).point, displayedPosition(a, a.observedAt + 100000).point)
  assert.equal(displayedPosition(a, a.observedAt + 60000).stale, true)
  assert.deepEqual(displayedPosition(a, a.observedAt + 10000, true).point, project(a.lat, a.lon))
  assert.equal(displayedPosition({ ...a, track: null }, now + 10000).estimated, false)
})

test('trails only append distinct observed reports, stay bounded, and remove departed aircraft', () => {
  let data = null
  for (let n = 0; n < 10; n++) {
    const next = normalizeAircraft({ ...response([observation]), now: now + n * 30000 }, now + n * 30000)
    data = mergeAircraft(data, next)
    assert.equal(mergeAircraft(data, next), data)
  }
  assert.ok(data.trails.test.length <= 5)
  assert.deepEqual(mergeAircraft(data, { observedAt: now + 400000, aircraft: [] }).trails, {})
})

test('Retry-After supports seconds and HTTP dates with a one-minute minimum', () => {
  assert.equal(retryDelay('120', now), 120000)
  assert.equal(retryDelay(new Date(now + 180000).toUTCString(), now), 180000)
  assert.equal(retryDelay(null, now), 60000)
  assert.equal(retryDelay('nonsense', now), 60000)
})

test('motion corrects continuously from the rendered pose and settles on the moving target', () => {
  const a = { ...normalizeAircraft(response([observation]), now).aircraft[0], speed: 300, track: 1 }
  const correction = { startedAt: now, offset: [4, -3], headingOffset: -2 }
  const start = smoothAircraftPose(a, now, correction)
  const target = displayedPosition(a, now)
  assert.deepEqual(start.point, [target.point[0] + 4, target.point[1] - 3])
  assert.equal(start.heading, -1) // 359° to 1° takes the short, two-degree turn.
  assert.equal(smoothAircraftPose(a, now + 1000, correction).heading, 0)
  assert.deepEqual(smoothAircraftPose(a, now + 2000, correction).point, displayedPosition(a, now + 2000).point)
  assert.equal(smoothAircraftPose(a, now + 2000, correction).heading, 1)
  assert.deepEqual(smoothAircraftPose(a, now, correction, true).point, project(a.lat, a.lon))
  assert.deepEqual(smoothAircraftPose(a, now + 70000, correction).point, smoothAircraftPose(a, now + 80000, correction).point)
})

test('projection starts continuously without the former two-second position jump', () => {
  const a = { ...normalizeAircraft(response([observation]), now).aircraft[0], speed: 300, track: 90 }
  const before = displayedPosition(a, a.observedAt + 1999).point
  const after = displayedPosition(a, a.observedAt + 2001).point
  assert.ok(after[0] - before[0] > 0)
  assert.ok(after[0] - before[0] < 0.001)
})

test('duplicate positions and older responses cannot create trails or rewind traffic', () => {
  const first = mergeAircraft(null, normalizeAircraft(response([observation]), now))
  const second = mergeAircraft(first, normalizeAircraft({ ...response([observation]), now: now + 1000 }, now + 1000))
  assert.equal(second.trails.test.length, 1)
  assert.equal(mergeAircraft(second, first), second)
  assert.throws(() => normalizeAircraft(null, now))
  const malformed = normalizeAircraft(response([{ ...observation, flight: 42, t: {} }]), now).aircraft[0]
  assert.equal(malformed.callsign, null)
  assert.equal(malformed.aircraftType, null)
})
