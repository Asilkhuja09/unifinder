import type { Region } from "@/data/extendedData";
import { yearlyCost } from "@/lib/costs";
import { normalizedGpa, normalizedTests, type UniversityMatch } from "@/lib/matching";
import type { Profile } from "@/lib/profile";

/**
 * Optional deeper analysis. The short assessment stays as it is; a student who wants more answers a few
 * extra questions and gets a readiness report, a to-do list and a budget check for the best matches.
 * Everything here is a pure function (no network, no AI): the AI advice is a separate, opt-in step.
 */

export const LEVELS = ["bachelor", "master"] as const;
export const TRENDS = ["up", "steady", "down"] as const;
export const AWARDS = ["none", "school", "national", "international"] as const;
export const RESEARCH = ["none", "project", "published"] as const;
export const EXPERIENCE = ["none", "some", "strong"] as const;
export const RECOMMENDERS = ["none", "one", "two"] as const;
export const ESSAY_STAGE = ["notStarted", "draft", "polished"] as const;
export const PRIORITIES = ["scholarship", "ranking", "jobs", "lowCost"] as const;

export type Level = (typeof LEVELS)[number];
export type Trend = (typeof TRENDS)[number];
export type Award = (typeof AWARDS)[number];
export type Research = (typeof RESEARCH)[number];
export type Experience = (typeof EXPERIENCE)[number];
export type Recommenders = (typeof RECOMMENDERS)[number];
export type EssayStage = (typeof ESSAY_STAGE)[number];
export type Priority = (typeof PRIORITIES)[number];

export type DeepAnswers = {
  level: Level | "";
  trend: Trend | "";
  awards: Award | "";
  research: Research | "";
  experience: Experience | "";
  recommenders: Recommenders | "";
  essay: EssayStage | "";
  /** Total yearly budget in USD (tuition + living), digits only. */
  budget: string;
  priorities: Priority[];
  /** Free text for the AI advice only; never used by the rules. */
  note: string;
};

export const emptyAnswers: DeepAnswers = {
  level: "",
  trend: "",
  awards: "",
  research: "",
  experience: "",
  recommenders: "",
  essay: "",
  budget: "",
  priorities: [],
  note: "",
};

export const MAX_PRIORITIES = 2;
export const NOTE_LIMIT = 600;

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

/** Number of questions with an answer, out of the ten the form asks. */
export function answeredCount(a: DeepAnswers): number {
  return [
    a.level,
    a.trend,
    a.awards,
    a.research,
    a.experience,
    a.recommenders,
    a.essay,
    a.budget.trim(),
    a.priorities.length ? "y" : "",
    a.note.trim(),
  ].filter(Boolean).length;
}

export type DimensionId = "academics" | "testing" | "achievements" | "materials" | "funding";

export type Dimension = { id: DimensionId; label: string; score: number; weight: number };

/** Plain-English labels; translated at display time with tt(). */
export const DIMENSION_LABEL: Record<DimensionId, string> = {
  academics: "Academic record",
  testing: "Test scores",
  achievements: "Achievements and experience",
  materials: "Application materials",
  funding: "Funding fit",
};

export type BudgetStatus = "unknown" | "within" | "close" | "aid" | "over";

export type DeepMatch = {
  match: UniversityMatch;
  /** Fit after the student's priorities and budget are taken into account, 0–100. */
  score: number;
  /** Estimated yearly cost in USD before any aid (tuition + living). */
  cost: number;
  budget: BudgetStatus;
  notes: string[];
};

export type ActionStep = { text: string; href?: string };

export type DeepReport = {
  readiness: number;
  dimensions: Dimension[];
  strengths: string[];
  gaps: string[];
  actions: ActionStep[];
  matches: DeepMatch[];
};

const AWARD_POINTS: Record<Award, number> = { none: 0, school: 0.4, national: 0.75, international: 1 };
const RESEARCH_POINTS: Record<Research, number> = { none: 0, project: 0.55, published: 1 };
const EXPERIENCE_POINTS: Record<Experience, number> = { none: 0, some: 0.55, strong: 1 };
const RECOMMENDER_POINTS: Record<Recommenders, number> = { none: 0, one: 0.5, two: 1 };
const ESSAY_POINTS: Record<EssayStage, number> = { notStarted: 0, draft: 0.55, polished: 1 };

/** Regions with a well-known route to work after graduating. Planning guidance, not a promise. */
const WORK_ROUTE_REGIONS: ReadonlySet<Region> = new Set<Region>(["Canada", "Germany", "UK", "Oceania"]);

