'use client'

import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'

export default function ShimmerImage({ src, alt, className, style, ...props }) {
  const wrapperRef = useRef(null)
  const imgRef = useRef(null)
  const sweepRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const sweep = sweepRef.current
    if (!sweep) return
    tweenRef.current = gsap.to(sweep, {
      x: '100%',
      duration: 1.2,
      ease: 'power1.inOut',
      repeat: -1,
    })
    return () => {
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [])

  const onLoad = useCallback(() => {
    const img = imgRef.current
    const sweep = sweepRef.current
    if (!img) return
    if (tweenRef.current) tweenRef.current.kill()
    const tl = gsap.timeline()
    if (sweep) {
      tl.to(sweep, { opacity: 0, duration: 0.3, ease: 'power2.out' })
    }
    tl.to(img, { opacity: 1, duration: 0.5, ease: 'power2.out' }, sweep ? '-=0.1' : 0)
  }, [])

  return (
    <span
      ref={wrapperRef}
      style={{
        display: 'inline-block',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a2e',
        ...style,
      }}
      className={className}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt || ''}
        onLoad={onLoad}
        style={{ opacity: 0, display: 'block', width: '100%', height: 'auto' }}
        {...props}
      />
      <span
        ref={sweepRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transform: 'translateX(-100%)',
          background: 'linear-gradient(90deg, transparent, #2a2a4a, transparent)',
          pointerEvents: 'none',
        }}
      />
    </span>
  )
}
