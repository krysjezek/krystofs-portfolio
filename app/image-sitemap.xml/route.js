import { imageSitemapXml } from '../seo'

export const dynamic = 'force-static'

export function GET() {
  return new Response(imageSitemapXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  })
}
