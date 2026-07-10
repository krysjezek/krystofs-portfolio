export const SITE_URL = 'https://www.krystofjezek.com'
export const OG_IMAGE = '/og-main.jpg'
export const OG_IMAGE_ALT = 'Art-directed 3D environments and visualization work by Krystof Jezek'
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com'

const pageSocialImages = {
  '/services/3d-environments': {
    url: '/videos/posters/cgi-environments.jpg',
    alt: 'Custom animated 3D motion mockups for agency case studies by Krystof Jezek',
  },
  '/services/mixed-reality': {
    url: '/videos/posters/mixed-reality.jpg',
    alt: 'Mixed reality and FOOH CGI campaign work by Krystof Jezek',
  },
  '/work/the-mag-w-rap-2025': {
    url: '/videos/posters/w25_injektaz.jpg',
    alt: 'The Mag Wrap 2025 3D motion design case study',
  },
  '/work/barbour': {
    url: '/videos/posters/barbour_header.jpg',
    alt: 'Barbour Icons in Quilting FOOH campaign case study',
  },
  '/work/the-vsx-sports-bra': {
    url: '/videos/posters/vsx_main-01.jpg',
    alt: 'The VSX Sports Bra CGI product animation case study',
  },
  '/work/chainer': {
    url: '/videos/posters/chainer_header.jpg',
    alt: 'Chainer 3D product visualization case study',
  },
}

export function absoluteUrl(path) {
  if (!path) return SITE_URL
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path}`
}

export function assetUrl(path) {
  if (!path || path.startsWith('http')) return encodeURI(path || SITE_URL)

  const baseUrl = /^\/(images|videos)\//.test(path) ? CDN_URL : SITE_URL
  return encodeURI(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`)
}

