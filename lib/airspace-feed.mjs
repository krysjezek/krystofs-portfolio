import { EXPIRE_MS, STALE_MS, normalizeAircraft, reconcileAircraft, retryDelay } from './aircraft.mjs'
import { normalizeAirportWeather } from './airport-weather.mjs'

export const USER_AGENT = 'KrystofPortfolio/1.0 (www.krystofjezek.com)'
export const feedConfig = {
  aircraft: { url: 'https://api.adsb.lol/v2/point/50.0755/14.4378/25', interval: 15000,
    normalize: normalizeAircraft, merge: reconcileAircraft, maxAge: STALE_MS },
  weather: { url: 'https://aviationweather.gov/api/data/metar?ids=LKPR&format=json', interval: 300000,
    normalize: normalizeAirportWeather, maxAge: 900000 },
}

// Only successful observations may replace the last good snapshot.
export function createFeed(config, { fetcher = fetch, clock = Date.now, initial = {}, onChange = () => {} } = {}) {
  let state = { snapshot: null, nextAttemptAt: 0, failures: 0, ...initial }
  let pending
  function adopt(snapshot) {
    if (snapshot && (!state.snapshot || snapshot.observedAt >= state.snapshot.observedAt)) {
      if (snapshot.checkedAt > (state.snapshot?.checkedAt || 0)) state.failures = 0
      state.snapshot = snapshot
    }
  }
  function view() {
    const now = clock(), snapshot = state.snapshot
    if (!snapshot) return { ok: false, retryAt: state.nextAttemptAt }
    const delayed = state.failures > 0 || now - snapshot.checkedAt >= config.maxAge ||
      (snapshot.aircraft && now - snapshot.observedAt >= STALE_MS)
    return { ...snapshot, ok: true, delayed: Boolean(delayed), retryAt: state.nextAttemptAt,
      ...(snapshot.aircraft ? { aircraft: snapshot.aircraft.filter(a => now - a.observedAt < EXPIRE_MS) } : {}) }
  }
  async function refresh() {
    if (pending) return pending
    if (clock() < state.nextAttemptAt) {
      if (state.failures) throw new Error('Provider backoff')
      return state.snapshot
    }
    pending = (async () => {
      let requestedDelay = 0
      try {
        const response = await fetcher(config.url, { cache: 'no-store', signal: AbortSignal.timeout(8000), headers: { 'User-Agent': USER_AGENT } })
        if (!response.ok) {
          requestedDelay = response.status === 429 || response.headers.get('retry-after')
            ? retryDelay(response.headers.get('retry-after'), clock()) : 0
          throw new Error(`Provider HTTP ${response.status}`)
        }
        const next = config.normalize(await response.json(), clock())
        if (state.snapshot && next.observedAt < state.snapshot.observedAt) throw new Error('Regressing provider timestamp')
        const snapshot = config.merge ? config.merge(state.snapshot, next) : next
        state = { snapshot: { ...snapshot, checkedAt: clock() }, failures: 0, nextAttemptAt: clock() + config.interval }
        return state.snapshot
      } catch (error) {
        state.failures++
        state.nextAttemptAt = clock() + Math.max(requestedDelay, Math.min(120000, 15000 * 2 ** Math.min(state.failures - 1, 3)))
        throw error
      } finally {
        pending = null
        onChange(state)
      }
    })()
    return pending
  }
  return { refresh, view, adopt, export: () => state }
}
