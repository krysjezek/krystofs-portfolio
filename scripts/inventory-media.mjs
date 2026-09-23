/** Reproduce the pre-rebuild reference inventory without preserving old UI code. */
import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

const checkpoint = 'checkpoint/pre-rebuild-2026-09-23'
const files = execFileSync('git', ['ls-tree', '-r', '--name-only', checkpoint], { encoding: 'utf8' })
  .trim().split('\n').filter(file => /^(app|components|hooks|styles)\//.test(file) && /\.(jsx?|mjs|s?css)$/.test(file))
const assets = new Map()
for (const file of files) {
  const source = execFileSync('git', ['show', `${checkpoint}:${file}`], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 })
  const pattern = /(?:https?:\/\/[^\s'"<>`{}]+|\/(?:images|videos|fonts)\/[^'"<>`{}\r\n)]+)\.(?:webp|png|jpe?g|gif|svg|ico|mp4|webm|mov|woff2?|ttf|otf)(?:\?[^\s'"<>`{}]*)?/gi
  for (const match of source.matchAll(pattern)) {
    const url = match[0].replace(/&amp;/g, '&')
    if (!assets.has(url)) assets.set(url, { id: createHash('sha256').update(url).digest('hex').slice(0, 12), url, references: [] })
    const asset = assets.get(url)
    if (!asset.references.includes(file)) asset.references.push(file)
  }
}
await mkdir('content', { recursive: true })
await writeFile('content/media-inventory.json', JSON.stringify({
  source: checkpoint,
  cdn: 'https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com',
  note: 'Reference inventory, not a verified CDN listing or an archive of source masters. Availability and dimensions must be verified for assets selected for the rebuild.',
  assets: [...assets.values()].sort((a, b) => a.url.localeCompare(b.url)),
}, null, 2) + '\n')
console.log(`Inventoried ${assets.size} media references from ${files.length} source files.`)
