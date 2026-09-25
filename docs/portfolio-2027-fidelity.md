# Figma fidelity correction — 23 September 2026

The first rebuild passed functional checks but had visual discrepancies. This pass compared the implementation with the actual Figma node bounds and screenshots, using the frame IDs in the [handoff](portfolio-2027-handoff-audit.md).

## Corrections

- Center the entire application on a canvas no wider than 1440px. At a 1920px viewport the white outer margins are 240px each.
- Use explicit 0.5px column rules: three columns on desktop, two on tablet, none on mobile. The 3D Worlds tablet frame retains its authored three-column grid.
- Load Roobert PRO Regular instead of the older Roobert Regular. The WOFF2 is a lossless font-format conversion of the owner's installed Roobert PRO Regular TTF.
- Match headline sizes, inline-link baselines, navigation height, About spacing and photo dimensions, and footer spacing. Keep “art-directed” together as in the Figma inline-copy component.
- Match the slightly unequal desktop Fun columns (187:187:184), which align their bottom edges.
- Correct case-study specification spacing, responsive paragraph gaps, credit rows, recommendation insets, and Vizcom's desktop 2:1 detail pair versus equal landscape crops on tablet/mobile.
- Restore the 3D Worlds section dividers, padding, output reading order, caption insets and mobile landscape crops. Match its current Figma copy.
- Match 404 introduction geometry and recognition header, row, backdrop and footer styling.

## Verification

`npm run test:layout` checks 33 Figma frames: Work/Fun/About, six cases, 3D Worlds and 404 at 1440/834/390px. The fixture contains Figma measurements rather than recordings of the implementation. There are 436 coordinate assertions across 180 elements, with a 0.6px tolerance for fractional layout rounding. Tablet About's inner Figma photo frame is represented by a CSS wrapper with 5px padding, so its wrapper check compares vertical geometry; individual photo dimensions were also inspected during this audit.

The same run checks visible grid rules, no horizontal overflow, a centered 1440px canvas on a 1920px display, recognition dialog dimensions, all 18 records, Escape dismissal, focus restoration, and browser runtime errors. Screenshots were reviewed for desktop Work, Fun, Vizcom and 3D Worlds, mobile About and 3D Worlds, and wide-screen margins.

Lint, production build and `scripts/verify-portfolio.mjs` pass. The latter retains route, canonical, gallery-order, media-dimension and archive-indexing checks.

The coordinate test is a layout regression check, not a pixel-difference assertion for every image or video frame. Browser text rasterization can differ from Figma. Live time, animated media and the approved random related-project selection are dynamic; related-project samples can change the total case-page height. Weather remains deferred, and the eight films awaiting source masters retain their approved posters.

The application remains available locally. Nothing was pushed or deployed.

## Follow-up: tab shifts and short-page footer

The initial check used a browser with hidden scrollbars and missed the horizontal shift when About fits the viewport. The root now reserves stable scrollbar space on both sides, keeping the canvas centered as page height changes. The page shell uses a column flex layout with a growing main region, so the footer meets the bottom of a short viewport and follows content on longer pages.

The layout test now launches Chromium with scrollbars enabled. Figma coordinates are compared relative to the content canvas, allowing for scrollbar space without changing the reference measurements. Additional checks repeatedly switch Work/About/Fun at 1920×1400, 1280×1600, 834×1600 and 390×2400, asserting unchanged horizontal position, width and navigation position, a bottom-aligned About footer, and no content overlap.

## Updated grid token

Synced Figma's `border/subtle` → `palette/super subtle` value to `#ededed`. Column rules start at Y=0 and span the complete page. Grid lines and horizontal dividers use 0.5px; the navigation separator and selected-tab indicator use the same thickness without changing the existing section positions. The darker selected-tab color remains the separate selected-state token.

Page-level horizontal dividers extend across the viewport beyond the 1440px canvas. Content, vertical column rules and dialog-local separators retain their existing widths.

## Follow-up: center rules in card gutters

The original gallery's 5px outer padding and 5px gaps put its gap centers off the page thirds. Work and Fun now use equal structural columns with half-gutters inside each column, retaining 5px outer insets and 5px between cards. Interior rules are centered on exact thirds (halves on tablet). This supersedes the unequal desktop Fun columns: card widths and masonry heights intentionally differ slightly from the original Figma measurements. The original fixture is retained; those desktop width/height comparisons are replaced by assertions for gutter width, line centering and structural column alignment. Mobile dimensions are unchanged.

Work and Fun columns also finish at a shared bottom edge. On desktop and tablet, the final card fills any remaining height in its column, with cover cropping inside its frame. Earlier cards retain their authored ratios and all gaps stay 5px. Browser checks cover both galleries at nine widths from 390 to 1920px; the layout suite asserts matching card/media bottom edges and unchanged vertical gaps.

## Follow-up: Fun card ratios

Owner-approved on 24 September 2026: Handheld Loop uses 1:1 and The Mag Wrap
uses 16:9 at desktop, tablet and mobile widths. These two cards retain their
ratios when columns balance; the last flexible card in each column absorbs any
remaining height. This supersedes their original 4:3 Figma frames. The reference
fixture stays unchanged; Fun page height checks add the height difference
calculated from the approved ratios, with explicit card-ratio checks alongside
the existing balanced-column checks.

## Follow-up: compact Mentions and credits popover

Owner-approved on 24 September 2026: replace the recognition modal with a compact
popover. Its trigger remains beneath the third, personal biography paragraph.
The trigger and heading read "Mentions and credits"; the resume footer is removed.
The label has 22px of space above it (8px margin plus 14px hit-area padding).

The three updated mobile About fixture values were measured from edited Figma
frame `25:448`, not recorded from application output: the frame is 2209.86px high,
content `25:466` is 1633.86px high, and photos start at 900.5px. Desktop and tablet
page/photo geometry is unchanged. Popover checks cover 320, 390, 834 and 1440px
viewports, classic scrollbar gutters, bounds, header stability, all 18 records,
dismissal and restored focus.

## VSX media refresh: 25 September 2026

The owner requested media pacing similar to Gusto, using new VSX Knitting sources. The header retains 16:10. The first media row now pairs a 20:13 product view with a 3:4 fabric close-up, followed by two square breakdowns. The original Figma fixture is retained: the layout check derives the media-height and subsequent vertical-position changes from these authored ratios and the existing 5px gutters. No Figma measurements were replaced with application output.
