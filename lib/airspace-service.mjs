// Server-only configuration; visitors always use the portfolio's same-origin API.
export async function readCollector(origin, { fetcher = fetch, clock = Date.now } = {}) {
  const url = new URL('/v1/snapshot', origin)
  if (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))) throw new Error('Collector requires HTTPS')
  const response = await fetcher(url, { cache: 'no-store', signal: AbortSignal.timeout(5000) })
  if (!response.ok) throw new Error('Collector unavailable')
  const data = await response.json()
  if (data.schemaVersion !== 1 || !Number.isFinite(data.generatedAt) || data.generatedAt < 1e12 || data.generatedAt > clock() + 10000 ||
    !data.aircraft || !data.weather || typeof data.aircraft.ok !== 'boolean' || typeof data.weather.ok !== 'boolean' ||
    data.aircraft.ok && (!Array.isArray(data.aircraft.aircraft) || !Number.isFinite(data.aircraft.observedAt) || data.aircraft.aircraft.some(a =>
      !a || typeof a.id !== 'string' || !/^~?[a-f0-9]{6}$/i.test(a.id) || !Number.isFinite(a.lat) || Math.abs(a.lat) > 90 ||
      !Number.isFinite(a.lon) || Math.abs(a.lon) > 180 || !Number.isFinite(a.observedAt) || a.observedAt > clock() + 10000 ||
      !(a.speed === null || Number.isFinite(a.speed) && a.speed >= 0) || !(a.track === null || Number.isFinite(a.track)))) ||
    data.weather.ok && !Number.isFinite(data.weather.observedAt)) throw new Error('Invalid collector snapshot')
  if (!data.aircraft.ok && !data.weather.ok) throw new Error('Collector has no observations')
  return data
}

// Shared by Next's background revalidation and an impatient first visitor.
// A failed refresh backs off briefly but never replaces a good cache entry.
export function createCollectorReader({ read = readCollector, clock = Date.now } = {}) {
  let currentOrigin, pending, recent, readAt = 0, retryAt = 0
  return async origin => {
    if (origin !== currentOrigin) { currentOrigin = origin; pending = null; recent = null; readAt = 0; retryAt = 0 }
    if (recent && clock() - readAt < 10000) return recent
    if (pending) return pending
    if (clock() < retryAt) throw new Error('Collector backoff')
    pending = read(origin).then(data => { recent = data; readAt = clock(); retryAt = 0; return data })
      .catch(error => { retryAt = clock() + 15000; throw error })
      .finally(() => { pending = null })
    return pending
  }
}
