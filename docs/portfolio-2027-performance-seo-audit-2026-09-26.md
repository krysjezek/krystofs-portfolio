# Portfolio 2027 performance and SEO audit — 26 September 2026

The rebuild has a lighter application shell and better mobile lab results than the live previous design. Basic technical SEO is sound. The video-schema findings were corrected in the follow-up below; mobile LCP and small-label contrast remain release priorities. Autoplay video transfer has increased substantially despite the smaller JavaScript/CSS payload.

This audit implements the requested positioning metadata; performance and visual recommendations remain follow-up work. Nothing was deployed or pushed.

## Video-schema correction — 26 September follow-up

Implemented after the audit at the owner's request:

- Restored the homepage ItemList and its 12 linked CreativeWorks. Removed both obsolete homepage reel records.
- Removed the Barbour, Mag Wrap and Chainer VideoObjects that claimed embedded players where the rebuilt pages show only stills. Existing playable background videos are unchanged.
- Corrected the Barbour reconstruction page's MP4 reference to its existing `/videos/other/…mp4` URL, matching the schema record. The page's former `/videos/h264/…mp4` URL returned 404; remote ffprobe confirmed the existing file is H.264, 576 × 720, with no audio. The audit's initial assumption that the page's H.264-folder path was the correct delivery was wrong. Narrowed the mixed-reality service video description to the actual Barbour London film.
- Removed the invented January 1 fallback. Nine VideoObjects retain their existing explicitly recorded publication dates. Six current media records without dates are withheld from JSON-LD: Vizcom, ValkaAI, Barbour reconstruction, Mag Wrap looping background, 3D Worlds and Barbour London. Restore their markup only after the actual first-publication dates are documented; do not use project year or rebuild date. No new publication dates were inferred in this correction.
- CreativeWork `hasPart` includes only emitted videos, so no references point at withheld objects. Removed visual summaries mislabeled as transcripts and the unsupported English-language assertion on silent media.
- Added `node scripts/verify-video-schema.mjs` after the production build. It checks all 15 remaining editorial video records against media used by their pages, verifies rendered publication dates and references, and checks the homepage list against its gallery links.
- Follow-up validation: build, lint, portfolio and video-schema checks pass; the 28-page SEO crawl reports no issues and checks 26 emitted social/schema media URLs. All 30 video/poster URLs in the 15 editorial records return 200 with the expected media types. Browser verification of the repaired Barbour clip selects the existing MP4 and confirms active playback (`readyState: 4`, no media error).

