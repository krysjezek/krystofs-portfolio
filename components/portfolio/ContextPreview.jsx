"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import PreviewContent, { previewAttributes } from "./PreviewContent";
import { RouteLink } from "./Links";

// Cursor previews never capture clicks. Destinations use native link behavior.
export default function ContextPreview({ preview, children, className = "" }) {
  const informational = preview.informational || !preview.href;
  const internal = !informational && preview.href.startsWith("/");
  const Trigger = informational ? "span" : internal ? RouteLink : "a";
  const id = useId();
  const trigger = useRef(null);
  const panel = useRef(null);
  const [open, setOpen] = useState(false);
  const position = useCallback(() => {
    const anchor = trigger.current.getBoundingClientRect();
    const node = panel.current;
    const viewport = document.documentElement.getBoundingClientRect();
    const width = node.offsetWidth;
    const height = node.offsetHeight;
    node.style.left = `${Math.max(12, Math.min(anchor.left - viewport.left, viewport.width - width - 12))}px`;
    node.style.top = `${Math.max(12, anchor.bottom + height + 22 > innerHeight ? anchor.top - height - 10 : anchor.bottom + 10)}px`;
  }, []);

  useEffect(() => {
    if (!open) return;
    function update(event) {
      if (panel.current.contains(event.target)) return;
      const rect = trigger.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight || trigger.current.closest("[hidden], [inert]")) panel.current.hidePopover();
      else position();
    }
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, position]);

  return (
    <>
      <Trigger
        ref={trigger}
        href={informational ? undefined : preview.href}
        target={!informational && !internal ? "_blank" : undefined}
        rel={!informational && !internal ? "noopener noreferrer" : undefined}
        className={`context-trigger ${className}`}
        data-informational={informational ? "" : undefined}
        {...previewAttributes(preview)}
        tabIndex={informational ? 0 : undefined}
        aria-describedby={id}
        aria-label={preview.accessibleLabel}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) panel.current.showPopover();
        }}
        onBlur={() => panel.current.hidePopover()}
        onPointerDown={() => panel.current.hidePopover()}
        onKeyDown={(event) => {
          if (event.key === "Escape") panel.current.hidePopover();
        }}
      >{children}</Trigger>
      <span
        id={id}
        ref={panel}
        popover="manual"
        role="tooltip"
        className="context-popover"
        onBeforeToggle={(event) => {
          if (event.newState === "open") window.dispatchEvent(new Event("portfolio:preview-open"));
        }}
        onToggle={(event) => {
          const visible = event.newState === "open";
          setOpen(visible);
          if (visible) position();
        }}
      >
        <PreviewContent preview={preview} />
      </span>
    </>
  );
}
