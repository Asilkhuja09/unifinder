import { useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from "react";
import {
  Award,
  Ban,
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Coins,
  FilePen,
  FileText,
  FlaskConical,
  Globe2,
  GraduationCap,
  Medal,
  Minus,
  PenLine,
  School,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import type { University } from "@/data/extendedData";
import type { Profile } from "@/lib/profile";
import type { UniversityMatch } from "@/lib/matching";
import { deepAdvice, type DeepAdvice } from "@/lib/deep-advice.functions";
import {
  AWARDS,
  ESSAY_STAGE,
  EXPERIENCE,
  LEVELS,
  MAX_PRIORITIES,
  NOTE_LIMIT,
  PRIORITIES,
  RECOMMENDERS,
  RESEARCH,
  TRENDS,
  answeredCount,
  deepAnalyse,
  emptyAnswers,
  loadAnswers,
  parseBudget,
  saveAnswers,
  type DeepAnswers,
  type Priority,
} from "@/lib/deepAnalysis";
import { ConstellationFX } from "@/components/unifinder/ConstellationFX";
import { DeepReportView } from "@/components/unifinder/DeepReport";
import { OptionCard, inputCls, stagger } from "@/components/unifinder/WizardParts";
import { cn } from "@/lib/utils";

type Icon = ComponentType<{ className?: string }>;
type Opt<T extends string> = { id: T; label: string; icon: Icon };

const LEVEL_OPTS: Opt<(typeof LEVELS)[number]>[] = [
  { id: "bachelor", label: "Bachelor's degree", icon: School },
  { id: "master", label: "Master's degree", icon: GraduationCap },
];
const PRIORITY_OPTS: Opt<Priority>[] = [
  { id: "scholarship", label: "Scholarships", icon: Coins },
  { id: "ranking", label: "High ranking", icon: Trophy },
  { id: "jobs", label: "Work after graduation", icon: Briefcase },
  { id: "lowCost", label: "Low cost", icon: Wallet },
];
const TREND_OPTS: Opt<(typeof TRENDS)[number]>[] = [
  { id: "up", label: "Improving", icon: TrendingUp },
  { id: "steady", label: "Steady", icon: Minus },
  { id: "down", label: "Declining", icon: TrendingDown },
];
const AWARD_OPTS: Opt<(typeof AWARDS)[number]>[] = [
  { id: "none", label: "None", icon: Ban },
  { id: "school", label: "School level", icon: Award },
  { id: "national", label: "National level", icon: Medal },
  { id: "international", label: "International level", icon: Globe2 },
];
const RESEARCH_OPTS: Opt<(typeof RESEARCH)[number]>[] = [
  { id: "none", label: "None", icon: Ban },
  { id: "project", label: "A project or lab work", icon: FlaskConical },
  { id: "published", label: "Published or presented work", icon: FileText },
];
const EXPERIENCE_OPTS: Opt<(typeof EXPERIENCE)[number]>[] = [
  { id: "none", label: "None", icon: Ban },
  { id: "some", label: "Some", icon: Briefcase },
  { id: "strong", label: "Substantial", icon: Trophy },
];
const RECOMMENDER_OPTS: Opt<(typeof RECOMMENDERS)[number]>[] = [
  { id: "none", label: "None yet", icon: Ban },
  { id: "one", label: "One is ready", icon: UserCheck },
  { id: "two", label: "Two are ready", icon: Users },
];
const ESSAY_OPTS: Opt<(typeof ESSAY_STAGE)[number]>[] = [
  { id: "notStarted", label: "Not started", icon: Ban },
  { id: "draft", label: "Draft", icon: FilePen },
  { id: "polished", label: "Polished", icon: PenLine },
];

const BUDGET_PRESETS = [5000, 10000, 20000, 35000, 50000] as const;

const STEPS: { icon: Icon; title: string; hint: string }[] = [
  { icon: Target, title: "Your goal", hint: "What you are applying for and what matters most." },
  { icon: GraduationCap, title: "Academics", hint: "How your grades and achievements look." },
  { icon: FlaskConical, title: "Experience", hint: "What you have done beyond the classroom." },
  { icon: FileText, title: "Documents", hint: "What is ready for your application." },
  { icon: Wallet, title: "Budget", hint: "What you can spend each year." },
];

const SCAN_STAGES = ["Scoring your profile", "Checking budgets against your matches", "Building your plan"] as const;
const SCAN_MS = 2400;

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-primary/90">{label}</legend>
      {children}
    </fieldset>
  );
}

