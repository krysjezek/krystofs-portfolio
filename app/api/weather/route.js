import { currentForecast } from "@/lib/weather";

const FORECAST_URL = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=50.0755&lon=14.4378";

export async function GET() {
  try {
    // Cache the forecast, then select the hour closest to now on each request.
    const response = await fetch(FORECAST_URL, {
      headers: { "User-Agent": "krystofjezek.com/1.0 https://www.krystofjezek.com" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error("Weather provider unavailable");
    const forecast = await response.json();
    return Response.json(currentForecast(forecast), {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=600, stale-while-revalidate=300",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch {
    return Response.json({ temperature: null }, {
      status: 503,
      headers: { "Cache-Control": "public, max-age=60, s-maxage=300", "X-Robots-Tag": "noindex" },
    });
  }
}
