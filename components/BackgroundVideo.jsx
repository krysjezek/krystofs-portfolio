export default function BackgroundVideo({ className, poster, srcMp4, srcWebm, style }) {
  return (
    <div
      data-poster-url={poster}
      data-video-urls={`${srcMp4},${srcWebm}`}
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
        style={{ backgroundImage: `url("${poster}")` }}
      >
        <source src={srcMp4} data-wf-ignore="true" />
        <source src={srcWebm} data-wf-ignore="true" />
      </video>
    </div>
  )
}
