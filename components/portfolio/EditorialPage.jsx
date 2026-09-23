import Image from "next/image";
import Header from "./Header";
import Media from "./Media";
import { RouteLink } from "./Links";
import { mediaUrl } from "@/lib/media";

function RichText({ value }) {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.map((part, index) => <RichText key={index} value={part} />);
  if (!value) return null;
  if (value.href)
    return (
      <a className="text-link" href={value.href}>
        <RichText value={value.text} />
      </a>
    );
  return <RichText value={value.text} />;
}

function ArchiveMedia({ media }) {
  if (!media) return null;
  if (media.type === "iframe")
    return (
      <div className="archive-embed">
        <iframe
          src={media.src}
          title={media.title || "Project film"}
          loading="lazy"
          allow="fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  if (media.poster)
    return (
      <Media
        media={{ ...media, aspect: media.aspect || 16 / 9 }}
        sizes="(max-width:599px) 100vw, 66vw"
      />
    );
  if (media.src && !media.src.endsWith(".mp4"))
    return (
      <div className="archive-image">
        <Image
          src={mediaUrl(media.src)}
          alt={media.alt || ""}
          width={media.width || 1920}
          height={media.height || 1080}
          unoptimized
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    );
  return null;
}

export default function EditorialPage({ page, route, print = false }) {
  const archive = route.includes("/old-projects/");
  return (
    <div className={print ? "print-cv" : undefined}>
      <Header />
      <main
        id="main-content"
        className={`editorial-page ${archive ? "archive-page" : ""}`}
      >
        <header>
          <p className="label">
            {archive
              ? "Project archive"
              : route === "/other/cv"
                ? "Curriculum vitae"
                : "Krystof Jezek"}
          </p>
          {!page.blocks.some((b) => b.type === "h1") && (
            <h1 tabIndex={-1}>{page.title}</h1>
          )}
          {route === "/other/cv" && !print && (
            <RouteLink className="text-link print-link" href="/other/cv-print">
              Print version
            </RouteLink>
          )}
        </header>
        <div className="editorial-body">
          {page.blocks.map((block, index) => {
            if (block.type === "media")
              return (
                <ArchiveMedia key={index} media={page.media[block.index]} />
              );
            if (block.type === "link")
              return (
                <p key={index}>
                  <RichText value={block.content} />
                </p>
              );
            const text =
              typeof block.content?.[0] === "string" ? block.content[0] : "";
            const Tag =
              block.type === "h1"
                ? "h1"
                : block.type?.startsWith("h") || text.startsWith("/ ")
                  ? "h2"
                  : "p";
            return (
              <Tag
                key={index}
                tabIndex={Tag === "h1" ? -1 : undefined}
                id={text === "How to apply?" ? "apply" : undefined}
              >
                <RichText value={block.content} />
              </Tag>
            );
          })}
        </div>
        {page.overview.length > 0 && (
          <dl className="editorial-details">
            {page.overview.map((item) => (
              <div key={item.label}>
                <dt className="label">{item.label}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        )}
        {print && (
          <p className="print-instruction">
            Use your browser’s Print command to save or print this CV.
          </p>
        )}
      </main>
    </div>
  );
}
