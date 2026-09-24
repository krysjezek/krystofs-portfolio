// Run with NEXT_PUBLIC_CDN_URL, or use the portfolio's public delivery store.
// Optional local staging files are compared byte-for-byte when present.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { chromium } from 'playwright'
import airlines from '../content/airlines.json' with { type: 'json' }

const cdn = (process.env.NEXT_PUBLIC_CDN_URL || 'https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com').replace(/\/$/, '')
const browser = await chromium.launch()
try {
  const page = await browser.newPage()
  // Check in small batches to avoid flooding the CDN or browser.
  for (let start = 0; start < airlines.length; start += 8) {
    await Promise.all(airlines.slice(start, start + 8).map(async airline => {
      const url = cdn + airline.icon
      const response = await fetch(url, { signal: AbortSignal.timeout(30_000) })
      assert.ok(response.ok, `${airline.name}: HTTP ${response.status}`)
      const svg = airline.icon.endsWith('.svg')
      assert.ok(response.headers.get('content-type')?.startsWith(svg ? 'image/svg+xml' : 'image/webp'), `${airline.name}: content type`)
      const bytes = Buffer.from(await response.arrayBuffer())
      const local = await readFile(new URL(`../public${airline.icon}`, import.meta.url)).catch(error => {
        if (error.code !== 'ENOENT') throw error
        return null
      })
      if (local) assert.ok(bytes.equals(local), `${airline.name}: published bytes differ from staging`)
      const size = await page.evaluate(async url => {
        const image = new Image()
        image.src = url
        await image.decode()
        return { width: image.naturalWidth, height: image.naturalHeight }
      }, url)
      assert.ok(size.width > 0 && size.height > 0, `${airline.name}: image decodes`)
      if (!svg) assert.ok(size.width <= 32 && size.height <= 32, `${airline.name}: oversized raster tile`)
    }))
  }
  console.log(`Airlines: all ${airlines.length} published logos load, decode and match available staging files.`)
} finally {
  await browser.close()
}
