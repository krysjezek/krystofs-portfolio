# Shimmer Loading, Video Unification & CDN Migration

## Context

The portfolio feels laggy on load because all media loads simultaneously with no visual feedback. The video system is fragmented: 3 different rendering patterns (BackgroundVideo, EmbedVideo, inline `<video>` tags), 2 different codec strategies (H.264+WebM vs H.265+AV1+H.264), and CDN URLs pointing to 3 different origins (Vercel Blob, old Webflow CDN, newer Webflow CDN).

**Goals**:
1. Add shimmer skeleton placeholders for images (GSAP-animated)
2. Unify all video rendering into two components with consistent codec support
3. Add IntersectionObserver lazy loading + GSAP fade-in for all videos
4. Migrate all remaining Webflow CDN assets to Vercel Blob

---

## Part A: Component Changes

### A1. Shared hook: `hooks/useVideoLazyLoad.js` (new file)

Extracts the IntersectionObserver + GSAP fade-in pattern shared by both video components.

```
export function useVideoLazyLoad(rootMargin = '200px')
→ returns { containerRef, videoRef, inView, onCanPlay }
```

- `containerRef`: attach to the outer wrapper div (observed by IntersectionObserver)
- `videoRef`: attach to `<video>` element (GSAP fades to `opacity: 1` on `canplay`)
- `inView`: boolean — when `true`, render the `<video>` element into the DOM
- `onCanPlay`: event handler to attach to `<video onCanPlay={onCanPlay}>`

### A2. `components/ShimmerImage.jsx` (new file)

Client component wrapping `<img>`. Shimmer placeholder → GSAP fade-in.

- GSAP animates `x` transform of gradient overlay span (not CSS @keyframes)
- Colors: base `#1a1a2e`, sweep gradient `linear-gradient(90deg, transparent, #2a2a4a, transparent)`
- Wrapper: `<span style="display:inline-block; position:relative; overflow:hidden">`
- Image starts at `opacity: 0`, GSAP fades to 1 on `onLoad`, shimmer fades out
- All `<img>` props pass through: `className`, `srcSet`, `sizes`, `loading`, `alt`, `src`, `style`

### A3. `components/EmbedVideo.jsx` (modify existing)

Convert to client component. Full codec support + lazy loading.

**Current API**: `{ poster, srcH265, srcAv1, srcMp4 }`
**New API**: `{ poster, srcH265, srcAv1, srcMp4, style, className }`

Changes:
- Add `'use client'`, use `useVideoLazyLoad` hook
- Poster rendered as `<img>` underneath video (more reliable than HTML `poster` attribute with `object-fit: cover`)
- `<video>` only rendered when `inView`, starts at `opacity: 0`, GSAP fades on `canplay`
- Handle both absolute URLs (old Webflow CDN) and CDN-relative paths for poster — if poster starts with `http`, don't prepend CDN
- Add `style` prop for custom inline styles (service pages need this)
- Add `className` prop for custom classes
- Source order: H.265 → AV1 → H.264 (browser picks first supported)

### A4. `components/BackgroundVideo.jsx` (modify existing)

Convert to client component. **Upgrade codec support** from H.264+WebM to H.265+AV1+H.264+WebM.

**Current API**: `{ className, poster, srcMp4, srcWebm, style }`
**New API**: `{ className, poster, srcH265, srcAv1, srcMp4, srcWebm, style }`

Changes:
- Add `'use client'`, use `useVideoLazyLoad` hook
- Add optional `srcH265` and `srcAv1` props (existing usages with only `srcMp4`+`srcWebm` continue to work)
- `<video>` only rendered when `inView`, starts at `opacity: 0`, GSAP fades on `canplay`
- Container `<div>` with Webflow classes always renders (preserves layout)
- Poster visible via container background or video `backgroundImage` while video loads
- Source order: H.265 (optional) → AV1 (optional) → H.264 → WebM (optional)

---

