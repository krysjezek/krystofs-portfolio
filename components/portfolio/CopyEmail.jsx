"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import Icon from "./Icon";

export default function CopyEmail() {
  const [state, setState] = useState("idle");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    clearTimeout(timer.current);
    setState("copying");
    try {
      await navigator.clipboard.writeText("krystof@jezek.me");
      setState("success");
      track("email_copy", { location: "header" });
      timer.current = setTimeout(() => setState("idle"), 1600);
    } catch {
      setState("error");
    }
  }
  return (
    <span className="copy-email">
      <button
        type="button"
        onClick={copy}
        disabled={state === "copying"}
        data-hint={state === "success" ? "Email copied" : "Copy email"}
      >
        <span
          className="copy-label"
          data-copied={state === "success" || undefined}
        >
          <span className="copy-default" aria-hidden={state === "success"}>
            <Icon name="copy" size="compact" />
            Copy email
          </span>
          <span className="copy-success" aria-hidden={state !== "success"}>
            <Icon name="check" size="compact" />
            Email copied
          </span>
        </span>
      </button>
      <span className="sr-only" role="status">
        {state === "success" ? "Email copied" : ""}
      </span>
      {state === "error" && (
        <span className="copy-error" role="status">
          Couldn’t copy the email.
          <br />
          <span>krystof@jezek.me</span>
          <button type="button" onClick={copy}>
            Try again
          </button>
        </span>
      )}
    </span>
  );
}
