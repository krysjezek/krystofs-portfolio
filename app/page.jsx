'use client'

import { useRef, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'
import EmbedVideo from '@/components/EmbedVideo'
import Image from 'next/image'
import { useServiceTabs } from '@/hooks/useServiceTabs'
import { useCardTilt } from '@/hooks/useCardTilt'
import { useMarquee } from '@/hooks/useMarquee'
import { useHoverShimmer } from '@/hooks/useHoverShimmer'
import gsap from 'gsap'
import CopyEmailButton from '@/components/CopyEmailLink'
import JsonLd from '@/components/JsonLd'
import { homepageStructuredData } from './seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''
const PROFILE_BLUR = 'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABQEG/8QAIBABAAEDAwUAAAAAAAAAAAAAAQIAAwQSEyERMkJRcv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwAe5h40ce9ruG4OqJGXMT5pXGbJjWjch2Hkeqyk1ZyV5V61KD//2Q=='

function ExternalArrowIcon() {
  return (
    <svg className="image-20 recognition-arrow" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1 9 9 1M3 1h6v6" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

export default function HomePage() {
  const profilePicUrl = `${CDN}/images/profilovka-new-edit-ezgif.com-png-to-webp-converter.webp`
  const gridRef = useRef(null)
  const marqueeRef = useRef(null)
  const mockupsBannerRef = useRef(null)
  useServiceTabs()
  useCardTilt(gridRef)
  useMarquee(marqueeRef)
  useHoverShimmer(mockupsBannerRef)

  // Scale-up entrance. Delay per element via data-reveal-scale="<seconds>".
  // Lives here (not in useScrollReveal) so it replays on every SPA re-navigation.
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    document.querySelectorAll('[data-reveal-scale]').forEach(el => {
      const delay = parseFloat(el.dataset.revealScale) || 0
      gsap.set(el, { scale: 0.85, transformOrigin: 'center center' })
      gsap.to(el, { scale: 1, duration: 0.6, ease: 'circ.inOut', delay })
    })
  }, [])

  return (
    <>
      <Navbar />
      <JsonLd data={homepageStructuredData()} />
      <div id="main-content" role="main" className="w-layout-blockcontainer container-2 w-container">
        <section className="main-hero">
          <div className="liner bottom"></div>
          <div className="w-layout-blockcontainer container-3 padbot nogap w-container" data-reveal="hero">
            <div className="footer-wrap">
              <div className="footer-left">
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfab-a7256e91" className="div-block-135">
                  <div className="footer--text">
                    <div className="div-block-139" data-reveal-scale="0.05">
                      <Image
                        fill
                        priority
                        src={profilePicUrl}
                        alt="Kryštof Ježek"
                        placeholder="blur"
                        blurDataURL={PROFILE_BLUR}
                        sizes="(max-width: 991px) 50vw, 25vw"
                        style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
                      />
                    </div>
                  </div>
                </div>
                <div id="w-node-b83b1921-bc4d-1a56-1b33-65a76eb8dfae-a7256e91" className="div-block-135">
                  <div className="footer--text">
                    <h1 className="label">Independent CGI Designer</h1>
                    <div className="div-block-59">
                      <p className="paragraph">I craft high-end CGI environments and motion visuals for brands and studios. In my free time, I&#x27;m building apps and creative tools that bridge art and tech.</p>
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
                        <a href="/services/mixed-reality" className="link">FOOH &amp; Mixed Reality</a>
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
                  <a style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} href="https://calendly.com/krystofjezek/15min" target="_blank" rel="noopener noreferrer" className="button w-inline-block" data-cursor="Choose time.." data-cursor-icon="arrow">
                    <div className="text-block-18">Schedule a call</div>
                  </a>
                  <CopyEmailButton className="button inverted-border w-button">Get in touch</CopyEmailButton>
                </div>
              </div>
              <div className="footer-right"></div>
            </div>
            <div className="footer-wrap">
              <div className="div-block-148">
                <a ref={mockupsBannerRef} style={{ backgroundColor: 'rgba(38,38,38,0.25)' }} href="https://www.motionmockups.com/" target="_blank" rel="noopener noreferrer" className="div-block-149 w-inline-block" data-cursor="Visit" data-cursor-icon="arrow" data-reveal-scale="0.25">
                  <div id="w-node-_42e1a6b1-60e7-89d0-2ef5-bd4cb01f0209-a7256e91" className="div-block-151">
                    <div className="div-block-154">
                      <div className="div-block-150">
                        <p className="paragraph">Motion Mockups</p>
                        <div className="mini-label green">
                          <div className="label mini miniultra">New</div>
                        </div>
                      </div>
                      <h2 className="label white">Collection of 8 video mockups.<br />Easy to use AE templates. 4K, all formats.<br /></h2>
                    </div>
                    <div className="div-block-153">
                      <h2 className="label">motionmockups.com</h2><Image src={CDN + '/images/arrow-leftup.svg'} alt="" width={10} height={10} unoptimized className="image-20 smaller" />
                    </div>
                  </div>
                  <div id="w-node-_1ced7a6b-e1d3-ec40-248f-ca4885de56d5-a7256e91" className="div-block-152">
                    <div className="code-embed mobile w-embed"><EmbedVideo
                      poster="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69944082d88aed7c8242c463_Comp%201%20(0-00-00-00).png"
                      posterMobile="https://cdn.prod.website-files.com/5d626c045bf4d84a1c256e90/69944804e0ecbc47b70b6bea_Comp%202%20(0-00-00-00).png"
                      posterAlt="Motion Mockups video template collection preview"
                      title="Motion Mockups video mockup collection"
                      posterPriority
                      srcMp4="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/6994449789efbe463813c5f2_web-video-2k.mp4"
                      srcMp4Mobile="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/699447a96279cd427dd46294_web-video-mobile.mp4"
                    /></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="w-layout-blockcontainer container-3 header w-container">
            <div ref={gridRef} className="w-layout-grid main-proj-grid head" data-reveal-group="hero">
              <a id="w-node-eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4e9c-a7256e91" href="/services/3d-environments" className="proj-item w-inline-block" data-cursor="Explore" data-cursor-icon="eye" data-reveal data-reveal-scale="0.5">
                <div className="specs-wrap">
                  <div className="specs-contain-button">
                    <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', backgroundColor: 'rgb(255,255,255)' }} className="button case">
                      <div style={{ color: 'rgb(5,7,10)' }} className="text-block-18">3D Environments &amp; Custom Mockups</div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <div className="cb w-embed"><EmbedVideo
                      poster="/videos/posters/cgi-environments.jpg"
                      posterAlt="CGI 3D environments service reel preview"
                      title="CGI and 3D environments portfolio reel"
                      srcH265="/videos/h265/cgi-environments-web.mp4"
                      srcAv1="/videos/av1/cgi-environments.webm"
                      srcMp4="/videos/h264/cgi-environments-fallback.mp4"
                    /></div>
                  </div>
                </div>
              </a>
              <a id="w-node-eb78cafc-0f7f-e8d6-7ab0-e20f7e4b4eae-a7256e91" href="/services/mixed-reality" className="proj-item w-inline-block" data-cursor="Explore" data-cursor-icon="eye" data-reveal data-reveal-scale="0.75">
                <div className="specs-wrap">
                  <div className="specs-contain-button">
                    <div style={{ backgroundColor: 'rgb(255,255,255)', transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="button case">
                      <div style={{ color: 'rgb(5,7,10)' }} className="text-block-18">FOOH &amp; Mixed Reality</div>
                    </div>
                  </div>
                  <div className="div-block-66">
                    <div className="cb w-embed"><EmbedVideo
                      poster="/videos/posters/mixed-reality.jpg"
                      posterAlt="Mixed reality and FOOH-style CGI campaign reel preview"
                      title="Mixed reality CGI campaign reel"
                      srcH265="/videos/h265/mixed-reality-web.mp4"
                      srcAv1="/videos/av1/mixed-reality.webm"
                      srcMp4="/videos/h264/mixed-reality-fallback.mp4"
                    /></div>
                  </div>
                </div>
              </a>
            </div>
            <div className="main-hero-second">
              <div className="outer-container">
                <div ref={marqueeRef} className="logo-marquee-track">
                  <Image src={CDN + '/images/vs-logo.svg'} alt="Victoria's Secret logo" width={100} height={20} unoptimized className="client-logo anna" />
                  <Image src={CDN + '/images/coinbase-logo.svg'} alt="Coinbase logo" width={100} height={20} unoptimized className="client-logo slightly" />
                  <Image src={CDN + '/images/yonex-logo.svg'} alt="Yonex logo" width={100} height={20} unoptimized className="client-logo" />
                  <Image src={CDN + '/images/barbour.png'} alt="Barbour logo" width={100} height={20} className="client-logo barbout" />
                  <Image src={CDN + '/images/onitsuka-tiger-logo.svg'} alt="Onitsuka Tiger logo" width={100} height={20} unoptimized className="client-logo tiger" />
                  <Image src={CDN + '/images/monopoly-logo.svg'} alt="Monopoly logo" width={100} height={20} unoptimized className="client-logo larger" />
                  <Image src={CDN + '/images/vodafone-logo-horiz-rgb-white.png'} alt="Vodafone logo" width={4908} height={1224} className="client-logo voda" />
                  <Image src={CDN + '/images/kfc-logo.svg'} alt="KFC logo" width={100} height={20} unoptimized className="client-logo _26-copy" />

                  <Image src={CDN + '/images/vsx-logo.svg'} alt="VSX logo" width={100} height={20} unoptimized className="client-logo vsx" />
                  <Image src={CDN + '/images/trezor-1.svg'} alt="Trezor logo" width={100} height={20} unoptimized className="client-logo badlod" />
                  <Image src={CDN + '/images/frasers-logo-1-1.svg'} alt="Frasers logo" width={100} height={20} unoptimized className="client-logo orum" />
                  <Image src={CDN + '/images/jnt.png'} alt="JNT logo" width={512} height={512} className="client-logo jnt" />
                  <Image src={CDN + '/images/fini.png'} alt="Fini logo" width={1280} height={640} className="client-logo fini" />
                  {/* Duplicate set for seamless loop */}
                  <Image src={CDN + '/images/vs-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo anna" />
                  <Image src={CDN + '/images/coinbase-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo slightly" />
                  <Image src={CDN + '/images/yonex-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo" />
                  <Image src={CDN + '/images/barbour.png'} alt="" width={100} height={20} className="client-logo barbout" />
                  <Image src={CDN + '/images/onitsuka-tiger-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo tiger" />
                  <Image src={CDN + '/images/monopoly-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo larger" />
                  <Image src={CDN + '/images/vodafone-logo-horiz-rgb-white.png'} alt="" width={4908} height={1224} className="client-logo voda" />
                  <Image src={CDN + '/images/kfc-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo _26-copy" />

                  <Image src={CDN + '/images/vsx-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo vsx" />
                  <Image src={CDN + '/images/trezor-1.svg'} alt="" width={100} height={20} unoptimized className="client-logo badlod" />
                  <Image src={CDN + '/images/frasers-logo-1-1.svg'} alt="" width={100} height={20} unoptimized className="client-logo orum" />
                  <Image src={CDN + '/images/jnt.png'} alt="" width={512} height={512} className="client-logo jnt" />
                  <Image src={CDN + '/images/fini.png'} alt="" width={1280} height={640} className="client-logo fini" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="main-featured" data-reveal>
          <div className="featured-carousel">
            <div className="featured-block archviz"><Image fill src={CDN + '/images/niacid.webp'} alt="3D cosmetic product visualization" style={{ objectFit: 'cover' }} sizes="100vw" /></div>
            <div className="featured-block maison">
              <BackgroundVideo className="background-video-22"
                poster="/videos/posters/davinci-render2.jpg"
                posterAlt="CGI product visualization motion render preview"
                title="CGI product visualization motion render"
                srcMp4="/videos/h264/davinci-render2.mp4"
                srcWebm="/videos/other/davinci-render2.webm"
              />
            </div>
            <div className="featured-block ashfall"><Image fill src={CDN + '/images/red-ring-exportv1-min-ezgif.com-png-to-webp-converter.webp'} alt="Red abstract 3D ring render" style={{ objectFit: 'cover' }} sizes="100vw" /></div>
            <div className="featured-block archviz2"><Image fill src={CDN + '/images/can-v3.webp'} alt="3D beverage can product render" style={{ objectFit: 'cover' }} sizes="100vw" /></div>
            <div className="featured-block"><Image fill src={CDN + '/images/fragrance-3.webp'} alt="3D fragrance bottle render" style={{ objectFit: 'cover' }} sizes="100vw" /></div>
          </div>
        </div>

        <div className="main-services" data-reveal>
          <h2 className="heading-3">Why art-directed 3D</h2>
          <div className="div-block-100">
            <div className="div-block-96">
              <ul role="list" className="list-3 w-list-unstyled">
                <li className="list-item-5">
                  <button id="b1" type="button" className="services-link selected w-inline-block" data-cursor="Explore" data-cursor-icon="eye">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Build a visual world</div>
                        <div className="services-heading">Build a visual world</div>
                      </div>
                    </div>
                  </button>
                </li>
                <li className="list-item-2">
                  <button id="b2" type="button" className="services-link w-inline-block" data-cursor="Explore" data-cursor-icon="eye">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Direct every detail</div>
                        <div className="services-heading">Direct every detail</div>
                      </div>
                    </div>
                  </button>
                </li>
                <li className="list-item-3">
                  <button id="b3" type="button" className="services-link w-inline-block" data-cursor="Explore" data-cursor-icon="eye">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Iterate efficiently</div>
                        <div className="services-heading">Iterate efficiently</div>
                      </div>
                    </div>
                  </button>
                </li>
                <li className="list-item-4">
                  <button id="b4" type="button" className="services-link w-inline-block" data-cursor="Explore" data-cursor-icon="eye">
                    <div className="div-block-104">
                      <div style={{ transform: 'translate3d(0, 0px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-105">
                        <div className="services-heading">Extend across formats</div>
                        <div className="services-heading">Extend across formats</div>
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            <div id="serv2" className="div-block-95 none">
              <div className="div-block-98">
                <div className="services-heading large">Direct every detail</div>
                <p className="paragraph smaller">Control composition, lighting, materials, weather, and scale without being limited by a physical location or shoot.</p>
              </div>
              <div className="div-block-97 _2"><Image fill src={CDN + '/images/untitled.2png-min.png'} alt="3D product showcase visual" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
            </div>
            <div id="serv4" className="div-block-95 none">
              <div className="div-block-98">
                <div className="services-heading large">Extend across formats</div>
                <p className="paragraph smaller">A single environment can support stills, animation, vertical edits, and wider campaign assets while keeping the art direction consistent.</p>
              </div>
              <div className="div-block-97 _4"><Image fill src={CDN + '/images/chainer-case-4.webp'} alt="Chainer 3D product visualization" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
            </div>
            <div id="serv3" className="div-block-95 none">
              <div className="div-block-98">
                <div className="services-heading large">Iterate efficiently</div>
                <p className="paragraph smaller">Once a scene is built, camera angles, lighting, materials, and seasonal variations can be explored without rebuilding the production from scratch.</p>
              </div>
              <div className="div-block-97 _3"><Image fill src={CDN + '/images/kunaj-sklo-preview-2-min-ezgif.com-png-to-webp-converter.webp'} alt="Iterative 3D glass product preview" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
            </div>
            <div id="serv1" className="div-block-95">
              <div className="div-block-98">
                <div className="services-heading large">Build a visual world</div>
                <p className="paragraph smaller">Move beyond a neutral render. An environment can establish mood, narrative, and a recognizable visual language around a product or campaign.</p>
              </div>
              <div className="div-block-97"><Image fill unoptimized src={CDN + '/images/ezgif.com-animated-gif-maker-4.gif'} loading="lazy" alt="Animated 3D motion design example" className="image-26" style={{ objectFit: 'cover' }} /></div>
            </div>
          </div>
        </div>
        <section id="main-projects" className="main-projects">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="section-heading-grid">
              <h2 className="heading-2 nomargin">Selected Work</h2>
              <p className="paragraph section-context">3D environments are my main focus, but I still take on broader projects when they&#x27;re a good fit. The work below spans art direction, motion, simulation and product visuals.</p>
            </div>
            <div className="w-layout-grid main-proj-grid" data-reveal-group>
              <a id="w-node-_0a0f2415-0cbe-189d-07e1-6388208cf7e6-a7256e91" href="/work/the-mag-w-rap-2025" className="proj-item w-inline-block" data-cursor="Explore" data-cursor-icon="eye" data-reveal>
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
                      <div className="div-block-67"><Image src={CDN + '/images/arrow.svg'} alt="" width={25} height={25} unoptimized className="image-19" />
                        <h2 className="proj-heading">The Mag Wrap 2025</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><Image src={CDN + '/images/kj-stats.png'} alt="" width={32} height={16} className="image-31" />
                        <div className="tag-work">11 000+ Patreon subscribers</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><EmbedVideo
                      poster="/videos/posters/wrap_header.jpg"
                      posterAlt="The Mag Wrap 2025 3D motion design case study preview"
                      title="The Mag Wrap 2025 3D motion design package"
                      srcH265="/videos/h265/wrap_header-web.mp4"
                      srcAv1="/videos/av1/wrap_header.webm"
                      srcMp4="/videos/h264/wrap_header-fallback.mp4"
                    /></div>
                    <div className="proj-img wrap25"><Image fill src={CDN + '/images/wrap25_injektaz_preview0-00-01-02-min-ezgif.com-png-to-webp-converter.webp'} alt="The Mag Wrap 2025 case study preview" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
                  </div>
                </div>
              </a>
              <a id="w-node-_3c9fd363-924c-9b72-f486-2437327d7019-a7256e91" href="/work/barbour" className="proj-item w-inline-block" data-cursor="Explore" data-cursor-icon="eye" data-reveal>
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
                      <div className="div-block-67"><Image src={CDN + '/images/arrow.svg'} alt="" width={25} height={25} unoptimized className="image-19" />
                        <h2 className="proj-heading">Barbour Quilt FOOH</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><EmbedVideo
                      poster="/videos/posters/barbour_header.jpg"
                      posterAlt="Barbour Icons in Quilting FOOH campaign preview"
                      title="Barbour FOOH campaign CGI/VFX preview"
                      srcH265="/videos/h265/barbour_header-web.mp4"
                      srcMp4="/videos/h264/barbour_header-fallback.mp4"
                    /></div>
                    <div className="proj-img barbour"><Image fill src={CDN + '/images/Barbour-Header-HP2.webp'} alt="Barbour Quilt FOOH case study preview" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
                  </div>
                </div>
              </a>
              <a href="/work/the-vsx-sports-bra" className="proj-item w-inline-block" data-cursor="Explore" data-cursor-icon="eye" data-reveal>
                <div className="proj-img-wrap">
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><EmbedVideo
                      poster="/videos/posters/vsx_header.jpg"
                      posterAlt="The VSX Sports Bra 3D product visualization preview"
                      title="The VSX Sports Bra CGI product animation preview"
                      srcH265="/videos/h265/vsx_header-web.mp4"
                      srcAv1="/videos/av1/vsx_header.webm"
                      srcMp4="/videos/h264/vsx_header-fallback.mp4"
                    /></div>
                    <div className="proj-img vsx"><Image fill src={CDN + '/images/16x9thumb-ezgif.com-png-to-webp-converter.webp'} alt="The VSX Sports Bra case study preview" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
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
                      <div className="div-block-67"><Image src={CDN + '/images/arrow.svg'} alt="" width={25} height={25} unoptimized className="image-19" />
                        <h2 className="proj-heading">The VSX Sports Bra</h2>
                      </div>
                    </div>
                    <div className="div-block-127">
                      <div className="div-block-128"><Image src={CDN + '/images/kj-stats.png'} alt="" width={32} height={16} className="image-31" />
                        <div className="tag-work">900k organic views</div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a id="w-node-ca5842f0-12ea-bba6-91ec-c62ab4bb5501-a7256e91" href="/work/chainer" className="proj-item w-inline-block" data-cursor="Explore" data-cursor-icon="eye" data-reveal>
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
                      <div className="div-block-67"><Image src={CDN + '/images/arrow.svg'} alt="" width={25} height={25} unoptimized className="image-19" />
                        <h2 className="proj-heading">Chainer</h2>
                      </div>
                    </div>
                  </div>
                  <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
                    <div className="background-video-18 w-embed"><EmbedVideo
                      poster="/videos/posters/chainer_header.jpg"
                      posterAlt="Chainer 3D product visualization and web design case study preview"
                      title="Chainer 3D product visualization preview"
                      srcH265="/videos/h265/chainer_header-web.mp4"
                      srcMp4="/videos/h264/chainer_header-fallback.mp4"
                    /></div>
                    <div className="proj-img"><Image fill src={CDN + '/images/Chainer-Header-HP.webp'} alt="Chainer case study preview" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" /></div>
                  </div>
                </div>
              </a>

            </div>
          </div>
        </section>
        <section id="snapshots" className="main-snapshots">
          <div className="snapshots-wrap">
            <h2 className="heading-2">R&amp;D</h2>
            <div className="w-layout-grid snapshots-grid" data-reveal-group>
              <div id="w-node-a99893c8-7a95-570f-74fb-4a4430edba87-a7256e91" className="snapshot-cover" data-reveal>
                <div className="snapshot-img _2"><Image fill src={CDN + '/images/fragrance-3.webp'} alt="Fragrance bottle 3D research render" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 50vw, 33vw" /></div>
              </div>
              <div id="w-node-f6c05c63-8807-5c35-fd3d-79967d9a78b5-a7256e91" className="snapshot-cover" data-reveal>
                <div className="snapshot-img _3"><Image fill src={CDN + '/images/container3.webp'} alt="Industrial 3D environment research render" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 50vw, 33vw" /></div>
              </div>
              <div id="w-node-dad5dac9-b366-df48-a450-723abb21c63e-a7256e91" className="snapshot-cover" data-reveal>
                <div className="snapshot-img _6"><Image fill src={CDN + '/images/niacid.webp'} alt="Skincare product 3D research render" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 50vw, 33vw" /></div>
              </div>
              <div id="w-node-b575eaa3-7424-2bce-75f7-6d5fa1bbc967-a7256e91" className="snapshot-cover" data-reveal>
                <div className="snapshot-img _1"><Image fill src={CDN + '/images/final-min-5.png'} alt="Abstract 3D motion research render" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 50vw, 33vw" /></div>
              </div>
              <div id="w-node-aa034c7d-cfea-c763-d292-2857be8f653b-a7256e91" className="snapshot-cover" data-reveal>
                <div className="snapshot-img _4"><Image fill src={CDN + '/images/maisoncrivelli.webp'} alt="Maison Crivelli-inspired 3D product render" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 50vw, 33vw" /></div>
              </div>
              <div id="w-node-c81a9b1c-2467-5bfd-bc49-b29a607d269e-a7256e91" className="snapshot-cover hori" data-reveal>
                <div className="snapshot-img _5"><Image fill src={CDN + '/images/ezgif.com-resize.webp'} alt="Wide 3D motion research render" style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 66vw" /></div>
              </div>
            </div>
            <div className="div-block-58">
              <a href="https://www.instagram.com/krystof.jezek/" style={{ color: 'rgba(255,255,255,0.5)' }} target="_blank" rel="noopener noreferrer" className="nav-button">See more work on Instagram</a>
            </div>
          </div>
        </section>
        <section id="tech-projects" className="main-animated reverse-grad">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="section-heading-grid">
              <h2 className="heading-2 no-margin">Tech Projects</h2>
              <p className="paragraph section-context">I also build software and creative tools. These projects explore rendering, WebGL and video automation, and often feed back into my visual work.</p>
            </div>
            <div className="div-block-66 grid" data-reveal-group>
              <div className="cp-wrap" data-reveal>
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
                <a href="https://gitlab.fel.cvut.cz/jezekkr2/pcc-ray-tracing" target="_blank" rel="noopener noreferrer" className="github-button w-inline-block">
                  <div>GitLab</div><Image src={CDN + '/images/arrow-leftup.svg'} alt="" width={8} height={8} unoptimized className="github" />
                </a>
                <div className="cb w-embed"><EmbedVideo
                  poster="/videos/posters/coding-01.jpg"
                  srcH265="/videos/h265/coding-01-web.mp4"
                  srcMp4="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/68f3a8823d027ddf4acf306e_coding-01-down.mp4"
                /></div>
              </div>
              <div className="cp-wrap" data-reveal>
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
                <a href="https://www.instagram.com/relive.ar/" target="_blank" rel="noopener noreferrer" className="github-button w-inline-block">
                  <div>Instagram</div><Image src={CDN + '/images/arrow-leftup.svg'} alt="" width={8} height={8} unoptimized className="github" />
                </a>
                <div className="cb w-embed"><EmbedVideo
                  poster="/videos/posters/coding-02.jpg"
                  srcH265="/videos/h265/coding-02-web.mp4"
                  srcAv1="/videos/av1/coding-02.webm"
                  srcMp4="/videos/h264/coding-02-fallback.mp4"
                /></div>
              </div>
              <div className="cp-wrap" data-reveal>
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
                <a href="https://github.com/krysjezek/video-process-backend" target="_blank" rel="noopener noreferrer" className="github-button w-inline-block">
                  <div>Github</div><Image src={CDN + '/images/arrow-leftup.svg'} alt="" width={8} height={8} unoptimized className="github" />
                </a>
                <div className="cb w-embed"><EmbedVideo
                  poster="/videos/posters/kokos.jpg"
                  srcH265="/videos/h265/kokos-web.mp4"
                  srcAv1="/videos/av1/kokos.webm"
                  srcMp4="https://s3.amazonaws.com/webflow-prod-assets/5d626c045bf4d84a1c256e90/6904bf39c739929045b96bb7_IG_feed_1080x1080%20(1).mp4"
                /></div>
              </div>
            </div>
          </div>
        </section>
        <section id="main-projects" className="main-resume" data-reveal>
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <h2 className="heading-2 pad">About me</h2>
            <div className="div-block-141">
              <div className="div-block-143 top">
                <p className="paragraph">Independent CGI designer and creative problem solver.</p>
              </div>
              <div className="div-block-135 nomarg">
                <p className="paragraph">I&#x27;m based in Prague and work with brands and studios around the world.<br />I tend to move between art direction, visualization, motion and code.<br />A nerd with taste.</p>
              </div>
              <div id="w-node-a66f41d9-e251-18b3-06ea-3875b7f7d02d-a7256e91" className="div-block-142">
                <div className="div-block-143 date">
                  <p className="paragraph dates">20-26&#x27;</p>
                  <div id="w-node-_4ebab516-efd9-a6a1-4e35-be88f0a0a681-a7256e91" className="line about"></div>
                </div>
                <div id="w-node-_911d34b6-530c-4860-0a92-df038baabbbf-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"></div>
                    <p className="paragraph">Independent CGI Designer</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">CGI Environments, Visualization, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">23-25&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-e92b1f06-779b-ab8e-7226-54032dc56be0-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/yiskra_studio_logo.jpeg'} alt="Yiskra Studio logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Yiskra Studio</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">3D, Art Direction, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">23-25&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-_5a64a6dc-8158-3455-90ea-a07fb5ab6da6-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/1753950309864.jpg'} alt="ProductionBot logo" width={40} height={40} className="image-32" /></div>
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
                    <div className="div-block-144"><Image src={CDN + '/images/relive.png'} alt="Relive AR logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Relive AR</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">WebGL, AR, Growth</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">21-22&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/1631366714918.jpeg'} alt="Growthcurve logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Growthcurve</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">3D, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">19-21&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-_6023291a-8637-8489-7555-d076ce0a4cdc-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/apify_logo.jpeg'} alt="Apify Technologies logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Apify Technologies</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">Web, Video, Motion</p>
                  </div>
                </div>
                <div className="div-block-143 date">
                  <p className="paragraph dates">18-19&#x27;</p>
                  <div className="line about"></div>
                </div>
                <div id="w-node-_1cb748ed-e5bd-0608-0052-a71053df4e13-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/glami-logo.jpg'} alt="Glami logo" width={40} height={40} className="image-32" /></div>
                    <p className="paragraph">Glami</p>
                  </div>
                  <div className="div-block-143">
                    <p className="paragraph">AI Training</p>
                  </div>
                </div>
              </div>
              <div id="w-node-cf7ea84b-e864-21d3-c56e-f196d3a90349-a7256e91" className="div-block-142">
                <div className="div-block-143">
                  <p className="paragraph">22-25&#x27;</p>
                </div>
                <div id="w-node-cf7ea84b-e864-21d3-c56e-f196d3a9034d-a7256e91" className="postion">
                  <div className="div-block-143">
                    <div className="div-block-144"><Image src={CDN + '/images/cvutlogo-2.png'} alt="Czech Technical University logo" width={40} height={40} className="image-32" /></div>
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
        <section className="main-resume" aria-labelledby="recognition-heading" data-reveal>
          <div className="w-layout-blockcontainer container-3 nopad w-container">
            <h2 id="recognition-heading" className="heading-2 pad">Selected recognition</h2>
            <div className="div-block-141">
              <div className="div-block-143 top">
                <p className="paragraph">Selected external features and production credits for my CGI and motion work.</p>
              </div>
              <div className="div-block-135 nomarg"></div>
              <div className="recognition-list">
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://the-brandidentity.com/directory" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Featured as an independent CGI designer in The Brand Identity directory
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://the-brandidentity.com/favicon.ico)' }} aria-hidden="true"></span>
                    <p className="paragraph">The Brand Identity</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2026-07">July 2026</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://motionfolios.com/inspirations/krystof-jezek" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Featured portfolio in a curated directory of leading 3D motion work
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://global.divhunt.com/5b25794ad4a46784aa03244df4a7a28d_5809.png)' }} aria-hidden="true"></span>
                    <p className="paragraph">Motionfolios</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2026-06">June 2026</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://the-brandidentity.com/project/how-ashfall-built-out-shelbys-identity-from-an-extruded-hexagon?brid=YWdncwHSXqCQhlPojD_JIF5mJBjx" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Credited for 3D work on Shelby’s identity created with Ashfall Studio
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://the-brandidentity.com/favicon.ico)' }} aria-hidden="true"></span>
                    <p className="paragraph">The Brand Identity</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2026-05">May 2026</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.instagram.com/p/DWV5ftiDJhn/" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Featured in DESIGN BOD’s “The Art of the Perfect Render” spotlight
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(/design-bod.jpg)' }} aria-hidden="true"></span>
                    <p className="paragraph">DESIGN BOD</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2026-03">March 2026</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.brandsinmotion.xyz/resource/yiskra-veha" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Credited for 3D motion on VEHA’s identity created with Yiskra Studio
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/663ba87248e1575777904df4/e39de4b0-db21-4e23-91f5-816b1a8a12dc/favicon.ico?format=100w)' }} aria-hidden="true"></span>
                    <p className="paragraph">Brands in Motion</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2026-01">January 2026</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.linkedin.com/posts/3dartacademy_3drendering-blender3d-cgi-ugcPost-7388975297259413505-U6d6" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Featured by 3D Art Academy for my CGI and mixed-reality rendering
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://www.linkedin.com/favicon.ico)' }} aria-hidden="true"></span>
                    <p className="paragraph">3D Art Academy</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2025-10">October 2025</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.brandsinmotion.xyz/resource/ashfallstudio-fifthrow" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Credited for 3D work on the Fifth Row identity created with Ashfall Studio
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/663ba87248e1575777904df4/e39de4b0-db21-4e23-91f5-816b1a8a12dc/favicon.ico?format=100w)' }} aria-hidden="true"></span>
                    <p className="paragraph">Brands in Motion</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2025-04">April 2025</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.brandsinmotion.xyz/resource/ashfallstudio-tekuma" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Credited for the Tekuma case-study CGI created with Ashfall Studio
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://images.squarespace-cdn.com/content/v1/663ba87248e1575777904df4/e39de4b0-db21-4e23-91f5-816b1a8a12dc/favicon.ico?format=100w)' }} aria-hidden="true"></span>
                    <p className="paragraph">Brands in Motion</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2025-02">February 2025</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.linkedin.com/posts/lucaselijahmiller_3drendering-blender3d-jewelrydesign-ugcPost-7282809161397010433-Mj1i" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Featured by Lucas Miller for the realism and detail of my CGI rendering
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://www.linkedin.com/favicon.ico)' }} aria-hidden="true"></span>
                    <p className="paragraph">Lucas Miller</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2025-01">January 2025</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://www.awwwards.com/sites/krystof-portfolio-website" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Received an Awwwards Honorable Mention for my portfolio website
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://www.awwwards.com/favicon.ico)' }} aria-hidden="true"></span>
                    <p className="paragraph">Awwwards</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2023-12">December 2023</time>
                  </div>
                </div>
                <div className="recognition-row">
                  <div className="div-block-143 recognition-description">
                    <div className="div-block-65 recognition-description-link">
                      <a href="https://monopo.london/work/yonex-all-england-brand-identity/" target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
                        Credited for motion design on the Yonex All England teaser assets
                        <ExternalArrowIcon />
                      </a>
                      <div className="line-mask"><div className="line"></div></div>
                    </div>
                  </div>
                  <div className="div-block-143 recognition-source">
                    <span className="recognition-favicon" style={{ backgroundImage: 'url(https://monopo.london/favicon/favicon-32x32.png)' }} aria-hidden="true"></span>
                    <p className="paragraph">Monopo London</p>
                  </div>
                  <div className="div-block-143">
                    <time className="paragraph dates" dateTime="2023-09">September 2023</time>
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
