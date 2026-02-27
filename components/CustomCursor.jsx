'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CURSOR_URL = 'https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com/images/cursor.svg'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const imgRef = useRef(null)
  const pillRef = useRef(null)
  const labelRef = useRef(null)
  useEffect(() => {
    const cursor = cursorRef.current
    const img = imgRef.current
    const pill = pillRef.current
    const label = labelRef.current
    if (!cursor || !img || !pill || !label) return

    const moveCursor = (x, y) => gsap.set(cursor, { x, y })

    let activeEl = null
    let activeLinkEl = null
    let collapseTimer = null
    let lastX = null
    let lastY = null
    let rafId = null

    const expand = (text) => {
      // Split into per-character spans for stagger animation
      label.innerHTML = text
        .split('')
        .map((ch) =>
          `<span style="display:inline-block;will-change:transform">${ch === ' ' ? '&nbsp;' : ch}</span>`
        )
        .join('')

      const chars = label.querySelectorAll('span')
      gsap.killTweensOf(chars)
      gsap.fromTo(
        chars,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.028, ease: 'power3.out', delay: 0.12 }
      )

      gsap.to(pill, { scale: 1, duration: 0.5, ease: 'circ.out', overwrite: true })
    }

    const collapse = () => {
      gsap.to(pill, { scale: 0, duration: 0.25, ease: 'power2.in', overwrite: true })
    }

    // rAF loop — validates hover state every frame so the pill collapses
    // even when the mouse is stationary and no mousemove events fire.
    const tick = () => {
      if (activeEl !== null && lastX !== null) {
        const target = document.elementFromPoint(lastX, lastY)
        const el = target?.closest('[data-cursor]')
        if (!el) {
          clearTimeout(collapseTimer)
          activeEl = null
          collapse()
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onMove = (e) => {
      moveCursor(e.clientX, e.clientY)

      // Skip synthetic events fired by the browser on DOM changes (e.g. rAF marquee)
      // — real movement always changes clientX/Y
      if (e.clientX === lastX && e.clientY === lastY) return
      lastX = e.clientX
      lastY = e.clientY

      const target = document.elementFromPoint(e.clientX, e.clientY)
      const el = target?.closest('[data-cursor]')

      // Link hover (no data-cursor): slightly bigger + 90% opacity
      const linkEl = !el ? target?.closest('a, button, [role="button"]') : null
      if (linkEl !== activeLinkEl) {
        activeLinkEl = linkEl
        if (linkEl) {
          gsap.to(img, { scale: 1.4, duration: 0.35, ease: 'power1.inOut' })
        } else {
          gsap.to(img, { scale: 1, duration: 0.35, ease: 'power1.inOut' })
        }
      }

      if (el === activeEl) return

      if (el) {
        clearTimeout(collapseTimer)
        activeEl = el
        expand(el.dataset.cursor)
      } else {
        clearTimeout(collapseTimer)
        collapseTimer = setTimeout(() => {
          activeEl = null
          collapse()
        }, 30)
      }
    }

    const onMouseDown = () => {
      gsap.to(cursor, { scale: 0.85, duration: 0.2, ease: 'power1.inOut' })
    }

    const onMouseUp = () => {
      gsap.to(cursor, { scale: 1, duration: 0.4, ease: 'power1.inOut' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      clearTimeout(collapseTimer)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      {/* SVG arrow — tip aligns with wrapper origin (mouse position) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={CURSOR_URL}
        alt=""
        style={{ display: 'block', width: 16 }}
      />

      {/* Pill label — appears offset below-right of arrow tip */}
      <div
        ref={pillRef}
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          scale: 0,
          height: 32,
          borderRadius: 99,
          backgroundColor: '#a4f683',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: 13,
            fontFamily: 'IBM Plex Mono, monospace',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#000',
            paddingLeft: 16,
            paddingRight: 16,
            userSelect: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'inline-flex',
          }}
        />
      </div>
    </div>
  )
}
