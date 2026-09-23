export const CDN = process.env.NEXT_PUBLIC_CDN_URL || 'https://ziwvaiplle7bdzaz.public.blob.vercel-storage.com'

export function mediaUrl(value) {
  if (!value) return ''
  return /^https?:\/\//.test(value) ? value : /^(\/images\/|\/videos\/)/.test(value) ? `${CDN}${value}` : value
}
