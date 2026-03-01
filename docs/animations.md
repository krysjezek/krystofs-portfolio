# Animation & Interaction Reference

Comprehensive audit of every animation, transition, and interaction in the portfolio.

---

## 1. Overview

| Concern | Tool |
|---------|------|
| Dynamic animations (tweens, timelines, stagger) | **GSAP** — the single animation library for the project |
| 3D depth parallax | **Three.js** scene rendered on **GSAP ticker** |
| Continuous marquee | **GSAP** `gsap.to()` with `repeat: -1` |
| Timed text rotation | `setInterval` with inline `transition` style |
| Hover / state transitions | **CSS transitions** declared in SCSS |
| Availability-dot pulse | **CSS `@keyframes`** (only keyframe animation on the site) |
| Scroll reveal (blur) | **GSAP** `filter: blur()` + **ScrollTrigger** |
| Page-load entrance (lines, navbar) | **GSAP** scale/translate tweens |
| Lazy-load triggers | **IntersectionObserver** |

No Framer Motion. No CSS animations for dynamic motion (pulse-dot is the sole exception).

---

## 2. Custom Cursor

**File:** `components/CustomCursor.jsx`
Mounted globally in `app/layout.jsx`. Native cursor hidden via `cursor: none !important`.

### 2a. Cursor position tracking
| | |
|-|-|
| **What** | Wrapper div follows the mouse |
| **Trigger** | `mousemove` on `window` |
| **Method** | `gsap.set(cursor, { x, y })` — instant, no tween |
| **Lines** | 26, 91–98 |

### 2b. Pill expand (label appear)
| | |
|-|-|
| **What** | Green pill scales from 0 → 1 when cursor enters a `[data-cursor]` element |
| **Trigger** | `mousemove` → `elementFromPoint` → `.closest('[data-cursor]')` |
| **Properties** | `scale` 0 → 1 |
| **Duration / Easing** | 0.25s / `circ.out` |
| **Lines** | 64–65 |

### 2c. Pill character stagger
| | |
|-|-|
| **What** | Each character of the label text staggers in from below |
| **Trigger** | Same as pill expand |
| **Properties** | `y` 10 → 0, `opacity` 0 → 1 |
| **Duration / Easing** | 0.3s / `power3.out`, stagger 0.025s, delay 0.03s |
| **Lines** | 46–50 |

### 2d. Pill collapse (label disappear)
| | |
|-|-|
| **What** | Characters + icon fade out, pill shrinks to 28px width then scales to 0 |
| **Trigger** | Cursor leaves `[data-cursor]` element (30ms debounce) or rAF tick detects no match |
| **Properties** | `opacity` → 0 (chars, 0.05s), `width` → 28 (0.15s, `power2.in`), `scale` → 0 (0.12s, `power2.in`, 0.03s delay) |
| **Lines** | 68–73 |
| **Notes** | Collapse is debounced 30ms (line 122–125) to absorb edge jitter. rAF tick (lines 77–89) provides a safety net when the mouse is stationary and no `mousemove` fires. |

### 2e. Link hover scale
| | |
|-|-|
| **What** | Arrow SVG scales up on `a`, `button`, `[role="button"]` *without* `data-cursor` |
| **Trigger** | `mousemove` — link detection via `.closest('a, button, [role="button"]')` |
| **Properties** | `scale` 1 → 1.4 (enter), 1.4 → 1 (leave) |
| **Duration / Easing** | 0.35s / `power1.inOut` |
| **Lines** | 104–112 |

### 2f. Click feedback
| | |
|-|-|
| **What** | Entire cursor wrapper squishes on mousedown, rebounds on mouseup |
| **Trigger** | `mousedown` / `mouseup` on `window` |
| **Properties** | `scale` → 0.85 (down, 0.2s), → 1 (up, 0.4s) |
| **Easing** | `power1.inOut` |
| **Lines** | 129–135 |

