"use client";

import { useState } from "react";
import Icon from "./Icon";

const email = "krystof@jezek.me";

export default function EmailCopy({ children = "email me", icon = false }) {
  const [status, setStatus] = useState("idle");
  const copied = status === "copied";
  const failed = status === "failed";

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <button
      type="button"
      className="email-copy"
      onClick={copyEmail}
      data-hint={copied ? "Copied email" : failed ? "Couldn't copy email" : "Copy email"}
      data-hint-detail={failed ? "Select the address to copy it manually." : copied ? "Email address copied to clipboard." : "Copy email address to clipboard."}
      data-hint-meta={email}
      data-hint-icon={copied ? "check" : "copy"}
      aria-label={copied ? "Copied email" : failed ? `Couldn't copy email. ${email}` : "Copy email address"}
    >
      {icon && <><Icon name={copied ? "check" : "copy"} />{" "}</>}
      <span aria-live="polite">{copied ? "copied email" : failed ? email : children}</span>
    </button>
  );
}
