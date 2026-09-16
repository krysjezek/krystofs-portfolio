'use client'

import { useRef } from 'react'
import { useVisiblePolling } from '@/hooks/useVisiblePolling'

const airportLabel = airport => `${airport.code} — ${airport.city}`

export default function AircraftDetails({ aircraft }) {
  const ref = useRef(null)
  const { data, error } = useVisiblePolling(ref, `/api/aircraft/${aircraft.id}`, 300000)
  // Reject a late result for a reused transponder/callsign combination.
  const details = data?.id === aircraft.id && data?.callsign === aircraft.callsign ? data : null
  const fallback = error || details?.routeStatus === 'unavailable' ? 'Unavailable' : data ? 'Not available' : 'Looking up…'
  return <div ref={ref} className="aircraft-journey">
    <dl>
      <div><dt>FROM</dt><dd>{details?.route ? airportLabel(details.route.from) : fallback}</dd></div>
      <div><dt>TO</dt><dd>{details?.route ? airportLabel(details.route.to) : fallback}</dd></div>
      <div><dt>AIRCRAFT</dt><dd>{details?.model || aircraft.aircraftType || (details || error ? 'Not reported' : 'Looking up…')}</dd></div>
    </dl>
    <p className="aircraft-details-source">Route: <a href="https://github.com/adsblol/vrs-standing-data" title="Callsign database match; the current flight route is not confirmed">ADSB.lol / VRS</a> · Aircraft: <a href="https://www.adsbdb.com/">adsbdb / PlaneBase</a></p>
  </div>
}
