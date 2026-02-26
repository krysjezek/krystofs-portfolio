'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const pillRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const pill = pillRef.current
    const label = labelRef.current
    if (!cursor || !pill || !label) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const expand = (text) => {
      label.textContent = text
      // Measure required width after text is set
      const labelWidth = label.scrollWidth
      const targetWidth = labelWidth + 28
      gsap.to(pill, { width: targetWidth, height: 28, duration: 0.35, ease: 'power3.out' })
      gsap.to(label, { opacity: 1, duration: 0.2, delay: 0.15 })
    }

    const collapse = () => {
      gsap.to(pill, { width: 16, height: 16, duration: 0.35, ease: 'power3.out' })
      gsap.to(label, { opacity: 0, duration: 0.1 })
    }

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (el) expand(el.dataset.cursor)
    }

    const onOut = (e) => {
      const el = e.target.closest('[data-cursor]')
      if (el) collapse()
    }

    const onMouseDown = () => {
      gsap.to(pill, { scale: 0.7, duration: 0.1, ease: 'power2.out' })
    }

    const onMouseUp = () => {
      gsap.to(pill, { scale: 1, duration: 0.2, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
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
      <div
        ref={pillRef}
        style={{
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#a4f683',
          borderRadius: 99,
          width: 16,
          height: 16,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          willChange: 'width, height',
        }}
      >
        <span
          ref={labelRef}
          style={{
            opacity: 0,
            whiteSpace: 'nowrap',
            fontSize: 11,
            fontFamily: 'IBM Plex Mono, monospace',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#000',
            paddingLeft: 14,
            paddingRight: 14,
            userSelect: 'none',
          }}
        />
      </div>
    </div>
  )
}