export function pageSeo(path, imageAlt = OG_IMAGE_ALT) {
  const socialImage = pageSocialImages[path]
  const imageUrl = assetUrl(socialImage?.url || OG_IMAGE)
  const resolvedImageAlt = socialImage?.alt || imageAlt

  return {
    alternates: {
      canonical: path,
    },
    openGraph: {
      url: path,
      images: [
        {
          url: imageUrl,
          alt: resolvedImageAlt,
          ...(!socialImage ? { width: 1200, height: 630 } : {}),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [{ url: imageUrl, alt: resolvedImageAlt }],
    },
  }
}

export const noIndex = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export const portfolioRoutes = [
  {
    path: '/',
    priority: 1.0,
    changeFrequency: 'weekly',
    lastModified: '2026-07-10',
  },
  {
    path: '/services/3d-environments',
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/services/mixed-reality',
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/work/the-mag-w-rap-2025',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/work/barbour',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/work/the-vsx-sports-bra',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/work/chainer',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/other/cv',
    priority: 0.5,
    changeFrequency: 'monthly',
    lastModified: '2026-07-01',
  },
  {
    path: '/other/work',
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: '2026-07-10',
  },
  {
    path: '/other/join',
    priority: 0.4,
    changeFrequency: 'monthly',
    lastModified: '2026-07-01',
  },
]

export const featuredCreativeWorks = [
  {
    name: 'The Mag Wrap 2025',
    path: '/work/the-mag-w-rap-2025',
    description: '3D motion design, art direction, and broadcast graphics package for The Mag Wrap 2025.',
    keywords: ['3D motion design', 'motion graphics', 'broadcast design', 'brand campaign'],
    dateCreated: '2025',
    datePublished: '2025-08',
  },
  {
    name: 'Barbour Quilt FOOH',
    path: '/work/barbour',
    description: 'FOOH campaign and fake out-of-home CGI/VFX work with cloth simulation for Barbour.',
    keywords: ['FOOH campaign', 'fake out-of-home', 'CGI advertising', 'VFX', 'cloth simulation'],
    dateCreated: '2024',
    datePublished: '2024-09',
  },
  {
    name: 'The VSX Sports Bra',
    path: '/work/the-vsx-sports-bra',
    description: '3D product visualization, CGI product animation, and cloth simulation for the VSX Sports Bra.',
    keywords: ['3D product visualization', 'CGI product animation', 'cloth simulation', 'look development'],
    dateCreated: '2025',
    datePublished: '2025-04',
  },
  {
    name: 'Chainer',
    path: '/work/chainer',
    description: '3D product visualization, art direction, and web design for Chainer.',
    keywords: ['3D product visualization', 'art direction', 'web design', 'CGI visuals'],
    dateCreated: '2023',
    datePublished: '2023-09',
  },
]

export const videoAssets = [
  {
    name: 'CGI and 3D environments portfolio reel',
    page: '/',
    description: 'Portfolio reel showing CGI environments, 3D motion design, product visualization, and brand campaign visuals by Krystof Jezek.',
    thumbnailUrl: '/videos/posters/cgi-environments.jpg',
    contentUrl: '/videos/h264/cgi-environments-fallback.mp4',
    dateCreated: '2026',
    keywords: ['CGI environments', '3D motion design', 'brand campaign visuals'],
  },
  {
    name: 'Mixed reality CGI campaign reel',
    page: '/',
    description: 'Mixed reality reel showing CGI advertising, FOOH-style visual effects, and social media campaign visuals for brands.',
    thumbnailUrl: '/videos/posters/mixed-reality.jpg',
    contentUrl: '/videos/h264/mixed-reality-fallback.mp4',
    dateCreated: '2026',
    keywords: ['mixed reality campaign', 'CGI advertising', 'FOOH visuals'],
  },
  {
    name: 'Barbour Icons in Quilting FOOH campaign',
    page: '/work/barbour',
    description: 'Barbour Icons in Quilting FOOH campaign video showing CGI/VFX quilted fabric spreading through city scenes with countryside-inspired natural details.',
    thumbnailUrl: '/videos/posters/barbour_header.jpg',
    embedUrl: 'https://www.youtube.com/embed/oeVS_Q1VsKU',
    dateCreated: '2024',
    keywords: ['FOOH campaign', 'fake out-of-home', 'CGI advertising', 'VFX'],
    transcript: 'No spoken dialogue. Visual sequence showing Barbour quilted fabric and CGI nature details integrated into real city footage for a fake out-of-home campaign.',
  },
  {
    name: 'Barbour FOOH behind-the-scenes CGI breakdown',
    page: '/work/barbour',
    description: 'Behind-the-scenes CGI/VFX breakdown for the Barbour FOOH campaign, showing reconstruction, cloth simulation, nodes, and natural detail passes.',
    thumbnailUrl: '/videos/posters/Barbour---IiQ---Reconstruction-2---BTS---4x5.jpg',
    contentUrl: '/videos/other/Barbour---IiQ---Reconstruction-2---BTS---4x5.mp4',
    dateCreated: '2024',
    keywords: ['CGI breakdown', 'VFX breakdown', 'cloth simulation', 'FOOH production'],
    transcript: 'No spoken dialogue. Visual behind-the-scenes sequence showing reconstruction, simulation, node setup, and CGI production details for the Barbour campaign.',
  },
  {
    name: 'The VSX Sports Bra 3D product visualization',
    page: '/work/the-vsx-sports-bra',
    description: 'The VSX Sports Bra 3D product visualization showing photoreal fabric and knit simulations for a social launch asset.',
    thumbnailUrl: '/videos/posters/vsx_main-01.jpg',
    contentUrl: '/videos/h264/vsx_main-01-fallback.mp4',
    dateCreated: '2025',
    keywords: ['3D product visualization', 'CGI product animation', 'cloth simulation'],
    transcript: 'No spoken dialogue. Visual sequence showing close-up CGI fabric, knit detail, stretch, and support simulations for the VSX Sports Bra.',
  },
  {
    name: 'The VSX Sports Bra cloth simulation breakdown',
    page: '/work/the-vsx-sports-bra',
    description: 'Behind-the-scenes 3D cloth simulation and look-development breakdown for the VSX Sports Bra CGI product animation.',
    thumbnailUrl: '/videos/posters/vsx_bts-02.jpg',
    contentUrl: '/videos/h264/vsx_bts-02-fallback.mp4',
    dateCreated: '2025',
    keywords: ['cloth simulation', 'look development', '3D product animation'],
    transcript: 'No spoken dialogue. Visual breakdown showing Houdini and Blender simulation work for the VSX Sports Bra launch asset.',
  },
  {
    name: 'The Mag Wrap 2025 3D motion design package',
    page: '/work/the-mag-w-rap-2025',
    description: 'The Mag Wrap 2025 motion design asset showing 2D and 3D show graphics, looping backgrounds, sponsor visuals, and broadcast IDs.',
    thumbnailUrl: '/videos/posters/w25_injektaz.jpg',
    embedUrl: 'https://www.youtube.com/embed/-s2ly4Fgu5c',
    dateCreated: '2025',
    keywords: ['3D motion design', 'broadcast graphics', 'motion graphics package'],
    transcript: 'Visual show package combining 2D and 3D motion design for intros, on-air IDs, looping backgrounds, sponsor graphics, explainers, standings, and duel statistics.',
  },
  {
    name: 'The Mag Wrap 2025 looping 3D background',
    page: '/work/the-mag-w-rap-2025',
    description: 'Looping 3D motion design background created for The Mag Wrap 2025 show graphics package.',
    thumbnailUrl: '/videos/posters/w25_loop_bcg.jpg',
    contentUrl: '/videos/h264/w25_loop_bcg-fallback.mp4',
    dateCreated: '2025',
    keywords: ['3D motion design', 'looping background', 'show graphics'],
    transcript: 'No spoken dialogue. Looping 3D background visual created for The Mag Wrap 2025 broadcast and YouTube show package.',
  },
  {
    name: 'Chainer 3D product visualization launch film',
    page: '/work/chainer',
    description: 'Chainer launch visual showing 3D jewelry product scenes and art direction for a men’s accessories ecommerce brand.',
    thumbnailUrl: '/videos/posters/chainer_header.jpg',
    embedUrl: 'https://player.vimeo.com/video/881397523',
    dateCreated: '2023',
    keywords: ['3D product visualization', 'CGI product visuals', 'art direction', 'web design'],
    transcript: 'No spoken dialogue. Visual sequence showing 3D jewelry product scenes, campaign art direction, and ecommerce brand visuals for Chainer.',
  },
  {
    name: 'Custom motion mockups and 3D environments reel',
    page: '/services/3d-environments',
    description: 'Custom animated 3D environments and motion mockups built for branding, web, and design agency case studies.',
    thumbnailUrl: '/videos/posters/yiskra_veha.jpg',
    contentUrl: '/videos/h264/yiskra_veha-fallback.mp4',
    dateCreated: '2026',
    keywords: ['custom motion mockups', 'animated mockups', '3D environments', 'agency case studies'],
    transcript: 'No spoken dialogue. Visual reel showing custom animated 3D environments and motion mockups built for branding, web, and design agency case studies.',
  },
  {
    name: 'Mixed reality and FOOH service reel',
    page: '/services/mixed-reality',
    description: 'Mixed reality service reel showing CGI advertising, FOOH campaign visuals, VFX, and social media content for brand campaigns.',
    thumbnailUrl: '/videos/posters/cgi_barbour_london updated.jpg',
    contentUrl: '/videos/h264/cgi_barbour_london updated-fallback.mp4',
    dateCreated: '2026',
    keywords: ['mixed reality campaign', 'FOOH campaign', 'CGI advertising', 'social media campaign'],
    transcript: 'No spoken dialogue. Visual reel showing CGI elements composited into live-action footage for mixed reality and fake out-of-home brand campaign visuals.',
  },
]

export const imageAssets = [
  {
    page: '/',
    url: OG_IMAGE,
    title: 'Krystof Jezek CGI and motion design portfolio',
  },
  ...featuredCreativeWorks.map((work) => ({
    page: work.path,
    url: pageSocialImages[work.path].url,
    title: work.name,
  })),
  {
    page: '/services/3d-environments',
    url: '/videos/posters/cgi-environments.jpg',
    title: 'Custom motion mockups and animated 3D environments',
  },
  {
    page: '/services/mixed-reality',
    url: '/videos/posters/mixed-reality.jpg',
    title: 'FOOH and mixed reality CGI campaign visuals',
  },
]

export function creativeWorkId(path) {
  return `${absoluteUrl(path)}#creative-work`
}

export function videoObjectId(page, name) {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `${absoluteUrl(page)}#${slug}`
}

function creativeWorkStructuredData(work, videos = []) {
  return {
    '@type': 'CreativeWork',
    '@id': creativeWorkId(work.path),
    name: work.name,
    description: work.description,
    url: absoluteUrl(work.path),
    creator: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    dateCreated: work.dateCreated,
    datePublished: work.datePublished,
    keywords: work.keywords,
    ...(videos.length ? { hasPart: videos.map((video) => ({ '@id': videoObjectId(video.page, video.name) })) } : {}),
  }
}

function videoStructuredData(video) {
  return {
    '@type': 'VideoObject',
    '@id': videoObjectId(video.page, video.name),
    name: video.name,
    description: video.description,
    thumbnailUrl: assetUrl(video.thumbnailUrl),
    uploadDate: `${video.dateCreated}-01-01`,
    dateCreated: video.dateCreated,
    keywords: video.keywords,
    transcript: video.transcript,
    inLanguage: 'en',
    creator: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    mainEntityOfPage: absoluteUrl(video.page),
    ...(video.contentUrl ? { contentUrl: assetUrl(video.contentUrl) } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
  }
}

export function siteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Krystof Jezek',
        alternateName: ['Kryštof Ježek', 'Krystof Ježek'],
        jobTitle: ['Independent CGI Designer', 'CGI Director'],
        description: 'Independent CGI designer creating art-directed environments, motion visuals, and mixed reality campaigns for brands and studios. In his free time, he builds apps and creative tools that connect art and technology.',
        url: SITE_URL,
        image: absoluteUrl(OG_IMAGE),
        email: 'studio@krystofjezek.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Prague',
          addressCountry: 'CZ',
        },
        knowsAbout: [
          '3D environment design',
          'custom motion mockups',
          'animated mockups',
          'CGI',
          '3D motion design',
          'VFX',
          'mixed reality',
          'WebGL',
          'product visualization',
          'cloth simulation',
          'software engineering',
        ],
        sameAs: [
          'https://www.instagram.com/krystof.jezek/',
          'https://www.linkedin.com/in/krystofjezek/',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'Krystof Jezek',
        url: SITE_URL,
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en',
      },
    ],
  }
}

