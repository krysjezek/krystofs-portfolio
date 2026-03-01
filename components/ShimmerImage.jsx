'use client'

import { useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import gsap from 'gsap'

export default function ShimmerImage({ src, alt, className, style, imgStyle, fill, width, height, sizes, priority, quality, unoptimized, ...props }) {
  const wrapperRef = useRef(null)
  const imgRef = useRef(null)
  const sweepRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const sweep = sweepRef.current
    if (!wrapper || !sweep) return

    let started = false

    const startShimmer = () => {
      if (started) return
      started = true
      tweenRef.current = gsap.to(sweep, {
        x: '100%',
        duration: 1.2,
        ease: 'power1.inOut',
        repeat: -1,
      })
      // If image was already cached, trigger load immediately
      const img = imgRef.current
      if (img && img.complete && img.naturalWidth > 0) {
        onLoad()
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { startShimmer(); observer.disconnect() } },
      { rootMargin: '100px' }
    )
    observer.observe(wrapper)

    return () => {
      observer.disconnect()
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

  const isFill = fill || (!width && !height)

  const wrapperStyle = fill
    ? { position: 'absolute', inset: 0, overflow: 'hidden', backgroundColor: '#1a1a2e', ...style }
    : { display: 'inline-block', position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a2e', ...style }

  const imageStyle = fill
    ? { opacity: 0, objectFit: 'cover', ...imgStyle }
    : width && height
      ? { opacity: 0, width: '100%', height: 'auto', ...imgStyle }
      : { opacity: 0, objectFit: 'cover', ...imgStyle }

  return (
    <span
      ref={wrapperRef}
      style={wrapperStyle}
      className={className}
    >
      <Image
        ref={imgRef}
        src={src}
        alt={alt || ''}
        onLoad={onLoad}
        style={imageStyle}
        {...(isFill ? { fill: true } : { width, height })}
        {...(sizes ? { sizes } : {})}
        {...(priority ? { priority } : {})}
        {...(quality ? { quality } : {})}
        {...(unoptimized ? { unoptimized } : {})}
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
