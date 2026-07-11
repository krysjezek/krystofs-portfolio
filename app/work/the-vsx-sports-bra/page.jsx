import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WorkPageHeader from '@/components/WorkPageHeader'
import EmbedVideo from '@/components/EmbedVideo'
import JsonLd from '@/components/JsonLd'
import CaseStudySummary from '@/components/CaseStudySummary'
import { absoluteUrl, assetUrl, creativeWorkId, pageSeo, PERSON_ID, videoObjectId } from '../../seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''
const PATH = '/work/the-vsx-sports-bra'

const caseStudyAnswers = [
  {
    label: 'Role',
    answer: '3D product visualization, CGI product animation, look development, and Houdini cloth simulation for a VSX Sports Bra social launch asset.',
  },
  {
    label: 'Brief',
    answer: 'Create a short-form product film that makes the bra feel technical, tactile, and performance-led while staying fast enough for a one-week campaign sprint.',
  },
  {
    label: 'Process',
    answer: 'I built photoreal fabric, knit, stretch, and support moments in Blender and Houdini, then refined the lighting, material response, and simulation detail for a 15-second Instagram Reel.',
  },
  {
    label: 'Result',
    answer: 'The final CGI Reel became the hero digital launch asset and reached 870k organic Instagram views with 7800 likes.',
  },
]

const vsxCaseStudyStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CreativeWork',
      '@id': creativeWorkId(PATH),
      name: 'The VSX Sports Bra CGI Product Animation Case Study',
      headline: 'The VSX Sports Bra',
      description: 'A quick-turn CGI product animation and 3D product visualization case study for the VSX Sports Bra, using Blender and Houdini to create photoreal fabric, knit, stretch, and support simulations for a 15-second Instagram Reel.',
      url: absoluteUrl(PATH),
      image: assetUrl('/videos/posters/vsx_main-01.jpg'),
      creator: { '@id': PERSON_ID },
      contributor: [
        {
          '@type': 'Person',
          name: 'Artem Morozov',
          affiliation: {
            '@type': 'Organization',
            name: 'TMRZV Studio',
            url: 'https://tmrzv.com/',
          },
        },
        {
          '@type': 'Organization',
          name: 'TMRZV Studio',
          url: 'https://tmrzv.com/',
        },
      ],
      about: [
        '3D product visualization',
        'CGI product animation',
        'cloth simulation',
        'fabric simulation',
        'knit simulation',
        'short-form social campaign',
      ],
      keywords: [
        'VSX Sports Bra',
        '3D product visualization',
        'CGI product animation',
        'Houdini cloth simulation',
        'Blender look development',
        'fabric simulation',
        'knit simulation',
        'Instagram Reel',
      ],
      dateCreated: '2025',
      datePublished: '2025-04',
      inLanguage: 'en',
      mainEntityOfPage: absoluteUrl(PATH),
      hasPart: [
        {
          '@type': 'VideoObject',
          '@id': videoObjectId(PATH, 'The VSX Sports Bra 3D product visualization'),
          name: 'The VSX Sports Bra CGI product animation',
          description: 'A 15-second CGI product animation showing photoreal fabric, knit detail, stretch, support, and material performance for the VSX Sports Bra.',
          thumbnailUrl: assetUrl('/videos/posters/vsx_main-01.jpg'),
          contentUrl: assetUrl('/videos/h264/vsx_main-01-fallback.mp4'),
          uploadDate: '2025-01-01',
          creator: { '@id': PERSON_ID },
          publisher: { '@id': PERSON_ID },
          keywords: ['CGI product animation', '3D product visualization', 'cloth simulation', 'fabric simulation'],
          transcript: 'No spoken dialogue. Visual sequence showing close-up CGI fabric, knit detail, stretch, support, and material performance for the VSX Sports Bra.',
        },
        {
          '@type': 'VideoObject',
          '@id': videoObjectId(PATH, 'The VSX Sports Bra cloth simulation breakdown'),
          name: 'The VSX Sports Bra cloth simulation breakdown',
          description: 'Behind-the-scenes 3D cloth simulation and look-development breakdown for the VSX Sports Bra CGI product animation.',
          thumbnailUrl: assetUrl('/videos/posters/vsx_bts-02.jpg'),
          contentUrl: assetUrl('/videos/h264/vsx_bts-02-fallback.mp4'),
          uploadDate: '2025-01-01',
          creator: { '@id': PERSON_ID },
          publisher: { '@id': PERSON_ID },
          keywords: ['Houdini cloth simulation', 'Blender look development', 'CGI breakdown', '3D product animation'],
          transcript: 'No spoken dialogue. Visual breakdown showing Houdini and Blender simulation work for the VSX Sports Bra launch asset.',
        },
      ],
    },
  ],
}

export const metadata = {
  title: 'VSX Sports Bra CGI Product Animation',
  description: '3D product visualization, CGI product animation, and cloth simulation for the VSX Sports Bra social launch asset.',
  ...pageSeo(PATH),
}

export const dynamic = 'force-static'

