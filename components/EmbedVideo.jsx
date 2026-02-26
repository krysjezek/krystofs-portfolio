const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function EmbedVideo({ poster, srcH265, srcAv1, srcMp4 }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster={CDN + poster}
      style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', backgroundColor: '#000' }}
    >
      {srcH265 && <source src={CDN + srcH265} type="video/mp4; codecs=hvc1" />}
      {srcAv1 && <source src={CDN + srcAv1} type="video/webm; codecs=av01" />}
      <source src={CDN + srcMp4} type="video/mp4" />
    </video>
  )
}
