import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Loader2, Sparkles, TriangleAlert, Trophy } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
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
  type BudgetStatus,
  type DeepAnswers,
  type Priority,
} from "@/lib/deepAnalysis";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { inputCls } from "@/components/unifinder/WizardParts";

const LEVEL_LABEL = { bachelor: "Bachelor's degree", master: "Master's degree" } as const;
const TREND_LABEL = { up: "Improving", steady: "Steady", down: "Declining" } as const;
const AWARD_LABEL = {
  none: "None",
  school: "School level",
  national: "National level",
  international: "International level",
} as const;
const RESEARCH_LABEL = {
  none: "None",
  project: "A project or lab work",
  published: "Published or presented work",
} as const;
const EXPERIENCE_LABEL = { none: "None", some: "Some", strong: "Substantial" } as const;
const RECOMMENDER_LABEL = { none: "None yet", one: "One is ready", two: "Two are ready" } as const;
const ESSAY_LABEL = { notStarted: "Not started", draft: "Draft", polished: "Polished" } as const;
const PRIORITY_LABEL: Record<Priority, string> = {
  scholarship: "Scholarships",
  ranking: "High ranking",
  jobs: "Work after graduation",
  lowCost: "Low cost",
};
const BUDGET_LABEL: Record<BudgetStatus, string> = {
  unknown: "Set a budget to compare",
  within: "Within your budget",
  close: "Slightly above your budget",
  aid: "Above budget, but aid is offered",
  over: "Above your budget",
};
const CATEGORY_LABEL = { reach: "Reach", target: "Target", safety: "Safety" } as const;

