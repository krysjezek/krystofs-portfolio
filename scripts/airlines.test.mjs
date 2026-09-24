import test from 'node:test'
import assert from 'node:assert/strict'
import { airlineForCallsign } from '../lib/airlines.mjs'

test('airlines match ICAO callsigns including subsidiary operators', () => {
  const examples = {
    EJU12ZD: 'easyJet Europe', EZY123: 'easyJet', EZS45A: 'easyJet Switzerland',
    EWG7KG: 'Eurowings', TVS1234: 'Smartwings', RYR1AB: 'Ryanair', RUK123: 'Ryanair UK',
    WZZ12: 'Wizz Air', WMT12: 'Wizz Air Malta', WUK12: 'Wizz Air UK',
    DLH123: 'Lufthansa', BAW12: 'British Airways', LOT123: 'LOT Polish Airlines',
  }
  for (const [callsign, name] of Object.entries(examples)) {
    const airline = airlineForCallsign(callsign)
    assert.equal(airline.name, name)
    assert.match(airline.icon, /^\/images\/airlines\/[a-z]+-v1\.webp$/)
  }
  assert.deepEqual(airlineForCallsign(' eju12zd '), airlineForCallsign('EJU12ZD'))
})

test('unknown callsigns, registrations, marketing codes and simulations do not get guessed airlines', () => {
  for (const value of [null, undefined, 123, '', 'EJU', 'EJUABC', 'EJU123456', 'EJU 123', 'EJU12!',
    'TEST02', 'DEMO 01', 'N123AB', 'OK-ABC', 'U21234', 'ZZZ123']) {
    assert.equal(airlineForCallsign(value), null, String(value))
  }
})
