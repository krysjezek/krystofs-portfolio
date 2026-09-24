import test from 'node:test'
import assert from 'node:assert/strict'
import { airlineForCallsign } from '../lib/airlines.mjs'
import airlines from '../content/airlines.json' with { type: 'json' }

test('airlines match ICAO callsigns including subsidiary operators', () => {
  const examples = {
    EJU12ZD: 'easyJet Europe', EZY123: 'easyJet', EZS45A: 'easyJet Switzerland',
    EWG7KG: 'Eurowings', TVS1234: 'Smartwings', RYR1AB: 'Ryanair', RUK123: 'Ryanair UK',
    WZZ12: 'Wizz Air', WMT12: 'Wizz Air Malta', WUK12: 'Wizz Air UK',
    DLH123: 'Lufthansa', BAW12: 'British Airways', LOT123: 'LOT Polish Airlines',
    AFR123: 'Air France', HOP12AB: 'Air France HOP', KLM1329: 'KLM', KLC123: 'KLM Cityhopper',
    THY123: 'Turkish Airlines', TKJ123: 'AJet', PGT123: 'Pegasus Airlines',
    AUA123: 'Austrian Airlines', SWR123: 'SWISS', BEL2ZR: 'Brussels Airlines',
    IBE123: 'Iberia', IBS123: 'Iberia Express', VLG123: 'Vueling',
    SAS123: 'SAS', SZS123: 'SAS Connect', SVS123: 'SAS Link',
    NOZ123: 'Norwegian Air Shuttle', NSZ123: 'Norwegian Air Sweden',
    FIN123: 'Finnair', TAP123: 'TAP Air Portugal', EIN123: 'Aer Lingus',
    ITY123: 'ITA Airways', AEE866: 'Aegean Airlines', BTI123: 'airBaltic',
    MAY123: 'Malta Air', RYS123: 'Buzz', LDA123: 'Lauda Europe',
    LHX123: 'Lufthansa City Airlines', EWL123: 'Eurowings Europe',
    TVP123: 'Smartwings Poland', TVQ123: 'Smartwings Slovakia', TVL123: 'Smartwings Hungary',
    KMM123: 'KM Malta Airlines', OCN123: 'Discover Airlines',
    TOM123: 'TUI Airways', TUI123: 'TUI fly Germany', TVF123: 'Transavia France',
    EXS123: 'Jet2', CFG123: 'Condor', SXS123: 'SunExpress',
    AXE123: 'AirExplore', DNU123: 'DAT LT', CSW123: 'Chair Airlines',
    HYS123: 'HiSky Europe', HYM123: 'HiSky', AAE123: 'Air Atlanta Europe',
    EAI123: 'Emerald Airlines', GJM123: 'GetJet Airlines Malta',
    BCS123: 'European Air Transport Leipzig', DHK123: 'DHL Air UK',
    DHA123: 'DHL Air Austria', CLX123: 'Cargolux', BOX123: 'AeroLogic',
    UAE123: 'Emirates', QTR123: 'Qatar Airways', ETD123: 'Etihad Airways',
    DAL123: 'Delta Air Lines', UAL123: 'United Airlines', KAL123: 'Korean Air',
    SJX123: 'STARLUX Airlines', JZR123: 'Jazeera Airways', QNT123: 'Qanot Sharq',
    WIF123: 'Widerøe', SAT123: 'SATA Air Açores', FWI123: 'Air Caraïbes',
  }
  for (const [callsign, name] of Object.entries(examples)) {
    const airline = airlineForCallsign(callsign)
    assert.equal(airline.name, name)
    assert.match(airline.icon, /^\/images\/airlines\/[a-z0-9]+-v\d+\.(webp|svg)$/)
  }
  assert.deepEqual(airlineForCallsign(' eju12zd '), airlineForCallsign('EJU12ZD'))
})

test('registry has unique ICAO operators, names and versioned local artwork with provenance', () => {
  const codes = new Set()
  const names = new Set()
  const icons = new Set()
  for (const airline of airlines) {
    assert.ok(!names.has(airline.name), `duplicate brand: ${airline.name}`)
    names.add(airline.name)
    assert.ok(!icons.has(airline.icon), `duplicate asset path: ${airline.icon}`)
    icons.add(airline.icon)
    assert.match(airline.icon, /^\/images\/airlines\/[a-z0-9]+-v\d+\.(webp|svg)$/)
    assert.equal(new URL(airline.logoSource).protocol, 'https:')
    assert.ok(Object.keys(airline.operators).length > 0)
    for (const [code, name] of Object.entries(airline.operators)) {
      assert.match(code, /^[A-Z]{3}$/)
      assert.ok(!codes.has(code), `ambiguous operator: ${code}`)
      codes.add(code)
      assert.ok(name.trim().length > 0 && !name.includes('?'), `invalid name: ${name}`)
      assert.deepEqual(airlineForCallsign(`${code}12AB`), { name, icon: airline.icon })
    }
  }
})

test('unknown callsigns, registrations, marketing codes and simulations do not get guessed airlines', () => {
  for (const value of [null, undefined, 123, '', 'EJU', 'EJUABC', 'EJU123456', 'EJU 123', 'EJU12!',
    'TEST02', 'DEMO 01', 'N123AB', 'OK-ABC', 'U21234', 'ZZZ123',
    // Historic/incorrect aliases must not identify a different active operator.
    'LDM123', 'VLH123', 'EDG123', 'DXT123', 'GSW123', 'AAH123',
    'CSA123', 'AZA123', 'CLH123', 'EZE123', 'WAZ123']) {
    assert.equal(airlineForCallsign(value), null, String(value))
  }
})
