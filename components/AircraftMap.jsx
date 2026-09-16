'use client'

import { useEffect, useRef, useState } from 'react'
import { useVisiblePolling } from '@/hooks/useVisiblePolling'
import { useAircraftMotion } from '@/hooks/useAircraftMotion'
import { displayedPosition, EXPIRE_MS, mergeAircraft, project, RADIUS_KM, STALE_MS } from '@/lib/aircraft.mjs'
import geography from '@/data/prague-map.json'
import runwayData from '@/data/lkpr-runways.json'
import AircraftDetails from './AircraftDetails'

const time = (value) => new Date(value).toISOString().slice(11, 19) + 'Z'
const airport = project(50.1008, 14.26)
const runways = runwayData.runways.map(runway => ({
  name: runway.name, points: runway.ends.map(([lat, lon]) => project(lat, lon).join(',')).join(' '),
}))

export default function AircraftMap() {
  const ref = useRef(null)
  const { data, error, active } = useVisiblePolling(ref, '/api/aircraft', 30000, mergeAircraft)
  const [now, setNow] = useState(0)
  const [selected, setSelected] = useState(null)
  const [reduced, setReduced] = useState(false)
  const trails = data?.trails || {}
  useAircraftMotion(ref, data?.aircraft, active, reduced)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!active) return
    const tick = () => setNow(Date.now())
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [active])

  const aircraft = (data?.aircraft || []).filter(a => now - a.observedAt < EXPIRE_MS)
  const chosen = aircraft.find(a => a.id === selected)
  const feedStale = !!data && now - data.observedAt >= STALE_MS
  const stale = feedStale || error
  const status = data?.fixture ? 'FIXTURE' : !data ? error ? 'UNAVAILABLE' : 'CONNECTING' : stale ? 'STALE' : 'LIVE'
  const message = !data ? error ? 'Traffic unavailable. Retrying automatically.' : 'Receiving live aircraft…' :
    stale ? aircraft.length ? 'Updates delayed. Last known traffic shown.' : 'Updates delayed. No recent positions available.' : !aircraft.length ? `No airborne aircraft reported within ${RADIUS_KM} km.` : null
  const close = () => {
    const marker = ref.current.querySelector(`[data-aircraft-id="${CSS.escape(selected || '')}"]`)
    setSelected(null); marker?.focus()
  }

  return <section ref={ref} className="aircraft-map" aria-label={`Aircraft within ${RADIUS_KM} kilometres of Prague`} onKeyDown={event => { if (event.key === 'Escape') close() }}>
    {data?.fixture && <p className="aircraft-fixture" role="status">DEVELOPMENT FIXTURE — NOT LIVE TRAFFIC</p>}
    <header className="aircraft-map-header"><span>AIRSPACE <span className="aircraft-count">{String(aircraft.length).padStart(2, '0')}</span></span><span className={`aircraft-feed-status ${stale ? 'is-stale' : ''}`}><i />{status} / {RADIUS_KM} KM</span></header>
    <div className={`aircraft-map-canvas ${reduced || !active ? 'is-still' : ''}`}>
      <div className="aircraft-map-space">
      <svg viewBox="0 0 432 180" preserveAspectRatio="none" className="aircraft-basemap" aria-hidden="true">
        <path className="map-roads" d={geography.roads} />
        <path className="map-rivers" d={geography.rivers} />
        <g className="map-grid"><path d="M0 90H432M216 0V180" /><circle cx="216" cy="90" r="39" /><circle cx="216" cy="90" r="78" /></g>
        <g className="map-runways">{runways.map(runway => <g key={runway.name}>
          <polyline className="map-runway-glow" points={runway.points} />
          <polyline className="map-runway-strip" points={runway.points} />
          <polyline className="map-runway-center" points={runway.points} />
        </g>)}</g>
        <g className="map-trails">{aircraft.map(a => <polyline key={a.id} points={(trails[a.id] || []).map(p => p.point.join(',')).join(' ')} />)}</g>
      </svg>
      <span className="map-prague">PRAGUE</span>
      <span className="map-airport" aria-label="LKPR runways 06/24 and 12/30" style={{ left: `${airport[0] / 432 * 100}%`, top: `${airport[1] / 180 * 100}%` }}>LKPR</span>
      <span className="map-range">{RADIUS_KM} KM RADIUS</span>
      {aircraft.map(a => {
        const position = displayedPosition(a, now, reduced)
        const observed = project(a.lat, a.lon)
        return <div key={a.id}>
          <span className="aircraft-observation" style={{ left: `${observed[0] / 432 * 100}%`, top: `${observed[1] / 180 * 100}%` }} />
          <button type="button" data-aircraft-id={a.id} aria-label={`Inspect ${a.callsign || 'aircraft ' + a.id}`} aria-pressed={selected === a.id}
            className={`aircraft-marker ${position.estimated ? 'is-estimated' : ''} ${position.stale ? 'is-stale' : ''}`}
            onClick={() => setSelected(a.id)}>
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
              {a.track === null ? <circle cx="12" cy="12" r="4" /> : <path d="M12 2 14 10 21 15 21 17 14 15 14 20 17 22 12 21 7 22 10 20 10 15 3 17 3 15 10 10Z" />}
            </svg>
          </button>
        </div>
      })}
      </div>
      {message && <p className="aircraft-map-message" role="status">{message}</p>}
    </div>
    <div className="aircraft-legend"><span>• Observed <span className="legend-estimated">△ Estimated</span></span><span>Airborne only</span></div>
    {chosen ? <div className="aircraft-details" aria-live="polite">
      <div className="aircraft-details-title"><strong>{chosen.callsign || 'Callsign not reported'}</strong><button type="button" onClick={close} aria-label="Close aircraft details">×</button></div>
      <AircraftDetails key={`${chosen.id}:${chosen.callsign}`} aircraft={chosen} />
    </div> : selected ? <div className="aircraft-details" role="status">Aircraft left coverage or its report expired.<button type="button" onClick={() => setSelected(null)}>Close</button></div> : null}
    <footer className="aircraft-map-footer">
      <span aria-live="polite">UPDATED {data ? time(data.observedAt) : '—'}</span>
      <span><a href="https://www.adsb.lol/">ADSB.lol</a> · <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL</a> · <a href="https://www.naturalearthdata.com/about/terms-of-use/">Natural Earth</a> · <a href="https://ourairports.com/data/">OurAirports</a></span>
    </footer>
  </section>
}
