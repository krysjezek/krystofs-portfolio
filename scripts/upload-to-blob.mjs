/**
 * One-time script: uploads public/videos/ and public/images/ to Vercel Blob.
 * Run with: BLOB_READ_WRITE_TOKEN=xxx node scripts/upload-to-blob.mjs
 */

import { put } from '@vercel/blob'
import { readdir, readFile, stat } from 'fs/promises'
import { join, relative } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')

async function* walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      yield* walk(full)
    } else {
      yield full
    }
  }
}

async function upload(dirs) {
  let total = 0
  let done = 0
  const files = []

  for (const dir of dirs) {
    for await (const file of walk(join(publicDir, dir))) {
      files.push(file)
    }
  }

  total = files.length
  console.log(`Uploading ${total} files...`)

  let baseUrl = null

  for (const filePath of files) {
    const pathname = relative(publicDir, filePath).replace(/\\/g, '/')
    const body = await readFile(filePath)
    const { size } = await stat(filePath)

    process.stdout.write(`[${done + 1}/${total}] ${pathname} (${(size / 1024).toFixed(0)}KB)... `)

    const blob = await put(pathname, body, {
      access: 'public',
      addRandomSuffix: false,
    })

    if (!baseUrl) {
      // Extract base URL from first blob URL
      const url = new URL(blob.url)
      baseUrl = `${url.protocol}//${url.host}`
    }

    done++
    console.log('done')
  }

  console.log(`\n✓ Uploaded ${done} files`)
  console.log(`\nSet this env var in Vercel:\nNEXT_PUBLIC_CDN_URL=${baseUrl}`)
  console.log(`\nAlso add to .env.local for local dev:\nNEXT_PUBLIC_CDN_URL=${baseUrl}`)
}

upload(['videos', 'images']).catch((err) => {
  console.error(err)
  process.exit(1)
})
