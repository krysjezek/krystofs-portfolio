import { unstable_cache } from 'next/cache'
import { normalizeModel, normalizeRoute } from './aircraft-details.mjs'

async function read(url, revalidate) {
  const response = await fetch(url, {
    next: { revalidate }, signal: AbortSignal.timeout(6000),
    headers: { 'User-Agent': 'KrystofPortfolio/1.0 (www.krystofjezek.com)' },
  })
  if (response.status === 404) return null
  if (!response.ok) throw new Error('Lookup unavailable')
  return response.json()
}

// Lookups happen only on selection. Cache successful source data for longer;
// cache missing/error results here too, so visitors do not repeat failed calls.
export const getAircraftDetails = unstable_cache(async (id, callsign) => {
  const [routeResult, modelResult] = await Promise.allSettled([
    callsign && /^[A-Z0-9]{2,8}$/.test(callsign)
      ? read(`https://vrs-standing-data.adsb.lol/routes/${callsign.slice(0, 2)}/${callsign}.json`, 3600)
      : Promise.resolve(null),
    read(`https://api.adsbdb.com/v0/aircraft/${id}`, 86400),
  ])
  const route = routeResult.status === 'fulfilled' ? normalizeRoute(routeResult.value, callsign) : null
  const model = modelResult.status === 'fulfilled' ? normalizeModel(modelResult.value, id) : null
  return {
    ok: true, route, model,
    routeStatus: route ? 'matched' : routeResult.status === 'rejected' ? 'unavailable' : 'unknown',
    modelStatus: model ? 'matched' : modelResult.status === 'rejected' ? 'unavailable' : 'unknown',
  }
}, ['aircraft-details-v1'], { revalidate: 60 })
