export const SITE_URL = 'https://www.krystofjezek.com'
export const OG_IMAGE = '/og-main.jpg'
export const OG_IMAGE_ALT = 'Art-directed 3D environments and visualization work by Krystof Jezek'
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`
export const CDN_URL = process.env.NEXT_PUBLIC_CDN_URL || 'https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com'

const pageSocialImages = {
  '/work/shelby': {
    url: '/videos/posters/shelby-macbook-v1.jpg',
    alt: 'Custom Shelby MacBook mockup in a sunlit workspace, created for Ashfall Studio',
  },
  '/work/outpost-gusto': {
    url: '/videos/posters/outpost-gusto-reel-v1.jpg',
    alt: 'Gusto UI design showreel with interface animation and 3D device scenes for Outpost Studio',
  },
  '/work/vojta-zizka': {
    url: '/videos/posters/vojta-zizka-patreon-v1.jpg',
    alt: 'Automated Patreon supporter credits and branded market charts for Vojta Zizka',
  },
  '/work/outpost-fantasy': {
    url: '/videos/posters/outpost-fantasy-reel-v1.jpg',
    alt: 'Fantasy website showcase reel with custom 3D device mockups for Outpost Studio',
  },
  '/services/3d-environments': {
    url: '/videos/posters/cgi-environments.jpg',
    alt: 'Art-directed CGI worlds for brands, products, and digital experiences by Krystof Jezek',
  },
  '/services/mixed-reality': {
    url: '/videos/posters/mixed-reality.jpg',
    alt: 'Mixed reality and FOOH CGI campaign work by Krystof Jezek',
  },
  '/work/vizcom': {
    url: '/videos/posters/vizcom-brand-world.jpg',
    alt: 'Vizcom dynamic 3D brand world mockup case study',
  },
  '/work/valkaai': {
    url: '/videos/posters/valkaai-logo-glass-prism.jpg',
    alt: 'ValkaAI 3D glass-prism logo animation case study',
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
  const work = featuredCreativeWorks.find(item => item.path === path)
  const socialImage = pageSocialImages[path]
  const imageUrl = assetUrl(socialImage?.url || OG_IMAGE)
  const resolvedImageAlt = socialImage?.alt || imageAlt

  return {
    ...(work ? { title: work.name, description: work.description } : {}),
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
    path: '/work/shelby',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-25',
  },
  {
    path: '/work/outpost-gusto',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-25',
  },
  {
    path: '/work/vojta-zizka',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-24',
  },
  {
    path: '/work/outpost-fantasy',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-24',
  },
  {
    path: '/',
    priority: 1.0,
    changeFrequency: 'weekly',
    lastModified: '2026-09-23',
  },
  {
    path: '/services/3d-environments',
    priority: 0.9,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/services/mixed-reality',
    priority: 0.7,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/work/vizcom',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/work/valkaai',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/work/the-mag-w-rap-2025',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/work/barbour',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/work/the-vsx-sports-bra',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/work/chainer',
    priority: 0.8,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/other/cv',
    priority: 0.5,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/other/work',
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
  {
    path: '/other/join',
    priority: 0.4,
    changeFrequency: 'monthly',
    lastModified: '2026-09-23',
  },
]

export const featuredCreativeWorks = [
  {
    name: 'Shelby — Custom Device & Merch Mockups',
    path: '/work/shelby',
    description: 'Custom 3D device and merch mockups for Ashfall Studio’s Shelby brand case study, from MacBook and iPad scenes to pins, badges, bottles and clothing.',
    keywords: ['custom mockups', '3D device mockups', 'merch visualization', '3D motion design', 'Shelby', 'Ashfall Studio'],
    dateCreated: '2026-04',
    datePublished: '2026-09-25',
  },
  {
    name: 'Gusto',
    path: '/work/outpost-gusto',
    description: 'A showreel for Outpost Studio’s new Gusto UI design, combining interface animation, playful transitions and 3D device scenes.',
    keywords: ['UI animation', '2D motion design', '3D motion design', 'website showcase reel'],
    dateCreated: '2026',
    datePublished: '2026-09-25',
  },
  {
    name: 'Vojta Zizka — Automated Patreon "Thank You" & Market Charts',
    path: '/work/vojta-zizka',
    description: 'Two video-production tools for Vojta Zizka: automated Patreon supporter credits in After Effects and a web app for branded market charts.',
    keywords: ['video production automation', 'After Effects scripting', 'Patreon credits', 'automated market charts', 'motion design'],
    dateCreated: '2025',
    datePublished: '2026-09-24',
  },
  {
    name: 'Outpost Fantasy',
    path: '/work/outpost-fantasy',
    description: '2D and 3D motion and custom device mockups for a reel showcasing Outpost Studio’s redesign of the Fantasy website.',
    keywords: ['2D motion design', '3D motion design', 'custom device mockups', 'website showcase reel'],
    dateCreated: '2026-05',
    datePublished: '2026-09-24',
  },
  {
    name: 'Vizcom Brand World',
    path: '/work/vizcom',
    description: 'A dynamic 3D environment and animated brand mockup for Vizcom, created for design studio Outland.',
    keywords: ['3D environment design', 'animated mockup', 'brand world', 'look development', 'motion design'],
    dateCreated: '2026',
    datePublished: '2026-08',
  },
  {
    name: 'ValkaAI',
    path: '/work/valkaai',
    description: 'Art direction, 3D, and motion graphics for ValkaAI’s glass-prism mirrored-butterfly logo animation, created with Less and Better.',
    keywords: ['3D logo animation', 'glass prism animation', 'art direction', 'motion graphics', 'AI brand identity'],
    dateCreated: '2026',
    datePublished: '2026-07',
  },
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
    name: 'Shelby custom MacBook mockup',
    page: '/work/shelby',
    description: 'A custom MacBook scene presenting the Shelby website in a warm, sunlit workspace, created for Ashfall Studio’s brand case study.',
    thumbnailUrl: '/videos/posters/shelby-macbook-v1.jpg',
    contentUrl: '/videos/h264/shelby-macbook-v1-fallback.mp4',
    dateCreated: '2026-04',
    uploadDate: '2026-09-25',
    keywords: ['Shelby', 'Ashfall Studio', 'custom mockups', '3D motion', 'MacBook'],
    transcript: 'No spoken dialogue. The Shelby website animates on a MacBook framed by warm wood, a perforated wall and directional sunlight.',
  },
  {
    name: 'Gusto UI design showreel',
    page: '/work/outpost-gusto',
    description: 'Gusto’s new UI design presented through animated themes, modules, customization and templates, alongside 3D device scenes. Created with Chris Wilcock from Outpost Studio.',
    thumbnailUrl: '/videos/posters/outpost-gusto-reel-v1.jpg',
    contentUrl: '/videos/h264/outpost-gusto-reel-v1-fallback.mp4',
    dateCreated: '2026',
    uploadDate: '2026-09-25',
    keywords: ['Gusto', 'Outpost Studio', 'UI animation', '2D motion', '3D motion'],
  },
  {
    name: 'Vojta Zizka automated Patreon end screen',
    page: '/work/vojta-zizka',
    description: 'Animated supporter credits generated from a Patreon CSV using a custom After Effects script.',
    thumbnailUrl: '/videos/posters/vojta-zizka-patreon-v1.jpg',
    contentUrl: '/videos/h264/vojta-zizka-patreon-v1-fallback.mp4',
    dateCreated: '2025',
    uploadDate: '2026-09-24',
    keywords: ['Patreon', 'After Effects scripting', 'automated credits', 'motion design'],
  },
  {
    name: 'Vojta Zizka automated market charts',
    page: '/work/vojta-zizka',
    description: 'Branded market charts generated from current data and presented beneath a video conversation.',
    thumbnailUrl: '/videos/posters/vojta-zizka-market-charts-v1.jpg',
    contentUrl: '/videos/h264/vojta-zizka-market-charts-v1-fallback.mp4',
    dateCreated: '2025',
    uploadDate: '2026-09-24',
    keywords: ['automated market charts', 'video production automation', 'motion design'],
  },
  {
    name: 'Outpost Fantasy website showcase reel',
    page: '/work/outpost-fantasy',
    description: 'A showcase of Outpost Studio’s Fantasy website redesign, combining interface animation with custom 3D device mockups by Krystof Jezek.',
    thumbnailUrl: '/videos/posters/outpost-fantasy-reel-v1.jpg',
    contentUrl: '/videos/h264/outpost-fantasy-reel-v1-fallback.mp4',
    dateCreated: '2026-05',
    uploadDate: '2026-09-24',
    keywords: ['Fantasy', 'Outpost Studio', '2D motion', '3D motion', 'device mockups'],
    transcript: 'No spoken dialogue. Website elements and interactions transition between full-screen layouts and custom 3D device mockups presenting the Fantasy redesign.',
  },
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
    name: 'Vizcom dynamic 3D brand world mockup',
    page: '/work/vizcom',
    description: 'A moving 3D design-studio environment presenting the Vizcom identity across branded tools, stationery, screens, and merchandise.',
    thumbnailUrl: '/videos/posters/vizcom-brand-world.jpg',
    contentUrl: '/videos/h264/vizcom-brand-world-fallback.mp4',
    dateCreated: '2026',
    keywords: ['Vizcom', '3D environment design', 'animated brand mockup', 'brand world', 'look development'],
    transcript: 'No spoken dialogue. The camera moves through a sunlit design studio, travelling from a wide room view into close-ups of Vizcom-branded stationery, tools, a laptop, colour samples, a mug, and merchandise before returning to the full environment.',
  },
  {
    name: 'ValkaAI 3D glass-prism logo animation',
    page: '/work/valkaai',
    description: 'A 3D motion design sequence that transforms the ValkaAI mirrored-butterfly logo into a refractive glass prism filled with AI persona imagery and the brand’s blue and orange light.',
    thumbnailUrl: '/videos/posters/valkaai-logo-glass-prism.jpg',
    contentUrl: '/videos/h264/valkaai-logo-glass-prism-fallback.mp4',
    dateCreated: '2026',
    keywords: ['ValkaAI', '3D logo animation', 'glass prism animation', 'art direction', 'motion graphics'],
    transcript: 'No spoken dialogue. A refractive glass prism assembles into the ValkaAI mirrored-butterfly logo while colourful light and AI persona imagery travel through its transparent geometry.',
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
    name: '3D Worlds showreel',
    page: '/services/3d-environments',
    description: 'Art-directed CGI worlds built around brands, products, identities, and digital experiences for motion, stills, web, launches, and campaign content.',
    thumbnailUrl: '/videos/posters/cgi-environments.jpg',
    contentUrl: '/videos/h264/cgi-environments-fallback.mp4',
    dateCreated: '2026',
    keywords: ['3D worlds', 'art-directed CGI', '3D environments', 'CGI brand campaigns'],
    transcript: 'No spoken dialogue. Visual reel showing art-directed CGI worlds created around brands, products, identities, and digital experiences.',
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
    title: 'Art-directed CGI worlds and 3D environments',
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
    uploadDate: video.uploadDate || `${video.dateCreated}-01-01`,
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
        email: 'krystof@jezek.me',
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
