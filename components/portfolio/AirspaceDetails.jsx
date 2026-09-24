"use client";

import { useRef } from "react";
import { useAirspacePolling } from "@/hooks/useAirspacePolling";
import AirspaceSkeleton from "./AirspaceSkeleton";

export default function AirspaceDetails({ aircraft, enabled }) {
  const ref = useRef(null);
  const { data, error } = useAirspacePolling(ref, enabled, `/api/aircraft/${encodeURIComponent(aircraft.id)}`, 300000);
  const route = data?.callsign === aircraft.callsign ? data.route : null;
  const loading = !data && !error;
  const airport = value => value ? `${value.code} · ${value.city}` : loading ? <AirspaceSkeleton width="8em" /> : "Not reported";
  return <div ref={ref} className="airspace-selected" aria-busy={loading}>
    <dl className="airspace-route"><div><dt>FROM</dt><dd>{airport(route?.from)}</dd></div><div><dt>TO</dt><dd>{airport(route?.to)}</dd></div></dl>
    <p className="airspace-label">AIRCRAFT / {data?.model || aircraft.aircraftType || (loading ? <AirspaceSkeleton width="10em" /> : "Not reported")}</p>
    <p className="airspace-label airspace-muted">Route is a callsign match, not a confirmed flight plan.<br />
      <a href="https://github.com/adsblol/vrs-standing-data">ADSB.lol / VRS</a> · <a href="https://www.adsbdb.com/">adsbdb / PlaneBase</a>
    </p>
  </div>;
}
