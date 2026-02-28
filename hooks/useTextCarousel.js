'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export function useTextCarousel() {
  useEffect(() => {
    const changerMove = document.querySelector('.changer-move')
    const changers = document.querySelectorAll('.changer')
    if (!changerMove || changers.length <= 1) return

    const changerHeight = changers[0].offsetHeight
    const totalItems = changers.length

    const tl = gsap.timeline({ repeat: -1, delay: 2 })

    for (let i = 1; i < totalItems; i++) {
      if (i > totalItems - 2) {
        // Last item — animate to it, then snap back to start
        tl.to(changerMove, {
          y: -i * changerHeight,
          duration: 0.5,
          ease: 'power2.inOut',
        }, `+=${1.5}`)
        tl.set(changerMove, { y: 0 }, '+=0.5')
      } else {
        tl.to(changerMove, {
          y: -i * changerHeight,
          duration: 0.5,
          ease: 'power2.inOut',
        }, `+=${1.5}`)
      }
    }

    return () => { tl.kill() }
  }, [])
}
