import type { Profile } from "@/lib/profile";
import type { LangCode } from "@/lib/i18n";
import type { Region } from "@/data/extendedData";
import { ROADMAP_TRANSLATIONS } from "@/data/roadmapTranslations";

export type RoadmapLink = "/essay" | "/scholarships" | "/universities" | "/compare" | "/assessment";

/**
 * English source text of every step. Each id has a hand-written translation in
 * `src/data/roadmapTranslations.ts`; keep the two in step when you change a sentence here.
 * `{major}` is replaced with the student's intended major.
 */
export const ROADMAP_EN = {
  "shortlist.title.major": "Build a shortlist of 8 to 10 universities for {major}",
  "shortlist.title.open": "Choose your major and build a shortlist of 8 to 10 universities",
  "shortlist.detail.tier":
    "Aim for about 2 reach, 3 target and 2 safety schools, centred on the difficulty tier you chose. Compare cost and aid side by side.",
  "shortlist.detail.open":
    "Aim for about 2 reach, 3 target and 2 safety schools. Use the assessment results and the comparison page.",
  "english.title": "Book and take an English test (IELTS, TOEFL or Duolingo)",
  "english.detail":
    "Most universities want a score report before the deadline. Book early, because test dates fill up, and leave time for one retake.",
  "englishCheck.title": "Check your English score against each university's minimum",
  "englishCheck.detail": "Scores are valid for about two years. If a school needs a higher band, plan one retake now.",
  "sat.title": "Decide whether you need the SAT",
  "sat.detail":
    "Many universities are test-optional, but some US schools and scholarships still ask for it. Check each shortlist school's policy.",
  "activities.title": "Deepen one or two activities with a concrete result",
  "activities.detail":
    "Admissions readers prefer one project with a measurable outcome over a long list. Start or lead something you can describe with numbers.",
  "scholarships.title": "Start scholarship applications early",
  "scholarships.detail":
    "Government scholarships such as Fulbright, DAAD, MEXT, CSC and Chevening usually close 9 to 12 months before the start of studies. Check each deadline on the official site.",
  "essay.title": "Write your main essay and get feedback",
  "essay.detail":
    "Write a first draft, run it through the essay analyzer, rewrite, and ask a teacher to read it. Plan at least three versions.",
  "recs.title": "Ask teachers for recommendation letters",
  "recs.detail": "Ask at least six weeks before the deadline and give each teacher a short list of what you did in their class.",
  "docs.title": "Prepare transcripts, translations and your passport",
  "docs.detail": "Official translation and notarising can take weeks. Scan everything in good quality.",
  "funds.title": "Prepare proof of funds",
  "funds.detail": "Visa offices and some universities ask for bank statements covering the first year.",
  "submit.title": "Submit every application and pay fees or request waivers",
  "submit.detail":
    "Submit a few days early, keep confirmation emails, and check each university's portal for missing items.",
  "after.title": "After offers: accept, deposit, apply for your visa and housing",
  "after.detail": "Compare your offers on cost and aid, accept one, and start the visa process straight away.",

  "usa.apply.title": "USA: set up your Common App and list each school's deadlines",
  "usa.apply.detail":
    "Create your Common App account, add your schools and note each supplement. Early Decision deadlines are often around 1 November and Regular Decision around early January, but every school sets its own.",
  "usa.aid.title": "USA: ask for financial aid in the same application",
  "usa.aid.detail":
    "At some US universities, international students must request aid when they apply and cannot ask later. Check whether each school wants the CSS Profile or its own form, and gather your family's income documents.",
  "uk.ucas.title": "UK: plan your UCAS application and personal statement",
  "uk.ucas.detail":
    "You apply through UCAS with up to five choices. Oxford, Cambridge, medicine, dentistry and veterinary courses close in mid-October, most other courses in mid-January. Start your personal statement early.",
  "de.recognition.title": "Germany: check that your school certificate gives direct entry",
  "de.recognition.detail":
    "German universities decide whether a foreign school certificate qualifies for direct entry. If not, you may need a Studienkolleg year or a first year at a university at home. Check the requirements for your country on the DAAD website and on each university's page.",
  "de.uniassist.title": "Germany: send your documents to uni-assist at least 8 weeks early",
  "de.uniassist.detail":
    "Many German universities handle international applications through uni-assist. Deadlines are often 15 July for the winter semester and 15 January for the summer semester, and evaluation usually takes 4 to 6 weeks. If a university asks for a preliminary review (VPD), request it first.",
  "ca.system.title": "Canada: check how each university takes applications",
  "ca.system.detail":
    "Some Canadian universities take applications directly and others use a provincial system such as OUAC in Ontario. Deadlines and required documents differ by university and program, so confirm each one.",
  "ca.permit.title": "Canada: get your attestation letter and apply for a study permit",
  "ca.permit.detail":
    "Canada asks for a letter of acceptance, proof of funds and, in most cases, a provincial or territorial attestation letter (Quebec uses a CAQ instead). You usually get the attestation letter after accepting your offer and paying part of your tuition. Check amounts and steps on the official IRCC website.",
  "cn.docs.title": "China: prepare your Chinese Government Scholarship documents",
  "cn.docs.detail":
    "Register in the CSC online system, get the nomination or recommendation from the agency in your home country and write your study plan. Prepare the Foreigner Physical Examination Form, and check that your passport is valid for at least 12 months after your study start date.",
  "oc.visa.title": "Australia: get your Confirmation of Enrolment and apply for a student visa",
  "oc.visa.detail":
    "Australia issues the Confirmation of Enrolment (CoE) after you accept your offer and pay the first tuition fee. For the student visa you need the CoE, Overseas Student Health Cover (OSHC), proof of funds and answers that show you are a genuine student.",

  "eu.recognition.title": "Europe: check how each country recognises your school certificate",
  "eu.recognition.detail":
    "Every European country decides whether a foreign school certificate gives direct entry, and some ask for a foundation year or extra exams. Read the entry rules for your country on each university's page, and ask the national ENIC-NARIC centre if recognition is unclear.",
  "eu.portal.title": "Europe: find each country's application portal and deadlines",
  "eu.portal.detail":
    "Many countries use a national portal or a central office, for example Studielink in the Netherlands, Campus France in France or Universitaly in Italy, while others take applications directly. Deadlines differ a lot by country and program, so write down each one from the official site.",
  "eu.permit.title": "Europe: apply for your residence permit or student visa once you are accepted",
  "eu.permit.detail":
    "Most European countries ask for the acceptance letter, proof of funds and health insurance, and processing can take from several weeks to a few months. Start as soon as you accept an offer and read the embassy's list of documents for your country.",
  "as.language.title": "Asia: check the language of instruction and any language test",
  "as.language.detail":
    "Many Asian universities teach some programs in English, but others teach in the local language and ask for a test such as JLPT for Japanese, TOPIK for Korean or HSK for Chinese. Check this for each program before you finish your shortlist.",
  "as.scholar.title": "Asia: look at government scholarships such as MEXT and GKS",
  "as.scholar.detail":
    "Japan's MEXT and South Korea's GKS scholarships each have an embassy track and a university track, with different deadlines and rules. Ask the embassy or the university which track you can use and read the official guidelines for your year.",
  "as.intake.title": "Asia: confirm the intake dates and application windows",
  "as.intake.detail":
    "Intakes differ from the US and Europe: Japan mostly starts in April with some programs in October, and South Korea starts in March and September. Application windows often open well before the start, so confirm each one on the official site.",
  "as.visa.title": "Asia: apply for your student visa once you are accepted",
  "as.visa.detail":
    "In Japan the university usually applies for your Certificate of Eligibility, and you then use it for the visa. South Korea issues the D-2 student visa, normally with your admission letter and proof of funds. Read the embassy's list of documents for your country.",
} as const;

