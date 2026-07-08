import { SITE_URL } from './seo'

export default function robots() {
  return {
    rules: [
      {
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'Claude-SearchBot',
          'Claude-User',
          'PerplexityBot',
          'Googlebot',
          'GPTBot',
          'ClaudeBot',
          'Google-Extended',
          '*',
        ],
        allow: '/',
      },
    ],
    sitemap: [`${SITE_URL}/sitemap.xml`, `${SITE_URL}/image-sitemap.xml`],
  }
}