The performance measurements and original crawl counts below describe the audit before this follow-up. No video files, playback policy or layouts changed; one broken MP4 reference was repaired. Google requires the first-publication date for video markup; omitting incomplete objects avoids inventing that information. [VideoObject requirements](https://developers.google.com/search/docs/appearance/structured-data/video)

## Changes made

- Homepage HTML, Open Graph and Twitter title: **Kryštof Ježek — Design, Motion & Creative Technology**.
- Child titles retain their specific subject and now end in `| Kryštof Ježek`.
- Updated the default description, homepage accessible H1, Person roles/description/name, WebSite name and homepage sitemap modification date. The visible introduction already expresses the new positioning.
- Gave `/other/work` its own description instead of inheriting the homepage description.
- Added `scripts/audit-seo.mjs`, a repeatable production-build crawl. It checks server-rendered metadata with JavaScript disabled; it does not certify semantic accuracy of schema or search rankings.
- Synced installed dependencies with the existing lockfile using `npm ci`: installed Next.js was 16.2.10, lockfile specifies 16.3.6. No dependency manifest or lockfile changes were needed. Installation reported zero known vulnerabilities. Next.js added its managed documentation guidance to `AGENTS.md` on dev startup.

## Measurement method and limits

- Candidate: production build on `http://localhost:3001`, Next.js 16.3.6, using actual Blob CDN media. Development server remains available at port 3000; development timings were not scored.
- Baseline: live previous design at `https://www.krystofjezek.com`, inspected on the same date. Source comparison also used `checkpoint/pre-rebuild-2026-09-23`. The live deployment is not claimed to be byte-identical to that checkpoint.
- Lighthouse 13.5.0, headless Chrome 153, sequential runs on the same Windows machine. Three runs per homepage/device, plus one mobile run each for Vizcom and 3D Worlds. Default simulated mobile profile: 412 × 823, 4× CPU slowdown, 150ms RTT, 1,638.4 Kbps throughput. Desktop uses the standard desktop preset.
- Browser storage reset by Lighthouse; server/image-optimizer/CDN caches were not purged between runs. The first old-mobile report completed successfully but Chrome cleanup subsequently returned a Windows permission error; the report has no runtime error. Subsequent runs attached to a dedicated Chrome instance.
- These compare a local origin with a remote Vercel origin. Hosting, network, image-cache warmth and video buffering affect results. Treat the numbers as a directional lab comparison, not a controlled estimate of the redesign's effect on production visitors. Field INP, Search Console indexing, rankings, traffic and real-user Core Web Vitals were not measured.
- Scores vary with underlying conditions; report the distribution rather than treating one score as definitive. [Lighthouse scoring guidance](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)

Per-run scores, metrics, transfer sizes and emulation settings are committed in [the measurements JSON](portfolio-2027-performance-measurements-2026-09-26.json). Full HTML/JSON Lighthouse reports, SEO crawl output, browser output and screenshots are retained locally at `C:/Users/kryst/dev/portfolio-audit-2026-09-26/`.

## Homepage comparison

Values are medians of three runs. Transfer is captured during Lighthouse's observation window, not the total size of all media on the page; video bytes vary with buffering.

| Metric | Previous mobile | Rebuild mobile | Previous desktop | Rebuild desktop |
| --- | ---: | ---: | ---: | ---: |
| Performance | 79 | 86 | 97 | 97 |
| Performance range | 73–79 | 86–86 | 97–98 | 90–97 |
| Accessibility | 91 | 96 | 96 | 100 |
| Best practices | 100 | 96* | 100 | 96* |
| Basic SEO | 100 | 100 | 100 | 100 |
| First Contentful Paint | 1.15s | 0.91s | 0.35s | 0.25s |
| Largest Contentful Paint | 5.59s | 4.17s | 1.19s | 0.90s |
| Total Blocking Time | 9ms | 28ms | 0ms | 0ms |
| Cumulative Layout Shift | 0 | 0.00008 | 0 | 0.00001 |
| Captured transfer | 1.71 MiB | 4.16 MiB | 7.86 MiB | 10.79 MiB |

*The local best-practices deduction is the Vercel Analytics script returning 404 at `/_vercel/insights/script.js` under `next start`, with the associated MIME error. It is not evidence of a broken asset on a Vercel deployment. Verify analytics at the actual deployment URL before release; do not suppress it merely to improve the local score.*

Mobile JavaScript transfer falls from about 239 KiB to 188 KiB, CSS from 35.7 KiB to 9.1 KiB, fonts from 184 KiB to 120 KiB, and images from 521 KiB to 253 KiB. These are improvements to the application shell. The archived homepage imports GSAP and Webflow styles; the rebuild uses React/CSS/native browser behavior instead.

Mobile video transfer rises from approximately 0.73 MiB to 3.58 MiB in the observation window. Video accounts for about 86% of the rebuild's mobile bytes. In a separate 1440 × 900 browser check, five partly or fully visible cards began playback; at 390 × 844, two began playback. Visibility-based mounting is working, but the visible gallery itself still carries substantial media cost.

Single-run mobile samples:

| Page | Performance | Accessibility | Basic SEO | LCP | Captured transfer |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/work/vizcom` | 93 | 96 | 100 | 3.18s | 4.13 MiB |
| `/services/3d-environments` | 92 | 100 | 100 | 3.31s | 3.27 MiB |

Both samples have the same local-only analytics deduction. These are spot checks, not measurements of every route. A green aggregate score can coexist with an LCP above the 2.5-second good-experience target. [Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals)

## Verified SEO and browser behavior

The final automated crawl found no issues in its technical checks:

- All 28 content pages return 200 with one title, H1 and main landmark, a description, the expected production canonical, and parseable JSON-LD. All 18 indexable pages have distinct titles and descriptions; their OG titles/descriptions match their page metadata.
- Sitemap contains 18 public routes, compared with 11 on the live previous design. The 12 featured case routes are included. Nine archival pages and the print CV retain `noindex, nofollow` and are absent from the sitemap. No public page links to an archive.
- All 15 distinct internal destinations found in public-page HTML return 200. A fabricated missing route returns a real HTTP 404 and `noindex`.
- All 34 unique social-image and VideoObject thumbnail/content URLs checked return successful responses with image/video content types. This checks availability, not whether each asset describes the correct current content.
- No rendered image is missing its `alt` attribute; descriptive quality was not exhaustively reviewed. Main content and Work/Fun/About links are present in server HTML even though inactive tab panels are hidden.
- Homepage browser checks at 1440 × 900, 834 × 1112 and 390 × 844 show no horizontal overflow, no broken loaded images after scrolling, and no uncaught JavaScript exceptions. Work/Fun/About switching works; a fine-pointer gallery hover was exercised. Vizcom and 3D Worlds also render correctly in mobile spot checks.
- Posters request before video; initial mounted videos intersect the viewport. Chrome selected AV1 in these sessions. Reduced-motion and simulated `navigator.connection.saveData` sessions mounted zero videos and made zero video requests. This is not a cross-browser codec certification.

## Findings, ordered for release

The first two findings are resolved by the follow-up above; their original evidence is retained here. Other items remain open.

| Priority | Evidence | Recommended action and acceptance check |
| --- | --- | --- |
| P1 — schema accuracy | `app/page.jsx` calls `pageStructuredData('/')`. The resulting graph contains the old CGI-environments and mixed-reality reels, neither of which is a current homepage gallery media record. It also omits the featured-work ItemList that the archived homepage emitted; `homepageStructuredData()` still exists but is unused. Barbour's BTS VideoObject points at an old `/videos/other/…mp4` absent from the current case record. | Reconcile emitted videos with actual viewable media. Remove stale entries, use current delivery URLs, and restore a truthful featured-work list. Simply switching helper functions will still emit the stale homepage reels unless the records are cleaned first. Check the rendered graph against the gallery/case content. |
| P1 — video dates | Ten emitted VideoObjects use January 1 dates generated by `video.uploadDate || dateCreated + '-01-01'`. Creation year is not evidence of first upload date. | Populate verified first-publication dates, or withhold unsupported VideoObject markup until dates are established. Do not invent dates from the rebuild or audit date. |
| P1 — mobile LCP and bandwidth | Homepage mobile LCP is consistently 4.13–4.23s. Lighthouse identifies the Rounds poster and flags missing high fetch priority on its preload. `Media` passes `priority` but no explicit fetch priority. Visible videos load alongside the poster; bytes are substantially higher than the previous design. | Test explicit priority for the actual LCP poster, viewport-appropriate above-fold loading, and delayed or fewer simultaneous gallery video starts. The desktop LCP candidate can differ; a dev warning identified Motion Mockups. Do not preload every image. Measure changes individually, retaining immediate posters and reduced-motion/data-saving behavior. Target LCP ≤2.5s on a deployed mobile test and a materially lower captured video payload. [Next Image reference](https://nextjs.org/docs/app/api-reference/components/image) |
| P1 — mobile label contrast | Homepage and Vizcom Lighthouse runs flag 11px secondary tags: `#707681` on `#f5f5f5` measures about 4.18:1 versus the required 4.5:1 for this text. | Darken secondary label text enough to pass while preserving the design. Check static mobile tags and hover/focus states. No palette change was made during this audit. |
| P2 — voice-control labels | Lighthouse's experimental label-content-name check flags mobile cards: accessible names contain the project name while visible text also contains discipline labels. | Review `Card.jsx` accessible naming so visible labels and spoken interaction targets agree without unnecessary duplication. This is a diagnostic finding, not an additional scored accessibility deduction. |
| P2 — internal discovery | `/other/cv`, `/other/work`, `/other/join` and `/services/mixed-reality` have no incoming links in the audited public HTML, despite being in the sitemap. | Decide which remain actively promoted. Add contextual links to useful current pages, or deliberately revisit their indexing policy if retired. Do not add navigation simply to satisfy a tool. |
| P2 — historical inbound URL | `/work/the-mag-wrap` and `/work/old-projects/the-mag-wrap23` still return 404 both locally and live. The earlier September 22 audit documents an inbound feature link to the former. | Recover the original 2023 case/archive and redirect its actual old URL appropriately if the source can be restored. Do not silently redirect the 2023 project to the 2025 season or the homepage. The referring article was not recrawled in this audit. |
| P2 — launch environment | Local production mode cannot serve Vercel's analytics endpoint, and local image/HTML responses do not reproduce Vercel edge latency and caching. | Repeat homepage/mobile and representative-case audits at the returned deployment URL, check cache headers and analytics, then review field data once sufficient traffic exists. Deployment was not requested here. |

Google requires structured data to represent the page's actual content; valid JSON and a 100 Lighthouse SEO score do not establish that. The schema findings above are content mismatches, not evidence of a ranking penalty or manual action. [Structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

The updated title is descriptive and reflects the visible introduction. Google can still choose a different search-result title, so the rendered HTML title is the verified outcome here. [Title-link guidance](https://developers.google.com/search/docs/appearance/title-link)

## Reproduce

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run start -- -p 3001
# In another terminal:
node scripts/audit-seo.mjs http://localhost:3001 seo-audit.json
npx.cmd --yes lighthouse@13.5.0 http://localhost:3001 --chrome-flags=--headless --only-categories=performance,accessibility,best-practices,seo --output=html --output=json --output-path=homepage-mobile
# Add --preset=desktop for desktop. Repeat each profile three times.
```

If Chrome cleanup fails on Windows, start a dedicated headless Chrome with an isolated user-data directory and a debugging port, then pass `--port=<port>` to Lighthouse. Do not measure against the dev server or run builds in parallel with timed measurements.

Validation completed: dependency install, production build, lint with no warnings, `node scripts/verify-portfolio.mjs`, the SEO crawl, browser checks described above, and `git diff --check`. No layout geometry was changed, so the Figma layout regression suite was not rerun. Live search indexing, rich-results eligibility and deployed performance remain release-stage checks.