export type RoadmapTextId = keyof typeof ROADMAP_EN;
export type RoadmapParams = { major?: string };

export type RoadmapStep = {
  id: string;
  /** Months before the application date when this step should be finished (negative = after). */
  monthsBefore: number;
  titleId: RoadmapTextId;
  detailId: RoadmapTextId;
  params?: RoadmapParams;
  link?: RoadmapLink;
  /** Set on steps that only apply to one destination. */
  region?: Region;
};

export type DatedStep = RoadmapStep & { due: Date; daysLeft: number };

const MS_DAY = 86_400_000;

function addMonths(d: Date, months: number): Date {
  return new Date(d.getTime() - months * 30.4375 * MS_DAY);
}

/** Step text in the visitor's language, with the major filled in. */
export function roadmapText(id: RoadmapTextId, lang: LangCode, params: RoadmapParams = {}): string {
  const raw = lang === "en" ? ROADMAP_EN[id] : (ROADMAP_TRANSLATIONS[lang]?.[id] ?? ROADMAP_EN[id]);
  return raw.replace("{major}", params.major ?? "");
}

export const stepTitle = (s: RoadmapStep, lang: LangCode) => roadmapText(s.titleId, lang, s.params);
export const stepDetail = (s: RoadmapStep, lang: LangCode) => roadmapText(s.detailId, lang, s.params);

