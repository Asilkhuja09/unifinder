import type { Region, University } from "@/data/extendedData";

/** Rough yearly living cost in USD (housing, food, transport, insurance). Planning estimates only. */
export const LIVING_COST_USD: Record<Region, number> = {
  USA: 16000,
  UK: 15500,
  Canada: 14000,
  Europe: 11500,
  Germany: 11500,
  China: 6500,
  Asia: 10000,
  Oceania: 17000,
};

export function livingCost(u: University): number {
  return LIVING_COST_USD[u.region];
}

export function yearlyCost(u: University, aidPercent: number): number {
  const tuition = u.tuitionUSD * (1 - Math.min(100, Math.max(0, aidPercent)) / 100);
  return Math.round(tuition + livingCost(u));
}
