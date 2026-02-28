export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/test/', '/other/cv-print'],
    },
    sitemap: 'https://krystofjezek.com/sitemap.xml',
  }
}
