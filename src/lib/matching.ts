import {
  GPA_SCALES,
  UNIVERSITIES,
  tierFromRate,
  type DifficultyTier,
  type University,
} from "@/data/extendedData";
import type { Profile } from "@/lib/profile";

const TIER_ORDER: DifficultyTier[] = ["1-25", "26-50", "51-75", "76-100"];

/** Hard exclusion protocol: ultra-elite rows never surface for the Accessible tier. */
const ELITE_EXCLUDED = new Set([
  "harvard",
  "mit",
  "stanford",
  "oxford",
  "ucl",
  "ethz",
  "tsinghua",
  "peking",
  "tokyo",
  "nus",
  "seoul",
]);

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/** Normalise any supported grading scale to 0–1. */
export function normalizedGpa(profile: Profile): number {
  const raw = Number.parseFloat(profile.gpa.replace(",", "."));
  if (!Number.isFinite(raw)) return 0;
  const scale = GPA_SCALES.find((s) => s.id === profile.gpaScale);
  if (!scale) return clamp01(raw / 4);
  // German scale is inverted: 1.0 is best, 6.0 is failing.
  if (scale.id === "1.0-de") return clamp01((6 - raw) / 5);
  return clamp01(raw / scale.max);
}

/** Best available standardized-test signal as 0–1 (0 when untested). */
export function normalizedTests(profile: Profile): number {
  if (profile.noTests) return 0;
  const bands: number[] = [];
  const read = (key: keyof Profile["tests"], min: number, max: number) => {
    const v = Number.parseFloat((profile.tests[key] ?? "").replace(",", "."));
    if (Number.isFinite(v)) bands.push(clamp01((v - min) / (max - min)));
  };
  read("IELTS", 4, 9);
  read("TOEFL", 40, 120);
  read("Duolingo", 60, 160);
  read("SAT", 900, 1600);
  if (bands.length === 0) return 0;
  return Math.max(...bands);
}

/** Leadership/extracurricular depth as 0–1 from written evidence. */
export function normalizedActivities(profile: Profile): number {
  const text = profile.extracurricular.trim();
  if (!text) return 0;
  const length = clamp01(text.length / 600);
  const lines = clamp01(text.split(/\n|;|•/).filter((l) => l.trim().length > 8).length / 5);
  const signals =
    /(founder|president|captain|olympiad|award|winner|volunteer|intern|research|published|led|organis|organiz|national|international)/i.test(
      text,
    )
      ? 1
      : 0.5;
  return clamp01(length * 0.4 + lines * 0.35 + signals * 0.25);
}

export type ProfileScore = {
  total: number; // 0–100
  academics: number;
  testing: number;
  activities: number;
  completeness: number;
};

/** Weighted admissions-readiness score for the applicant. */
export function scoreProfile(profile: Profile): ProfileScore {
  const academics = normalizedGpa(profile) * 45;
  const testing = normalizedTests(profile) * 25;
  const activities = normalizedActivities(profile) * 15;
  const filled = [
    profile.firstName,
    profile.country,
    profile.major,
    profile.regions.length ? "y" : "",
    profile.income,
    profile.difficulty,
    profile.needsAid,
  ].filter(Boolean).length;
  const completeness = (filled / 7) * 15;
  return {
    total: Math.round(academics + testing + activities + completeness),
    academics: Math.round(academics),
    testing: Math.round(testing),
    activities: Math.round(activities),
    completeness: Math.round(completeness),
  };
}

export type MatchCategory = "reach" | "target" | "safety";

export type UniversityMatch = {
  university: University;
  score: number; // 0–100 fit
  category: MatchCategory;
  reasons: string[];
};

const INCOME_CEILING: Record<string, number> = {
  "0-10k": 12000,
  "10-25k": 30000,
  "25k+": 70000,
};

