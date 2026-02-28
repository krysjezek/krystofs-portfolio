/**
 * Uploads poster JPGs from public/videos/posters/ to Vercel Blob.
 * Run:  BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-posters.mjs
 */

import { put } from '@vercel/blob'
import { readdir, readFile, stat } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const postersDir = join(__dirname, '..', 'public', 'videos', 'posters')

async function main() {
  const files = (await readdir(postersDir)).filter((f) => f.endsWith('.jpg'))
  console.log(`Uploading ${files.length} posters...\n`)

  let done = 0
  for (const file of files) {
    const filePath = join(postersDir, file)
    const body = await readFile(filePath)
    const { size } = await stat(filePath)
    const pathname = `videos/posters/${file}`

    process.stdout.write(`[${done + 1}/${files.length}] ${pathname} (${(size / 1024).toFixed(0)}KB)... `)

    await put(pathname, body, {
      access: 'public',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    done++
    console.log('done')
  }

  console.log(`\n✓ Uploaded ${done} posters`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
