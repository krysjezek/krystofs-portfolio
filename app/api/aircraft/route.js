import { getAircraft } from '@/lib/airport-data'

export async function GET() {
  const data = await getAircraft()
  return Response.json({ ...data, attribution: 'ADSB.lol', license: 'ODbL-1.0' }, {
    status: data.ok ? 200 : 503,
    headers: { 'Cache-Control': 'no-store', 'CDN-Cache-Control': data.ok ? 'public, s-maxage=5' : 'no-store',
      ...(!data.ok ? { 'Retry-After': String(Math.max(30, Math.ceil((data.retryAt - Date.now()) / 1000))) } : {}) },
  })
}
