"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gallery from "@/content/gallery.json";
import profile from "@/content/profile.json";
import icons from "@/content/icons.json";
import Header from "./Header";
import Card from "./Card";
import Media from "./Media";
import Recognition from "./Recognition";
import { ExternalLink, Icon } from "./Links";

const tabs = ["work", "fun", "about"];

function useViewport() {
  const [viewport, setViewport] = useState("desktop");
  const focus = useRef(null);
  useLayoutEffect(() => {
    const mobile = matchMedia("(max-width: 599px)");
    const tablet = matchMedia("(max-width: 1099px)");
    function update() {
      focus.current = document.activeElement?.closest("[data-project]")?.id;
      setViewport(
        mobile.matches ? "mobile" : tablet.matches ? "tablet" : "desktop",
      );
    }
    update();
    mobile.addEventListener("change", update);
    tablet.addEventListener("change", update);
    return () => {
      mobile.removeEventListener("change", update);
      tablet.removeEventListener("change", update);
    };
  }, []);
  useLayoutEffect(() => {
    if (focus.current) {
      document.getElementById(focus.current)?.focus({ preventScroll: true });
      focus.current = null;
    }
  }, [viewport]);
  return viewport;
}

function Gallery({ category, viewport, onOpen }) {
  const data = gallery[category];
  const order = data[viewport];
  const columns = viewport === "mobile" ? 1 : viewport === "tablet" ? 2 : 3;
  const breaks =
    category === "fun" && viewport === "tablet"
      ? [5, 7]
      : Array(columns).fill(order.length / columns);
  return (
    <div className={`project-gallery gallery-${category}`}>
      {breaks.map((count, column) => {
        const start = breaks
          .slice(0, column)
          .reduce((sum, size) => sum + size, 0);
        const ids = order.slice(start, start + count);
        return (
          <div className="gallery-column" key={column}>
            {ids.map((id, index) => (
              <Card
                key={id}
                card={data.cards.find((c) => c.id === id)}
                viewport={viewport}
                priority={category === "work" && column === 0 && index === 0}
                onOpen={onOpen}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function About() {
  return (
    <section className="about-content" aria-label="About Kryštof">
      <div className="biography">
        <div className="biography-main">
          {profile.paragraphs.slice(0, 2).map((text) => (
            <p key={text}>
              {text
                .split(/(Kryštof|software engineering)/)
                .map((part, index) =>
                  /^(Kryštof|software engineering)$/.test(part) ? (
                    <span className="biography-emphasis" key={index}>
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
            </p>
          ))}
        </div>
        <div className="biography-personal">
          <p>{profile.paragraphs[2]}</p>
          <Recognition />
        </div>
      </div>
      <div className="about-photos">
        {profile.photos.map((photo, index) => (
          <Media
            key={photo.src}
            media={{ ...photo, aspect: index % 2 === 0 ? 3 / 4 : 9 / 16 }}
            sizes="(max-width:599px) 55vw, (max-width:1099px) 28vw, 19vw"
          />
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const [active, setActive] = useState("work");
  const [tabstop, setTabstop] = useState("work");
  const tabRefs = useRef({});
  const restoring = useRef(null);
  const panels = useRef(null);
  const previousTab = useRef(active);
  const panelFrom = useRef({});
  const viewport = useViewport();
  useLayoutEffect(() => {
    const previous = previousTab.current;
    previousTab.current = active;
    if (previous === active) return;
    const root = panels.current;
    // Stop the first-visit group before starting a user-directed panel change.
    root.getAnimations().forEach((animation) => animation.finish());
    if (
      restoring.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const outgoing = document.getElementById(`panel-${previous}`);
    const incoming = document.getElementById(`panel-${active}`);
    outgoing.hidden = false;
    outgoing.dataset.leaving = "";
    const exit = outgoing.animate(
      [
        panelFrom.current[previous] || { opacity: 1 },
        { opacity: 0, transform: "none" },
      ],
      {
        duration: 180,
        easing: "ease-out",
        fill: "both",
      },
    );
    const entrance = incoming.animate(
      [
        panelFrom.current[active] || {
          opacity: 0,
          transform: "translateY(6px)",
        },
        { opacity: 1, transform: "none" },
      ],
      {
        duration: 480,
        delay: 50,
        easing: "cubic-bezier(.22,.68,0,1)",
        fill: "backwards",
      },
    );
    function settle() {
      outgoing.hidden = true;
      delete outgoing.dataset.leaving;
      exit.cancel();
      entrance.cancel();
    }
    exit.finished
      .then(() => {
        outgoing.hidden = true;
        delete outgoing.dataset.leaving;
      })
      .catch(() => {});
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", settle);
    return () => {
      // React may have just made the previous panel active again.
      exit.cancel();
      entrance.cancel();
      delete outgoing.dataset.leaving;
      outgoing.hidden = outgoing.inert;
      preference.removeEventListener("change", settle);
    };
  }, [active]);
  useEffect(() => {
    let requested;
    try {
      requested = sessionStorage.getItem("portfolio:return-tab");
      sessionStorage.removeItem("portfolio:return-tab");
    } catch {}
    const nav = performance.getEntriesByType("navigation")[0];
    const saved = history.state?.portfolio;
    const tab = tabs.includes(requested)
      ? requested
      : nav?.type !== "reload" && tabs.includes(saved?.tab)
        ? saved.tab
        : "work";
    // Restore browser-owned history only after hydration; it is unavailable during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActive(tab);
    setTabstop(tab);
    if (!requested && saved && nav?.type !== "reload")
      restoring.current = saved;
  }, []);
  useEffect(() => {
    if (!restoring.current) return;
    const saved = restoring.current;
    const timer = requestAnimationFrame(() => {
      window.scrollTo(0, saved.scroll || 0);
      if (saved.card)
        document
          .getElementById(`project-${saved.card}`)
          ?.focus({ preventScroll: true });
      restoring.current = null;
    });
    return () => cancelAnimationFrame(timer);
  }, [active, viewport]);
  function save(card) {
    history.replaceState(
      {
        ...history.state,
        portfolio: { tab: active, scroll: window.scrollY, card },
      },
      "",
    );
  }
  function activate(tab) {
    if (tab === active) return;
    panelFrom.current = {};
    for (const panel of panels.current.children) {
      if (panel.hidden) continue;
      const style = getComputedStyle(panel);
      panelFrom.current[panel.id.replace("panel-", "")] = {
        opacity: style.opacity,
        transform: style.transform,
      };
    }
    setActive(tab);
    setTabstop(tab);
    history.replaceState(
      { ...history.state, portfolio: { tab, scroll: window.scrollY } },
      "",
    );
  }
  function keyboard(event, tab) {
    const index = tabs.indexOf(tab);
    const next =
      event.key === "ArrowRight"
        ? tabs[(index + 1) % 3]
        : event.key === "ArrowLeft"
          ? tabs[(index + 2) % 3]
          : event.key === "Home"
            ? "work"
            : event.key === "End"
              ? "about"
              : null;
    if (next) {
      event.preventDefault();
      setTabstop(next);
      tabRefs.current[next]?.focus();
    }
  }
  return (
    <>
      <Header home />
      <main id="main-content">
        <h1 className="sr-only">Krystof Jezek — Independent CGI designer</h1>
        <div className="home-introduction">
          <p className="practice-copy">
            I work with creative teams to turn strong visual ideas into polished
            3D, motion and technically ambitious interactive work.
          </p>
          <p className="mockups-copy">
            I’m building{" "}
            <span className="attached-punctuation">
              <ExternalLink
                href="https://www.motionmockups.com/"
                icon={icons.motionMockups}
              >
                Motion Mockups
              </ExternalLink>
              ,
            </span>{" "}
            an app for turning screen recordings into polished,{" "}
            <span className="no-wrap">art-directed</span>
            product visuals.
          </p>
          <div className="contact-copy">
            <p>Based in Prague, working worldwide.</p>
            <p>
              For projects or a chat,{" "}
              <a href="mailto:krystof@jezek.me" data-hint="Email me">
                <Icon name="email" /> email me
              </a>
              .
            </p>
            <p>
              Or say hi on{" "}
              <ExternalLink
                href="https://x.com/krysjezek"
                icon={icons.x}
                data-hint="Follow"
              >
                @krysjezek
              </ExternalLink>
            </p>
          </div>
        </div>
        <div className="portfolio-navigation">
          <div
            role="tablist"
            aria-label="Portfolio sections"
            style={{ "--active-tab": tabs.indexOf(active) }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                ref={(el) => {
                  tabRefs.current[tab] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${tab}`}
                aria-controls={`panel-${tab}`}
                aria-selected={active === tab}
                tabIndex={tabstop === tab ? 0 : -1}
                onKeyDown={(e) => keyboard(e, tab)}
                onClick={() => activate(tab)}
              >
                {tab[0].toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className="portfolio-panels" ref={panels}>
          {tabs.map((tab) => (
            <div
              key={tab}
              id={`panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab}`}
              hidden={active !== tab}
              inert={active !== tab}
            >
              {tab === "about" ? (
                <About />
              ) : (
                <Gallery category={tab} viewport={viewport} onOpen={save} />
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
