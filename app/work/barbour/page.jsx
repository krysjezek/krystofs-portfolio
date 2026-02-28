import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WorkPageHeader from '@/components/WorkPageHeader'
import BackgroundVideo from '@/components/BackgroundVideo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function BarbourPage() {
  return (
    <>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <WorkPageHeader label="Barbour" title="Icons in Quilting">
              <div className="div-block-55">
                <p className="paragraph header">
                  <a href="https://monopo.london/" target="_blank" className="link green" data-cursor="Visit">Monopo London</a> invited Krystof to work on a CGI/VFX campaign for British fashion designer <a href="https://www.barbour.com/" target="_blank" className="link green" data-cursor="Visit">Barbour</a>. The main idea was to show Barbour&#x27;s iconic quilt spreading across the world, focusing on four cities: London, New York, Shanghai, and Seoul. Each quilted piece was followed by a trail of nature, carefully crafted to resemble the British countryside.<br />
                </p>
              </div>
              <div className="cv-container">
                <div className="label">Project Specs</div>
                <div className="project-specs-wrap">
                  <div className="specs-item">
                    <div className="label">TOTAL IMPACT</div>
                    <div className="specs-inner-block">
                      <p className="paragraph"><span className="green">100k+ </span>average organic IG views<br /></p>
                      <p className="paragraph"><span className="green">30% </span>more engagement than on other<br />Barbour&#x27;s posts<br /></p>
                    </div>
                  </div>
                  <div className="specs-item">
                    <div className="label">Deliverables</div>
                    <div className="specs-inner-block">
                      <p className="paragraph"><span className="green">4x</span> cities (London, NYC, Seoul, Shanghai)<br /></p>
                      <p className="paragraph"><span className="green">3x </span>scenes per city (one city = one post)<br /></p>
                      <p className="paragraph"><span className="green">2x </span>additional videos (La Rinescante, Gatwick)<br /></p>
                    </div>
                  </div>
                  <div className="specs-item">
                    <div className="label">PRODUCTION</div>
                    <div className="specs-inner-block">
                      <p className="paragraph"><span className="green">8-week</span> sprint for the entire project<br /></p>
                      <p className="paragraph"><span className="green">50 </span>days of work on all assets<br /></p>
                      <p className="paragraph">Software: <span className="green">Blender, Houdini, Syntheyes<br />Davinci Resolve, Adobe After Effects</span><br /></p>
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
                    <div className="text-18">Motion Graphics</div>
                  </div>
                  <div className="tag">
                    <div className="text-18">VFX</div>
                  </div>
                </div>
              </div>
            </WorkPageHeader>
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-b6236407" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid">
                <div id="w-node-_0870a03f-5ebe-95fe-6c14-ca2a77e8140e-b6236407" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                      <iframe src="https://www.youtube.com/embed/oeVS_Q1VsKU" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen="">
                      </iframe>
                    </div>
                  </div>
                </div>
                <div id="w-node-_43309ad1-9455-348a-f5f3-72947d380fb6-b6236407" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                      <iframe src="https://www.youtube.com/embed/12xJ6Qkvtxw" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen="">
                      </iframe>
                    </div>
                  </div>
                </div>
                <div id="w-node-_44808b41-a2a6-1d69-efd0-2c223370001c-b6236407" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                      <iframe src="https://www.youtube.com/embed/mzHQ8lmL7BA" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen="">
                      </iframe>
                    </div>
                  </div>
                </div>
                <div id="w-node-_836c59fa-a031-cefc-6f9c-a56fb44ee565-b6236407" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '177.78% 0 0 0', position: 'relative' }}>
                      <iframe src="https://www.youtube.com/embed/6U9uTPf64nU" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen="">
                      </iframe>
                    </div>
                  </div>
                </div>
                <div id="w-node-_007f63ac-8c7a-7c68-0c4d-826252aa111d-b6236407" className="wrapper _15px">
                  <div className="bts-grid">
                    <BackgroundVideo
                      className="background-video-16 barb"
                      poster="/videos/posters/Barbour---IiQ---Reconstruction-2---BTS---4x5.jpg"
                      srcMp4="/videos/h264/Barbour---IiQ---Reconstruction-2---BTS---4x5.mp4"
                      srcWebm="/videos/other/Barbour---IiQ---Reconstruction-2---BTS---4x5.webm"
                    />
                    <BackgroundVideo
                      className="background-video-16 barb"
                      poster="/videos/posters/Barbour---IiQ---Fern-03--BTS----4x5.jpg"
                      srcMp4="/videos/h264/Barbour---IiQ---Fern-03--BTS----4x5.mp4"
                      srcWebm="/videos/other/Barbour---IiQ---Fern-03--BTS----4x5.webm"
                    />
                    <BackgroundVideo
                      className="background-video-16 barb"
                      poster="/videos/posters/Barbour---IiQ---Instant-Render-2---BTS----4x5.jpg"
                      srcMp4="/videos/h264/Barbour---IiQ---Instant-Render-2---BTS----4x5.mp4"
                      srcWebm="/videos/other/Barbour---IiQ---Instant-Render-2---BTS----4x5.webm"
                    />
                    <BackgroundVideo
                      className="background-video-16 barb"
                      poster="/videos/posters/Barbour---IiQ---Nodes---BTS----4x5.jpg"
                      srcMp4="/videos/h264/Barbour---IiQ---Nodes---BTS----4x5.mp4"
                      srcWebm="/videos/other/Barbour---IiQ---Nodes---BTS----4x5.webm"
                    />
                    <BackgroundVideo
                      className="background-video-16 barb"
                      poster="/videos/posters/Barbour---IiQ---Bus---BTS----4x5_1.jpg"
                      srcMp4="/videos/h264/Barbour---IiQ---Bus---BTS----4x5_1.mp4"
                      srcWebm="/videos/other/Barbour---IiQ---Bus---BTS----4x5_1.webm"
                    />
                    <BackgroundVideo
                      className="background-video-16 barb"
                      poster="/videos/posters/Barbour---IiQ---Fern-02--BTS----4x5.jpg"
                      srcMp4="/videos/h264/Barbour---IiQ---Fern-02--BTS----4x5.mp4"
                      srcWebm="/videos/other/Barbour---IiQ---Fern-02--BTS----4x5.webm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="main-projects" className="main-resume w-node-ab61f89b-2906-3854-9eb5-67a933bce7ba-b6236407">
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <div className="div-block-141 credits">
              <div className="div-block-143 top">
                <p className="label">Credits</p>
              </div>
              <div className="div-block-135 nomarg"></div>
              <div id="w-node-ab61f89b-2906-3854-9eb5-67a933bce7c1-b6236407" className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">Project Manager</p>
                </div>
                <div id="w-node-ab61f89b-2906-3854-9eb5-67a933bce7c5-b6236407" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Mary Wu</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/monopologo4.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Monopo London</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Creative Producer</p>
                </div>
                <div id="w-node-ab61f89b-2906-3854-9eb5-67a933bce7d1-b6236407" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Maud Dedrecked</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/tmrzvlogo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/monopo-logo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/monopologo4.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Monopo London</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Art Director</p>
                </div>
                <div id="w-node-ab61f89b-2906-3854-9eb5-67a933bce7dd-b6236407" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Stella Grotti</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/tmrzvlogo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/monopo-logo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/monopologo4.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Monopo London</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Designer</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Luna Gooriah</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/tmrzvlogo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/monopo-logo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/monopologo4.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Monopo London</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">CGI Director</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Team Krystof</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">3D, VFX</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Josef Talač</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Team Krystof</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">3D Animation, Modeling</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">David Hájek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Team Krystof</p>
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