/** Rule-based plan built from the student's profile. Nothing is random and nothing is guessed about admissions. */
export function buildRoadmapSteps(profile: Profile): RoadmapStep[] {
  const steps: RoadmapStep[] = [];
  const major = profile.major.trim();
  const goes = (region: Region) => profile.regions.includes(region);

  steps.push({
    id: "shortlist",
    monthsBefore: 10,
    titleId: major ? "shortlist.title.major" : "shortlist.title.open",
    detailId: profile.difficulty === "" ? "shortlist.detail.open" : "shortlist.detail.tier",
    ...(major ? { params: { major } } : {}),
    link: "/compare",
  });

  const hasEnglish = profile.activeTests.some((t) => t === "IELTS" || t === "TOEFL" || t === "Duolingo");
  if (profile.noTests || !hasEnglish) {
    steps.push({ id: "english", monthsBefore: 6, titleId: "english.title", detailId: "english.detail" });
  } else {
    steps.push({ id: "english-check", monthsBefore: 6, titleId: "englishCheck.title", detailId: "englishCheck.detail" });
  }

  if (!profile.activeTests.includes("SAT")) {
    steps.push({ id: "sat", monthsBefore: 7, titleId: "sat.title", detailId: "sat.detail", link: "/universities" });
  }

  if (profile.extracurricular.trim().length < 150) {
    steps.push({ id: "activities", monthsBefore: 8, titleId: "activities.title", detailId: "activities.detail" });
  }

  if (profile.needsAid === "yes") {
    steps.push({
      id: "scholarships",
      monthsBefore: 9,
      titleId: "scholarships.title",
      detailId: "scholarships.detail",
      link: "/scholarships",
    });
  }

  // Destination-specific steps. Europe and Asia cover many countries, so their steps stay general
  // (what to check and where) and use Japan and South Korea only as worked examples.
  if (goes("USA")) {
    steps.push({ id: "usa-apply", monthsBefore: 5, titleId: "usa.apply.title", detailId: "usa.apply.detail", region: "USA" });
    if (profile.needsAid === "yes") {
      steps.push({ id: "usa-aid", monthsBefore: 5, titleId: "usa.aid.title", detailId: "usa.aid.detail", region: "USA" });
    }
  }
  if (goes("UK")) {
    steps.push({ id: "uk-ucas", monthsBefore: 5, titleId: "uk.ucas.title", detailId: "uk.ucas.detail", region: "UK" });
  }
  if (goes("Germany")) {
    steps.push({
      id: "de-recognition",
      monthsBefore: 9,
      titleId: "de.recognition.title",
      detailId: "de.recognition.detail",
      region: "Germany",
    });
    steps.push({
      id: "de-uniassist",
      monthsBefore: 2,
      titleId: "de.uniassist.title",
      detailId: "de.uniassist.detail",
      region: "Germany",
    });
  }
  if (goes("Canada")) {
    steps.push({ id: "ca-system", monthsBefore: 5, titleId: "ca.system.title", detailId: "ca.system.detail", region: "Canada" });
    steps.push({ id: "ca-permit", monthsBefore: -3.5, titleId: "ca.permit.title", detailId: "ca.permit.detail", region: "Canada" });
  }
  if (goes("China") && profile.needsAid !== "no") {
    steps.push({ id: "cn-docs", monthsBefore: 6, titleId: "cn.docs.title", detailId: "cn.docs.detail", region: "China" });
  }
  if (goes("Oceania")) {
    steps.push({ id: "oc-visa", monthsBefore: -3.5, titleId: "oc.visa.title", detailId: "oc.visa.detail", region: "Oceania" });
  }
  if (goes("Europe")) {
    steps.push({
      id: "eu-recognition",
      monthsBefore: 9,
      titleId: "eu.recognition.title",
      detailId: "eu.recognition.detail",
      region: "Europe",
    });
    steps.push({ id: "eu-portal", monthsBefore: 5, titleId: "eu.portal.title", detailId: "eu.portal.detail", region: "Europe" });
    steps.push({ id: "eu-permit", monthsBefore: -3.5, titleId: "eu.permit.title", detailId: "eu.permit.detail", region: "Europe" });
  }
  if (goes("Asia")) {
    steps.push({ id: "as-language", monthsBefore: 9, titleId: "as.language.title", detailId: "as.language.detail", region: "Asia" });
    if (profile.needsAid !== "no") {
      steps.push({
        id: "as-scholar",
        monthsBefore: 8,
        titleId: "as.scholar.title",
        detailId: "as.scholar.detail",
        link: "/scholarships",
        region: "Asia",
      });
    }
    steps.push({ id: "as-intake", monthsBefore: 5, titleId: "as.intake.title", detailId: "as.intake.detail", region: "Asia" });
    steps.push({ id: "as-visa", monthsBefore: -3.5, titleId: "as.visa.title", detailId: "as.visa.detail", region: "Asia" });
  }

  steps.push({ id: "essay-draft", monthsBefore: 4, titleId: "essay.title", detailId: "essay.detail", link: "/essay" });
  steps.push({ id: "recommendations", monthsBefore: 3, titleId: "recs.title", detailId: "recs.detail" });
  steps.push({ id: "documents", monthsBefore: 2, titleId: "docs.title", detailId: "docs.detail" });
  if (profile.needsAid !== "yes") {
    steps.push({ id: "funds", monthsBefore: 2, titleId: "funds.title", detailId: "funds.detail" });
  }
  steps.push({ id: "submit", monthsBefore: 0.5, titleId: "submit.title", detailId: "submit.detail" });
  steps.push({ id: "after", monthsBefore: -3, titleId: "after.title", detailId: "after.detail" });

  return steps.sort((a, b) => b.monthsBefore - a.monthsBefore);
}

