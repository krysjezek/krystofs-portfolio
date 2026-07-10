import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmbedVideo from '@/components/EmbedVideo'
import JsonLd from '@/components/JsonLd'
import CaseStudySummary from '@/components/CaseStudySummary'
import { pageSeo, pageStructuredData } from '../../seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''
const PATH = '/services/mixed-reality'

const serviceOverview = [
  {
    label: 'What it is',
    answer: 'A live-action campaign film enhanced with CGI so an impossible event feels grounded in a real location.',
  },
  {
    label: 'Who it is for',
    answer: 'Brands and agencies planning social launches, retail moments, store openings, or location-led campaign ideas that need to stop the scroll.',
  },
  {
    label: 'Best fit',
    answer: 'Concepts where the CGI is connected to the brand, product, or place—not added as a visual trick without a campaign idea behind it.',
  },
  {
    label: 'Deliverables',
    answer: 'Finished FOOH or mixed reality films in the agreed aspect ratios, with cutdowns, clean versions, stills, and platform variants when required.',
  },
  {
    label: 'What I need',
    answer: 'The campaign objective, target locations, desired launch formats, available footage or shoot plan, brand assets, and any product CAD or 3D files.',
  },
  {
    label: 'Process',
    answer: 'I develop the CGI approach around the approved concept, advise on plates and camera movement, then track, animate, simulate, light, render, and composite the final scenes.',
  },
  {
    label: 'Production',
    answer: 'I lead the CGI production directly and bring in independent specialists for filming, complex simulation, or compositing when the scope calls for them.',
  },
  {
    label: 'Formats',
    answer: 'Campaigns can be planned for Instagram, TikTok, YouTube, digital out-of-home, launch presentations, and wider horizontal or vertical edits.',
  },
]

export const metadata = {
  title: 'FOOH & Mixed Reality',
  description: 'FOOH and mixed reality campaign production by independent CGI designer Krystof Jezek, combining live-action plates with CGI, tracking, animation, and compositing.',
  ...pageSeo(PATH),
}

export const dynamic = 'force-static'

