# Video & Media System

## Video Components

### `EmbedVideo` (`components/EmbedVideo.jsx`)

Client component. Renders an inline video with lazy loading and GSAP fade-in.

**Props:** `{ poster, srcH265, srcAv1, srcMp4, style, className }`

**Behavior:**
- Container fills its parent (`width: 100%; height: 100%`) — parent must provide dimensions
- Poster rendered as absolutely positioned `<img>` with `object-fit: cover`
- `<video>` only mounts when IntersectionObserver fires (200px rootMargin)
- Video starts at `opacity: 0`, GSAP fades to 1 on `canplay`
- Source order: H.265 → AV1 → H.264 (browser picks first supported)
- All URL props accept both CDN-relative paths (`/videos/h264/clip.mp4`) and absolute URLs (`https://...`) — absolute URLs pass through without CDN prefix

**Usage:**
```jsx
// Inside a .cb.w-embed or .html-embed wrapper (which provides sizing via CSS)
<div className="cb w-embed">
  <EmbedVideo
    poster="/videos/posters/clip.jpg"
    srcH265="/videos/h265/clip-web.mp4"
    srcAv1="/videos/av1/clip.webm"
    srcMp4="/videos/h264/clip-fallback.mp4"
  />
</div>
```

**Parent sizing requirement:** EmbedVideo's container uses `width: 100%; height: 100%` to fill its parent. The parent element **must** provide dimensions. In this codebase, EmbedVideo always sits inside `.cb.w-embed` or `.html-embed.w-embed` which are absolutely positioned via CSS (`.cb { position: absolute; inset: 0% }`). Do NOT use EmbedVideo as a standalone block element without a sized parent — the container would collapse.

### `BackgroundVideo` (`components/BackgroundVideo.jsx`)

Client component. Renders a Webflow-style background video with lazy loading.

**Props:** `{ className, poster, srcH265, srcAv1, srcMp4, srcWebm, style }`

**Behavior:**
- Container div always renders with Webflow classes (`w-background-video w-background-video-atom`) — preserves layout even before video loads
- Poster displayed as CSS `background-image` on the container
- `<video>` only mounts when in viewport
- Video starts at `opacity: 0`, GSAP fades to 1 on `canplay`
- Source order: H.265 (optional) → AV1 (optional) → H.264 → WebM (optional)
- `srcH265` and `srcAv1` are optional — existing pages with only H.264+WebM work unchanged
- All URL props accept both CDN-relative and absolute URLs

**Usage:**
```jsx
<BackgroundVideo
  className="background-video-22"
  poster="/videos/posters/clip.jpg"
  srcMp4="/videos/h264/clip.mp4"
  srcWebm="/videos/other/clip.webm"
/>
```

### `ShimmerImage` (`components/ShimmerImage.jsx`)

Client component. Wraps `<img>` with a GSAP-animated shimmer placeholder.

**Props:** All standard `<img>` props pass through (`src`, `alt`, `className`, `style`, `srcSet`, `sizes`, `loading`, etc.)

**Behavior:**
- Wrapper `<span>` with `display: inline-block; position: relative; overflow: hidden; background: #1a1a2e`
- Animated gradient sweep (`linear-gradient(90deg, transparent, #2a2a4a, transparent)`) via GSAP `x` transform
- Image starts at `opacity: 0`, GSAP fades to 1 on `onLoad`, shimmer fades out
- Do NOT use on marquee logos — breaks `offsetWidth` calculations for the animation

### Shared hook: `useVideoLazyLoad` (`hooks/useVideoLazyLoad.js`)

Used internally by EmbedVideo and BackgroundVideo. Not typically used directly.

```
useVideoLazyLoad(rootMargin = '200px')
  → { containerRef, videoRef, inView, onCanPlay }
```

