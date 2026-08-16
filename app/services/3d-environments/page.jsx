import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmbedVideo from '@/components/EmbedVideo'
import JsonLd from '@/components/JsonLd'
import CaseStudySummary from '@/components/CaseStudySummary'
import CopyEmailButton from '@/components/CopyEmailLink'
import { pageSeo, pageStructuredData } from '../../seo'

const PATH = '/services/3d-environments'
const CALENDLY_URL = 'https://calendly.com/krystof-jezek/30min'

const serviceOverview = [
  {
    label: 'What it is',
    answer: 'An art-directed CGI world built around a brand, product, identity, or digital experience.',
  },
  {
    label: 'Best fit',
    answer: 'Launches, campaigns, case studies, and brand moments that need a distinctive visual language of their own.',
  },
  {
    label: 'Core output',
    answer: 'A hero film or loop, shaped around the story, applications, and formats that matter most to the project.',
  },
  {
    label: 'Extensions',
    answer: 'The same world can become stills, vertical edits, website assets, product imagery, and presentation content.',
  },
]

const outputs = [
  'Hero films and launch sequences',
  'Short loops and vertical edits',
  'High-resolution campaign stills',
  'Website and case-study assets',
  'Product and merchandise imagery',
  'Presentation and pitch formats',
]

const process = [
  {
    number: '01',
    title: 'Brief & references',
    copy: 'We define the story, applications, audience, formats, and visual territory the world needs to hold together.',
  },
  {
    number: '02',
    title: 'World concept',
    copy: 'I develop a clear creative direction around the identity or product, then align on the strongest route.',
  },
  {
    number: '03',
    title: 'Look development',
    copy: 'Materials, lighting, composition, cameras, and key frames establish the visual system before animation.',
  },
  {
    number: '04',
    title: 'Production',
    copy: 'I handle modelling, animation, rendering, and post-production, with specialist collaborators when needed.',
  },
  {
    number: '05',
    title: 'Format extensions',
    copy: 'The finished world is adapted into the agreed motion, still, social, website, and presentation formats.',
  },
]

