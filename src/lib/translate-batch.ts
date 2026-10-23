/**
 * Helpers for the runtime UI translator (`tt()` in i18n.tsx).
 *
 * The old code sent up to 40 strings per request and the server rejected the *whole* request when a
 * single string was longer than 500 characters, so one long paragraph (a FAQ answer, say) silently
 * stopped every other string in that batch from being translated. These helpers keep a long or
 * unlucky string from taking the rest down with it.
 */

/** Longest single string we try to translate. Must not exceed the server's per-text limit. */
export const MAX_TEXT_CHARS = 4000;
/** Per-request limits – keep requests small enough to finish quickly and stay in the right order. */
export const MAX_BATCH_ITEMS = 25;
export const MAX_BATCH_CHARS = 6000;

/** Removes and returns the next batch from `pending`, bounded by item count and total characters. */
export function takeBatch(pending: Set<string>): string[] {
  const batch: string[] = [];
  let chars = 0;
  for (const text of pending) {
    if (batch.length >= MAX_BATCH_ITEMS) break;
    if (batch.length > 0 && chars + text.length > MAX_BATCH_CHARS) break;
    batch.push(text);
    chars += text.length;
  }
  for (const text of batch) pending.delete(text);
  return batch;
}

export type BatchResult = { done: Record<string, string>; failed: string[] };

/**
 * Translates `texts` in one call. If that call throws, or the answer does not line up one-to-one
 * with the input, each string is retried on its own so only the truly bad ones are given up on.
 */
export async function translateWithFallback(
  texts: string[],
  call: (texts: string[]) => Promise<string[]>,
): Promise<BatchResult> {
  const done: Record<string, string> = {};
  const failed: string[] = [];

  const apply = (source: string[], output: string[]) => {
    source.forEach((text, i) => {
      const value = output[i]?.trim();
      if (value) done[text] = value;
      else failed.push(text);
    });
  };

  try {
    const output = await call(texts);
    if (output.length !== texts.length) throw new Error("Translation count mismatch");
    apply(texts, output);
    return { done, failed };
  } catch {
    if (texts.length <= 1) return { done, failed: [...texts] };
  }

  for (const text of texts) {
    try {
      const output = await call([text]);
      if (output.length === 1) apply([text], output);
      else failed.push(text);
    } catch {
      failed.push(text);
    }
  }
  return { done, failed };
}