- `containerRef`: attach to outer wrapper (observed by IntersectionObserver)
- `videoRef`: attach to `<video>` (GSAP target)
- `inView`: boolean — when true, render `<video>` into DOM
- `onCanPlay`: handler — triggers GSAP fade to `opacity: 1`

## URL Resolution

Both video components use a `resolve()` helper:
- CDN-relative paths (e.g. `/videos/h264/clip.mp4`) → prepend `NEXT_PUBLIC_CDN_URL`
- Absolute URLs (e.g. `https://uploads-ssl.webflow.com/...`) → pass through unchanged

This means pages can mix Vercel Blob paths and legacy Webflow CDN URLs in the same component.

## CSS Classes for Video Containers

From `styles/krystofs-portfolio.webflow.scss`:

- **`.cb`** — `position: absolute; inset: 0%; z-index: 0; height: 100%` — fills parent, used as video container on service pages and tech projects
- **`.html-embed`** — similar absolute positioning, used on work pages (VSX, Mag)
- **`.background-video-18`** — used in homepage case study tiles for inline centered videos
- **`.w-embed`** — Webflow's embed wrapper, often combined with `.cb` or `.html-embed`

## Codec Strategy

**Priority order (browser picks first supported):**
1. **H.265** (`.mp4`, `codecs=hvc1`) — best compression, Safari + some Chrome
2. **AV1** (`.webm`, `codecs=av01`) — best compression, Chrome + Firefox
3. **H.264** (`.mp4`) — universal fallback
4. **WebM/VP9** (`.webm`) — legacy fallback, only on BackgroundVideo

Not all videos have all codecs. H.265 and AV1 are ~40-50% smaller than H.264 at same quality.

**File naming convention:**
- H.265: `public/videos/h265/{name}-web.mp4` or `{name}-web2.mp4`
- AV1: `public/videos/av1/{name}.webm`
- H.264: `public/videos/h264/{name}-fallback.mp4`
- WebM: `public/videos/other/{name}.webm`
- Posters: `public/videos/posters/{name}.jpg`

## Legacy Webflow CDN URLs

Some pages still reference assets on old Webflow CDNs:
- `cdn.prod.website-files.com` — poster images on service pages, work pages (VSX, Mag), homepage
- `uploads-ssl.webflow.com` — full videos (poster+mp4+webm) on old project pages, work listing
- `s3.amazonaws.com/webflow-prod-assets` — some H.264 fallbacks on homepage

These work via the `resolve()` helper but should eventually be migrated to Vercel Blob. See the plan doc at `docs/plans/2026-02-28-shimmer-loading-video-unification.md`, Part B for migration steps.

## Where Videos Are Used

| Page | Component | Count | Notes |
|------|-----------|-------|-------|
| `services/3d-environments` | EmbedVideo | 14 | All in `.cb.w-embed` wrappers |
| `services/mixed-reality` | EmbedVideo | 14 | All in `.cb.w-embed` wrappers |
| `app/page.jsx` (homepage) | EmbedVideo | 2 | Hero section, `.cb.w-embed` |
| `app/page.jsx` (homepage) | BackgroundVideo | 1 | Featured carousel |
| `app/page.jsx` (homepage) | inline `<video>` | 5 | Case studies + tech projects + Motion Mockups |
| `work/the-vsx-sports-bra` | EmbedVideo | 5 | In `.html-embed.w-embed` |
| `work/the-mag-w-rap-2025` | EmbedVideo | 7 | In `.html-embed.w-embed` |
| `work/barbour` | BackgroundVideo | 1 | Header video |
| `work/chainer` | BackgroundVideo | 1 | Webflow CDN URLs |
| `old-projects/apify` | BackgroundVideo | 1 | Webflow CDN URLs |
| `old-projects/bezestrachu` | BackgroundVideo | 3 | Webflow CDN URLs |
| `old-projects/dorian-drop-ii` | BackgroundVideo | 2 | Webflow CDN URLs |
| `other/work` (listing) | BackgroundVideo | 10 | All Webflow CDN URLs |
