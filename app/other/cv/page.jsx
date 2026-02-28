import Navbar from '@/components/Navbar'
import Image from 'next/image'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function CVPage() {
  return (
    <>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <section className="cv-main">
          <div className="w-layout-blockcontainer container-3 w-container">
            <div className="work-header-wrap">
              <div className="work-header-container">
                <div className="div-block-122">
                  <Image src={CDN + '/images/profilovka-maruska.png'} alt="" width={676} height={676} sizes="(max-width: 676px) 100vw, 676px" className="image-30" />
                  <div className="div-block-121">
                    <div className="work-h1-wrap">
                      <div className="div-block-112">
                        <h1 className="heading-h1">Kryštof Ježek</h1>
                      </div>
                    </div>
                    <div className="div-block-125 cv">
                      <div className="div-block-90">
                        <h1 className="label gray">/ 3D MOTION DESIGNER</h1>
                        <div className="div-block-59 cv">
                          <p className="paragraph cvhead">I am a 3D motion designer specializing in creating engaging 3D and 2D motion visuals, including CGI content, for brands, studios, and agencies worldwide. With a background in software engineering and design, I lead a skilled team to produce premium short-form content that generates millions of views annually.</p>
                          <a href="https://www.krystofjezek.com/" className="link invert cv back">Portfolio: <span className="blue invert">krystofjezek.com</span></a>
                          <div className="div-block-90 cv">
                            <a href="mailto:studio@krystofjezek.com?subject=Let&#x27;s%20work%20together!" className="link invert cv back">studio@krystofjezek.com</a>
                            <a href="https://wa.me/+420774066745?text=Hi%20Krystof%2C%20I%20am%20interested%20in%20collaborating%20with%20you%21" target="_blank" className="link invert cv back">+420 774 066 745</a>
                            <div className="link invert cv back">Vitkova 10, Prague, Czechia, 100 00</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cv-grid">
                <div id="w-node-_698648b2-4b0c-739d-c53a-66e8bc049148-e6b4e0a7" className="cv-container">
                  <div className="label gray">/ WORK EXPERIENCE</div>
                  <div className="cv-block">
                    <div className="cv-item">
                      <div className="div-block-123">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/webclip.png'} alt="" width={30} height={30} className="cv-favi" />
                          <div className="label cv">Self-employed</div>
                        </div>
                        <p className="cv-header">Freelance 3D Motion Designer<br /></p>
                      </div>
                      <p className="paragraph cv">Craft high-quality 3D renderings, animations, and motion graphics for clients in technology, fashion, and product branding. Collaborate with brands like Victoria&#x27;s Secret, Barbour and Yonex on Instagram campaigns. Manage a team to deliver quick-turn assets.<br /></p>
                      <div className="cv-subinfo gray">Feb 2017 - Present  |  Worldwide</div>
                    </div>
                    <div className="divider-horizontal"></div>
                    <div className="cv-item">
                      <div className="div-block-123">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/yiskra_studio_logo.jpeg'} alt="" width={30} height={30} className="cv-favi" />
                          <div className="label cv">YISKRA STUDIO</div>
                        </div>
                        <p className="cv-header">Lead 3D Artist<br /></p>
                      </div>
                      <p className="paragraph cv">Contribute to branding projects with specialized 3D expertise. Lead visual direction in CGI, driving the creation of compelling 3D animations and renderings to elevate brand identities and client presentations. Mentor 3D artists and motion designers and guiding the team in adopting advanced techniques for high-quality visual output.<br /></p>
                      <div className="cv-subinfo gray">Jan 2023 - Present  |  Prague, Czechia  |  Freelance</div>
                    </div>
                    <div className="divider-horizontal"></div>
                    <div className="cv-item">
                      <div className="div-block-123">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/1631366714918.jpeg'} alt="" width={30} height={30} className="cv-favi" />
                          <div className="label cv">Growthcurve</div>
                        </div>
                        <p className="cv-header">Motion Designer<br /></p>
                      </div>
                      <p className="paragraph cv">Created short social media ads for clients including Coinbase, ANNA Money, and Hubpay, incorporating 2D and 3D production techniques.Managed the full production pipeline for ads, from concept to final delivery, ensuring high-impact visuals that drive engagement and views.<br /></p>
                      <div className="cv-subinfo gray">May 2021 - Sep 2022  |  London, United Kingdom  |  Full-time</div>
                    </div>
                    <div className="divider-horizontal"></div>
                    <div className="cv-item">
                      <div className="div-block-123">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/apify_logo.jpeg'} alt="" width={30} height={30} className="cv-favi" />
                          <div className="label cv">APIFY</div>
                        </div>
                        <p className="cv-header">Visual Designer<br /></p>
                      </div>
                      <p className="paragraph cv">Worked on diverse design projects for a web scraping and browser automation platform, including web design, interview videos, and complex 3D animations. Developed visuals for multiple initiatives, ranging from product animations to promotional content, contributing to the platform&#x27;s marketing and user engagement efforts.<br /></p>
                      <div className="cv-subinfo gray">Aug 2019 - Sep 2021  |  Prague, Czechia  |  Part-time </div>
                    </div>
                  </div>
                </div>
                <div className="cv-container">
                  <div className="label gray">/ EDUCATION</div>
                  <div className="cv-block">
                    <div className="cv-item">
                      <div className="div-block-123">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/cvutlogo-2.png'} alt="" width={704} height={704} sizes="(max-width: 704px) 100vw, 704px" className="cv-favi" />
                          <div className="label cv">Czech technical university</div>
                        </div>
                        <p className="cv-header">Bachelor in Software Engineering<br /></p>
                      </div>
                      <p className="paragraph cv">Focused on core software engineering principles, including programming, algorithms, and system design. I completed the coursework while gaining practical experience in design and animation, bridging technical development with creative applications.<br /></p>
                      <div className="cv-subinfo gray">Sep 2022 - Jun 2025  |  Prague, Czechia |  Final Grade: A</div>
                    </div>
                    <div className="divider-horizontal"></div>
                    <div className="cv-item">
                      <div className="div-block-123">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/unnamed.jpg'} alt="" width={900} height={900} sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 900px" className="cv-favi" />
                          <div className="label cv">freecodecamp</div>
                        </div>
                        <p className="cv-header">JavaScript Algorithms and Data Structures<br /></p>
                      </div>
                      <p className="paragraph cv">Completed comprehensive curriculum covering JavaScript fundamentals, algorithmic problem-solving, and data structures. Built projects demonstrating proficiency in coding challenges, enhancing skills in software development applicable to web and interactive design.<br /></p>
                      <div className="cv-subinfo gray">Mar 2024</div>
                    </div>
                  </div>
                </div>
                <div className="cv-container">
                  <div className="label gray">/ OTHER</div>
                  <div className="cv-block">
                    <div className="cv-item">
                      <div className="div-block-123">
                        <p className="cv-header">Tools I Use Daily<br /></p>
                      </div>
                      <p className="paragraph cv"><span className="blue">3D: </span>Blender, Houdini, Nuke, Cinema 4D (Octane &amp; Redshift)<br /><span className="blue">Motion Design: </span>Adobe After Effects, Javascript Scripting (automation)<br /><span className="blue">Development:</span> HTML, CSS, JS, Next.JS, Three.JS, Python<br /></p>
                    </div>
                    <div className="divider-horizontal"></div>
                    <div className="cv-item">
                      <div className="div-block-123">
                        <p className="cv-header">Selected Personal Initiative<br /></p>
                      </div>
                      <div className="div-block-124">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/relive.png'} alt="" width={30} height={30} className="cv-favi" />
                          <div className="label cv gray">RELIVE AR - CUSTOM CRAFTED AR SOLUTIONS</div>
                        </div>
                        <p className="paragraph cv">Co-founded a platform that develops custom augmented reality (AR) solutions for brands using Three.js. Gained expertise in web-based AR development and 3D graphics integration with JavaScript.<br /></p>
                      </div>
                      <div className="div-block-124">
                        <div className="label cv gray">Animated mockups - VIDEO PROCESSING PYTHON BACKEND</div>
                        <p className="paragraph cv">Built a backend platform to service video mockup templates, integrating user inputs into pre-rendered videos using blending modes and homography.<br /></p>
                      </div>
                      <div className="div-block-124">
                        <div className="label cv gray">MY OWN RENDER ENGINE - RAYTRACING WITH C++</div>
                        <p className="paragraph cv">Developed a custom raytracing render engine in C++. Gained in-depth knowledge of computer graphics principles, ray tracing algorithms, and low-level optimization techniques in C++.<br /></p>
                      </div>
                      <div className="div-block-124">
                        <div className="cv-label-cont">
                          <Image src={CDN + '/images/udemy-business.png'} alt="" width={30} height={30} className="cv-favi" />
                          <div className="label cv gray">3D VISUAL ART IN C4D - UDEMY COURSE</div>
                        </div>
                        <p className="paragraph cv">Created and published a 40-hour Udemy course teaching the basics of 3D visual art in Cinema 4D and Octane.<br /></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="w-node-cded8d01-e391-f82f-9538-cfacde43d22a-e6b4e0a7" className="cv-container worked">
                  <div className="label gray">/ BRANDS I WORKED WITH</div>
                  <div className="main-hero-logos cv">
                    <Image src={CDN + '/images/vs-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo anna" />
                    <Image src={CDN + '/images/coinbase-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo slightly" />
                    <Image src={CDN + '/images/yonex-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo" />
                    <Image src={CDN + '/images/barbour.png'} alt="" width={100} height={20} unoptimized className="client-logo barbout" />
                    <Image src={CDN + '/images/onitsuka-tiger-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo tiger" />
                    <Image src={CDN + '/images/monopoly-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo larger" />
                    <Image src={CDN + '/images/vodafone-logo-horiz-rgb-white.png'} alt="" width={4908} height={1224} sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" className="client-logo voda" />
                  </div>
                  <div className="main-hero-logos cv">
                    <Image src={CDN + '/images/kfc-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo _26-copy" />
                    <Image src={CDN + '/images/logo-1.svg'} alt="" width={100} height={20} unoptimized className="client-logo themag" />
                    <Image src={CDN + '/images/vsx-logo.svg'} alt="" width={100} height={20} unoptimized className="client-logo vsx" />
                    <Image src={CDN + '/images/Untitled-1.png'} alt="" width={100} height={20} className="client-logo badlod" />
                    <Image src={CDN + '/images/frasers-logo-1-1.svg'} alt="" width={100} height={20} unoptimized className="client-logo orum" />
                    <Image src={CDN + '/images/jnt.png'} alt="" width={512} height={512} sizes="(max-width: 512px) 100vw, 512px" className="client-logo jnt" />
                    <Image src={CDN + '/images/fini.png'} alt="" width={1280} height={640} sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" className="client-logo fini" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="background"></div>
    </>
  )
}
