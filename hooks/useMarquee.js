'use client'

import { useEffect } from 'react'

export function useMarquee() {
  useEffect(() => {
    const speed = 2
    const innerContainer = document.querySelector('.inner-container')
    const logos = document.querySelectorAll('.main-hero-logos')
    let animationFrame

    if (!innerContainer || logos.length === 0) return

    let position = 0
    let logosWidth = 0
    let gapSize = 0

    function recalculate() {
      const totalLogosWidth = Array.from(logos).reduce((total, logo) => total + logo.offsetWidth, 0)
      const containerWidth = innerContainer.offsetWidth
      gapSize = (containerWidth - totalLogosWidth) / (logos.length - 1)
      logosWidth = logos[0].offsetWidth + gapSize
    }

    recalculate()

    function animate() {
      position -= speed
      if (position < -logosWidth) {
        position += logosWidth
      }
      innerContainer.style.transform = `translateX(${position}px)`
      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      cancelAnimationFrame(animationFrame)
      recalculate()
      animate()
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        animate()
      } else {
        cancelAnimationFrame(animationFrame)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])
}
