import { useEffect, useRef, useState } from "react";
import { Check, Loader2, MoveRight, Pencil, Sparkles, Target, TriangleAlert, Trophy } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { University } from "@/data/extendedData";
import type { DeepAdvice } from "@/lib/deep-advice.functions";
import type { BudgetStatus, DeepReport as Report } from "@/lib/deepAnalysis";
import { Flag, stagger } from "@/components/unifinder/WizardParts";
import { cn } from "@/lib/utils";

const BUDGET_LABEL: Record<BudgetStatus, string> = {
  unknown: "Set a budget to compare",
  within: "Within your budget",
  close: "Slightly above your budget",
  aid: "Above budget, but aid is offered",
  over: "Above your budget",
};
const BUDGET_TONE: Record<BudgetStatus, string> = {
  unknown: "var(--muted-foreground)",
  within: "var(--accent)",
  close: "var(--gold)",
  aid: "var(--gold)",
  over: "var(--destructive)",
};
const CATEGORY_LABEL = { reach: "Reach", target: "Target", safety: "Safety" } as const;

export function tone(score: number) {
  if (score >= 75) return "var(--accent)";
  if (score >= 50) return "var(--gold)";
  return "var(--destructive)";
}

function tier(score: number) {
  if (score >= 75) return "Strong profile";
  if (score >= 55) return "Promising profile";
  return "Room to grow";
}

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Counts from 0 to `target`; jumps straight to it when the visitor prefers reduced motion. */
function useCountUp(target: number, ms = 1100) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reducedMotion()) {
      setValue(target);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / ms);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [target, ms]);
  return value;
}

/** True one frame after mount, so CSS transitions have a starting state to animate from. */
function useMounted() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = window.requestAnimationFrame(() => setOn(true));
    return () => window.cancelAnimationFrame(id);
  }, []);
  return on;
}

function ScoreRing({ score }: { score: number }) {
  const { tt } = useI18n();
  const on = useMounted();
  const shown = useCountUp(score);
  const r = 66;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative mx-auto grid size-44 shrink-0 place-items-center" role="img" aria-label={`${tt("Application readiness")}: ${score} / 100`}>
      <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="80" cy="80" r={r} fill="none" stroke="var(--secondary)" strokeWidth="10" />
        <circle
          cx="80"
          cy="80"
          r={r}
          fill="none"
          stroke={tone(score)}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={on ? c * (1 - score / 100) : c}
          className="transition-[stroke-dashoffset] duration-[1200ms] ease-out"
          style={{ filter: `drop-shadow(0 0 8px ${tone(score)})` }}
        />
      </svg>
      <div className="text-center">
        <p className="font-display text-5xl tabular-nums" style={{ color: tone(score) }}>
          {shown}
        </p>
        <p className="text-xs text-muted-foreground">/ 100</p>
      </div>
    </div>
  );
}

function Bar({ score, delay }: { score: number; delay: number }) {
  const on = useMounted();
  return (
    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
      <div
        className="relative h-full rounded-full transition-[width] duration-[900ms] ease-out"
        style={{ width: on ? `${score}%` : "0%", background: tone(score), transitionDelay: `${delay}ms` }}
      >
        <span className="wiz-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>
    </div>
  );
}

