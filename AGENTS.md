# AGENTS.md

Fast map for agents working in this repository. Prefer this file over rediscovering the project; open the linked deep-dive docs only when the task touches that subsystem.

## Project at a glance

- Next.js 16 App Router portfolio, React 19, JavaScript/JSX, npm.
- Mostly static pages; `npm run build` currently prerenders 26 application routes plus framework routes.
- UI was migrated from Webflow. Preserve existing Webflow class names and DOM structure unless the task explicitly calls for a redesign.
- Styling: `styles/normalize.css`, `styles/webflow.css`, then the main editable SCSS file `styles/krystofs-portfolio.webflow.scss`, all imported by `app/layout.jsx`.
- Interactions: GSAP hooks/components; Three.js is used by the depth effect. There is no test suite.

## Start here

| Need | Location |
| --- | --- |
| Global layout, fonts, analytics, cursor, JSON-LD | `app/layout.jsx` |
| Homepage | `app/page.jsx` |
| Public pages | `app/**/page.jsx` |
| Shared UI | `components/` |
| Reusable interaction logic | `hooks/` |
| Main styles | `styles/krystofs-portfolio.webflow.scss` |
| SEO source of truth, route list, structured data | `app/seo.js` |
| Sitemaps and robots | `app/sitemap.js`, `app/image-sitemap.xml/route.js`, `app/robots.js` |
| Media behavior and codec conventions | `docs/video-and-media.md` |
| Animation inventory | `docs/animations.md` |
| 3D service-card behavior | `docs/3d-tilt-service-cards.md` |
| Blob/poster utilities | `scripts/` |

Route groups worth knowing:

- `/services/*`: current service landing pages.
- `/work/*`: current case studies. Public navigation, work indexes, sitemaps, and structured data must expose only the projects in `featuredCreativeWorks`/the homepage. `/work/old-projects/*` is legacy Webflow-derived content kept only for direct archival URLs; keep those routes `noindex, nofollow` and never link or list them publicly.
- `/other/*`: CV, print CV, work index, and join page.
- `/test/depth`: experimental depth-effect route; do not treat it as portfolio navigation.

## Local workflow

For UI or visual work, start the local server early and leave it running so the user can inspect changes at `http://localhost:3000` while you work. Do not start a duplicate server if port 3000 is already in use. A compact background launch command is:

```powershell
Start-Process npm.cmd -ArgumentList 'run','dev' -WindowStyle Hidden
```

```powershell
npm.cmd ci
npm.cmd run dev
```

Open `http://localhost:3000`. On Windows use `npm.cmd`/`npx.cmd` if PowerShell blocks `.ps1` shims.

Most visual assets are not tracked (`public/images/` and `public/videos/` are gitignored). For accurate local visuals create `.env.local`:

```dotenv
NEXT_PUBLIC_CDN_URL=https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com
```

`BLOB_READ_WRITE_TOKEN` is secret and only required by upload scripts. Never commit `.env*`, tokens, `.vercel/`, or generated media.

## Change patterns

- New/renamed public page: update its `app/**/page.jsx` and also `portfolioRoutes`/metadata in `app/seo.js`; verify sitemap and structured data remain correct.
- Shared navigation/contact: edit `components/Navbar.jsx` and/or `components/Footer.jsx`.
- Video: use `EmbedVideo` inside a parent with explicit dimensions, or `BackgroundVideo`; read `docs/video-and-media.md` first.
- Animation: prefer the existing GSAP hooks and honor `prefers-reduced-motion`; read `docs/animations.md` before changing global reveal/cursor behavior.
- Images: prefer `next/image` for new content. Existing raw `<img>` tags are legacy and produce known lint warnings; do not perform a broad migration during an unrelated change.
- Client boundaries: pages are client components only where browser APIs/interactions require them. Keep new static content server-renderable when practical.

Some deep-dive docs contain historical migration notes. Trust current imports/files over examples in docs; notably, `docs/video-and-media.md` still mentions a removed `ShimmerImage` component.

