# Animation & Interaction Reference

Comprehensive audit of every animation, transition, and interaction in the portfolio.

---

## 1. Overview

| Concern | Tool |
|---------|------|
| Dynamic animations (tweens, timelines, stagger) | **GSAP** — the single animation library for the project |
| 3D depth parallax | **Three.js** scene rendered on **GSAP ticker** |
| Continuous marquee | `requestAnimationFrame` loop (vanilla JS) |
| Timed text rotation | `setInterval` with inline `transition` style |
| Hover / state transitions | **CSS transitions** declared in SCSS |
| Availability-dot pulse | **CSS `@keyframes`** (only keyframe animation on the site) |
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

## 3. Homepage Animations

**File:** `app/page.jsx`

### 3a. Text carousel
| | |
|-|-|
| **What** | Vertically cycles `.changer` items inside `.changer-move` on a 2s timer |
| **Trigger** | `setInterval` — 2000ms (page load) |
| **Properties** | `translateY` by item height increments |
| **Duration / Easing** | 0.5s / `ease-in-out` (inline CSS transition) |
| **Lines** | 17–38 |
| **Notes** | On last item → snaps back to first with `transition: none` after 500ms timeout. Also has a matching `<style>` block at line 251–253. |

### 3b. Logo marquee
| | |
|-|-|
| **What** | `.inner-container` scrolls left continuously; seamless loop by resetting position when one logo-width is consumed |
| **Trigger** | `requestAnimationFrame` loop (page load) |
| **Properties** | `translateX` via `style.transform` |
| **Speed** | 2px per frame |
| **Lines** | 42–92 |
| **Notes** | Pauses on `visibilitychange` (hidden), resumes on visible. Recalculates gap on `resize`. |

### 3c. Service tab switcher
| | |
|-|-|
| **What** | Click a service button (#b1–#b4) → previous panel fades out, new panel fades in |
| **Trigger** | Click on `#b1`, `#b2`, `#b3`, `#b4` |
| **Properties** | `opacity` 0 ↔ 1, `display` none ↔ flex |
| **Duration / Easing** | 0.3s / `ease` (CSS transition on `#serv1`–`#serv4`, line 255–259) |
| **Lines** | 94–124 |
| **Notes** | Uses sequential `setTimeout(300)` to wait for fade-out before showing new panel. `.selected` class toggles background color. |

### 3d. 3D perspective card tilt
| | |
|-|-|
| **What** | Two `.proj-item` cards sit in a preserve-3d grid with static Y rotations (-6°, +6°); the whole grid additionally rotates with the mouse |
| **Trigger** | `mousemove` on `window` |
| **Properties** | `rotationY` (±3° range), `rotationX` (±2° range) |
| **Duration / Easing** | 0.6s / `power2.out` via `gsap.quickTo` |
| **Lines** | 126–245 |
| **Config** | perspective: 1300px, transformOrigin: `50% 50% -600px`, gap: 35px |
| **Notes** | Disabled on mobile (≤767px). Creates DOM wrapper for perspective. Invisible overlays forward `data-cursor` to fix `elementFromPoint` in preserve-3d context. Full teardown/setup on breakpoint change. See `docs/3d-tilt-service-cards.md`. |

### 3e. Pulse dot
| | |
|-|-|
| **What** | Green availability dot pulses (scale 1 → 0 → 1) |
| **Trigger** | CSS `@keyframes` animation, infinite loop |
| **Properties** | `transform: scale()` — 1 at 0%/60%, 0 at 80%, 1 at 100% |
| **Duration / Easing** | 3s / `ease-in-out` infinite |
| **Lines** | 267–274 (inline `<style>` in page.jsx) |
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
| **Trigger** | `IntersectionObserver` (rootMargin 200px) lazy-inits the scene; `mousemove` on the container drives the parallax |
| **Mouse tracking** | `gsap.to(mouseCurrent, { x, y, duration: 0.4, ease: 'power2.out' })` (line 189–194) |
| **Mouse leave** | `gsap.to(mouseCurrent, { x: 0, y: 0, duration: 0.6, ease: 'power2.out' })` (line 197–202) |
| **Render loop** | `gsap.ticker.add(render)` — runs every frame (line 160) |
| **Props** | `intensity` (default 0.5) — camera movement range; `displacement` (default 0.4) — depth extrusion |
| **Lines** | 46–162 (init), 165–179 (lazy observer), 182–210 (mouse tracking), 213–226 (resize), 229–244 (cleanup) |
| **Notes** | 512×512 plane segments. Overscan factor 1.12 hides edges. PerspectiveCamera FOV 50°. Full cleanup on unmount (geometry, material, texture, renderer, ticker). Falls back to plain `<img>` if image loading fails. |

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
| **Lines** | 2681–2690 |

### 8f. Accordion content
| | |
|-|-|
| **Selector** | `.fs_accordion-2_content` |
| **Property** | `max-height` |
| **Duration** | 0.2s |
| **Lines** | 4000–4002 |

### 8g. Accordion arrow rotation
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

### CSS transitions

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| `.link.green`, `.link.invert` | `color` | 0.2s | `ease` |
| `.line` | `transform` (scaleX) | 0.35s | `cubic-bezier(0.86, 0, 0.14, 1)` |
| `.proj-heading` | `transform` (translateX) | 0.3s | `ease` |
| `.background-video-18` | `opacity` | 0.3s | `ease` |
| `.image-19` | `transform` (translateX) | 0.3s | `ease` |
| `.fs_accordion-2_content` | `max-height` | 0.2s | (default) |
| `.fs_accordion-2_arrow-wrapper` | `transform` (rotate) | 0.2s | (default) |
| `.changer-move` | `transform` (translateY) | 0.5s | `ease-in-out` |
| `#serv1`–`#serv4` | `opacity` | 0.3s | `ease` |

### CSS keyframes

| Name | Duration | Easing | Element |
|------|----------|--------|---------|
| `pulse-dot` | 3s | `ease-in-out` infinite | `.div-block-88` |

### Intervals & timers

| What | Interval | File |
|------|----------|------|
| Text carousel rotation | 2000ms | `page.jsx:23` |
| Carousel snap-back timeout | 500ms | `page.jsx:29` |
| Service tab fade-out wait | 300ms | `page.jsx:107,109` |
| Cursor collapse debounce | 30ms | `CustomCursor.jsx:122` |
