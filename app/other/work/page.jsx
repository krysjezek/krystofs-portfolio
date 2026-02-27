import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <div className="work-main">
          <section className="container-3">
            <div className="w-layout-grid main-proj-grid">

              <a id="w-node-_03a17276-6ae4-7c7c-1c4a-065b032c86c0-500e5fc1" href="/work/the-mag-w-rap-2025" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">ART DIRECTION • 3D • CGI</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">The Mag Wrap 2025</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/wrap25_injektaz_preview.jpg"
                      srcMp4="/videos/h264/wrap25_injektaz_preview.mp4"
                      srcWebm="/videos/other/wrap25_injektaz_preview.webm"
                    />
                    <div className="proj-img wrap25"></div>
                  </div>
                </div>
              </a>

              <a id="w-node-_8db91594-8b05-477c-8c94-527f4d715dcb-500e5fc1" href="/work/barbour" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • VFX • MOTION GRAPHICS</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Barbour Quilt FOOH</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/Barbour-London---16x9_3_prob4.jpg"
                      srcMp4="/videos/h264/Barbour-London---16x9_3_prob4.mp4"
                      srcWebm="/videos/other/Barbour-London---16x9_3_prob4.webm"
                    />
                    <div className="proj-img barbour"></div>
                  </div>
                </div>
              </a>

              <a href="/work/the-vsx-sports-bra" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/vsx_16x9.jpg"
                      srcMp4="/videos/h264/vsx_16x9.mp4"
                      srcWebm="/videos/other/vsx_16x9.webm"
                    />
                    <div className="proj-img vsx"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • Simulation • Look dev</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">The VSX Sports Bra</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/barbour-international-puffer-fooh" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img frasers"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/barbour_frasers-16x9---15s_1.jpg"
                      srcMp4="/videos/h264/barbour_frasers-16x9---15s_1.mp4"
                      srcWebm="/videos/other/barbour_frasers-16x9---15s_1.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • VFx • SIMULATION</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Barbour International</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/onitsuka-tiger-covent-garden" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/thumb.jpg"
                      srcMp4="/videos/h264/thumb.mp4"
                      srcWebm="/videos/other/thumb.webm"
                    />
                    <div className="proj-img onitsuykja"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • VFX • EDIT</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Onitsuka Tiger Store Opening</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/yonex-s-d-campaign" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-transcode.webm"
                    />
                    <div className="proj-img yonex"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • MOTION GRAPHICS</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Yonex S&amp;D Campaign</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a id="w-node-_93beb70d-baa4-d918-45f0-c72169b3d420-500e5fc1" href="/work/old-projects/ashfall" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • SOUND DESIGN </div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Ashfall</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F66aaa1477241a95fee28372a_final-kockopes2-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F66aaa1477241a95fee28372a_final-kockopes2-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F66aaa1477241a95fee28372a_final-kockopes2-transcode.webm"
                    />
                    <div className="proj-img ashfall"></div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/the-mag-w-rap-2024" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-transcode.webm"
                    />
                    <div className="proj-img wrap-24"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">VFX LEAD • 3D • MOTION GRAPHICS</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">The Mag W/Rap 2024</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a id="w-node-_6e9bbe10-195a-ac5e-67b6-419b04b4f904-500e5fc1" href="#" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">SPECIALIZED SERVICE</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Jewelry Rendering</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/reels-bts-tweezers-1.jpg"
                      srcMp4="/videos/h264/reels-bts-tweezers-1.mp4"
                      srcWebm="/videos/other/reels-bts-tweezers-1.webm"
                    />
                    <div className="proj-img jewe"></div>
                  </div>
                </div>
              </a>

              <a id="w-node-d9b243bd-28e6-4374-48cc-fa79813e9ee9-500e5fc1" href="/work/chainer" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">ART DIRECTION • 3D • WEB DESIGN  • SOUND DESIGN</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Chainer</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/6547b0ff636d8d2153b3eefd_portofilio-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/6547b0ff636d8d2153b3eefd_portofilio-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/6547b0ff636d8d2153b3eefd_portofilio-transcode.webm"
                    />
                    <div className="proj-img"></div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/lepshee" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img lepshee"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-transcode.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • MOTION GRAPHICS</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Lepshee</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a id="w-node-_8d5a0eed-4f89-5293-a8d3-64667d6bf6ef-500e5fc1" href="/work/old-projects/yonex-giving-tournament" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • MOTION GRAPHICS • SOUND DESIGN </div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Yonex Giving Tournament</h2>
                      </div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/tournament-mp4-2.jpg"
                      srcMp4="/videos/h264/tournament-mp4-2.mp4"
                      srcWebm="/videos/other/tournament-mp4-2.webm"
                    />
                    <div className="proj-img yonexgiving"></div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/bezdeno" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img bezdeno"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F66aa9e67339addc3423f6935_Prost%C5%99ih%20-%201%2016x9%20%281%29-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F66aa9e67339addc3423f6935_Prost%C5%99ih%20-%201%2016x9%20%281%29-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F66aa9e67339addc3423f6935_Prost%C5%99ih%20-%201%2016x9%20%281%29-transcode.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">3D • MOTION GRAPHICS • SoUND DESIGN</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Bezdeno</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/dorian-drop-ii" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img dorian"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F6682fddaf49f85adf2f5edda_dorian-drop-ii%20%281%29-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F6682fddaf49f85adf2f5edda_dorian-drop-ii%20%281%29-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F6682fddaf49f85adf2f5edda_dorian-drop-ii%20%281%29-transcode.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">Art DIRECTION • 3D • MOTION GRAPHICS</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Dorian - Drop II</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/yonex-badminton" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img ypch"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F63c7df6091e702a62ff71160_header-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F63c7df6091e702a62ff71160_header-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F63c7df6091e702a62ff71160_header-transcode.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">Art DIRECTION • MOTION GRAPHICS • SOUND DESIGN</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Yonex Precision Challenge</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/together" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div className="div-block-66">
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="/videos/posters/together-2.jpg"
                      srcMp4="/videos/h264/together-2.mp4"
                      srcWebm="/videos/other/together-2.webm"
                    />
                    <div className="proj-img gp"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">MOTION GRAPHICS</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Together</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/the-mag-wrap23" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img wrap _2"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F6682bb833a19c74240001b70_wrap-injekt-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F6682bb833a19c74240001b70_wrap-injekt-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F6682bb833a19c74240001b70_wrap-injekt-transcode.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">VFX LEAD • 3D • MOTION GRAPHICS • SOUND DESIGN</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">The Mag W/RAP 2023</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              <a href="/work/old-projects/erem" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img erem"></div>
                    <BackgroundVideo className="background-video-18" style={{ display: 'none' }}
                      poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F63ea05489870092f96c786a9_header-vid-poster-00001.jpg"
                      srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F63ea05489870092f96c786a9_header-vid-transcode.mp4"
                      srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90%2F63ea05489870092f96c786a9_header-vid-transcode.webm"
                    />
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="label gray">MOTION GRAPHICS • SOUND DESIGN</div>
                      <div className="div-block-67">
                        <img src={CDN + '/images/arrow.svg'} loading="lazy" style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} alt="" className="image-19" />
                        <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">Erem</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