## Media preparation and upload standard

Use this workflow whenever the user asks to add or upload an image or video. Published delivery assets live in Vercel Blob under stable CDN-relative paths; `public/images/` and `public/videos/` are only ignored local staging directories, not the archive for original masters. Inspect every supplied file with `ffprobe` before converting it, preserve its aspect ratio, never upscale it, and remove audio from decorative/autoplay video.

### Images

- Use SVG for vector artwork and WebP for new raster artwork. Keep PNG only when a lossless/alpha source is materially better. JPEG is reserved mainly for video posters.
- Size to roughly 2x the largest rendered width. Full-bleed artwork may be up to 3840px wide; images in the 940px case-study column normally need no more than 1920px. Existing high-resolution case-study masters include 3840x2160 landscape and 2160x2160 square files; homepage thumbnails are commonly 1280-1440px wide. Never enlarge a smaller source to meet these numbers.
- Encode raster sources as WebP around quality 82 (80-85 is the acceptable visual range), strip metadata, and visually compare fine gradients/text against the source. Do not create manual responsive copies: `next/image` generates AVIF/WebP variants. `next.config.mjs` allows quality 75 (normal images) and 90 (video posters).
- Upload to `images/<descriptive-lowercase-slug>.webp` (or `.svg`) and reference it as `CDN + '/images/...'` in `<Image>`. Supply truthful intrinsic `width`/`height`, an accurate `sizes` prop, useful `alt` text, and `priority` only for the above-fold LCP image. SVGs passed to `<Image>` require `unoptimized`.

Example still conversion (change the 3840 cap to the actual 2x display need):

```powershell
ffmpeg -y -i source.png -map_metadata -1 -vf "scale='min(3840,iw)':-2:flags=lanczos" -frames:v 1 -c:v libwebp -quality 82 -compression_level 6 public/images/descriptive-slug.webp
```

### Videos

- Start from one high-quality master. Preserve 24/25/30fps; cap higher-frame-rate sources at 30fps unless the brief explicitly needs otherwise. Standard delivery dimensions are 1440px wide for landscape/full-width video and 1080px wide for square or portrait video (for example 1440x810, 1080x1080, or 1080x1350). Keep the source aspect ratio and use a smaller source unchanged rather than upscaling it. A separately art-directed mobile encode is optional, not routine.
- Produce all three current codecs. These settings are the quality-first baseline; inspect the result and raise CRF by 1-2 only if a file is unreasonably large: H.264 High/yuv420p, CRF 20, slow preset (universal fallback); H.265 Main/yuv420p, CRF 24, slow preset plus `hvc1` tag; AV1 Main/10-bit, CRF 30, SVT-AV1 preset 6. Strip audio and metadata. MP4 outputs require `+faststart`.
- Use one clean lowercase slug and these exact Blob paths: `videos/h264/<slug>-fallback.mp4`, `videos/h265/<slug>-web.mp4`, `videos/av1/<slug>.webm`, and `videos/posters/<slug>.jpg`. Avoid spaces and URL-encoded names. When replacing published media, use a versioned slug such as `-v2` so CDN/browser caches cannot serve the old bytes.
- Generate the poster from frame 1 of the H.264 delivery at the same dimensions, JPEG quality 2. The poster is displayed immediately and optimized by Next at quality 90 while the video itself remains `preload="none"` and mounts only near the viewport.

Example encodes (use 1080 instead of 1440 for square/portrait media):

