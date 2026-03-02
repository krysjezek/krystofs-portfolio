'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const processed = new WeakSet()

    function processElements() {
      // --- Background vertical lines (filter unprocessed, stagger together) ---
      const vLines = [...document.querySelectorAll('.background .vertical-line')].filter(el => !processed.has(el))
      if (vLines.length) {
        vLines.forEach(el => processed.add(el))
        if (!prefersReduced) {
          gsap.to(vLines, { scaleY: 1, duration: 1.8, ease: 'power1.out', stagger: { each: 0.15, from: 'start' }, delay: 0.2 })
        }
      }

      // --- Horizontal liners (same pattern) ---
      const liners = [...document.querySelectorAll('.liner')].filter(el => !processed.has(el))
      if (liners.length) {
        liners.forEach(el => processed.add(el))
        if (!prefersReduced) {
          gsap.to(liners, { scaleX: 1, duration: 1.8, ease: 'power1.out', stagger: 0.15, delay: 0.2 })
        }
      }

      // --- Navbar ---
      document.querySelectorAll('.navbar').forEach(navbar => {
        if (processed.has(navbar)) return
        processed.add(navbar)
        if (!prefersReduced) {
          gsap.to(navbar, { y: 0, duration: 0.5, ease: 'circ.out', delay: 0.7 })
        }
      })

      // --- Hero reveals (page-load, no scroll) ---
      document.querySelectorAll('[data-reveal="hero"]').forEach(el => {
        if (processed.has(el)) return
        if (el.parentElement?.closest('[data-reveal-group="hero"]')) return
        processed.add(el)

        if (prefersReduced) return

        gsap.to(el, { opacity: 1, duration: 0.4, ease: 'none', delay: 0.05 })
      })

      // Hero groups — children stagger row by row
      document.querySelectorAll('[data-reveal-group="hero"]').forEach(group => {
        if (processed.has(group)) return
        processed.add(group)

        const children = group.querySelectorAll('[data-reveal]')
        if (!children.length) return
        children.forEach(c => processed.add(c))

        if (prefersReduced) return

        gsap.to(children, {
          opacity: 1, duration: 0.4, ease: 'none', delay: 0.05,
          stagger: { each: 0.1, grid: 'auto', from: 'start', axis: 'y' },
        })
      })

      // --- Scroll-triggered groups — stagger row by row ---
      document.querySelectorAll('[data-reveal-group]:not([data-reveal-group="hero"])').forEach(group => {
        if (processed.has(group)) return
        processed.add(group)

        const children = group.querySelectorAll('[data-reveal]')
        if (!children.length) return
        children.forEach(c => processed.add(c))

        if (prefersReduced) return

        ScrollTrigger.create({
          trigger: group,
          start: 'top 70%',
          once: true,
          onEnter() {
            gsap.to(children, {
              opacity: 1, duration: 0.45, ease: 'none',
              stagger: { each: 0.1, grid: 'auto', from: 'start', axis: 'y' },
            })
          },
        })
      })

      // --- Standalone scroll elements ---
      document.querySelectorAll('[data-reveal]:not([data-reveal="hero"])').forEach(el => {
        if (processed.has(el)) return
        if (el.parentElement?.closest('[data-reveal-group]')) return
        processed.add(el)

        if (prefersReduced) return

        ScrollTrigger.create({
          trigger: el,
          start: 'top 70%',
          once: true,
          onEnter() {
            gsap.to(el, { opacity: 1, duration: 0.45, ease: 'none' })
          },
        })
      })
    }

    processElements()

    const observer = new MutationObserver(() => processElements())

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
}