function majorAlignment(profile: Profile, uni: University): number {
  const major = profile.major.toLowerCase();
  if (!major) return 0.5;
  const words = major.split(/[^a-z]+/).filter((w) => w.length > 3);
  let best = 0;
  for (const s of uni.strengths) {
    const strength = s.toLowerCase();
    if (strength === major) return 1;
    if (strength.includes(major) || major.includes(strength)) best = Math.max(best, 0.85);
    if (words.some((w) => strength.includes(w))) best = Math.max(best, 0.65);
  }
  return best || 0.25;
}

/**
 * Fit of one university against one profile.
 * Weights: admissibility 35, major 25, funding 20, region 12, tier 8.
 */
export function scoreUniversity(
  profile: Profile,
  uni: University,
  readiness: number,
): UniversityMatch {
  const reasons: string[] = [];

  // Admissibility — how the applicant's readiness compares to selectivity.
  const selectivity = 1 - clamp01(uni.acceptanceRate / 100); // 1 = hardest
  const gap = readiness / 100 - selectivity;
  const admissibility = clamp01(0.5 + gap * 1.2);
  const category: MatchCategory = gap < -0.12 ? "reach" : gap > 0.12 ? "safety" : "target";

  const major = majorAlignment(profile, uni);
  if (major >= 0.85) reasons.push(`Departmental strength in ${profile.major}`);

  // Funding fit.
  const ceiling = INCOME_CEILING[profile.income] ?? 40000;
  let funding = clamp01(1 - (uni.tuitionUSD - ceiling) / 60000);
  if (profile.needsAid === "yes") {
    if (uni.aidForInternationals) {
      funding = clamp01(funding * 0.5 + 0.5);
      reasons.push("Offers aid to international students");
    } else {
      funding *= 0.35;
    }
  }
  if (uni.tuitionUSD <= ceiling) reasons.push("Tuition within your stated budget band");

  const region = profile.regions.length === 0 || profile.regions.includes(uni.region) ? 1 : 0.25;
  if (region === 1 && profile.regions.length > 0) reasons.push(`Located in a target region (${uni.region})`);

  let tier = 0.5;
  if (profile.difficulty) {
    const distance = Math.abs(
      TIER_ORDER.indexOf(tierFromRate(uni.acceptanceRate)) - TIER_ORDER.indexOf(profile.difficulty),
    );
    tier = distance === 0 ? 1 : distance === 1 ? 0.6 : 0.2;
    if (distance === 0) reasons.push("Matches your chosen admissions difficulty tier");
  }

  const prestige = uni.worldRanking ? clamp01(1 - uni.worldRanking / 600) : 0.35;

  const score = Math.round(
    admissibility * 35 + major * 25 + funding * 20 + region * 12 + tier * 8 + prestige * 5,
  );

  if (reasons.length === 0) {
    reasons.push(
      category === "reach"
        ? "Ambitious pick — strengthen testing and essays"
        : "Balanced pick for your current profile",
    );
  }

  return { university: uni, score: Math.min(100, score), category, reasons: reasons.slice(0, 3) };
}

export type MatchResult = {
  profileScore: ProfileScore;
  matches: UniversityMatch[];
};

/** Full ranking pipeline: filter by hard rules, then score and sort by fit. */
export function matchUniversities(profile: Profile): MatchResult {
  const profileScore = scoreProfile(profile);
  let pool: University[] = UNIVERSITIES;

  if (profile.regions.length > 0) {
    const scoped = pool.filter((u) => profile.regions.includes(u.region));
    if (scoped.length > 0) pool = scoped;
  }

  if (profile.difficulty === "76-100") {
    // Hard exclusion protocol for the Accessible tier.
    pool = pool.filter((u) => !ELITE_EXCLUDED.has(u.id) && u.acceptanceRate >= 50);
  }

  if (profile.needsAid === "yes") {
    const aided = pool.filter((u) => u.aidForInternationals);
    if (aided.length >= 6) pool = aided;
  }

  const matches = pool
    .map((u) => scoreUniversity(profile, u, profileScore.total))
    .sort((a, b) => b.score - a.score || a.university.acceptanceRate - b.university.acceptanceRate);

  return { profileScore, matches };
}
