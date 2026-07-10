import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmbedVideo from '@/components/EmbedVideo'
import JsonLd from '@/components/JsonLd'
import CaseStudySummary from '@/components/CaseStudySummary'
import { pageSeo, pageStructuredData } from '../../seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''
const PATH = '/services/3d-environments'

const serviceOverview = [
  {
    label: 'What it is',
    answer: 'A custom CGI environment designed and animated around the identity, website, or product you want to present.',
  },
  {
    label: 'Who it is for',
    answer: 'Branding, web, and design agencies that need a distinctive alternative to stock mockups for case studies, launches, and pitches.',
  },
  {
    label: 'Best fit',
    answer: 'Projects with a strong visual identity that deserve their own art-directed world rather than a neutral device or packaging template.',
  },
  {
    label: 'Deliverables',
    answer: 'Final motion assets in the agreed campaign formats, with loopable edits, still frames, and alternate crops included when they are part of the brief.',
  },
  {
    label: 'What I need',
    answer: 'Your final design files, brand guidelines, the key story you want to communicate, and a list of the screens or applications that matter most.',
  },
  {
    label: 'Process',
    answer: 'I define the visual concept and references, develop the CGI look, agree on cameras and motion, then animate, render, and finish the selected direction.',
  },
  {
    label: 'Production',
    answer: 'I handle look development, modelling, lighting, animation, rendering, and post-production, bringing in specialist collaborators only when the scope requires it.',
  },
  {
    label: 'Formats',
    answer: 'The same CGI environment can be adapted for widescreen case studies, vertical social edits, website loops, presentations, and high-resolution stills.',
  },
]

export const metadata = {
  title: 'Custom Motion Mockups for Agencies',
  description: 'Custom animated CGI and 3D mockups by independent CGI designer Krystof Jezek, built for branding, web, and design agency case studies.',
  ...pageSeo(PATH),
}

export const dynamic = 'force-static'

