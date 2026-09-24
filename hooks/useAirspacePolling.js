"use client";

import { useEffect, useRef, useState } from "react";

const replace = (_, next) => next;

// Keep the snapshot and next due time across preview/detail/closed transitions.
export function useAirspacePolling(ref, enabled, url, interval, merge = replace) {
  const [state, setState] = useState({ data: null, error: false, active: false });
  const due = useRef(0);
  const failures = useRef(0);
  useEffect(() => {
    if (!enabled || !url) return;
    let visible = false, disposed = false, timer, controller, running = false;
    const schedule = () => {
      clearTimeout(timer);
      const active = visible && !document.hidden && !disposed;
      setState(old => old.active === active ? old : { ...old, active });
      if (!active) { controller?.abort(); return; }
      if (!running) timer = setTimeout(poll, Math.max(0, due.current - Date.now()));
    };
    async function poll() {
      running = true;
      controller = new AbortController();
      const timeout = setTimeout(() => controller.abort("timeout"), 10000);
      try {
        const response = await fetch(url, { cache: "no-store", signal: controller.signal });
        const payload = await response.json();
        if (!response.ok || !payload.ok) {
          due.current = Math.max(due.current, payload.retryAt || 0);
          throw new Error("Unavailable");
        }
        if (!disposed && !controller.signal.aborted) {
          setState(old => ({ ...old, data: merge(old.data, payload), error: false }));
          failures.current = 0;
          due.current = Date.now() + interval;
        }
      } catch {
        if (!disposed && visible && !document.hidden) {
          setState(old => ({ ...old, error: true }));
          failures.current += 1;
          due.current = Math.max(due.current, Date.now() + Math.min(300000, interval * 2 ** failures.current));
        }
      } finally {
        clearTimeout(timeout);
        running = false;
        if (!disposed) schedule();
      }
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    if (ref.current) observer.observe(ref.current);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      disposed = true;
      observer.disconnect();
      clearTimeout(timer);
      controller?.abort();
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [ref, enabled, url, interval, merge]);
  return { ...state, active: enabled && state.active };
}
