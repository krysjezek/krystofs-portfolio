"use client";

import { useEffect, useState } from "react";
import { HomeLink, Icon, RouteLink } from "./Links";
import CopyEmail from "./CopyEmail";

export default function Header({
  home = false,
  category = "work",
  backLabel = "Back",
}) {
  const [time, setTime] = useState("");
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
    <header className="site-header">
      <RouteLink href="/" className="site-name">
        Krystof Jezek
      </RouteLink>
      {home ? (
        <div className="header-utility">
          <span className="prague-clock">
            <Icon name="location" size={12} />
            <span>Prague</span>
            <time aria-label={time ? `Time in Prague: ${time}` : "Prague time"}>
              {time || "—:—"}
            </time>
          </span>
          <span className="utility-actions">
            <CopyEmail />
            <a
              href="https://x.com/krysjezek"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow @krysjezek on X"
              data-hint="Follow"
            >
              <Icon name="xSmall" size={12} />
            </a>
          </span>
        </div>
      ) : (
        <HomeLink category={category}>{backLabel}</HomeLink>
      )}
    </header>
  );
}
