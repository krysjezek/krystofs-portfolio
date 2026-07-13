import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WorkPageHeader from '@/components/WorkPageHeader'
import EmbedVideo from '@/components/EmbedVideo'
import JsonLd from '@/components/JsonLd'
import CaseStudySummary from '@/components/CaseStudySummary'
import { pageSeo, pageStructuredData } from '../../seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''
const PATH = '/work/valkaai'

const caseStudySummary = [
  {
    label: 'Role',
    answer: 'Art direction, 3D, and motion graphics for a glass-prism animation of the ValkaAI mirrored-butterfly logo.',
  },
  {
    label: 'Brief',
    answer: 'Translate Less and Better’s identity into a distinctive motion asset that presents ValkaAI as serious AI infrastructure while retaining the emotion and transformation built into the logo.',
  },
  {
    label: 'Process',
    answer: 'I developed a transparent, refractive 3D prism and used light, colour, and AI persona imagery to reveal the mirrored geometry as a bridge between real and digital realities.',
  },
  {
    label: 'Result',
    answer: 'The final 4K loop extends the brand into motion with a tactile hero asset that keeps ValkaAI’s personas at the centre of the visual story.',
  },
]

export const metadata = {
  title: 'ValkaAI — 3D Glass Prism Logo Animation',
  description: 'Art direction, 3D, and motion graphics for ValkaAI’s glass-prism mirrored-butterfly logo animation, created with Less and Better.',
  ...pageSeo(PATH),
}

export const dynamic = 'force-static'

export default function ValkaAIPage() {
  return (
    <>
      <Navbar />
      <JsonLd data={pageStructuredData(PATH)} />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section id="main-content" role="main" className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <WorkPageHeader label="ValkaAI" title="ValkaAI — 3D Glass Prism Logo Animation" publicationDate="July 2026" data-reveal="hero">
              <div className="div-block-55">
                <p className="paragraph header">
                  <a href="https://www.l-ab.eu/work/valkaai" target="_blank" rel="noopener noreferrer" className="link green" data-cursor="Visit">Less and Better</a> invited me to translate its mirrored-butterfly mark for ValkaAI into motion. I art-directed and built a glass-prism animation that refracts the brand’s blue and orange accents through AI persona imagery, turning the symbol’s bridge between real and digital realities into a tactile 3D sequence.<br />
                </p>
                <div className="cv-container">
                  <div className="label">Project Specs</div>
                  <div className="project-specs-wrap">
                    <div className="specs-item">
                      <div className="label">Client</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">ValkaAI</span><br /></p>
                        <p className="paragraph">AI-native entertainment<br /></p>
                        <p className="paragraph">Real-time AI personas<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Agency</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">Less and Better</span><br /></p>
                        <p className="paragraph">Brand identity and creative direction<br /></p>
                        <p className="paragraph">Brno, Czech Republic<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Deliverable</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">1x</span> 36-second 3D logo animation<br /></p>
                        <p className="paragraph"><span className="green">4K</span> master delivery<br /></p>
                        <p className="paragraph">Web-ready <span className="green">16:9 loop</span><br /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wotk-tags-links">
                <div className="work-tags">
                  <div className="tag">
                    <div className="text-18">Art Direction</div>
                  </div>
                  <div className="tag">
                    <div className="text-18">3D</div>
                  </div>
                  <div className="tag">
                    <div className="text-18">Motion Graphics</div>
                  </div>
                </div>
                <a href="https://www.l-ab.eu/work/valkaai" target="_blank" rel="noopener noreferrer" className="button inverted-border w-button" data-cursor="Visit">View agency case study</a>
              </div>
            </WorkPageHeader>
            <div className="work-main-wrap first">
              <div className="w-layout-grid cs-grid special" data-reveal-group>
                <div className="wrapper _2" data-reveal>
                  <div className="html-embed _2span w-embed">
                    <EmbedVideo
                      poster="/videos/posters/valkaai-logo-glass-prism.jpg"
                      posterAlt="ValkaAI mirrored-butterfly logo rendered as a refractive glass prism"
                      posterSizes="(max-width: 991px) 100vw, 94vw"
                      title="ValkaAI 3D glass-prism logo animation"
                      srcH265="/videos/h265/valkaai-logo-glass-prism-web.mp4"
                      srcAv1="/videos/av1/valkaai-logo-glass-prism.webm"
                      srcMp4="/videos/h264/valkaai-logo-glass-prism-fallback.mp4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="liner bottom"></div>
        </section>
        <CaseStudySummary items={caseStudySummary} />
        <section id="main-projects" className="main-resume" data-reveal>
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <div className="div-block-141 credits">
              <div className="div-block-143 top">
                <p className="label">Credits</p>
              </div>
              <div className="div-block-135 nomarg"></div>
              <div className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">Creative Direction</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Dominik Smuchar</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/less-and-better-logo.png'} alt="Less and Better studio logo" width={256} height={256} className="image-32" style={{ filter: 'invert(1)' }} /></div>
                    <p className="paragraph">Less and Better</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Creative Direction</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Petr Skovajsa</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/less-and-better-logo.png'} alt="Less and Better studio logo" width={256} height={256} className="image-32" style={{ filter: 'invert(1)' }} /></div>
                    <p className="paragraph">Less and Better</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Art Direction</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Kryštof&apos;s Team</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">3D</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Kryštof&apos;s Team</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Motion Graphics</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Kryštof&apos;s Team</p>
                  </div>
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
