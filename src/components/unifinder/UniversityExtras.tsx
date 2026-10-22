import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { University } from "@/data/extendedData";
import type { UniversityMatch } from "@/lib/matching";
import { livingCost, yearlyCost } from "@/lib/costs";
import { cn } from "@/lib/utils";

const FACTOR_LABELS: { key: keyof UniversityMatch["factors"]; label: string; max: number }[] = [
  { key: "gpa", label: "Grades", max: 25 },
  { key: "tests", label: "Test scores", max: 15 },
  { key: "major", label: "Major strength", max: 20 },
  { key: "region", label: "Target region", max: 15 },
  { key: "difficulty", label: "Selectivity", max: 20 },
  { key: "funding", label: "Funding", max: 5 },
];

const CATEGORY_TEXT = {
  reach: "Reach: ambitious, so strengthen tests and essays.",
  target: "Target: your profile is close to this school's typical admit.",
  safety: "Safety: your profile is above this school's typical admit.",
} as const;

/** Why this university fits the visitor's profile, factor by factor. */
export function FitPanel({ match }: { match: UniversityMatch }) {
  const { tt } = useI18n();
  return (
    <section className="mt-6 rounded-2xl border border-primary/25 bg-velvet/40 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold text-primary">{tt("How well you fit")}</h4>
        <span className="font-display text-2xl tabular-nums text-primary">{match.score}/100</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{tt(CATEGORY_TEXT[match.category])}</p>
      <div className="mt-4 space-y-2.5">
        {FACTOR_LABELS.map((f) => {
          const value = match.factors[f.key];
          return (
            <div key={f.key}>
              <div className="flex justify-between text-xs">
                <span>{tt(f.label)}</span>
                <span className="tabular-nums text-muted-foreground">
                  {value}/{f.max}
                </span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-700"
                  style={{ width: `${(value / f.max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** Yearly and four-year cost estimate with an adjustable scholarship share. */
export function CostCalculator({ university }: { university: University }) {
  const { tt } = useI18n();
  const [aid, setAid] = useState(0);
  const living = livingCost(university);
  const yearly = yearlyCost(university, aid);
  const money = (n: number) => `$${n.toLocaleString()}`;
  return (
    <section className="mt-6 rounded-2xl border border-border p-5">
      <h4 className="text-sm font-semibold text-primary">{tt("Cost estimate")}</h4>
      <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs text-muted-foreground">{tt("Tuition per year")}</dt>
          <dd>{money(university.tuitionUSD)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{tt("Living per year (estimate)")}</dt>
          <dd>{money(living)}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">{tt("Four years in total")}</dt>
          <dd className="font-semibold text-primary">{money(yearly * 4)}</dd>
        </div>
      </dl>
      <label className="mt-4 block text-xs text-muted-foreground" htmlFor={`aid-${university.id}`}>
        {tt("If a scholarship covers this share of tuition")}: <span className="text-primary">{aid}%</span>
      </label>
      <input
        id={`aid-${university.id}`}
        type="range"
        min={0}
        max={100}
        step={5}
        value={aid}
        onChange={(e) => setAid(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--gold)]"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        {tt("Per year with this scholarship")}: <span className="text-foreground">{money(yearly)}</span>.{" "}
        {tt("Living costs are rough regional averages, not quotes from the university.")}
      </p>
    </section>
  );
}

const CHECKLIST = [
  "Transcript and grade translation",
  "English test score report",
  "Personal statement / essays",
  "Recommendation letters",
  "Passport copy",
  "Proof of funds / financial documents",
  "Application fee or fee waiver",
  "Check the deadline on the official site",
];

/** Personal application checklist, remembered per university in this browser. */
export function ApplicationChecklist({ university }: { university: University }) {
  const { tt } = useI18n();
  const key = `uf_check_${university.id}`;
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      setDone(Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : []);
    } catch {
      setDone([]);
    }
  }, [key]);

  const toggle = (item: string) => {
    const next = done.includes(item) ? done.filter((x) => x !== item) : [...done, item];
    setDone(next);
    try {
      window.localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const count = CHECKLIST.filter((c) => done.includes(c)).length;
  return (
    <section className="mt-6 rounded-2xl border border-border p-5">
      <div className="flex items-baseline justify-between gap-2">
        <h4 className="text-sm font-semibold text-primary">{tt("Application checklist")}</h4>
        <span className="text-xs tabular-nums text-muted-foreground">
          {count}/{CHECKLIST.length}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-500"
          style={{ width: `${(count / CHECKLIST.length) * 100}%` }}
        />
      </div>
      <ul className="mt-3 space-y-1.5">
        {CHECKLIST.map((item) => {
          const on = done.includes(item);
          return (
            <li key={item}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(item)}
                className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-start text-sm outline-none transition-colors hover:bg-secondary/60 focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span
                  className={cn(
                    "grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                    on ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}
                >
                  {on && <Check className="size-3" strokeWidth={3.5} />}
                </span>
                <span className={cn(on && "text-muted-foreground line-through")}>{tt(item)}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">
        {tt("Requirements differ by university and program. Confirm them on the official website.")}
      </p>
    </section>
  );
}