const MS_MONTH = 30.4375 * MS_DAY;

/** Below this share of the normal lead time the visitor is told the plan has been squeezed. */
const SQUEEZE_NOTICE_BELOW = 0.85;
/** Under this many months the visitor is also told what to do first. */
const VERY_TIGHT_MONTHS = 3;

export type PlanTiming = {
  /** Months between today and the application date (never negative). */
  monthsLeft: number;
  /** 1 means the full plan fits. Below 1 every step before the application date is moved closer to today. */
  scale: number;
  /** `full`: nothing to say. `tight`: the plan was compressed. `veryTight`: compressed and little time is left. */
  level: "full" | "tight" | "veryTight";
};

/**
 * How much of the usual lead time a student has. The plan is built for about ten months before the
 * application date; a student who starts later gets the same steps in the same order, squeezed into
 * the time that is left, instead of a list where the first half is already overdue.
 * Steps after the application date (visa, permit, deposits) keep their real spacing.
 */
export function planTiming(steps: RoadmapStep[], applyBy: Date, today: Date = new Date()): PlanTiming {
  const lead = steps.reduce((most, s) => Math.max(most, s.monthsBefore), 0);
  const monthsLeft = Math.max(0, (applyBy.getTime() - today.getTime()) / MS_MONTH);
  // A date that has already passed is left alone: the steps show as overdue, which is the honest picture.
  if (lead === 0 || monthsLeft === 0 || monthsLeft >= lead) return { monthsLeft, scale: 1, level: "full" };
  const scale = monthsLeft / lead;
  if (scale >= SQUEEZE_NOTICE_BELOW) return { monthsLeft, scale, level: "full" };
  return { monthsLeft, scale, level: monthsLeft < VERY_TIGHT_MONTHS ? "veryTight" : "tight" };
}

/** Puts real dates on the plan, counted back from the application date and squeezed when time is short. */
export function datePlan(steps: RoadmapStep[], applyBy: Date, today: Date = new Date()): DatedStep[] {
  const { scale } = planTiming(steps, applyBy, today);
  return steps.map((s) => {
    const due = addMonths(applyBy, s.monthsBefore > 0 ? s.monthsBefore * scale : s.monthsBefore);
    return { ...s, due, daysLeft: Math.ceil((due.getTime() - today.getTime()) / MS_DAY) };
  });
}
