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
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [startVideo, setStartVideo] = useState(false);
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
      },
      { threshold: 0 },
    );
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!root.current || !sources.length) return;
    let observer;
    function observe() {
      observer?.disconnect();
      // Use viewport pixels, not a card percentage: tall artwork must still play.
      const inset = Math.min(128, window.innerHeight / 4);
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setNearby(true);
          observer.disconnect();
        }
      }, { rootMargin: `-${inset}px 0px` });
      observer.observe(root.current);
    }
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, [sources.length]);

  useEffect(() => {
    if (!nearby || !canAnimate || !posterLoaded) return;
    let frame;
    const start = () => {
      // Give the decoded poster a paint before competing video downloads start.
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => setStartVideo(true));
      });
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      window.removeEventListener("load", start);
      cancelAnimationFrame(frame);
    };
  }, [nearby, canAnimate, posterLoaded]);

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
  }, [startVideo, inView, canAnimate, failed, attempt]);

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
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        onLoad={() => setPosterLoaded(true)}
        onError={() => setPosterLoaded(true)}
        unoptimized={(media.poster || media.src)?.endsWith(".svg")}
        style={{
          objectFit: "cover",
          objectPosition: media.position || "center",
        }}
      />
      {sources.length > 0 && startVideo && canAnimate && !failed && (
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
