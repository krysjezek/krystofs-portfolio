"use client";

import { useEffect, useState } from "react";
import gallery from "@/content/gallery.json";
import Card from "./Card";

const eligible = [...gallery.work.cards, ...gallery.fun.cards].filter((card) =>
  card.href?.startsWith("/work/"),
);
export default function Recommendations({
  current,
  title = "More case studies",
}) {
  const [selection, setSelection] = useState(null);
  useEffect(() => {
    const pool = eligible.filter((card) => card.href !== current);
    const random = new Uint32Array(pool.length);
    crypto.getRandomValues(random);
    const selected = pool
      .map((card, index) => ({ card, sort: random[index] }))
      .sort((a, b) => a.sort - b.sort)
      .slice(0, 2)
      .map((x) => x.card);
    // The per-visit browser entropy is intentionally read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelection(selected);
  }, [current]);
  return (
    <section className="recommendations" aria-label={title}>
      <h2>{title}</h2>
      {selection ? (
        selection.map((card) => <Card key={card.id} card={card} />)
      ) : (
        <div className="recommendations-placeholder" aria-hidden="true" />
      )}
    </section>
  );
}