export function DeepReportView({
  report,
  budget,
  user,
  busy,
  err,
  advice,
  onEdit,
  onAdvice,
  onView,
}: {
  report: Report;
  budget: number | null;
  user: boolean;
  busy: boolean;
  err: string | null;
  advice: DeepAdvice | null;
  onEdit: () => void;
  onAdvice: () => void;
  onView: (university: University) => void;
}) {
  const { t, tt } = useI18n();
  const [done, setDone] = useState<ReadonlySet<string>>(new Set());
  const toggle = (text: string) =>
    setDone((s) => {
      const next = new Set(s);
      if (next.has(text)) next.delete(text);
      else next.add(text);
      return next;
    });
  const doneCount = report.actions.filter((a) => done.has(a.text)).length;
  const adviceRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (advice) adviceRef.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "nearest" });
  }, [advice]);

  return (
    <div className="space-y-6">
      {/* Hero: ring, verdict and the five dimensions */}
      <div className="wiz-rise relative overflow-hidden rounded-3xl border border-primary/30 bg-velvet/50 p-6 shadow-[0_0_60px_-30px_var(--gold)] sm:p-8">
        <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          <div>
            <ScoreRing score={report.readiness} />
            <p className="mt-3 text-center">
              <span
                className="inline-block rounded-full border px-3 py-1 text-sm font-semibold"
                style={{ color: tone(report.readiness), borderColor: tone(report.readiness) }}
              >
                {tt(tier(report.readiness))}
              </span>
            </p>
            <p className="mt-1 text-center text-xs text-muted-foreground">{tt("Application readiness")}</p>
          </div>
          <div className="space-y-4">
            {report.dimensions.map((d, i) => (
              <div key={d.id} className="wiz-rise" style={stagger(i + 2)}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{tt(d.label)}</span>
                  <span className="tabular-nums" style={{ color: tone(d.score) }}>
                    {d.score}
                  </span>
                </div>
                <Bar score={d.score} delay={150 + i * 110} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="wiz-rise rounded-2xl border border-accent/30 bg-accent/5 p-5" style={stagger(3)}>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
            <Trophy className="size-4" /> {tt("Your strengths")}
          </p>
          <ul className="space-y-2.5 text-sm">
            {report.strengths.length === 0 && <li className="text-muted-foreground">{tt("Answer more questions to see your strengths.")}</li>}
            {report.strengths.map((s, i) => (
              <li key={s} className="wiz-rise flex gap-2.5" style={stagger(i + 4)}>
                <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={3} />
                <span>{tt(s)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="wiz-rise rounded-2xl border border-destructive/30 bg-destructive/5 p-5" style={stagger(4)}>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-destructive">
            <TriangleAlert className="size-4" /> {tt("What to improve")}
          </p>
          <ul className="space-y-2.5 text-sm">
            {report.gaps.length === 0 && <li className="text-muted-foreground">{tt("No major gaps found.")}</li>}
            {report.gaps.map((s, i) => (
              <li key={s} className="wiz-rise flex gap-2.5" style={stagger(i + 5)}>
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-destructive" />
                <span>{tt(s)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {report.actions.length > 0 && (
        <div className="wiz-rise rounded-2xl border border-primary/30 bg-velvet/40 p-5" style={stagger(5)}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-sm font-semibold text-primary">
              <Target className="size-4" /> {tt("Your to-do list")}
            </p>
            <p className="text-xs tabular-nums text-muted-foreground">
              {doneCount} {t("of")} {report.actions.length} {tt("done")}
            </p>
          </div>
          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-500"
              style={{ width: `${(doneCount / report.actions.length) * 100}%` }}
            />
          </div>
          <ul className="space-y-2">
            {report.actions.map((a) => {
              const on = done.has(a.text);
              return (
                <li key={a.text}>
                  <div className={cn("flex items-start gap-3 rounded-xl border p-3 text-sm transition-colors", on ? "border-accent/40 bg-accent/5" : "border-border")}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      aria-label={tt(a.text)}
                      onClick={() => toggle(a.text)}
                      className={cn(
                        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring",
                        on ? "border-accent bg-accent text-primary-foreground" : "border-border hover:border-primary/60",
                      )}
                    >
                      {on && <Check className="wiz-pop size-3.5" strokeWidth={3.5} />}
                    </button>
                    {a.href ? (
                      <a href={a.href} className={cn("text-primary underline-offset-4 hover:underline", on && "opacity-60 line-through")}>
                        {tt(a.text)}
                      </a>
                    ) : (
                      <span className={cn(on && "text-muted-foreground line-through")}>{tt(a.text)}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Matches with a cost bar against the student's budget */}
      <div>
        <h4 className="font-display text-xl text-gilded">{tt("Best matches for your priorities and budget")}</h4>
        <p className="mb-4 mt-1 text-xs text-muted-foreground">
          {tt("Costs are planning estimates: tuition plus typical living costs, before any aid. Confirm them on the official website.")}
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {report.matches.map((m, i) => {
            const u = m.match.university;
            const scale = Math.max(m.cost, budget ?? 0, 1) * 1.1;
            return (
              <li
                key={u.id}
                style={stagger(i)}
                className="wiz-rise group rounded-2xl border border-border bg-velvet/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_0_34px_-14px_var(--gold)]"
              >
                <div className="flex items-start gap-3">
                  <Flag country={u.country} width={80} className="h-7 w-10 shrink-0 rounded-md border border-border" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{u.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {u.city}, {tt(u.country)} · {tt(CATEGORY_LABEL[m.match.category])}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="font-display text-2xl tabular-nums leading-none" style={{ color: tone(m.score) }}>
                      {m.score}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{tt("Fit")}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative h-2 rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${(m.cost / scale) * 100}%`, background: BUDGET_TONE[m.budget] }}
                    />
                    {budget !== null && (
                      <span
                        aria-hidden
                        className="absolute -top-1 h-4 w-0.5 rounded bg-foreground/80"
                        style={{ left: `${(budget / scale) * 100}%` }}
                        title={tt("Your budget")}
                      />
                    )}
                  </div>
                  <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-3 text-xs">
                    <span className="tabular-nums text-muted-foreground">
                      {tt("Estimated yearly cost")}: ${m.cost.toLocaleString("en-US")}
                    </span>
                    <span style={{ color: BUDGET_TONE[m.budget] }}>{tt(BUDGET_LABEL[m.budget])}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onView(u)}
                  className="relative mt-4 inline-flex h-11 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-soft to-gold text-sm font-semibold text-primary-foreground outline-none transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]"
                >
                  {t("viewDetails")} <MoveRight className="size-4 rtl:rotate-180" />
                </button>

                {m.notes.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {m.notes.map((n) => (
                      <li key={n} className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] text-primary">
                        {tt(n)}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Opt-in AI advice */}
      <div ref={adviceRef} className="wiz-rise relative overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/10 via-velvet/50 to-velvet/30 p-5 sm:p-6" style={stagger(6)}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex max-w-xl items-start gap-3">
            <span className="wiz-float grid size-10 shrink-0 place-items-center rounded-full border border-primary/50 bg-primary/15 text-primary">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="font-display text-lg text-gilded">{tt("Personal AI advice")}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {tt("Optional. Your profile summary and answers are sent to an AI advisor. Your name is not sent. It needs you to sign in.")}
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={onAdvice}
            className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--gold)] outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring enabled:hover:-translate-y-0.5 enabled:active:scale-[0.98] disabled:opacity-60"
          >
            {!busy && (
              <span aria-hidden className="wiz-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            )}
            {busy ? <Loader2 className="relative size-4 animate-spin" /> : <Sparkles className="relative size-4" />}
            <span className="relative">{user ? tt("Get AI advice") : tt("Sign in for AI advice")}</span>
          </button>
        </div>

        {busy && (
          <div className="mt-5 space-y-2" aria-hidden>
            {[88, 72, 80].map((w, i) => (
              <div key={i} className="h-3 animate-pulse rounded-full bg-secondary" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}
        {err && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {err}
          </p>
        )}
        {advice && (
          <div className="mt-5 space-y-4" aria-live="polite">
            {advice.summary && <p className="wiz-rise text-sm leading-relaxed">{advice.summary}</p>}
            <ol className="space-y-3">
              {advice.priorities.map((p, i) => (
                <li key={i} style={stagger(i + 1)} className="wiz-rise flex gap-3 rounded-xl border border-border bg-velvet/50 p-4 text-sm">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">{i + 1}</span>
                  <div>
                    <p className="font-medium text-primary">{p.title}</p>
                    <p className="mt-1 text-muted-foreground">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            {advice.watchouts.length > 0 && (
              <ul className="space-y-1.5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-muted-foreground">
                {advice.watchouts.map((w, i) => (
                  <li key={i} className="flex gap-2.5">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onEdit}
          className="glass inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium outline-none transition-all hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil className="size-4" /> {tt("Edit answers")}
        </button>
      </div>
    </div>
  );
}