## Part B: CDN Migration

### B1. Download old Webflow CDN assets

Download all poster images and any video files still hosted on old Webflow CDN:

**Service page posters** (3d-environments + mixed-reality): ~28 poster JPGs on `cdn.prod.website-files.com`
→ Save to `public/videos/posters/` with clean names matching video filenames

**Old project videos + posters** (chainer, apify, bezestrachu, dorian-drop-ii):
→ Save videos to `public/videos/h264/` and `public/videos/other/`
→ Save posters to `public/videos/posters/`

**Work listing page** (other/work): several posters + videos on `uploads-ssl.webflow.com`
→ Same folder structure

**EmbedVideo page posters** (VSX, Mag): poster images on `cdn.prod.website-files.com`
→ Save to `public/videos/posters/`

### B2. Upload to Vercel Blob

```bash
cd portfolio/
BLOB_READ_WRITE_TOKEN=<token> node scripts/upload-to-blob.mjs
```

### B3. Update all URLs in JSX

Replace all absolute Webflow CDN URLs with CDN-relative paths:
- `https://uploads-ssl.webflow.com/.../filename.jpg` → `CDN + '/videos/posters/filename.jpg'`
- `https://cdn.prod.website-files.com/.../filename.jpg` → `CDN + '/videos/posters/filename.jpg'`

---

## Part C: Page Updates

### C1. Service pages: 3D Environments + Mixed Reality

**Files**: `app/services/3d-environments/page.jsx`, `app/services/mixed-reality/page.jsx`

- Import `EmbedVideo`
- Replace all inline `<video>` blocks (~28 total) with `<EmbedVideo>` components
- Keep `<div className="cb w-embed">` wrappers (provides absolute positioning via `.cb` class)
- Update poster URLs from Webflow CDN to CDN-relative paths (after B3)
- Pass `style` prop for videos needing custom positioning (e.g., the centered `yiskra_veha` video)
- Pages stay as server components — EmbedVideo renders as a client island

### C2. Homepage

**File**: `app/page.jsx`

- Import `ShimmerImage`
- Wrap select large/above-fold images with `ShimmerImage` (GIF in services section, key work tile images)
- **Skip** marquee logos (would break marquee `offsetWidth` calculations) and tiny icons
- `BackgroundVideo` instance auto-benefits from component update
- Below-fold inline `<video>` tags in case study sections: evaluate converting to EmbedVideo

### C3. Work pages (using components)

**Files**: `app/work/barbour/page.jsx`, `app/work/chainer/page.jsx`, `app/work/the-vsx-sports-bra/page.jsx`, `app/work/the-mag-w-rap-2025/page.jsx`

- BackgroundVideo and EmbedVideo instances auto-benefit from component updates
- Update old Webflow CDN URLs to CDN-relative paths
- Update VSX and Mag poster URLs from Webflow CDN to CDN-relative paths

### C4. Old project pages

**Files**: `app/work/old-projects/apify/page.jsx`, `app/work/old-projects/bezestrachu/page.jsx`, `app/work/old-projects/dorian-drop-ii/page.jsx`

- Update BackgroundVideo props from Webflow CDN URLs to CDN-relative paths
- These only have H.264+WebM (no H.265/AV1 versions available) — that's fine, the upgraded BackgroundVideo handles optional codecs

### C5. Work listing page

**File**: `app/other/work/page.jsx`

- Update ~19 BackgroundVideo entries: replace Webflow CDN URLs with CDN-relative paths
- Fix malformed URL-encoded poster URL (line ~161)

---

## File Summary