export default function VSXSportsBraPage() {
  return (
    <>
      <Navbar />
      <JsonLd data={vsxCaseStudyStructuredData} />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section id="main-content" role="main" className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <WorkPageHeader label="Victoria&#x27;s Secret, VSX" title="VSX Sports Bra CGI Animation" publicationDate="April 2025" data-reveal="hero">
              <p className="paragraph header">
                <a href="https://tmrzv.com/" target="_blank" rel="noopener noreferrer" className="link green" data-cursor="Visit">TMRZV Studio</a> brought me in to create a quick-turn CGI product animation for the VSX Sports Bra. Over a one-week sprint, I built photoreal 3D product visualization, fabric simulations, and knit detail in Blender and Houdini, delivering a 15-second Instagram Reel that shows the bra&#x27;s stretch, support, and material performance.
              </p>
              <div className="div-block-55">
                <div className="cv-container">
                  <div className="label">Project Specs</div>
                  <div className="project-specs-wrap">
                    <div className="specs-item">
                      <div className="label">TOTAL IMPACT</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">870k </span>organic Instagram views<br /></p>
                        <p className="paragraph"><span className="green">7800 </span>Instagram likes<br /></p>
                        <p className="label gray">Figures show cumulative views and likes on the linked Instagram Reel at the time of making this case study.</p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Deliverables</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">1x</span> 15-second Instagram Reel<br /></p>
                        <p className="paragraph"><span className="green">3x </span>fabric and knit simulations<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">PRODUCTION</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">1-week</span> for the entire project<br /></p>
                        <p className="paragraph"><span className="green">60 </span>hours of work on all assets<br /></p>
                        <p className="paragraph">Software: <span className="green">Blender, Houdini</span><br /></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="wotk-tags-links">
                <div className="work-tags">
                  <div className="tag">
                    <div className="text-18">3D</div>
                  </div>
                  <div className="tag">
                    <div className="text-18">Simulation</div>
                  </div>
                  <div className="tag">
                    <div className="text-18">CGI Product Animation</div>
                  </div>
                </div>
                <a href="https://www.instagram.com/p/DITzF45OsiA/" target="_blank" className="button inverted-border w-button" data-cursor="Visit">Watch on Instagram</a>
              </div>
            </WorkPageHeader>
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-b76f347e" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid _6" data-reveal-group>
                <div id="w-node-de55dabe-6ebf-d626-b3ad-26ee516417ae-b76f347e" className="wrapper _2 vsx-vert _3pls" data-reveal>
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/vsx_main-01.jpg"
                    posterAlt="The VSX Sports Bra 3D product visualization with cloth simulation"
                    title="The VSX Sports Bra CGI product animation"
                    srcH265="/videos/h265/vsx_main-01-web.mp4"
                    srcAv1="/videos/av1/vsx_main-01.webm"
                    srcMp4="/videos/h264/vsx_main-01-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-de55dabe-6ebf-d626-b3ad-26ee516417b0-b76f347e" className="wrapper _2 vsx-vert" data-reveal>
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/vsx_main-02.jpg"
                    posterAlt="The VSX Sports Bra photoreal CGI fabric simulation"
                    title="The VSX Sports Bra fabric simulation detail"
                    srcH265="/videos/h265/vsx_main-02-web.mp4"
                    srcAv1="/videos/av1/vsx_main-02.webm"
                    srcMp4="/videos/h264/vsx_main-02-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-de55dabe-6ebf-d626-b3ad-26ee516417b4-b76f347e" className="wrapper _2 vsx-vert _3" data-reveal>
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/vsx_main-03.jpg"
                    posterAlt="The VSX Sports Bra CGI knit and stretch visualization"
                    title="The VSX Sports Bra knit simulation"
                    srcH265="/videos/h265/vsx_main-03-web.mp4"
                    srcAv1="/videos/av1/vsx_main-03.webm"
                    srcMp4="/videos/h264/vsx_main-03-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-de55dabe-6ebf-d626-b3ad-26ee516417ba-b76f347e" className="wrapper _2 vsx-bts _2pls" data-reveal>
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/vsx_bts-01.jpg"
                    posterAlt="Behind-the-scenes 3D cloth simulation for The VSX Sports Bra"
                    title="The VSX Sports Bra simulation breakdown"
                    srcH265="/videos/h265/vsx_bts-01-web.mp4"
                    srcAv1="/videos/av1/vsx_bts-01.webm"
                    srcMp4="/videos/h264/vsx_bts-01-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-de55dabe-6ebf-d626-b3ad-26ee516417b8-b76f347e" className="wrapper _2 vsx-bts" data-reveal>
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/vsx_bts-02.jpg"
                    posterAlt="The VSX Sports Bra CGI look development and cloth simulation breakdown"
                    title="The VSX Sports Bra CGI breakdown"
                    srcH265="/videos/h265/vsx_bts-02-web.mp4"
                    srcMp4="/videos/h264/vsx_bts-02-fallback.mp4"
                  /></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <CaseStudySummary items={caseStudyAnswers} />
        <section id="main-projects" className="main-resume" data-reveal>
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <div className="div-block-141 credits">
              <div className="div-block-143 top">
                <p className="label">Credits</p>
              </div>
              <div className="div-block-135 nomarg"></div>
              <div id="w-node-_8dd0db12-5c03-2ecd-dd3c-81020f04956d-b76f347e" className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">Creative Director</p>
                </div>
                <div id="w-node-_8dd0db12-5c03-2ecd-dd3c-81020f049571-b76f347e" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Artem Morozov</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/tmrzvlogo.jpg'} alt="TMRZV Studio logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">TMRZV Studio</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Sound Design, Compositing</p>
                </div>
                <div id="w-node-_8dd0db12-5c03-2ecd-dd3c-81020f04957c-b76f347e" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">TMRZV Studio</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/tmrzvlogo.jpg'} alt="TMRZV Studio logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">TMRZV Studio</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">3D &amp; Look Development</p>
                </div>
                <div id="w-node-_8dd0db12-5c03-2ecd-dd3c-81020f049587-b76f347e" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Kryštof&apos;s Team</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Houdini Simulation</p>
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
