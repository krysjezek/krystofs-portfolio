"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Motion is progressive enhancement: SSR content remains visible without JavaScript.
export default function Experience() {
  const pathname = usePathname();
  const hint = useRef(null);
  const previous = useRef(pathname);
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    const node = hint.current;
    let target = null;
    function hide() {
      target = null;
      node.hidden = true;
    }
    function move(event) {
      if (!fine.matches || event.pointerType === "touch") return hide();
      const next = event.target.closest("[data-hint]");
      const modal = document.querySelector("dialog[open]");
      if (!next || (modal && !modal.contains(next))) return hide();
      if (target !== next || node.textContent !== next.dataset.hint) {
        target = next;
        node.textContent = next.dataset.hint;
        node.hidden = false;
      }
      const rect = node.getBoundingClientRect();
      node.style.left = `${Math.max(12, event.clientX + 16 + rect.width > innerWidth - 12 ? event.clientX - rect.width - 16 : event.clientX + 16)}px`;
      node.style.top = `${event.clientY + 16 + rect.height > innerHeight - 12 ? Math.max(12, event.clientY - rect.height - 16) : event.clientY + 16}px`;
    }
    document.addEventListener("pointermove", move);
    document.addEventListener("keydown", hide);
    document.addEventListener("scroll", hide, true);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    fine.addEventListener("change", hide);
    if (previous.current !== pathname && !history.state?.portfolio) {
      document.querySelector("main h1")?.focus({ preventScroll: true });
    }
    previous.current = pathname;

    const seen = new WeakSet(),
      running = new Set();
    function reveal() {
      if (motion.matches) return;
      const items = [
        ...document.querySelectorAll(
          ".home-introduction>*,.project-card,.case-narrative>section,.case-media .media,.about-photos .media,.site-footer>*,.worlds-pair",
        ),
      ];
      const entering = items.filter(
        (el) =>
          !seen.has(el) &&
          el.getClientRects().length &&
          el.getBoundingClientRect().top < innerHeight * 0.92,
      );
      entering.sort(
        (a, b) =>
          a.getBoundingClientRect().top - b.getBoundingClientRect().top ||
          a.getBoundingClientRect().left - b.getBoundingClientRect().left,
      );
      entering.forEach((el, i) => {
        seen.add(el);
        if (
          el.getBoundingClientRect().bottom < 0 ||
          history.state?.portfolio?.scroll ||
          el.contains(document.activeElement)
        )
          return;
        const animation = el.animate(
          [
            {
              opacity: 0,
              transform: `translateY(${innerWidth < 600 ? 6 : 8}px)`,
            },
            { opacity: 1, transform: "none" },
          ],
          {
            duration: 360,
            delay: Math.min(i * 35, 70),
            easing: "cubic-bezier(.16,1,.3,1)",
          },
        );
        running.add(animation);
        animation.finished
          .finally(() => running.delete(animation))
          .catch(() => {});
      });
    }
    function finish() {
      for (const animation of running) animation.finish();
    }
    reveal();
    window.addEventListener("scroll", reveal, { passive: true });
    document.addEventListener("focusin", finish);
    motion.addEventListener("change", finish);
    const observer = new MutationObserver(() => {
      reveal();
      if (!document.querySelector("dialog[open]") && target?.closest("dialog"))
        hide();
    });
    observer.observe(document.querySelector("main"), {
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "open"],
      childList: true,
    });
    return () => {
      hide();
      finish();
      observer.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("keydown", hide);
      document.removeEventListener("scroll", hide, true);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      fine.removeEventListener("change", hide);
      window.removeEventListener("scroll", reveal);
      document.removeEventListener("focusin", finish);
      motion.removeEventListener("change", finish);
    };
  }, [pathname]);
  return <div ref={hint} className="cursor-hint" aria-hidden="true" hidden />;
}
