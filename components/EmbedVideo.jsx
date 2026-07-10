'use client'

/* eslint-disable @next/next/no-img-element -- getImageProps powers the responsive picture sources. */

import { getImageProps } from 'next/image'
import { useVideoLazyLoad } from '@/hooks/useVideoLazyLoad'

const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

function resolve(url) {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return CDN + url
}

function Poster({ src, mobileSrc, alt, sizes, priority }) {
  const common = {
    alt,
    fill: true,
    sizes,
    quality: 90,
    loading: priority ? 'eager' : 'lazy',
    fetchPriority: priority ? 'high' : undefined,
    style: { objectFit: 'cover' },
  }
  const { props: desktop } = getImageProps({ ...common, src })

  if (!mobileSrc) return <img {...desktop} alt={alt} />

  const { props: mobile } = getImageProps({ ...common, src: mobileSrc })
  return (
    <picture>
      <source media="(max-width: 991px)" srcSet={mobile.srcSet} sizes={mobile.sizes} />
      <img {...desktop} alt={alt} />
    </picture>
  )
}

export default function EmbedVideo({
  poster,
  posterMobile,
  posterAlt = '',
  posterSizes = '(max-width: 991px) 100vw, 50vw',
  posterPriority = false,
  srcH265,
  srcAv1,
  srcMp4,
  srcMp4Mobile,
  style,
  className,
  title,
}) {
  const { containerRef, videoRef, inView } = useVideoLazyLoad()
  const posterUrl = resolve(poster)
  const mobilePosterUrl = resolve(posterMobile)

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label={posterAlt || title || undefined}
      style={{ position: 'relative', overflow: 'hidden', backgroundColor: '#000', width: '100%', height: '100%', ...style }}
    >
      {posterUrl && (
        <Poster
          src={posterUrl}
          mobileSrc={mobilePosterUrl}
          alt={posterAlt}
          sizes={posterSizes}
          priority={posterPriority}
        />
      )}
      {inView && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
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
          {srcMp4Mobile && <source media="(max-width: 991px)" src={resolve(srcMp4Mobile)} type="video/mp4" />}
          {srcH265 && <source src={resolve(srcH265)} type="video/mp4; codecs=hvc1" />}
          {srcAv1 && <source src={resolve(srcAv1)} type="video/webm; codecs=av01" />}
          {srcMp4 && <source src={resolve(srcMp4)} type="video/mp4" />}
        </video>
      )}
    </div>
  )
}
