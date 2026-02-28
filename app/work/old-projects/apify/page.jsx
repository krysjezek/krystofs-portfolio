import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export const metadata = {
  title: 'Apify',
  description: 'Design and motion work for Apify Technologies',
}

export const dynamic = 'force-static'

export default function ApifyPage() {
  return (
    <>
      <Navbar />
      <div className="work-main-video-wrap">
        <BackgroundVideo className="work-main-video"
          poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/624af93684d7a6884259a813_hpanimation_1-poster-00001.jpg"
          srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/624af93684d7a6884259a813_hpanimation_1-transcode.mp4"
          srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/624af93684d7a6884259a813_hpanimation_1-transcode.webm"
        />
      </div>
      <div>
        <div className="work-header-wrap">
          <div className="back-block">
            <a href="/" className="button inverted-border w-button">Back to home</a>
          </div>
          <div>
            <div className="subheadline">Apify</div>
            <h1 className="heading-1">MAKE THE WEB WORK FOR YOU</h1>
            <p className="paragraph">I have been working at <span className="text-span">Apify</span> for precisely <span className="text-span">2 years</span>. During my time there, I worked on various design projects ranging from <span className="text-span">Web Design</span> and interview videos to <span className="text-span">complex 3D animations</span>.</p>
          </div>
        </div>
        <div className="w-layout-grid work-grid wrap">
          <div id="w-node-b805cc1a-6511-5184-3780-4dc1a1e8f64c-7b5129d6" className="work-main-wrap first">
            <div className="w-layout-grid cs-grid">
              <div id="w-node-f4abb4df-7a40-9129-aead-dfd34f39edda-7b5129d6" className="html-embed _2span w-embed w-iframe w-script">
                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}><iframe src="https://player.vimeo.com/video/677387125?h=93af2f5bd5&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} title="Apify &mdash; Homepage Animation"></iframe></div>
              </div>
              <div id="w-node-b805cc1a-6511-5184-3780-4dc1a1e8f64d-7b5129d6" className="html-embed w-embed w-iframe w-script">
                <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}><iframe src="https://player.vimeo.com/video/669417356?h=4a28822f69&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} title="Apify &mdash; Hiring video"></iframe></div>
              </div>
            </div>
          </div>
        </div>
        <div className="work-header-wrap">
          <div className="back-block">
            <a href="/" className="button inverted-border w-button">Back to home</a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="text-small">© KRYSTOF JEZEK 2023<br /></div>
      </div>
      <div className="main-hero-logos"><img src={CDN + '/images/logo-1.svg'} loading="lazy" alt="" className="client-logo ultra" /><img src={CDN + '/images/coinbase-logo.svg'} loading="lazy" alt="" className="client-logo slightly" /><img src={CDN + '/images/yonex-logo.svg'} loading="lazy" alt="" className="client-logo" /><img src={CDN + '/images/monopoly-logo.svg'} loading="lazy" alt="" className="client-logo larger" /><img src={CDN + '/images/orum-logo.png'} loading="lazy" alt="" className="client-logo orum" /><img src={CDN + '/images/relive-logo.png'} loading="lazy" alt="" className="client-logo slightly" /><img src={CDN + '/images/hubpay-logo.png'} loading="lazy" alt="" className="client-logo _26" /><img src={CDN + '/images/lepshee-logo-1.png'} loading="lazy" alt="" className="client-logo slightly" /><img src={CDN + '/images/anna-logo.png'} loading="lazy" alt="" className="client-logo larger" /><img src={CDN + '/images/chainer-logo.png'} loading="lazy" alt="" className="client-logo" /></div>
      <Footer />
    </>
  )
}
