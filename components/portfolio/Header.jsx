"use client";

import { useEffect, useState } from "react";
import { HomeLink, RouteLink } from "./Links";
import ContextPreview from "./ContextPreview";
import PragueAirspace from "./PragueAirspace";
import Icon from "./Icon";
import { weatherIcon } from "@/lib/weather";

export default function Header({
  home = false,
  category = "work",
  backLabel = "Back",
}) {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(undefined);
  const temperature = weather?.temperature ?? null;
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
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Prague",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
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
        <div className="header-utility">
          <span className="prague-clock">
            <PragueAirspace />
            <ContextPreview
              className="prague-temperature"
              preview={weatherPreview}
            >
              <span className="utility-icon"><Icon name={weatherIcon(weather?.symbol)} /></span>
              <span className="temperature-value">{temperature === null ? "—" : temperature}°C</span>
            </ContextPreview>
            <time aria-label={time ? `Time in Prague: ${time}` : "Prague time"}>
              {time || "—:—"}
            </time>
          </span>
        </div>
      ) : (
        <HomeLink category={category}>{backLabel}</HomeLink>
      )}
    </header>
  );
}
