"use client";

import Image from "next/image";
import { useRef } from "react";
import { useAircraftMotion } from "@/hooks/useAircraftMotion";
import { displayedPosition, EXPIRE_MS, project } from "@/lib/aircraft.mjs";

export default function AirspaceMap({ data, now, active, reduced, frozen, preview, selected, onSelect, message }) {
  const ref = useRef(null);
  useAircraftMotion(ref, data?.aircraft, active, reduced, frozen, preview);
  const aircraft = (data?.aircraft || []).filter(a => now - a.observedAt < EXPIRE_MS);
  return <div className={`airspace-map${preview ? " is-preview" : ""}`} ref={ref} aria-label="Airborne aircraft within 30 kilometres of Prague">
    <div className="airspace-map-space">
      <Image className="airspace-geography" src="/airspace/geography.svg" width={432} height={180} alt="" unoptimized />
      <Image className="airspace-runway runway-one" src="/airspace/runway-06-24.svg" width={9.58954} height={5.91609} alt="" unoptimized />
      <Image className="airspace-runway runway-two" src="/airspace/runway-12-30.svg" width={7.93643} height={6.65893} alt="" unoptimized />
      <svg className="airspace-trails" width="432" height="180" aria-hidden="true">
        {aircraft.map(a => <polyline key={a.id} points={(data?.trails?.[a.id] || []).map(p => p.point.join(",")).join(" ")} />)}
      </svg>
      <span className="airspace-map-prague">PRAGUE</span><span className="airspace-map-lkpr" title="Runway geometry, not active usage">LKPR</span>
      {aircraft.map(a => {
        const position = displayedPosition(a, now, reduced);
        const observed = project(a.lat, a.lon);
        const marker = <span className="airspace-plane"><Image src={`/airspace/${a.track === null ? "unknown" : position.estimated ? "estimated" : "observed"}.svg`} width={15} height={15} alt="" unoptimized /></span>;
        const className = `airspace-marker${position.stale ? " is-stale" : ""}${selected === a.id ? " is-selected" : ""}`;
        return <div key={a.id}>
          <span className="airspace-observation" style={{ left: observed[0], top: observed[1] + 10 }} />
          {preview ? <span data-aircraft-id={a.id} className={className} aria-hidden="true">{marker}</span> :
            <button type="button" data-aircraft-id={a.id} className={className} aria-label={`Inspect ${a.callsign || a.id}`} aria-pressed={selected === a.id}
              onClick={event => {
                // All overlapping targets remain reachable at any map zoom, even when a
                // later DOM marker covers the intended aircraft.
                const target = event.currentTarget.getBoundingClientRect();
                const overlaps = aircraft.filter(other => {
                  const box = ref.current.querySelector(`[data-aircraft-id="${CSS.escape(other.id)}"]`)?.getBoundingClientRect();
                  return box && box.left < target.right && box.right > target.left && box.top < target.bottom && box.bottom > target.top;
                });
                onSelect(a.id, event.detail ? overlaps : [a]);
              }}>{marker}</button>}
        </div>;
      })}
    </div>
    <span className="airspace-map-range">30 KM</span>
    {message && <p className="airspace-map-message" role="status">{message}</p>}
  </div>;
}
