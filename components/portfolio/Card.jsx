"use client";

import { RouteLink } from "./Links";
import Media from "./Media";

export default function Card({
  card,
  viewport = "desktop",
  priority = false,
  onOpen,
}) {
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
      <div className="project-labels" aria-hidden="true">
        <span className="tag">{card.name}</span>
        {card.disciplines && (
          <span className="tag secondary">{card.disciplines}</span>
        )}
      </div>
    </>
  );
  if (!card.href)
    return (
      <article {...props} aria-label={card.name}>
        {content}
      </article>
    );
  const linkProps = {
    ...props,
    href: card.href,
    "aria-label": card.name,
    "data-hint": card.href.startsWith("/") ? "View project" : "Visit site",
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
