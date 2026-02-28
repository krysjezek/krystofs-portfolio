'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export function useCardTilt(gridRef) {
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const cards = grid.querySelectorAll('.proj-item')
    if (cards.length < 2) return

    const mql = window.matchMedia('(max-width: 767px)')
    if (mql.matches) return // no tilt on mobile

    // Config
    const BASE_TILTS = [-6, 6] // concave arc — inner edges forward
    const MOUSE_RANGE_Y = 3
    const MOUSE_RANGE_X = 2
    const EASE_DURATION = 0.6
    const GAP = 35

    // Wrap grid in a perspective container
    const wrapper = document.createElement('div')
    wrapper.style.perspective = '1300px'
    grid.parentNode.insertBefore(wrapper, grid)
    wrapper.appendChild(grid)

    // Grid rotates as a whole; preserve-3d lets child tilts show through
    // Origin pushed 600px behind the screen so rotation pivots from the arc center
    grid.style.transformStyle = 'preserve-3d'
    grid.style.transformOrigin = '50% 50% -600px'
    grid.style.willChange = 'transform'
    grid.style.gap = GAP + 'px'
    gsap.set(grid, { rotationY: 0, rotationX: 0 })

    // Each card gets a static tilt to form the curved arc
    cards.forEach((card, i) => {
      card.style.willChange = 'transform'
      gsap.set(card, { rotationY: BASE_TILTS[i] })
    })

    // Cursor rotates the whole grid
    const qtY = gsap.quickTo(grid, 'rotationY', { duration: EASE_DURATION, ease: 'power2.out' })
    const qtX = gsap.quickTo(grid, 'rotationX', { duration: EASE_DURATION, ease: 'power2.out' })

    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      qtY(nx * MOUSE_RANGE_Y)
      qtX(-ny * MOUSE_RANGE_X)
    }

    window.addEventListener('mousemove', onMouseMove)

    // Fix hover detection: preserve-3d breaks elementFromPoint, so we use
    // native mouseenter/mouseleave to inject a marker attribute that the
    // CustomCursor's elementFromPoint -> .closest('[data-cursor]') will find.
    // We place an invisible overlay on each card that stays in the normal
    // (non-3D) flow and forwards data-cursor to the cursor system.
    const overlays = []
    cards.forEach((card) => {
      const overlay = document.createElement('div')
      overlay.dataset.cursor = card.dataset.cursor
      overlay.style.cssText = 'position:absolute;inset:0;z-index:1;'
      card.style.position = 'relative'
      card.appendChild(overlay)
      overlays.push(overlay)
    })

    const teardown = () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.set(grid, { clearProps: 'transform' })
      grid.style.willChange = ''
      grid.style.transformStyle = ''
      grid.style.transformOrigin = ''
      grid.style.gap = ''
      cards.forEach(c => { gsap.set(c, { clearProps: 'transform' }); c.style.willChange = '' })
      overlays.forEach(o => o.remove())
    }

    const setup = () => {
      wrapper.style.perspective = '1300px'
      grid.style.transformStyle = 'preserve-3d'
      grid.style.transformOrigin = '50% 50% -600px'
      grid.style.willChange = 'transform'
      grid.style.gap = GAP + 'px'
      gsap.set(grid, { rotationY: 0, rotationX: 0 })
      cards.forEach((card, i) => {
        card.style.willChange = 'transform'
        gsap.set(card, { rotationY: BASE_TILTS[i] })
        const overlay = document.createElement('div')
        overlay.dataset.cursor = card.dataset.cursor
        overlay.style.cssText = 'position:absolute;inset:0;z-index:1;'
        card.style.position = 'relative'
        card.appendChild(overlay)
        overlays.push(overlay)
      })
      window.addEventListener('mousemove', onMouseMove)
    }

    const onBreakpointChange = (e) => {
      if (e.matches) {
        teardown()
        wrapper.parentNode.insertBefore(grid, wrapper)
        wrapper.remove()
      } else {
        const parent = grid.parentNode
        parent.insertBefore(wrapper, grid)
        wrapper.appendChild(grid)
        setup()
      }
    }
    mql.addEventListener('change', onBreakpointChange)

    return () => {
      teardown()
      mql.removeEventListener('change', onBreakpointChange)
      if (grid.parentNode === wrapper) {
        wrapper.parentNode.insertBefore(grid, wrapper)
        wrapper.remove()
      }
    }
  }, [gridRef])
}
