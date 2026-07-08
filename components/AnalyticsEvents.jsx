'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

const CONTACT_HOSTS = new Map([
  ['calendly.com', 'calendly'],
  ['wa.me', 'whatsapp'],
])

function cleanText(value) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, 80) || 'unlabeled'
}

function getLinkEvent(anchor) {
  const href = anchor.getAttribute('href')
  if (!href) return null

  let url
  try {
    url = new URL(href, window.location.href)
  } catch {
    return null
  }

  const label = cleanText(anchor.textContent || anchor.getAttribute('aria-label'))
  const path = url.pathname

  if (CONTACT_HOSTS.has(url.hostname)) {
    return {
      name: 'contact_click',
      payload: {
        method: CONTACT_HOSTS.get(url.hostname),
        label,
        destination: url.hostname,
      },
    }
  }

  if (url.origin === window.location.origin) {
    if (path.startsWith('/work/')) {
      return {
        name: 'work_open',
        payload: { path, label },
      }
    }

    if (path.startsWith('/services/')) {
      return {
        name: 'service_open',
        payload: { path, label },
      }
    }

    if (path.startsWith('/other/cv')) {
      return {
        name: 'cv_open',
        payload: { path, label },
      }
    }

    if (url.hash) {
      return {
        name: 'section_nav',
        payload: { section: url.hash.replace('#', ''), label },
      }
    }

    return null
  }

  return {
    name: 'outbound_click',
    payload: {
      host: url.hostname.replace(/^www\./, ''),
      label,
      destination: `${url.origin}${url.pathname}`,
    },
  }
}

function getButtonEvent(button) {
  if (button.classList.contains('services-link')) {
    return {
      name: 'service_tab_click',
      payload: { label: cleanText(button.textContent) },
    }
  }

  return null
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function handleClick(event) {
      const target = event.target
      if (!(target instanceof Element)) return

      const anchor = target.closest('a')
      const button = target.closest('button')
      const eventData = anchor ? getLinkEvent(anchor) : button ? getButtonEvent(button) : null

      if (eventData) {
        track(eventData.name, eventData.payload)
      }
    }

    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  }, [])

  return null
}
