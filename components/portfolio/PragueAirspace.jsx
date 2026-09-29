"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useAirspacePolling } from "@/hooks/useAirspacePolling";
import { EXPIRE_MS, mergeAircraft, STALE_MS } from "@/lib/aircraft.mjs";
import AirspaceMap from "./AirspaceMap";
import AirspaceDetails from "./AirspaceDetails";
import AirlineIdentity from "./AirlineIdentity";
import AirspaceSkeleton from "./AirspaceSkeleton";

const utc = time => new Date(time).toISOString().slice(11, 19) + "Z";
const reading = (value, unit) => Number.isFinite(value) ? `${value}${unit}` : "—";
const cloudNames = { FEW: "Few", SCT: "Scattered", BKN: "Broken", OVC: "Overcast", CLR: "Clear", SKC: "Clear", NSC: "Clear", CAVOK: "Clear" };

function Weather({ data, compact, unavailable, loading }) {
  const w = unavailable ? null : data;
  const cloud = w?.clouds?.[0];
  const visibility = parseFloat(w?.visibility);
  const fields = [
    ["TEMPERATURE", reading(w?.temp, "°C")],
    ["WIND FROM", w?.wind == null || !Number.isFinite(w?.speed) ? "—" : `${w.wind}${typeof w.wind === "number" ? "°" : ""} / ${w.speed} kt`],
    ["VISIBILITY", w?.raw?.includes(" 9999 ") ? "10+ km" : Number.isFinite(visibility) ? `${(visibility * 1.60934).toFixed(1)}${String(w.visibility).includes("+") ? "+" : ""} km` : "—"],
    ["CLOUDS", cloud ? `${cloudNames[cloud.cover] || cloud.cover}${Number.isFinite(cloud.base) ? ` / ${cloud.base / 1000}k ft` : ""}` : "—"],
    ["DEW POINT", reading(w?.dew, "°C")],
    ["QNH", Number.isFinite(w?.pressure) ? `${w.pressure.toLocaleString("en-US")} hPa` : "—"],
  ];
  return <dl className={`airspace-weather${compact ? " is-compact" : ""}`} aria-label="Airport weather" aria-busy={loading}>{fields.slice(0, compact ? 3 : 6).map(([label, value], index) => <div key={label}><dt>{label}</dt><dd>{loading ? <AirspaceSkeleton width={["3.5em", "5em", "4em", "5.5em", "3em", "4.5em"][index]} /> : <span className="airspace-value">{value}</span>}</dd></div>)}</dl>;
}

// Explicit demo prop for isolated design previews. The live path never falls
// back to these generated reports, including on provider errors.
function demoSnapshot(epoch) {
  return { observedAt: epoch, aircraft: [
    { id: "demo01", callsign: "DEMO 01", lat: 50.18, lon: 14.28, track: 45, speed: 170 },
    { id: "demo02", callsign: "DEMO 02", lat: 50.24, lon: 14.60, track: 135, speed: 210 },
    { id: "demo03", callsign: "DEMO 03", lat: 50.03, lon: 14.72, track: 210, speed: 190 },
    { id: "demo04", callsign: "DEMO 04", lat: 49.92, lon: 14.45, track: 270, speed: 160 },
    { id: "demo05", callsign: "DEMO 05", lat: 49.99, lon: 14.1, track: null, speed: null },
  ].map((a, index) => {
    if (a.track === null) return { ...a, observedAt: epoch, aircraftType: null };
    const radius = [16, 25, 21, 18][index];
    const phase = epoch / 1000 * (a.speed * 1.852 / 3600) / radius + index;
    return { ...a, lat: 50.0755 + radius * Math.cos(phase) / 111.195,
      lon: 14.4378 + radius * Math.sin(phase) / (111.195 * Math.cos(50.0755 * Math.PI / 180)),
      track: (phase * 180 / Math.PI + 90) % 360, observedAt: epoch, aircraftType: null };
  }) };
}

