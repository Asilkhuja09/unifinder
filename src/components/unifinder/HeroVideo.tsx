import { useEffect, useRef, useState } from "react";

/**
 * Full-bleed hero background.
 *
 * Two cuts of the same 9-second loop are shipped so neither screen gets black bars:
 *  - desktop: 16:9-ish (1920x988) – fills any laptop / monitor, `object-cover` only trims top/bottom
 *  - mobile : 9:16 (720x1280) – the light beam is kept on the vertical centre line, so the
 *             centred headline always sits on top of the action
 *
 * The poster is plain HTML (<picture>), so something is on screen before JavaScript or the video
 * arrives. The video itself is only mounted on the client, and not at all when the visitor prefers
 * reduced motion or has Data Saver on – they keep the still poster.
 */

type Variant = "desktop" | "mobile";

const VIDEO: Record<Variant, string> = {
  desktop: "/video/hero-desktop.mp4",
  mobile: "/video/hero-mobile.mp4",
};

const MOBILE_QUERY = "(max-width: 767px), (orientation: portrait) and (max-width: 1023px)";

function shouldSkipVideo(): boolean {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return conn?.saveData === true;
}

export function HeroVideo() {
  const [variant, setVariant] = useState<Variant | null>(null);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const pick = () => {
      setReady(false);
      setVariant(mq.matches ? "mobile" : "desktop");
    };
    setVariant(mq.matches ? "mobile" : "desktop");
    mq.addEventListener("change", pick);
    return () => mq.removeEventListener("change", pick);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !variant) return;
    // React does not reliably reflect the `muted` attribute to the DOM property; iOS needs it.
    el.muted = true;
    void el.play().catch(() => {
      /* autoplay blocked (e.g. Low Power Mode) – the poster stays visible */
    });
  }, [variant]);

  return (
    <>
      <picture>
        <source media={MOBILE_QUERY} srcSet="/video/hero-mobile-poster.jpg" />
        <img
          src="/video/hero-desktop-poster.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
      {variant && (
        <video
          key={variant}
          ref={videoRef}
          src={VIDEO[variant]}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onPlaying={() => setReady(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </>
  );
}
