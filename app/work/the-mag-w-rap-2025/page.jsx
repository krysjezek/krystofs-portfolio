import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WorkPageHeader from '@/components/WorkPageHeader'
import EmbedVideo from '@/components/EmbedVideo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function MagWrap2025Page() {
  return (
    <>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section className="work-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <WorkPageHeader label="The Mag WRAP 2025" title="Rap Talent Show">
              <div className="div-block-55">
                <p className="paragraph header">The Mag Wrap, the most-watched show on Czech/Slovak YouTube, hired us for its fourth season. We refreshed the entire visual package with advanced 2D + 3D motion design: a new intro, on-air IDs, looping backgrounds, and sponsor graphics that keep the show sharp and instantly recognisable.<br /></p>
                <div className="cv-container">
                  <div className="label">Project Specs</div>
                  <div className="project-specs-wrap">
                    <div className="specs-item">
                      <div className="label">Total Impact</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">500k+ </span>average YT views per episode<br /></p>
                        <p className="paragraph"><span className="green">10 000+ </span>subscribers on Patreon<br /></p>
                        <p className="paragraph"><span className="green">+50% </span>watch-time vs. 2024<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Deliverables</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">20s </span>show&#x27;s main intro + <span className="green">2x</span> show injection<br /></p>
                        <p className="paragraph"><span className="green">10x </span>looping 3D background<br /></p>
                        <p className="paragraph"><span className="green">3x </span>motion design template<br /></p>
                        <p className="paragraph"><span className="green">+ </span>explainers, standings, duel stats<br /></p>
                      </div>
                    </div>
                    <div className="specs-item">
                      <div className="label">Production</div>
                      <div className="specs-inner-block">
                        <p className="paragraph"><span className="green">4-week</span> sprint to deliver main assets<br /></p>
                        <p className="paragraph"><span className="green">300 </span>hours of total work on all assets<br /></p>
                        <p className="paragraph">Software: <span className="green">Blender, Houdini, Nuke,<br />Davinci Resolve, Adobe After Effects</span><br /></p>
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
                <a href="https://www.youtube.com/watch?v=bCpYQCTLIRs&list=PLliYVMXsykctE6utri9G6VWL-VOGaCOlo" target="_blank" className="button inverted-border w-button" data-cursor="Visit">Watch on Youtube</a>
              </div>
            </WorkPageHeader>
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-db1fcd0c" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid">
                <div id="w-node-_0870a03f-5ebe-95fe-6c14-ca2a77e8140e-db1fcd0c" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                      <iframe src="https://www.youtube.com/embed/-s2ly4Fgu5c" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
                <div id="w-node-_4c251230-b2e3-f3ee-ddae-2d99f3c573c3-db1fcd0c" className="wrapper _2 wrap-inj">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_injektaz.jpg"
                    srcH265="/videos/h265/w25_injektaz-web.mp4"
                    srcAv1="/videos/av1/w25_injektaz.webm"
                    srcMp4="/videos/h264/w25_injektaz-fallback.mp4"
                  /></div>
                </div>
                <div className="wrapper _2 wrap-bcgloop">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_loop_bcg.jpg"
                    srcH265="/videos/h265/w25_loop_bcg-web.mp4"
                    srcAv1="/videos/av1/w25_loop_bcg.webm"
                    srcMp4="/videos/h264/w25_loop_bcg-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-_5584234e-0489-bfe9-d57b-ba83bde0ba51-db1fcd0c" className="wrapper _2 wrap-led1">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_ledka.jpg"
                    srcH265="/videos/h265/w25_ledka-web.mp4"
                    srcAv1="/videos/av1/w25_ledka.webm"
                    srcMp4="/videos/h264/w25_ledka-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-_3d743965-0237-63a8-4ffb-3a3c5da996b1-db1fcd0c" className="wrapper _2 wrap-porotci">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_rytmus.jpg"
                    srcH265="/videos/h265/w25_rytmus-web.mp4"
                    srcAv1="/videos/av1/w25_rytmus.webm"
                    srcMp4="/videos/h264/w25_rytmus-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-_2ae65b4e-b1c3-b187-f0ff-5cdc6e4a01d2-db1fcd0c" className="wrapper _2 wrap-aneta">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_aneta_greenscreen.jpg"
                    srcH265="/videos/h265/w25_aneta_greenscreen-web.mp4"
                    srcAv1="/videos/av1/w25_aneta_greenscreen.webm"
                    srcMp4="/videos/h264/w25_aneta_greenscreen-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-f5d293d0-dcfd-35bf-7f48-20e63cc3518b-db1fcd0c" className="wrapper _2 wrap-jmenovka">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_nametag.jpg"
                    srcH265="/videos/h265/w25_nametag-web.mp4"
                    srcMp4="/videos/h264/w25_nametag-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-_99824595-c3f1-4207-c418-28701641ea34-db1fcd0c" className="wrapper _2 wrap-postup">
                  <div className="html-embed _2span w-embed"><EmbedVideo
                    poster="/videos/posters/w25_postupujici.jpg"
                    srcH265="/videos/h265/w25_postupujici-web.mp4"
                    srcAv1="/videos/av1/w25_postupujici.webm"
                    srcMp4="/videos/h264/w25_postupujici-fallback.mp4"
                  /></div>
                </div>
                <div id="w-node-aa1cd08d-7967-db46-3e54-dbcc5425c446-db1fcd0c" className="wrapper _15px">
                  <div className="html-embed w-embed w-iframe">
                    <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                      <iframe src="https://www.youtube.com/embed/poEZ7qcoZXI" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="liner bottom"></div>
        </section>
        <section id="main-projects" className="main-resume">
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <div className="div-block-141 credits">
              <div className="div-block-143 top">
                <p className="label">Credits</p>
              </div>
              <div className="div-block-135 nomarg"></div>
              <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a58-db1fcd0c" className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">Producer / Director</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a5c-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Jan Strach</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/themaglogo.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">TheMag</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Producer / DoP</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a67-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Petr Žižka</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/yiskra_studio_logo.jpeg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/themaglogo.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">TheMag</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Video Editing</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a73-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Matěj Marášek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/themaglogo.jpg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">TheMag</p>
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
                    <p className="paragraph">Team Krystof</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">3D Animation, Motion Design</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a97-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Team Krystof</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Compositing</p>
                </div>
                <div id="w-node-c7733b9b-5c56-2b79-1e5b-04089cccb67b-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">David Hájek</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Team Krystof</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Logo / Brand / Art Direction</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a7f-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Tomáš Gnosis Snop</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/relive.png'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/yiskra_studio_logo.jpeg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Junior 3D &amp; Motion</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272aa3-db1fcd0c" className="postion">
                  <div className="div-block-143">
                    <p className="paragraph">Jáchym Vogl</p>
                  </div>
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/glami-logo.jpg'} alt="" width={40} height={40} className="image-32" /><Image src={CDN + '/images/yiskra_studio_logo.jpeg'} alt="" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
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
