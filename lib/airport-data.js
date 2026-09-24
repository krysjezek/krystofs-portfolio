import { unstable_cache } from 'next/cache'
import { createFeed, feedConfig } from './airspace-feed.mjs'
import { createCollectorReader } from './airspace-service.mjs'

function localFeed(name) {
  const feed = createFeed(feedConfig[name])
  // Throw on failure so Next retains its last successful persistent cache entry.
  const cached = unstable_cache(() => feed.refresh(), [`prague-${name}-v5`], { revalidate: feedConfig[name].interval / 1000 })
  return async () => {
    try { feed.adopt(await cached()) } catch { /* last good data or a retry time */ }
    // SWR can return a long-expired entry to the first visitor after an idle
    // interval. Join the background refresh instead of showing an empty map.
    if (Date.now() - (feed.view().checkedAt || 0) >= feedConfig[name].interval) {
      try { await feed.refresh() } catch { /* preserve last observation */ }
    }
    return feed.view()
  }
}

const localAircraft = localFeed('aircraft')
const localWeather = localFeed('weather')
const freshCollector = createCollectorReader()
const collector = unstable_cache(freshCollector, ['prague-collector-v2'], { revalidate: 10 })

async function read(name, fallback) {
  const origin = process.env.AIRSPACE_SERVICE_URL
  if (!origin) return fallback()
  try {
    let data = await collector(origin), refreshFailed = false
    if (Date.now() - data.generatedAt > 20000) {
      try { data = await freshCollector(origin) } catch { refreshFailed = true }
    }
    const feed = data[name]
    return { ...feed, delayed: feed.delayed || refreshFailed || Date.now() - data.generatedAt > 45000 }
  } catch {
    // Avoid fanning out to providers from every instance during an outage.
    return { ok: false, retryAt: Date.now() + 15000 }
  }
}

export const getAircraft = () => read('aircraft', localAircraft)
export const getWeather = () => read('weather', localWeather)
