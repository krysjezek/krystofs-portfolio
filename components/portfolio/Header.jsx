"use client";

import { useEffect, useState } from "react";
import { HomeLink, RouteLink } from "./Links";
import ContextPreview from "./ContextPreview";
import PragueAirspace from "./PragueAirspace";

export default function Header({
  home = false,
  category = "work",
  backLabel = "Back",
}) {
  const [time, setTime] = useState("");
  const [weather, setWeather] = useState(undefined);
  const temperature = weather?.temperature ?? null;
  const forecastTime = weather?.time && Number.isFinite(Date.parse(weather.time))
    ? new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", hour: "2-digit", minute: "2-digit" }).format(new Date(weather.time))
    : null;
  const weatherPreview = {
    title: temperature === null ? "Weather in Prague" : `Prague · ${temperature}°C`,
    detail: weather === undefined ? "Loading the hourly forecast."
      : temperature === null ? "The forecast is temporarily unavailable."
        : `${weather.condition || "Conditions unavailable"} · hourly forecast${forecastTime ? ` for ${forecastTime} (Prague time)` : ""}.`,
    meta: "MET Norway · CC BY 4.0",
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
            <time aria-label={time ? `Time in Prague: ${time}` : "Prague time"}>
              {time || "—:—"}
            </time>
            <ContextPreview
              className="prague-temperature"
              preview={weatherPreview}
            >
              {temperature === null ? "—" : temperature}°C
            </ContextPreview>
          </span>
        </div>
      ) : (
        <HomeLink category={category}>{backLabel}</HomeLink>
      )}
    </header>
  );
}
