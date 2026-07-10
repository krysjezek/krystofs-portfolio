'use client'

import { useEffect, useRef, useState } from 'react'

const recognitionItems = [
  {
    description: 'Received an Awwwards Honorable Mention for my portfolio website',
    href: 'https://www.awwwards.com/sites/krystof-portfolio-website',
    source: 'Awwwards',
    favicon: 'https://www.awwwards.com/favicon.ico',
    date: 'December 2023',
    dateTime: '2023-12',
  },
  {
    description: 'Featured as an independent CGI designer in The Brand Identity directory',
    href: 'https://the-brandidentity.com/directory',
    source: 'The Brand Identity',
    favicon: 'https://the-brandidentity.com/favicon.ico',
    date: 'July 2026',
    dateTime: '2026-07',
  },
  {
    description: 'Featured portfolio in a curated directory of leading 3D motion work',
    href: 'https://motionfolios.com/inspirations/krystof-jezek',
    source: 'Motionfolios',
    favicon: 'https://global.divhunt.com/5b25794ad4a46784aa03244df4a7a28d_5809.png',
    date: 'June 2026',
    dateTime: '2026-06',
  },
  {
    description: 'Credited for 3D work on Shelby’s identity created with Ashfall Studio',
    href: 'https://the-brandidentity.com/project/how-ashfall-built-out-shelbys-identity-from-an-extruded-hexagon?brid=YWdncwHSXqCQhlPojD_JIF5mJBjx',
    source: 'The Brand Identity',
    favicon: 'https://the-brandidentity.com/favicon.ico',
    date: 'May 2026',
    dateTime: '2026-05',
  },
  {
    description: 'Featured in DESIGN BOD’s “The Art of the Perfect Render” spotlight',
    href: 'https://www.instagram.com/p/DWV5ftiDJhn/',
    source: 'DESIGN BOD',
    favicon: '/design-bod.jpg',
    date: 'March 2026',
    dateTime: '2026-03',
  },
  {
    description: 'Credited for 3D motion on VEHA’s identity created with Yiskra Studio',
    href: 'https://www.brandsinmotion.xyz/resource/yiskra-veha',
    source: 'Brands in Motion',
    favicon: 'https://images.squarespace-cdn.com/content/v1/663ba87248e1575777904df4/e39de4b0-db21-4e23-91f5-816b1a8a12dc/favicon.ico?format=100w',
    date: 'January 2026',
    dateTime: '2026-01',
  },
  {
    description: 'Featured by 3D Art Academy for my CGI and mixed-reality rendering',
    href: 'https://www.linkedin.com/posts/3dartacademy_3drendering-blender3d-cgi-ugcPost-7388975297259413505-U6d6',
    source: '3D Art Academy',
    favicon: '/3d-art-academy-linkedin.jpg',
    date: 'October 2025',
    dateTime: '2025-10',
  },
  {
    description: 'Credited for 3D work on the Fifth Row identity created with Ashfall Studio',
    href: 'https://www.brandsinmotion.xyz/resource/ashfallstudio-fifthrow',
    source: 'Brands in Motion',
    favicon: 'https://images.squarespace-cdn.com/content/v1/663ba87248e1575777904df4/e39de4b0-db21-4e23-91f5-816b1a8a12dc/favicon.ico?format=100w',
    date: 'April 2025',
    dateTime: '2025-04',
  },
  {
    description: 'Credited for the Tekuma case-study CGI created with Ashfall Studio',
    href: 'https://www.brandsinmotion.xyz/resource/ashfallstudio-tekuma',
    source: 'Brands in Motion',
    favicon: 'https://images.squarespace-cdn.com/content/v1/663ba87248e1575777904df4/e39de4b0-db21-4e23-91f5-816b1a8a12dc/favicon.ico?format=100w',
    date: 'February 2025',
    dateTime: '2025-02',
  },
  {
    description: 'Featured by Lucas Miller for the realism and detail of my CGI rendering',
    href: 'https://www.linkedin.com/posts/lucaselijahmiller_3drendering-blender3d-jewelrydesign-ugcPost-7282809161397010433-Mj1i',
    source: 'Lucas Miller',
    favicon: '/lucas-miller-linkedin.jpg',
    date: 'January 2025',
    dateTime: '2025-01',
  },
  {
    description: 'Credited for motion design on the Yonex All England teaser assets',
    href: 'https://monopo.london/work/yonex-all-england-brand-identity/',
    source: 'Monopo London',
    favicon: 'https://monopo.london/favicon/favicon-32x32.png',
    date: 'September 2023',
    dateTime: '2023-09',
  },
]

function ExternalArrowIcon() {
  return (
    <svg className="image-20 recognition-arrow" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1 9 9 1M3 1h6v6" fill="none" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function RecognitionRow({ item }) {
  return (
    <div className="recognition-row">
      <div className="div-block-143 recognition-description">
        <div className="div-block-65 recognition-description-link">
          <a href={item.href} target="_blank" rel="noopener noreferrer" className="paragraph link recognition-link-content">
            {item.description}
            <ExternalArrowIcon />
          </a>
          <div className="line-mask"><div className="line"></div></div>
        </div>
      </div>
      <div className="div-block-143 recognition-source">
        <span className="recognition-favicon" style={{ backgroundImage: `url(${item.favicon})` }} aria-hidden="true"></span>
        <p className="paragraph">{item.source}</p>
      </div>
      <div className="div-block-143 recognition-date">
        <time className="paragraph dates" dateTime={item.dateTime}>{item.date}</time>
      </div>
    </div>
  )
}

export default function RecognitionModal() {
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const openModal = () => {
    dialogRef.current?.showModal()
    setIsOpen(true)
  }

  const closeModal = () => {
    dialogRef.current?.close()
  }

  const handleBackdropClick = event => {
    if (event.target === dialogRef.current) closeModal()
  }

  return (
    <>
      <button type="button" className="recognition-trigger paragraph link" aria-haspopup="dialog" aria-controls="recognition-dialog" onClick={openModal}>
        <span>View recognition &amp; credits ({recognitionItems.length})</span>
        <span className="recognition-trigger-icon" aria-hidden="true">+</span>
      </button>
      <dialog
        ref={dialogRef}
        id="recognition-dialog"
        className="recognition-modal"
        aria-labelledby="recognition-dialog-title"
        onClick={handleBackdropClick}
        onClose={() => setIsOpen(false)}
      >
        <div className="recognition-modal-inner">
          <header className="recognition-modal-header">
            <h2 id="recognition-dialog-title" className="recognition-modal-title">Selected recognitions</h2>
            <button type="button" className="recognition-modal-close paragraph link" onClick={closeModal}>
              <span>Close</span>
              <span className="recognition-modal-close-icon" aria-hidden="true">+</span>
            </button>
          </header>
          <div className="recognition-list recognition-modal-list">
            {recognitionItems.map(item => <RecognitionRow key={`${item.source}-${item.dateTime}-${item.href}`} item={item} />)}
          </div>
        </div>
      </dialog>
    </>
  )
}
