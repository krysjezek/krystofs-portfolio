'use client'

import Link from 'next/link'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const SCROLL_DURATION = 1.2

export default function SmoothSectionLink({ href, onClick, ...props }) {
  function handleClick(event) {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const url = new URL(href, window.location.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
      return
    }

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    if (!target) return

    event.preventDefault()
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.scrollIntoView()
      return
    }

    gsap.killTweensOf(window)

    const root = document.documentElement
    const previousScrollBehavior = root.style.scrollBehavior
    const restoreScrollBehavior = () => {
      root.style.scrollBehavior = previousScrollBehavior
    }

    root.style.scrollBehavior = 'auto'

    gsap.to(window, {
      duration: SCROLL_DURATION,
      scrollTo: { y: target, autoKill: true, onAutoKill: restoreScrollBehavior },
      ease: 'power2.inOut',
      onComplete: restoreScrollBehavior,
      onInterrupt: restoreScrollBehavior,
    })
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