### 2g. Synthetic mousemove filter
| | |
|-|-|
| **What** | Ignores browser-fired synthetic `mousemove` events (e.g. from marquee DOM writes) |
| **Method** | Compares `clientX/Y` to `lastX/Y`; skips if unchanged |
| **Lines** | 96–98 |

---

## 2h. Navbar scroll hide/reveal

**File:** `hooks/useNavbarScroll.js`
**Used by:** `components/Navbar.jsx`

| | |
|-|-|
| **What** | Navbar slides up off-screen when scrolling down, slides back down when scrolling up |
| **Trigger** | `scroll` event on `window` (passive) |
| **Properties** | `y` → `-100%` (hide), `y` → `0` (reveal) |
| **Duration / Easing** | 1.2s / `power2.out` |
| **Threshold** | Only hides after scrolling past 50px from the top |
| **Notes** | Tracks `lastScrollY` via ref. Compares current vs previous scroll position to determine direction. |

---

## 3. Homepage Animations

**Page:** `app/page.jsx` (thin wrapper — hook calls only)

### 3a. Text carousel
| | |
|-|-|
| **File** | `hooks/useTextCarousel.js` |
| **What** | Vertically cycles `.changer` items inside `.changer-move` on a 2s timer |
| **Trigger** | `setInterval` — 2000ms (page load) |
| **Properties** | `translateY` by item height increments |
| **Duration / Easing** | 0.5s / `ease-in-out` (CSS transition on `.changer-move` in SCSS) |
| **Notes** | On last item → snaps back to first with `transition: none` after 500ms timeout. |

### 3b. Logo marquee
| | |
|-|-|
| **File** | `hooks/useMarquee.js` |
| **What** | `.logo-marquee-track` (28 logos — 14 originals + 14 duplicates) scrolls left continuously; GSAP loops seamlessly by translating by exactly half the track width |
| **Trigger** | `gsap.to()` with `repeat: -1`, `ease: "none"` (page load) |
| **Properties** | `x` (GSAP transform) |
| **Speed** | 50px/s (configurable via `speed` option) |
| **Duration** | Computed: `halfWidth / speed` — adapts to track width |
| **Notes** | Pauses on `visibilitychange` (hidden), resumes on visible. Recreates tween on `resize`. Ref-based — accepts a React ref to the track element. |