const selectedWorlds = [
  {
    title: 'Aptos Foundation',
    credit: 'With Ashfall Studio',
    size: 'wide',
    poster: '/videos/posters/ashfall_aptos-2x1.jpg',
    alt: 'Aptos Foundation CGI brand world',
    srcH265: '/videos/h265/ashfall_aptos-2x1-web.mp4',
    srcAv1: '/videos/av1/ashfall_aptos-2x1.webm',
    srcMp4: '/videos/h264/ashfall_aptos-2x1-fallback.mp4',
  },
  {
    title: 'Homio Smart Home',
    credit: 'With Lubos Volkov',
    size: 'square',
    poster: '/videos/posters/volkov_homio.jpg',
    alt: 'Homio Smart Home CGI brand world',
    srcH265: '/videos/h265/volkov_homio-web2.mp4',
    srcAv1: '/videos/av1/volkov_homio.webm',
    srcMp4: '/videos/h264/volkov_homio-fallback.mp4',
  },
  {
    title: 'Skyll',
    credit: 'With Creative Nights',
    size: 'square',
    poster: '/videos/posters/cn_skyll-1x1.jpg',
    alt: 'Skyll CGI brand world',
    srcH265: '/videos/h265/cn_skyll-1x1-web.mp4',
    srcAv1: '/videos/av1/cn_skyll-1x1.webm',
    srcMp4: '/videos/h264/cn_skyll-1x1-fallback.mp4',
  },
  {
    title: 'Primland Explore',
    credit: 'With Outpøst®',
    size: 'wide',
    poster: '/videos/posters/outpost_explorer-2x1.jpg',
    alt: 'Primland Explore cinematic CGI world',
    srcH265: '/videos/h265/outpost_explorer-2x1-web.mp4',
    srcAv1: '/videos/av1/outpost_explorer-2x1.webm',
    srcMp4: '/videos/h264/outpost_explorer-2x1-fallback.mp4',
  },
  {
    title: 'Primland Resort',
    credit: 'With Outpøst®',
    size: 'wide',
    poster: '/videos/posters/outpost_resort-2x1.jpg',
    alt: 'Primland Resort architectural CGI world',
    srcH265: '/videos/h265/outpost_resort-2x1-web.mp4',
    srcAv1: '/videos/av1/outpost_resort-2x1.webm',
    srcMp4: '/videos/h264/outpost_resort-2x1-fallback.mp4',
  },
  {
    title: 'Jimu',
    credit: 'With Lubos Volkov',
    size: 'square',
    poster: '/videos/posters/volkov_jimu.jpg',
    alt: 'Jimu CGI brand world',
    srcH265: '/videos/h265/volkov_jimu-web2.mp4',
    srcAv1: '/videos/av1/volkov_jimu.webm',
    srcMp4: '/videos/h264/volkov_jimu-fallback.mp4',
  },
  {
    title: 'Sparta',
    credit: 'With Lubos Volkov',
    size: 'square',
    poster: '/videos/posters/volkov_sparta.jpg',
    alt: 'Sparta CGI brand world',
    srcH265: '/videos/h265/volkov_sparta-web2.mp4',
    srcAv1: '/videos/av1/volkov_sparta.webm',
    srcMp4: '/videos/h264/volkov_sparta-fallback.mp4',
  },
  {
    title: 'Heidelberg CCUS',
    credit: 'With Ashfall Studio',
    size: 'wide',
    poster: '/videos/posters/ashfall_ccus%20updated.jpg',
    alt: 'Heidelberg CCUS industrial CGI world',
    srcH265: '/videos/h265/ashfall_ccus%20updated-web2.mp4',
    srcAv1: '/videos/av1/ashfall_ccus%20updated.webm',
    srcMp4: '/videos/h264/ashfall_ccus%20updated-fallback.mp4',
  },
  {
    title: 'Ashfall Launch',
    credit: 'With Ashfall Studio',
    size: 'wide',
    poster: '/videos/posters/ashfall_promo%20updated.jpg',
    alt: 'Ashfall launch CGI world',
    srcH265: '/videos/h265/ashfall_promo%20updated-web2.mp4',
    srcAv1: '/videos/av1/ashfall_promo%20updated.webm',
    srcMp4: '/videos/h264/ashfall_promo%20updated-fallback.mp4',
  },
  {
    title: 'Veha Architects',
    credit: 'With Yiskra Studio',
    size: 'square',
    poster: '/videos/posters/yiskra_veha.jpg',
    alt: 'Veha Architects architectural CGI world',
    srcH265: '/videos/h265/yiskra_veha-web2.mp4',
    srcAv1: '/videos/av1/yiskra_veha.webm',
    srcMp4: '/videos/h264/yiskra_veha-fallback.mp4',
  },
  {
    title: 'Fifthrow',
    credit: 'With Ashfall Studio',
    size: 'square',
    poster: '/videos/posters/ashfall_fifthrow%20updated.jpg',
    alt: 'Fifthrow CGI brand world',
    srcH265: '/videos/h265/ashfall_fifthrow%20updated-web.mp4',
    srcAv1: '/videos/av1/ashfall_fifthrow%20updated.webm',
    srcMp4: '/videos/h264/ashfall_fifthrow%20updated-fallback.mp4',
  },
  {
    title: 'Hyperframe',
    credit: 'With Ashfall Studio',
    size: 'wide',
    poster: '/videos/posters/ashfall_hyperframe%20updated.jpg',
    alt: 'Hyperframe CGI brand world',
    srcH265: '/videos/h265/ashfall_hyperframe%20updated-web-2.mp4',
    srcAv1: '/videos/av1/ashfall_hyperframe%20updated.webm',
    srcMp4: '/videos/h264/ashfall_hyperframe%20updated-fallback.mp4',
  },
]

export const metadata = {
  title: '3D Worlds for Brands and Studios',
  description: 'Art-directed CGI worlds by independent CGI designer Krystof Jezek, built around brands, products, identities, and digital experiences.',
  ...pageSeo(PATH),
}

export const dynamic = 'force-static'

