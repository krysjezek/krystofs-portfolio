'use client'

import { useEffect } from 'react'

export function useMarquee() {
  useEffect(() => {
    const speed = 2
    const innerContainer = document.querySelector('.inner-container')
    const logos = document.querySelectorAll('.main-hero-logos')
    let animationFrame

    function calculateGapSize() {
      const totalLogosWidth = Array.from(logos).reduce((total, logo) => total + logo.offsetWidth, 0)
      const containerWidth = innerContainer.offsetWidth
      return (containerWidth - totalLogosWidth) / (logos.length - 1)
    }

    function animate() {
      const gapSize = calculateGapSize()
      const logosWidth = logos[0].offsetWidth + gapSize
      const currentTransform = getComputedStyle(innerContainer).transform
      const matrixValues = currentTransform.match(/matrix\(([^)]+)\)/)
      const translateX = matrixValues ? parseFloat(matrixValues[1].split(', ')[4]) : 0
      let newPosition = translateX - speed
      if (newPosition < -logosWidth) {
        newPosition += logosWidth
      }
      innerContainer.style.transform = `translateX(${newPosition}px)`
      animationFrame = requestAnimationFrame(animate)
    }

    if (!innerContainer || logos.length === 0) return

    animate()

    const handleResize = () => {
      cancelAnimationFrame(animationFrame)
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
