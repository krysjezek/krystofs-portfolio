import { SITE_URL, portfolioRoutes } from './seo'

export default function sitemap() {
  return portfolioRoutes.map(({ path, priority, changeFrequency, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
