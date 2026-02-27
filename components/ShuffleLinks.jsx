'use client'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function ShuffleLinks() {
  useEffect(() => {
    const active = new Map() // el -> original text

    function onMouseOver(e) {
      const el = e.target.closest('.link')
      if (!el) return

      // Set circle origin to cursor position on initial entry
      if (!e.relatedTarget || !el.contains(e.relatedTarget)) {
        const rect = el.getBoundingClientRect()
        el.style.setProperty('--link-cx', ((e.clientX - rect.left) / rect.width * 100) + '%')
        el.style.setProperty('--link-cy', ((e.clientY - rect.top) / rect.height * 100) + '%')
      }

      if (!active.has(el) && el.children.length > 0) return
      if (active.has(el)) return

      const original = el.textContent
      active.set(el, original)

      el.innerHTML = original
        .split('')
        .map(ch =>
          `<span style="display:inline-block;will-change:transform">${ch === ' ' ? '&nbsp;' : ch}</span>`
        )
        .join('')

      const chars = el.querySelectorAll('span')
      gsap.fromTo(
        chars,
        { y: 8, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.35, stagger: 0.028,
          ease: 'power3.out', overwrite: true,
          onComplete: () => {
            el.textContent = original
            active.delete(el)
          }
        }
      )
    }

    function onMouseOut(e) {
      const el = e.target.closest('.link')
      if (!el || !active.has(el)) return
      if (el.contains(e.relatedTarget)) return
      const original = active.get(el)
      gsap.killTweensOf(el.querySelectorAll('span'))
      el.textContent = original
      active.delete(el)
    }

    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)

    return () => {
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      active.forEach((original, el) => {
        gsap.killTweensOf(el.querySelectorAll('span'))
        el.textContent = original
      })
    }
  }, [])

  return null
}
