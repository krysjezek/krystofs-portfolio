"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import PreviewContent, { previewAttributes } from "./PreviewContent";
import { RouteLink } from "./Links";
import Icon from "./Icon";

// Information reveals on hover/focus; only actionable previews can be pinned.
export default function ContextPreview({ preview, children, className = "" }) {
  const informational = preview.informational || !preview.href;
  const Trigger = informational ? "span" : "button";
  const id = useId();
  const trigger = useRef(null);
  const panel = useRef(null);
  const heading = useRef(null);
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

  const link = preview.href && (preview.href.startsWith("/") ? (
    <RouteLink href={preview.href}>{preview.linkLabel || "View portfolio"}</RouteLink>
  ) : (
    <a href={preview.href} target="_blank" rel="noopener noreferrer">{preview.linkLabel || "View profile"} <Icon name="arrow" size="compact" /></a>
  ));

  return (
    <>
      <Trigger
        ref={trigger}
        type={informational ? undefined : "button"}
        className={`context-trigger ${className}`}
        data-informational={informational ? "" : undefined}
        {...previewAttributes(preview)}
        tabIndex={informational ? 0 : undefined}
        popoverTarget={informational ? undefined : id}
        aria-haspopup={informational ? undefined : "dialog"}
        aria-expanded={informational ? undefined : open}
        aria-controls={informational ? undefined : id}
        aria-describedby={informational ? id : undefined}
        aria-label={preview.accessibleLabel}
        onFocus={informational ? (event) => {
          if (event.currentTarget.matches(":focus-visible")) panel.current.showPopover();
        } : undefined}
        onBlur={informational ? () => panel.current.hidePopover() : undefined}
        onKeyDown={informational ? (event) => {
          if (event.key === "Escape") panel.current.hidePopover();
        } : undefined}
      >{children}</Trigger>
      <span
        id={id}
        ref={panel}
        popover={informational ? "manual" : "auto"}
        role={informational ? "tooltip" : "dialog"}
        aria-label={informational ? undefined : preview.title}
        className="context-popover"
        onBeforeToggle={(event) => {
          if (event.newState === "open") window.dispatchEvent(new Event("portfolio:preview-open"));
        }}
        onToggle={(event) => {
          const visible = event.newState === "open";
          setOpen(visible);
          if (visible) {
            position();
            if (!informational) heading.current.focus({ preventScroll: true });
          }
        }}
      >
        <span tabIndex={informational ? undefined : -1} ref={heading} className="context-focus">
          <PreviewContent preview={preview} />
        </span>
        {!informational && <span className="context-actions">
          {link}
          <button type="button" popoverTarget={id} popoverTargetAction="hide">Close</button>
        </span>}
      </span>
    </>
  );
}