| File | Action |
|------|--------|
| `hooks/useVideoLazyLoad.js` | **Create** — shared IntersectionObserver + GSAP fade hook |
| `components/ShimmerImage.jsx` | **Create** — shimmer placeholder + GSAP fade for images |
| `components/EmbedVideo.jsx` | **Modify** — client component, lazy loading, style/className props |
| `components/BackgroundVideo.jsx` | **Modify** — client component, add H.265+AV1 support, lazy loading |
| `app/page.jsx` | **Modify** — ShimmerImage for key images |
| `app/services/3d-environments/page.jsx` | **Modify** — inline videos → EmbedVideo, CDN migration |
| `app/services/mixed-reality/page.jsx` | **Modify** — inline videos → EmbedVideo, CDN migration |
| `app/work/barbour/page.jsx` | **Modify** — CDN URL updates |
| `app/work/chainer/page.jsx` | **Modify** — CDN URL updates |
| `app/work/the-vsx-sports-bra/page.jsx` | **Modify** — CDN URL updates (poster URLs) |
| `app/work/the-mag-w-rap-2025/page.jsx` | **Modify** — CDN URL updates (poster URLs) |
| `app/work/old-projects/apify/page.jsx` | **Modify** — CDN URL updates |
| `app/work/old-projects/bezestrachu/page.jsx` | **Modify** — CDN URL updates |
| `app/work/old-projects/dorian-drop-ii/page.jsx` | **Modify** — CDN URL updates |
| `app/other/work/page.jsx` | **Modify** — CDN URL updates, fix malformed URL |

---

## Implementation Order

**Phase 1 — Core components** (no page changes yet):
1. Create `hooks/useVideoLazyLoad.js`
2. Create `components/ShimmerImage.jsx`
3. Update `components/EmbedVideo.jsx`
4. Update `components/BackgroundVideo.jsx`
5. Verify dev server runs without errors

**Phase 2 — Service pages** (biggest performance win):
6. Update `app/services/3d-environments/page.jsx` — replace inline videos with EmbedVideo
7. Update `app/services/mixed-reality/page.jsx` — same

**Phase 3 — Homepage**:
8. Update `app/page.jsx` — add ShimmerImage, evaluate inline video conversions

**Phase 4 — CDN migration** (can be done in parallel with page updates):
9. Download all old Webflow CDN assets to local `public/` folders
10. Upload to Vercel Blob
11. Update all CDN URLs across all page files (barbour, chainer, VSX, Mag, old projects, work listing)

---

## Key Notes

- **No new npm dependencies** — GSAP already installed
- **Server components stay server components** — client components (EmbedVideo, BackgroundVideo, ShimmerImage) render as islands within server component pages
- **Backward compatible** — `srcH265`, `srcAv1`, `srcWebm` are all optional on BackgroundVideo. Existing pages work unchanged until we add the new codec paths.
- **Codec priority**: H.265 → AV1 → H.264 → WebM. Browser picks the first it supports. H.265 and AV1 are ~40-50% smaller than H.264 at same quality.
- **Layout shift mitigation**: EmbedVideo container uses poster `<img>` to provide intrinsic height. If posters load slowly, may need `aspect-ratio` on the container. Test during implementation.

---

## Verification

1. `cd portfolio && npm run dev`
2. **Homepage**: images show shimmer → fade in. BackgroundVideo shows poster → fade to video.
3. **3D Environments page**: open DevTools Network tab → only 1-2 videos should load initially (above-fold). Scroll down → videos lazy-load as they enter viewport. Each fades from poster to playback.
4. **Mixed Reality page**: same behavior as 3D Environments.
5. **Work pages** (barbour, VSX, Mag): videos lazy-load and fade in. No broken poster images.
6. **Old project pages** (apify, bezestrachu, dorian-drop-ii): videos load from Vercel Blob CDN, not old Webflow CDN.
7. **Work listing** (other/work): all BackgroundVideo entries load from Vercel Blob.
8. **Network tab**: confirm zero requests to `uploads-ssl.webflow.com` or `cdn.prod.website-files.com` across all pages.
9. **Throttled test** (Slow 3G): shimmer visible on images, videos fade in gracefully from poster.
10. **Homepage marquee**: still works correctly (no layout breaks from ShimmerImage).
