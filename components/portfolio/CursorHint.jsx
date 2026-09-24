"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { mediaUrl } from "@/lib/media";
import { CheckIcon } from "./Links";

const icons = {
  eye: "cursor-eye.svg",
  arrow: "arrow-leftup.svg",
  email: "cursor-message.svg",
};

function actionIcon(label) {
  if (label === "View project") return "eye";
  if (label === "Email copied") return "check";
  if (label === "Copy email" || label === "Email me") return "email";
  return "arrow";
}

export default function CursorHint({ pathname }) {
  const hint = useRef(null);

  useEffect(() => {
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const node = hint.current;
    const label = node.querySelector(".cursor-hint-label");
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
      const text = target.dataset.hint;
      if (label.textContent === text) return;
      labelAnimation?.cancel();
      if (node.hasAttribute("data-visible") && !motion.matches) {
        labelAnimation = label.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 150,
          easing: "ease-out",
        });
      }
      label.textContent = text;
      node.dataset.icon = actionIcon(text);
      position();
    }

    function move(event) {
      if (!fine.matches || event.pointerType === "touch") return hide();
      if (document.querySelector("dialog[open]")) return hide();
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
      if (target && target.contains(event.target))
        node.setAttribute("data-pressed", "");
    }

    function release() {
      node.removeAttribute("data-pressed");
    }

    const mutations = new MutationObserver(() => {
      if (
        target &&
        (!target.isConnected ||
          target.closest("[hidden], [inert]") ||
          !target.dataset.hint ||
          document.querySelector("dialog[open]"))
      )
        hide();
      else updateLabel();
    });
    mutations.observe(document.querySelector(".portfolio-shell"), {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["data-hint", "open", "hidden", "inert"],
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
    fine.addEventListener("change", hide);
    motion.addEventListener("change", hide);
    return () => {
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
      fine.removeEventListener("change", hide);
      motion.removeEventListener("change", hide);
    };
  }, [pathname]);

  return (
    <div ref={hint} className="cursor-hint" aria-hidden="true">
      <span className="cursor-hint-press">
        <span className="cursor-hint-surface">
          <span className="cursor-hint-icon">
            {Object.entries(icons).map(([name, file]) => (
              <Image
                key={name}
                data-icon={name}
                src={mediaUrl(`/images/${file}`)}
                alt=""
                width={name === "arrow" ? 10 : 12}
                height={name === "arrow" ? 10 : 12}
                loading="eager"
                unoptimized
              />
            ))}
            <CheckIcon size={12} data-icon="check" />
          </span>
          <span className="cursor-hint-label" />
        </span>
      </span>
    </div>
  );
}
