'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

const CONTACT_HOSTS = new Map([
  ['calendly.com', 'calendly'],
  ['wa.me', 'whatsapp'],
])

const AI_REFERRERS = new Map([
  ['chatgpt.com', 'chatgpt'],
  ['perplexity.ai', 'perplexity'],
  ['claude.ai', 'claude'],
  ['gemini.google.com', 'gemini'],
  ['copilot.microsoft.com', 'copilot'],
])

function cleanText(value) {
  return value?.replace(/\s+/g, ' ').trim().slice(0, 80) || 'unlabeled'
}

function getAiReferralSource() {
  const campaignSource = new URLSearchParams(window.location.search).get('utm_source')?.toLowerCase()
  if (campaignSource) {
    for (const [host, source] of AI_REFERRERS) {
      if (campaignSource === host || campaignSource === source) return source
    }
  }

  if (!document.referrer) return null

  try {
    const referrerHost = new URL(document.referrer).hostname.replace(/^www\./, '')
    return AI_REFERRERS.get(referrerHost) || null
  } catch {
    return null
  }
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
    const aiReferralSource = getAiReferralSource()
    if (aiReferralSource) {
      const eventKey = `ai_referral:${aiReferralSource}:${window.location.pathname}`
      let shouldTrack = true

      try {
        shouldTrack = !sessionStorage.getItem(eventKey)
        sessionStorage.setItem(eventKey, '1')
      } catch {
        // Analytics should never block navigation when storage is unavailable.
      }

      if (shouldTrack) {
        track('ai_referral', {
          source: aiReferralSource,
          landing_path: window.location.pathname,
        })
      }
    }

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
