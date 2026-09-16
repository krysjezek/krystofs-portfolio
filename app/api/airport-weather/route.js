import { getWeather } from '@/lib/airport-data'

export async function GET() {
  const data = await getWeather()
  return Response.json(data, { status: data.ok ? 200 : 503, headers: { 'Cache-Control': 'no-store' } })
}
