"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import records from "@/content/recognition.json";
import { ExternalLink } from "./Links";

export default function Recognition() {
  const id = useId();
  const panel = useRef(null);
  const trigger = useRef(null);
  const heading = useRef(null);
  const [open, setOpen] = useState(false);

  const positionPanel = useCallback(() => {
    const anchor = trigger.current.getBoundingClientRect();
    const inset = 16;
    const gap = 10;
    const viewport = document.documentElement.getBoundingClientRect();
    const width = Math.min(420, viewport.width - inset * 2);
    const below = innerHeight - anchor.bottom - gap - inset;
    const above = anchor.top - gap - inset;
    const useAbove = below < 480 && above > below;
    const height = Math.max(0, Math.min(480, useAbove ? above : below));
    Object.assign(panel.current.style, {
      width: `${width}px`,
      left: `${Math.max(inset, Math.min(anchor.left - viewport.left, viewport.width - width - inset))}px`,
      top: `${useAbove ? anchor.top - gap - height : anchor.bottom + gap}px`,
      height: `${height}px`,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    function update(event) {
      if (event.target instanceof Node && panel.current.contains(event.target)) return;
      const anchor = trigger.current.getBoundingClientRect();
      if (anchor.bottom < 0 || anchor.top > innerHeight) {
        panel.current.hidePopover();
      } else {
        positionPanel();
      }
    }
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, positionPanel]);

  return (
    <>
      <button
        className="recognition-trigger"
        ref={trigger}
        type="button"
        popoverTarget={id}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={id}
      >
        Mentions and credits
      </button>
      <div
        ref={panel}
        id={id}
        popover="auto"
        role="dialog"
        className="recognition-popover"
        aria-labelledby={`${id}-title`}
        onBeforeToggle={(event) => {
          if (event.newState === "open") positionPanel();
        }}
        onToggle={(event) => {
          const visible = event.newState === "open";
          setOpen(visible);
          if (visible) heading.current.focus({ preventScroll: true });
        }}
      >
        <div className="recognition-shell">
          <header>
            <div>
              <h2 id={`${id}-title`} tabIndex={-1} ref={heading}>
                Mentions and credits
              </h2>
              <p>{records.length} mentions &amp; credits</p>
            </div>
            <button
              type="button"
              className="button"
              popoverTarget={id}
              popoverTargetAction="hide"
            >
              <span className="button-content">Close</span>
            </button>
          </header>
          <div className="recognition-list">
            {records.map((record) => (
              <article key={record.href}>
                <p>{record.description}</p>
                <div className="recognition-meta">
                  <ExternalLink href={record.href} icon={record.favicon}>
                    {record.source}
                  </ExternalLink>
                  <time dateTime={record.dateTime}>{record.date}</time>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
