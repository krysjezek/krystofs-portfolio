import data from "@/content/worlds.json";
import icons from "@/content/icons.json";
import Header from "./Header";
import Media from "./Media";
import { ExternalLink } from "./Links";
import JsonLd from "@/components/JsonLd";
import { pageStructuredData } from "@/app/seo";

export default function Worlds() {
  return (
    <>
      <Header />
      <main id="main-content" className="worlds-service">
        <JsonLd data={pageStructuredData("/services/3d-environments")} />
        <header className="worlds-introduction editorial-three">
          <div>
            <h1 tabIndex={-1}>3D Worlds</h1>
            <p>Art-directed CGI for brands and studios</p>
            <span className="label">Service · CGI / Motion / Stills</span>
          </div>
          <p>
            I create CGI worlds around brands, products, identities and digital
            experiences.
          </p>
          <p>
            Each world is designed as a coherent visual system that can extend
            across motion, stills, web, launches and campaign content.
          </p>
        </header>
        <div className="case-hero">
          <Media
            media={{
              poster: "/videos/posters/cgi-environments.jpg",
              srcH265: "/videos/h265/cgi-environments-web.mp4",
              srcAv1: "/videos/av1/cgi-environments.webm",
              srcMp4: "/videos/h264/cgi-environments-fallback.mp4",
              aspect: 1.6,
              alt: "Art-directed CGI worlds showreel",
            }}
            priority
          />
        </div>
        <p className="film-caption label">
          3D Worlds showreel · A collection of art-directed CGI worlds
        </p>
        <dl className="worlds-overview editorial-three">
          {data.overview.slice(1).map((item) => (
            <div key={item.label}>
              <dt className="label">{item.label}</dt>
              <dd>{item.answer}</dd>
            </div>
          ))}
        </dl>
        <section className="worlds-deliverables editorial-three">
          <div>
            <span className="label">One world, many outputs</span>
            <h2>Built as a visual system</h2>
            <p>
              A recognisable world keeps the project visually consistent while
              adapting to the places where it needs to live.
            </p>
          </div>
          <ul>
            {data.outputs.slice(0, 3).map((text, i) => (
              <li key={text}>
                <span className="label">0{i + 1}</span>
                {text}
              </li>
            ))}
          </ul>
          <ul>
            {data.outputs.slice(3).map((text, i) => (
              <li key={text}>
                <span className="label">0{i + 4}</span>
                {text}
              </li>
            ))}
          </ul>
        </section>
        <div className="worlds-gallery-intro editorial-three">
          <h2>Selected worlds</h2>
          <p>
            Brand environments, product stories and campaign imagery made in
            collaboration with design studios and creative teams.
          </p>
        </div>
        <div className="worlds-gallery">
          {Array.from({ length: 6 }, (_, row) => (
            <div
              className={`worlds-pair ${row % 2 ? "reverse" : ""}`}
              key={row}
            >
              {data.worlds.slice(row * 2, row * 2 + 2).map((world) => (
                <figure key={world.title}>
                  <Media
                    media={{
                      ...world,
                      poster: world.preview || world.poster,
                      aspect: world.size === "wide" ? 2 : 1,
                    }}
                    sizes={
                      world.size === "wide"
                        ? "(max-width:599px) 100vw, 66vw"
                        : "(max-width:599px) 100vw, 33vw"
                    }
                  />
                  <figcaption>
                    <span>{world.title}</span>
                    <span>{world.credit}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
        <section className="worlds-process">
          <header>
            <span className="label">From brief to final formats</span>
            <h2>How it works</h2>
          </header>
          <ol>
            {data.process.map((step) => (
              <li key={step.number}>
                <h3>
                  {step.number} · {step.title}
                </h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="worlds-fit editorial-three">
          <h2>The right approach for your project</h2>
          <div>
            <span className="label">Best fit</span>
            <p>
              This service works best when a project has a strong identity,
              product or story that deserves its own visual language.
            </p>
          </div>
          <div>
            <ExternalLink
              href="https://www.motionmockups.com/"
              icon={icons.motionMockups}
            >
              Motion Mockups
            </ExternalLink>
            <p>
              Motion Mockups is my library of ready-made animated mockups. Use
              it when the project needs a polished presentation without a fully
              custom world.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
