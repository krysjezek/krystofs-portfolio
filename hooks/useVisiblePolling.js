'use client'

import { useEffect, useRef, useState } from 'react'

const replace = (_, next) => next

export function useVisiblePolling(ref, url, interval, merge = replace) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [active, setActive] = useState(false)
  const [checkedAt, setCheckedAt] = useState(0)
  const due = useRef(0)

  useEffect(() => {
    let visible = false, disposed = false, timer, controller, running = false, failures = 0
    const schedule = () => {
      clearTimeout(timer)
      const enabled = visible && !document.hidden && !disposed
      setActive(enabled)
      if (!enabled) { controller?.abort(); return }
      if (!running) timer = setTimeout(poll, Math.max(0, due.current - Date.now()))
    }
    async function poll() {
      running = true
      controller = new AbortController()
      const timeout = setTimeout(() => controller.abort('timeout'), 10000)
      try {
        const response = await fetch(url, { cache: 'no-store', signal: controller.signal })
        const payload = await response.json()
        if (!response.ok || !payload.ok) {
          due.current = Math.max(due.current, payload.retryAt || 0)
          throw new Error('Unavailable')
        }
        if (!disposed) { setData(old => merge(old, payload)); setError(false); setCheckedAt(Date.now()) }
        failures = 0
        due.current = Date.now() + interval
      } catch {
        if (!disposed && visible && !document.hidden) {
          setError(true)
          setCheckedAt(Date.now())
          failures += 1
          due.current = Math.max(due.current, Date.now() + Math.min(300000, interval * 2 ** failures))
        }
      } finally {
        clearTimeout(timeout)
        running = false
        if (!disposed) schedule()
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule() })
    observer.observe(ref.current)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      disposed = true; observer.disconnect(); clearTimeout(timer); controller?.abort()
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [ref, url, interval, merge])
  return { data, error, active, checkedAt }
}
