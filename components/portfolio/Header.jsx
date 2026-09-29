"use client";

import { useEffect, useState } from "react";
import { HomeLink, RouteLink } from "./Links";
import ContextPreview from "./ContextPreview";
import PragueAirspace from "./PragueAirspace";
import { briefWeather } from "@/lib/weather";

const inPrague = (options) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", ...options });

export default function Header({
  home = false,
  category = "work",
  backLabel = "Back",
}) {
  const [clock, setClock] = useState({ time: "", date: "" });
  const [weather, setWeather] = useState(undefined);
  const temperature = weather?.temperature ?? null;
  // The dateline carries a headline term; the disclosure keeps the full phrase.
  const brief = briefWeather(weather?.symbol);
  const condition = weather?.condition?.replace(/\b\w/g, (letter) => letter.toUpperCase());
  const weatherPreview = {
    informational: true,
    interactive: true,
    title: "Prague Live weather",
    detail: weather === undefined ? "Loading weather."
      : temperature === null ? "Weather is temporarily unavailable."
        : `${temperature}°C • ${condition || "Conditions unavailable"}`,
    meta: "Source: MET Norway · CC BY 4.0",
    icon: "location",
    href: "https://api.met.no/doc/License",
    linkLabel: "Weather source & license",
    accessibleLabel: temperature === null ? "Weather in Prague" : `Prague temperature: ${temperature} degrees Celsius`,
  };
  useEffect(() => {
    if (!home) return;
    const controller = new AbortController();
    async function updateWeather() {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/weather", { signal: controller.signal });
        if (!response.ok) throw new Error("Weather unavailable");
        const data = await response.json();
        setWeather(Number.isFinite(data.temperature) ? data : null);
      } catch {
        if (!controller.signal.aborted) setWeather(null);
      }
    }
    updateWeather();
    const interval = setInterval(updateWeather, 10 * 60 * 1000);
    document.addEventListener("visibilitychange", updateWeather);
    return () => {
      controller.abort();
      clearInterval(interval);
      document.removeEventListener("visibilitychange", updateWeather);
    };
  }, [home]);
  useEffect(() => {
    if (!home) return;
    const update = () => {
      const now = new Date();
      setClock({
        time: inPrague({ hour: "2-digit", minute: "2-digit" }).format(now),
        date: inPrague({ weekday: "short", day: "numeric", month: "short" }).format(now),
      });
    };
    update();
    const interval = setInterval(update, 15000);
    return () => clearInterval(interval);
  }, [home]);
  return (
    <header className={`site-header${home ? " home-header" : ""}`}>
      <RouteLink href="/" className="site-name">
        Krystof Jezek
      </RouteLink>
      {home ? (
        <div className="dateline">
          <span className="dateline-row">
            <PragueAirspace />
            <span className="dateline-date">{clock.date || "—"}</span>
          </span>
          <span className="dateline-row">
            <time aria-label={clock.time ? `Time in Prague: ${clock.time}` : "Prague time"}>
              {clock.time || "—:—"}
            </time>
            <ContextPreview
              className="prague-temperature"
              preview={weatherPreview}
            >
              <span className="temperature-value">{temperature === null ? "—" : temperature}°C</span>
              {brief ? <span className="condition-value">{brief}</span> : null}
            </ContextPreview>
          </span>
        </div>
      ) : (
        <HomeLink category={category}>{backLabel}</HomeLink>
      )}
    </header>
  );
}
