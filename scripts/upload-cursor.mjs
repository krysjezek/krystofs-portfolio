import { put } from '@vercel/blob'
import { readFileSync } from 'fs'

const body = readFileSync('public/images/cursor.svg')
const blob = await put('photo/cursor.svg', body, {
  access: 'public',
  addRandomSuffix: false,
})
console.log('Blob URL:', blob.url)
