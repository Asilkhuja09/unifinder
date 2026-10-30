/**
 * Google Maps links and embed addresses for a university. Pure functions, no network, no paid API:
 * everything is a plain link or the free Maps Embed iframe, searched by the university's address.
 */

export type MapTarget = {
  /** Address (or "Name, Country") that Google Maps searches for. */
  query: string;
};

const BASE = "https://www.google.com/maps";

/** Opens the place on Google Maps. */
export function placeUrl(t: MapTarget): string {
  const params = new URLSearchParams({ api: "1", query: t.query });
  return `${BASE}/search/?${params.toString()}`;
}

/** Opens Google Maps with directions to the place, starting from the visitor's own location. */
export function directionsUrl(t: MapTarget): string {
  const params = new URLSearchParams({ api: "1", destination: t.query });
  return `${BASE}/dir/?${params.toString()}`;
}

export type EmbedOptions = {
  /** Public browser key of the Google Maps connection (VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY). */
  key: string | undefined;
  /** Language of the labels on the map, for example "uz" or "ru". */
  language?: string | undefined;
  satellite?: boolean | undefined;
};

/** Address of the Maps Embed API iframe, or null when no browser key is configured. */
export function embedUrl(t: MapTarget, opts: EmbedOptions): string | null {
  const key = opts.key?.trim();
  if (!key) return null;
  const params = new URLSearchParams({
    key,
    q: t.query,
    zoom: "15",
    maptype: opts.satellite ? "satellite" : "roadmap",
  });
  if (opts.language) params.set("language", opts.language);
  return `${BASE}/embed/v1/place?${params.toString()}`;
}

/** The browser key injected by the Lovable connector at build time, if the connection is linked. */
export function browserMapsKey(): string | undefined {
  const value = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;
  return value && value.trim() ? value.trim() : undefined;
}
