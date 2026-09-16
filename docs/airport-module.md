# Airport module

Preview: `http://localhost:3000/test/aircraft`. The route inherits the test layout's
`noindex, nofollow` metadata and is not added to navigation, sitemaps or creative
works. Mount `<AirportWeather />` wherever the future portfolio layout needs it.
The current checkout had no weather gadget; this component implements the supplied
[Figma frame 43:1119](https://www.figma.com/design/2wt1HbmFsNjaVPKF8tv8YW/Krystof-Portfolio?node-id=43-1119)
with a real LKPR METAR readout and the map beneath it. No compass.

## Provider evaluation — 16 September 2026

- [ADSB.lol public API](https://www.adsb.lol/docs/open-data/api/) and
  [live OpenAPI](https://api.adsb.lol/api/openapi.json): free, no credentials
  currently required. `/v2/point/{lat}/{lon}/{radius}` uses **nautical miles**, up
  to 250. The query uses Prague 50.0755, 14.4378 and 17 NM (31.484 km); server
  filtering enforces the requested 30 km radius. The initial 50 km evaluation contained 38 reports;
  subsequent map checks displayed 16–17 positioned airborne aircraft after
  excluding ground, old, invalid and out-of-radius reports. This demonstrates
  coverage at the test time, not completeness or guaranteed availability.
- [API repository](https://github.com/adsblol/api): rate limits are dynamic with
  load; there is no promised fixed quota. An API key may be required in future.
  The live OpenAPI description asks production users to contact the operator
  so API changes do not unexpectedly break their application. **Contact the
  operator before public rollout.** No contact was sent by this implementation.
- Public API data is [ODbL 1.0](https://opendatacommons.org/licenses/odbl/1-0/).
  Keep the visible ADSB.lol and ODbL links. The public endpoint makes the normalized
  extract available with source and licence identifiers. The code licence of the
  provider's repository and its feeder-contribution CC0 terms are distinct from
  the API data licence. Preserve ODbL notices and applicable share-alike/access
  obligations if persisting or redistributing a derived database in future.
- ADSB.lol is suitable for this small, noncritical module given demonstrated
  coverage and current access terms. No paid service or subscription is needed.

## Geography and weather

- [Natural Earth terms](https://www.naturalearthdata.com/about/terms-of-use/)
  permit commercial use and adaptation of its public-domain data without a key
  or attribution requirement. The module nevertheless credits Natural Earth.
  `data/prague-map.json` is an 11.7 KB vector extract of roads and rivers from
  [Natural Earth's source GeoJSON](https://github.com/nvkelso/natural-earth-vector/tree/master/geojson).
  Regenerate with `node scripts/prepare-prague-map.mjs`. This is generalized
  geographic context, not navigation cartography. It uses the same local
  projection as the aircraft. The north-up view includes the entire 30 km circle
  and LKPR. On narrow screens only the outer geographic context is cropped.
  No runtime tile requests, map SDK, external font, or raster assets were added.
- Weather comes from the [NOAA/AWC METAR API](https://aviationweather.gov/data/api/)
  at a five-minute cadence with a shared cache and custom User-Agent. Its published
  limit is 100 requests/minute; browser CORS is unavailable, so requests are made
  on the server. [NWS usage terms](https://www.weather.gov/disclaimer) permit
  use of public-domain information with the stated restrictions. Keep the NOAA/AWC
  source link and observation time. Missing readings use a dash. The `9999` METAR
  visibility group is shown as 10+ km; other API visibility values are converted
  from statute miles. No sample weather is presented as live.

## Data flow and timing

`AirportWeather` / `AircraftMap` → same-origin GET endpoints → Next persistent
Data Cache → provider. Aircraft cache revalidation is 30 seconds; weather is 300.
These are shared Next cache entries across visitors on Vercel, not per-browser
upstream calls. A worker also coalesces concurrent cold requests and respects
Retry-After (seconds or date) with at least a minute of backoff. Error envelopes
are cached too. Worker backoff is not a distributed rate-limit lock; for scaled
self-hosting, configure a shared Next cache handler and, if needed, a distributed
provider limiter. Next background revalidation can return the previous snapshot;
the UI always uses the provider's actual timestamp, never the response time, for
freshness. Browser and endpoint responses are `no-store` so they cannot conceal age.

Browser polling is every 30 seconds while intersecting the viewport and the tab
is visible. Hidden/off-screen views abort outstanding requests and stop timers;
resuming respects the prior due time. Failures use exponential backoff up to five
minutes and honor server retry timing. There are eight-second upstream and
ten-second browser timeouts. No credentials or environment variables are needed.

Only positioned airborne reports less than two minutes old are displayed.
The count matches those markers. Selecting an aircraft shows From, To, and
Aircraft, replacing the altitude/speed readout. Unknown track uses a circle rather
than a falsely oriented aircraft; speed remains internal to the movement estimate.

`/api/aircraft/[id]` binds the lookup to a recent aircraft in the shared Prague
snapshot. The browser cannot supply its own callsign or upstream URL. Route data
comes from [ADSB.lol's VRS standing-data service](https://github.com/adsblol/vrs-standing-data),
whose [upstream data is CC0](https://github.com/vradarserver/standing-data).
It provides IATA (or ICAO) codes and city names. This is a callsign database match,
not a confirmed current flight plan; the route source link carries that explanation
in its tooltip. Missing, mismatched or multi-leg routes are not guessed. The
documented routeset POST returned an empty HTTP 201 during evaluation, so the
documented per-callsign JSON service is used directly instead.

Full aircraft models come from [adsbdb's aircraft endpoint](https://www.adsbdb.com/),
matched by Mode-S ID. Keep its adsbdb / PlaneBase credit. Its documented rate
limits start at 512 requests per rolling minute (60-second block), increasing to
a 300-second block at 1024. Lookups run only when selected, with shared caching:
one hour for source route JSON, one day for model data, and one minute for the
combined response including failures. The selected panel refreshes at five minutes
while visible. No key or subscription is required. We do not use adsbdb flight
routes, which carry separate copying/publishing restrictions, or aircraft photos.
If the model lookup has no match, show the live feed's type code; never invent a
subvariant. Live verification returned PRG—Prague to DUS—Düsseldorf and Airbus
A320-214 for EWG7KG. Only the source line is shown beneath these fields, per the
requested compact layout; per-aircraft projection/report notes were removed.

Small dots are received positions, trails join at most five distinct received
positions, and hollow aircraft indicate estimated positions. Estimates use only
reported speed and ground track, stop progressing after 30 seconds, fade as stale
at 60 seconds and disappear at 120 seconds. No synthetic initial trails. A single
GSAP ticker updates marker transforms every animation frame, without React renders
or layout reads. New reports blend from the last rendered position over two
seconds while continuing toward the moving target; heading corrections take the
shortest turn across north. There is no initial two-second projection jump.
The ticker stops when hidden/off-screen. Reduced-motion shows received positions
with no interpolation or projection. Estimates are never written into the data cache.
Selection stays anchored to the aircraft ID and reports departure/expiry explicitly.

Loading, no airborne reports, failed initial fetch, failed refresh with last-known
data, and stale feed states are separate. Development browser tests intercept
requests with `fixture: true`; this displays **DEVELOPMENT FIXTURE — NOT LIVE
TRAFFIC**. No production endpoint accepts a fixture mode or substitutes traffic.

## Verification

Run `node --test scripts/aircraft.test.mjs scripts/aircraft-details.test.mjs`, `npm.cmd run lint`,
`npm.cmd run build`, and `git diff --check`.

Browser verification covers desktop and 390 px mobile rendering, live API data,
selection and unknown fields, actual timestamp refresh, observed trail generation,
off-screen polling pause/resume, hidden-tab event handling, empty and unavailable
states, failed-refresh retention, and frozen stale markers. Browser failure tests
use explicitly labelled intercepted data, not upstream request flooding.
Hidden-tab state was emulated with a visibility-change event. A mobile touch
context additionally verified tap selection and a swipe beginning over the map;
reduced-motion disabled both estimated positions and CSS movement. Build and all
ten focused tests pass; lint reports zero errors and 61 existing image warnings.

Deployment remains a separate, explicitly requested action. Recheck provider
terms and coverage before public rollout. No changes to homepage placement are
needed to review the standalone module locally.
