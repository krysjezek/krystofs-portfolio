'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const processed = new WeakSet()

    // --- Background vertical lines slide in from top, stagger from right ---
    const vLines = document.querySelectorAll('.background .vertical-line')
    if (vLines.length && !prefersReduced) {
      gsap.set(vLines, { scaleY: 0, transformOrigin: 'top center' })
      gsap.to(vLines, { scaleY: 1, duration: 1.8, ease: 'power1.out', stagger: { each: 0.15, from: 'start' }, delay: 0.2 })
    }

    // --- Horizontal liners slide in from left ---
    const liners = document.querySelectorAll('.liner')
    if (liners.length && !prefersReduced) {
      gsap.set(liners, { scaleX: 0, transformOrigin: 'left center' })
      gsap.to(liners, { scaleX: 1, duration: 1.8, ease: 'power1.out', stagger: 0.15, delay: 0.2 })
    }

    // --- Navbar slides in from top after lines finish ---
    const navbar = document.querySelector('.navbar')
    if (navbar && !prefersReduced) {
      gsap.set(navbar, { y: '-100%' })
      gsap.to(navbar, { y: 0, duration: 0.5, ease: 'circ.out', delay: 0.7 })
    }

    const BLUR = 2 // px — starting blur amount

    function applyClipMask(el) {
      const s = getComputedStyle(el)
      const tl = s.borderTopLeftRadius
      const tr = s.borderTopRightRadius
      const br = s.borderBottomRightRadius
      const bl = s.borderBottomLeftRadius
      if ([tl, tr, br, bl].every(v => parseFloat(v) === 0)) return
      gsap.set(el, { clipPath: `inset(0px round ${tl} ${tr} ${br} ${bl})` })
    }

    function removeClipMask(el) {
      gsap.set(el, { clipPath: 'none' })
    }

    function processElements() {
      // --- Hero reveals (page-load, no scroll) ---
      document.querySelectorAll('[data-reveal="hero"]').forEach(el => {
        if (processed.has(el)) return
        if (el.parentElement?.closest('[data-reveal-group="hero"]')) return
        processed.add(el)

        if (prefersReduced) return

        applyClipMask(el)
        gsap.set(el, { filter: `blur(${BLUR}px)` })
        gsap.to(el, { filter: 'blur(0px)', duration: 0.4, ease: 'none', delay: 0.05, onComplete: () => removeClipMask(el) })
      })

      // Hero groups — children stagger row by row
      document.querySelectorAll('[data-reveal-group="hero"]').forEach(group => {
        if (processed.has(group)) return
        processed.add(group)

        const children = group.querySelectorAll('[data-reveal]')
        if (!children.length) return
        children.forEach(c => processed.add(c))

        if (prefersReduced) return

        children.forEach(applyClipMask)
        gsap.set(children, { filter: `blur(${BLUR}px)` })
        gsap.to(children, {
          filter: 'blur(0px)', duration: 0.4, ease: 'none', delay: 0.05,
          stagger: { each: 0.1, grid: 'auto', from: 'start', axis: 'y' },
          onComplete: () => children.forEach(removeClipMask),
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

        children.forEach(applyClipMask)
        gsap.set(children, { filter: `blur(${BLUR}px)` })

        ScrollTrigger.create({
          trigger: group,
          start: 'top 70%',
          once: true,
          onEnter() {
            gsap.to(children, {
              filter: 'blur(0px)', duration: 0.45, ease: 'none',
              stagger: { each: 0.1, grid: 'auto', from: 'start', axis: 'y' },
              onComplete: () => children.forEach(removeClipMask),
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

        applyClipMask(el)
        gsap.set(el, { filter: `blur(${BLUR}px)` })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 70%',
          once: true,
          onEnter() {
            gsap.to(el, { filter: 'blur(0px)', duration: 0.45, ease: 'none', onComplete: () => removeClipMask(el) })
          },
        })
      })
    }

    processElements()

    const observer = new MutationObserver(mutations => {
      let hasNew = false
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType !== 1) continue
          if (node.hasAttribute?.('data-reveal') || node.hasAttribute?.('data-reveal-group') || node.querySelector?.('[data-reveal]')) {
            hasNew = true
            break
          }
        }
        if (hasNew) break
      }
      if (hasNew) processElements()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])
}
