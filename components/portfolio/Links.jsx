"use client";

import Image from "next/image";
import Link from "next/link";
import { useLinkStatus } from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import icons from "@/content/icons.json";
import { mediaUrl } from "@/lib/media";

export function Icon({ name, src, size = 15 }) {
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
      {icon && <Icon src={icon} />}
      {children}
      <span className="external-arrow" aria-hidden="true">
        <Image
          src={mediaUrl(icons.arrow)}
          alt=""
          width={17}
          height={24}
          unoptimized
        />
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

export function RouteLink({ children, href, ...props }) {
  const router = useRouter();
  const request = useRef(null);
  const [status, setStatus] = useState(null);
  useEffect(
    () => () => {
      request.current?.abort();
      request.current = null;
    },
    [],
  );
  async function navigate() {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setStatus(null);
    const indicator = setTimeout(() => setStatus("loading"), 250);
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      // A lightweight availability check lets failures retain the outgoing page.
      const response = await fetch(href, {
        method: "HEAD",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Destination unavailable");
      if (request.current === controller) {
        setStatus(null);
        router.push(href, { scroll: props.scroll !== false });
      }
    } catch {
      if (request.current === controller) setStatus("error");
    } finally {
      clearTimeout(indicator);
      clearTimeout(timeout);
    }
  }
  return (
    <>
      <Link
        href={href}
        {...props}
        onNavigate={(event) => {
          if (
            typeof href !== "string" ||
            !href.startsWith("/") ||
            href.includes("#")
          )
            return;
          event.preventDefault();
          navigate();
        }}
      >
        {children}
        <LinkFeedback />
      </Link>
      {status && (
        <div
          className="route-status"
          role={status === "error" ? "alert" : "status"}
        >
          {status === "error" ? (
            <>
              <span>Couldn’t open this page</span>
              <button type="button" onClick={navigate}>
                Try again
              </button>
            </>
          ) : (
            "Opening…"
          )}
        </div>
      )}
    </>
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
      {children}
    </RouteLink>
  );
}
