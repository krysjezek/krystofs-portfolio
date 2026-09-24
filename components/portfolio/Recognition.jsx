"use client";

import { useEffect, useRef, useState } from "react";
import records from "@/content/recognition.json";
import { ExternalLink, RouteLink } from "./Links";

export default function Recognition() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const heading = useRef(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const backdropPress = useRef(false);
  function dismiss() {
    setClosing(true);
  }
  useEffect(() => {
    if (!closing) return;
    const preference = matchMedia("(prefers-reduced-motion:reduce)");
    function finish() {
      setOpen(false);
      setClosing(false);
    }
    const timer = setTimeout(finish, preference.matches ? 0 : 150);
    preference.addEventListener("change", finish);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener("change", finish);
    };
  }, [closing]);
  useEffect(() => {
    if (!open) return;
    const el = dialog.current;
    const opener = trigger.current;
    const previous = document.body.style.overflow;
    el.showModal();
    document.body.style.overflow = "hidden";
    heading.current.focus();
    return () => {
      el.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <>
      <button
        className="more-info"
        ref={trigger}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        More info
      </button>
      <dialog
        ref={dialog}
        className="recognition-dialog"
        data-closing={closing || undefined}
        aria-labelledby="recognition-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = [
            ...dialog.current.querySelectorAll(
              'a[href],button:not([disabled]),[tabindex="0"]',
            ),
          ];
          const first = controls[0];
          const last = controls.at(-1);
          if (
            event.shiftKey &&
            (document.activeElement === first ||
              document.activeElement === heading.current)
          ) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          dismiss();
        }}
        onPointerDown={(event) => {
          backdropPress.current = event.target === dialog.current;
        }}
        onPointerCancel={() => {
          backdropPress.current = false;
        }}
        onClick={(event) => {
          if (backdropPress.current && event.target === dialog.current)
            dismiss();
        }}
      >
        <div className="recognition-shell">
          <header>
            <div>
              <h2 id="recognition-title" tabIndex={-1} ref={heading}>
                Selected recognitions
              </h2>
              <p>Krystof Jezek · Designer + Engineer</p>
            </div>
            <button type="button" className="button" onClick={dismiss}>
              <span className="button-content">Close</span>
            </button>
          </header>
          <div className="recognition-list">
            {records.map((record) => (
              <article key={record.href}>
                <p>{record.description}</p>
                <ExternalLink href={record.href} icon={record.favicon}>
                  {record.source}
                </ExternalLink>
                <time dateTime={record.dateTime}>{record.date}</time>
              </article>
            ))}
          </div>
          <footer>
            <RouteLink href="/other/cv" onClick={() => setOpen(false)}>
              View resume
            </RouteLink>
          </footer>
        </div>
      </dialog>
    </>
  );
}