function Choice<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | "";
  options: readonly { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-primary/90">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            aria-pressed={value === o.id}
            onClick={() => onChange(o.id)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              value === o.id
                ? "border-primary/70 bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function tone(score: number) {
  if (score >= 75) return "var(--accent)";
  if (score >= 50) return "var(--gold)";
  return "var(--destructive)";
}

/** Optional deeper analysis under the assessment results. */
export function DeepAnalysis({ profile, matches }: { profile: Profile; matches: UniversityMatch[] }) {
  const { lang, tt } = useI18n();
  const { user, requireAuth } = useAuth();
  const runAdvice = useServerFn(deepAdvice);

  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<DeepAnswers>(emptyAnswers);
  const [ready, setReady] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [advice, setAdvice] = useState<DeepAdvice | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

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
    () => (submitted ? deepAnalyse(profile, answers, matches) : null),
    [submitted, profile, answers, matches],
  );

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
            budgetUSD: parseBudget(answers.budget),
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

  const options = <T extends string>(ids: readonly T[], labels: Record<T, string>) =>
    ids.map((id) => ({ id, label: tt(labels[id]) }));

  return (
    <section id="deep-analysis" className="glass mb-10 rounded-3xl p-6" aria-labelledby="deep-title">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="max-w-2xl">
          <h3 id="deep-title" className="font-display text-2xl text-gilded">
            {tt("Deeper analysis")}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {tt("Optional. Answer a few more questions to get a readiness report, a personal to-do list and a budget check for your best matches.")}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          aria-expanded={open}
          aria-controls="deep-body"
          onClick={() => setOpen((o) => !o)}
          className="rounded-xl px-5 py-2.5 text-sm"
        >
          {open ? tt("Hide") : tt("Start deeper analysis")}
          <ChevronDown className={cn("ms-2 size-4 transition-transform", open && "rotate-180")} />
        </Button>
      </div>

      {open && (
        <div id="deep-body" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Choice label={tt("What are you applying for?")} value={answers.level} options={options(LEVELS, LEVEL_LABEL)} onChange={(v) => set("level", v)} />
            <Choice label={tt("How are your grades changing?")} value={answers.trend} options={options(TRENDS, TREND_LABEL)} onChange={(v) => set("trend", v)} />
            <Choice label={tt("Highest award or competition result")} value={answers.awards} options={options(AWARDS, AWARD_LABEL)} onChange={(v) => set("awards", v)} />
            <Choice label={tt("Research or project work")} value={answers.research} options={options(RESEARCH, RESEARCH_LABEL)} onChange={(v) => set("research", v)} />
            <Choice label={tt("Internships, volunteering or work")} value={answers.experience} options={options(EXPERIENCE, EXPERIENCE_LABEL)} onChange={(v) => set("experience", v)} />
            <Choice label={tt("Recommendation letters")} value={answers.recommenders} options={options(RECOMMENDERS, RECOMMENDER_LABEL)} onChange={(v) => set("recommenders", v)} />
            <Choice label={tt("Personal statement")} value={answers.essay} options={options(ESSAY_STAGE, ESSAY_LABEL)} onChange={(v) => set("essay", v)} />
            <label className="block space-y-2">
              <span className="text-sm font-medium text-primary/90">{tt("Yearly budget in USD, tuition and living together")}</span>
              <input
                inputMode="numeric"
                value={answers.budget}
                onChange={(e) => set("budget", e.target.value.replace(/[^\d]/g, "").slice(0, 7))}
                placeholder="15000"
                className={inputCls}
              />
            </label>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-primary/90">{tt("What matters most? Pick up to two")}</legend>
            <div className="flex flex-wrap gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  aria-pressed={answers.priorities.includes(p)}
                  onClick={() => togglePriority(p)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                    answers.priorities.includes(p)
                      ? "border-primary/70 bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {tt(PRIORITY_LABEL[p])}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-primary/90">{tt("Anything else we should know? Only used for AI advice")}</span>
            <textarea
              value={answers.note}
              maxLength={NOTE_LIMIT}
              rows={3}
              onChange={(e) => set("note", e.target.value)}
              className={inputCls}
            />
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="button" onClick={() => setSubmitted(true)} className="rounded-xl px-6 py-2.5 text-sm">
              {tt("Analyse my profile")}
            </Button>
            <span className="text-xs text-muted-foreground">
              {answeredCount(answers)} / 10 {tt("answered")}
            </span>
          </div>
        </div>
      )}

      {report && (
        <div className="mt-8 space-y-6" aria-live="polite">
          <div className="grid gap-6 md:grid-cols-[auto_1fr] md:items-center">
            <div className="text-center">
              <p className="font-display text-5xl tabular-nums" style={{ color: tone(report.readiness) }}>
                {report.readiness}
              </p>
              <p className="text-xs text-muted-foreground">{tt("Application readiness")} / 100</p>
            </div>
            <div className="space-y-3">
              {report.dimensions.map((d) => (
                <div key={d.id}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span>{tt(d.label)}</span>
                    <span className="tabular-nums text-muted-foreground">{d.score}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full" style={{ width: `${d.score}%`, background: tone(d.score) }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
                <Trophy className="size-4" /> {tt("Your strengths")}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {report.strengths.length === 0 && <li>{tt("Answer more questions to see your strengths.")}</li>}
                {report.strengths.map((s) => (
                  <li key={s}>{tt(s)}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border p-5">
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-destructive">
                <TriangleAlert className="size-4" /> {tt("What to improve")}
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {report.gaps.length === 0 && <li>{tt("No major gaps found.")}</li>}
                {report.gaps.map((s) => (
                  <li key={s}>{tt(s)}</li>
                ))}
              </ul>
            </div>
          </div>

          {report.actions.length > 0 && (
            <div className="rounded-2xl border border-border p-5">
              <p className="mb-3 text-sm font-semibold text-primary">{tt("Your to-do list")}</p>
              <ol className="list-decimal space-y-2 ps-5 text-sm text-muted-foreground">
                {report.actions.map((a) => (
                  <li key={a.text}>
                    {a.href ? (
                      <a href={a.href} className="text-primary underline-offset-4 hover:underline">
                        {tt(a.text)}
                      </a>
                    ) : (
                      tt(a.text)
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="rounded-2xl border border-border p-5">
            <p className="mb-1 text-sm font-semibold text-primary">{tt("Best matches for your priorities and budget")}</p>
            <p className="mb-4 text-xs text-muted-foreground">
              {tt("Costs are planning estimates: tuition plus typical living costs, before any aid. Confirm them on the official website.")}
            </p>
            <ul className="divide-y divide-border/70">
              {report.matches.map((m) => (
                <li key={m.match.university.id} className="py-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-medium">{m.match.university.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {tt(CATEGORY_LABEL[m.match.category])} · {m.score} / 100
                    </p>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {tt("Estimated yearly cost")}: ${m.cost.toLocaleString("en-US")} · {tt(BUDGET_LABEL[m.budget])}
                  </p>
                  {m.notes.length > 0 && (
                    <p className="mt-1 text-xs text-primary/80">{m.notes.map((n) => tt(n)).join(" · ")}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-xl">
                <p className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Sparkles className="size-4" /> {tt("Personal AI advice")}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {tt("Optional. Your profile summary and answers are sent to an AI advisor. Your name is not sent. It needs you to sign in.")}
                </p>
              </div>
              <Button type="button" variant="outline" disabled={busy} onClick={() => void getAdvice()} className="rounded-xl px-5 py-2.5 text-sm">
                {busy ? <Loader2 className="me-2 size-4 animate-spin" /> : null}
                {user ? tt("Get AI advice") : tt("Sign in for AI advice")}
              </Button>
            </div>
            {err && (
              <p role="alert" className="mt-3 text-sm text-destructive">
                {err}
              </p>
            )}
            {advice && (
              <div className="mt-4 space-y-4">
                {advice.summary && <p className="text-sm leading-relaxed">{advice.summary}</p>}
                <ol className="space-y-3">
                  {advice.priorities.map((p, i) => (
                    <li key={i} className="rounded-xl border border-border bg-velvet/40 p-4 text-sm">
                      <p className="font-medium text-primary">{p.title}</p>
                      <p className="mt-1 text-muted-foreground">{p.detail}</p>
                    </li>
                  ))}
                </ol>
                {advice.watchouts.length > 0 && (
                  <ul className="list-disc space-y-1 ps-5 text-sm text-muted-foreground">
                    {advice.watchouts.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
