# 3D Perspective Tilt on Service Cards

## What it does

The two service cards ("3D Environments" and "Mixed Reality") on the homepage are arranged on a concave arc — each card tilted along the Y-axis. Mouse movement anywhere on the screen smoothly rotates the whole arc, revealing depth. Disabled on mobile (< 768px).

## Files changed

Only **`app/page.jsx`** was modified.

### Imports (lines 3-4)

**Before:**
```jsx
import { useEffect } from 'react'
```

**After:**
```jsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
```

### Ref declaration (line 12)

**Added** after `export default function HomePage() {`:
```jsx
const gridRef = useRef(null)
```

### Grid element (line 360)

**Before:**
```jsx
<div className="w-layout-grid main-proj-grid head">
```

**After:**
```jsx
<div ref={gridRef} className="w-layout-grid main-proj-grid head">
```

### useEffect block — "Script 4" (lines 124-240)

**Before:** Did not exist.

**After:** New `useEffect` inserted between Script 3 (service tab switcher) and the `return (` JSX. Full implementation below.

## How it works

1. A wrapper `<div>` with `perspective: 1300px` is dynamically inserted around the grid
2. The grid gets `transform-style: preserve-3d` and `transform-origin: 50% 50% -600px` (pivot point behind the screen, center of the arc)
3. Each `.proj-item` card gets a static `rotationY` — left card `-6deg`, right card `+6deg` — forming a concave curve
4. `gsap.quickTo` smoothly animates the grid's `rotationY` and `rotationX` based on cursor position (anywhere on screen), giving the arc a gentle orbit
5. Invisible overlay `<div>`s with `data-cursor` are appended inside each card to fix `elementFromPoint` hit-testing (which breaks under `preserve-3d`)
6. A `matchMedia` listener disables everything below 768px

### Tuning values

| Parameter | Value | Effect |
|-----------|-------|--------|
| `perspective` | 1300px | Depth intensity (lower = more dramatic) |
| `BASE_TILTS` | [-6, 6] | Arc curvature per card |
| `MOUSE_RANGE_Y` | 3 | Horizontal cursor influence (degrees) |
| `MOUSE_RANGE_X` | 2 | Vertical cursor influence (degrees) |
| `EASE_DURATION` | 0.6 | Smoothing (higher = silkier but laggier) |
| `GAP` | 35px | Space between cards |
| `transformOrigin Z` | -600px | How far behind the screen the pivot sits |

## Original state (before this feature)

The exact code to restore if reverting:

### Imports (line 3)

```jsx
import { useEffect } from 'react'
```

(No `useRef`, no `gsap` import. The next lines were the component imports unchanged.)

### Function declaration (line 11)

```jsx
export default function HomePage() {
  // Script 1: Text carousel
```

(No `const gridRef = useRef(null)` line — went straight into Script 1.)

### Grid element

```jsx
<div className="w-layout-grid main-proj-grid head">
```

(No `ref={gridRef}`.)

### Between Script 3 and `return (`

There was no Script 4. The code went directly:

```jsx
    defaultDiv.style.display = 'flex'
    setTimeout(() => {
      defaultDiv.style.opacity = '1'
    }, 10)
  }, [])


  return (
```

### Cards were completely flat

Both `.proj-item` cards sat in a standard CSS grid with `grid-column-gap: 0px` and `grid-row-gap: 0px` (from `.main-proj-grid`). No 3D transforms, no perspective, no gap between cards, no cursor-following. The cards were flush side-by-side.

## How to revert

1. **Line 3** — replace `import { useEffect, useRef } from 'react'` with `import { useEffect } from 'react'`
2. **Line 4** — delete `import gsap from 'gsap'`
3. **Line 12** — delete `const gridRef = useRef(null)` (and the blank line after it)
4. **Grid div** — change `<div ref={gridRef} className="w-layout-grid main-proj-grid head">` to `<div className="w-layout-grid main-proj-grid head">`
5. **Script 4 useEffect** — delete the entire block from `// Script 4: 3D perspective tilt on service cards` through its closing `}, [])` (including the blank line before `return (`)

No SCSS changes to revert. No other files affected.

## Known issues

- `preserve-3d` breaks `document.elementFromPoint()` hit-testing in some browsers — the invisible overlay divs work around this, but hover detection from extreme side angles may still be imperfect
- The `overflow: hidden` on `.proj-item` (Webflow CSS) clips the 3D-rotated card edges by a few pixels — this looks intentional but can be overridden with `.main-proj-grid.head .proj-item { overflow: visible }` in SCSS if needed
