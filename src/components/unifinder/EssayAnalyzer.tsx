import { useCallback, useEffect, useState } from "react";
import {
  ChevronDown,
  Clock,
  History,
  Loader2,
  Sparkles,
  Trash2,
  TriangleAlert,
  Trophy,
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import {
  analyzeEssay,
  deleteEssayEvaluation,
  listEssayEvaluations,
  type EssayAnalysis,
} from "@/lib/essay-analyzer.functions";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

type HistoryRow = {
  id: string;
  created_at: string;
  prompt_topic: string;
  essay_text: string;
  overall_score: number;
  grammar_score: number;
  structure_score: number;
  summary: string;
  strengths: unknown;
  weaknesses: unknown;
  actionable_steps: unknown;
  model: string;
};

const toList = (v: unknown): string[] => (Array.isArray(v) ? v.map(String) : []);
const toSteps = (v: unknown): { title: string; detail: string }[] =>
  Array.isArray(v)
    ? v.map((s) => {
        const step = (s ?? {}) as { title?: unknown; detail?: unknown };
        return { title: String(step.title ?? ""), detail: String(step.detail ?? "") };
      })
    : [];

function toneOf(score: number) {
  if (score >= 80) return { stroke: "var(--accent)", text: "text-accent" };
  if (score >= 60) return { stroke: "var(--gold)", text: "text-primary" };
  return { stroke: "var(--destructive)", text: "text-destructive" };
}

function ScoreRing({ label, score, size = 132 }: { label: string; score: number; size?: number }) {
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const tone = toneOf(score);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={8}
            className="stroke-border"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            strokeWidth={8}
            strokeLinecap="round"
            stroke={tone.stroke}
            strokeDasharray={c}
            strokeDashoffset={c - (c * Math.min(100, Math.max(0, score))) / 100}
            style={{ transition: "stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1)" }}
          />
        </svg>
        <span
          className={`absolute inset-0 grid place-items-center font-display text-3xl tabular-nums ${tone.text}`}
        >
          {score}
        </span>
      </div>
      <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{label}</span>
    </div>
  );
}

