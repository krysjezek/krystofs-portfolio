import { getAircraft } from '@/lib/airport-data'

export async function GET() {
  const data = await getAircraft()
  return Response.json({ ...data, attribution: 'ADSB.lol', license: 'ODbL-1.0' }, {
    status: data.ok ? 200 : 503,
    headers: { 'Cache-Control': 'no-store',
      ...(!data.ok ? { 'Retry-After': String(Math.max(30, Math.ceil((data.retryAt - Date.now()) / 1000))) } : {}) },
  })
}
