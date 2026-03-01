'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function useNavbarScroll(navbarRef) {
  const lastScrollY = useRef(0)

  useEffect(() => {
    const el = navbarRef.current
    if (!el) return

    const onScroll = () => {
      const currentY = window.scrollY

      if (currentY > lastScrollY.current && currentY > 50) {
        gsap.to(el, { y: '-100%', duration: 1.2, ease: 'power2.out' })
      } else {
        gsap.to(el, { y: 0, duration: 1.2, ease: 'power2.out' })
      }

      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navbarRef])
}
