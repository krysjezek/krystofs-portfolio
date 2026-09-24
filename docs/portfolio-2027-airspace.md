# Prague airspace interaction

## Reliability update — 24 September 2026

The independently deployable collector is public at
[krysjezek/prague-airspace](https://github.com/krysjezek/prague-airspace).
It collects traffic every 15 seconds and LKPR METAR every five minutes, keeps
atomic snapshots and retry deadlines on a Railway volume, and serves read-only
`/v1/snapshot`, `/healthz` and `/readyz` endpoints. One replica keeps collection
independent of visitor count. The user authorized deployment after repository publication.
The collector is running at
[`prague-airspace-production.up.railway.app`](https://prague-airspace-production.up.railway.app/readyz)
as one always-on replica in Railway's Europe region, with `/data` on a persistent
volume. `/healthz` and `/readyz` passed; a controlled restart retained the saved
weather poll deadline and resumed current traffic. The effective Railway deployment
uses `/healthz` with a 30-second startup timeout, On Failure restarts, and no sleeping.
These settings live in Railway service configuration; new services no longer read
the retired `railway.json` format. The portfolio rollout is **staging only**.
`AIRSPACE_SERVICE_URL` is configured for Vercel Preview and removed from Production.
The staging deployment is
[`krystofs-portfolio-f8o2p313z-krystofjezeks-projects.vercel.app`](https://krystofs-portfolio-f8o2p313z-krystofjezeks-projects.vercel.app)
(`dpl_H2TikgZX2VLgB6siXmo1BKuwqreC`). The map is zoomed to 175.5% (135% × 1.3) in both preview and detail views, with matching map
height, original label sizes, 24px aircraft icons, and the full 30 km collection radius.
Production promotion requires a separate
explicit request. An earlier mistaken promotion was rolled back: both production
domains resolve to the original `dpl_H1q5FoZSoocBHtKRBc9f2wVEgyRz` deployment.

Before rollback, `node scripts/verify-airspace-deployed.mjs` passed
against the deployed release at 1440, 834 and 390px: fresh real traffic and weather,
advancing observation timestamps, aircraft selection/details, no panel overflow,
no missing airspace assets and no browser errors. The final read contained three
aircraft with a 13-second observation age. Production runtime error logs were
empty. The script also accepts an optional ignored Netscape cookie jar for
authorized verification of a protected Vercel deployment before promotion.

The release also updates Next.js and its companion packages to 16.3.6, and the
PostCSS override to 8.5.28, with compatible dependency fixes. `npm audit` reports
zero vulnerabilities. This addresses the published image-optimizer advisory
[GHSA-2xp9-vwfh-vxw4](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4)
found during the pre-deployment dependency install.

Set the server-only `AIRSPACE_SERVICE_URL` to its HTTPS origin to connect the
portfolio. The two existing same-origin API routes read the same versioned
snapshot through a 10-second Next cache. A configured collector outage never
fans out to direct provider requests. No browser secrets, new pages or SEO
changes are needed. Without the variable, the portfolio uses its hardened
request-driven adapters, sharing successful results through the Next Data Cache.

Two verified failure mechanisms motivated this change: error objects previously
replaced cached good data; after an idle interval, stale-while-revalidate could
serve an expired snapshot to the first visitor. Provider failures now throw
inside the persistent cache boundary, preserving successful data. Expired cache
reads join a bounded, coalesced foreground refresh. Outages retain original
observation timestamps and expose delayed status; they never reset freshness.

Collection requests a 25 NM buffer while still displaying only the exact 30 km
Prague radius. Deduplication prefers newest positions, individual tracks never
rewind, and brief missing reports are retained for at most 45 seconds from their
last observed position. Positive landing/departure reports remove them immediately.
Reports still fade at 60 seconds and expire at 120; estimates stop at 30 seconds.
True quiet airspace becomes empty. Missing route/model matches remain explicitly
unavailable rather than inferred. Static route/model enrichment stays on selection.

The browser keeps its 30-second traffic cadence and now retries transient
failures after 15 seconds, with a 60-second ceiling and server retry deadlines.
Reconnection retries immediately. Visibility cancellation is not counted as a
network failure. Desktop, tablet, mobile and reduced-motion behavior are preserved.
Responses allow short CDN caching (5 seconds traffic, 30 seconds weather), while
browser responses remain `no-store`; observation ages remain authoritative.

Verification commands:

```powershell
node --test scripts/aircraft.test.mjs scripts/airspace-feed.test.mjs scripts/airspace-service.test.mjs scripts/aircraft-details.test.mjs scripts/airport-weather.test.mjs
node scripts/verify-airspace.mjs
node scripts/verify-airspace-cache.mjs
# With the collector running on port 8080, after npm run build:
node scripts/verify-airspace-collector.mjs
```

The production integration scripts own a temporary server on port 3001 and
always stop it; they leave the regular port 3000 dev server and environment files
alone. The collector script checks real provider data at 1440/834/390px; the cache
script uses explicitly labelled fixtures and tests idle starts, outages and
recovery without provider requests. The standalone repo's `npm test` additionally
covers durable restart state, atomic writes and HTTP request fan-out.

Verified for this update: 29 portfolio data tests, 85 airspace browser assertions,
33 Figma layout screens, production-cache failure/recovery tests, real collector
integration at all three widths, lint, production build and portfolio verifier.
The standalone collector's 14 tests also pass in public GitHub CI on Node.js 22.

Designed and implemented on 24 September 2026. The homepage Prague control opens
the live aircraft interaction from the editable Figma study.

## Website implementation

`components/portfolio/PragueAirspace.jsx` owns the preview, desktop detail popover,
mobile sheet and shared report snapshot. `AirspaceMap.jsx` renders the exact Figma
geography, runway and aircraft SVG exports from `public/airspace/`, with dynamic
received positions and trails. Aircraft symbols are domain data artwork; the
current text-only Prague header utility is retained. `AirspaceDetails.jsx` loads
route/model information only for the selection. No public page or SEO route was added.

`hooks/useAirspacePolling.js` pauses both feeds when closed, hidden or off-screen,
aborts pending requests, retains the next due time and backs off after errors.
`hooks/useAircraftMotion.js` uses native requestAnimationFrame, with a two-second
correction, a 30-second projection limit and immediate received positions under
reduced motion. Reports fade at 60 seconds and expire at 120 seconds. Selection
does not convert estimated positions into observations. Mouse and touch select the plane nearest the pointer within a 44px hit target,
independent of map zoom. The callsign chooser appears only for substantially
overlapping icons (centers within 14px) without a clear nearest plane (pointer
distances within 6px). Keyboard activation selects its focused marker directly.

`/api/aircraft`, `/api/airport-weather` and `/api/aircraft/[id]` restore the archived
server adapters with shared Next caches, bounded timeouts and provider backoff.
The detail endpoint binds IDs/callsigns to recent Prague reports. Missing routes
and aircraft models are never inferred. Invalid weather fields become missing
readings. Last-known observations retain their original timestamps.

The optional `mode="simulation"` component prop explicitly selects generated demo
traffic, with its blue hollow status badge and unavailable weather. The homepage
always uses live mode. There is no error-triggered simulation fallback or public
mode switch. Intercepted browser-test reports are visibly labelled TEST DATA / NOT LIVE.

Provider documentation rechecked on 24 September 2026:
[ADSB.lol access / ODbL](https://www.adsb.lol/docs/open-data/api/),
[live API contract](https://api.adsb.lol/api/openapi.json),
[VRS callsign standing data / CC0](https://github.com/adsblol/vrs-standing-data),
[adsbdb aircraft API](https://www.adsbdb.com/),
[AWC METAR API](https://aviationweather.gov/data/api/),
[Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) and
[OurAirports](https://ourairports.com/data/). Source and licence links are visible
in the detail panel. Live aircraft and LKPR METAR responses were verified locally;
route/model availability varies, with truthful fallbacks verified. The archived
provider guidance to contact ADSB.lol before public rollout remains a provider
relationship consideration; no messages were sent to the provider. Deployment
and verification are recorded in the reliability update above.

Verification: `node --test scripts/aircraft.test.mjs scripts/aircraft-details.test.mjs
scripts/airport-weather.test.mjs` and `node scripts/verify-airspace.mjs`. The browser
suite covers preview/detail snapshot reuse, selection/clearing, overlapping
targets, focus restoration, mobile focus containment, desktop/tablet/mobile
geometry, received-position mode, delayed/empty/unavailable states, expiration,
five-minute weather refresh and hidden/off-screen/closed polling. Screenshots go
to the operating system temporary directory under `portfolio-airspace`.

Handoff checks passed: 13 data/motion tests, 74 airspace browser assertions,
33 existing Figma layout screens, lint, production build and the portfolio
verifier. The explicit simulation prop was also exercised in an isolated local
harness: five generated aircraft, labelled demo status, unavailable weather and
zero aircraft/weather API requests. The temporary harness was removed.

The sections below record the original Figma specification and design review.

- [Figma overview / 11 · Prague airspace](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=371-3)
- [Desktop selected state](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=375-7432)
- [Desktop hover preview](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=391-1504)
- [Live / Simulation hover variants](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=402-9038)
- [Shared status colour guidelines](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=411-2)
- [Simulation hover screen](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=402-9043)
- [Interaction contract](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=377-8525)
- [Feedback states and editing guide](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=377-8584)
- [Desktop prototype](https://www.figma.com/proto/z5qZnFX6vkOKlWrVKzdoFR?node-id=375-7645&starting-point-node-id=375%3A7645)
- [Mobile prototype](https://www.figma.com/proto/z5qZnFX6vkOKlWrVKzdoFR?node-id=375-7838&starting-point-node-id=375%3A7838)

## Source and scope

Source: `checkpoint/pre-rebuild-2026-09-23`, especially
`components/AircraftMap.jsx`, `components/AirportWeather.jsx`,
`hooks/useAircraftMotion.js`, `lib/aircraft.mjs`, `data/prague-map.json`,
`data/lkpr-runways.json` and `docs/airport-module.md`.

The original module visualised real aircraft reports and estimated movement
between updates. The Figma examples are static fixtures. Detailed panels carry
**Preview · not live**; hover cards demonstrate actual **Live / Simulation** UI
with the illustrative-data disclaimer outside the cards. The EWG7KG route/model example comes from the archived
verification record; its displayed position and all weather readings are examples.
No current provider availability or current flight route is asserted.

The proposal extends the existing Prague header utility. It is not a new public
case study, and adds no route, navigation item, SEO record, media upload or
production deployment. Existing Figma source screens and component definitions
were reused without modification. A new directory entry links to the study.

## Design

Hover titles retain `Portfolio / Body Compact` (Roobert PRO Regular 16/24, −0.5% tracking, `text/primary`). Supporting labels use `Portfolio / Label` (11/16, 2% tracking, `text/secondary`) at full opacity. Compact cursor and focus tooltips use Label 11/16 throughout. The web maps these to shared `--type-body-compact`, `--type-label`, `--tracking-body`, `--tracking-label`, `--ink` and `--muted` tokens; see [context previews](portfolio-2027-context-previews.md).

Hover previews and bounded desktop/tablet detail panels use the shared
[Floating elevation](portfolio-2027-elevation.md). Apply it once to the panel;
mobile sheet content remains flat.

Reuse Roobert PRO text styles, existing semantic colours, 0.5px subtle dividers,
3px control corners, Project Tag and Button / Secondary components. Status colour
tokens extend the neutral foundation; typography is unchanged. Original Natural Earth geography and LKPR
runway geometry are editable vectors. Existing portfolio photos remain image
fills in the contextual background screens.

- Desktop 1440: 440px panel, right inset 35px, top 80px.
- Hover preview: 360px wide with 16px padding, 10px gaps, 0.5px border and
  3px corners, retaining Barbour's Source note styling (`313:981`). The 170px
  map sits between a status/heading/traffic summary and a compact information
  row, followed by “Click for more details”.
- Live uses a solid dot, report age, nearby aircraft count and radius, followed
  by LKPR temperature, wind and visibility. Simulation uses a hollow dot,
  “SIMULATION / DEMO DATA”, simulated count and coverage; weather is unavailable.
  Both are 409.5px tall with 24px status badges. Simulation has its own title without the word “Live”.
- A 12px plane replaces the location pin in the proposal's screen instances.
  The canonical header component remains unchanged.
- Tablet 834: 440px panel, right inset 24px, top 80px.
- Mobile 390: sheet beneath the 60px header, with 20px side insets and a 350px
  panel. The sheet allows vertical scrolling when its content exceeds the viewport.
- Geographic scale stays fixed. Narrow panels crop the outside context rather
  than stretching the 30km circle. The map is north-up without a compass.
- Aircraft symbols are 15px inside 44px targets. Selection retains the hollow
  estimated symbol and adds a ring; it must not change a report's meaning.

The editable chain is Aircraft marker → Map → Panel → Screen. Component families:

| Family | Node | Variants |
| --- | --- | --- |
| Airspace / Aircraft marker | `373:7358` | Observed, Estimated, Selected, Unknown, Stale |
| Airspace / Map | `373:7418` | Overview, Selected |
| Airspace / Panel | `373:7725` | Desktop/Mobile × Overview/Selected |
| Airspace / Hover preview | `402:9038` | Live (`391:1466`), Simulation (`402:8988`); separate title/summary properties and nested map instances |
| Airspace / Prague plane icon | `391:1501` | Reused aircraft silhouette |

The panel exposes Traffic count and Feed status text properties. Source credits
include real hyperlinks. The new page ID is `371:2`; the Start here directory
entry is `382:2`.

### Status colours

Use vivid accents in small status badges, with an 8px marker, 3px corners,
4px vertical / 8px horizontal padding and a pale tinted background. Keep the
map, large surfaces, values and ordinary text neutral. Explicit labels and
solid/hollow markers preserve meaning without colour. Live uses green;
Simulation uses blue. The feedback guide uses amber for delayed/partial
availability and red for unavailable traffic; empty and connecting stay neutral.

| Role | Indicator | Text | Badge background | Text contrast |
| --- | --- | --- | --- | --- |
| Positive / Live | `#45CD62` | `#147A35` | `#E8FAED` | 5.00:1 |
| Informative / Simulation | `#397CFB` | `#2459C7` | `#EBF2FF` | 5.61:1 |
| Warning / delayed | `#F4AC20` | `#935700` | `#FFF4D9` | 5.33:1 |
| Negative / unavailable | `#FA4D5B` | `#C62839` | `#FFF0F2` | 5.05:1 |

Figma semantic tokens are `status/{positive,informative,warning,negative}` for
readable foregrounds, with `-indicator` and `-surface` companions. They alias
the corresponding `palette/{green,blue,amber,red}/{foreground,accent,surface}`
primitives. The brighter badge treatment replaces the earlier muted palette.
These tokens and specimens currently live in Figma; no website CSS changed.

## Behaviour contract

Hover Prague for 150ms to reveal the anchored preview. Keep it open while the
pointer crosses the 10px gap or remains over the trigger/card; dismiss after
150ms outside that shared region. Keyboard focus reveals it without moving
focus. Escape dismisses and suppresses reopening until leave/re-enter. The
preview is an interactive popover, not an ARIA tooltip, and its markers are
not individually selectable. Suppress the generic cursor hint over it.

Click Prague or the preview to open details. On touch, tapping Prague goes
straight to details; Enter/Space does the same from the keyboard. Select an
aircraft to reveal callsign, From, To and aircraft below the map. Clicking it
again clears details. Details persist until Close, Escape or outside click.
Desktop details are non-modal; Tab may leave and outside click preserves the
clicked target's focus. The mobile sheet contains focus. Close/Escape restores
focus to Prague. Focus management and an overlapping-target callsign chooser
are implementation requirements, not demonstrated prototype capabilities.

Panel transitions use 150ms ease-out opacity. Retain the current portfolio's
quiet control feedback and fixed targets. No radar sweep or decorative pulse.
Meaningful aircraft movement runs only while preview or details is visible.
The preview title says “Live” only with fresh reports; connecting, delayed and
unavailable feeds use truthful status copy.
Simulation is an explicit demo mode, not a freshness or error state. Never
silently switch to generated traffic when the live feed fails. No mode-selection
control is proposed in this pass; the two variants demonstrate their appearance.

Preserve the archived timing: aircraft refresh every 30 seconds, weather every
5 minutes, estimates stop advancing after 30 seconds, reports become stale at
60 seconds and expire at 120 seconds. Blend fresh reports from the rendered
position over 2 seconds. Trails contain at most five distinct received positions.
Poll aircraft and weather while either live preview or details is visible.
Simulation uses generated traffic and has no live weather. Reuse the current report snapshot when moving from preview to
details. Pause polling and motion when closed, hidden or off-screen. Freshness uses the
observation time. Reduced motion shows received positions without projection
or interpolation and makes UI transitions immediate.

The feedback board covers connecting, empty, unavailable, delayed updates,
expired/departed selection, unavailable details, unavailable weather and reduced
motion. Missing fields are not guessed. Routes remain callsign database matches,
not confirmed flight plans. Runways indicate geometry, not active usage.

Before a future website restoration, re-read the archived provider notes and
verify current provider terms/access. Keep the current native-browser motion
architecture; do not reintroduce the archived GSAP runtime.

## Verification

Visually reviewed desktop, tablet and mobile compositions, panel details,
interaction contract and state catalogue. Corrected auto-layout row clipping,
UTF-8 labels, narrow weather wrapping, canvas spacing and selection semantics.
Structural audit found no overflowing text, missing text styles or malformed
labels in the new panels and documentation.

Verified in actual Figma prototype playback: desktop open → select → close;
mobile open → select → clear → close. All ten new prototype targets have linked
destinations and at least 44px height. Tablet is a visual reference.

Initial hover refinement: reviewed the preview both in isolation and in its desktop
screen, and checked the updated contract for clipping. Verified preview click →
details → Close in playback, plus direct Prague click → details. Enter/leave
reactions and the shared hover region are configured with 150ms delays; automatic
pointer-hover playback was not verified because the browser controls expose
click and drag but no hover action. The intended hover timing still needs a
manual pointer check. Temporary preview padding propagated from the main to the
screen instance; restored and confirmed the original 16px token binding.

Expanded hover refinement: reviewed the 360px Live and Simulation cards side by
side and in their desktop screen instances. Verified simulation-specific copy
propagates correctly and repeated/restored the main-to-screen spacing probe.
Resized the Live hover region and click target to cover the expanded card.
The Simulation screen is a visual specimen; its detail navigation is unwired
so it cannot misleadingly open a Live detail example. The existing Live detail
connections are preserved. No simulation playback engine was implemented.

Colour refinement: checked both linked screen instances, the comparison cards
and the Foundations guide. Confirmed variable inheritance through the semantic
alias into the screen, and measured text contrast against each badge tint.
Expanded hover/click bounds match the 409.5px cards. Colour does not animate.

Temporarily changed the observed marker's semantic colour and the selected
desktop panel's radius. A subsequent read confirmed colour inheritance through
main → map → panel → screen and radius inheritance into the screen. Restored
the exact original primary-colour binding and 3px tag-radius binding, and read
them back to confirm restoration.

The prototype does not fetch aircraft/weather, animate continuous flight,
implement keyboard focus management, or respond to OS preferences. Those
behaviours require browser verification when the website is implemented.

Repository checks: lint passed without warnings; production build and
`node scripts/verify-portfolio.mjs` passed; `git diff --check` passed. No
application layout code was changed, so the Figma work did not require new
layout measurements or a layout-baseline update.
