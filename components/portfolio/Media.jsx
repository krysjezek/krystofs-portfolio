"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mediaUrl } from "@/lib/media";

export default function Media({
  media,
  priority = false,
  sizes = "100vw",
  className = "",
  style,
}) {
  const root = useRef(null);
  const video = useRef(null);
  const [canAnimate, setCanAnimate] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const sources = [
    [media.srcH265, 'video/mp4; codecs="hvc1"'],
    [media.srcAv1, 'video/webm; codecs="av01.0.05M.10"'],
    [media.srcMp4, "video/mp4"],
    [media.srcWebm, "video/webm"],
  ].filter(([url]) => url);

  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = navigator.connection;
    const update = () => {
      const enabled = !motion.matches && !connection?.saveData;
      setCanAnimate(enabled);
      if (!enabled) setReady(false);
    };
    update();
    motion.addEventListener("change", update);
    connection?.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setNearby(true);
      },
      { threshold: 0 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    function updatePlayback() {
      if (!inView || document.hidden) element.pause();
      else
        element.play().catch(() => {
          // Autoplay policy is not a broken asset: retain the poster.
        });
    }
    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    return () => {
      element.pause();
      document.removeEventListener("visibilitychange", updatePlayback);
    };
  }, [nearby, inView, canAnimate, failed, attempt]);

  function retry() {
    setFailed(false);
    setReady(false);
    setAttempt((value) => value + 1);
  }
  return (
    <div
      ref={root}
      className={`media ${className}`}
      style={{
        "--media-aspect": media.aspect || 1.6,
        aspectRatio: media.aspect || undefined,
        ...style,
      }}
    >
      <Image
        src={mediaUrl(media.poster || media.src)}
        alt={media.alt || media.posterAlt || ""}
        fill
        sizes={sizes}
        quality={sources.length ? 90 : 75}
        priority={priority}
        unoptimized={(media.poster || media.src)?.endsWith(".svg")}
        style={{
          objectFit: "cover",
          objectPosition: media.position || "center",
        }}
      />
      {sources.length > 0 && nearby && canAnimate && !failed && (
        <video
          key={attempt}
          ref={video}
          aria-hidden="true"
          autoPlay={inView}
          muted
          loop
          playsInline
          preload="none"
          className={ready ? "is-ready" : ""}
          onPlaying={() => setReady(true)}
          onError={(event) => {
            if (event.target === event.currentTarget) setFailed(true);
          }}
        >
          {sources.map(([url, type], index) => (
            <source
              key={url}
              src={mediaUrl(url)}
              type={type}
              onError={
                index === sources.length - 1 ? () => setFailed(true) : undefined
              }
            />
          ))}
        </video>
      )}
      {failed && (
        <div className="media-feedback" role="status">
          <span>Video unavailable</span>
          <button type="button" onClick={retry}>
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
