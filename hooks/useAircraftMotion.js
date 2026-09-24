"use client";

import { useEffect, useRef } from "react";
import { displayedPosition, smoothAircraftPose } from "@/lib/aircraft.mjs";

export function useAircraftMotion(ref, aircraft, active, reduced, frozen, preview) {
  const poses = useRef(new Map());
  useEffect(() => {
    if (!active || !aircraft) return;
    const startedAt = Date.now();
    const entries = aircraft.flatMap(a => {
      const marker = ref.current?.querySelector(`[data-aircraft-id="${CSS.escape(a.id)}"]`);
      if (!marker) return [];
      const target = displayedPosition(a, startedAt, reduced);
      const previous = poses.current.get(a.id);
      const blend = previous && !reduced && !target.stale && a.speed !== null && a.track !== null;
      const correction = blend ? {
        startedAt, offset: previous.point.map((value, i) => value - target.point[i]),
        headingOffset: ((previous.heading - a.track + 540) % 360 + 360) % 360 - 180,
      } : null;
      return [{ aircraft: a, marker, icon: marker.querySelector(".airspace-plane"), correction }];
    });
    const nextPoses = new Map();
    let frame;
    const draw = () => {
      if (document.hidden) return;
      const now = frozen ? startedAt : Date.now();
      for (const { aircraft: a, marker, icon, correction } of entries) {
        const pose = frozen && !reduced && poses.current.get(a.id) || smoothAircraftPose(a, now, correction, reduced);
        marker.style.transform = `translate(${pose.point[0]}px, ${pose.point[1] + 10}px) translate(-50%, -50%)`;
        icon.style.transform = `rotate(${pose.heading}deg)`;
        nextPoses.set(a.id, pose);
      }
      poses.current = nextPoses;
      if (!reduced && !frozen) frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, [ref, aircraft, active, reduced, frozen, preview]);
}
