"use client";

import Image from "next/image";
import Link from "next/link";
import { useLinkStatus } from "next/link";
import { useEffect, useState } from "react";
import icons from "@/content/icons.json";
import { mediaUrl } from "@/lib/media";
import Icon from "./Icon";

export function IdentityIcon({ name, src, size = 15 }) {
  return (
    <Image
      className="identity-icon"
      src={mediaUrl(src || icons[name])}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      unoptimized
    />
  );
}

export function ExternalLink({
  href,
  children,
  icon,
  className = "",
  ...props
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-hint="Visit site"
      className={`external-link ${className}`}
      {...props}
    >
      {icon && <IdentityIcon src={icon} />}
      {children}
      <span className="external-arrow" aria-hidden="true">
        <Icon name="arrow" size="compact" />
      </span>
    </a>
  );
}

function LinkFeedback() {
  const { pending } = useLinkStatus();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!pending) return;
    const timer = setTimeout(() => setVisible(true), 250);
    return () => {
      clearTimeout(timer);
      setVisible(false);
    };
  }, [pending]);
  return pending && visible ? (
    <span className="route-status" role="status">
      Opening…
    </span>
  ) : null;
}

export function RouteLink({ children, href, onNavigate, ...props }) {
  return (
    <Link
      href={href}
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        window.dispatchEvent(new Event("portfolio:navigate"));
      }}
    >
      {children}
      <LinkFeedback />
    </Link>
  );
}

export function HomeLink({
  category = "work",
  children = "Back",
  className = "button",
  ...props
}) {
  return (
    <RouteLink
      href="/"
      className={className}
      onClick={(event) => {
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        )
          return;
        try {
          sessionStorage.setItem("portfolio:return-tab", category);
        } catch {
          /* Navigation still works without storage. */
        }
      }}
      {...props}
    >
      <span className="button-content">{children}</span>
    </RouteLink>
  );
}
