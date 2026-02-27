import Link from 'next/link'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function Footer() {
  return (
    <>
      <section id="footer" className="main-footer w-node-fdc1100f-5835-0dce-89e8-cffe96d29d50-96d29d50">
        <div className="w-layout-blockcontainer container-3 padbot w-container">
          <div className="liner"></div>
          <div className="div-block-147">
            <div className="liner show"></div>
          </div>
          <div className="footer-wrap">
            <div className="footer-left">
              <div id="w-node-_418f4411-9415-65e7-5c80-88c8c59ec8a3-96d29d50" className="div-block-135">
                <div className="footer--text">
                  <div className="div-block-139 half"></div>
                </div>
              </div>
              <div id="w-node-_1cc26f6b-2051-9734-6fdd-09e78fee6e1c-96d29d50" className="div-block-135">
                <div className="footer--text">
                  <div className="label">Social</div>
                  <div className="div-block-119">
                    <div data-w-id="1cc26f6b-2051-9734-6fdd-09e78fee6e21" className="div-block-65">
                      <a href="https://www.instagram.com/krystof.jezek/" target="_blank" rel="noopener noreferrer" className="link" data-cursor="Follow">Instagram</a>
                      <img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-20" />
                    </div>
                    <div data-w-id="1cc26f6b-2051-9734-6fdd-09e78fee6e27" className="div-block-65">
                      <a href="https://krystofjezek.gumroad.com/" target="_blank" rel="noopener noreferrer" className="link" data-cursor="Follow">Gumroad</a>
                      <img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-20" />
                    </div>
                    <div data-w-id="1cc26f6b-2051-9734-6fdd-09e78fee6e2d" className="div-block-65">
                      <a href="https://www.linkedin.com/in/krystofjezek/" target="_blank" rel="noopener noreferrer" className="link" data-cursor="Follow">LinkedIn</a>
                      <img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-20" />
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-c235baf4-0042-9ea3-d105-76c123799302-96d29d50" className="div-block-135">
                <div className="footer--text">
                  <div className="label">Menu</div>
                  <div className="div-block-119">
                    <div data-w-id="b5a27be9-eb29-a325-9611-3bbee91fce06" className="div-block-65">
                      <Link href="/services/3d-environments" className="link" data-cursor="Explore">3D Environments</Link>
                    </div>
                    <div data-w-id="83c84ea4-2158-f7fa-a22d-a8faeb1e691e" className="div-block-65">
                      <Link href="/services/mixed-reality" className="link" data-cursor="Explore">Mixed Reality</Link>
                    </div>
                    <div data-w-id="adb6576a-5e98-8477-410d-959810b17bcc" className="div-block-65">
                      <Link href="/#tech-projects" className="link" data-cursor="Explore">Tech Projects</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-d0465295-2a46-fd51-0bd9-307899204534-96d29d50" className="div-block-135">
                <div className="footer--text">
                  <div className="label">Contact</div>
                  <div className="div-block-119">
                    <div data-w-id="6565ca43-4312-11b1-fa85-94235efea807" className="div-block-65">
                      <a href="mailto:krystof@jezek.me?subject=Let&#x27;s%20work%20tohether!" className="link" data-cursor="Reach out">krystof@jezek.me</a>
                      <img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-20" />
                    </div>
                    <div data-w-id="6565ca43-4312-11b1-fa85-94235efea80d" className="div-block-65">
                      <a href="https://wa.me/420774066745" className="link" data-cursor="Reach out">WhatsApp</a>
                      <img src={CDN + '/images/arrow-leftup.svg'} loading="lazy" alt="" className="image-20" />
                    </div>
                  </div>
                </div>
              </div>
              <div id="w-node-_3c6d4f7d-1100-c88a-030c-a6eea34911a8-96d29d50" className="div-block-138">
                <a
                  data-w-id="781db635-c6b8-3b62-b788-d09e2533f131"
                  href="https://calendly.com/krystofjezek/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button w-inline-block"
                  data-cursor="Connect"
                >
                  <div className="text-block-18">Schedule a call</div>
                </a>
                <a
                  href="mailto:krystof@jezek.me?subject=I%20want%20to%20work%20with%20Krystof"
                  className="button inverted-border w-button"
                  data-cursor="Connect"
                >
                  Get in touch
                </a>
              </div>
            </div>
            <div className="footer-right"></div>
          </div>
        </div>
      </section>
      <div className="background">
        <div className="w-layout-blockcontainer container-3 bcg w-container">
          <div className="div-block-131">
            <div className="vertical-line hide"></div>
            <div className="vertical-line hide"></div>
            <div className="vertical-line hide"></div>
            <div className="vertical-line hide"></div>
            <div className="vertical-line hide"></div>
          </div>
        </div>
      </div>
    </>
  )
}