export function homepageStructuredData() {
  const works = featuredCreativeWorks.map((work) => creativeWorkStructuredData(work))
  const videos = videoAssets.filter((video) => video.page === '/').map(videoStructuredData)

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/#featured-work`,
        name: 'Featured portfolio work',
        itemListElement: works.map((work, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': work['@id'] },
        })),
      },
      ...works,
      ...videos,
    ],
  }
}

export function pageStructuredData(path) {
  const work = featuredCreativeWorks.find((item) => item.path === path)
  const videos = videoAssets.filter((video) => video.page === path)
  const graph = [
    ...(work ? [creativeWorkStructuredData(work, videos)] : []),
    ...videos.map(videoStructuredData),
  ]

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function imageSitemapXml() {
  const byPage = new Map()

  imageAssets.forEach((image) => {
    const pageUrl = absoluteUrl(image.page)
    const images = byPage.get(pageUrl) || []
    images.push(image)
    byPage.set(pageUrl, images)
  })

  const urls = Array.from(byPage.entries()).map(([pageUrl, images]) => {
    const imageTags = images
      .map((image) => `    <image:image>
      <image:loc>${escapeXml(assetUrl(image.url))}</image:loc>
      <image:title>${escapeXml(image.title)}</image:title>
    </image:image>`)
      .join('\n')

    return `  <url>
    <loc>${escapeXml(pageUrl)}</loc>
${imageTags}
  </url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`
}
