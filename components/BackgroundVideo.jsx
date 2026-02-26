const CDN = process.env.NEXT_PUBLIC_CDN_URL || ''

export default function BackgroundVideo({ className, poster, srcMp4, srcWebm, style }) {
  const p = CDN + poster
  const mp4 = CDN + srcMp4
  const webm = CDN + srcWebm
  return (
    <div
      data-poster-url={p}
      data-video-urls={`${mp4},${webm}`}
      data-autoplay="true"
      data-loop="true"
      data-wf-ignore="true"
      className={`${className} w-background-video w-background-video-atom`}
      style={style}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        data-wf-ignore="true"
        data-object-fit="cover"
        style={{ backgroundImage: `url("${p}")` }}
      >
        <source src={mp4} data-wf-ignore="true" />
        <source src={webm} data-wf-ignore="true" />
      </video>
    </div>
  )
}
