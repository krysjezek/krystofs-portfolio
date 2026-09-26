"use client";

import { useEffect, useId, useRef, useState } from "react";
import { RouteLink } from "./Links";
import Media from "./Media";
import PreviewContent from "./PreviewContent";

export default function Card({
  card,
  viewport = "desktop",
  priority = false,
  onOpen,
}) {
  const [showHint, setShowHint] = useState(false);
  const hintCard = useRef(null);
  const labelId = useId();
  const accessibleName = [card.name, card.disciplines].filter(Boolean).join(" ");
  useEffect(() => {
    if (!showHint) return;
    const dismiss = (event) => {
      if (event.type === "pointerdown" && hintCard.current?.contains(event.target)) return;
      setShowHint(false);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", dismiss);
    window.addEventListener("scroll", dismiss, true);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", dismiss);
      window.removeEventListener("scroll", dismiss, true);
    };
  }, [showHint]);
  const ratio =
    viewport === "mobile"
      ? card.mobileAspect
      : viewport === "tablet"
        ? card.tabletAspect
        : card.aspect;
  const props = {
    className: "project-card",
    id: `project-${card.id}`,
    "data-project": card.id,
    "data-fixed-aspect": card.fixedAspect || undefined,
    style: { "--card-aspect": ratio || card.aspect },
  };
  const content = (
    <>
      <Media
        media={{
          ...card,
          aspect: ratio || card.aspect,
          alt: card.alt || card.name,
        }}
        priority={priority}
        sizes="(max-width: 599px) calc(100vw - 10px), (max-width: 1099px) calc(50vw - 7.5px), (max-width: 1440px) calc(33.333vw - 5px), 475px"
      />
      <div className="project-labels" id={labelId}>
        <span className="tag">{card.name}</span>{" "}
        {card.disciplines && (
          <span className="tag secondary">{card.disciplines}</span>
        )}
      </div>
    </>
  );
  if (!card.href)
    return (
      <article
        {...props}
        ref={hintCard}
        aria-label={card.hint ? `${accessibleName}. ${card.hint}` : accessibleName}
        tabIndex={card.hint ? 0 : undefined}
        onPointerUp={card.hint ? (event) => {
          if (event.pointerType === "touch" || event.pointerType === "pen") setShowHint(true);
        } : undefined}
        onFocus={card.hint ? (event) => {
          if (event.currentTarget.matches(":focus-visible")) setShowHint(true);
        } : undefined}
        onBlur={() => setShowHint(false)}
        data-hint={card.hint}
        data-hint-icon={card.hint ? "eye" : undefined}
        data-hint-image={card.hintImage}
        data-informational={card.hint ? "" : undefined}
      >
        {content}
        {showHint && <span className="project-touch-hint" aria-hidden="true">
          <PreviewContent preview={{ title: card.hint, image: card.hintImage, icon: "eye" }} />
        </span>}
      </article>
    );
  const linkProps = {
    ...props,
    href: card.href,
    "aria-labelledby": labelId,
    "data-hint": card.name,
    "data-hint-image": card.icon,
    "data-hint-icon": card.href.startsWith("/") ? "eye" : undefined,
    "data-hint-meta": card.hintMeta || (card.href.startsWith("/") ? "View case study" : undefined),
    onClick: () => onOpen?.(card.id),
  };
  return card.href.startsWith("/") ? (
    <RouteLink {...linkProps}>{content}</RouteLink>
  ) : (
    <a {...linkProps} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
