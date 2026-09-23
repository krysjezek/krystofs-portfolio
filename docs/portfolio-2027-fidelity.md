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
