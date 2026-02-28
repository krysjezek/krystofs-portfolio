import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EmbedVideo from '@/components/EmbedVideo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export const metadata = {
  title: '3D Environments',
  description: 'High-end 3D environment design and visualization services',
}

export const dynamic = 'force-static'

export default function ThreeDEnvironments() {

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
                    <div className="label green">Specialized service</div>
                    <h1 className="heading-h1">3D Environments</h1>
                  </div>
                  <div className="back-block">
                    <a href="/" className="button inverted-border w-button">Back to home</a>
                  </div>
                </div>
                <div className="div-block-55">
                  <p className="paragraph header">I craft super-realistic environments tailored specifically to your project&apos;s needs. From immersive digital landscapes to custom animated mockups used by worldwide studios, I provide the high-end backdrops necessary to showcase your work with maximum impact.<br /></p>
                </div>
              </div>
            </div>
            <div id="w-node-c5f2b9ac-b925-2203-4fe3-002441086a5d-033eedbd" className="work-main-wrap first">
              <div className="w-layout-grid cs-grid services">
                <div id="w-node-_771e6bc8-f93d-6c0b-e588-52ea025093ed-033eedbd" className="wrapper services">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_homio.jpg"
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
                <div id="w-node-_5c64c00a-c613-2787-7ad8-c803ce05fbdf-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_aptos-2x1.jpg"
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
                <div id="w-node-_1c4dce6c-05d5-0083-3b7d-fd948d7d12c0-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/outpost_explorer-2x1.jpg"
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
                <div id="w-node-a2a14c9c-f451-8f52-02aa-602a5b142f09-033eedbd" className="wrapper services">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/cn_skyll-1x1.jpg"
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
                <div id="w-node-_4c251230-b2e3-f3ee-ddae-2d99f3c573c3-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/outpost_resort-2x1.jpg"
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
                <div id="w-node-_82a68808-56d6-fe09-94d1-0da41d33cb7a-033eedbd" className="wrapper services">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_jimu.jpg"
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
                <div id="w-node-b7a28be6-ef33-6a27-bebf-9999f2a54f80-033eedbd" className="wrapper services _1x2">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/yiskra_veha.jpg"
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
                <div id="w-node-cfef4185-f5fe-f34c-a518-b6a1264ae5fa-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_ccus%20updated.jpg"
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
                <div id="w-node-_7819c8b2-ed3d-b7b3-ccd3-16b05096f26e-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_promo%20updated.jpg"
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
                <div id="w-node-e2f052fc-4737-93e8-4333-50074469bd4f-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_fifthrow%20updated.jpg"
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
                <div id="w-node-_640a85e8-b0e3-cbfe-a1b0-4c003c5bed42-033eedbd" className="wrapper services">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_sparta.jpg"
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
                <div id="w-node-_5028a3cc-8e67-9745-4b8d-d9f297cf48a3-033eedbd" className="wrapper services _2x1">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/ashfall_hyperframe%20updated.jpg"
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
                <div className="wrapper services hide">
                  <div className="cb w-embed"><EmbedVideo
                    poster="/videos/posters/volkov_netgear.jpg"
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
        <section id="main-projects" className="main-resume service">
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <div className="div-block-141 credits">
              <div className="div-block-143 top">
                <p className="label">Past projects and recognition</p>
              </div>
              <div className="div-block-135 nomarg"></div>
              <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a58-033eedbd" className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">Aptos Foundation</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a5c-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/themaglogo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Ashfall Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Jan Strach</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Shelby Network</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a67-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /><img src={CDN + '/images/themaglogo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Ashfall Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Petr Žižka</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Heidelberg CCUS</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a73-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/themaglogo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Ashfall Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Matěj Marášek</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Fifthrow</p>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Ashfall Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Ashfall Launch Video</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a97-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Ashfall Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Kryštof Ježek</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Tekuma</p>
                </div>
                <div id="w-node-c7733b9b-5c56-2b79-1e5b-04089cccb67b-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Ashfall Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">David Hájek</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Outpost 2025 Showreel</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272a7f-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/relive.png'} loading="lazy" width="15" alt="" className="image-32" /><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Outpost Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Tomáš Gnosis Snop</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Veha Logo Reveal</p>
                </div>
                <div id="w-node-_2c31e8c5-4344-7e8d-74f4-4a2fa2272aa3-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/glami-logo.jpg'} loading="lazy" alt="" className="image-32" /><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Jáchym Vogl</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Jimu</p>
                </div>
                <div id="w-node-f0dfac3b-0807-0793-6000-02f68fc91fda-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/glami-logo.jpg'} loading="lazy" alt="" className="image-32" /><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Jáchym Vogl</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Veha</p>
                </div>
                <div id="w-node-df60c450-15cf-97f1-8ef4-2ba22b554a52-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/glami-logo.jpg'} loading="lazy" alt="" className="image-32" /><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Jáchym Vogl</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Veha</p>
                </div>
                <div id="w-node-_3f86cc21-c5fb-70a4-3a3e-aa4e98e40d4b-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/glami-logo.jpg'} loading="lazy" alt="" className="image-32" /><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Jáchym Vogl</p>
                  </div>
                </div>
                <div className="div-block-143">
                  <p className="paragraph">Veha</p>
                </div>
                <div id="w-node-_00c565a9-9961-fef4-cdbc-b613074480ae-033eedbd" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/glami-logo.jpg'} loading="lazy" alt="" className="image-32" /><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Jáchym Vogl</p>
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
