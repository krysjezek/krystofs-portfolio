'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export function useHoverShimmer(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return

    const overlay = document.createElement('span')
    Object.assign(overlay.style, {
      position: 'absolute',
      inset: '0',
      transform: 'translateX(-101%)',
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.06) 60%, transparent 100%)',
      pointerEvents: 'none',
      zIndex: '1',
    })
    el.appendChild(overlay)

    let shimmerTween = null

    const onEnter = () => {
      if (shimmerTween) shimmerTween.kill()
      gsap.set(overlay, { x: '-101%', opacity: 1 })
      shimmerTween = gsap.to(overlay, {
        x: '101%',
        duration: 0.8,
        ease: 'power1.inOut',
      })
      gsap.to(el, { scale: 1.01, duration: 0.4, ease: 'circ.out' })
    }

    const onLeave = () => {
      if (shimmerTween) shimmerTween.kill()
      gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.out' })
      gsap.to(el, { scale: 1, duration: 0.4, ease: 'circ.out' })
    }

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      if (shimmerTween) shimmerTween.kill()
      gsap.set(el, { scale: 1 })
      overlay.remove()
    }
  }, [ref])
}
