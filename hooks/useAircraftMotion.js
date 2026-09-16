'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { displayedPosition, smoothAircraftPose } from '@/lib/aircraft.mjs'

export function useAircraftMotion(ref, aircraft, active, reduced) {
  const poses = useRef(new Map())

  useEffect(() => {
    if (!active || !aircraft) return
    const startedAt = Date.now()
    const entries = aircraft.flatMap(a => {
      const marker = ref.current.querySelector(`[data-aircraft-id="${CSS.escape(a.id)}"]`)
      if (!marker) return []
      const target = displayedPosition(a, startedAt, reduced)
      const previous = poses.current.get(a.id)
      // Do not smooth reports without the motion information needed to label
      // them as estimates, or replay motion after an observation has gone stale.
      const blend = previous && !reduced && !target.stale && a.speed !== null && a.track !== null
      const correction = blend ? {
        startedAt,
        offset: previous.point.map((value, i) => value - target.point[i]),
        headingOffset: ((previous.heading - a.track + 540) % 360 + 360) % 360 - 180,
      } : null
      return [{ aircraft: a, marker, icon: marker.querySelector('svg'), correction }]
    })
    poses.current = new Map(entries.map(({ aircraft: a }) => [a.id, poses.current.get(a.id)]))
    const draw = () => {
      if (document.hidden) return
      const now = Date.now()
      for (const { aircraft: a, marker, icon, correction } of entries) {
        const pose = smoothAircraftPose(a, now, correction, reduced)
        // Transforms are owned by this ticker, never rewritten by React's
        // one-second timestamp updates. No per-frame layout reads or setState.
        marker.style.transform = `translate3d(${pose.point[0]}px, ${pose.point[1]}px, 0) translate(-50%, -50%)`
        icon.style.transform = `rotate(${pose.heading}deg)`
        poses.current.set(a.id, pose)
      }
    }
    draw()
    if (!reduced) gsap.ticker.add(draw)
    return () => gsap.ticker.remove(draw)
  }, [ref, aircraft, active, reduced])
}
