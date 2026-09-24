# Prague airspace interaction

Design proposal created on 24 September 2026. This restores the archived aircraft
interaction as an editable Figma study; it does not restore the website module.

- [Figma overview / 11 · Prague airspace](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=371-3)
- [Desktop selected state](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=375-7432)
- [Desktop hover preview](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=391-1504)
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
between updates. The Figma examples are static fixtures explicitly labelled
**Preview · not live**. The EWG7KG route/model example comes from the archived
verification record; its displayed position and all weather readings are examples.
No current provider availability or current flight route is asserted.

The proposal extends the existing Prague header utility. It is not a new public
case study, and adds no route, navigation item, SEO record, media upload or
production deployment. Existing Figma source screens and component definitions
were reused without modification. A new directory entry links to the study.

## Design

Reuse Roobert PRO text styles, existing semantic colours, 0.5px subtle dividers,
3px control corners, Project Tag and Button / Secondary components. New colour
or type tokens were unnecessary. Original Natural Earth geography and LKPR
runway geometry are editable vectors. Existing portfolio photos remain image
fills in the contextual background screens.

- Desktop 1440: 440px panel, right inset 35px, top 80px.
- Hover preview: 320px wide with 16px padding, 10px gaps, 0.5px border and
  3px corners, matching Barbour's Source note / Panel (`313:981`). Show only
  the map, “Live air traffic over Prague” and “Click for more details”. The
  static Figma fixture also carries “Design preview · not live”.
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
| Airspace / Hover preview | `391:1466` | Title property; nested map instance |
| Airspace / Prague plane icon | `391:1501` | Reused aircraft silhouette |

The panel exposes Traffic count and Feed status text properties. Source credits
include real hyperlinks. The new page ID is `371:2`; the Start here directory
entry is `382:2`.

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

Preserve the archived timing: aircraft refresh every 30 seconds, weather every
5 minutes, estimates stop advancing after 30 seconds, reports become stale at
60 seconds and expire at 120 seconds. Blend fresh reports from the rendered
position over 2 seconds. Trails contain at most five distinct received positions.
Poll aircraft while either preview or details is visible; fetch weather only
in details. Reuse the current report snapshot when moving from preview to
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

Hover refinement: reviewed the 320px preview both in isolation and in its desktop
screen, and checked the updated contract for clipping. Verified preview click →
details → Close in playback, plus direct Prague click → details. Enter/leave
reactions and the shared hover region are configured with 150ms delays; automatic
pointer-hover playback was not verified because the browser controls expose
click and drag but no hover action. The intended hover timing still needs a
manual pointer check. Temporary preview padding propagated from the main to the
screen instance; restored and confirmed the original 16px token binding.

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
