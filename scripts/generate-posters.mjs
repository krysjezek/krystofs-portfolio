/**
 * Extracts frame-1 poster JPGs from all local videos.
 *
 * Sources:
 *   public/videos/h264/*.mp4   → strip "-fallback" suffix
 *   public/videos/other/*.mp4  → keep original name
 *
 * Output:
 *   public/videos/posters/{name}.jpg
 *
 * Requires ffmpeg on PATH.
 * Run:  node scripts/generate-posters.mjs
 */

import { execFile } from 'child_process'
import { readdir, mkdir } from 'fs/promises'
import { join, basename, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const postersDir = join(publicDir, 'videos', 'posters')

function runFfmpeg(input, output) {
  return new Promise((resolve, reject) => {
    execFile(
      'ffmpeg',
      ['-y', '-i', input, '-ss', '0', '-frames:v', '1', '-q:v', '2', output],
      (err, _stdout, stderr) => {
        if (err) {
          reject(new Error(`ffmpeg failed for ${input}: ${stderr}`))
        } else {
          resolve()
        }
      },
    )
  })
}

async function collectVideos(dir, stripSuffix) {
  const entries = await readdir(dir)
  const mp4s = entries.filter((f) => extname(f).toLowerCase() === '.mp4')

  return mp4s.map((file) => {
    let name = basename(file, extname(file))
    if (stripSuffix) {
      name = name.replace(/-fallback$/, '')
    }
    return {
      input: join(dir, file),
      output: join(postersDir, `${name}.jpg`),
      label: `${basename(dir)}/${file}`,
    }
  })
}

async function main() {
  await mkdir(postersDir, { recursive: true })

  const h264 = await collectVideos(join(publicDir, 'videos', 'h264'), true)
  const other = await collectVideos(join(publicDir, 'videos', 'other'), false)
  const all = [...h264, ...other]

  console.log(`Generating ${all.length} posters into public/videos/posters/\n`)

  let done = 0
  for (const { input, output, label } of all) {
    process.stdout.write(`[${done + 1}/${all.length}] ${label} ... `)
    await runFfmpeg(input, output)
    done++
    console.log('done')
  }

  console.log(`\n✓ ${done} posters generated`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