export default function MixedRealityPage() {
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
                    <div className="label green">Additional capability</div>
                    <h1 className="heading-h1">FOOH &amp; Mixed Reality</h1>
                  </div>
                  <div className="back-block">
                    <Link href="/" className="button inverted-border w-button">Back to home</Link>
                  </div>
                </div>
                <div className="div-block-55">
                  <p className="paragraph header">I am an independent CGI designer combining live-action plates with tracking, animation, simulation, and compositing to create FOOH and mixed reality films for brands and agencies. I plan each production around a clear campaign idea, location, camera move, delivery format, and launch context so the CGI feels connected to the brand rather than added as a standalone effect.<br /></p>
                </div>
              </div>
            </div>
          </div>
          <CaseStudySummary items={serviceOverview} ariaLabel="FOOH and mixed reality service overview" />
          <div className="w-layout-blockcontainer container-3 w-container">
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-0405f909" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid services" data-reveal-group>
                <div id="w-node-_771e6bc8-f93d-6c0b-e588-52ea025093ed-0405f909" data-reveal className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_barbour_london%20updated.jpg"
                    posterAlt="Barbour Icons in Quilting London FOOH CGI campaign visual"
                    title="Barbour London FOOH CGI campaign"
                    srcH265="/videos/h265/cgi_barbour_london%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_barbour_london%20updated.webm"
                    srcMp4="/videos/h264/cgi_barbour_london%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/barbour.png'} alt="Barbour logo" className="logo-service" />
                    <h2 className="service-heading">Icons in Quilting London</h2>
                  </div>
                </div>
                <div id="w-node-_82a68808-56d6-fe09-94d1-0da41d33cb7a-0405f909" data-reveal className="wrapper services _1x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_antartcica.jpg"
                    posterAlt="Arctic Landscape mixed reality CGI campaign visual"
                    title="Arctic Landscape mixed reality CGI visual"
                    srcH265="/videos/h265/cgi_antartcica-web2.mp4"
                    srcAv1="/videos/av1/cgi_antartcica.webm"
                    srcMp4="/videos/h264/cgi_antartcica-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"></div>
                      <p className="services-name">Kryštof Ježek</p>
                    </div>
                    <h2 className="service-heading">Arctic Landscape</h2>
                  </div>
                </div>
                <div id="w-node-b7a28be6-ef33-6a27-bebf-9999f2a54f80-0405f909" data-reveal className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_presto%20updated.jpg"
                    posterAlt="Bouncy Greens mixed reality CGI advertising visual"
                    title="Bouncy Greens mixed reality CGI visual"
                    srcH265="/videos/h265/cgi_presto%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_presto%20updated.webm"
                    srcMp4="/videos/h264/cgi_presto%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"></div>
                      <p className="services-name">Kryštof Ježek</p>
                    </div>
                    <h2 className="service-heading">Bouncy Greens</h2>
                  </div>
                </div>
                <div id="w-node-_63704fad-9a00-11de-8787-11772553c264-0405f909" data-reveal className="wrapper services _1x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_tweezers.jpg"
                    posterAlt="Gemstone mixed reality CGI product visual"
                    title="Gemstone mixed reality CGI product visual"
                    srcH265="/videos/h265/cgi_tweezers-web2.mp4"
                    srcAv1="/videos/av1/cgi_tweezers.webm"
                    srcMp4="/videos/h264/cgi_tweezers-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div>
                      <div className="div-block-143-copy">
                        <div className="div-block-144"></div>
                        <p className="services-name">Kryštof Ježek</p>
                      </div>
                    </div>
                    <h2 className="service-heading">Gemstone</h2>
                  </div>
                </div>
                <div id="w-node-_658bcf9b-8e4e-fd37-9d38-01f9eaf63127-0405f909" data-reveal className="wrapper services _1x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_frasers%20updated.jpg"
                    posterAlt="Barbour Frasers mixed reality FOOH campaign visual"
                    title="Barbour Frasers mixed reality campaign"
                    srcH265="/videos/h265/cgi_frasers%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_frasers%20updated.webm"
                    srcMp4="/videos/h264/cgi_frasers%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/barbour.png'} alt="Barbour logo" className="logo-service" />
                    <h2 className="service-heading">Frasers Collab</h2>
                  </div>
                </div>
                <div id="w-node-_48e9697f-9ff7-ea7f-41a7-abbf2ec44513-0405f909" data-reveal className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_spojka%20updated.jpg"
                    posterAlt="Revitalizing Serum mixed reality CGI product campaign visual"
                    title="Revitalizing Serum mixed reality CGI campaign"
                    srcH265="/videos/h265/cgi_spojka%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_spojka%20updated.webm"
                    srcMp4="/videos/h264/cgi_spojka%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <div className="div-block-143-copy">
                      <div className="div-block-144"></div>
                      <p className="services-name">Kryštof Ježek</p>
                    </div>
                    <h2 className="service-heading">Revitalizing Serum </h2>
                  </div>
                </div>
                <div id="w-node-f4bf5310-69ca-23ec-6381-b4a29f6e503f-0405f909" data-reveal className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_barbour_ny%20updated.jpg"
                    posterAlt="Barbour Icons in Quilting New York FOOH CGI campaign visual"
                    title="Barbour New York FOOH CGI campaign"
                    srcH265="/videos/h265/cgi_barbour_ny%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_barbour_ny%20updated.webm"
                    srcMp4="/videos/h264/cgi_barbour_ny%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/barbour.png'} alt="Barbour logo" className="logo-service" />
                    <h2 className="service-heading">Icons in Quilting NYC</h2>
                  </div>
                </div>
                <div id="w-node-dfa12d4c-f844-068c-6466-0c8f47a3ee86-0405f909" data-reveal className="wrapper services _1x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_onitsuka.jpg"
                    posterAlt="Onitsuka Tiger store opening mixed reality CGI campaign visual"
                    title="Onitsuka Tiger mixed reality CGI campaign"
                    srcH265="/videos/h265/cgi_onitsuka-web2.mp4"
                    srcAv1="/videos/av1/cgi_onitsuka.webm"
                    srcMp4="/videos/h264/cgi_onitsuka-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/onitsuka-tiger-logo.svg'} alt="Onitsuka Tiger logo" className="logo-service" />
                    <h2 className="service-heading">New Store Opening</h2>
                  </div>
                </div>
                <div id="w-node-e54e911f-14c3-d9cb-5136-c98eacbb4df1-0405f909" data-reveal className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_barbour_seoul%20updated.jpg"
                    posterAlt="Barbour Icons in Quilting Seoul FOOH CGI campaign visual"
                    title="Barbour Seoul FOOH CGI campaign"
                    srcH265="/videos/h265/cgi_barbour_seoul%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_barbour_seoul%20updated.webm"
                    srcMp4="/videos/h264/cgi_barbour_seoul%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/barbour.png'} alt="Barbour logo" className="logo-service" />
                    <h2 className="service-heading">Icons in Quilting Seoul</h2>
                  </div>
                </div>
                <div id="w-node-_4780d184-593d-0ec2-7732-3f701fb2249b-0405f909" data-reveal className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_yogrillz%20updated.jpg"
                    posterAlt="YoGrillz Sparta Championship Ring mixed reality CGI product visual"
                    title="YoGrillz mixed reality CGI product visual"
                    srcH265="/videos/h265/cgi_yogrillz%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_yogrillz%20updated.webm"
                    srcMp4="/videos/h264/cgi_yogrillz%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146">
                    <h2 className="label services">YoGrillz</h2>
                    <h2 className="service-heading">Sparta Championship Ring</h2>
                  </div>
                </div>
                <div id="w-node-_1cf73b13-bb8c-6dda-e871-20f3a9edf90a-0405f909" data-reveal className="wrapper services _1x2 mobile-square">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_barbour_shanghai%20updated.jpg"
                    posterAlt="Barbour Icons in Quilting Shanghai FOOH CGI campaign visual"
                    title="Barbour Shanghai FOOH CGI campaign"
                    srcH265="/videos/h265/cgi_barbour_shanghai%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_barbour_shanghai%20updated.webm"
                    srcMp4="/videos/h264/cgi_barbour_shanghai%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/barbour.png'} alt="Barbour logo" className="logo-service" />
                    <h2 className="service-heading">Icons in Quilting Shanghai</h2>
                  </div>
                </div>
                <div id="w-node-_601a700b-cf17-6109-2656-2c4949514c6c-0405f909" data-reveal className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_chainer%20updated.jpg"
                    posterAlt="Chainer launch video mixed reality CGI campaign visual"
                    title="Chainer mixed reality CGI launch video"
                    srcH265="/videos/h265/cgi_chainer%20updated-web2.mp4"
                    srcAv1="/videos/av1/cgi_chainer%20updated.webm"
                    srcMp4="/videos/h264/cgi_chainer%20updated-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/chainer-logo.png'} alt="Chainer logo" className="logo-service" />
                    <h2 className="service-heading">Launch Video</h2>
                  </div>
                </div>
                <div id="w-node-ce44de3c-425e-2711-c1b3-ba896ed38c80-0405f909" data-reveal className="wrapper services _1x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cgi_yonex.jpg"
                    posterAlt="Yonex mixed reality CGI advertising campaign visual"
                    title="Yonex mixed reality CGI campaign"
                    srcH265="/videos/h265/cgi_yonex-web-2.mp4"
                    srcAv1="/videos/av1/cgi_yonex.webm"
                    srcMp4="/videos/h264/cgi_yonex-fallback.mp4"
                  /></div>
                  <div className="div-block-146"><img loading="lazy" src={CDN + '/images/yonex-logo-1.png'} alt="Yonex logo" className="logo-service" />
                    <h2 className="service-heading">S&amp;D Campaign </h2>
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
