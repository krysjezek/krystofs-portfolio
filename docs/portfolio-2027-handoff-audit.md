# Portfolio 2027 developer handoff audit

Reviewed 2026-09-23 against repository `ea9ffa3` and live Figma file `z5qZnFX6vkOKlWrVKzdoFR`.

[Open temporary Figma audit](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=271-3) on **09 · Temporary handoff audit** (page `271:2`).

Board IDs: overview `271:3`; confirmed issues `271:20`; conflicts/routes `271:41`; Work inventory `271:63`; Fun inventory `271:84`; reuse/media/data `271:105`; acceptance `271:131`. Each board links to the next and relevant original evidence. Original pages and components were preserved.

Verification: all seven report boards were rendered and inspected after text-height correction; structural checks found no overlapping children or out-of-bounds text. Local homepage loaded at 1440×1000 and 390×844, and Vizcom at 390×844. No framework error overlay was observed; existing image sizing/LCP warnings remain. `npm run lint` passed with 61 existing warnings and zero errors; `npm run build` passed (Next.js 16.2.10); `git diff --check` passed. These checks validate the repository baseline and report, not implementation of the redesign.

## Developer handoff audit

Portfolio 2027 compared with repository ea9ffa3. Assessment: ready to estimate and start the shared shell; not yet a complete implementation contract.

### What is covered

Work, Fun, About, Vizcom and Recognition each have desktop 1440, tablet 834 and mobile 390 references. Shared headers, footers, tags, dialog layouts, hover/focus/touch states, continuous grid rules and motion notes already exist. This audit does not request a redesign of those foundations.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=148-34)

### What needs closing

Confirmed prototype defects; tag contrast; contradictory layout/type notes; 24-card destination and asset mapping; treatment of existing routes; video controls and failure states. Some “pending” inputs already exist in the repository and can be reused after content confirmation.

### How to read this page

P1 = close before development depends on it. P2 = specify during implementation planning. “Candidate” means existing evidence, not an approved new destination. Findings are recommendations: source screens, component styles, pending URL decisions and website code were not changed.

### Evidence and limits

Inspected the live Figma page trees, notes, component descriptions, variables and prototype actions. Visually reviewed desktop Work/About, tablet About, mobile header/modal. Compared source routes and shared components; viewed local homepage at 1440/390 and Vizcom at 390. No claim of a full accessibility or production-network audit. Exact breakpoint and assistive-technology checks remain release QA.

## 01 / Confirmed design issues

Fix these at the source before developers treat the file as authoritative.

### F01 · Navigation is not wired

All nine Work/Fun/About screen headers have navigation items with no click actions. Handoff 35:223 says navigation remains connected. Add same-device Work ↔ Fun ↔ About navigation on stable parent hit targets, retain selected/hover/focus variants, and click through all nine screens. Vizcom and More info links are connected.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=1-27)

### F02 · Desktop footer sends every social label to X

Footer / Desktop (12:171): Social Links group 12:165 has one URL action to x.com/krysjezek. Email, X, Instagram, LinkedIn and Github children have no individual actions. Remove the group action; wire each actual destination separately. Tablet/mobile correctly restrict X to its own target, while other destinations remain pending. The directory’s motion subtitle 263:3 also links to Handoff rather than Motion.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=12-171)

### F03 · Metadata labels miss contrast target

Measured text/secondary over surface/tag: 4.184:1 (white background: 4.570:1). The discipline text is 11px and the tag is fully opaque. Darken the metadata text token or adjust its surface to achieve at least 4.5:1, then check hover, focus and touch. Values came from palette/muted [0.439280, 0.462683, 0.504808] and surface/tag [0.96, 0.96, 0.96].

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=22-257)

[Contrast requirement (W3C)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

### F04 · One current label style, one obsolete style

Main Project Card labels use Portfolio / Project Label Compact at 11/16. Portfolio / Project Label still exposes 9.5/15.39, despite the all-breakpoint 11/16 rule. Identify consumers, migrate or mark the old style deprecated, and name the canonical style without a misleading breakpoint suffix.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=5-3)

## 02 / Conflicts and route scope

Use one explicit rule for each case. Do not leave developers to choose between a screenshot and an older paragraph.

### F05 · Responsive rules disagree

35:226 says tablet About has a 270px biography beside a flexible photo area. Current tablet 25:720 and later 35:228 show two equal text cells with all eight photos below. Mobile Vizcom related cards 138:3887 / 138:3893 are 350px wide at x=20 with 24px between cards; case-study notes require 5px media insets/gaps. Declare intentional exceptions or align the frames. Media component descriptions also say “do not crop,” while 101:1996 explicitly requires cover cropping for the narrow detail image.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=35-220)

### F06 · New routes and old routes need a migration map

