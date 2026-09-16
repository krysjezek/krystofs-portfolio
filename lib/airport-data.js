import { unstable_cache } from 'next/cache'
import { normalizeAircraft, retryDelay } from './aircraft.mjs'

// Next's persistent Data Cache is shared by visitors, not one fetch per browser.
// Coalesce concurrent cache misses in this worker and retain provider backoff.
function provider(url, normalize) {
  let pending, retryAt = 0, lastFailure
  return async () => {
    if (Date.now() < retryAt) return lastFailure
    if (pending) return pending
    pending = (async () => {
      try {
        const response = await fetch(url, {
          cache: 'no-store', signal: AbortSignal.timeout(8000),
          headers: { 'User-Agent': 'KrystofPortfolio/1.0 (www.krystofjezek.com)' },
        })
        if (!response.ok) {
          retryAt = Date.now() + retryDelay(response.headers.get('retry-after'))
          throw new Error(`Provider HTTP ${response.status}`)
        }
        const data = normalize(await response.json())
        return { ok: true, ...data }
      } catch {
        retryAt = Math.max(retryAt, Date.now() + 60000)
        lastFailure = { ok: false, retryAt }
        return lastFailure
      } finally { pending = null }
    })()
    return pending
  }
}

export const getAircraft = unstable_cache(
  provider('https://api.adsb.lol/v2/point/50.0755/14.4378/17', normalizeAircraft),
  ['prague-aircraft-30km-v2'], { revalidate: 30 },
)

export const getWeather = unstable_cache(provider(
  'https://aviationweather.gov/api/data/metar?ids=LKPR&format=json',
  (data) => {
    const w = data?.[0]
    if (w?.icaoId !== 'LKPR' || !Number.isFinite(w.obsTime)) throw new Error('Invalid METAR')
    return { observedAt: w.obsTime * 1000, temp: w.temp ?? null, dew: w.dewp ?? null,
      wind: w.wdir ?? null, speed: w.wspd ?? null, visibility: w.visib ?? null,
      pressure: w.altim ?? null, clouds: w.clouds ?? [], raw: w.rawOb ?? '' }
  },
), ['lkpr-weather-v1'], { revalidate: 300 })
