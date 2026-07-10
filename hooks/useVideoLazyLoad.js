'use client'

import { useRef, useState, useEffect } from 'react'

export function useVideoLazyLoad(rootMargin = '0px') {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = navigator.connection?.saveData
    if (reducedMotion || saveData) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.25 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { containerRef, videoRef, inView }
}
