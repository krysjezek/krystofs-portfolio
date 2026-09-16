import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeRoute, normalizeModel } from '../lib/aircraft-details.mjs'

// Explicit test data, never used by the live endpoints.
const route = { callsign: 'TEST123', _airports: [
  { iata: 'TBS', icao: 'UGTB', location: 'Tbilisi' },
  { iata: 'PRG', icao: 'LKPR', location: 'Prague' },
] }

test('route matches retain supplied airport codes and cities, explicitly unconfirmed', () => {
  assert.deepEqual(normalizeRoute(route, 'TEST123'), {
    from: { code: 'TBS', city: 'Tbilisi' }, to: { code: 'PRG', city: 'Prague' }, confirmed: false,
  })
})

test('unknown, mismatched, malformed and multi-leg routes do not become guessed journeys', () => {
  for (const data of [null, {}, { ...route, callsign: 'OTHER' }, { ...route, _airports: [null, {}] },
    { ...route, _airports: [...route._airports, route._airports[0]] }]) {
    assert.equal(normalizeRoute(data, 'TEST123'), null)
  }
})

test('aircraft model is matched to the hex identity and preserves the actual variant', () => {
  const data = { response: { aircraft: { mode_s: 'ABC123', manufacturer: 'Boeing', type: '767-3BG' } } }
  assert.equal(normalizeModel(data, 'abc123'), 'Boeing 767-3BG')
  assert.equal(normalizeModel(data, 'abc124'), null)
  assert.equal(normalizeModel({}, 'abc123'), null)
  data.response.aircraft.type = 'Boeing 767-3BG'
  assert.equal(normalizeModel(data, 'abc123'), 'Boeing 767-3BG')
  data.response.aircraft.mode_s = 123
  assert.equal(normalizeModel(data, 'abc123'), null)
})
