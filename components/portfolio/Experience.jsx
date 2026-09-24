"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useReveals from "./useReveals";
import CursorHint from "./CursorHint";

export default function Experience() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  useReveals(pathname);

  useEffect(() => {
    function finishGrid() {
      document.documentElement.setAttribute("data-grid-ready", "");
    }
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    if (
      preference.matches ||
      performance.getEntriesByType("navigation")[0]?.type === "back_forward"
    )
      finishGrid();
    const gridTimer = setTimeout(finishGrid, 2500);
    // Scrolling must never reveal an unfinished grid further down the page.
    window.addEventListener("scroll", finishGrid, {
      passive: true,
      once: true,
    });
    preference.addEventListener("change", finishGrid);
    function restore() {
      finishGrid();
      document.documentElement.setAttribute("data-history-restoring", "");
    }
    function navigate() {
      document.documentElement.removeAttribute("data-history-restoring");
    }
    window.addEventListener("popstate", restore);
    window.addEventListener("portfolio:navigate", navigate);
    return () => {
      clearTimeout(gridTimer);
      window.removeEventListener("scroll", finishGrid);
      preference.removeEventListener("change", finishGrid);
      window.removeEventListener("popstate", restore);
      window.removeEventListener("portfolio:navigate", navigate);
    };
  }, []);

  useEffect(() => {
    if (
      previous.current !== pathname &&
      !document.documentElement.hasAttribute("data-history-restoring")
    ) {
      const heading = document.querySelector("main h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
    previous.current = pathname;
  }, [pathname]);
  return <CursorHint pathname={pathname} />;
}
