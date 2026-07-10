import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackgroundVideo from '@/components/BackgroundVideo'
import { pageSeo } from '../../seo'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

const featuredProjects = [
  {
    id: 'w-node-_03a17276-6ae4-7c7c-1c4a-065b032c86c0-500e5fc1',
    href: '/work/the-mag-w-rap-2025',
    title: 'The Mag Wrap 2025',
    services: 'ART DIRECTION • 3D • CGI',
    image: '/images/wrap25_injektaz_preview0-00-01-02-min-ezgif.com-png-to-webp-converter.webp',
    imageAlt: 'The Mag Wrap 2025 3D motion design case study',
    imageClass: 'proj-img wrap25',
    poster: '/videos/posters/wrap25_injektaz_preview.jpg',
    srcMp4: '/videos/h264/wrap25_injektaz_preview.mp4',
    srcWebm: '/videos/other/wrap25_injektaz_preview.webm',
  },
  {
    id: 'w-node-_8db91594-8b05-477c-8c94-527f4d715dcb-500e5fc1',
    href: '/work/barbour',
    title: 'Barbour Quilt FOOH',
    services: '3D • VFX • MOTION GRAPHICS',
    image: '/images/Barbour-Header-HP2.webp',
    imageAlt: 'Barbour Quilt FOOH case study',
    imageClass: 'proj-img barbour',
    poster: '/videos/posters/Barbour-London---16x9_3_prob4.jpg',
    srcMp4: '/videos/h264/Barbour-London---16x9_3_prob4.mp4',
    srcWebm: '/videos/other/Barbour-London---16x9_3_prob4.webm',
  },
  {
    href: '/work/the-vsx-sports-bra',
    title: 'The VSX Sports Bra',
    services: '3D • SIMULATION • LOOK DEVELOPMENT',
    image: '/images/16x9thumb-ezgif.com-png-to-webp-converter.webp',
    imageAlt: 'The VSX Sports Bra CGI product animation case study',
    imageClass: 'proj-img vsx',
    poster: '/videos/posters/vsx_16x9.jpg',
    srcMp4: '/videos/h264/vsx_16x9.mp4',
    srcWebm: '/videos/other/vsx_16x9.webm',
  },
  {
    id: 'w-node-d9b243bd-28e6-4374-48cc-fa79813e9ee9-500e5fc1',
    href: '/work/chainer',
    title: 'Chainer',
    services: 'ART DIRECTION • 3D • WEB DESIGN • SOUND DESIGN',
    image: '/images/Chainer-Header-HP.webp',
    imageAlt: 'Chainer 3D product visualization case study',
    imageClass: 'proj-img',
    poster: 'https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/6547b0ff636d8d2153b3eefd_portofilio-poster-00001.jpg',
    srcMp4: 'https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/6547b0ff636d8d2153b3eefd_portofilio-transcode.mp4',
    srcWebm: 'https://uploads-ssl.webflow.com/5d626c045bf4d84a1c256e90/6547b0ff636d8d2153b3eefd_portofilio-transcode.webm',
  },
]

export const metadata = {
  title: 'Work',
  ...pageSeo('/other/work'),
  description: 'Four featured CGI, 3D motion design, FOOH, and product visualization case studies by Kryštof Ježek.',
}

export const dynamic = 'force-static'

function ProjectCard({ project }) {
  return (
    <a id={project.id} href={project.href} className="proj-item w-inline-block" data-reveal>
      <div className="proj-img-wrap">
        <div className="div-block-99">
          <div className="wrappedtext">
            <div className="label gray">{project.services}</div>
            <div className="div-block-67">
              <Image src={CDN + '/images/arrow.svg'} alt="" width={25} height={25} unoptimized style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="image-19" />
              <h2 style={{ transform: 'translate3d(-40px, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="proj-heading">{project.title}</h2>
            </div>
          </div>
        </div>
        <div style={{ transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)' }} className="div-block-66">
          <BackgroundVideo
            className="background-video-18"
            style={{ display: 'none' }}
            poster={project.poster}
            srcMp4={project.srcMp4}
            srcWebm={project.srcWebm}
          />
          <div className={project.imageClass}>
            <Image fill src={CDN + project.image} alt={project.imageAlt} style={{ objectFit: 'cover' }} sizes="(max-width: 991px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <div className="w-layout-blockcontainer container-2 w-container">
        <div id="main-content" role="main" className="work-main">
          <h1 className="visually-hidden">Featured case studies</h1>
          <section className="container-3">
            <div className="w-layout-grid main-proj-grid" data-reveal-group>
              {featuredProjects.map((project) => (
                <ProjectCard project={project} key={project.href} />
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}
