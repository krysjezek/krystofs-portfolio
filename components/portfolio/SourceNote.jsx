"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ExternalLink } from "./Links";

const sources = [
  [
    "New York · about 69.8k",
    "https://www.instagram.com/barbour/reel/DAil9S2I_Kp/",
  ],
  [
    "London · about 100k",
    "https://www.instagram.com/barbour/reel/DAiDom-o3fR/",
  ],
  ["Seoul · about 163k", "https://www.instagram.com/barbour/reel/DAhoHegINvh/"],
  [
    "Shanghai · about 74.6k",
    "https://www.instagram.com/barbour/reel/DAhTliTIksm/",
  ],
];

export default function SourceNote({ note } = {}) {
  const id = useId();
  const region = useRef(null);
  const trigger = useRef(null);
  const panel = useRef(null);
  const timer = useRef(null);
  const dismissFocus = useRef(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 20, top: 20 });
  function show() {
    clearTimeout(timer.current);
    setOpen(true);
  }
  function close() {
    clearTimeout(timer.current);
    dismissFocus.current = true;
    setOpen(false);
  }
  useLayoutEffect(() => {
    if (!open) return;
    function positionPanel() {
      const rect = trigger.current.getBoundingClientRect(),
        height = panel.current.offsetHeight,
        width = panel.current.offsetWidth;
      setPosition({
        left: Math.max(20, Math.min(rect.left, innerWidth - width - 20)),
        top:
          rect.bottom + height + 20 > innerHeight
            ? Math.max(12, rect.top - height - 10)
            : rect.bottom + 10,
      });
    }
    positionPanel();
    window.addEventListener("resize", positionPanel);
    window.addEventListener("scroll", positionPanel, { passive: true });
    return () => {
      window.removeEventListener("resize", positionPanel);
      window.removeEventListener("scroll", positionPanel);
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    function outside(event) {
      if (!region.current.contains(event.target)) close();
    }
    function key(event) {
      if (event.key === "Escape") {
        close();
        trigger.current.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  useEffect(() => () => clearTimeout(timer.current), []);
  return (
    <span
      ref={region}
      className="source-region"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") show();
      }}
      onPointerLeave={() => {
        timer.current = setTimeout(close, 150);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) close();
      }}
    >
      <button
        ref={trigger}
        type="button"
        className="source-figure"
        aria-expanded={open}
        aria-controls={id}
        onClick={show}
        onFocus={() => {
          if (!dismissFocus.current) show();
        }}
        onBlur={() => {
          dismissFocus.current = false;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            show();
          }
        }}
      >
        {note?.figure || "About 407k views"}
      </button>
      {open && (
        <span
          ref={panel}
          id={id}
          role="dialog"
          aria-label={note?.title || "Sources and calculation for Barbour views"}
          className="source-panel"
          style={position}
        >
          <span className="label">Source note</span>
          <strong>{note?.title || "Views across four city Reels"}</strong>
          {note ? note.paragraphs.map((paragraph) => <span key={paragraph}>{paragraph}</span>) : <>
          <span>
            Combined public counters on Barbour’s Instagram. These describe the
            campaign’s audience, not the impact of my work alone.
          </span>
          <span>
            69.8k + 100k + 163k + 74.6k ≈ 407k. Inputs are abbreviated public
            counters, not exact analytics.
          </span>
          </>}
          {(note?.sources || sources).map(([label, url]) => (
            <ExternalLink key={url} href={url}>
              {label}
            </ExternalLink>
          ))}
          <span className="label">
            {note?.date || "Observed 23 September 2026 · Posts dated 30 September 2024"}
          </span>
          <button
            type="button"
            className="source-close"
            onClick={() => {
              close();
              trigger.current.focus();
            }}
          >
            Close
          </button>
        </span>
      )}
    </span>
  );
}
