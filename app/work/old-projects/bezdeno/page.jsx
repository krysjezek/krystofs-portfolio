import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export const metadata = {
  title: 'Bezdeno',
  description: '3D visualization and design for Bezdeno',
}

export const dynamic = 'force-static'

export default function BezdenoPage() {
  return (
    <>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="work-header-wrap">
              <div className="work-header-container">
                <div className="work-h1-wrap">
                  <div className="div-block-112">
                    <div className="quote lime">Zdeno Boureanu</div>
                    <h1 className="heading-h1">Bezdeno Youtube Channel</h1>
                  </div>
                  <div className="back-block">
                    <a href="/" className="button inverted-border w-button">Back to home</a>
                  </div>
                </div>
                <div className="div-block-55">
                  <p className="paragraph">Career &amp; Money ≠ Happiness &amp; Satisfaction, that was the main idea of the personal brand for the successful entrepreneur Zdeno Boreanu, who decided to talk about this topic last year. Zdeno opens up important topics of mental health and today&#x27;s grind mindset, which often leads people into a dead end and a chase for money.<br /></p>
                </div>
                <div className="wotk-tags-links">
                  <div className="work-tags">
                    <div className="tag">
                      <div className="text-18">3D</div>
                    </div>
                    <div className="tag">
                      <div className="text-18">Motion Graphics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-535ef7a4" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid">
                <div id="w-node-_0870a03f-5ebe-95fe-6c14-ca2a77e8140e-535ef7a4" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}><iframe src="https://player.vimeo.com/video/993084311?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen frameBorder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></iframe></div>
                  </div>
                </div>
                <div id="w-node-_43309ad1-9455-348a-f5f3-72947d380fb6-535ef7a4" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}><iframe src="https://player.vimeo.com/video/993085240?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen frameBorder="0" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></iframe></div>
                  </div>
                </div>
                <div className="project-specs-wrap">
                  <div className="div-block-71 credits">
                    <div className="label gray">/ CREDITS</div>
                    <ul role="list" className="list credits">
                      <li className="credit-list">
                        <p className="paragraph credits job">Client</p>
                        <div className="div-block-106">
                          <p className="paragraph credits">Zdeno Boureanu</p>
                          <a href="https://monopo.london/" target="_blank" className="div-block-107 w-inline-block">
                            <p className="label credits">(BEZDENO)<br /></p><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-27" />
                          </a>
                        </div>
                      </li>
                      <li className="credit-list">
                        <p className="paragraph credits job">Art Direction</p>
                        <div className="div-block-106">
                          <p className="paragraph credits">Tomáš Gnosis Snop</p>
                          <a href="https://www.yiskra.studio/" target="_blank" className="div-block-107 w-inline-block">
                            <p className="label credits">(YISKRA)<br /></p><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-27" />
                          </a>
                        </div>
                      </li>
                      <li className="credit-list">
                        <p className="paragraph credits job">Logo / Brand</p>
                        <div className="div-block-106">
                          <p className="paragraph credits">Tomáš Gnosis Snop</p>
                          <a href="https://www.yiskra.studio/" target="_blank" className="div-block-107 w-inline-block">
                            <p className="label credits">(YISKRA)<br /></p><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-27" />
                          </a>
                        </div>
                      </li>
                      <li className="credit-list">
                        <p className="paragraph credits job">Video Editing</p>
                        <div className="div-block-106">
                          <p className="paragraph credits">Kryštof Ježek</p>
                          <p className="label credits">(KRYSTOF)<br /></p>
                        </div>
                      </li>
                      <li className="credit-list">
                        <p className="paragraph credits job">3D / Motion Design</p>
                        <div className="div-block-106">
                          <p className="paragraph credits">Kryštof Ježek</p>
                          <p className="label credits">(KRYSTOF)<br /></p>
                        </div>
                      </li>
                      <li className="credit-list">
                        <p className="paragraph credits job">Sound Design</p>
                        <div className="div-block-106">
                          <p className="paragraph credits">Kryštof Ježek</p>
                          <p className="label credits">(KRYSTOF)<br /></p>
                        </div>
                      </li>
                    </ul>
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
