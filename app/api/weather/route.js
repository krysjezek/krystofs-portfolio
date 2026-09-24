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
    if (forecast.properties?.meta?.units?.air_temperature !== "celsius") {
      throw new Error("Unexpected temperature unit");
    }
    const now = Date.now();
    const hours = forecast.properties.timeseries;
    if (!Array.isArray(hours)) throw new Error("Missing forecast");
    const closest = hours.reduce((best, hour) => {
      const distance = Math.abs(Date.parse(hour.time) - now);
      const temperature = hour.data?.instant?.details?.air_temperature;
      if (!Number.isFinite(temperature) || !Number.isFinite(distance) || distance > 90 * 60 * 1000) return best;
      return !best || distance < best.distance ? { distance, temperature, time: hour.time } : best;
    }, null);
    if (!closest) throw new Error("No current forecast");
    return Response.json({
      temperature: Math.round(closest.temperature),
      time: closest.time,
    }, {
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