function Choices<T extends string>({
  value,
  options,
  onPick,
  cols,
}: {
  value: T | "" | readonly T[];
  options: readonly Opt<T>[];
  onPick: (v: T) => void;
  cols: string;
}) {
  const { tt } = useI18n();
  const isOn = (id: T) => (Array.isArray(value) ? (value as readonly T[]).includes(id) : value === id);
  return (
    <div className={cn("grid gap-3", cols)}>
      {options.map((o, i) => {
        const Ico = o.icon;
        const on = isOn(o.id);
        return (
          <OptionCard key={o.id} selected={on} onClick={() => onPick(o.id)} index={i} className="flex items-center gap-3 p-4">
            <span
              className={cn(
                "grid size-9 shrink-0 place-items-center rounded-full border transition-colors",
                on ? "border-primary bg-primary/20 text-primary" : "border-border text-muted-foreground group-hover:text-primary",
              )}
            >
              <Ico className="size-4" />
            </span>
            <span className={cn("pe-6 text-sm leading-snug", on ? "font-semibold text-primary" : "text-foreground/90")}>{tt(o.label)}</span>
          </OptionCard>
        );
      })}
    </div>
  );
}

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Optional deeper analysis under the assessment results, built like the main assessment. */
export function DeepAnalysis({
  profile,
  matches,
  onView,
}: {
  profile: Profile;
  matches: UniversityMatch[];
  onView: (university: University) => void;
}) {
  const { t, tt, lang } = useI18n();
  const { user, requireAuth } = useAuth();
  const runAdvice = useServerFn(deepAdvice);

  const [phase, setPhase] = useState<"closed" | "form" | "scan" | "report">("closed");
  const [step, setStep] = useState(1);
  const dir = useRef<"fwd" | "back">("fwd");
  const [answers, setAnswers] = useState<DeepAnswers>(emptyAnswers);
  const [ready, setReady] = useState(false);
  const [scan, setScan] = useState(0);
  const [advice, setAdvice] = useState<DeepAdvice | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const topRef = useRef<HTMLElement | null>(null);

  // Storage is read after mount so the server and the first client render agree.
  useEffect(() => {
    setAnswers(loadAnswers());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) saveAnswers(answers);
  }, [answers, ready]);

  const set = <K extends keyof DeepAnswers>(key: K, value: DeepAnswers[K]) => {
    setAnswers((a) => ({ ...a, [key]: value }));
    setAdvice(null);
  };
  const togglePriority = (p: Priority) =>
    set(
      "priorities",
      answers.priorities.includes(p)
        ? answers.priorities.filter((x) => x !== p)
        : [...answers.priorities, p].slice(-MAX_PRIORITIES),
    );

  const report = useMemo(
    () => (phase === "scan" || phase === "report" ? deepAnalyse(profile, answers, matches) : null),
    [phase, profile, answers, matches],
  );
  const budget = parseBudget(answers.budget);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });

  const goTo = (n: number) => {
    dir.current = n > step ? "fwd" : "back";
    setStep(n);
  };
  const next = () => {
    if (step < STEPS.length) goTo(step + 1);
    else {
      setScan(0);
      setPhase("scan");
      scrollTop();
    }
  };

  // The short "analysing" moment: purely visual, the report is already computed.
  useEffect(() => {
    if (phase !== "scan") return;
    const total = reducedMotion() ? 300 : SCAN_MS;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setScan(p);
      if (p < 1) frame = window.requestAnimationFrame(tick);
      else setPhase("report");
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [phase]);

  const getAdvice = async () => {
    if (!report || !requireAuth()) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await runAdvice({
        data: {
          language: lang,
          profile: {
            country: profile.country,
            gpa: profile.gpa,
            gpaScale: profile.gpaScale,
            major: profile.major,
            tests: Object.fromEntries(Object.entries(profile.tests).filter(([, v]) => v)) as Record<string, string>,
            noTests: profile.noTests,
            needsAid: profile.needsAid,
            income: profile.income,
            regions: profile.regions,
          },
          answers: {
            level: answers.level,
            trend: answers.trend,
            awards: answers.awards,
            research: answers.research,
            experience: answers.experience,
            recommenders: answers.recommenders,
            essay: answers.essay,
            budgetUSD: budget,
            priorities: answers.priorities,
            note: answers.note.trim(),
          },
          readiness: report.readiness,
          gaps: report.gaps,
          matches: report.matches.map((m) => ({
            name: m.match.university.name,
            country: m.match.university.country,
            category: m.match.category,
            fit: m.score,
            yearlyCostUSD: m.cost,
            aidForInternationals: m.match.university.aidForInternationals,
          })),
        },
      });
      setAdvice(res.advice);
    } catch (e) {
      setErr(e instanceof Error ? e.message : tt("The advice could not be created. Please try again."));
    } finally {
      setBusy(false);
    }
  };

  const StepIcon = STEPS[step - 1]?.icon ?? Target;
  const stepInfo = STEPS[step - 1] ?? STEPS[0]!;
  const stageIdx = Math.min(SCAN_STAGES.length - 1, Math.floor(scan * SCAN_STAGES.length));

  return (
    <section
      id="deep-analysis"
      ref={topRef}
      aria-labelledby="deep-title"
      className="glass relative mb-10 scroll-mt-24 overflow-hidden rounded-3xl p-5 sm:p-8"
    >
      <ConstellationFX density={0.00012} />

      {/* Teaser */}
      {phase === "closed" && (
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="flex max-w-2xl items-start gap-4">
            <span className="wiz-float grid size-14 shrink-0 place-items-center rounded-2xl border border-primary/50 bg-primary/15 text-primary shadow-[0_0_40px_-12px_var(--gold)]">
              <Sparkles className="size-7" />
            </span>
            <div>
              <h3 id="deep-title" className="font-display text-3xl text-gilded">
                {tt("Deeper analysis")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {tt("Optional. Answer a few more questions to get a readiness report, a personal to-do list and a budget check for your best matches.")}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 text-xs">
                {["5 short steps", "Free readiness report", "Optional AI advice"].map((c, i) => (
                  <li key={c} style={stagger(i)} className="wiz-rise rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-primary">
                    {tt(c)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setPhase("form");
              setStep(1);
              dir.current = "fwd";
            }}
            className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-soft to-gold px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--gold)] outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span aria-hidden className="wiz-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <span className="relative">{tt("Start deeper analysis")}</span>
            <ChevronRight className="relative size-4 rtl:rotate-180" />
          </button>
        </div>
      )}

      {/* Question steps */}
      {phase === "form" && (
        <div className="relative grid gap-8 lg:grid-cols-[13.5rem_1fr]">
          <nav aria-label={tt("Deeper analysis progress")} className="lg:pt-1">
            <ol className="flex items-center justify-between gap-1 lg:flex-col lg:items-stretch lg:justify-start lg:gap-0">
              {STEPS.map((s, i) => {
                const n = i + 1;
                const done = n < step;
                const current = n === step;
                const Ico = s.icon;
                return (
                  <li key={s.title} className="relative flex lg:block">
                    {n < STEPS.length && (
                      <span aria-hidden className="absolute left-[1.1rem] top-9 hidden h-[calc(100%-1.4rem)] w-px overflow-hidden bg-border lg:block">
                        <span className={cn("block w-full bg-primary transition-[height] duration-700", done ? "h-full" : "h-0")} />
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => goTo(n)}
                      aria-current={current ? "step" : undefined}
                      aria-label={`${n}. ${tt(s.title)}`}
                      className="group flex items-center gap-3 rounded-xl py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring lg:w-full"
                    >
                      <span
                        className={cn(
                          "relative grid size-9 shrink-0 place-items-center rounded-full border text-primary transition-all duration-500",
                          current && "wiz-pulse-ring scale-110 border-primary bg-primary/15",
                          done && "border-primary bg-primary text-primary-foreground",
                          !current && !done && "border-border bg-velvet/50 text-muted-foreground",
                        )}
                      >
                        {done ? <Check key="c" className="wiz-pop size-4" strokeWidth={3} /> : <Ico className="size-4" />}
                      </span>
                      <span
                        className={cn(
                          "hidden text-sm transition-colors lg:block",
                          current ? "font-semibold text-primary" : done ? "text-foreground/85 group-hover:text-primary" : "text-muted-foreground group-hover:text-primary",
                        )}
                      >
                        {tt(s.title)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="min-w-0">
            <header className="mb-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-primary/80">
                  {t("step")} {step} {t("of")} {STEPS.length}
                </p>
                <StepIcon className="size-5 text-primary/70" />
              </div>
              <h3 id="deep-title" key={step} className="wiz-rise mt-1 text-3xl font-semibold text-gilded">
                {tt(stepInfo.title)}
              </h3>
              <p key={`h${step}`} className="wiz-rise mt-1 text-sm text-muted-foreground" style={stagger(1)}>
                {tt(stepInfo.hint)}
              </p>
              <div className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="relative h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-700 ease-out"
                  style={{ width: `${(step / STEPS.length) * 100}%` }}
                >
                  <span className="wiz-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
              </div>
            </header>

            <div key={step} className={cn("min-h-[300px] space-y-7", dir.current === "fwd" ? "wiz-in-fwd" : "wiz-in-back")}>
              {step === 1 && (
                <>
                  <Group label={tt("What are you applying for?")}>
                    <Choices value={answers.level} options={LEVEL_OPTS} onPick={(v) => set("level", v)} cols="sm:grid-cols-2" />
                  </Group>
                  <Group label={tt("What matters most? Pick up to two")}>
                    <Choices value={answers.priorities} options={PRIORITY_OPTS} onPick={togglePriority} cols="sm:grid-cols-2" />
                  </Group>
                </>
              )}
              {step === 2 && (
                <>
                  <Group label={tt("How are your grades changing?")}>
                    <Choices value={answers.trend} options={TREND_OPTS} onPick={(v) => set("trend", v)} cols="sm:grid-cols-3" />
                  </Group>
                  <Group label={tt("Highest award or competition result")}>
                    <Choices value={answers.awards} options={AWARD_OPTS} onPick={(v) => set("awards", v)} cols="sm:grid-cols-2" />
                  </Group>
                </>
              )}
              {step === 3 && (
                <>
                  <Group label={tt("Research or project work")}>
                    <Choices value={answers.research} options={RESEARCH_OPTS} onPick={(v) => set("research", v)} cols="sm:grid-cols-3" />
                  </Group>
                  <Group label={tt("Internships, volunteering or work")}>
                    <Choices value={answers.experience} options={EXPERIENCE_OPTS} onPick={(v) => set("experience", v)} cols="sm:grid-cols-3" />
                  </Group>
                </>
              )}
              {step === 4 && (
                <>
                  <Group label={tt("Recommendation letters")}>
                    <Choices value={answers.recommenders} options={RECOMMENDER_OPTS} onPick={(v) => set("recommenders", v)} cols="sm:grid-cols-3" />
                  </Group>
                  <Group label={tt("Personal statement")}>
                    <Choices value={answers.essay} options={ESSAY_OPTS} onPick={(v) => set("essay", v)} cols="sm:grid-cols-3" />
                  </Group>
                </>
              )}
              {step === 5 && (
                <>
                  <Group label={tt("Yearly budget in USD, tuition and living together")}>
                    <div className="relative">
                      <span aria-hidden className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-sm text-primary">
                        $
                      </span>
                      <input
                        inputMode="numeric"
                        aria-label={tt("Yearly budget in USD, tuition and living together")}
                        value={answers.budget}
                        onChange={(e) => set("budget", e.target.value.replace(/[^\d]/g, "").slice(0, 7))}
                        placeholder="15000"
                        className={cn(inputCls, "ps-8 text-lg tabular-nums")}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_PRESETS.map((v) => (
                        <button
                          key={v}
                          type="button"
                          aria-pressed={answers.budget === String(v)}
                          onClick={() => set("budget", String(v))}
                          className={cn(
                            "rounded-full border px-4 py-1.5 text-sm tabular-nums outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring",
                            answers.budget === String(v)
                              ? "border-primary bg-primary/15 text-primary"
                              : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground",
                          )}
                        >
                          ${v.toLocaleString("en-US")}
                        </button>
                      ))}
                    </div>
                  </Group>
                  <Group label={tt("Anything else we should know? Only used for AI advice")}>
                    <textarea
                      value={answers.note}
                      maxLength={NOTE_LIMIT}
                      rows={4}
                      aria-label={tt("Anything else we should know? Only used for AI advice")}
                      onChange={(e) => set("note", e.target.value)}
                      className={inputCls}
                    />
                    <p className="text-end text-xs tabular-nums text-muted-foreground">
                      {answers.note.length} / {NOTE_LIMIT}
                    </p>
                  </Group>
                </>
              )}
            </div>

            <footer className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <button
                type="button"
                onClick={() => (step === 1 ? setPhase("closed") : goTo(step - 1))}
                className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium outline-none transition-all hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
                {step === 1 ? tt("Close") : t("back")}
              </button>
              <button
                type="button"
                onClick={next}
                className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--gold)] outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <span aria-hidden className="wiz-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                <span className="relative">{step === STEPS.length ? tt("Analyse my profile") : t("next")}</span>
                <ChevronRight className="relative size-4 rtl:rotate-180" />
              </button>
              <p className="col-span-2 text-center text-xs text-muted-foreground">
                {answeredCount(answers)} / 10 {tt("answered")}
              </p>
            </footer>
          </div>
        </div>
      )}

      {/* Analysing */}
      {phase === "scan" && (
        <div className="relative grid min-h-[320px] place-items-center text-center" role="status" aria-live="polite">
          <div className="w-full max-w-md">
            <span className="wiz-pulse-ring wiz-float mx-auto grid size-20 place-items-center rounded-full border border-primary/60 bg-primary/15 text-primary">
              <Sparkles className="size-9" />
            </span>
            <h3 id="deep-title" className="mt-6 font-display text-2xl text-gilded">
              {tt("Analysing your profile")}
            </h3>
            <p key={stageIdx} className="wiz-rise mt-2 text-sm text-muted-foreground">
              {tt(SCAN_STAGES[stageIdx] ?? SCAN_STAGES[0])}…
            </p>
            <div className="relative mt-6 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="relative h-full rounded-full bg-gradient-to-r from-gold-soft to-gold" style={{ width: `${Math.round(scan * 100)}%` }}>
                <span className="wiz-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report */}
      {phase === "report" && report && (
        <div className="relative">
          <header className="mb-6 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full border border-primary/50 bg-primary/15 text-primary">
              <Sparkles className="size-5" />
            </span>
            <h3 id="deep-title" className="font-display text-3xl text-gilded">
              {tt("Deeper analysis")}
            </h3>
          </header>
          <DeepReportView
            report={report}
            budget={budget}
            user={!!user}
            busy={busy}
            err={err}
            advice={advice}
            onEdit={() => {
              setPhase("form");
              setStep(1);
              dir.current = "back";
              scrollTop();
            }}
            onAdvice={() => void getAdvice()}
            onView={onView}
          />
        </div>
      )}
    </section>
  );
}
