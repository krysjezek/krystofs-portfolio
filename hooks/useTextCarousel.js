'use client'

import { useEffect } from 'react'

export function useTextCarousel() {
  useEffect(() => {
    const changerMove = document.querySelector('.changer-move')
    const changers = document.querySelectorAll('.changer')
    if (changers.length <= 1) return
    let currentIndex = 0
    const changerHeight = changers[0].offsetHeight
    const id = setInterval(function () {
      currentIndex++
      if (currentIndex > changers.length - 2) {
        changerMove.style.transition = 'transform 0.5s ease-in-out'
        changerMove.style.transform = 'translateY(' + (-currentIndex * changerHeight) + 'px)'
        setTimeout(() => {
          changerMove.style.transition = 'none'
          changerMove.style.transform = 'translateY(0)'
        }, 500)
        currentIndex = 0
      } else {
        changerMove.style.transition = 'transform 0.5s ease-in-out'
        changerMove.style.transform = 'translateY(' + (-currentIndex * changerHeight) + 'px)'
      }
    }, 2000)
    return () => clearInterval(id)
  }, [])
}
