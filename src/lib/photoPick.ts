/**
 * Pure helpers for choosing university photos from a Wikipedia article.
 * No browser or React APIs here so the logic stays easy to test.
 */

export type PhotoCandidate = { file: string; caption: string };

const STOP_WORDS = new Set(["the", "of", "and", "de", "la", "le", "du", "des", "for", "at", "in", "an"]);

function words(text: string): string[] {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

/**
 * True when a Wikipedia article title is clearly the same institution as `name`.
 * Uses word overlap so "Boston University School of Law" does not match "Boston University".
 */
export function titleMatches(name: string, title: string): boolean {
  const a = new Set(words(name));
  const b = new Set(words(title));
  if (a.size === 0 || b.size === 0) return false;
  let shared = 0;
  for (const w of a) if (b.has(w)) shared += 1;
  const union = a.size + b.size - shared;
  return shared / union >= 0.6;
}

const OK_EXTENSION = /\.(jpe?g|png|webp)$/i;

/** Words that mark logos, seals, flags, maps and other non-photo files. */
const BAD_WORDS =
  /\b(logo|logos|seal|coat|arms|emblem|crest|wordmark|flag|flags|icon|icons|map|maps|locator|location|symbol|signature|banner|template|button|stub|portal|disambig|ambox|edit|wikiquote|wikidata|commons|blank|placeholder|diagram|chart|graph|stamp|medal|autograph|crown|shield|monogram|ranking|rankings|portrait|headshot)\b/i;

/** Words that suggest a picture of a campus, building or place. */
const GOOD_WORDS =
  /\b(campus|building|buildings|hall|halls|library|quad|quadrangle|gate|gates|tower|aerial|entrance|facade|courtyard|chapel|dome|auditorium|plaza|square|garden|gardens|panorama|skyline|main|front|view|center|centre|college|university|institute|school|laboratory|stadium|cathedral|hospital|yard|court|bridge|lake|park)\b/i;

function fileText(file: string): string {
  return file
    .replace(/^file:/i, "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tidyCaption(text: string): string {
  const cleaned = text.replace(/\s+-\s+/g, " – ").slice(0, 80).trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

/**
 * Choose up to `max` campus-looking photos, best first.
 * Returns an empty list when nothing looks reliable, so callers can show a placeholder
 * instead of a wrong picture.
 */
export function pickPhotos(args: {
  name: string;
  pageImage?: string | undefined;
  files: string[];
  max?: number;
}): PhotoCandidate[] {
  const { name, pageImage, files, max = 6 } = args;
  const nameWords = new Set(words(name));
  const lead = pageImage ? fileText(pageImage).toLowerCase() : null;

  const seen = new Set<string>();
  const scored: { file: string; text: string; score: number; order: number }[] = [];

  const all = pageImage ? [pageImage, ...files] : files;
  all.forEach((raw, order) => {
    const file = raw.replace(/^file:/i, "");
    const key = file.toLowerCase().replace(/_/g, " ");
    if (seen.has(key)) return;
    seen.add(key);
    if (!OK_EXTENSION.test(file)) return;
    const text = fileText(file);
    if (BAD_WORDS.test(text)) return;

    let score = 0;
    score += Math.min(2, (text.match(new RegExp(GOOD_WORDS.source, "gi")) ?? []).length);
    let overlap = 0;
    for (const w of words(text)) if (nameWords.has(w)) overlap += 1;
    score += Math.min(2, overlap);
    if (lead !== null && text.toLowerCase() === lead) score += 3;
    if (score > 0) scored.push({ file, text, score, order });
  });

  scored.sort((x, y) => y.score - x.score || x.order - y.order);
  return scored.slice(0, max).map((s) => ({ file: s.file, caption: tidyCaption(s.text) }));
}
