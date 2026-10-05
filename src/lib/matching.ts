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
  factors: {
    gpa: number;
    tests: number;
    major: number;
    region: number;
    difficulty: number;
    funding: number;
  };
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

function academicSignals(profile: Profile, uni: University) {
  const gpa = normalizedGpa(profile);
  const tests = normalizedTests(profile);
  const expected = clamp01(0.91 - uni.acceptanceRate / 300);
  const gpaFit = clamp01(0.72 + (gpa - expected) * 1.8);
  const testFit = profile.noTests
    ? 0.45
    : clamp01(0.7 + (tests - Math.max(0.35, expected - 0.08)) * 1.5);
  return { gpa, tests, expected, gpaFit, testFit };
}

/**
 * Fit of one university against one profile.
 * Profile-fit weights: GPA 25, tests 15, major 20, target region 15,
 * admissions difficulty 20, and funding 5.
 */
export function scoreUniversity(
  profile: Profile,
  uni: University,
  readiness: number,
): UniversityMatch {
  const reasons: string[] = [];

  const academic = academicSignals(profile, uni);
  const applicantSignal = profile.noTests ? academic.gpa : academic.gpa * 0.68 + academic.tests * 0.32;
  const gap = applicantSignal - academic.expected;
  const category: MatchCategory = gap < -0.1 ? "reach" : gap > 0.12 ? "safety" : "target";
  if (academic.gpaFit >= 0.72) reasons.push("GPA aligns with this university’s selectivity");
  if (!profile.noTests && academic.testFit >= 0.72) reasons.push("Test score strengthens admission fit");

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

  const region = profile.regions.length === 0 || profile.regions.includes(uni.region) ? 1 : 0.1;
  if (region === 1 && profile.regions.length > 0) reasons.push(`Located in a target region (${uni.region})`);

  let tier = 0.5;
  if (profile.difficulty) {
    const distance = Math.abs(
      TIER_ORDER.indexOf(tierFromRate(uni.acceptanceRate)) - TIER_ORDER.indexOf(profile.difficulty),
    );
    tier = distance === 0 ? 1 : distance === 1 ? 0.4 : 0.1;
    if (distance === 0) reasons.push("Matches your chosen admissions difficulty tier");
  }

  const prestige = uni.worldRanking ? clamp01(1 - uni.worldRanking / 600) : 0.35;

  const factors = {
    gpa: Math.round(academic.gpaFit * 25),
    tests: Math.round(academic.testFit * 15),
    major: Math.round(major * 20),
    region: Math.round(region * 15),
    difficulty: Math.round(tier * 20),
    funding: Math.round(funding * 5),
  };
  const fitTotal = Object.values(factors).reduce((sum, value) => sum + value, 0);
  const confidenceAdjustment = Math.round((readiness / 100 - 0.5) * 4 + prestige * 2);
  const score = fitTotal + confidenceAdjustment;

  if (reasons.length === 0) {
    reasons.push(
      category === "reach"
        ? "Ambitious pick — strengthen testing and essays"
        : "Balanced pick for your current profile",
    );
  }

  return {
    university: uni,
    score: Math.max(0, Math.min(100, score)),
    category,
    reasons: reasons.slice(0, 3),
    factors,
  };
}

export type MatchResult = {
  profileScore: ProfileScore;
  matches: UniversityMatch[];
};

/** Full ranking pipeline: filter by hard rules, then score and sort by fit. */
export function matchUniversities(profile: Profile): MatchResult {
  const profileScore = scoreProfile(profile);
  let pool: University[] = UNIVERSITIES;

  if (profile.difficulty === "76-100") {
    // Hard exclusion protocol for the Accessible tier.
    pool = pool.filter((u) => !ELITE_EXCLUDED.has(u.id) && u.acceptanceRate >= 50);
  }

  const matches = pool
    .map((u) => scoreUniversity(profile, u, profileScore.total))
    .sort((a, b) => b.score - a.score || a.university.acceptanceRate - b.university.acceptanceRate);

  return { profileScore, matches };
}
