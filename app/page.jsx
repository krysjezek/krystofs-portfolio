'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function HomePage() {
  // Script 1: Text carousel
  useEffect(() => {
    const changerMove = document.querySelector('.changer-move')
    const changers = document.querySelectorAll('.changer')
    if (changers.length <= 1) return
    let currentIndex = 0
    const changerHeight = changers[0].offsetHeight
    const id = setInterval(function () {
      currentIndex++
      if (currentIndex > changers.length - 2) {
        changerMove.style.transition = 'transform 0.5s ease-in-out'
        changerMove.style.transform = 'translateY(' + (-currentIndex * changerHeight) + 'px)'
        setTimeout(() => {
          changerMove.style.transition = 'none'
          changerMove.style.transform = 'translateY(0)'
        }, 500)
        currentIndex = 0
      } else {
        changerMove.style.transition = 'transform 0.5s ease-in-out'
        changerMove.style.transform = 'translateY(' + (-currentIndex * changerHeight) + 'px)'
      }
    }, 2000)
    return () => clearInterval(id)
  }, [])

  // Script 2: Marquee animation
  useEffect(() => {
    const speed = 2
    const innerContainer = document.querySelector('.inner-container')
    const logos = document.querySelectorAll('.main-hero-logos')
    let animationFrame

    function calculateGapSize() {
      const totalLogosWidth = Array.from(logos).reduce((total, logo) => total + logo.offsetWidth, 0)
      const containerWidth = innerContainer.offsetWidth
      return (containerWidth - totalLogosWidth) / (logos.length - 1)
    }

    function animate() {
      const gapSize = calculateGapSize()
      const logosWidth = logos[0].offsetWidth + gapSize
      const currentTransform = getComputedStyle(innerContainer).transform
      const matrixValues = currentTransform.match(/matrix\(([^)]+)\)/)
      const translateX = matrixValues ? parseFloat(matrixValues[1].split(', ')[4]) : 0
      let newPosition = translateX - speed
      if (newPosition < -logosWidth) {
        newPosition += logosWidth
      }
      innerContainer.style.transform = `translateX(${newPosition}px)`
      animationFrame = requestAnimationFrame(animate)
    }

    if (!innerContainer || logos.length === 0) return

    animate()

    const handleResize = () => {
      cancelAnimationFrame(animationFrame)
      animate()
    }
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        animate()
      } else {
        cancelAnimationFrame(animationFrame)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  // Script 3: Service buttons tab switcher
  useEffect(() => {
    const buttons = document.querySelectorAll('#b1, #b2, #b3, #b4')
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        buttons.forEach(btn => btn.classList.remove('selected'))
        this.classList.add('selected')
        const buttonId = this.id
        const divId = 'serv' + buttonId.substring(1)
        document.querySelectorAll('#serv1, #serv2, #serv3, #serv4').forEach(div => {
          div.style.opacity = '0'
          setTimeout(() => {
            div.style.display = 'none'
          }, 300)
        })
        setTimeout(() => {
          const activeDiv = document.getElementById(divId)
          activeDiv.style.display = 'flex'
          setTimeout(() => {
            activeDiv.style.opacity = '1'
          }, 10)
        }, 300)
      })
    })
    document.getElementById('b1').classList.add('selected')
    const defaultDiv = document.getElementById('serv1')
    defaultDiv.style.display = 'flex'
    setTimeout(() => {
      defaultDiv.style.opacity = '1'
    }, 10)
  }, [])


  return (
    <>
      <style>{`
        .changer-move {
          transition: transform 0.5s ease-in-out;
        }

        #serv1, #serv2, #serv3, #serv4 {
          display: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .selected {
          background-color: #ddd;
        }
        .blur-mask-layer {
          -webkit-mask-image: linear-gradient(to top, black 25%, transparent 30%);
          mask-image: linear-gradient(to top, black 25%, transparent 30%);
        }
        @keyframes pulse-dot {
          0%, 60% { transform: scale(1); }
          80% { transform: scale(0); }
          100% { transform: scale(1); }
        }
        .div-block-88 {
          animation: pulse-dot 3s ease-in-out infinite;
        }
      `}</style>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section className="main-hero">
          <div className="liner bottom"></div>
          <div className="w-layout-blockcontainer container-3 padbot nogap w-container">
            <div className="footer-wrap">
              <div className="footer-left">
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfab-a7256e91" className="div-block-135">
                  <div className="footer--text">
                    <div className="div-block-139"></div>
                  </div>
                </div>
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfae-a7256e91" className="div-block-135">
                  <div className="footer--text">
                    <h1 className="label">CGI Designer, Software Engineer</h1>
                    <div className="div-block-59">
                      <p className="paragraph">I craft high-end 3D and motion visuals for brands and studios. When I&#x27;m not designing, I&#x27;m building apps and tools that bridge art and tech.</p>
                    </div>
                  </div>
                </div>
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfb5-a7256e91" className="div-block-135">
                  <div className="footer--text">
                    <div className="label">Menu</div>
                    <div className="div-block-119">
                      <div className="div-block-65">
                        <a href="/services/3d-environments" className="link">3D Environments</a>
                        <div className="line-mask"><div className="line"></div></div>
                      </div>
                      <div className="div-block-65">
                        <a href="/services/mixed-reality" className="link">Mixed Reality</a>
                        <div className="line-mask"><div className="line"></div></div>
                      </div>
                      <div className="div-block-65">
                        <a href="#tech-projects" className="link">Tech Projects</a>
                        <div className="line-mask"><div className="line"></div></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfc9-a7256e91" className="div-block-135">
                  <div className="div-available">
                    <div className="div-block-88"></div>
                    <p className="label green">Available for work</p>
                  </div>
                </div>
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfce-a7256e91" className="div-block-138">
                  <a style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} href="https://calendly.com/krystofjezek/15min" target="_blank" className="button w-inline-block">
                    <div className="text-block-18">Schedule a call</div>
                  </a>
                  <a href="mailto:krystof@jezek.me?subject=I%20want%20to%20work%20with%20Krystof" className="button inverted-border w-button">Get in touch</a>
                </div>
              </div>
              <div className="footer-right"></div>
            </div>
            <div className="footer-wrap">
              <div className="div-block-148">
                <a style={{ backgroundColor: 'rgba(38,38,38,0.25)' }} href="https://www.motionmockups.com/" target="_blank" className="div-block-149 w-inline-block" data-cursor="Visit" data-cursor-icon="arrow">
                  <div id="w-node-_42e1a6b1-60e7-89d0-2ef5-bd4cb01f0209-a7256e91" className="div-block-151">
                    <div className="div-block-154">
                      <div className="div-block-150">
                        <p className="paragraph">Motion Mockups</p>
                        <div className="mini-label green">
                          <div className="label mini miniultra">New</div>
                        </div>
                      </div>
                      <h1 className="label white">Collection of 8 video mockups.<br />Easy to use AE templates. 4K, all formats.<br /></h1>
                    </div>
                    <div className="div-block-153">
                      <h1 className="label">motionmockups.com</h1><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-20 smaller" />
                    </div>
                  </div>
                  <div id="w-node-_1ced7a6b-e1d3-ec40-248f-ca4885de56d5-a7256e91" className="div-block-152">
                    <div className="code-embed w-embed"><video width="100%" height="auto" autoPlay muted loop playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69944082d88aed7c8242c463_Comp%201%20(0-00-00-00).png" style={{ objectFit: 'cover' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/6994449789efbe463813c5f2_web-video-2k.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video></div>
                    <div className="code-embed mobile w-embed"><video width="100%" height="auto" autoPlay muted loop playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69944804e0ecbc47b70b6bea_Comp%202%20(0-00-00-00).png" style={{ objectFit: 'cover' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/699447a96279cd427dd46294_web-video-mobile.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="w-layout-blockcontainer container-3 header w-container">
            <div className="w-layout-grid main-proj-grid head">
              <a id="w-node-eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4e9c-a7256e91" href="/services/3d-environments" className="proj-item w-inline-block" data-cursor="Explore">
                <div className="specs-wrap">
                  <div className="specs-contain-button">
                    <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', backgroundColor: 'rgb(255,255,255)' }} className="button case">
                      <div style={{ color: 'rgb(5,7,10)' }} className="text-block-18">3D Environments</div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8cf1ef108473b19f15_cgi-environments.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                        <source src={CDN + '/videos/h265/cgi-environments-web.mp4'} type="video/mp4; codecs=hvc1" />
                        <source src={CDN + '/videos/av1/cgi-environments.webm'} type="video/webm; codecs=av01" />
                        <source src={CDN + '/videos/h264/cgi-environments-fallback.mp4'} type="video/mp4" />
                      </video></div>
                  </div>
                </div>
              </a>
              <a id="w-node-eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4eae-a7256e91" href="/services/mixed-reality" className="proj-item w-inline-block" data-cursor="Explore">
                <div className="specs-wrap">
                  <div className="specs-contain-button">
                    <div style={{ backgroundColor: 'rgb(255,255,255)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="button case">
                      <div style={{ color: 'rgb(5,7,10)' }} className="text-block-18">Mixed Reality</div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8dd36e4f0e13644d26_mixed-reality.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                        <source src={CDN + '/videos/h265/mixed-reality-web.mp4'} type="video/mp4; codecs=hvc1" />
                        <source src={CDN + '/videos/av1/mixed-reality.webm'} type="video/webm; codecs=av01" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/68f072931563197bed892227_reel-1080-noaudio.mp4" type="video/mp4" />
                      </video></div>
                  </div>
                </div>
              </a>
            </div>
            <div className="main-hero-second">
              <div className="outer-container">
                <div className="main-hero-logos"><img loading="lazy" src={CDN + '/images/vs-logo.svg'} alt="" className="client-logo anna" /><img loading="lazy" src={CDN + '/images/coinbase-logo.svg'} alt="" className="client-logo slightly" /><img loading="lazy" src={CDN + '/images/yonex-logo.svg'} alt="" className="client-logo" /><img loading="lazy" src={CDN + '/images/barbour.png'} alt="" className="client-logo barbout" /><img loading="lazy" src={CDN + '/images/onitsuka-tiger-logo.svg'} alt="" className="client-logo tiger" /><img loading="lazy" src={CDN + '/images/monopoly-logo.svg'} alt="" className="client-logo larger" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet={`${CDN}/images/vodafone-logo-horiz-rgb-white-p-500.png 500w, ${CDN}/images/vodafone-logo-horiz-rgb-white-p-800.png 800w, ${CDN}/images/vodafone-logo-horiz-rgb-white-p-1080.png 1080w, ${CDN}/images/vodafone-logo-horiz-rgb-white-p-1600.png 1600w, ${CDN}/images/vodafone-logo-horiz-rgb-white-p-2000.png 2000w, ${CDN}/images/vodafone-logo-horiz-rgb-white-p-2600.png 2600w, ${CDN}/images/vodafone-logo-horiz-rgb-white-p-3200.png 3200w, ${CDN}/images/vodafone-logo-horiz-rgb-white.png 4908w`} alt="" src={CDN + '/images/vodafone-logo-horiz-rgb-white.png'} loading="lazy" className="client-logo voda" /></div>
                <div className="main-hero-logos"><img loading="lazy" src={CDN + '/images/kfc-logo.svg'} alt="" className="client-logo _26-copy" /><img loading="lazy" src={CDN + '/images/logo-1.svg'} alt="" className="client-logo themag" /><img loading="lazy" src={CDN + '/images/vsx-logo.svg'} alt="" className="client-logo vsx" /><img loading="lazy" src={CDN + '/images/trezor-1.svg'} alt="" className="client-logo badlod" /><img loading="lazy" src={CDN + '/images/frasers-logo-1-1.svg'} alt="" className="client-logo orum" /><img sizes="(max-width: 512px) 100vw, 512px" srcSet={`${CDN}/images/jnt-p-500.png 500w, ${CDN}/images/jnt.png 512w`} alt="" src={CDN + '/images/jnt.png'} loading="lazy" className="client-logo jnt" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet={`${CDN}/images/fini-p-500.png 500w, ${CDN}/images/fini-p-800.png 800w, ${CDN}/images/fini-p-1080.png 1080w, ${CDN}/images/fini.png 1280w`} alt="" src={CDN + '/images/fini.png'} loading="lazy" className="client-logo fini" /></div>
              </div>
            </div>
          </div>
        </section>
        <div className="main-featured">
          <div className="featured-carousel">
            <div className="featured-block archviz"></div>
            <div className="featured-block maison">
              <BackgroundVideo className="background-video-22"
                poster="/videos/posters/davinci-render2.jpg"
                srcMp4="/videos/h264/davinci-render2.mp4"
                srcWebm="/videos/other/davinci-render2.webm"
              />
            </div>
            <div className="featured-block ashfall"></div>
            <div className="featured-block archviz2"></div>
            <div className="featured-block"></div>
          </div>
        </div>

        <div className="main-services">
          <h1 className="heading-3">Benefits of 3D and Motion</h1>
          <div className="div-block-100">
            <div className="div-block-96">
              <ul role="list" className="list-3 w-list-unstyled">
                <li className="list-item-5">
                  <a id="b1" href="#" className="services-link selected w-inline-block" data-cursor="Explore">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Engage audiences</div>
                        <div className="services-heading">Engage audiences</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="list-item-2">
                  <a id="b2" href="#" className="services-link w-inline-block" data-cursor="Explore">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Showcase products</div>
                        <div className="services-heading">Showcase products</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="list-item-3">
                  <a id="b3" href="#" className="services-link w-inline-block" data-cursor="Explore">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Streamline Iterations</div>
                        <div className="services-heading">Streamline Iterations</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="list-item-4">
                  <a id="b4" href="#" className="services-link w-inline-block" data-cursor="Explore">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Educate Customers</div>
                        <div className="services-heading">Educate Customers</div>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <main id="serv2" className="div-block-95 none">
              <div className="div-block-98">
                <div className="services-heading large">Showcase products</div>
                <p className="paragraph smaller">Present your products in dynamic, detailed views that traditional photos and videos can&#x27;t match.</p>
              </div>
              <div className="div-block-97 _2"></div>
            </main>
            <div id="serv4" className="div-block-95 none">
              <div className="div-block-98">
                <div className="services-heading large">Educate Customers</div>
                <p className="paragraph smaller">Creative animations effectively break down complex information, making learning both engaging and memorable.</p>
              </div>
              <div className="div-block-97 _4"></div>
            </div>
            <div id="serv3" className="div-block-95 none">
              <div className="div-block-98">
                <div className="services-heading large">Streamline Iterations</div>
                <p className="paragraph smaller">With your product modeled and textured, iterating becomes quick and cost-effective. Adjust angles, animations, and environment without the need for a new photo shoot.</p>
              </div>
              <div className="div-block-97 _3"></div>
            </div>
            <div id="serv1" className="div-block-95">
              <div className="div-block-98">
                <div className="services-heading large">Engage audiences</div>
                <p className="paragraph smaller">In the quick-scroll world of digital media, striking visuals are key to catching a consumer&#x27;s eye. Enhanced with 3D and motion designs, your content stands a better chance of grabbing attention.</p>
              </div>
              <div className="div-block-97"><img src={CDN + '/images/ezgif.com-animated-gif-maker-4.gif'} loading="lazy" width="Auto" height="Auto" alt="" className="image-26" /></div>
            </div>
          </div>
        </div>
        <section id="main-projects" className="main-projects">
          <div className="w-layout-blockcontainer container-3 w-container">
            <h1 className="heading-2">Recent Case Studies</h1>
            <div className="w-layout-grid main-proj-grid">
              <a id="w-node-_0a0f2415-0cbe-189d-07e1-6388208cf7e6-a7256e91" href="/work/the-mag-w-rap-2025" className="proj-item w-inline-block" data-cursor="Explore">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="div-block-134">
                        <div className="mini-label">
                          <div className="label mini">Art Direction</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">3D</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Motion Design</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src={CDN + '/images/arrow.svg'} loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">The Mag Wrap 2025</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><img src={CDN + '/images/kj-stats.png'} loading="lazy" alt="" className="image-31" />
                        <div className="tag-work">11 000+ Patreon subscribers</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src={CDN + '/videos/h265/wrap_header-web.mp4'} type="video/mp4; codecs=hvc1" />
                        <source src={CDN + '/videos/av1/wrap_header.webm'} type="video/webm; codecs=av01" />
                        <source src={CDN + '/videos/h264/wrap_header-fallback.mp4'} type="video/mp4" />
                      </video></div>
                    <div className="proj-img wrap25"></div>
                  </div>
                </div>
              </a>
              <a id="w-node-_3c9fd363-924c-9b72-f486-2437327d7019-a7256e91" href="/work/barbour" className="proj-item w-inline-block" data-cursor="Explore">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="div-block-134">
                        <div className="mini-label">
                          <div className="label mini">Mixed Reality</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">3D</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Simulation</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src={CDN + '/images/arrow.svg'} loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">Barbour Quilt FOOH</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src={CDN + '/videos/h265/barbour_header-web.mp4'} type="video/mp4; codecs=hvc1" />
                        <source src={CDN + '/videos/h264/barbour_header-fallback.mp4'} type="video/mp4" />
                      </video></div>
                    <div className="proj-img barbour"></div>
                  </div>
                </div>
              </a>
              <a href="/work/the-vsx-sports-bra" className="proj-item w-inline-block" data-cursor="Explore">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src={CDN + '/videos/h265/vsx_header-web.mp4'} type="video/mp4; codecs=hvc1" />
                        <source src={CDN + '/videos/av1/vsx_header.webm'} type="video/webm; codecs=av01" />
                        <source src={CDN + '/videos/h264/vsx_header-fallback.mp4'} type="video/mp4" />
                      </video></div>
                    <div className="proj-img vsx"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="div-block-134">
                        <div className="mini-label">
                          <div className="label mini">3D</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Simulation</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Look Development</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src={CDN + '/images/arrow.svg'} loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">The VSX Sports Bra</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><img src={CDN + '/images/kj-stats.png'} loading="lazy" alt="" className="image-31" />
                        <div className="tag-work">900k organic views</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a id="w-node-ca5842f0-12ea-bba6-91ec-c62ab4bb5501-a7256e91" href="/work/chainer" className="proj-item w-inline-block" data-cursor="Explore">
                <div className="proj-img-wrap">
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="div-block-134">
                        <div className="mini-label">
                          <div className="label mini">Art Direction</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">3D</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Web Design</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src={CDN + '/images/arrow.svg'} loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">Chainer</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src={CDN + '/videos/h265/chainer_header-web.mp4'} type="video/mp4; codecs=hvc1" />
                        <source src={CDN + '/videos/h264/chainer_header-fallback.mp4'} type="video/mp4" />
                      </video></div>
                    <div className="proj-img"></div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>
        <section id="snapshots" className="main-snapshots">
          <div className="snapshots-wrap">
            <h1 className="heading-2">R&amp;D</h1>
            <div className="w-layout-grid snapshots-grid">
              <div id="w-node-a99893c8-7a95-570f-74fb-4a4430edba87-a7256e91" className="snapshot-cover">
                <div className="snapshot-img _2"></div>
              </div>
              <div id="w-node-f6c05c63-8807-5c35-fd3d-79967d9a78b5-a7256e91" className="snapshot-cover">
                <div className="snapshot-img _3"></div>
              </div>
              <div id="w-node-dad5dac9-b366-df48-a450-723abb21c63e-a7256e91" className="snapshot-cover">
                <div className="snapshot-img _6"></div>
              </div>
              <div id="w-node-b575eaa3-7424-2bce-75f7-6d5fa1bbc967-a7256e91" className="snapshot-cover">
                <div className="snapshot-img _1"></div>
              </div>
              <div id="w-node-aa034c7d-cfea-c763-d292-2857be8f653b-a7256e91" className="snapshot-cover">
                <div className="snapshot-img _4"></div>
              </div>
              <div id="w-node-c81a9b1c-2467-5bfd-bc49-b29a607d269e-a7256e91" className="snapshot-cover hori">
                <div className="snapshot-img _5"></div>
              </div>
            </div>
            <div className="div-block-58">
              <a href="https://www.instagram.com/krystof.jezek/" style={{ color: 'rgba(255,255,255,0.5)' }} target="_blank" className="nav-button">See more work on Instagram</a>
            </div>
          </div>
        </section>
        <section id="tech-projects" className="main-animated reverse-grad">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="div-block-92">
              <div className="div-block-94">
                <h1 className="heading-2 no-margin">Tech Projects</h1>
              </div>
            </div>
            <div className="div-block-66 grid">
              <div className="cp-wrap">
                <div className="cp-photo"></div>
                <div className="div-block-136">
                  <div className="div-block-134">
                    <div className="mini-label">
                      <div className="label mini">C++</div>
                    </div>
                    <div className="mini-label">
                      <div className="label mini">Ray Tracing</div>
                    </div>
                  </div>
                  <div className="div-block-67">
                    <h2 className="proj-heading nopos">My Own Ray Tracing Render Engine in C++</h2>
                  </div>
                </div>
                <a href="#" className="github-button w-inline-block">
                  <div>Github</div><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="github" />
                </a>
                <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8cf4215a663de37a53_coding-01.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                    <source src={CDN + '/videos/h265/coding-01-web.mp4'} type="video/mp4; codecs=hvc1" />
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/68f3a8823d027ddf4acf306e_coding-01-down.mp4" type="video/mp4" />
                  </video></div>
              </div>
              <div className="cp-wrap">
                <div className="cp-photo"></div>
                <div className="div-block-136">
                  <div className="div-block-134">
                    <div className="mini-label">
                      <div className="label mini">WebGl</div>
                    </div>
                    <div className="mini-label">
                      <div className="label mini">ThreeJS</div>
                    </div>
                    <div className="mini-label">
                      <div className="label mini">MindAR</div>
                    </div>
                  </div>
                  <div className="div-block-67">
                    <h2 className="proj-heading nopos">Relive AR - WebGL Platform for AR/VR Experiences</h2>
                  </div>
                </div>
                <a href="https://www.instagram.com/relive.ar/" target="_blank" className="github-button w-inline-block">
                  <div>Instagram</div><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="github" />
                </a>
                <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8c5555eff0c077ddb3_coding-02.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                    <source src={CDN + '/videos/h265/coding-02-web.mp4'} type="video/mp4; codecs=hvc1" />
                    <source src={CDN + '/videos/av1/coding-02.webm'} type="video/webm; codecs=av01" />
                    <source src={CDN + '/videos/h264/coding-02-fallback.mp4'} type="video/mp4" />
                  </video></div>
              </div>
              <div className="cp-wrap">
                <div className="cp-photo"></div>
                <div className="div-block-136">
                  <div className="div-block-134">
                    <div className="mini-label">
                      <div className="label mini">Python</div>
                    </div>
                    <div className="mini-label">
                      <div className="label mini">OpenCV</div>
                    </div>
                    <div className="mini-label">
                      <div className="label mini">MoviePy</div>
                    </div>
                  </div>
                  <div className="div-block-67">
                    <h2 className="proj-heading nopos">Video Processing Backend for Mockup Templates</h2>
                  </div>
                </div>
                <a href="https://github.com/krysjezek/video-process-backend" target="_blank" className="github-button w-inline-block">
                  <div>Github</div><img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="github" />
                </a>
                <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8daac8e69a98e764b2_kokos.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                    <source src={CDN + '/videos/h265/kokos-web.mp4'} type="video/mp4; codecs=hvc1" />
                    <source src={CDN + '/videos/av1/kokos.webm'} type="video/webm; codecs=av01" />
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/6904bf39c739929045b96bb7_IG_feed_1080x1080%20(1).mp4" type="video/mp4" />
                  </video></div>
              </div>
            </div>
          </div>
        </section>
        <section id="main-projects" className="main-resume">
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <h1 className="heading-2 pad">About me</h1>
            <div className="div-block-141">
              <div className="div-block-143 top">
                <p className="paragraph">Designer, Creator, and Problem Solver.</p>
              </div>
              <div className="div-block-135 nomarg">
                <p className="paragraph">Based in Prague. Blending art, design and tech.<br />Skilled in 3D, motion, art direction, and development.<br />A nerd with taste.</p>
              </div>
              <div id="w-node-a66f41d9-e251-18b3-06ea-3875b7f7d02d-a7256e91" className="div-block-142">
                <div className="div-block-143 date">
                  <p className="paragraph dates">20—26&#x27;</p>
                  <div id="w-node-_4ebab516-efd9-a6a1-4e35-be88f0a0a681-a7256e91" className="line about"></div>
                </div>
                <div id="w-node-_911d34b6-530c-4860-0a92-df038baabbbf-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Freelance</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">3D, Motion, AI</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">23—26&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-e92b1f06-779b-ab8e-7226-54032dc56be0-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/yiskra_studio_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">3D, Art Direction, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">23—25&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-_5a64a6dc-8158-3455-90ea-a07fb5ab6da6-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/1753950309864.jpg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">ProductionBot</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Pipeline Automation, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">23&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-cfae6f7e-0e09-b8ee-2167-a4c788945abe-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/relive.png'} loading="lazy" width="15" alt="" className="image-32" /></div>
                    <p className="paragraph">Relive AR</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">WebGL, AR, Growth</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">21—22&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/1631366714918.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Growthcurve</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">3D, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">19—21&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-_6023291a-8637-8489-7555-d076ce0a4cdc-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/apify_logo.jpeg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Apify Technologies</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Web, Video, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">18—19&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-_1cb748ed-e5bd-0608-0052-a71053df4e13-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/glami-logo.jpg'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Glami</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">AI Training</p>
                  </div>
                </div>
              </div>
              <div id="w-node-cf7ea84b-e864-21d3-c56e-f196d3a90349-a7256e91" className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">22—25&#x27;</p>
                </div>
                <div id="w-node-cf7ea84b-e864-21d3-c56e-f196d3a9034d-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><img src={CDN + '/images/cvutlogo-2.png'} loading="lazy" alt="" className="image-32" /></div>
                    <p className="paragraph">Czech Technical University</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Software Engineering</p>
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