```powershell
ffmpeg -y -i source.mov -map 0:v:0 -an -map_metadata -1 -vf "scale='min(1440,iw)':-2:flags=lanczos" -c:v libx264 -preset slow -crf 20 -profile:v high -pix_fmt yuv420p -movflags +faststart public/videos/h264/descriptive-slug-fallback.mp4
ffmpeg -y -i source.mov -map 0:v:0 -an -map_metadata -1 -vf "scale='min(1440,iw)':-2:flags=lanczos" -c:v libx265 -preset slow -crf 24 -tag:v hvc1 -pix_fmt yuv420p -movflags +faststart public/videos/h265/descriptive-slug-web.mp4
ffmpeg -y -i source.mov -map 0:v:0 -an -map_metadata -1 -vf "scale='min(1440,iw)':-2:flags=lanczos" -c:v libsvtav1 -preset 6 -crf 30 -pix_fmt yuv420p10le public/videos/av1/descriptive-slug.webm
ffmpeg -y -i public/videos/h264/descriptive-slug-fallback.mp4 -ss 0 -frames:v 1 -q:v 2 public/videos/posters/descriptive-slug.jpg
```

Wire new video through `EmbedVideo` (sized parent required) or `BackgroundVideo`, passing `poster`, `srcH265`, `srcAv1`, and `srcMp4` as CDN-relative `/videos/...` paths. H.265 must appear first, then AV1, then H.264. Add `posterAlt` and an accurate `posterSizes`; use `posterPriority` only above the fold.

### Upload and verify

1. Place only prepared delivery files in the ignored `public/images/` / `public/videos/` staging tree. Do not commit them.
2. With `BLOB_READ_WRITE_TOKEN` available only in the process environment, run `node scripts/upload-to-blob.mjs` (or `node scripts/upload-posters.mjs` for poster-only updates). Both preserve the folder path, disable random suffixes, and allow overwrites. Never put the token in a tracked file or terminal output.
3. Confirm each returned/existing Blob URL loads and has the expected content type. Run `ffprobe` on every uploaded video to verify codec, dimensions, frame rate, pixel format, duration, and absence of audio; check the poster dimensions too.
4. Check the affected page at desktop and mobile widths. In the Network panel confirm the poster loads first, video is not fetched before it approaches the viewport, the browser selects a supported preferred codec, and no asset 404s. Also test reduced-motion/data-saver behavior when relevant.
5. Update `app/seo.js` and route metadata when the media represents a public case study or other indexable creative work; use the H.264 URL as structured-data `contentUrl` and the JPEG poster as `thumbnailUrl`.

## Verify before handoff

```powershell
npm.cmd run lint
npm.cmd run build
git diff --check
git status --short
```

Baseline as of 2026-07-10: build passes; lint exits successfully with 104 existing `@next/next/no-img-element` warnings and no errors. There are no automated tests. For visual/interaction changes, check desktop and mobile widths in a browser; custom cursor/hover behavior requires a fine pointer.

## GitHub

- Repository: `https://github.com/krysjezek/krystofs-portfolio`
- Default working branch in this checkout: `master`
- Remote: `origin`

```powershell
git status --short --branch
git diff
git add <files>
git commit -m "<concise message>"
git push origin master
```

Commit after each coherent change so the repository always has a clean recovery point. Keep commits narrowly scoped and use concise messages. Do not push, rewrite history, or open a PR unless the user asks. Preserve unrelated user changes.

## Vercel deployment

- Vercel project: `krystofs-portfolio`
- Production site/SEO canonical: `https://www.krystofjezek.com`
- This checkout may not have `.vercel/project.json` because `.vercel/` is intentionally ignored. Link once if needed:

```powershell
vercel.cmd link --project krystofs-portfolio --yes
vercel.cmd deploy --prod --yes
vercel.cmd inspect <deployment-url>
```

Deploy only when explicitly requested. Before production deployment, require a passing build and verify the affected page at the returned deployment URL.

## Known audit items

- `npm audit --omit=dev` currently reports 5 production dependency vulnerabilities (4 high, 1 moderate), including `next@16.1.6`; treat a framework upgrade as a dedicated task and retest visuals/build.
- `README.md` is still the create-next-app placeholder and contains stale `.tsx`/Geist guidance.
- `deploy.md` contains an old absolute checkout path, an SSH remote different from the current HTTPS remote, and assumes a local `.vercel` link. Use the portable commands above.
