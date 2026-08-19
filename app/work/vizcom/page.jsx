import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WorkPageHeader from '@/components/WorkPageHeader'
import EmbedVideo from '@/components/EmbedVideo'
import JsonLd from '@/components/JsonLd'
import CaseStudySummary from '@/components/CaseStudySummary'
import { pageSeo, pageStructuredData } from '../../seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''
const PATH = '/work/vizcom'

const caseStudySummary = [
  {
    label: 'Role',
    answer: '3D environment design, look development, animation, and rendering for a moving Vizcom brand mockup.',
  },
  {
    label: 'Brief',
    answer: 'Extend Outland\'s identity into a dynamic workshop world where Vizcom feels actively used, with branded tools, stationery, screens, and merchandise woven through the space.',
  },
  {
    label: 'Process',
    answer: 'I built a detailed studio and tabletop environment, translated the identity across tactile objects, and choreographed the camera from wide spatial views into close product moments.',
  },
  {
    label: 'Result',
    answer: 'A 32-second animated mockup and still-image set that presents Vizcom as a living creative system rather than a collection of static applications.',
  },
]

export const metadata = {
  title: 'Vizcom — Dynamic 3D Brand World Mockup',
  description: 'A dynamic 3D environment and animated brand mockup for Vizcom, created for design studio Outland.',
  ...pageSeo(PATH),
}

export const dynamic = 'force-static'

function CaseStudyImage({ src, alt }) {
  return (
    <div className="wrapper" data-reveal>
      <Image
        src={CDN + src}
        alt={alt}
        width={1920}
        height={1080}
        sizes="(max-width: 991px) 100vw, 94vw"
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

export default function VizcomPage() {
  return (
    <>
      <Navbar />
      <JsonLd data={pageStructuredData(PATH)} />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section id="main-content" role="main" className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <WorkPageHeader label="Vizcom" title="Vizcom — Dynamic 3D Brand World Mockup" publicationDate="August 2026" data-reveal="hero">
              <div className="div-block-55">
                <p className="paragraph header">
                  <a href="https://t-bi.link/outland" target="_blank" rel="noopener noreferrer" className="link green" data-cursor="Visit">Outland</a> invited me to bring its new identity for <a href="https://vizcom.com/" target="_blank" rel="noopener noreferrer" className="link green" data-cursor="Visit">Vizcom</a> into motion. I built a dynamic 3D mockup around a working design studio, moving from the full environment into branded tools, stationery, screens, and merchandise so the identity feels lived-in, tactile, and always in process.<br />
                </p>
                <div className="cv-container">
                  <div className="label">Project Specs</div>
                  <div className="project-specs-wrap">
                    <div className="specs-item">
                      <div className="label">Client</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">Outland</span><br /></p>
                        <p className="paragraph">Brand identity and creative direction<br /></p>
                        <p className="paragraph">Independent design studio<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Brand</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">Vizcom</span><br /></p>
                        <p className="paragraph">AI-powered design platform<br /></p>
                        <p className="paragraph">Product and industrial design<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Deliverables</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">1x</span> 32-second brand-world animation<br /></p>
                        <p className="paragraph"><span className="green">4x</span> high-resolution stills<br /></p>
                        <p className="paragraph">Dynamic <span className="green">3D brand mockup</span><br /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wotk-tags-links">
                <div className="work-tags">
                  <div className="tag"><div className="text-18">3D Environment</div></div>
                  <div className="tag"><div className="text-18">Motion Mockup</div></div>
                  <div className="tag"><div className="text-18">Look Development</div></div>
                </div>
                <a href="https://the-brandidentity.com/project/outlands-brand-for-design-platform-vizcom-puts-process-over-polish" target="_blank" rel="noopener noreferrer" className="button inverted-border w-button" data-cursor="Visit">View featured project</a>
              </div>
            </WorkPageHeader>
            <div className="work-main-wrap first">
              <div className="w-layout-grid cs-grid special" data-reveal-group>
                <div className="wrapper _2" style={{ paddingBottom: '62.5%' }} data-reveal>
                  <div className="html-embed _2span w-embed">
                    <EmbedVideo
                      poster="/videos/posters/vizcom-brand-world.jpg"
                      posterAlt="Vizcom brand world inside a sunlit design studio"
                      posterSizes="(max-width: 991px) 100vw, 94vw"
                      posterPriority
                      title="Vizcom dynamic 3D brand world mockup"
                      srcH265="/videos/h265/vizcom-brand-world-web.mp4"
                      srcAv1="/videos/av1/vizcom-brand-world.webm"
                      srcMp4="/videos/h264/vizcom-brand-world-fallback.mp4"
                    />
                  </div>
                </div>
                <CaseStudyImage src="/images/vizcom-brand-world-overhead.webp" alt="Overhead Vizcom workspace with brand cards, sketches, tools, and merchandise" />
                <div className="w-layout-grid cs-grid _2-col" style={{ gap: '35px' }}>
                  <CaseStudyImage src="/images/vizcom-brand-world-laptop.webp" alt="Vizcom-branded laptop surrounded by sketches and colour samples" />
                  <CaseStudyImage src="/images/vizcom-brand-world-mug.webp" alt="Blue Vizcom mug and colourful desk accessories in the 3D studio" />
                </div>
                <CaseStudyImage src="/images/vizcom-brand-world-studio.webp" alt="Wide view of the Vizcom 3D studio filled with branded objects and artwork" />
              </div>
            </div>
          </div>
          <div className="liner bottom"></div>
        </section>
        <CaseStudySummary items={caseStudySummary} />
        <section id="main-projects" className="main-resume" data-reveal>
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <div className="div-block-141 credits">
              <div className="div-block-143 top"><p className="label">Credits</p></div>
              <div className="div-block-135 nomarg"></div>
              <div className="div-block-142">
                <div className="div-block-143"><p className="paragraph">Brand Identity &amp; Creative Direction</p></div>
                <div className="postion">
                  <div className="div-block-143"><p className="paragraph">Outland</p></div>
                  <div className="div-block-143"><p className="paragraph">Design Studio</p></div>
                </div>
                <div className="div-block-143"><p className="paragraph">3D Design &amp; Animation</p></div>
                <div className="postion">
                  <div className="div-block-143"><p className="paragraph">Kryštof Ježek</p></div>
                  <div className="div-block-143"><p className="paragraph">Independent CGI Designer</p></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