function ResultView({ analysis }: { analysis: EssayAnalysis }) {
  return (
    <div className="space-y-6">
      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <ScoreRing label="Overall" score={analysis.overall_score} />
          <ScoreRing label="Grammar & Tone" score={analysis.grammar_score} size={104} />
          <ScoreRing label="Structure" score={analysis.structure_score} size={104} />
        </div>
        {analysis.summary && (
          <p className="mt-6 text-center text-sm leading-relaxed text-muted-foreground">
            {analysis.summary}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-accent">
            <Trophy className="size-4" /> Top strengths
          </p>
          <ul className="space-y-2">
            {analysis.strengths.map((s, i) => (
              <li key={i} className="rounded-xl border border-border bg-velvet/40 p-3 text-sm text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-destructive">
            <TriangleAlert className="size-4" /> Weaknesses
          </p>
          <ul className="space-y-2">
            {analysis.weaknesses.map((s, i) => (
              <li key={i} className="rounded-xl border border-border bg-velvet/40 p-3 text-sm text-muted-foreground">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="glass rounded-2xl p-5">
        <p className="mb-3 text-sm font-semibold text-primary">Actionable steps</p>
        <div className="space-y-3">
          {analysis.actionable_steps.map((step, i) => (
            <details key={i} className="group rounded-xl border border-border bg-velvet/40 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="font-display text-lg text-primary">
                  {i + 1}. {step.title}
                </span>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EssayAnalyzer() {
  const { lang } = useI18n();
  const { user, requireAuth } = useAuth();
  const runAnalyze = useServerFn(analyzeEssay);
  const runList = useServerFn(listEssayEvaluations);
  const runDelete = useServerFn(deleteEssayEvaluation);

  const [tab, setTab] = useState<"analyze" | "history">("analyze");
  const [topic, setTopic] = useState("");
  const [essay, setEssay] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<EssayAnalysis | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [historyBusy, setHistoryBusy] = useState(false);
  const [openRow, setOpenRow] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) return;
    setHistoryBusy(true);
    try {
      setHistory((await runList({})) as HistoryRow[]);
    } catch {
      /* history is non-critical */
    } finally {
      setHistoryBusy(false);
    }
  }, [runList, user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const submit = async () => {
    if (!requireAuth()) return;
    if (essay.trim().length < 40) {
      setErr("Please paste at least a few sentences before analysing.");
      return;
    }
    setBusy(true);
    setErr(null);
    setResult(null);
    try {
      const res = await runAnalyze({
        data: { essay_text: essay, prompt_topic: topic, language: lang },
      });
      setResult(res.analysis);
      void refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Analysis failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    setHistory((h) => h.filter((r) => r.id !== id));
    try {
      await runDelete({ data: { id } });
    } catch {
      void refresh();
    }
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl text-gilded sm:text-5xl">AI Essay Analyzer</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Structured admissions feedback on your personal statement — scored, critiqued and turned
        into concrete next steps. Every analysis is saved privately to your account.
      </p>

      <div className="mt-8 inline-flex rounded-xl border border-border bg-velvet/50 p-1">
        {(
          [
            { id: "analyze", label: "Analyze", icon: Sparkles },
            { id: "history", label: "History", icon: History },
          ] as const
        ).map((x) => (
          <button
            key={x.id}
            onClick={() => setTab(x.id)}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors ${
              tab === x.id
                ? "bg-gradient-to-r from-gold-soft to-gold font-semibold text-primary-foreground"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <x.icon className="size-4" />
            {x.label}
          </button>
        ))}
      </div>

      {tab === "analyze" ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="glass flex flex-col rounded-2xl p-5">
            <label className="text-xs uppercase tracking-[0.28em] text-primary/80" htmlFor="topic">
              Topic / Prompt
            </label>
            <input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Common App #1 — Share a background or identity central to you"
              className="mt-2 w-full rounded-xl border border-border bg-velvet/50 px-4 py-3 text-sm outline-none focus:border-primary/60"
            />

            <label className="mt-5 text-xs uppercase tracking-[0.28em] text-primary/80" htmlFor="essay">
              Essay
            </label>
            <textarea
              id="essay"
              value={essay}
              onChange={(e) => setEssay(e.target.value)}
              rows={18}
              placeholder="Paste your full personal statement here…"
              className="mt-2 w-full flex-1 resize-none rounded-xl border border-border bg-velvet/50 p-4 text-sm leading-relaxed outline-none focus:border-primary/60"
            />
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <span>{essay.length} characters</span>
              <span>{essay.trim() ? essay.trim().split(/\s+/).length : 0} words</span>
            </div>

            <button
              onClick={submit}
              disabled={busy || !essay.trim()}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--gold)] transition-opacity disabled:opacity-40"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
              {busy ? "Analyzing your essay…" : "Analyze Essay"}
            </button>
          </div>

          <div className="space-y-4">
            {err && (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                {err}
              </p>
            )}
            {busy && (
              <div className="glass space-y-4 rounded-2xl p-6">
                <div className="flex items-center gap-3 text-sm text-primary">
                  <Loader2 className="size-4 animate-spin" />
                  Reading like an admissions officer…
                </div>
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-3 animate-pulse rounded-full bg-velvet/70"
                    style={{ width: `${90 - i * 12}%`, animationDelay: `${i * 120}ms` }}
                  />
                ))}
              </div>
            )}
            {!busy && result && <ResultView analysis={result} />}
            {!busy && !result && !err && (
              <div className="glass rounded-2xl p-6 text-sm leading-relaxed text-muted-foreground">
                Your scored report appears here: overall readiness, grammar &amp; tone, structure,
                strengths, weaknesses and expandable actionable steps.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {!user && (
            <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">
              Sign in to see your saved analyses.
            </div>
          )}
          {user && historyBusy && (
            <div className="glass flex items-center gap-3 rounded-2xl p-6 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Loading history…
            </div>
          )}
          {user && !historyBusy && history.length === 0 && (
            <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">
              No evaluations yet. Analyse an essay and it will be archived here.
            </div>
          )}
          {history.map((row) => {
            const tone = toneOf(row.overall_score);
            const open = openRow === row.id;
            return (
              <div key={row.id} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`grid size-14 shrink-0 place-items-center rounded-full border border-border font-display text-xl tabular-nums ${tone.text}`}
                  >
                    {row.overall_score}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg text-primary">
                      {row.prompt_topic || "Untitled personal statement"}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      {new Date(row.created_at).toLocaleString()} · grammar {row.grammar_score} ·
                      structure {row.structure_score}
                    </p>
                  </div>
                  <button
                    onClick={() => setOpenRow(open ? null : row.id)}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-primary"
                  >
                    {open ? "Hide" : "View report"}
                  </button>
                  <button
                    onClick={() => void remove(row.id)}
                    aria-label="Delete evaluation"
                    className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                {open && (
                  <div className="mt-5">
                    <ResultView
                      analysis={{
                        overall_score: row.overall_score,
                        grammar_score: row.grammar_score,
                        structure_score: row.structure_score,
                        summary: row.summary,
                        strengths: toList(row.strengths),
                        weaknesses: toList(row.weaknesses),
                        actionable_steps: toSteps(row.actionable_steps),
                      }}
                    />
                    <details className="mt-4 rounded-xl border border-border bg-velvet/40 p-4">
                      <summary className="cursor-pointer text-sm text-primary">
                        Original essay
                      </summary>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                        {row.essay_text}
                      </p>
                    </details>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}