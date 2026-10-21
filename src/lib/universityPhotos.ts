import { useEffect, useState } from "react";
import { pickPhotos, titleMatches } from "@/lib/photoPick";

export type UniPhoto = { url: string; thumb: string; caption: string };
export type UniPhotoResult = { photos: UniPhoto[]; article?: string };

const API = "https://en.wikipedia.org/w/api.php";
const MAX_PARALLEL = 4;
const FOUND_TTL_MS = 14 * 24 * 60 * 60 * 1000;
const EMPTY_TTL_MS = 2 * 24 * 60 * 60 * 1000;
const RETRY_AFTER_FAILURE_MS = 10 * 60 * 1000;

/**
 * Only freely licensed Wikimedia Commons files resolve through this address,
 * so non-free images (logos, fair-use pictures) are never shown.
 */
function commonsUrl(file: string, width: number) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
}

/* ---------- small concurrency limiter so 500+ cards never flood the API ---------- */
let active = 0;
const waiting: Array<() => void> = [];

async function limited<T>(task: () => Promise<T>): Promise<T> {
  if (active >= MAX_PARALLEL) {
    await new Promise<void>((resolve) => waiting.push(resolve));
  }
  active += 1;
  try {
    return await task();
  } finally {
    active -= 1;
    const next = waiting.shift();
    if (next) next();
  }
}

/* ---------- browser cache (best effort) ---------- */
const CACHE_PREFIX = "unifinder.photos.v1.";

function readCache(id: string): UniPhotoResult | null {
  try {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(CACHE_PREFIX + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t?: number; ttl?: number; data?: UniPhotoResult };
    if (!parsed.data || typeof parsed.t !== "number" || typeof parsed.ttl !== "number") return null;
    if (Date.now() - parsed.t > parsed.ttl) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(id: string, data: UniPhotoResult) {
  try {
    if (typeof window === "undefined") return;
    const ttl = data.photos.length > 0 ? FOUND_TTL_MS : EMPTY_TTL_MS;
    window.localStorage.setItem(CACHE_PREFIX + id, JSON.stringify({ t: Date.now(), ttl, data }));
  } catch {
    /* storage full or blocked: fine, we just look it up again next time */
  }
}

/* ---------- Wikipedia lookup ---------- */
type ApiPage = {
  title?: string;
  pageimage?: string;
  images?: Array<{ title?: string }>;
};

async function fetchPhotos(name: string): Promise<UniPhotoResult> {
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    origin: "*",
    generator: "search",
    gsrsearch: name,
    gsrlimit: "1",
    prop: "pageimages|images",
    piprop: "name",
    imlimit: "max",
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);
  let json: unknown;
  try {
    const res = await fetch(`${API}?${params.toString()}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Wikipedia lookup failed (${res.status})`);
    json = await res.json();
  } finally {
    clearTimeout(timer);
  }

  const pages = (json as { query?: { pages?: ApiPage[] } } | null)?.query?.pages;
  const page = Array.isArray(pages) ? pages[0] : undefined;
  if (!page?.title || !titleMatches(name, page.title)) return { photos: [] };

  const files = (page.images ?? [])
    .map((img) => img.title)
    .filter((t): t is string => typeof t === "string");

  const picked = pickPhotos({ name, pageImage: page.pageimage, files, max: 6 });
  return {
    photos: picked.map((p) => ({
      url: commonsUrl(p.file, 640),
      thumb: commonsUrl(p.file, 160),
      caption: p.caption,
    })),
    article: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, "_"))}`,
  };
}

const inFlight = new Map<string, Promise<UniPhotoResult>>();

/** Looks up photos for one university. Safe to call many times; results are shared and cached. */
export function loadUniversityPhotos(id: string, name: string): Promise<UniPhotoResult> {
  const existing = inFlight.get(id);
  if (existing) return existing;

  const promise = (async (): Promise<UniPhotoResult> => {
    const cached = readCache(id);
    if (cached) return cached;
    try {
      const result = await limited(() => fetchPhotos(name));
      writeCache(id, result);
      return result;
    } catch {
      // Network problem: show the placeholder now, try again later.
      setTimeout(() => inFlight.delete(id), RETRY_AFTER_FAILURE_MS);
      return { photos: [] };
    }
  })();

  inFlight.set(id, promise);
  return promise;
}

type PhotoState = { status: "idle" | "loading" | "done"; data: UniPhotoResult | null };

/** React hook: set `enabled` to false until the photos are actually needed. */
export function useUniversityPhotos(universityId: string, universityName: string, enabled = true): PhotoState {
  const [state, setState] = useState<PhotoState>({ status: "idle", data: null });

  useEffect(() => {
    if (!enabled) return undefined;
    let alive = true;
    setState((prev) => (prev.status === "done" ? prev : { status: "loading", data: null }));
    void loadUniversityPhotos(universityId, universityName).then((data) => {
      if (alive) setState({ status: "done", data });
    });
    return () => {
      alive = false;
    };
  }, [enabled, universityId, universityName]);

  return state;
}