export default function ThreeDEnvironments() {
  return (
    <>
      <Navbar />
      <JsonLd data={pageStructuredData(PATH)} />
      <div className="w-layout-blockcontainer container-2 w-container">
        <main id="main-content" className="work-main worlds-page">
          <div className="w-layout-blockcontainer container-3 w-container">
            <header className="work-header-wrap" data-reveal="hero">
              <div className="work-header-container worlds-hero">
                <div className="work-h1-wrap">
                  <div className="div-block-112 worlds-hero-title">
                    <div className="label green">For brands, creative directors, and design studios</div>
                    <h1 className="heading-h1">3D Worlds</h1>
                  </div>
                  <Link href="/" className="button inverted-border worlds-back-button">Back to home</Link>
                </div>
                <div className="worlds-hero-copy">
                  <p className="paragraph header">I create art-directed CGI worlds around brands, products, identities, and digital experiences. Each one is designed as a coherent visual system that can extend across motion, stills, web, launches, and campaign content.</p>
                  <div className="worlds-button-row">
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="button w-button">Start a project</a>
                    <CopyEmailButton className="button inverted-border">Copy email</CopyEmailButton>
                  </div>
                </div>
              </div>
            </header>

            <div className="worlds-reel" data-reveal>
              <EmbedVideo
                poster="/videos/posters/cgi-environments.jpg"
                posterAlt="A montage of art-directed CGI worlds by Krystof Jezek"
                posterSizes="(max-width: 767px) 100vw, 1400px"
                posterPriority
                title="3D Worlds showreel"
                srcH265="/videos/h265/cgi-environments-web.mp4"
                srcAv1="/videos/av1/cgi-environments.webm"
                srcMp4="/videos/h264/cgi-environments-fallback.mp4"
              />
            </div>
          </div>

          <CaseStudySummary items={serviceOverview} ariaLabel="3D Worlds service overview" />

          <div className="w-layout-blockcontainer container-3 w-container worlds-sections">
            <section className="worlds-section worlds-output-section" aria-labelledby="worlds-output-heading" data-reveal-group>
              <div className="worlds-section-heading" data-reveal>
                <div className="label green">One world, many outputs</div>
                <h2 id="worlds-output-heading" className="heading-2 nomargin">Built as a visual system</h2>
                <p className="paragraph">The value is not one isolated render. It is a recognisable world that keeps the project visually consistent while adapting to the places where it needs to live.</p>
              </div>
              <div className="worlds-output-grid">
                {outputs.map((output, index) => (
                  <div className="worlds-output-item" key={output} data-reveal>
                    <div className="label green">{String(index + 1).padStart(2, '0')}</div>
                    <h3 className="service-heading nopos">{output}</h3>
                  </div>
                ))}
              </div>
            </section>

            <section className="worlds-section" aria-labelledby="selected-worlds-heading">
              <div className="worlds-section-heading worlds-section-heading-row" data-reveal>
                <div>
                  <div className="label green">Selected work</div>
                  <h2 id="selected-worlds-heading" className="heading-2 nomargin">Selected worlds</h2>
                </div>
                <p className="paragraph">Brand environments, product stories, and campaign imagery made in collaboration with design studios and creative teams.</p>
              </div>
              <div className="worlds-proof-grid" data-reveal-group>
                {selectedWorlds.map((world) => (
                  <article className={`wrapper services worlds-proof-card ${world.size}`} key={world.title} data-reveal>
                    <div className="cb w-embed">
                      <EmbedVideo
                        poster={world.poster}
                        posterAlt={world.alt}
                        posterSizes="(max-width: 479px) 100vw, (max-width: 991px) 50vw, 66vw"
                        title={`${world.title} CGI world`}
                        srcH265={world.srcH265}
                        srcAv1={world.srcAv1}
                        srcMp4={world.srcMp4}
                      />
                    </div>
                    <div className="div-block-146 worlds-proof-overlay">
                      <p className="services-name">{world.credit}</p>
                      <h3 className="service-heading">{world.title}</h3>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="worlds-section" aria-labelledby="worlds-process-heading" data-reveal-group>
              <div className="worlds-section-heading" data-reveal>
                <div className="label green">From brief to final formats</div>
                <h2 id="worlds-process-heading" className="heading-2 nomargin">How it works</h2>
              </div>
              <div className="worlds-process-grid">
                {process.map((step) => (
                  <article className="worlds-process-card" key={step.number} data-reveal>
                    <div className="label green">{step.number}</div>
                    <h3 className="service-heading nopos">{step.title}</h3>
                    <p className="paragraph tiny">{step.copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="worlds-section worlds-fit-grid" aria-label="Service fit" data-reveal-group>
              <article className="worlds-fit-card" data-reveal>
                <div className="label green">Best fit</div>
                <h2 className="heading-2 nomargin">When the world is part of the idea</h2>
                <p className="paragraph">This service works best when a project has a strong identity, product, or story that deserves its own visual language—not a neutral stage borrowed from somewhere else.</p>
              </article>
              <article className="worlds-fit-card" data-reveal>
                <div className="label green">Ready-made alternative</div>
                <h2 className="heading-2 nomargin">Need something faster?</h2>
                <p className="paragraph"><a href="https://motionmockups.com/" target="_blank" rel="noopener noreferrer" className="link green">Motion Mockups</a> is my library of ready-made animated mockups. Use it when the project needs a polished presentation without a fully custom world.</p>
              </article>
            </section>

            <section className="worlds-cta" aria-labelledby="worlds-cta-heading" data-reveal>
              <div className="worlds-cta-copy">
                <div className="label green">Have a project in mind?</div>
                <h2 id="worlds-cta-heading" className="heading-2 nomargin">Let’s build the world around it.</h2>
                <p className="paragraph">Send over the identity, product, or idea and I’ll help shape the right CGI approach, scope, and outputs.</p>
              </div>
              <div className="worlds-button-row worlds-cta-buttons">
                <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="button w-button">Book a call</a>
                <CopyEmailButton className="button inverted-border">Copy email</CopyEmailButton>
              </div>
            </section>
          </div>
          <div className="liner bottom"></div>
        </main>
      </div>
      <Footer />
    </>
  )
}
