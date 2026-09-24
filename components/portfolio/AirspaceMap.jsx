"use client";

import Image from "next/image";
import { useRef } from "react";
import { useAircraftMotion } from "@/hooks/useAircraftMotion";
import { displayedPosition, EXPIRE_MS, project } from "@/lib/aircraft.mjs";
import { aircraftArtwork } from "@/lib/aircraft-artwork.mjs";
import { mediaUrl } from "@/lib/media";

export default function AirspaceMap({ data, now, active, reduced, frozen, preview, selected, onSelect, message, loading }) {
  const ref = useRef(null);
  useAircraftMotion(ref, data?.aircraft, active, reduced, frozen, preview);
  const aircraft = (data?.aircraft || []).filter(a => now - a.observedAt < EXPIRE_MS);
  return <div className={`airspace-map${preview ? " is-preview" : ""}`} ref={ref} aria-label="Airborne aircraft within 30 kilometres of Prague" aria-busy={loading}>
    <div className="airspace-map-space">
      <Image className="airspace-geography" src={mediaUrl('/images/airspace/prague-map-v1.webp')} width={1536} height={711} alt="" unoptimized />
      <Image className="airspace-runway runway-one" src="/airspace/runway-06-24.svg" width={9.58954} height={5.91609} alt="" unoptimized />
      <Image className="airspace-runway runway-two" src="/airspace/runway-12-30.svg" width={7.93643} height={6.65893} alt="" unoptimized />
      <svg className="airspace-trails" width="432" height="180" aria-hidden="true">
        {aircraft.map(a => <polyline key={a.id} points={(data?.trails?.[a.id] || []).map(p => p.point.join(",")).join(" ")} />)}
      </svg>
      <span className="airspace-map-prague">PRAGUE</span><span className="airspace-map-lkpr" title="Runway geometry, not active usage">LKPR</span>
      {aircraft.map(a => {
        const position = displayedPosition(a, now, reduced);
        const observed = project(a.lat, a.lon);
        const artwork = aircraftArtwork(a.aircraftType);
        const known = artwork.icon && a.track !== null;
        const size = known ? artwork.size : 14;
        const marker = <span className={`airspace-plane${known ? '' : ' is-unknown'}`}>
          {known && <><Image src={mediaUrl(artwork.icon)} className="airspace-plane-default" width={size} height={size} alt="" unoptimized /><Image src={mediaUrl(artwork.selectedIcon)} className="airspace-plane-selected" width={size} height={size} alt="" unoptimized /></>}
        </span>;
        const className = `airspace-marker${position.estimated ? " is-estimated" : ""}${position.stale ? " is-stale" : ""}${selected === a.id ? " is-selected" : ""}`;
        const markerStyle = { '--aircraft-size': `${size}px` };
        return <div key={a.id}>
          <span className="airspace-observation" style={{ left: observed[0], top: observed[1] + 10 }} />
          {preview ? <span data-aircraft-id={a.id} data-category={artwork.category} style={markerStyle} className={className} aria-hidden="true">{marker}</span> :
            <button type="button" data-aircraft-id={a.id} data-category={artwork.category} style={markerStyle} className={className} aria-label={`Inspect ${a.callsign || a.id}`} aria-pressed={selected === a.id}
              onClick={event => {
                if (!event.detail) { onSelect(a.id, [a]); return; }
                // Prefer the plane nearest the pointer, even when another plane's
                // padded hit area is on top. Padding alone never opens the chooser.
                const hits = aircraft.flatMap(other => {
                  const node = ref.current.querySelector(`[data-aircraft-id="${CSS.escape(other.id)}"]`);
                  const box = node?.getBoundingClientRect();
                  if (!box || event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) return [];
                  const x = box.left + box.width / 2, y = box.top + box.height / 2;
                  return [{ aircraft: other, node, x, y, distance: Math.hypot(event.clientX - x, event.clientY - y) }];
                }).sort((one, two) => one.distance - two.distance);
                const nearest = hits[0];
                if (!nearest) { onSelect(a.id, [a]); return; }
                // Centers within 14px substantially overlap at every artwork size.
                // A clearly closer icon still wins instead of asking the user.
                const overlaps = hits.filter(hit => Math.hypot(hit.x - nearest.x, hit.y - nearest.y) <= 14 && hit.distance - nearest.distance <= 6);
                if (overlaps.length === 1) nearest.node.focus({ preventScroll: true });
                onSelect(nearest.aircraft.id, overlaps.map(hit => hit.aircraft));
              }}>{marker}</button>}
        </div>;
      })}
    </div>
    <a className="airspace-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" onClick={event => event.stopPropagation()}>© OpenStreetMap</a>
    <div className={`airspace-map-loading airspace-shimmer${loading ? " is-loading" : ""}`} aria-hidden="true" />
    <span className="airspace-map-range">30 KM</span>
    {message && <p className="airspace-map-message" role="status">{message}</p>}
  </div>;
}
