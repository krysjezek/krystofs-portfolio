'use client'

import { useVideoLazyLoad } from '@/hooks/useVideoLazyLoad'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

function resolve(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return CDN + url
}

export default function EmbedVideo({ poster, srcH265, srcAv1, srcMp4, style, className }) {
  const { containerRef, videoRef, inView } = useVideoLazyLoad()
  const posterUrl = resolve(poster)

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000', width: '100%', height: '100%', ...style }}
    >
      {posterUrl && (
        <img
          src={posterUrl}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
        />
      )}
      {inView && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
          }}
        >
          {srcH265 && <source src={resolve(srcH265)} type="video/mp4; codecs=hvc1" />}
          {srcAv1 && <source src={resolve(srcAv1)} type="video/webm; codecs=av01" />}
          {srcMp4 && <source src={resolve(srcMp4)} type="video/mp4" />}
        </video>
      )}
    </div>
  )
}
