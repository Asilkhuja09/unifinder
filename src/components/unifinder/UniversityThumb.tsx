import { useEffect, useRef, useState } from "react";
import { CAMPUS_MEDIA } from "@/data/campusMedia";
import type { University } from "@/data/extendedData";
import { useUniversityPhotos } from "@/lib/universityPhotos";

const SKIP = new Set(["of", "the", "and", "de", "la", "for", "at", "in"]);

function initials(name: string): string {
  const parts = name.split(/[\s\-–,]+/).filter((w) => w.length > 0 && !SKIP.has(w.toLowerCase()));
  const first = parts[0] ?? name;
  if (parts.length === 1) return first.slice(0, 2).toUpperCase();
  const second = parts[1] ?? "";
  return (first.charAt(0) + second.charAt(0)).toUpperCase();
}

/**
 * Card thumbnail: the university's main photo. Photos are looked up only once the card
 * scrolls near the screen. If no reliable photo exists, a monogram is shown instead of
 * a wrong or generic picture.
 */
export function UniversityThumb({ university }: { university: University }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const curated = CAMPUS_MEDIA[university.id]?.photos[0];
  const [near, setNear] = useState(false);
  const [failed, setFailed] = useState(0);

  useEffect(() => {
    if (curated || near) return undefined;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [curated, near]);

  const { data } = useUniversityPhotos(university.id, university.name, near && !curated);

  const candidates: string[] = curated ? [curated.url] : (data?.photos ?? []).map((p) => p.thumb);
  const src = candidates[failed];

  return (
    <div ref={ref} className="size-full">
      {src ? (
        <img
          key={src}
          src={src}
          alt={`${university.name} campus`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed((n) => n + 1)}
          className="size-full object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="grid size-full place-items-center bg-gradient-to-br from-velvet to-feed font-display text-xl text-primary"
        >
          {initials(university.name)}
        </div>
      )}
    </div>
  );
}