### 3c. Service tab switcher
| | |
|-|-|
| **File** | `hooks/useServiceTabs.js` |
| **What** | Click a service button (#b1–#b4) → previous panel fades out, new panel fades in |
| **Trigger** | Click on `#b1`, `#b2`, `#b3`, `#b4` |
| **Properties** | `opacity` 0 ↔ 1, `display` none ↔ flex |
| **Duration / Easing** | 0.3s / `ease` (CSS transition on `#serv1`–`#serv4` in SCSS) |
| **Notes** | Uses sequential `setTimeout(300)` to wait for fade-out before showing new panel. `.selected` class toggles background color. |

### 3d. 3D perspective card tilt
| | |
|-|-|
| **File** | `hooks/useCardTilt.js` |
| **What** | Two `.proj-item` cards sit in a preserve-3d grid with static Y rotations (-6°, +6°); the whole grid additionally rotates with the mouse |
| **Trigger** | `mousemove` on `window` |
| **Properties** | `rotationY` (±3° range), `rotationX` (±2° range) |
| **Duration / Easing** | 0.6s / `power2.out` via `gsap.quickTo` |
| **Config** | perspective: 1300px, transformOrigin: `50% 50% -600px`, gap: 35px |
| **Notes** | Disabled on mobile (≤767px). Creates DOM wrapper for perspective. Invisible overlays forward `data-cursor` to fix `elementFromPoint` in preserve-3d context. Full teardown/setup on breakpoint change. See `docs/3d-tilt-service-cards.md`. |

### 3e. Motion Mockups banner hover shimmer + inflate
| | |
|-|-|
| **File** | `hooks/useHoverShimmer.js` |
| **What** | On hover: (1) translucent gradient sweeps left-to-right, (2) card scales to 1.025×, (3) "motionmockups.com" label + arrow turn green |
| **Trigger** | `mouseenter` / `mouseleave` on `.div-block-149` |
| **Shimmer** | `x` from `-101%` → `101%` (0.8s, `power1.inOut`); on leave `opacity` → 0 (0.3s, `power2.out`) |
| **Scale** | `scale` 1 → 1.025 (0.4s, `power2.out`); on leave 1.025 → 1 (0.4s, `power2.out`) |
| **Green text** | CSS transition on `.div-block-153 .label` `color` → `var(--green-new)` + `.image-20` SVG filter (0.3s, `ease`) + `arrow-diagonal-in` animation (0.5s) |
| **Notes** | Overlay is DOM-injected by the hook. `.div-block-149` has `overflow: hidden` + `position: relative` to clip shimmer to border-radius. |

### 3f. Pulse dot
| | |
|-|-|
| **File** | `styles/krystofs-portfolio.webflow.scss` |
| **What** | Green availability dot pulses (scale 1 → 0 → 1) |
| **Trigger** | CSS `@keyframes pulse-dot` animation, infinite loop |
| **Properties** | `transform: scale()` — 1 at 0%/60%, 0 at 80%, 1 at 100% |
| **Duration / Easing** | 3s / `ease-in-out` infinite |
| **Element** | `.div-block-88` |

---

## 4. Image Loading (ShimmerImage)

**File:** `components/ShimmerImage.jsx`

### 4a. Shimmer sweep
| | |
|-|-|
| **What** | A gradient overlay translates from left to right in a loop while the image loads |
| **Trigger** | Component mount |
| **Properties** | `x` from `-100%` (CSS initial) → `100%` |
| **Duration / Easing** | 1.2s / `power1.inOut`, `repeat: -1` |
| **Lines** | 15–20 |
| **Notes** | Gradient: `transparent → #2a2a4a → transparent`. Background: `#1a1a2e`. |

### 4b. Image fade-in
| | |
|-|-|
| **What** | On `<img>` load, sweep fades out, then image fades in |
| **Trigger** | `onLoad` callback on `<img>` |
| **Properties** | Sweep `opacity` → 0 (0.3s, `power2.out`), then image `opacity` → 1 (0.5s, `power2.out`, overlaps by 0.1s) |
| **Lines** | 26–35 |
| **Notes** | GSAP timeline ensures correct sequencing. Sweep tween is killed before fade starts. |

---

## 5. Link Interactions

### 5a. ShuffleLinks — character stagger

**File:** `components/ShuffleLinks.jsx`

| | |
|-|-|
| **What** | On hovering a `.link` element, its text splits into per-character `<span>`s that stagger up from below |
| **Trigger** | `mouseover` on any `.link` element (delegated to `document`) |
| **Properties** | `y` 8 → 0, `opacity` 0 → 1 |
| **Duration / Easing** | 0.35s / `power3.out`, stagger 0.028s |
| **Lines** | 34–45 |
| **Notes** | On `onComplete`, text is restored to plain textContent (removes spans). On `mouseout` before completion, tween is killed and text restored immediately. Skips elements that already contain child elements (non-text-only). Also sets `--link-cx` / `--link-cy` CSS vars from cursor position (lines 14–17) for the underline origin used by LinkLines. |

### 5b. LinkLines — underline origin

**File:** `components/LinkLines.jsx`

| | |
|-|-|
| **What** | Sets `--line-ox` CSS variable on `.line` elements inside `.div-block-65` based on cursor entry position |
| **Trigger** | `mouseenter` on any element (delegated, capture phase) |
| **Properties** | `--line-ox` set to cursor X percentage within `.line-mask` |
| **Lines** | 6–15 |
| **Notes** | The CSS transition on `.line` uses `transform-origin: var(--line-ox, 50%) 0` (SCSS line 399) so the underline scales out from the cursor entry point. |

---

## 6. Depth Parallax

**File:** `components/DepthParallax.jsx`

| | |
|-|-|
| **What** | A Three.js scene renders a textured plane with depth-map vertex displacement; the camera shifts with the mouse to create a 3D parallax effect |
| **Trigger** | `IntersectionObserver` (rootMargin 200px) lazy-inits the scene; `mousemove` drives the parallax |
| **Mouse tracking** | `gsap.to(mouseCurrent, { x, y, duration: 0.4, ease: 'power2.out' })` |
| **Mouse leave** | `gsap.to(mouseCurrent, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })` (local mode only) |
| **Render loop** | `gsap.ticker.add(render)` — runs every frame |
| **Props** | `intensity` (default 0.5) — camera movement range; `displacement` (default 0.4) — depth extrusion; `globalMouse` (default false) — viewport-based mouse tracking |
| **`globalMouse` mode** | When `true`, listens on `window` and normalizes to viewport: `x = (clientX / innerWidth) * 2 - 1`. No `mouseleave` reset — parallax stays wherever the mouse is. When `false` (default), listens on the container element with `mouseleave` resetting to center. |
| **Notes** | 512×512 plane segments. Overscan factor 1.12 hides edges. PerspectiveCamera FOV 50°. Full cleanup on unmount (geometry, material, texture, renderer, ticker). Falls back to plain `<img>` if image loading fails. |
| **Used in** | `/test/depth` (local mouse), `Footer.jsx` (global mouse) |

---

## 7. Video Lazy Loading

**File:** `hooks/useVideoLazyLoad.js`

| | |
|-|-|
| **What** | Hook returns `{ containerRef, videoRef, inView }`. When the container enters the viewport, `inView` flips to `true` and the observer disconnects. |
| **Trigger** | `IntersectionObserver` with configurable `rootMargin` (default `200px`) |
| **Lines** | 5–29 |
| **Used by** | `BackgroundVideo.jsx`, `EmbedVideo.jsx` |
| **Notes** | One-shot observer — once triggered, it disconnects. The consuming component conditionally renders `<source>` elements when `inView` is true. See `docs/video-and-media.md` for full details. |

---

## 8. CSS Transitions (SCSS)

**File:** `styles/krystofs-portfolio.webflow.scss`

### 8a. Link color transition
| | |
|-|-|
| **Selector** | `.link.green`, `.link.invert` |
| **Property** | `color` |
| **Duration / Easing** | 0.2s / `ease` |
| **Hover** | → `var(--green-new)` (#a4f683) |
| **Lines** | 373–381 |

### 8b. Underline scale
| | |
|-|-|
| **Selector** | `.line` (inside `.line-mask` inside `.div-block-65`) |
| **Property** | `transform: scaleX(0)` → `scaleX(1)` |
| **Duration / Easing** | 0.35s / `cubic-bezier(0.86, 0, 0.14, 1)` |
| **Origin** | `var(--line-ox, 50%) 0` — set dynamically by `LinkLines.jsx` |
| **Hover trigger** | `.div-block-65:hover .line` |
| **Lines** | 392–405 |

### 8c. Project heading slide
| | |
|-|-|
| **Selector** | `.proj-heading` |
| **Property** | `transform: translate(-40px)` → `translate(0)` |
| **Duration / Easing** | 0.3s / `ease` |
| **Hover trigger** | `.proj-item:hover .proj-heading` |
| **Lines** | 1921–1934 |

### 8d. Project background video fade
| | |
|-|-|
| **Selector** | `.background-video-18` |
| **Property** | `opacity: 0` → `1` |
| **Duration / Easing** | 0.3s / `ease` |
| **Hover trigger** | `.proj-item:hover .background-video-18` |
| **Lines** | 2636–2649 |

### 8e. Project image arrow slide
| | |
|-|-|
| **Selector** | `.image-19` |
| **Property** | `transform: translate(-40px)` → `translate(0)` |
| **Duration / Easing** | 0.3s / `ease` |
| **Hover trigger** | `.proj-item:hover .image-19` |

### 8f. Link arrow diagonal slide-in
| | |
|-|-|
| **Selector** | `.image-20`, `.github` |
| **Animation** | `@keyframes arrow-diagonal-in` — arrow visible by default; on hover: slides out toward top-right + fades (0–35%), jumps to bottom-left offset (36%), slides diagonally back to origin + fades in (36–100%) |
| **Duration / Easing** | 0.5s / `ease` |
| **Hover triggers** | `.div-block-65:hover .image-20` (footer links), `.github-button:hover .github` (tech project links), `.div-block-149:hover .div-block-153 .image-20` (MotionMockups banner) |
| **Affects** | Footer social/contact links, tech project GitHub/Instagram links, MotionMockups banner link |

### 8g. Accordion content
| | |
|-|-|
| **Selector** | `.fs_accordion-2_content` |
| **Property** | `max-height` |
| **Duration** | 0.2s |
| **Lines** | 4000–4002 |

### 8h. Accordion arrow rotation
| | |
|-|-|
| **Selector** | `.fs_accordion-2_arrow-wrapper` |
| **Property** | `transform` (→ `rotate(180deg)` when `.is-active-accordion`) |
| **Duration** | 0.2s |
| **Lines** | 4027–4032 |

---

## 9. Data Attributes Reference

### `data-cursor` values

| Value | Where | Element |
|-------|-------|---------|
| `"Explore"` | `Navbar.jsx:18` | Kryštof Ježek home link |
| `"Explore"` | `Footer.jsx:48,52,56` | Menu links (3D Environments, Mixed Reality, Tech Projects) |
| `"Explore"` | `page.jsx:363,380` | Service category cards (3D Environments, Mixed Reality) |
| `"Explore"` | `page.jsx:428,438,448,458` | Service tab buttons (#b1–#b4) |
| `"Explore"` | `page.jsx:503,538,567,602` | Featured work project cards |
| `"Follow"` | `Footer.jsx:26,31,36` | Social links (Instagram, Gumroad, LinkedIn) |
| `"Reach out"` | `Footer.jsx:67,72` | Contact links (email, WhatsApp) |
| `"Connect"` | `Footer.jsx:86,93` | CTA buttons (Schedule a call, Get in touch) |
| `"Visit"` | `page.jsx:332` | Motion Mockups promo card |
| `"Visit"` | work pages | External links (YouTube, Instagram, live site) |

### `data-cursor-icon` values

| Value | Where | Resolved URL |
|-------|-------|-------------|
| `"arrow"` | `Footer.jsx:26,31,36` + `page.jsx:332` | `${CDN}/images/arrow-leftup.svg` (via `ICON_ALIASES` in CustomCursor) |

---

## 10. Easing & Timing Reference

### GSAP animations

| Animation | Duration | Easing | Delay | Repeat |
|-----------|----------|--------|-------|--------|
| Cursor pill expand | 0.25s | `circ.out` | — | — |
| Cursor pill chars in | 0.3s | `power3.out` | stagger 0.025s, delay 0.03s | — |
| Cursor pill chars out | 0.05s | (default) | — | — |
| Cursor pill width shrink | 0.15s | `power2.in` | — | — |
| Cursor pill scale out | 0.12s | `power2.in` | 0.03s | — |
| Cursor link hover scale | 0.35s | `power1.inOut` | — | — |
| Cursor click down | 0.2s | `power1.inOut` | — | — |
| Cursor click up | 0.4s | `power1.inOut` | — | — |
| Shimmer sweep | 1.2s | `power1.inOut` | — | infinite |
| Shimmer sweep fade | 0.3s | `power2.out` | — | — |
| Image fade-in | 0.5s | `power2.out` | −0.1s overlap | — |
| ShuffleLinks chars in | 0.35s | `power3.out` | stagger 0.028s | — |
| 3D card tilt (quickTo) | 0.6s | `power2.out` | — | — |
| Depth parallax mouse track | 0.4s | `power2.out` | — | — |
| Depth parallax mouse leave | 0.6s | `power2.out` | — | — |
| Banner hover shimmer sweep | 0.8s | `power1.inOut` | — | — |
| Banner hover shimmer fade | 0.3s | `power2.out` | — | — |
| Banner hover scale up | 0.4s | `power2.out` | — | — |
| Banner hover scale down | 0.4s | `power2.out` | — | — |
| Logo marquee scroll | `halfWidth / 50`s | `none` | — | infinite |
| Navbar scroll hide | 1.2s | `power2.out` | — | — |
| Navbar scroll reveal | 1.2s | `power2.out` | — | — |
| Vertical lines grow | 1.8s | `power1.out` | 0.2s, stagger 0.15s | — |
| Horizontal liners grow | 1.8s | `power1.out` | 0.2s, stagger 0.15s | — |
| Navbar slide-in | 0.5s | `circ.out` | 0.7s | — |
| Blur reveal (hero) | 0.4s | `none` (linear) | 0.05s (stagger 0.1s) | — |
| Blur reveal (scroll) | 0.45s | `none` (linear) | stagger 0.1s | — |

### CSS transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| `.link.green`, `.link.invert` | `color` | 0.2s | `ease` |
| `.line` | `transform` (scaleX) | 0.35s | `cubic-bezier(0.86, 0, 0.14, 1)` |
| `.proj-heading` | `transform` (translateX) | 0.3s | `ease` |
| `.background-video-18` | `opacity` | 0.3s | `ease` |
| `.image-19` | `transform` (translateX) | 0.3s | `ease` |
| `.div-block-153 .label` | `color` | 0.3s | `ease` |
| `.div-block-153 .image-20` | `filter` | 0.3s | `ease` |
| `.fs_accordion-2_content` | `max-height` | 0.2s | (default) |
| `.fs_accordion-2_arrow-wrapper` | `transform` (rotate) | 0.2s | (default) |
| `.changer-move` | `transform` (translateY) | 0.5s | `ease-in-out` |
| `#serv1`–`#serv4` | `opacity` | 0.3s | `ease` |

### CSS keyframes

| Name | Duration | Easing | Element |
|------|----------|--------|---------|
| `arrow-diagonal-in` | 0.5s | `ease` | `.image-20`, `.github` (on parent hover) |
| `pulse-dot` | 3s | `ease-in-out` infinite | `.div-block-88` |

### Intervals & timers

| What | Interval | File |
|------|----------|------|
| Text carousel rotation | 2000ms | `hooks/useTextCarousel.js` |
| Carousel snap-back timeout | 500ms | `hooks/useTextCarousel.js` |
| Service tab fade-out wait | 300ms | `hooks/useServiceTabs.js` |
| Cursor collapse debounce | 30ms | `CustomCursor.jsx:122` |

---

## 11. Page-Load Entrance & Scroll Reveal

**File:** `hooks/useScrollReveal.js`
**CSS:** `styles/krystofs-portfolio.webflow.scss` (bottom of file — `overflow: clip` on `[data-reveal]`)

The hook handles two concerns: **page-load entrance** (background lines + navbar) and **blur reveal** (content elements blur-to-sharp on load or scroll).

---

### Page-Load Entrance

Three sequential entrance animations run on mount (before any reveal):

### 11a. Vertical background lines
| | |
|-|-|
| **What** | `.background .vertical-line` elements grow from top to bottom, staggering left-to-right |
| **Trigger** | Page load (mount) |
| **Properties** | `scaleY` 0 → 1, `transformOrigin: top center` |
| **Duration / Easing** | 1.8s / `power1.out`, delay 0.2s |
| **Stagger** | 0.15s, `from: 'start'` |
| **Lines** | 15–19 |

### 11b. Horizontal liners
| | |
|-|-|
| **What** | `.liner` elements grow from left to right |
| **Trigger** | Page load (mount, concurrent with vertical lines) |
| **Properties** | `scaleX` 0 → 1, `transformOrigin: left center` |
| **Duration / Easing** | 1.8s / `power1.out`, delay 0.2s |
| **Stagger** | 0.15s |
| **Lines** | 22–26 |

### 11c. Navbar slide-in
| | |
|-|-|
| **What** | `.navbar` slides down from above the viewport |
| **Trigger** | Page load (mount, 0.7s delay — after lines begin) |
| **Properties** | `y` `-100%` → `0` |
| **Duration / Easing** | 0.5s / `circ.out`, delay 0.7s |
| **Lines** | 29–33 |

---

### Blur Reveal

Elements with `data-reveal` start at `filter: blur(6px)` and animate to `blur(0px)`. CSS `overflow: clip` on `[data-reveal]` contains the blur within element bounds.

### Data attribute API

| Attribute | Value | Behavior |
|-----------|-------|----------|
| `data-reveal` | (none) | Scroll-triggered blur reveal at 70% viewport |
| `data-reveal` | `"hero"` | Page-load reveal (no scroll trigger, slightly faster) |
| `data-reveal-group` | (none) | Scroll-triggered parent — children with `data-reveal` stagger row-by-row |
| `data-reveal-group` | `"hero"` | Page-load parent — children stagger on mount |

### 11d. Hero blur reveal (page load)
| | |
|-|-|
| **What** | Content blurs to sharp on page load |
| **Trigger** | Component mount (no scroll) |
| **Properties** | `filter` `blur(6px)` → `blur(0px)` |
| **Duration / Easing** | 0.4s / `none` (linear), delay 0.05s |
| **Stagger** | 0.1s row-by-row (`grid: 'auto'`, `axis: 'y'`) when inside `data-reveal-group="hero"` |
| **Lines** | 39–66 |

### 11e. Scroll blur reveal (on-scroll)
| | |
|-|-|
| **What** | Content blurs to sharp when scrolled into viewport |
| **Trigger** | ScrollTrigger, `start: "top 70%"`, `once: true` |
| **Properties** | `filter` `blur(6px)` → `blur(0px)` |
| **Duration / Easing** | 0.45s / `none` (linear) |
| **Stagger** | 0.1s row-by-row (`grid: 'auto'`, `axis: 'y'`) when inside `data-reveal-group` |
| **Lines** | 68–112 |

### 11f. Reduced motion
| | |
|-|-|
| **What** | Skips all animations — entrance, blur, everything. Content appears instantly. |
| **Trigger** | `prefers-reduced-motion: reduce` media query |

### 11g. SPA navigation
| | |
|-|-|
| **What** | MutationObserver re-scans for new `[data-reveal]` elements on DOM changes |
| **Trigger** | `childList` + `subtree` mutations on `<body>` |
| **Notes** | WeakSet tracks processed elements to prevent re-animation |

### Blur containment

`clip-path: inset(0px round <radius>)` is applied by `useScrollReveal.js` at animation start on elements with non-zero `border-radius`, clipping the element's own `filter: blur()` output within its rounded bounds. Removed via `onComplete` once blur reaches 0.

`overflow: clip` is kept on `[data-reveal]` elements in the SCSS to clip overflowing *children* — it does NOT clip the element's own filter output.

### Interactions with other animations

- **ShimmerImage:** Independent — blur reveals the container, shimmer handles the image inside
- **Video components:** Independent — blur on parent wrapper, video fade-in on `<video>` element
- **Card tilt:** Blur and transform are different properties — no conflict
- **Marquee:** `data-reveal` goes on the parent section, NOT on `.logo-marquee-track`
- **Navbar:** Has its own entrance animation (11c), no `data-reveal`

### Pages using scroll reveal

All pages across the site use `data-reveal` attributes:
- **Homepage** (`app/page.jsx`): hero, service grid, featured work, case studies, snapshots, tech projects, about
- **Work pages** (chainer, barbour, vsx, mag-wrap-2025): header, cs-grid items, credits
- **Service pages** (3d-environments, mixed-reality): header, service grid items, credits
- **Other pages** (cv, work listing, join): headers, content grids
- **Old project pages** (9 pages): headers, cs-grid items
