"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useReveals from "./useReveals";

export default function Experience() {
  const pathname = usePathname();
  const hint = useRef(null);
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
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const node = hint.current;
    const label = node.firstElementChild;
    let target = null;
    let pointer = null;
    let labelAnimation;
    function hide(event) {
      target = null;
      node.removeAttribute("data-visible");
      node.removeAttribute("data-pressed");
      if (event?.type !== "pointermove")
        node.setAttribute("data-immediate", "");
    }
    function position() {
      if (!pointer) return;
      const rect = node.getBoundingClientRect();
      const { x, y } = pointer;
      node.style.left = `${Math.max(12, x + 16 + rect.width > innerWidth - 12 ? x - rect.width - 16 : x + 16)}px`;
      node.style.top = `${Math.max(12, y + 16 + rect.height > innerHeight - 12 ? y - rect.height - 16 : y + 16)}px`;
    }
    function updateLabel() {
      if (!target) return;
      if (label.textContent === target.dataset.hint) return;
      labelAnimation?.cancel();
      if (node.hasAttribute("data-visible") && !motion.matches) {
        labelAnimation = label.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 150,
          easing: "ease-out",
        });
      }
      label.textContent = target.dataset.hint;
      position();
    }
    function move(event) {
      if (!fine.matches || event.pointerType === "touch") return hide();
      const next = event.target.closest("[data-hint]");
      // Native dialogs live above the document's decorative cursor layer.
      if (!next || document.querySelector("dialog[open]")) return hide(event);
      pointer = { x: event.clientX, y: event.clientY };
      if (target !== next) {
        target = next;
        updateLabel();
        node.removeAttribute("data-immediate");
        node.setAttribute("data-visible", "");
      }
      position();
    }
    function press() {
      if (target) node.setAttribute("data-pressed", "");
    }
    function release() {
      node.removeAttribute("data-pressed");
    }
    function finishLabel() {
      labelAnimation?.cancel();
    }
    const mutations = new MutationObserver(() => {
      if (
        target &&
        (!target.isConnected || document.querySelector("dialog[open]"))
      )
        hide();
      else updateLabel();
    });
    mutations.observe(document.querySelector(".portfolio-shell"), {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-hint", "open"],
    });
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", hide);
    document.addEventListener("keydown", hide);
    document.addEventListener("scroll", hide, true);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("portfolio:navigate", hide);
    fine.addEventListener("change", hide);
    motion.addEventListener("change", finishLabel);
    if (
      previous.current !== pathname &&
      !document.documentElement.hasAttribute("data-history-restoring")
    ) {
      const heading = document.querySelector("main h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
    previous.current = pathname;
    return () => {
      hide();
      finishLabel();
      mutations.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      document.removeEventListener("pointercancel", hide);
      document.removeEventListener("keydown", hide);
      document.removeEventListener("scroll", hide, true);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("portfolio:navigate", hide);
      fine.removeEventListener("change", hide);
      motion.removeEventListener("change", finishLabel);
    };
  }, [pathname]);
  return (
    <div ref={hint} className="cursor-hint" aria-hidden="true">
      <span />
    </div>
  );
}
