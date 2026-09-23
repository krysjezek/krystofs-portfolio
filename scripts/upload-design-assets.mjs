/** Upload the prepared rebuild manifest; credentials must be in the process environment. */
import { put } from '@vercel/blob'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

if (!process.env.BLOB_READ_WRITE_TOKEN) throw new Error('BLOB_READ_WRITE_TOKEN is required')
const assets = JSON.parse(await readFile('content/design-assets.json', 'utf8'))
for (const asset of assets.filter(item => !process.argv[2] || item.path.includes(process.argv[2]))) {
  const body = await readFile('public'+asset.path)
  if (createHash('sha256').update(body).digest('hex') !== asset.sha256) throw new Error(`Changed file: ${asset.path}`)
  const uploaded = await put(asset.path.slice(1), body, { access:'public', addRandomSuffix:false, allowOverwrite:true, contentType:asset.path.endsWith('.svg')?'image/svg+xml':'image/webp' })
  const check = await fetch(uploaded.url, { method:'HEAD', signal:AbortSignal.timeout(20000) })
  if (!check.ok || !check.headers.get('content-type')?.startsWith('image/')) throw new Error(`Verification failed: ${asset.path}`)
  console.log(`${asset.path}: ${check.status} ${check.headers.get('content-type')}`)
}