export default function PragueAirspace({ mode = "live" }) {
  const [view, setView] = useState("closed");
  const [closing, setClosing] = useState(false);
  const [now, setNow] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState({ top: 80, right: 35 });
  const [selected, setSelected] = useState(null);
  const [choices, setChoices] = useState([]);
  const trigger = useRef(null);
  const panel = useRef(null);
  const hoverTimer = useRef(null);
  const exitTimer = useRef(null);
  const suppress = useRef(false);
  const id = useId();
  const open = view !== "closed" && !closing;
  const simulation = mode === "simulation";
  const traffic = useAirspacePolling(trigger, open && !simulation, "/api/aircraft", 30000, mergeAircraft);
  const weather = useAirspacePolling(trigger, open && !simulation, "/api/airport-weather", 300000);
  const epoch = Math.floor(now / 30000) * 30000;
  const demo = useMemo(() => simulation ? demoSnapshot(epoch) : null, [simulation, epoch]);
  const data = simulation ? demo : traffic.data;
  const active = open && visible && (simulation || traffic.active);
  const aircraft = (data?.aircraft || []).filter(a => now - a.observedAt < EXPIRE_MS);
  const chosen = aircraft.find(a => a.id === selected);
  const delayed = !simulation && !!data && (traffic.error || data.delayed || now - data.observedAt >= STALE_MS || aircraft.length > 0 && aircraft.every(a => a.carried || now - a.observedAt >= STALE_MS));
  const fixture = data?.fixture;
  const status = simulation ? "SIMULATION / DEMO DATA" : fixture ? "TEST DATA / NOT LIVE" : !data ? traffic.error ? "UNAVAILABLE" : "CONNECTING" : delayed ? "DELAYED" : aircraft.length ? "LIVE" : "NO REPORTS";
  const tone = simulation || fixture ? "informative" : !data && traffic.error ? "negative" : delayed ? "warning" : data && aircraft.length ? "positive" : "neutral";
  const message = simulation ? null : !data ? traffic.error ? "Traffic unavailable. Retrying automatically." : "Receiving aircraft reports…" : delayed ? aircraft.length ? "Updates delayed. Last known traffic shown." : "Updates delayed. No recent positions available." : !aircraft.length ? "No airborne aircraft reported within 30 km." : null;
  const weatherUnavailable = simulation || !weather.data || now - weather.data.observedAt > 7200000;
  const trafficLoading = !simulation && !data && !traffic.error;
  const weatherLoading = !simulation && !weather.data && !weather.error;

  const close = useCallback((restore = true) => {
    clearTimeout(hoverTimer.current);
    clearTimeout(exitTimer.current);
    suppress.current = true;
    const finish = () => { setView("closed"); setClosing(false); setSelected(null); setChoices([]); };
    if (reduced) finish();
    else {
      setClosing(true);
      exitTimer.current = setTimeout(finish, 150);
    }
    if (restore) requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }, [reduced]);
  const details = () => {
    clearTimeout(hoverTimer.current);
    clearTimeout(exitTimer.current);
    setClosing(false);
    setNow(Date.now());
    setView("details");
  };
  const enter = (immediate = false) => {
    clearTimeout(hoverTimer.current);
    if (suppress.current || view === "details") return;
    hoverTimer.current = setTimeout(() => { clearTimeout(exitTimer.current); setClosing(false); setNow(Date.now()); setView("preview"); }, immediate ? 0 : 150);
  };
  const leave = () => {
    clearTimeout(hoverTimer.current);
    suppress.current = false;
    if (view !== "details") hoverTimer.current = setTimeout(() => {
      close(false);
      suppress.current = false;
    }, 150);
  };

  useEffect(() => {
    let intersecting = false;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); });
    observer.observe(trigger.current);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = matchMedia("(max-width: 599px)");
    const update = () => { setReduced(motion.matches); setMobile(narrow.matches); };
    update();
    motion.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => { motion.removeEventListener("change", update); narrow.removeEventListener("change", update); clearTimeout(hoverTimer.current); clearTimeout(exitTimer.current); };
  }, []);
  useEffect(() => {
    if (!active) return;
    let timer;
    const update = () => {
      clearInterval(timer);
      if (!document.hidden) { setNow(Date.now()); timer = setInterval(() => setNow(Date.now()), 1000); }
    };
    update();
    document.addEventListener("visibilitychange", update);
    return () => { clearInterval(timer); document.removeEventListener("visibilitychange", update); };
  }, [active]);
  useEffect(() => {
    if (!open) return;
    const position = () => {
      const header = trigger.current.closest("header").getBoundingClientRect();
      const inset = parseFloat(getComputedStyle(trigger.current.closest("header")).paddingRight);
      const layer = panel.current.parentElement.getBoundingClientRect();
      setPlacement({ top: header.bottom + 10 - layer.top, right: layer.right - header.right + inset });
    };
    position();
    const pointer = event => {
      if (!panel.current?.contains(event.target) && !trigger.current?.contains(event.target)) close(false);
    };
    const keyboard = event => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      if (event.key === "Tab" && mobile && view === "details") {
        const nodes = [...panel.current.querySelectorAll('button, a[href], [tabindex="0"]')];
        const first = nodes[0], last = nodes.at(-1);
        if (event.shiftKey && (document.activeElement === first || !panel.current.contains(document.activeElement))) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !panel.current.contains(document.activeElement))) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener("pointerdown", pointer);
    document.addEventListener("keydown", keyboard);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, { passive: true });
    return () => { document.removeEventListener("pointerdown", pointer); document.removeEventListener("keydown", keyboard); window.removeEventListener("resize", position); window.removeEventListener("scroll", position); };
  }, [open, view, mobile, close]);
  useEffect(() => {
    if (view !== "details" || closing) return;
    panel.current?.querySelector("button")?.focus({ preventScroll: true });
    if (!mobile) return;
    const siblings = [...document.body.children].filter(node => node instanceof HTMLElement && !node.contains(panel.current) && !node.matches("script, style, nextjs-portal"));
    const previous = siblings.map(node => node.inert);
    siblings.forEach(node => { node.inert = true; });
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { siblings.forEach((node, i) => { node.inert = previous[i]; }); document.body.style.overflow = overflow; };
  }, [view, mobile, closing]);

  const choose = (aircraftId, overlaps) => {
    if (overlaps.length > 1) { setChoices(overlaps); return; }
    setChoices([]);
    setSelected(current => current === aircraftId ? null : aircraftId);
  };
  const focusMarker = aircraftId => requestAnimationFrame(() => {
    const marker = panel.current?.querySelector(`[data-aircraft-id="${CSS.escape(aircraftId || "")}"]`);
    (marker || panel.current?.querySelector("button"))?.focus({ preventScroll: true });
  });
  const clearSelection = () => { setSelected(null); focusMarker(selected); };
  const map = <AirspaceMap data={data} now={now} active={active} reduced={reduced} frozen={delayed} preview={view === "preview"} selected={selected} onSelect={choose} message={message} loading={trafficLoading} />;
  const badge = <span className={`airspace-badge status-${tone}${status === "LIVE" && active ? " is-live" : ""}`}><i className={simulation || fixture ? "is-hollow" : ""} aria-hidden="true" />{status}</span>;
  const age = data ? `UPDATED ${Math.max(0, Math.floor((now - data.observedAt) / 1000))} S AGO` : "WAITING FOR REPORTS";

  return <span className="prague-airspace">
    <button ref={trigger} type="button" className="prague-airspace-trigger" aria-label="Prague airspace" aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? id : undefined}
      onPointerEnter={event => { if (event.pointerType !== "touch") enter(); }} onPointerLeave={leave}
      onFocus={() => { if (!mobile) enter(true); }} onBlur={event => { if (!panel.current?.contains(event.relatedTarget)) leave(); }} onClick={details}>Prague</button>
    {view !== "closed" && createPortal(<div className={`airspace-layer${mobile && view === "details" ? " is-sheet" : ""}${closing ? " is-closing" : ""}`} inert={closing}>
      <section ref={panel} id={id} role="dialog" aria-label={view === "preview" ? "Prague air traffic preview" : "Prague airspace details"} aria-modal={mobile && view === "details" ? true : undefined}
        className={`airspace-panel airspace-${view}${closing ? " is-closing" : ""}`} style={mobile && view === "details" ? undefined : placement}
        onPointerEnter={() => clearTimeout(hoverTimer.current)} onPointerLeave={leave}
        onFocusCapture={() => clearTimeout(hoverTimer.current)} onBlur={event => { if (view === "preview" && !event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== trigger.current) leave(); }}
        onClick={view === "preview" ? details : undefined}>
        {view === "preview" ? <>
          <div className="airspace-status">{badge}<span className="airspace-label airspace-muted">{trafficLoading ? <AirspaceSkeleton width="9em" /> : age}</span></div>
          <div className="airspace-preview-heading"><h2>Air Traffic over Prague</h2><p className="airspace-label airspace-muted">{data ? `${aircraft.length} ${simulation ? "simulated aircraft" : "aircraft nearby"} · within 30 km` : "Within 30 km of Prague"}</p></div>
          {map}<Weather data={weather.data} compact unavailable={weatherUnavailable} loading={weatherLoading} />
          {weatherUnavailable && weather.error && <p className="airspace-label airspace-muted">Weather unavailable</p>}
          <hr /><button type="button" className="button" onClick={details}>Click for more details</button>
        </> : <>
          <div className="airspace-title"><div><h2>Air Traffic over Prague</h2><p className="airspace-label airspace-muted">PRG / LKPR · 30 KM RADIUS</p></div><button type="button" className="button" onClick={() => close()}>Close</button></div>
          <div className="airspace-status">{badge}</div><hr />
          <Weather data={weather.data} unavailable={weatherUnavailable} loading={weatherLoading} />
          {(weather.error || (weatherUnavailable && !weatherLoading)) && <p className="airspace-label airspace-muted">{simulation ? "Weather unavailable in simulation" : "Weather unavailable"}</p>}
          <hr /><div className="airspace-status airspace-label"><span>AIRSPACE / {trafficLoading ? <AirspaceSkeleton width="2em" /> : data ? String(aircraft.length).padStart(2, "0") : "—"}</span><span className="airspace-muted">{trafficLoading ? <AirspaceSkeleton width="6em" /> : data ? `${delayed ? "DELAYED / " : ""}${utc(data.observedAt)}` : "—"}</span></div>
          {map}<p className="airspace-label airspace-muted">{reduced ? "Received positions only · Reduced motion" : "Dots = reported positions · Movement is estimated"}</p>
          {!!choices.length && <div className="airspace-chooser" aria-label="Overlapping aircraft"><p className="airspace-label">Choose an aircraft</p>{choices.filter(a => aircraft.some(current => current.id === a.id)).map(a => <button key={a.id} type="button" className="button" onClick={() => { setSelected(current => current === a.id ? null : a.id); setChoices([]); focusMarker(a.id); }}>{a.callsign || a.id}</button>)}</div>}
          <hr /><div className="airspace-selection" aria-live="polite">
            {chosen ? <><div className="airspace-selected-title"><div className="airspace-flight-identity"><p>{chosen.callsign || "Callsign not reported"}</p>{!simulation && <AirlineIdentity callsign={chosen.callsign} />}</div><button className="airspace-clear" type="button" onClick={clearSelection}>Clear</button></div>{simulation ? <p className="airspace-label airspace-muted">Simulated aircraft · Route and model not reported.</p> : <AirspaceDetails key={`${chosen.id}:${chosen.callsign}`} aircraft={chosen} enabled={active} />}</> : selected ? <p>Aircraft left coverage or its report expired. <button type="button" className="airspace-clear" onClick={clearSelection}>Clear</button></p> : <><p>Select an aircraft to explore.</p><p className="airspace-label airspace-muted">Reported positions, with bounded estimates between updates. Airborne aircraft only.</p></>}
          </div><hr />
          <footer className="airspace-label airspace-muted">
            <p>Traffic: {simulation ? "Simulation · generated demo data" : <><a href="https://www.adsb.lol/">ADSB.lol</a> · <a href="https://opendatacommons.org/licenses/odbl/1-0/">ODbL 1.0</a></>}</p>
            <p>Map: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://www.naturalearthdata.com/about/terms-of-use/">Natural Earth</a> · Runways: <a href="https://ourairports.com/data/">OurAirports</a></p>
            <p>Weather: <a href="https://aviationweather.gov/data/metar/">NOAA / AWC</a>{weatherLoading ? " · connecting" : !simulation && weather.data ? ` · ${weatherUnavailable || weather.error ? "last observation " : "observed "}${utc(weather.data.observedAt)}` : " · unavailable"}</p>
          </footer>
        </>}
      </section>
    </div>, document.body)}
  </span>;
}
