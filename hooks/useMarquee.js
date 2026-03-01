'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export function useMarquee(trackRef, { speed = 50 } = {}) {
  useEffect(() => {
    const track = trackRef?.current
    if (!track) return

    let tween

    function createTween() {
      // Kill previous tween if resizing
      if (tween) tween.kill()

      // Half the track width = one full set of logos
      const halfWidth = track.scrollWidth / 2

      // Reset position
      gsap.set(track, { x: 0 })

      // Duration based on speed (px/s) so it's consistent regardless of width
      const duration = halfWidth / speed

      tween = gsap.to(track, {
        x: -halfWidth,
        duration,
        ease: 'none',
        repeat: -1,
      })
    }

    createTween()

    const handleVisibility = () => {
      if (!tween) return
      if (document.visibilityState === 'hidden') {
        tween.pause()
      } else {
        tween.resume()
      }
    }

    const handleResize = () => createTween()

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('resize', handleResize)

    return () => {
      if (tween) tween.kill()
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('resize', handleResize)
    }
  }, [trackRef, speed])
}