export default function ThreeDEnvironments() {

  return (
    <>
      <Navbar />
      <JsonLd data={pageStructuredData(PATH)} />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section id="main-content" role="main" className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="work-header-wrap" data-reveal="hero">
              <div className="work-header-container">
                <div className="work-h1-wrap">
                  <div className="div-block-112">
                    <div className="label green">For branding, web, and design agencies</div>
                    <h1 className="heading-h1">Custom Motion Mockups</h1>
                  </div>
                  <div className="back-block">
                    <Link href="/" className="button inverted-border w-button">Back to home</Link>
                  </div>
                </div>
                <div className="div-block-55">
                  <p className="paragraph header">I am an independent CGI designer creating custom animated mockups for agencies to present their work. Each one is an art-directed 3D environment built around the project&#x27;s own identity, story, and applications. <a href="https://motionmockups.com/" target="_blank" rel="noopener noreferrer" className="link green">Motion Mockups</a> is the ready-made version I sell online; this service is designed from scratch for a specific case study or launch.<br /></p>
                </div>
              </div>
            </div>
          </div>
          <CaseStudySummary items={serviceOverview} ariaLabel="Custom motion mockups service overview" />
          <div className="w-layout-blockcontainer container-3 w-container">
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-033eedbd" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid services" data-reveal-group>
                <div id="w-node-_771e6bc8-f93d-6c0b-e588-52ea025093ed-033eedbd" className="wrapper services" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_homio.jpg"
                    posterAlt="Homio Smart Home CGI 3D environment visualization"
                    title="Homio Smart Home 3D environment visualization"
                    srcH265="/videos/h265/volkov_homio-web2.mp4"
                    srcAv1="/videos/av1/volkov_homio.webm"
                    srcMp4="/videos/h264/volkov_homio-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144 lubos"></div>
                      <p className="services-name">Lubos Volkov</p>
                    </div>
                    <h2 className="service-heading">Homio Smart Home</h2>
                  </div>
                </div>
                <div id="w-node-_5c64c00a-c613-2787-7ad8-c803ce05fbdf-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_aptos-2x1.jpg"
                    posterAlt="Aptos Foundation CGI 3D environment brand campaign visual"
                    title="Aptos Foundation 3D environment visual"
                    srcH265="/videos/h265/ashfall_aptos-2x1-web.mp4"
                    srcAv1="/videos/av1/ashfall_aptos-2x1.webm"
                    srcMp4="/videos/h264/ashfall_aptos-2x1-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/ashfall-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Ashfall Studio</p>
                    </div>
                    <h2 className="service-heading">Aptos Foundation</h2>
                  </div>
                </div>
                <div id="w-node-_1c4dce6c-05d5-0083-3b7d-fd948d7d12c0-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/outpost_explorer-2x1.jpg"
                    posterAlt="Primland Explore cinematic CGI environment"
                    title="Primland Explore CGI environment"
                    srcH265="/videos/h265/outpost_explorer-2x1-web.mp4"
                    srcAv1="/videos/av1/outpost_explorer-2x1.webm"
                    srcMp4="/videos/h264/outpost_explorer-2x1-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/outpost-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Outpøst®</p>
                    </div>
                    <h2 className="service-heading">Primland Explore</h2>
                  </div>
                </div>
                <div id="w-node-a2a14c9c-f451-8f52-02aa-602a5b142f09-033eedbd" className="wrapper services" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cn_skyll-1x1.jpg"
                    posterAlt="Skyll CGI environment and 3D brand visual"
                    title="Skyll 3D environment visual"
                    srcH265="/videos/h265/cn_skyll-1x1-web.mp4"
                    srcAv1="/videos/av1/cn_skyll-1x1.webm"
                    srcMp4="/videos/h264/cn_skyll-1x1-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144 lubos"><img src={CDN + '/images/creative_nights_superatelier_logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Creative Nights</p>
                    </div>
                    <h2 className="service-heading">Skyll</h2>
                  </div>
                </div>
                <div id="w-node-_4c251230-b2e3-f3ee-ddae-2d99f3c573c3-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/outpost_resort-2x1.jpg"
                    posterAlt="Primland Resort CGI architectural environment visualization"
                    title="Primland Resort 3D environment visualization"
                    srcH265="/videos/h265/outpost_resort-2x1-web.mp4"
                    srcAv1="/videos/av1/outpost_resort-2x1.webm"
                    srcMp4="/videos/h264/outpost_resort-2x1-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/outpost-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Outpøst®</p>
                    </div>
                    <h2 className="service-heading">Primland Resort</h2>
                  </div>
                </div>
                <div id="w-node-_82a68808-56d6-fe09-94d1-0da41d33cb7a-033eedbd" className="wrapper services" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_jimu.jpg"
                    posterAlt="Jimu CGI 3D environment visualization"
                    title="Jimu 3D environment visualization"
                    srcH265="/videos/h265/volkov_jimu-web2.mp4"
                    srcAv1="/videos/av1/volkov_jimu.webm"
                    srcMp4="/videos/h264/volkov_jimu-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144 lubos"></div>
                      <p className="services-name">Lubos Volkov</p>
                    </div>
                    <h2 className="service-heading">Jimu</h2>
                  </div>
                </div>
                <div id="w-node-b7a28be6-ef33-6a27-bebf-9999f2a54f80-033eedbd" className="wrapper services _1x2" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/yiskra_veha.jpg"
                    posterAlt="Veha Architects architectural CGI environment visualization"
                    title="Veha Architects CGI environment"
                    srcH265="/videos/h265/yiskra_veha-web2.mp4"
                    srcAv1="/videos/av1/yiskra_veha.webm"
                    srcMp4="/videos/h264/yiskra_veha-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Yiskra Studio</p>
                    </div>
                    <h2 className="service-heading">Veha Architects</h2>
                  </div>
                </div>
                <div id="w-node-cfef4185-f5fe-f34c-a518-b6a1264ae5fa-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_ccus%20updated.jpg"
                    posterAlt="Heidelberg CCUS industrial CGI 3D environment"
                    title="Heidelberg CCUS CGI environment"
                    srcH265="/videos/h265/ashfall_ccus%20updated-web2.mp4"
                    srcAv1="/videos/av1/ashfall_ccus%20updated.webm"
                    srcMp4="/videos/h264/ashfall_ccus%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/ashfall-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Ashfall Studio</p>
                    </div>
                    <h2 className="service-heading">Heidelberg CCUS</h2>
                  </div>
                </div>
                <div id="w-node-_7819c8b2-ed3d-b7b3-ccd3-16b05096f26e-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_promo%20updated.jpg"
                    posterAlt="Ashfall launch video CGI environment and 3D motion design"
                    title="Ashfall launch video CGI environment"
                    srcH265="/videos/h265/ashfall_promo%20updated-web2.mp4"
                    srcAv1="/videos/av1/ashfall_promo%20updated.webm"
                    srcMp4="/videos/h264/ashfall_promo%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/ashfall-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Ashfall Studio</p>
                    </div>
                    <h2 className="service-heading">Ashfall Launch Video</h2>
                  </div>
                </div>
                <div id="w-node-e2f052fc-4737-93e8-4333-50074469bd4f-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_fifthrow%20updated.jpg"
                    posterAlt="Fifthrow CGI 3D environment brand campaign visual"
                    title="Fifthrow CGI environment visual"
                    srcH265="/videos/h265/ashfall_fifthrow%20updated-web.mp4"
                    srcAv1="/videos/av1/ashfall_fifthrow%20updated.webm"
                    srcMp4="/videos/h264/ashfall_fifthrow%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/ashfall-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Ashfall Studio</p>
                    </div>
                    <h2 className="service-heading">Fifthrow</h2>
                  </div>
                </div>
                <div id="w-node-_640a85e8-b0e3-cbfe-a1b0-4c003c5bed42-033eedbd" className="wrapper services" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_sparta.jpg"
                    posterAlt="Sparta CGI 3D environment visualization"
                    title="Sparta CGI environment visualization"
                    srcH265="/videos/h265/volkov_sparta-web2.mp4"
                    srcAv1="/videos/av1/volkov_sparta.webm"
                    srcMp4="/videos/h264/volkov_sparta-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144 lubos"></div>
                      <p className="services-name">Lubos Volkov</p>
                    </div>
                    <h2 className="service-heading">Sparta</h2>
                  </div>
                </div>
                <div id="w-node-_5028a3cc-8e67-9745-4b8d-d9f297cf48a3-033eedbd" className="wrapper services _2x1" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_hyperframe%20updated.jpg"
                    posterAlt="Hyperframe CGI 3D environment brand visual"
                    title="Hyperframe CGI environment visual"
                    srcH265="/videos/h265/ashfall_hyperframe%20updated-web-2.mp4"
                    srcAv1="/videos/av1/ashfall_hyperframe%20updated.webm"
                    srcMp4="/videos/h264/ashfall_hyperframe%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"><img src={CDN + '/images/ashfall-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                      <p className="services-name">Ashfall Studio</p>
                    </div>
                    <h2 className="service-heading">Hyperframe</h2>
                  </div>
                </div>
                <div className="wrapper services hide" data-reveal>
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_netgear.jpg"
                    posterAlt="Netgear CGI 3D environment product visualization"
                    title="Netgear CGI environment visualization"
                    srcH265="/videos/h265/volkov_netgear-web2.mp4"
                    srcAv1="/videos/av1/volkov_netgear.webm"
                    srcMp4="/videos/h264/volkov_netgear-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144 lubos"></div>
                      <p className="services-name">Lubos Volkov</p>
                    </div>
                    <h2 className="service-heading">Netgear</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="liner bottom"></div>
        </section>
      </div>
      <Footer />
    </>
  )
}
