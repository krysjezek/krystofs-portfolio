"use client";

import { useEffect, useState } from "react";
import { HomeLink, RouteLink } from "./Links";

export default function Header({
  home = false,
  category = "work",
  backLabel = "Back",
}) {
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState(null);
  useEffect(() => {
    if (!home) return;
    const controller = new AbortController();
    async function updateWeather() {
      if (document.hidden) return;
      try {
        const response = await fetch("/api/weather", { signal: controller.signal });
        if (!response.ok) throw new Error("Weather unavailable");
        const weather = await response.json();
        setTemperature(Number.isFinite(weather.temperature) ? weather.temperature : null);
      } catch {
        if (!controller.signal.aborted) setTemperature(null);
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
            <span>Prague</span>
            <time aria-label={time ? `Time in Prague: ${time}` : "Prague time"}>
              {time || "—:—"}
            </time>
            <a
              className="prague-temperature"
              href="https://api.met.no/doc/License"
              target="_blank"
              rel="noopener noreferrer"
              title={temperature === null
                ? "Temperature unavailable · Weather data: MET Norway (CC BY 4.0)"
                : "Hourly forecast · MET Norway (CC BY 4.0), rounded to whole degrees"}
              aria-label={temperature === null
                ? "Prague temperature unavailable. Weather source and license"
                : `Prague temperature: ${temperature} degrees Celsius. Weather source and license`}
            >
              {temperature === null ? "—" : temperature}°C
            </a>
          </span>
        </div>
      ) : (
        <HomeLink category={category}>{backLabel}</HomeLink>
      )}
    </header>
  );
}
