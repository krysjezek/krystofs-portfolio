export default function sitemap() {
  const baseUrl = 'https://krystofjezek.com'

  const routes = [
    { path: '/', priority: 1.0 },
    { path: '/services/3d-environments', priority: 0.9 },
    { path: '/services/mixed-reality', priority: 0.9 },
    { path: '/work/the-mag-w-rap-2025', priority: 0.8 },
    { path: '/work/barbour', priority: 0.8 },
    { path: '/work/the-vsx-sports-bra', priority: 0.8 },
    { path: '/work/chainer', priority: 0.8 },
    { path: '/other/cv', priority: 0.5 },
    { path: '/other/work', priority: 0.6 },
    { path: '/other/join', priority: 0.4 },
    { path: '/work/old-projects/apify', priority: 0.4 },
    { path: '/work/old-projects/apify2', priority: 0.4 },
    { path: '/work/old-projects/ashfall', priority: 0.4 },
    { path: '/work/old-projects/barbour-international-puffer-fooh', priority: 0.4 },
    { path: '/work/old-projects/bezdeno', priority: 0.4 },
    { path: '/work/old-projects/bezestrachu', priority: 0.4 },
    { path: '/work/old-projects/dorian-drop-ii', priority: 0.4 },
    { path: '/work/old-projects/onitsuka-tiger-covent-garden', priority: 0.4 },
    { path: '/work/old-projects/together', priority: 0.4 },
  ]

  return routes.map(({ path, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority,
  }))
}
