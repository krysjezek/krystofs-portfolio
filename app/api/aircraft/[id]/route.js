import { getAircraft } from '@/lib/airport-data'
import { getAircraftDetails } from '@/lib/aircraft-details-data'
import { EXPIRE_MS } from '@/lib/aircraft.mjs'

export async function GET(_request, { params }) {
  const { id } = await params
  if (!/^[a-f0-9]{6}$/i.test(id)) return Response.json({ ok: false }, { status: 400 })
  const snapshot = await getAircraft()
  const aircraft = snapshot.aircraft?.find(a => a.id === id.toLowerCase() && Date.now() - a.observedAt < EXPIRE_MS)
  // Bind lookups to a current aircraft and its reported callsign, never a
  // browser-supplied route, airport, or arbitrary upstream URL.
  if (!aircraft) return Response.json({ ok: false }, { status: snapshot.ok ? 404 : 503 })
  const details = await getAircraftDetails(aircraft.id, aircraft.callsign)
  return Response.json({ ...details, id: aircraft.id, callsign: aircraft.callsign,
    sources: { route: 'ADSB.lol / VRS (CC0)', model: 'adsbdb / PlaneBase' },
  }, { headers: { 'Cache-Control': 'no-store' } })
}
