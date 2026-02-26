import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'

export default function Bezestrachu() {
  return (
    <>
      <Navbar />
      <div className="work-main-video-wrap">
        <BackgroundVideo className="work-main-video"
          poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e944674bd9074bf9ddd482_intro do case-poster-00001.jpg"
          srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e944674bd9074bf9ddd482_intro do case-transcode.mp4"
          srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e944674bd9074bf9ddd482_intro do case-transcode.webm"
        />
      </div>
      <div>
        <div className="work-header-wrap">
          <div className="back-block">
            <a href="/" className="button inverted-border w-button">Back to home</a>
          </div>
          <div>
            <div className="subheadline">Bezestrachu</div>
            <h1 className="heading-1">Motion design rebrand</h1>
            <p className="paragraph">I lead a team of 3D artists to bring the new brand of Bezestrachu to life with 3D motion design. Teaming up with the talented brand designers at <a href="https://www.instagram.com/yiskra.studio/" target="_blank" className="link-lime">yiskra.studio</a>, was a fulfilling experience, as we brought the Bezestrachu team&#x27;s brand vision to reality. The result was a lively, eye-catching brand that truly captures the energy and passion of the top production house in the Czech Republic, Bezestrachu.<br />
              <a href="https://bezestrachu.com" target="_blank" className="link-lime"><span>bezestrachu.com</span></a>
            </p>
          </div>
        </div>
        <div className="w-layout-grid work-grid wrap">
          <div id="w-node-_29f6f88b-bbb8-6aef-df1d-3bc0f6e39c10-67f2d765" className="work-main-wrap first">
            <div className="w-layout-grid cs-grid _2-col">
              <div id="w-node-cd4baa0b-1ad0-41bf-af43-f758782c6f44-67f2d765" className="html-embed w-embed w-iframe w-script">
                <div style={{ padding: '75% 0 0 0', position: 'relative' }}><iframe src="https://player.vimeo.com/video/796936380?h=d64c69f816&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} title="Bezestrachu &amp;ndash; Brand Reveal"></iframe></div>
              </div>
              <div id="w-node-fdbd520a-bb90-9839-ee68-40b6c3decaa5-67f2d765" className="html-embed w-embed w-iframe w-script">
                <div style={{ padding: '75% 0 0 0', position: 'relative' }}><iframe src="https://player.vimeo.com/video/796901161?h=4cd72e0728&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }} title="claymotion-intro"></iframe></div>
              </div>
              <BackgroundVideo className="background-video-15 bezestrachu"
                poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e3461a2a73c8622898d8c1_bezestrachu-transformation-2-poster-00001.jpg"
                srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e3461a2a73c8622898d8c1_bezestrachu-transformation-2-transcode.mp4"
                srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e3461a2a73c8622898d8c1_bezestrachu-transformation-2-transcode.webm"
              />
              <BackgroundVideo className="background-video-15 bezestrachu"
                poster="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e3467f89fc0b83a22c5880_vid-3-poster-00001.jpg"
                srcMp4="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e3467f89fc0b83a22c5880_vid-3-transcode.mp4"
                srcWebm="https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/63e3467f89fc0b83a22c5880_vid-3-transcode.webm"
              />
            </div>
          </div>
        </div>
        <div className="work-header-wrap">
          <div>
            <p className="paragraph">Art Direction / Brand: <a href="https://www.instagram.com/yiskra.studio/" target="_blank" className="paragraph link">yiskra.studio</a><br />3D / Motion Lead: Krystof Jezek<br />3D Artists: <a href="https://www.instagram.com/jta_cz/" target="_blank" className="paragraph link">Josef Talac, Marek Sucharda</a><br />
              <a href="https://bezestrachu.com" target="_blank" className="link-lime"><span></span></a>
            </p>
          </div>
          <div className="back-block">
            <a href="/" className="button inverted-border w-button">Back to home</a>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="text-small">© KRYSTOF JEZEK 2023<br /></div>
      </div>
      <Footer />
    </>
  )
}