const LOW_COST_LIMIT_USD = 14000;

/** Parses the budget field to whole USD, or null when it is empty or not a positive number. */
export function parseBudget(raw: string): number | null {
  const n = Number.parseInt(raw.replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function budgetStatus(cost: number, budget: number | null, aidFriendly: boolean): BudgetStatus {
  if (budget === null) return "unknown";
  if (cost <= budget) return "within";
  if (cost <= budget * 1.2) return "close";
  return aidFriendly ? "aid" : "over";
}

export const MATCHES_SHOWN = 8;

export function deepAnalyse(profile: Profile, answers: DeepAnswers, matches: UniversityMatch[]): DeepReport {
  const budget = parseBudget(answers.budget);

  // Dimensions, each 0–100.
  const trendShift = answers.trend === "up" ? 0.05 : answers.trend === "down" ? -0.08 : 0;
  const academics = clamp((normalizedGpa(profile) + trendShift) * 100);
  const testing = clamp(normalizedTests(profile) * 100);
  const achievements = clamp(
    (AWARD_POINTS[answers.awards || "none"] * 0.35 +
      RESEARCH_POINTS[answers.research || "none"] * 0.35 +
      EXPERIENCE_POINTS[answers.experience || "none"] * 0.3) *
      100,
  );
  const materials = clamp(
    (RECOMMENDER_POINTS[answers.recommenders || "none"] * 0.5 + ESSAY_POINTS[answers.essay || "notStarted"] * 0.5) *
      100,
  );

  const top = matches.slice(0, MATCHES_SHOWN);
  const median = top.length
    ? [...top.map((m) => yearlyCost(m.university, 0))].sort((a, b) => a - b)[Math.floor(top.length / 2)]!
    : 0;
  // Funding: the budget against the typical cost of the best matches; with aid needs unknown it is neutral.
  const funding =
    budget === null || median === 0 ? 50 : clamp((budget / median) * 80 + (profile.needsAid === "yes" ? 10 : 0));

  const dimensions: Dimension[] = [
    { id: "academics", label: DIMENSION_LABEL.academics, score: Math.round(academics), weight: 35 },
    { id: "testing", label: DIMENSION_LABEL.testing, score: Math.round(testing), weight: 20 },
    { id: "achievements", label: DIMENSION_LABEL.achievements, score: Math.round(achievements), weight: 20 },
    { id: "materials", label: DIMENSION_LABEL.materials, score: Math.round(materials), weight: 15 },
    { id: "funding", label: DIMENSION_LABEL.funding, score: Math.round(funding), weight: 10 },
  ];
  const readiness = Math.round(dimensions.reduce((sum, d) => sum + (d.score * d.weight) / 100, 0));

  // Strengths and gaps.
  const strengths: string[] = [];
  const gaps: string[] = [];
  const actions: ActionStep[] = [];
  const score = (id: DimensionId) => dimensions.find((d) => d.id === id)!.score;

  if (score("academics") >= 75) strengths.push("A strong academic record");
  else if (score("academics") < 55) gaps.push("The academic record is below what most of your matches expect");
  if (answers.trend === "up") strengths.push("Your grades are improving, which admissions readers notice");
  if (answers.trend === "down") {
    gaps.push("Your grades are trending down");
    actions.push({ text: "Add a short note in your application explaining the dip and what changed" });
  }

  if (profile.noTests || score("testing") === 0) {
    gaps.push("No test score yet");
    actions.push({ text: "Book an IELTS, TOEFL or Duolingo test, and the SAT if you apply for a bachelor's degree" });
  } else if (score("testing") >= 70) strengths.push("Your test scores are competitive");
  else if (score("testing") < 50) {
    gaps.push("Test scores are below the usual range");
    actions.push({ text: "Plan a retake after focused preparation" });
  }

  if (answers.awards === "national" || answers.awards === "international") strengths.push("Awards at national or international level");
  if (answers.research === "published") strengths.push("Published research");
  else if (answers.research === "none") {
    gaps.push("No research or project work yet");
    actions.push({ text: "Start one project or research task you can describe with results" });
  }
  if (answers.experience === "none") {
    gaps.push("No internship, volunteering or work experience");
    actions.push({ text: "Join one volunteering role or internship before the deadline" });
  } else if (answers.experience === "strong") strengths.push("Solid practical experience");

  if (answers.recommenders === "two") strengths.push("Two recommenders are ready");
  else {
    gaps.push("Recommendation letters are not ready");
    actions.push({ text: "Ask two teachers or mentors for recommendation letters now" });
  }
  if (answers.essay === "polished") strengths.push("Your personal statement is polished");
  else {
    gaps.push(answers.essay === "draft" ? "The personal statement is still a draft" : "The personal statement is not started");
    actions.push({ text: "Write and refine your personal statement with the essay analyzer", href: "/essay" });
  }

  if (budget === null) {
    actions.push({ text: "Set a realistic yearly budget so costs can be checked" });
  } else if (score("funding") < 55) {
    gaps.push("Your budget is below the typical cost of your best matches");
    actions.push({ text: "Look at scholarships and lower-cost destinations", href: "/scholarships" });
  } else strengths.push("Your budget covers the typical cost of your best matches");

  // Re-rank the matches by the student's priorities and budget.
  const wanted = new Set(answers.priorities);
  const deepMatches: DeepMatch[] = matches.map((m) => {
    const u = m.university;
    const cost = yearlyCost(u, 0);
    const status = budgetStatus(cost, budget, u.aidForInternationals);
    const notes: string[] = [];
    let bonus = 0;
    if (wanted.has("scholarship") && u.aidForInternationals) {
      bonus += 8;
      notes.push("Offers aid to international students");
    }
    if (wanted.has("ranking") && u.worldRanking && u.worldRanking <= 100) {
      bonus += 8;
      notes.push("Among the world's top 100");
    }
    if (wanted.has("jobs") && WORK_ROUTE_REGIONS.has(u.region)) {
      bonus += 6;
      notes.push("The country has a route to work after graduating");
    }
    if (wanted.has("lowCost") && cost <= LOW_COST_LIMIT_USD) {
      bonus += 8;
      notes.push("Low yearly cost");
    }
    if (status === "within") bonus += 6;
    else if (status === "close") bonus += 1;
    else if (status === "over") bonus -= 12;
    else if (status === "aid") bonus -= 4;
    return {
      match: m,
      score: clamp(Math.round(m.score + bonus)),
      cost,
      budget: status,
      notes: notes.slice(0, 3),
    };
  });
  deepMatches.sort((a, b) => b.score - a.score || a.cost - b.cost);

  // Keep the list short and balanced: do not show eight reach schools only.
  const picked = pickBalanced(deepMatches, MATCHES_SHOWN);

  return {
    readiness,
    dimensions,
    strengths: strengths.slice(0, 6),
    gaps: gaps.slice(0, 6),
    actions: dedupeActions(actions).slice(0, 7),
    matches: picked,
  };
}

function dedupeActions(list: ActionStep[]): ActionStep[] {
  const seen = new Set<string>();
  return list.filter((a) => (seen.has(a.text) ? false : (seen.add(a.text), true)));
}

/** At most half of the list from the "reach" category, so the plan is realistic. */
function pickBalanced(sorted: DeepMatch[], size: number): DeepMatch[] {
  const maxReach = Math.ceil(size / 2);
  const out: DeepMatch[] = [];
  let reach = 0;
  for (const m of sorted) {
    if (out.length >= size) break;
    if (m.match.category === "reach") {
      if (reach >= maxReach) continue;
      reach += 1;
    }
    out.push(m);
  }
  return out;
}

const STORAGE_KEY = "unifinder.deep-answers.v1";

/** Remembers the answers in this browser only. Storage can be blocked, so every call is guarded. */
export function loadAnswers(): DeepAnswers {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyAnswers;
    const p = JSON.parse(raw) as Partial<DeepAnswers>;
    const pick = <T extends string>(v: unknown, allowed: readonly T[]): T | "" =>
      typeof v === "string" && (allowed as readonly string[]).includes(v) ? (v as T) : "";
    return {
      level: pick(p.level, LEVELS),
      trend: pick(p.trend, TRENDS),
      awards: pick(p.awards, AWARDS),
      research: pick(p.research, RESEARCH),
      experience: pick(p.experience, EXPERIENCE),
      recommenders: pick(p.recommenders, RECOMMENDERS),
      essay: pick(p.essay, ESSAY_STAGE),
      budget: typeof p.budget === "string" ? p.budget.replace(/[^\d]/g, "").slice(0, 7) : "",
      priorities: Array.isArray(p.priorities)
        ? p.priorities.filter((x): x is Priority => (PRIORITIES as readonly string[]).includes(String(x))).slice(0, MAX_PRIORITIES)
        : [],
      note: typeof p.note === "string" ? p.note.slice(0, NOTE_LIMIT) : "",
    };
  } catch {
    return emptyAnswers;
  }
}

export function saveAnswers(a: DeepAnswers): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    /* storage unavailable: the answers just are not remembered */
  }
}
