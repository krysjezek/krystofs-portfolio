"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import PreviewContent, { previewAttributes } from "./PreviewContent";
import { RouteLink } from "./Links";
import Icon from "./Icon";

// Hover is a preview; activation pins the same information for every input type.
export default function ContextPreview({ preview, children, className = "" }) {
  const id = useId();
  const trigger = useRef(null);
  const panel = useRef(null);
  const heading = useRef(null);
  const [open, setOpen] = useState(false);
  const position = useCallback(() => {
    const anchor = trigger.current.getBoundingClientRect();
    const node = panel.current;
    const viewport = document.documentElement.getBoundingClientRect();
    const width = Math.min(280, viewport.width - 24);
    node.style.width = `${width}px`;
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

  const link = preview.href && (preview.href.startsWith("/") ? (
    <RouteLink href={preview.href}>{preview.linkLabel || "View portfolio"}</RouteLink>
  ) : (
    <a href={preview.href} target="_blank" rel="noopener noreferrer">{preview.linkLabel || "View profile"} <Icon name="arrow" size="compact" /></a>
  ));

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`context-trigger ${className}`}
        {...previewAttributes(preview)}
        popoverTarget={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
        aria-label={preview.accessibleLabel}
      >{children}</button>
      <span
        id={id}
        ref={panel}
        popover="auto"
        role="dialog"
        aria-label={preview.title}
        className="context-popover"
        onBeforeToggle={(event) => {
          if (event.newState === "open") window.dispatchEvent(new Event("portfolio:preview-open"));
        }}
        onToggle={(event) => {
          const visible = event.newState === "open";
          setOpen(visible);
          if (visible) {
            position();
            heading.current.focus({ preventScroll: true });
          }
        }}
      >
        <span tabIndex={-1} ref={heading} className="context-focus">
          <PreviewContent preview={preview} />
        </span>
        <span className="context-actions">
          {link}
          <button type="button" popoverTarget={id} popoverTargetAction="hide">Close</button>
        </span>
      </span>
    </>
  );
}
