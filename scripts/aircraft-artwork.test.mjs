import test from 'node:test'
import assert from 'node:assert/strict'
import { aircraftArtwork } from '../lib/aircraft-artwork.mjs'

test('reported ICAO types distinguish five aircraft silhouettes', () => {
  for (const [type, category, size] of [['C172','light',26], ['AT76','turboprop',30], ['A320','jet',34], ['B77W','widebody',42], ['A359','widebody',42], ['B744','fourengine',46], ['A346','fourengine',46], ['A388','fourengine',46]]) {
    const result = aircraftArtwork(type)
    assert.equal(result.category, category)
    assert.equal(result.size, size)
    assert.match(result.icon, /-muted-v1\.png$/)
    assert.match(result.selectedIcon, /-blue-v2\.png$/)
  }
  assert.deepEqual(aircraftArtwork(' a20n '), aircraftArtwork('A20N'))
})

test('unknown types and unsupported helicopters remain neutral position symbols', () => {
  for (const type of [null, undefined, 123, '', 'ZZZZ', 'EC35', 'A320-214']) {
    assert.equal(aircraftArtwork(type).category, 'unknown')
    assert.equal(aircraftArtwork(type).icon, null)
  }
})
