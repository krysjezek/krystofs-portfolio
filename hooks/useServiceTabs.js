'use client'

import { useEffect } from 'react'
import gsap from 'gsap'

export function useServiceTabs() {
  useEffect(() => {
    const buttons = document.querySelectorAll('#b1, #b2, #b3, #b4')
    const panels = document.querySelectorAll('#serv1, #serv2, #serv3, #serv4')
    if (!buttons.length || !panels.length) return

    // Show default panel
    const defaultPanel = document.getElementById('serv1')
    gsap.set(defaultPanel, { display: 'flex', opacity: 1 })
    document.getElementById('b1').classList.add('selected')

    const handleClick = function () {
      buttons.forEach(btn => btn.classList.remove('selected'))
      this.classList.add('selected')

      const divId = 'serv' + this.id.substring(1)
      const activePanel = document.getElementById(divId)

      // Fade out all panels
      gsap.to(panels, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          panels.forEach(p => { p.style.display = 'none' })
          // Fade in the active panel
          activePanel.style.display = 'flex'
          gsap.to(activePanel, { opacity: 1, duration: 0.3, ease: 'power2.in' })
        },
      })
    }

    buttons.forEach(button => {
      button.addEventListener('click', handleClick)
    })

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('click', handleClick)
      })
    }
  }, [])
}
