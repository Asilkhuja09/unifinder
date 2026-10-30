import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { UNIVERSITIES } from "@/data/extendedData";
import {
  buildCampusPlace,
  isGoogleImageUrl,
  photoNames,
  pickPlace,
  searchText,
  type CampusPlace,
  type RawPlace,
} from "@/lib/placesCore";

/**
 * Finds the university on Google Maps and returns its place id, address and a few photos.
 *
 * - The browser only sends a university id. The name and country come from our own directory, so
 *   nobody can use this function to search Google for arbitrary text on our key.
 * - The key lives in the server secret GOOGLE_PLACES_API_KEY and never reaches the browser.
 * - Results are cached in memory, and a daily ceiling stops a bug or a crawler from running up a bill.
 *   (The real cap belongs in Google Cloud: set a quota on Places API (New).)
 */

const API = "https://places.googleapis.com/v1";
const FIELD_MASK = "places.id,places.displayName,places.formattedAddress,places.location,places.photos";
const MAX_PHOTOS = 4;
const PHOTO_WIDTH_PX = 900;
const FOUND_TTL_MS = 60 * 60 * 1000;
const MISSING_TTL_MS = 10 * 60 * 1000;
const TIMEOUT_MS = 8000;
const DEFAULT_DAILY_LIMIT = 800;

export type CampusPlaceResult = {
  place: CampusPlace | null;
  /** Why there is no place: not_configured (no key), not_found, limit (daily ceiling) or error. */
  reason?: "not_configured" | "not_found" | "limit" | "error";
};

const inputSchema = z.object({ id: z.string().min(1).max(120) });

const byId = new Map(UNIVERSITIES.map((u) => [u.id, u]));
const cache = new Map<string, { at: number; ttl: number; value: CampusPlaceResult }>();
const inFlight = new Map<string, Promise<CampusPlaceResult>>();
let usage = { day: "", count: 0 };

function withinDailyLimit(): boolean {
  const day = new Date().toISOString().slice(0, 10);
  if (usage.day !== day) usage = { day, count: 0 };
  const limit = Number(process.env["PLACES_DAILY_LIMIT"]) || DEFAULT_DAILY_LIMIT;
  if (usage.count >= limit) return false;
  usage.count += 1;
  return true;
}

async function google(
  url: string,
  apiKey: string,
  init: { method: "GET" | "POST"; body?: string; fieldMask?: string },
): Promise<unknown> {
  const headers: Record<string, string> = { "X-Goog-Api-Key": apiKey };
  if (init.fieldMask) headers["X-Goog-FieldMask"] = init.fieldMask;
  if (init.body) headers["Content-Type"] = "application/json";
  const res = await fetch(url, {
    method: init.method,
    headers,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    ...(init.body ? { body: init.body } : {}),
  });
  if (!res.ok) throw new Error(`Google Places answered ${res.status}`);
  return res.json();
}

async function lookup(id: string, apiKey: string): Promise<CampusPlaceResult> {
  const uni = byId.get(id);
  if (!uni) return { place: null, reason: "not_found" };
  if (!withinDailyLimit()) return { place: null, reason: "limit" };

  const found = (await google(`${API}/places:searchText`, apiKey, {
    method: "POST",
    fieldMask: FIELD_MASK,
    body: JSON.stringify({ textQuery: searchText(uni.name, uni.country), pageSize: 5, languageCode: "en" }),
  })) as { places?: RawPlace[] };

  const place = pickPlace(uni.name, found.places);
  if (!place) return { place: null, reason: "not_found" };

  const urls = new Map<string, string>();
  await Promise.all(
    photoNames(place, MAX_PHOTOS).map(async (name) => {
      try {
        const media = (await google(
          `${API}/${name}/media?maxWidthPx=${PHOTO_WIDTH_PX}&skipHttpRedirect=true`,
          apiKey,
          { method: "GET" },
        )) as { photoUri?: string };
        if (media.photoUri && isGoogleImageUrl(media.photoUri)) urls.set(name, media.photoUri);
      } catch {
        /* one photo failing must not hide the place */
      }
    }),
  );

  const built = buildCampusPlace(place, urls);
  return built ? { place: built } : { place: null, reason: "not_found" };
}

export const getCampusPlace = createServerFn({ method: "POST" })
  .inputValidator(inputSchema)
  .handler(async ({ data }): Promise<CampusPlaceResult> => {
    const apiKey = process.env["GOOGLE_PLACES_API_KEY"];
    if (!apiKey) return { place: null, reason: "not_configured" };

    const hit = cache.get(data.id);
    if (hit && Date.now() - hit.at < hit.ttl) return hit.value;

    const pending = inFlight.get(data.id);
    if (pending) return pending;

    const task = lookup(data.id, apiKey)
      .then((value) => {
        // Only real answers are remembered; a quota hit or a Google outage is retried next time.
        if (value.reason !== "limit") {
          cache.set(data.id, { at: Date.now(), ttl: value.place ? FOUND_TTL_MS : MISSING_TTL_MS, value });
        }
        return value;
      })
      .catch((error: unknown): CampusPlaceResult => {
        console.error(`getCampusPlace failed for ${data.id}:`, error instanceof Error ? error.message : "unknown error");
        return { place: null, reason: "error" };
      })
      .finally(() => inFlight.delete(data.id));
    inFlight.set(data.id, task);
    return task;
  });
