# Portfolio 2027 rebuild

The application has been rebuilt from the approved Figma design on `rebuild/portfolio-2027`.
The recoverable source is the annotated tag `checkpoint/pre-rebuild-2026-09-23`
(`5d7e130f1494e1438c30c04d7da5d6a9e9194cc0`). Do not merge, push or deploy without an explicit request.

## Scope and completion gates

- [x] Preserve the original implementation and all committed research in a Git checkpoint.
- [x] Inventory existing media references and separately back up ignored local media.
- [x] Extract project, recognition, service, CV and archive content from presentation code.
- [x] Implement Work, Fun and About from their desktop, tablet and mobile Figma references.
- [x] Implement all six current case studies, 3D Worlds, recognition, source notes and 404.
- [x] Rebuild remaining public pages and archived direct URLs with the shared system.
- [x] Preserve canonical URLs, public project eligibility, indexing and media behavior.
- [x] Remove Webflow styles/markup, obsolete components, unused dependencies and stale guidance.
- [x] Verify responsive appearance, keyboard use, history, media, error states and route policies.
- [x] Pass lint, build, applicable tests and `git diff --check`; commit the finished work.

## Sources of truth

1. Owner instructions and current Figma screens: [Portfolio 2027](https://www.figma.com/design/z5qZnFX6vkOKlWrVKzdoFR?node-id=141-2398).
2. [Approved handoff](portfolio-2027-handoff-audit.md), [case rules](portfolio-2027-case-study-rules.md),
   [source notes](portfolio-2027-source-notes.md), [3D Worlds](portfolio-2027-3d-worlds.md).
3. [Motion direction](portfolio-2027-motion.md), implemented with reduced-motion alternatives.
4. Existing source content and stable CDN media. Earlier audit suggestions do not override approved decisions.

## Preserve versus replace

Keep content, evidence, media delivery assets, useful media behavior, URL policies and the
Next.js/React/Vercel foundation. Rebuild HTML, CSS and presentation components. No old
global stylesheet belongs in the new application. Archives remain direct-only and
`noindex, nofollow`; old UI implementations remain recoverable in Git.

Figma-only stills are previews, not proof that a delivery video exists. Missing source
masters/codec variants must remain explicit. Use approved posters until authorized
delivery files exist. Never infer a playable URL from its filename.

The homepage weather provider remains deferred in the approved handoff. Show Prague
time; omit weather when no selected provider supplies a current observation. The
airport experiment is not a requirement of the new homepage.

## Implementation map

- content/gallery.json holds 24 cards and the authored desktop/tablet/mobile orders.
- content/cases.json holds the nine case studies, specifications, credits, evidence copy and media rows. Outpost Fantasy was added on 24 September 2026 at `/work/outpost-fantasy`, linked from the existing Fantasy homepage card, with owner-confirmed May 2026 completion and credits. Vojta Zizka at `/work/vojta-zizka` remains in Fun, covers both ProductionBot automation projects, links the two YouTube explainers and uses the owner-confirmed completion year 2025.
- Gusto was added on 25 September 2026 at `/work/outpost-gusto`, linked from the existing Work card. It uses Card BCG, the full 16:9 showreel and six mixed landscape/portrait motion details. The delivery/provenance record is `content/outpost-gusto-media.json`.
- content/profile.json, recognition.json, worlds.json and pages.json separate reusable content from presentation.
- components/portfolio contains the new React components; styles/portfolio.css is the sole application stylesheet.
- Legacy Webflow markup/styles, obsolete interaction components, GSAP/Sass/Three.js dependencies, unused fonts, experiment routes/APIs and stale implementation notes were removed. They remain recoverable from the checkpoint; no legacy runtime is imported.
- Useful design decisions, evidence notes, media standards, route policies and SEO research remain current documentation.

## Media and recovery

73 prepared Figma assets are recorded by dimensions, node IDs and SHA-256 hashes. Their CDN URLs and content types were verified. Six odd-sized sources were corrected to retain exact source dimensions and published with versioned paths. No source was enlarged.

The original 14 ignored local media files (50,895,043 bytes) were copied to C:/Users/kryst/Dev/portfolio-checkpoint-media-2026-09-23 and verified against SHA-256 hashes. New Figma source masters and the delivery manifest are backed up in C:/Users/kryst/Dev/portfolio-2027-media-masters-2026-09-23. Delivery files remain in ignored staging directories and Vercel Blob; no media binaries or secrets were committed.

Eight embed-only source films have approved still previews: two Mag films, four Barbour city films, and two Chainer films. Their sourceEmbed and source-master-needed records remain explicit in cases.json. Acquiring and encoding those masters can replace the stills later. Existing deliveries retain their known codec availability, including legacy H.264/WebM-only footage; no missing codec URLs were invented.

Weather remains intentionally deferred. The homepage shows Prague time without an invented weather reading.

## Verification record — 23 September 2026

The subsequent [Figma fidelity correction](portfolio-2027-fidelity.md) supersedes the initial visual review below. It adds the 1440px canvas, correct typeface, visible column rules, responsive geometry corrections and automated comparisons against 33 Figma frames.

Lint: zero errors or warnings. Production build: passes. scripts/verify-portfolio.mjs checks gallery permutations, six eligible routes, 18 recognition URLs, media dimensions, canonicals, main landmarks and archive noindex/nofollow policies.

Browser review covered Work/Fun/About and 3D Worlds at 1440, 834 and 390; all six cases at desktop and mobile; CV/print CV, join, work index, mixed reality and representative archives. No horizontal overflow, broken visible images or page errors were found in the 24 primary-page captures. Verification artifacts are in the local temporary portfolio-qa directory.

Behavior verified: manual keyboard tabs; browser Back restoring Fun/card focus/scroll; recognition title focus, 18 links, scroll lock and focus return; inline source notes and dismissal; copy success and denied-clipboard recovery; genuine HTTP 404 with two unique eligible recommendations; route failure retaining outgoing context and retrying the same destination; video error/poster/retry; AV1 playback; no below-fold video mount; reduced-motion and data-saver posters.

The media rewrite fixes two inherited failure modes: shorthand AV1 declarations rejected by Chromium, and bubbling errors from an unsupported source being mistaken for failure of the entire video.

Dependency maintenance remains separate from this redesign. npm audit --omit=dev reports 6 advisories (2 moderate, 3 high, 1 critical), including the retained Next.js version. No production deployment was performed. Resolve the framework/dependency upgrade before production release.

## Gusto verification ? 25 September 2026

Lint, production build, portfolio verification and the 33-screen Figma layout suite pass. Gusto was also checked at 1440, 834 and 390px: 16:9 hero, equal-height mixed rows with 5px gaps, 3:4 portraits, mobile stacking and no overflow. All 24 video deliveries and eight posters were remotely probed for codec, dimensions, frame rate, duration and absence of audio; all 33 active CDN assets returned the expected content types.

Browser checks confirmed all seven case videos and the homepage card play, AV1 selection in Chromium, poster-first requests, deferred below-fold videos, reduced-motion/data-saver posters, the card link and Back to Work, visible linked identities and credits, and no asset/runtime errors. Canonical metadata, CreativeWork/VideoObject data and both sitemaps include Gusto. No deployment was performed.
