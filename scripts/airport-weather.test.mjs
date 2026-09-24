import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeAirportWeather } from '../lib/airport-weather.mjs';
const now = 1790251200000;
const source = { icaoId: 'LKPR', obsTime: now / 1000, temp: 0, dewp: 0, wdir: 0, wspd: 0, visib: '6+', altim: 1018, clouds: [{ cover: 'FEW', base: 3000 }], rawOb: 'METAR LKPR 241200Z 00000KT 9999 FEW030' };
test('METAR retains zero readings, variable wind and observation age', () => {
  const weather = normalizeAirportWeather([source], now);
  assert.equal(weather.temp, 0);
  assert.equal(weather.speed, 0);
  assert.equal(weather.wind, 0);
  assert.equal(weather.observedAt, now);
  assert.equal(weather.visibility, '6+');
  assert.equal(normalizeAirportWeather([{ ...source, wdir: 'VRB' }], now).wind, 'VRB');
});
test('malformed and future METARs fail; unknown fields stay absent', () => {
  for (const payload of [null, [], [{ ...source, icaoId: 'EGLL' }], [{ ...source, obsTime: now / 1000 + 120 }]]) assert.throws(() => normalizeAirportWeather(payload, now));
  const weather = normalizeAirportWeather([{ ...source, temp: 'bad', wdir: 999, wspd: -1, clouds: {}, visib: 'n/a' }], now);
  assert.equal(weather.temp, null);
  assert.equal(weather.wind, null);
  assert.equal(weather.speed, null);
  assert.equal(weather.visibility, null);
  assert.deepEqual(weather.clouds, []);
});
