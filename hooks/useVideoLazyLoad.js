'use client'

import { useRef, useState, useEffect } from 'react'

export function useVideoLazyLoad(rootMargin = '200px') {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { containerRef, videoRef, inView }
}
