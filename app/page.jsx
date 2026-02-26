'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

  // Script 4: 3D tilt on #targetDiv
  useEffect(() => {
    const targetDiv = document.getElementById('targetDiv')
    if (!targetDiv) return

    const handleMouseMove = function (event) {
      const rect = targetDiv.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const deltaX = x - centerX
      const deltaY = y - centerY
      const rotateX = deltaY / 200
      const rotateY = -deltaX / 200
      targetDiv.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
    const handleMouseLeave = function () {
      targetDiv.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
    }

    targetDiv.addEventListener('mousemove', handleMouseMove)
    targetDiv.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      targetDiv.removeEventListener('mousemove', handleMouseMove)
      targetDiv.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      <style>{`
        .changer-move {
          transition: transform 0.5s ease-in-out;
        }
        #targetDiv {
          transition: transform 0.3s ease-out;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        #targetDiv:hover {
          transform: perspective(1000px);
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
                      <div data-w-id="b83b1921-bc4d-1a56-1b33-65a76eb8dfba" className="div-block-65">
                        <a href="/services/3d-environments" className="link">3D Environments</a>
                        <div className="line-mask">
                          <div className="line"></div>
                        </div>
                      </div>
                      <div data-w-id="b83b1921-bc4d-1a56-1b33-65a76eb8dfbf" className="div-block-65">
                        <a href="/services/mixed-reality" className="link">Mixed Reality</a>
                        <div className="line-mask">
                          <div className="line"></div>
                        </div>
                      </div>
                      <div data-w-id="b83b1921-bc4d-1a56-1b33-65a76eb8dfc4" className="div-block-65">
                        <a href="#tech-projects" className="link">Tech Projects</a>
                        <div className="line-mask">
                          <div className="line"></div>
                        </div>
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
                  <a data-w-id="b83b1921-bc4d-1a56-1b33-65a76eb8dfcf" style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} href="https://calendly.com/krystofjezek/15min" target="_blank" className="button w-inline-block">
                    <div className="text-block-18">Schedule a call</div>
                  </a>
                  <a href="mailto:krystof@jezek.me?subject=I%20want%20to%20work%20with%20Krystof" className="button inverted-border w-button">Get in touch</a>
                </div>
              </div>
              <div className="footer-right"></div>
            </div>
            <div className="footer-wrap">
              <div className="div-block-148">
                <a data-w-id="e52e7df0-2110-6781-a923-908ffca990d6" style={{ backgroundColor: 'rgba(38,38,38,0.25)' }} href="https://www.motionmockups.com/" target="_blank" className="div-block-149 w-inline-block">
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
                      <h1 className="label">motionmockups.com</h1><img src="/images/arrow-leftup.svg" loading="lazy" alt="" className="image-20 smaller" />
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
              <a id="w-node-eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4e9c-a7256e91" data-w-id="eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4e9c" href="/services/3d-environments" className="proj-item w-inline-block">
                <div className="specs-wrap">
                  <div className="specs-contain-button">
                    <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', backgroundColor: 'rgb(255,255,255)' }} className="button case">
                      <div style={{ color: 'rgb(5,7,10)' }} className="text-block-18">3D Environments</div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8cf1ef108473b19f15_cgi-environments.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695283a7d696d96b30253667_cgi-environments-web.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695275e011c223279acc50aa_cgi-environments.webm" type="video/webm; codecs=av01" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69527727554883f9bb4b736a_cgi-environments-fallback.mp4" type="video/mp4" />
                      </video></div>
                  </div>
                </div>
              </a>
              <a id="w-node-eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4eae-a7256e91" data-w-id="eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4eae" href="/services/mixed-reality" className="proj-item w-inline-block">
                <div className="specs-wrap">
                  <div className="specs-contain-button">
                    <div style={{ backgroundColor: 'rgb(255,255,255)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="button case">
                      <div style={{ color: 'rgb(5,7,10)' }} className="text-block-18">Mixed Reality</div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8dd36e4f0e13644d26_mixed-reality.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/6952839eb7f1353594c582d8_mixed-reality-web.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695275d5a58136ab8eba6191_mixed-reality.webm" type="video/webm; codecs=av01" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/68f072931563197bed892227_reel-1080-noaudio.mp4" type="video/mp4" />
                      </video></div>
                  </div>
                </div>
              </a>
            </div>
            <div className="main-hero-second">
              <div className="outer-container">
                <div className="main-hero-logos"><img loading="lazy" src="/images/vs-logo.svg" alt="" className="client-logo anna" /><img loading="lazy" src="/images/coinbase-logo.svg" alt="" className="client-logo slightly" /><img loading="lazy" src="/images/yonex-logo.svg" alt="" className="client-logo" /><img loading="lazy" src="/images/barbour.png" alt="" className="client-logo barbout" /><img loading="lazy" src="/images/onitsuka-tiger-logo.svg" alt="" className="client-logo tiger" /><img loading="lazy" src="/images/monopoly-logo.svg" alt="" className="client-logo larger" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/vodafone-logo-horiz-rgb-white-p-500.png 500w, /images/vodafone-logo-horiz-rgb-white-p-800.png 800w, /images/vodafone-logo-horiz-rgb-white-p-1080.png 1080w, /images/vodafone-logo-horiz-rgb-white-p-1600.png 1600w, /images/vodafone-logo-horiz-rgb-white-p-2000.png 2000w, /images/vodafone-logo-horiz-rgb-white-p-2600.png 2600w, /images/vodafone-logo-horiz-rgb-white-p-3200.png 3200w, /images/vodafone-logo-horiz-rgb-white.png 4908w" alt="" src="/images/vodafone-logo-horiz-rgb-white.png" loading="lazy" className="client-logo voda" /></div>
                <div className="main-hero-logos"><img loading="lazy" src="/images/kfc-logo.svg" alt="" className="client-logo _26-copy" /><img loading="lazy" src="/images/logo-1.svg" alt="" className="client-logo themag" /><img loading="lazy" src="/images/vsx-logo.svg" alt="" className="client-logo vsx" /><img loading="lazy" src="/images/trezor-1.svg" alt="" className="client-logo badlod" /><img loading="lazy" src="/images/frasers-logo-1-1.svg" alt="" className="client-logo orum" /><img sizes="(max-width: 512px) 100vw, 512px" srcSet="/images/jnt-p-500.png 500w, /images/jnt.png 512w" alt="" src="/images/jnt.png" loading="lazy" className="client-logo jnt" /><img sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" srcSet="/images/fini-p-500.png 500w, /images/fini-p-800.png 800w, /images/fini-p-1080.png 1080w, /images/fini.png 1280w" alt="" src="/images/fini.png" loading="lazy" className="client-logo fini" /></div>
              </div>
            </div>
          </div>
        </section>
        <div className="main-featured">
          <div data-w-id="904fbc8b-ac0d-96c5-14c3-cbef6d8f1f02" className="featured-carousel">
            <div className="featured-block archviz"></div>
            <div className="featured-block maison">
              <div data-poster-url="/videos/davinci-render2-poster-00001.jpg" data-video-urls="/videos/davinci-render2-transcode.mp4,/videos/davinci-render2-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" className="background-video-22 w-background-video w-background-video-atom"><video id="5d81a28f-e535-b59f-a29a-f428243f9c6c-video" autoPlay loop style={{ backgroundImage: 'url("/videos/davinci-render2-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                  <source src="/videos/davinci-render2-transcode.mp4" data-wf-ignore="true" />
                  <source src="/videos/davinci-render2-transcode.webm" data-wf-ignore="true" />
                </video></div>
            </div>
            <div className="featured-block ashfall"></div>
            <div className="featured-block archviz2"></div>
            <div className="featured-block"></div>
          </div>
        </div>
        <div className="main-animated none">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div id="targetDiv" className="div-block-101">
              <a id="w-node-_0922472a-8b42-2f1d-7fbf-9cb935b9512f-a7256e91" data-w-id="0922472a-8b42-2f1d-7fbf-9cb935b9512f" style={{ backgroundColor: 'rgb(0,0,0)' }} href="#" className="animated-mocks-div jewelry w-inline-block">
                <div className="proj-img-wrap main"></div>
                <div className="div-block-92 center">
                  <div className="div-block-94">
                    <p className="label">SPECIALIZED SERVICE</p>
                    <h1 className="heading-2 nomargin smaller margin">Jewelry Rendering</h1>
                    <p className="paragraph smaller">We specialize in high-quality 3D renderings and animations for jewelry brands. With extensive research and attention to detail, we develop hyper-realistic creatives that highlight your pieces and captivate your customers.</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="main-services">
          <h1 className="heading-3">Benefits of 3D and Motion</h1>
          <div className="div-block-100">
            <div className="div-block-96">
              <ul role="list" className="list-3 w-list-unstyled">
                <li className="list-item-5">
                  <a id="b1" data-w-id="48517e4d-6dc9-b73e-fbe1-e9c78c908da1" href="#" className="services-link selected w-inline-block">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Engage audiences</div>
                        <div className="services-heading">Engage audiences</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="list-item-2">
                  <a id="b2" data-w-id="2e2a33a2-e6a9-601a-7aec-e53ac47be4ee" href="#" className="services-link w-inline-block">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Showcase products</div>
                        <div className="services-heading">Showcase products</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="list-item-3">
                  <a id="b3" data-w-id="42980220-fa7b-6752-6347-82db5bd2c086" href="#" className="services-link w-inline-block">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Streamline Iterations</div>
                        <div className="services-heading">Streamline Iterations</div>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="list-item-4">
                  <a id="b4" data-w-id="76d3972d-f4d8-50bb-1f97-e1a26a48eb96" href="#" className="services-link w-inline-block">
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
              <div className="div-block-97"><img src="/images/ezgif.com-animated-gif-maker-4.gif" loading="lazy" width="Auto" height="Auto" alt="" className="image-26" /></div>
            </div>
          </div>
        </div>
        <section id="main-projects" className="main-projects">
          <div className="w-layout-blockcontainer container-3 w-container">
            <h1 className="heading-2">Recent Case Studies</h1>
            <div className="w-layout-grid main-proj-grid">
              <a id="w-node-_0a0f2415-0cbe-189d-07e1-6388208cf7e6-a7256e91" data-w-id="0a0f2415-0cbe-189d-07e1-6388208cf7e6" href="/work/the-mag-w-rap-2025" className="proj-item w-inline-block">
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
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">The Mag Wrap 2025</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><img src="/images/kj-stats.png" loading="lazy" alt="" className="image-31" />
                        <div className="tag-work">11 000+ Patreon subscribers</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695284dc1f07ca7587222ba2_wrap_header-web.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695278b0f17e6a5a37fb9287_wrap_header.webm" type="video/webm; codecs=av01" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/6952712cf5351c4fa6c08a02_wrap_header-fallback.mp4" type="video/mp4" />
                      </video></div>
                    <div className="proj-img wrap25"></div>
                  </div>
                </div>
              </a>
              <a id="w-node-_3c9fd363-924c-9b72-f486-2437327d7019-a7256e91" data-w-id="3c9fd363-924c-9b72-f486-2437327d7019" href="/work/barbour" className="proj-item w-inline-block">
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
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">Barbour Quilt FOOH</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695284f72a37f4a86fab92fc_barbour_header-web.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69527537d0ab5033d0366fd5_barbour_header-fallback.mp4" type="video/mp4" />
                      </video></div>
                    <div className="proj-img barbour"></div>
                  </div>
                </div>
              </a>
              <a data-w-id="4ea25938-b659-b714-d2b1-29b2bf03e4ad" href="/work/the-vsx-sports-bra" className="proj-item w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69528495821ee3ea17a98371_vsx_header-web.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69527846fe6b037995e316d1_vsx_header.webm" type="video/webm; codecs=av01" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69526e4f240f0c6419eaf322_vsx_header-fallback.mp4" type="video/mp4" />
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
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">The VSX Sports Bra</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><img src="/images/kj-stats.png" loading="lazy" alt="" className="image-31" />
                        <div className="tag-work">900k organic views</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a data-w-id="e57ea6ba-80b1-7650-626d-35445c6566c2" href="/work/old-projects/onitsuka-tiger-covent-garden" className="proj-item hide w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div data-poster-url="/videos/thumb-poster-00001.jpg" data-video-urls="/videos/thumb-transcode.mp4,/videos/thumb-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" style={{ display: 'none' }} className="background-video-18 w-background-video w-background-video-atom"><video id="e57ea6ba-80b1-7650-626d-35445c6566c5-video" autoPlay loop style={{ backgroundImage: 'url("/videos/thumb-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                        <source src="/videos/thumb-transcode.mp4" data-wf-ignore="true" />
                        <source src="/videos/thumb-transcode.webm" data-wf-ignore="true" />
                      </video></div>
                    <div className="proj-img onitsuykja"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="div-block-134">
                        <div className="mini-label">
                          <div className="label mini">3D</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">VFX</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Edit</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">Onitsuka Tiger Store Opening</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a data-w-id="beda2a35-ec7b-a2d7-ff1d-a58bd6c4d332" href="/work/old-projects/yonex-s-d-campaign" className="proj-item hide w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div data-poster-url="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-poster-00001.jpg" data-video-urls="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-transcode.mp4,https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" style={{ display: 'none' }} className="background-video-18 w-background-video w-background-video-atom"><video id="beda2a35-ec7b-a2d7-ff1d-a58bd6c4d335-video" autoPlay loop style={{ backgroundImage: 'url("https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                        <source src="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-transcode.mp4" data-wf-ignore="true" />
                        <source src="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/661920cab5ad155328351506_yonex-m-16-transcode.webm" data-wf-ignore="true" />
                      </video></div>
                    <div className="proj-img yonex"></div>
                  </div>
                  <div className="div-block-99">
                    <div className="wrappedtext">
                      <div className="div-block-134">
                        <div className="mini-label">
                          <div className="label mini">3D</div>
                        </div>
                        <div className="mini-label">
                          <div className="label mini">Motion Graphics</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">Yonex S&amp;D Campaign</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><img src="/images/kj-icon.png" loading="lazy" alt="" className="image-31" />
                        <div className="tag-work">+100% engagement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a data-w-id="54a607ca-508e-faa0-2092-3af7255d1dbd" href="/work/old-projects/the-mag-w-rap-2024" className="proj-item hide w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div data-poster-url="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-poster-00001.jpg" data-video-urls="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-transcode.mp4,https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" style={{ display: 'none' }} className="background-video-18 w-background-video w-background-video-atom"><video id="efac925b-8df2-a65c-6fea-0f0500b21582-video" autoPlay loop style={{ backgroundImage: 'url("https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                        <source src="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-transcode.mp4" data-wf-ignore="true" />
                        <source src="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/66190723b6c7e82f238da5bb_Wrap-Header-16x9-transcode.webm" data-wf-ignore="true" />
                      </video></div>
                    <div className="proj-img wrap-24"></div>
                  </div>
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
                          <div className="label mini">Motion Graphics</div>
                        </div>
                      </div>
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">The Mag W/Rap 2024</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><img src="/images/kj-stats.png" loading="lazy" alt="" className="image-31" />
                        <div className="tag-work">4 milion total views</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a id="w-node-ca5842f0-12ea-bba6-91ec-c62ab4bb5501-a7256e91" data-w-id="ca5842f0-12ea-bba6-91ec-c62ab4bb5501" href="/work/chainer" className="proj-item w-inline-block">
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
                      <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                        <h2 className="proj-heading">Chainer</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><video autoPlay loop muted playsInline style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', height: '100%', display: 'block', objectFit: 'cover' }}>
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695284ee340c7189db178428_chainer_header-web.mp4" type="video/mp4; codecs=hvc1" />
                        <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69526cf4233d31684fe2d556_chainer_header-fallback.mp4" type="video/mp4" />
                      </video></div>
                    <div className="proj-img"></div>
                  </div>
                </div>
              </a>
              <a data-w-id="4411092d-bab4-1c17-b643-f1bc750275ee" href="/work/old-projects/lepshee" className="proj-item hide w-inline-block">
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="proj-img lepshee"></div>
                    <div data-poster-url="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-poster-00001.jpg" data-video-urls="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-transcode.mp4,https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-transcode.webm" data-autoplay="true" data-loop="true" data-wf-ignore="true" data-beta-bgvideo-upgrade="false" style={{ display: 'none' }} className="background-video-18 w-background-video w-background-video-atom"><video id="4411092d-bab4-1c17-b643-f1bc750275f2-video" autoPlay loop style={{ backgroundImage: 'url("https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-poster-00001.jpg")' }} muted playsInline data-wf-ignore="true" data-object-fit="cover">
                        <source src="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-transcode.mp4" data-wf-ignore="true" />
                        <source src="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/644ecb4d0014984db5aa9f3d_ezxa-transcode.webm" data-wf-ignore="true" />
                      </video></div>
                  </div>
                  <div className="div-block-99">
                    <div className="label gray">3D • MOTION GRAPHICS</div>
                    <div className="div-block-67"><img src="/images/arrow.svg" loading="lazy" alt="" className="image-19" />
                      <h2 className="proj-heading">Lepshee</h2>
                    </div>
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
              <div id="w-node-a99893c8-7a95-570f-74fb-4a4430edba87-a7256e91" data-w-id="a99893c8-7a95-570f-74fb-4a4430edba87" className="snapshot-cover">
                <div className="snapshot-img _2"></div>
              </div>
              <div id="w-node-f6c05c63-8807-5c35-fd3d-79967d9a78b5-a7256e91" data-w-id="f6c05c63-8807-5c35-fd3d-79967d9a78b5" className="snapshot-cover">
                <div className="snapshot-img _3"></div>
              </div>
              <div id="w-node-dad5dac9-b366-df48-a450-723abb21c63e-a7256e91" data-w-id="dad5dac9-b366-df48-a450-723abb21c63e" className="snapshot-cover">
                <div className="snapshot-img _6"></div>
              </div>
              <div id="w-node-b575eaa3-7424-2bce-75f7-6d5fa1bbc967-a7256e91" data-w-id="b575eaa3-7424-2bce-75f7-6d5fa1bbc967" className="snapshot-cover">
                <div className="snapshot-img _1"></div>
              </div>
              <div id="w-node-aa034c7d-cfea-c763-d292-2857be8f653b-a7256e91" data-w-id="aa034c7d-cfea-c763-d292-2857be8f653b" className="snapshot-cover">
                <div className="snapshot-img _4"></div>
              </div>
              <div id="w-node-c81a9b1c-2467-5bfd-bc49-b29a607d269e-a7256e91" data-w-id="c81a9b1c-2467-5bfd-bc49-b29a607d269e" className="snapshot-cover hori">
                <div className="snapshot-img _5"></div>
              </div>
            </div>
            <div className="div-block-58">
              <a href="https://www.instagram.com/krystof.jezek/" data-w-id="a2992b72-3a93-973f-8c0f-930a1e057771" style={{ color: 'rgba(255,255,255,0.5)' }} target="_blank" className="nav-button">See more work on Instagram</a>
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
                  <div>Github</div><img src="/images/arrow-leftup.svg" loading="lazy" alt="" className="github" />
                </a>
                <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8cf4215a663de37a53_coding-01.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695283b76efa4d906ab85453_coding-01-web.mp4" type="video/mp4; codecs=hvc1" />
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
                  <div>Instagram</div><img src="/images/arrow-leftup.svg" loading="lazy" alt="" className="github" />
                </a>
                <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8c5555eff0c077ddb3_coding-02.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695283da308ff23f89e75936_coding-02-web.mp4" type="video/mp4; codecs=hvc1" />
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69527601ddffbfd5ce74c753_coding-02.webm" type="video/webm; codecs=av01" />
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/69526cb36833503069523e6c_coding-02-fallback.mp4" type="video/mp4" />
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
                  <div>Github</div><img src="/images/arrow-leftup.svg" loading="lazy" alt="" className="github" />
                </a>
                <div className="cb w-embed"><video autoPlay loop muted playsInline poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69528b8daac8e69a98e764b2_kokos.jpg" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}>
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695283be26d121db605469b7_kokos-web.mp4" type="video/mp4; codecs=hvc1" />
                    <source src="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/695275ee0fec759f8b220049_kokos.webm" type="video/webm; codecs=av01" />
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
                    <div className="div-block-144"><img src="/images/yiskra_studio_logo.jpeg" loading="lazy" alt="" className="image-32" /></div>
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
                    <div className="div-block-144"><img src="/images/1753950309864.jpg" loading="lazy" alt="" className="image-32" /></div>
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
                    <div className="div-block-144"><img src="/images/relive.png" loading="lazy" width="15" alt="" className="image-32" /></div>
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
                    <div className="div-block-144"><img src="/images/1631366714918.jpeg" loading="lazy" alt="" className="image-32" /></div>
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
                    <div className="div-block-144"><img src="/images/apify_logo.jpeg" loading="lazy" alt="" className="image-32" /></div>
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
                    <div className="div-block-144"><img src="/images/glami-logo.jpg" loading="lazy" alt="" className="image-32" /></div>
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
                    <div className="div-block-144"><img src="/images/cvutlogo-2.png" loading="lazy" alt="" className="image-32" /></div>
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
