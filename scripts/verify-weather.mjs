import assert from "node:assert/strict";
import { GET } from "../app/api/weather/route.js";

const realFetch = globalThis.fetch;
const hour = (minutes, temperature, time) => ({
  time: time ?? new Date(Date.now() + minutes * 60000).toISOString(),
  data: { instant: { details: { air_temperature: temperature } } },
});
const forecast = (timeseries, unit = "celsius") => ({
  properties: { meta: { units: { air_temperature: unit } }, timeseries },
});
try {
  let options;
  globalThis.fetch = async (_url, init) => {
    options = init;
    return Response.json(forecast([hour(-40, 12), hour(20, 15.6)]));
  };
  const response = await GET();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).temperature, 16);
  assert.equal(options.next.revalidate, 3600);
  assert.match(options.headers["User-Agent"], /krystofjezek.com/);
  assert.match(response.headers.get("cache-control"), /s-maxage=600/);

  for (const invalid of [
    forecast([hour(-180, 12)]),
    forecast([hour(0, null)]),
    forecast([hour(0, 12, "invalid")]),
    forecast([hour(0, 12)], "fahrenheit"),
    {},
  ]) {
    globalThis.fetch = async () => Response.json(invalid);
    const unavailable = await GET();
    assert.equal(unavailable.status, 503);
    assert.equal((await unavailable.json()).temperature, null);
  }
  globalThis.fetch = async () => { throw new Error("Timeout"); };
  assert.equal((await GET()).status, 503);
  globalThis.fetch = async () => new Response(null, { status: 429 });
  assert.equal((await GET()).status, 503);
  console.log("PASS: current-hour selection, rounding, caching, provider identification, stale/malformed data and provider failures.");
} finally {
  globalThis.fetch = realFetch;
}
