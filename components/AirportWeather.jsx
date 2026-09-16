'use client'

import { useRef } from 'react'
import { useVisiblePolling } from '@/hooks/useVisiblePolling'
import AircraftMap from './AircraftMap'

export const utcTime = (time) => new Date(time).toISOString().slice(11, 19) + 'Z'
const reading = (value, unit) => value == null ? '—' : `${value}${unit}`

export default function AirportWeather() {
  const ref = useRef(null)
  const { data: w, error, checkedAt } = useVisiblePolling(ref, '/api/airport-weather', 300000)
  const cloud = w?.clouds?.[0]
  const fields = [
    ['TEMP', reading(w?.temp, '°C')],
    ['CLOUDS', cloud ? `${cloud.cover}${cloud.base == null ? '' : ` / ${cloud.base.toLocaleString('en-US')} FT`}` : '—'],
    ['DEW POINT', reading(w?.dew, '°C')],
    ['WIND FROM', w?.wind == null || w?.speed == null ? '—' : `${w.wind}${typeof w.wind === 'number' ? '°' : ''} / ${w.speed} KT`],
    ['VISIBILITY', w?.visibility == null ? '—' : w.raw.includes(' 9999 ') ? '10+ KM' : `${(parseFloat(w.visibility) * 1.60934).toFixed(1)}${String(w.visibility).includes('+') ? '+' : ''} KM`],
    ['QNH', reading(w?.pressure, ' HPA')],
  ]
  return <section className="airport-module" ref={ref} aria-label="Prague airport weather and aircraft">
    <div className="airport-status"><span>◇ LOCAL CONDITIONS</span><span>{w ? `${error || checkedAt - w.observedAt > 7200000 ? 'STALE' : 'METAR'} / ${utcTime(w.observedAt).slice(0, 5)}Z` : error ? 'UNAVAILABLE' : 'LOADING'}</span></div>
    <div className="airport-title"><h2>Prague, Czechia</h2><span>PRG / LKPR</span></div>
    <dl className="airport-readings">{fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <AircraftMap />
    <div className="airport-weather-source">Weather: <a href="https://aviationweather.gov/data/metar/">NOAA / AWC</a></div>
  </section>
}