Only / is explicitly assigned to Work. Fun/About have Figma destinations but no URL contract or corresponding routes in app/. Proposed routes /fun and /about need confirmation. Record new URLs, titles, canonical/OG metadata, history behaviour and reload/deep-link handling. Both authored case-study Back controls already specify /.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=101-1975)

### Existing routes with no redesign-specific handoff

Six current case studies exist: Vizcom, ValkaAI, Barbour, VSX, The Mag Wrap and Chainer. Only Vizcom has redesigned detail screens. Decide whether its template covers the other five, including portrait films, YouTube/Vimeo embeds, image galleries and long credits. Also decide keep/restyle/redirect for /services/3d-environments, /services/mixed-reality, /other/work, /other/cv, /other/cv-print and /other/join; supply a 404 treatment.

### Preserve the repository’s publication rules

Legacy /work/old-projects/* stay direct-only, noindex/nofollow; no public cards, sitemap or structured-data entries. /test/* remains outside portfolio navigation. New public projects must be reflected consistently in app/seo.js, portfolioRoutes, featuredCreativeWorks, social imagery and sitemaps. A new thumbnail does not automatically authorize a legacy project’s public return.

### F07 · Gallery ordering needs a DOM contract

Desktop uses authored columns; compact uses its separate numbered inventory and tablet shortest-column placement. Keep those visual rules. Specify keyboard/screen-reader order per layout, avoid duplicated interactive cards, and validate focus order against visual reading order. Add semantic h1/main/nav and retain the existing skip link. Reference widths alone do not prove 320px, zoom, or in-between-width behaviour.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=35-228)

## 03 / Work destination inventory

Desktop order is column-by-column. Repository destinations below are candidates to confirm, not newly assigned Figma links.

### Column 1

Outland, Vizcom — 10:3 → /work/vizcom; Figma click already connected.
Shelby — 11:9 → destination/content mapping unresolved.
Victoria’s Secret — 11:15 → candidate /work/the-vsx-sports-bra; confirm this campaign and thumbnail.
Barbour — 11:21 → candidate /work/barbour; confirm this campaign and thumbnail.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=1-27)

### Column 2

Motion Mockups — 11:27 → candidate https://www.motionmockups.com/ (already used by header/site); confirm card action is external.
Custom Mockups — 11:33 → unresolved; do not assume it is the 3D Worlds service.
STNCK — 11:39 → unresolved.
Outland, Rounds — 11:45 → unresolved.

### Column 3

ValkaAI — 11:51 → candidate /work/valkaai.
Gusto — 11:57 → destination deliberately pending in related-work notes.
Trezor — 11:63 → unresolved.
Fantasy — 11:69 → destination deliberately pending in related-work notes.

### F08 · Publish a per-card content manifest

For each card supply stable ID, final display name/discipline, destination type + URL (or explicit static-only), poster path, intrinsic dimensions, alt text, source asset, focal point/crop, breakpoint ratios and placement. Add video paths only when approved. Visible artwork was retained through past title changes; a label match alone cannot establish the correct campaign asset.

### Existing destinations are not complete card wiring

Among the 24 Work/Fun gallery cards, only Vizcom has a navigation click in each device reference. Pending cards must have an explicit non-link treatment or be held from launch; no # links or “View project” cursor when there is no destination. Do not silently assign Gusto/Fantasy URLs.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=101-1993)

## 04 / Fun destination inventory

15 of the combined 24 cards have no established mapping in the inspected handoff/repository. Existing external links have not been independently checked for current availability.

### Column 1

C++ Render Engine — 11:75 → candidate https://gitlab.fel.cvut.cz/jezekkr2/pcc-ray-tracing (app/page.jsx).
Frozen Jewelry — 11:81 → unresolved.
The Mag Wrap — 11:87 → candidate /work/the-mag-w-rap-2025; confirm edition.
Blender addon — 11:93 → unresolved.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=1-149)

### Column 2

Chainer — 11:99 → candidate /work/chainer.
ReliveAR — 11:105 → candidate https://www.instagram.com/relive.ar/; confirm whether a case study is intended instead.
Renders — 11:111 → unresolved; specify gallery, static tile or detail.
Erem — 11:117 → unresolved.

### Column 3

Tweezers Jewelry — 11:123 → unresolved.
FWA logo — 11:129 → unresolved.
Vojta Zizka — 11:135 → unresolved.
CGI Karlin — 11:141 → unresolved.

### About and retired homepage content

Map the eight About photographs to original/export files, alt text, ratios and approved crops. Decide where current experience/education, client logos, service promotions and video-backend project belong after the split into Work/Fun/About. Their omission may be intentional; record it instead of restoring them automatically.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=1-271)

### Content gate

Close F08 when every one of the 24 cards and eight About photos has a complete asset record, every clickable card resolves, and the two related-work cards follow the same decision. Preserve original masters separately; staging public/images and public/videos are not the archive.

## 05 / Reuse, media and live data

Avoid asking for data already present, but do not mistake existing code for redesign-compliant behaviour.

### F09 · Recognition URLs already exist in code

58:1443 says all 18 article URLs are pending because imported Figma text had no links. components/RecognitionModal.jsx contains all 18 entries and hrefs in the same order. Use that list as the candidate source, verify each association, and update the handoff status. /other/cv and /other/cv-print exist, but the intended resume destination stays a user decision. Redesign moves the article link from description to publisher and adds the resume footer.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=58-1397)

### Contact data also exists

components/CopyEmailLink.jsx defines krystof@jezek.me. Footer.jsx provides Instagram and LinkedIn destinations. X and Motion Mockups are supplied in Figma. Decide which Email controls use mailto versus copy; keep corresponding action labels and feedback. Confirm Github profile destination rather than reusing the unrelated video-backend repository link.

### F10 · Video file is available; player design is incomplete

app/work/vizcom/page.jsx already references vizcom-brand-world H.265, AV1, H.264 and JPEG poster, plus the four stills. Handoff 101:1990 still asks for the film. It also requires accessible play/pause and mute, but the media components show posters with no player-state design. Specify autoplay vs click-to-play, audio policy, control placement, paused/loading/error/retry and reduced-motion manual play.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=101-1975)

### Current media primitive needs adaptation

EmbedVideo autoplays a muted loop with no controls. useVideoLazyLoad gates first mount at 25% intersection and skips initial reduced-motion/data-saver playback; it disconnects the observer after activation. It does not implement offscreen pause or live preference changes. Preserve poster-first delivery and reserved ratios; extend behaviour only to match the approved contract.

### F11 · Prague utility has a partial data contract

253:918 already specifies Europe/Prague, 24-hour HH:mm, °C, condition icon and hiding weather on failure. Remaining engineering decisions: provider/location, stale-data threshold, refresh/cache cadence, loading width and non-cloud icon mapping. Existing /api/airport-weather is LKPR METAR, not automatically a city-weather product. It returns observedAt/temp/clouds and uses a five-minute cache.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=253-918)

### F12 · Missing visible failure states

Motion notes define “Opening…”, route Retry, copy failure and inline “Email copied”, but the component inventory has no canonical screen/layout for these messages. Add compact default/success/error references, wrap rules and focus/live-region instructions. CopyEmailLink currently has no catch, inline confirmation or live region. Preserve native modified clicks and functional mailto links.

[Figma evidence](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=256-74)

## 06 / Developer start and release gates

The audit is complete. Handoff readiness remains conditional on closing the findings above.

### Design/content owner

Resolve F01–F05 in the Figma sources; approve the 24-card manifest and eight About exports; choose Fun/About URLs and old-route treatment; confirm resume/social/contact actions; supply player and failure-state references. Mark the motion proposal approved or deferred so implementation has a single source of truth.

### Developer reuse map

Navbar/Footer → shared shell structure and existing destinations.
RecognitionModal → 18 ordered records and native dialog base.
CopyEmailLink/CustomCursor → action hooks, with new feedback/native-pointer rules.
EmbedVideo/BackgroundVideo/useVideoLazyLoad → codec and lazy-poster plumbing.
WorkPageHeader/CaseStudySummary + six work routes → detail content.
app/seo.js/layout/sitemap/robots → metadata, structured data and index policy.

### Build order

1. Approved routes/content manifest + assets.
2. Tokens, typography, grid and shared shell.
3. Work/Fun grids + About + modal.
4. Case-study template and migration of retained routes.
5. Media controls, feedback and approved motion.
6. Metadata and browser acceptance. Do not carry over global blur, navbar hide or tilt by default; the new motion notes define different behaviour.

### Browser acceptance

Check 320/390, 719/720, 834, 1199/1200 and 1440px; large desktop and 200% zoom. Check real touch and fine pointer independently of width; keyboard order/skip link; long labels; tag contrast; continuous grid; short-viewport modal scrolling, safe areas, Escape/backdrop drag and focus restoration. Test denied clipboard, route failure/retry, rapid navigation and Back/Forward restoration.

### Media and release acceptance

Verify poster-first requests, no premature offscreen video loading, codec choice, no 404s, pause/offscreen and reduced-motion/data-saver behaviour; user-triggered controls stay operable. Check sitemap/canonicals/OG and archive exclusions. Run npm run lint, npm run build and git diff --check. Figma prototype playback does not prove browser routing or accessibility.

### Scope of this review

Original screens and website implementation remain unchanged. The temporary page is a review artifact, not an approval of new routes, hidden content, or pending destinations. Repository companion: docs/portfolio-2027-handoff-audit.md. Development server remains available at http://localhost:3000.
