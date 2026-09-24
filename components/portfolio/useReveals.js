"use client";

import { useLayoutEffect } from "react";

const targets = [
  ".project-card",
  ".case-narrative>section",
  ".case-media .media",
  ".about-photos .media",
  ".biography-main>p",
  ".biography-personal",
  ".site-footer>*",
  ".case-credits",
  ".worlds-pair",
  ".worlds-overview>*",
  ".worlds-deliverables>*",
  ".worlds-process>*",
  ".worlds-fit>*",
  ".editorial-body>*",
  ".editorial-details>*",
].join(",");

// Initial entrances belong to CSS, so hydration never hides already-painted content.
// Only unseen, offscreen content is prepared for a one-time scroll arrival.
export default function useReveals(pathname) {
  useLayoutEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet();
    const pending = new Map();
    const running = new Map();
    const restoring = document.documentElement.hasAttribute(
      "data-history-restoring",
    );
    let frame;
    const finish = (element) => {
      pending.get(element)?.cancel();
      running.get(element)?.cancel();
      pending.delete(element);
      running.delete(element);
      observer.unobserve(element);
      footerObserver.unobserve(element);
    };
    const reveal = (entries) => {
      const arriving = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top ||
            a.boundingClientRect.left - b.boundingClientRect.left,
        );
      arriving.forEach((entry, index) => {
        const element = entry.target;
        const animation = pending.get(element);
        if (!animation) return;
        observer.unobserve(element);
        footerObserver.unobserve(element);
        pending.delete(element);
        // A jump/fast scroll must not leave a visible item waiting to catch up.
        if (
          preference.matches ||
          entry.boundingClientRect.top < innerHeight * 0.2
        ) {
          animation.cancel();
          return;
        }
        animation.effect.updateTiming({
          delay: innerWidth < 600 ? 0 : Math.min(index * 45, 90),
        });
        running.set(element, animation);
        animation.play();
        animation.finished
          .then(() => {
            animation.cancel();
            running.delete(element);
          })
          .catch(() => {});
      });
    };
    const observer = new IntersectionObserver(reveal, {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0,
    });
    // The footer cannot scroll past the page bottom to reach an inset trigger.
    const footerObserver = new IntersectionObserver(reveal, { threshold: 0 });

    function scan() {
      for (const element of document.querySelectorAll(targets)) {
        if (seen.has(element) || !element.getClientRects().length) continue;
        seen.add(element);
        if (
          restoring ||
          preference.matches ||
          element.closest(".print-cv") ||
          element.getBoundingClientRect().top < innerHeight ||
          element.contains(document.activeElement)
        )
          continue;
        const animation = element.animate(
          [
            {
              opacity: 0,
              transform: `translateY(${innerWidth < 600 ? 6 : 10}px)`,
            },
            { opacity: 1, transform: "none" },
          ],
          { duration: 560, easing: "cubic-bezier(.22,.68,0,1)", fill: "both" },
        );
        animation.pause();
        pending.set(element, animation);
        (element.closest(".site-footer") ? footerObserver : observer).observe(
          element,
        );
      }
      // Resizing or switching a panel can remove a prepared node.
      for (const element of pending.keys()) {
        if (!element.isConnected) finish(element);
      }
    }
    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scan);
    }
    function finishAll() {
      for (const element of [...pending.keys(), ...running.keys()])
        finish(element);
    }
    function activate(event) {
      for (const element of [...pending.keys(), ...running.keys()]) {
        if (element.contains(event.target)) finish(element);
      }
      // Keyboard/pointer interaction never has to wait for an entrance.
      for (
        let element = event.target;
        element instanceof Element;
        element = element.parentElement
      ) {
        for (const animation of element.getAnimations()) {
          if (animation.animationName === "content-arrive") animation.finish();
        }
      }
    }
    scan();
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.querySelector(".portfolio-shell"), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["hidden"],
    });
    preference.addEventListener("change", finishAll);
    window.addEventListener("resize", finishAll);
    window.addEventListener("beforeprint", finishAll);
    document.addEventListener("focusin", activate);
    document.addEventListener("pointerdown", activate);
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      finishAll();
      observer.disconnect();
      footerObserver.disconnect();
      preference.removeEventListener("change", finishAll);
      window.removeEventListener("resize", finishAll);
      window.removeEventListener("beforeprint", finishAll);
      document.removeEventListener("focusin", activate);
      document.removeEventListener("pointerdown", activate);
    };
  }, [pathname]);
}
