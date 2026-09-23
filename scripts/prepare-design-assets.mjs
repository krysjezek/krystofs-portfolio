/** Prepare only the explicit asset manifest supplied on the command line. No bulk overwrite. */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'

const manifest = process.argv[2]
if (!manifest) throw new Error('Usage: node scripts/prepare-design-assets.mjs <download-manifest.json>')
const jobs = JSON.parse(await readFile(manifest, 'utf8'))
const sourceDirectory = path.join(os.tmpdir(), 'portfolio-2027-source-assets')
await mkdir(sourceDirectory, { recursive: true })
await mkdir('public/images', { recursive: true })
const records = []
for (const job of jobs) {
  if (!/^\/images\/[a-z0-9-]+\.(webp|svg)$/.test(job.dest)) throw new Error(`Invalid destination: ${job.dest}`)
  const source = path.join(sourceDirectory, job.id + path.extname(new URL(job.url).pathname))
  const target = path.join('public', job.dest)
  if (!(await stat(source).catch(() => null))?.size) {
    const response = await fetch(job.url, { signal: AbortSignal.timeout(60000) })
    if (!response.ok) throw new Error(`Download failed for ${job.id}: ${response.status}`)
    await writeFile(source, Buffer.from(await response.arrayBuffer()))
  }
  let probe
  try { probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-of', 'json', source], { encoding: 'utf8', stdio:['ignore','pipe','pipe'] })).streams[0] } catch (error) { if (!job.dest.endsWith('.svg')) throw error }
  if (job.dest.endsWith('.svg')) {
    const svg = await readFile(source, 'utf8')
    const root = svg.match(/<svg\b[^>]*>/)?.[0] || ''
    const width = Number(root.match(/\bwidth="([\d.]+)"/)?.[1])
    const height = Number(root.match(/\bheight="([\d.]+)"/)?.[1])
    if (!(width > 0 && height > 0)) throw new Error(`Missing SVG dimensions: ${job.id}`)
    probe = { width, height }
    await writeFile(target, svg)
  } else {
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', source, '-map_metadata', '-1', '-vf', `scale='min(${job.cap},iw)':-1:flags=lanczos`, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', '-compression_level', '6', target])
  }
  const output = job.dest.endsWith('.svg') ? probe : JSON.parse(execFileSync('ffprobe', ['-v','error','-show_streams','-of','json',target],{encoding:'utf8'})).streams[0]
  const bytes = await readFile(target)
  records.push({ id:job.id, path:job.dest, figmaNode:job.node, width:output.width, height:output.height, sourceWidth:probe.width, sourceHeight:probe.height, bytes:bytes.length, sha256:createHash('sha256').update(bytes).digest('hex') })
  console.log(`${job.id}: ${output.width}×${output.height}, ${bytes.length} bytes`)
}
const previous = await readFile('content/design-assets.json', 'utf8').then(JSON.parse).catch(error => {
  if (error.code === 'ENOENT') return []
  throw error
})
const replaced = new Set(records.map(record => record.id))
await writeFile('content/design-assets.json', JSON.stringify([...previous.filter(record => !replaced.has(record.id)), ...records],null,2)+'\n')
