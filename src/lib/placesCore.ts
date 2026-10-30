/**
 * Logic behind the Google Places lookup that does not need the network: building the search,
 * deciding whether a result really is the university, and reading Google's answer.
 * A wrong place is worse than no place, so matching is strict.
 */

export type PlacePhoto = {
  url: string;
  width: number;
  height: number;
  /** Google requires the photographer to be credited next to the photo. */
  author: string;
  authorUrl: string;
};

export type CampusPlace = {
  placeId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  photos: PlacePhoto[];
};

/** Words that carry no identity ("University of X" and "X" are the same place). */
const FILLER = new Set(["of", "the", "and", "de", "la", "le", "du", "des", "del", "di", "for", "at", "in", "a"]);

function tokens(text: string): string[] {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .split(" ")
    .filter((w) => w.length > 0 && !FILLER.has(w));
}

/**
 * How well a place name matches a university name, from 0 to 1, or 0 when it is not the same place.
 * Every word of the university must appear in the place name (extra words such as a campus name are
 * fine), and among several candidates the one with the least extra words scores highest, so
 * "University of Birmingham" beats "Birmingham City University".
 */
export function nameMatchScore(universityName: string, placeName: string): number {
  const want = tokens(universityName);
  const got = tokens(placeName);
  if (want.length === 0 || got.length === 0) return 0;
  const gotSet = new Set(got);
  const wantSet = new Set(want);
  const shared = [...wantSet].filter((w) => gotSet.has(w)).length;
  const contained = shared === wantSet.size;
  const jaccard = shared / (wantSet.size + gotSet.size - shared);
  if (contained) return Math.max(jaccard, 0.5);
  return jaccard >= 0.6 ? jaccard : 0;
}

export type RawPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  photos?: Array<{
    name?: string;
    widthPx?: number;
    heightPx?: number;
    authorAttributions?: Array<{ displayName?: string; uri?: string }>;
  }>;
};

/** Picks the result that is really the university, or null when none is. */
export function pickPlace(universityName: string, places: RawPlace[] | undefined): RawPlace | null {
  let best: RawPlace | null = null;
  let bestScore = 0;
  for (const place of places ?? []) {
    if (!place.id || !place.displayName?.text) continue;
    const score = nameMatchScore(universityName, place.displayName.text);
    if (score > bestScore) {
      best = place;
      bestScore = score;
    }
  }
  return best;
}

/** Only `places/<id>/photos/<id>` names are ever sent to Google. */
export const PHOTO_NAME = /^places\/[A-Za-z0-9_-]+\/photos\/[A-Za-z0-9_-]+$/;

export function photoNames(place: RawPlace, max: number): string[] {
  return (place.photos ?? [])
    .map((p) => p.name)
    .filter((n): n is string => typeof n === "string" && PHOTO_NAME.test(n))
    .slice(0, max);
}

/** Text to search for: the university and its country, which keeps same-named schools apart. */
export function searchText(name: string, country: string): string {
  const c = country.trim();
  return c && !name.toLowerCase().includes(c.toLowerCase()) ? `${name}, ${c}` : name;
}

/** Combines the matched place with the photo addresses that were resolved for it. */
export function buildCampusPlace(place: RawPlace, photoUrls: Map<string, string>): CampusPlace | null {
  const lat = place.location?.latitude;
  const lng = place.location?.longitude;
  if (!place.id || !place.displayName?.text || typeof lat !== "number" || typeof lng !== "number") return null;
  const photos: PlacePhoto[] = [];
  for (const p of place.photos ?? []) {
    const url = p.name ? photoUrls.get(p.name) : undefined;
    if (!url) continue;
    const author = p.authorAttributions?.[0];
    photos.push({
      url,
      width: p.widthPx ?? 0,
      height: p.heightPx ?? 0,
      author: author?.displayName ?? "",
      authorUrl: safeHttps(author?.uri),
    });
  }
  return {
    placeId: place.id,
    name: place.displayName.text,
    address: place.formattedAddress ?? "",
    lat,
    lng,
    photos,
  };
}

function safeHttps(url: string | undefined): string {
  if (!url) return "";
  try {
    const u = new URL(url.startsWith("//") ? `https:${url}` : url);
    return u.protocol === "https:" ? u.toString() : "";
  } catch {
    return "";
  }
}

/** A photo address returned by Google must point at Google's own image hosts. */
export function isGoogleImageUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "https:" && (u.hostname.endsWith(".googleusercontent.com") || u.hostname.endsWith(".ggpht.com"));
  } catch {
    return false;
  }
}
