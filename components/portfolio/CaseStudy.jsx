import Header from "./Header";
import Media from "./Media";
import { ExternalLink } from "./Links";
import IdentityTile from "./IdentityTile";
import ContextPreview from "./ContextPreview";
import previews from "@/content/context-previews.json";
import Recommendations from "./Recommendations";
import SourceNote from "./SourceNote";
import JsonLd from "@/components/JsonLd";
import { pageStructuredData } from "@/app/seo";

function Specifications({ items, className = "" }) {
  return (
    <dl className={`case-specifications ${className}`}>
      {items.map((item) => (
        <div key={item.label}>
          <dt className="label">{item.label}</dt>
          <dd>
            {item.name && (
              <ExternalLink href={item.href} icon={item.icon}>
                {item.name}
              </ExternalLink>
            )}
            {item.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Narrative({ items, className = "", sourced = false }) {
  return (
    <div className={`case-narrative ${className}`}>
      {items.map((item) => (
        <section key={item.label}>
          <h2 className="label">{item.label}</h2>
          {item.paragraphs.map((text, index) => (
            <p key={index}>
              {typeof text !== "string" ? (
                <>{text.before}<SourceNote note={text.note} />{text.after}</>
              ) : sourced && text.startsWith("About 407k views") ? (
                <>
                  <SourceNote />
                  {text.slice("About 407k views".length)}
                </>
              ) : (
                text
              )}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}

export default function CaseStudy({ project }) {
  return (
    <>
      <Header category={project.category} />
      <main id="main-content" className="case-study">
        <JsonLd data={pageStructuredData(project.path)} />
        <header className={`case-introduction ${project.category}`}>
          <div className="case-overview">
            <div className="case-title">
              <h1 tabIndex={-1}>{project.title}</h1>
              <p>{project.subtitle}</p>
              <p className="label">{project.date}</p>
            </div>
            {project.overview.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
          {project.specs.length > 0 && (
            <Specifications
              items={project.specs}
              className="desktop-specifications"
            />
          )}
          <ul className="case-tags" aria-label="Disciplines">
            {project.tags.map((tag) => (
              <li className="tag secondary" key={tag}>
                {tag}
              </li>
            ))}
          </ul>
        </header>
        {project.hero && <>
          <div className="case-hero">
            <Media media={project.hero} priority sizes="calc(100vw - 10px)" />
          </div>
          <p className="film-caption label">{project.caption}</p>
        </>}
        {project.specs.length > 0 && (
          <Specifications
            items={project.specs}
            className="mobile-specifications"
          />
        )}
        <Narrative items={project.approach} />
        {project.chapters?.map((chapter, index) => (
          <section className="case-chapter" key={chapter.id} aria-labelledby={chapter.id}>
            <div className="case-chapter-intro">
              <div>
                <p className="label">Project {String(index + 1).padStart(2, "0")}</p>
                <h2 id={chapter.id}>{chapter.title}</h2>
              </div>
              <div>
                <p>{chapter.description}</p>
                <ExternalLink href={chapter.explainer} className="button"><span className="button-content">Watch {chapter.linkLabel} on YouTube</span></ExternalLink>
              </div>
            </div>
            <div className="case-media">
              <Media media={chapter.media} sizes="calc(100vw - 10px)" />
            </div>
            <p className="film-caption label">{chapter.caption}</p>
          </section>
        ))}
        {project.rows.length > 0 && (
          <div className="case-media">
            {project.rows.map((row, index) => (
              <div
                key={index}
                className={`case-media-row ${project.mediaLayout === "mixed" ? "case-media-row-mixed" : ""}`}
              >
                {row.map((mediaIndex) => (
                  <Media
                    key={mediaIndex}
                    media={project.media[mediaIndex]}
                    style={project.mediaLayout === "mixed" ? { "--media-weight": project.media[mediaIndex].aspect } : undefined}
                    sizes={`(max-width:599px) calc(100vw - 10px), ${Math.ceil(100 * (project.mediaLayout === "mixed" ? project.media[mediaIndex].aspect / row.reduce((sum, item) => sum + project.media[item].aspect, 0) : 1 / row.length))}vw`}
                  />
                ))}
              </div>
            ))}
          </div>
        )}
        <Narrative
          items={project.outcome}
          className="case-outcome"
          sourced={project.slug === "barbour"}
        />
        {project.credits.length > 0 && (
          <section className="case-credits">
            <h2 className="label">Credits</h2>
            <dl>
              {project.credits.map((credit, index) => (
                <div key={index}>
                  <dt>{credit.role}</dt>
                  <dd>
                    {credit.plain ? credit.name : (
                      <>
                        <IdentityTile src={credit.icon || "designer"} />
                        <ContextPreview preview={{
                          title: credit.name,
                          detail: `${credit.role} on ${project.title}.`,
                          href: credit.href,
                          ...previews.people[credit.name],
                          icon: (previews.people[credit.name]?.href || credit.href) ? "arrow" : "eye",
                          image: credit.icon || "designer",
                        }}>
                          {previews.people[credit.name]?.title || credit.name}
                        </ContextPreview>
                      </>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <Recommendations current={project.path} />
      </main>
    </>
  );
}
