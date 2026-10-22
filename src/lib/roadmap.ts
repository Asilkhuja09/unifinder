import type { Profile } from "@/lib/profile";

export type RoadmapLink = "/essay" | "/scholarships" | "/universities" | "/compare" | "/assessment";

export type RoadmapStep = {
  id: string;
  /** Months before the application date when this step should be finished. */
  monthsBefore: number;
  title: string;
  detail: string;
  link?: RoadmapLink;
};

export type DatedStep = RoadmapStep & { due: Date; daysLeft: number };

const MS_DAY = 86_400_000;

function addMonths(d: Date, months: number): Date {
  return new Date(d.getTime() - months * 30.4375 * MS_DAY);
}

/** Rule-based plan built from the student's profile. Nothing is random and nothing is guessed about admissions. */
export function buildRoadmapSteps(profile: Profile): RoadmapStep[] {
  const steps: RoadmapStep[] = [];

  steps.push({
    id: "shortlist",
    monthsBefore: 10,
    title: profile.major
      ? `Build a shortlist of 8 to 10 universities for ${profile.major}`
      : "Choose your major and build a shortlist of 8 to 10 universities",
    detail:
      profile.difficulty === ""
        ? "Aim for about 2 reach, 3 target and 2 safety schools. Use the assessment results and the comparison page."
        : "Aim for about 2 reach, 3 target and 2 safety schools, centred on the difficulty tier you chose. Compare cost and aid side by side.",
    link: "/compare",
  });

  const hasEnglish = profile.activeTests.some((t) => t === "IELTS" || t === "TOEFL" || t === "Duolingo");
  if (profile.noTests || !hasEnglish) {
    steps.push({
      id: "english",
      monthsBefore: 6,
      title: "Book and take an English test (IELTS, TOEFL or Duolingo)",
      detail:
        "Most universities want a score report before the deadline. Book early, because test dates fill up, and leave time for one retake.",
    });
  } else {
    steps.push({
      id: "english-check",
      monthsBefore: 6,
      title: "Check your English score against each university's minimum",
      detail: "Scores are valid for about two years. If a school needs a higher band, plan one retake now.",
    });
  }

  if (!profile.activeTests.includes("SAT")) {
    steps.push({
      id: "sat",
      monthsBefore: 7,
      title: "Decide whether you need the SAT",
      detail: "Many universities are test-optional, but some US schools and scholarships still ask for it. Check each shortlist school's policy.",
      link: "/universities",
    });
  }

  if (profile.extracurricular.trim().length < 150) {
    steps.push({
      id: "activities",
      monthsBefore: 8,
      title: "Deepen one or two activities with a concrete result",
      detail: "Admissions readers prefer one project with a measurable outcome over a long list. Start or lead something you can describe with numbers.",
    });
  }

  if (profile.needsAid === "yes") {
    steps.push({
      id: "scholarships",
      monthsBefore: 9,
      title: "Start scholarship applications early",
      detail:
        "Government scholarships such as Fulbright, DAAD, MEXT, CSC and Chevening usually close 9 to 12 months before the start of studies. Check each deadline on the official site.",
      link: "/scholarships",
    });
  }

  steps.push({
    id: "essay-draft",
    monthsBefore: 4,
    title: "Write your main essay and get feedback",
    detail: "Write a first draft, run it through the essay analyzer, rewrite, and ask a teacher to read it. Plan at least three versions.",
    link: "/essay",
  });
  steps.push({
    id: "recommendations",
    monthsBefore: 3,
    title: "Ask teachers for recommendation letters",
    detail: "Ask at least six weeks before the deadline and give each teacher a short list of what you did in their class.",
  });
  steps.push({
    id: "documents",
    monthsBefore: 2,
    title: "Prepare transcripts, translations and your passport",
    detail: "Official translation and notarising can take weeks. Scan everything in good quality.",
  });
  if (profile.needsAid !== "yes") {
    steps.push({
      id: "funds",
      monthsBefore: 2,
      title: "Prepare proof of funds",
      detail: "Visa offices and some universities ask for bank statements covering the first year.",
    });
  }
  steps.push({
    id: "submit",
    monthsBefore: 0.5,
    title: "Submit every application and pay fees or request waivers",
    detail: "Submit a few days early, keep confirmation emails, and check each university's portal for missing items.",
  });
  steps.push({
    id: "after",
    monthsBefore: -3,
    title: "After offers: accept, deposit, apply for your visa and housing",
    detail: "Compare your offers on cost and aid, accept one, and start the visa process straight away.",
  });

  return steps.sort((a, b) => b.monthsBefore - a.monthsBefore);
}

/** Puts real dates on the plan, counted back from the application date. */
export function datePlan(steps: RoadmapStep[], applyBy: Date, today: Date = new Date()): DatedStep[] {
  return steps.map((s) => {
    const due = addMonths(applyBy, s.monthsBefore);
    return { ...s, due, daysLeft: Math.ceil((due.getTime() - today.getTime()) / MS_DAY) };
  });
}
