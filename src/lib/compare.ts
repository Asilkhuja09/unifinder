import { useSyncExternalStore } from "react";

const KEY = "uf_compare";
export const COMPARE_MAX = 4;

let ids: string[] = [];
let loaded = false;
const listeners = new Set<() => void>();
const EMPTY: string[] = [];

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      ids = parsed.filter((x): x is string => typeof x === "string").slice(0, COMPARE_MAX);
    }
  } catch {
    /* storage unavailable — keep in memory */
  }
}

function commit(next: string[]) {
  ids = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function toggleCompare(id: string): "added" | "removed" | "full" {
  load();
  if (ids.includes(id)) {
    commit(ids.filter((x) => x !== id));
    return "removed";
  }
  if (ids.length >= COMPARE_MAX) return "full";
  commit([...ids, id]);
  return "added";
}

export function clearCompare() {
  load();
  commit([]);
}

/** Universities the visitor picked for side-by-side comparison (max 4, remembered in this browser). */
export function useCompare(): string[] {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return ids;
    },
    () => EMPTY,
  );
}
