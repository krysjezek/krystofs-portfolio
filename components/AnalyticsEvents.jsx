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

function placement(element) {
  if (element.closest('.site-footer')) return 'footer'
  if (element.closest('.site-header')) return 'header'
  if (element.closest('.recommendations')) return 'recommendations'
  if (element.closest('.recognition-list')) return 'recognition'
  if (element.closest('.case-credits')) return 'credits'
  if (element.closest('.home-introduction')) return 'introduction'
  const panel = element.closest('[role="tabpanel"]')
  return panel ? panel.id.replace('panel-', '') : 'content'
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

  const path = url.pathname
  const location = placement(anchor)
  const host = url.hostname.replace(/^www\./, '')

  if (url.protocol === 'mailto:' || url.protocol === 'tel:') {
    return {
      name: 'contact_click',
      payload: { method: url.protocol === 'mailto:' ? 'email' : 'phone', placement: location },
    }
  }
  if (!['https:', 'http:'].includes(url.protocol)) return null

  if (CONTACT_HOSTS.has(host)) {
    return {
      name: 'contact_click',
      payload: {
        method: CONTACT_HOSTS.get(host),
        placement: location,
      },
    }
  }

  if (url.origin === window.location.origin) {
    if (path.startsWith('/work/')) {
      return {
        name: 'work_open',
        payload: { path, placement: location },
      }
    }

    if (path.startsWith('/services/')) {
      return {
        name: 'service_open',
        payload: { path, placement: location },
      }
    }

    if (path.startsWith('/other/cv')) {
      return {
        name: 'cv_open',
        payload: { path, placement: location },
      }
    }

    if (url.hash) {
      return {
        name: 'section_nav',
        payload: { section: url.hash.slice(1, 81), placement: location },
      }
    }

    return null
  }

  return {
    name: 'outbound_click',
    payload: {
      destination: `${url.origin}${url.pathname}`.slice(0, 255),
      placement: location,
    },
  }
}

function getButtonEvent(button) {
  if (button.matches('.portfolio-navigation [role="tab"]') && button.getAttribute('aria-selected') !== 'true') {
    return {
      name: 'section_nav',
      payload: { section: button.id.replace('tab-', ''), placement: 'navigation' },
    }
  }
  if (button.matches('.prague-airspace-trigger')) return { name: 'airspace_open', payload: { placement: 'header' } }
  if (button.matches('.source-figure')) return { name: 'source_detail_open', payload: { figure: cleanText(button.textContent) } }
  if (button.getAttribute('aria-expanded') === 'true') return null
  if (button.matches('.prague-temperature')) return { name: 'weather_open', payload: { placement: 'header' } }
  if (button.matches('.recognition-trigger')) return { name: 'recognition_open', payload: { placement: 'about' } }
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
      if (target.closest('[inert], [disabled], [aria-disabled="true"]')) return

      const anchor = target.closest('a')
      const button = target.closest('button')
      if (event.type === 'auxclick' ? event.button !== 1 || !anchor : event.button !== 0) return
      const card = target.closest('article.project-card[data-informational]')
      const eventData = anchor ? getLinkEvent(anchor) : button ? getButtonEvent(button) : card ? {
        name: 'coming_soon_click',
        payload: { project: card.dataset.project, section: placement(card) },
      } : null

      if (eventData) {
        track(eventData.name, eventData.payload)
      }
    }

    function handlePrint() {
      if (window.location.pathname.startsWith('/other/cv')) {
        track('cv_print', { path: window.location.pathname })
      }
    }

    document.addEventListener('click', handleClick, { capture: true })
    document.addEventListener('auxclick', handleClick, { capture: true })
    window.addEventListener('beforeprint', handlePrint)

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
      document.removeEventListener('auxclick', handleClick, { capture: true })
      window.removeEventListener('beforeprint', handlePrint)
    }
  }, [])

  return null
}
