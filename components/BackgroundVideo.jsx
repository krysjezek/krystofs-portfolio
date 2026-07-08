'use client'

import { useVideoLazyLoad } from '@/hooks/useVideoLazyLoad'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

function resolve(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return CDN + url
}

export default function BackgroundVideo({ className, poster, posterAlt = '', srcH265, srcAv1, srcMp4, srcWebm, style, title }) {
  const { containerRef, videoRef, inView } = useVideoLazyLoad()
  const p = resolve(poster)
  const mp4 = resolve(srcMp4)
  const webm = resolve(srcWebm)

  return (
    <div
      ref={containerRef}
      data-poster-url={p}
      data-video-urls={`${mp4}${webm ? ',' + webm : ''}`}
      data-autoplay="true"
      data-loop="true"
      data-wf-ignore="true"
      aria-label={posterAlt || title || undefined}
      className={`${className} w-background-video w-background-video-atom`}
      style={{ ...style, backgroundImage: p ? `url("${p}")` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {p && posterAlt && (
        <img
          src={p}
          alt={posterAlt}
          style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', whiteSpace: 'nowrap' }}
        />
      )}
      {inView && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          data-wf-ignore="true"
          data-object-fit="cover"
        >
          {srcH265 && <source src={resolve(srcH265)} data-wf-ignore="true" type="video/mp4; codecs=hvc1" />}
          {srcAv1 && <source src={resolve(srcAv1)} data-wf-ignore="true" type="video/webm; codecs=av01" />}
          <source src={mp4} data-wf-ignore="true" type="video/mp4" />
          {webm && <source src={webm} data-wf-ignore="true" type="video/webm" />}
        </video>
      )}
    </div>
  )
}
