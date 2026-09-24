"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import PreviewContent from "./PreviewContent";

function actionIcon(label) {
  if (label === "View project") return "eye";
  if (label === "Email copied") return "check";
  if (label === "Copy email") return "copy";
  if (label === "Email me") return "email";
  return "arrow";
}

function previewFor(target) {
  const authored = target.hasAttribute("data-hint-detail") || target.hasAttribute("data-hint-meta");
  const title = target.dataset.hint;
  if (authored) return {
    title, detail: target.dataset.hintDetail, meta: target.dataset.hintMeta,
    icon: target.dataset.hintIcon || actionIcon(title), image: target.dataset.hintImage,
  };
  const href = target.getAttribute("href") || "";
  if (href.startsWith("mailto:")) return {
    title: href.slice(7).split("?")[0], detail: "Opens your email app.", icon: "email",
  };
  if (/^https?:/.test(href)) {
    const url = new URL(href);
    return {
      title: url.host.replace(/^www\./, "") + (url.pathname === "/" ? "" : url.pathname.replace(/\/$/, "")),
      detail: target.target === "_blank" ? "Opens in a new tab." : "Opens this website.", icon: "arrow",
      image: target.dataset.hintImage,
    };
  }
  return { title, icon: actionIcon(title) };
}

export default function CursorHint({ pathname }) {
  const hint = useRef(null);
  const reposition = useRef(null);
  const [preview, setPreview] = useState({});

  useLayoutEffect(() => { reposition.current?.(); }, [preview]);

  useEffect(() => {
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const node = hint.current;
    const content = node.querySelector(".context-content");
    let signature = "";
    let target = null;
    let pointer = null;
    let labelAnimation;

    function hide(event) {
      target = null;
      labelAnimation?.cancel();
      node.removeAttribute("data-visible");
      node.removeAttribute("data-pressed");
      if (event?.type !== "pointermove") node.setAttribute("data-immediate", "");
    }

    function position() {
      if (!pointer) return;
      // Measure the unscaled wrapper so entrance/press never shift the hint.
      const { width, height } = node.getBoundingClientRect();
      // Stable scrollbar gutters inset the fixed-position containing block.
      const viewport = document.documentElement.getBoundingClientRect();
      const x = pointer.x - viewport.left - scrollX;
      const { y } = pointer;
      node.style.left = `${Math.max(12, x + 16 + width > viewport.width - 12 ? x - width - 16 : x + 16)}px`;
      node.style.top = `${Math.max(12, y + 16 + height > innerHeight - 12 ? y - height - 16 : y + 16)}px`;
    }

    function updateLabel() {
      if (!target) return;
      const preview = previewFor(target);
      const nextSignature = JSON.stringify(preview);
      if (signature === nextSignature) return;
      signature = nextSignature;
      labelAnimation?.cancel();
      if (node.hasAttribute("data-visible") && !motion.matches) {
        labelAnimation = content.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 150,
          easing: "ease-out",
        });
      }
      setPreview(preview);
    }

    function move(event) {
      if (!fine.matches || event.pointerType === "touch") return hide();
      if (document.querySelector("dialog[open], .context-popover:popover-open")) return hide();
      const next = event.target.closest("[data-hint]");
      if (!next?.dataset.hint || next.closest("[hidden], [inert]")) return hide(event);
      pointer = { x: event.clientX, y: event.clientY };
      if (target !== next) {
        target = next;
        updateLabel();
        node.removeAttribute("data-pressed");
        node.removeAttribute("data-immediate");
        node.setAttribute("data-visible", "");
      }
      position();
    }

    function press(event) {
      if (event.pointerType === "touch") return hide();
      if (target && !target.hasAttribute("data-informational") && target.contains(event.target))
        node.setAttribute("data-pressed", "");
    }

    function release() {
      node.removeAttribute("data-pressed");
    }

    reposition.current = position;
    const mutations = new MutationObserver(() => {
      if (
        target &&
        (!target.isConnected ||
          target.closest("[hidden], [inert]") ||
          !target.dataset.hint ||
          document.querySelector("dialog[open], .context-popover:popover-open"))
      )
        hide();
      else updateLabel();
    });
    mutations.observe(document.querySelector(".portfolio-shell"), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-hint", "data-hint-detail", "data-hint-meta", "data-hint-icon", "data-hint-image", "href", "open", "hidden", "inert"],
    });
    const dismissEvents = ["pointercancel", "keydown", "scroll", "pointerleave"];
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    for (const event of dismissEvents)
      document.addEventListener(event, hide, event === "scroll");
    window.addEventListener("blur", hide);
    window.addEventListener("resize", hide);
    window.addEventListener("portfolio:navigate", hide);
    window.addEventListener("portfolio:preview-open", hide);
    fine.addEventListener("change", hide);
    motion.addEventListener("change", hide);
    return () => {
      reposition.current = null;
      hide();
      mutations.disconnect();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", press);
      document.removeEventListener("pointerup", release);
      for (const event of dismissEvents)
        document.removeEventListener(event, hide, event === "scroll");
      window.removeEventListener("blur", hide);
      window.removeEventListener("resize", hide);
      window.removeEventListener("portfolio:navigate", hide);
      window.removeEventListener("portfolio:preview-open", hide);
      fine.removeEventListener("change", hide);
      motion.removeEventListener("change", hide);
    };
  }, [pathname]);

  return (
    <div ref={hint} className="cursor-hint" data-icon={preview.icon} aria-hidden="true">
      <span className="cursor-hint-press">
        <span className="cursor-hint-surface">
          <PreviewContent preview={preview} cursor />
        </span>
      </span>
    </div>
  );
}
