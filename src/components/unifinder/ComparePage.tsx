import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Heart, Plus, Scale, Search, X } from "lucide-react";
import { toast } from "sonner";
import { UNIVERSITIES, type University } from "@/data/extendedData";
import { COMPARE_MAX, clearCompare, toggleCompare, useCompare } from "@/lib/compare";
import { livingCost, yearlyCost } from "@/lib/costs";
import { countryFlagUrl } from "@/lib/flags";
import { useFavorites } from "@/lib/favorites";
import { useI18n } from "@/lib/i18n";
import { UniversityThumb } from "@/components/unifinder/UniversityThumb";
import { cn } from "@/lib/utils";

const BY_ID = new Map(UNIVERSITIES.map((u) => [u.id, u]));

function Flag({ country, className }: { country: string; className?: string }) {
  const src = countryFlagUrl(country, 40);
  return src ? <img src={src} alt="" loading="lazy" className={cn("rounded-[3px] object-cover", className)} /> : null;
}

type Metric = {
  label: string;
  value: (u: University) => number | null;
  format: (n: number) => string;
  /** true when a smaller number is the better one */
  lowerBetter: boolean;
};

const METRICS: Metric[] = [
  { label: "Tuition per year", value: (u) => u.tuitionUSD, format: (n) => `$${n.toLocaleString()}`, lowerBetter: true },
  { label: "Estimated total per year", value: (u) => yearlyCost(u, 0), format: (n) => `$${n.toLocaleString()}`, lowerBetter: true },
  { label: "Acceptance rate", value: (u) => u.acceptanceRate, format: (n) => `${n}%`, lowerBetter: false },
  { label: "World ranking", value: (u) => u.worldRanking ?? null, format: (n) => `#${n}`, lowerBetter: true },
];

function barWidth(m: Metric, v: number, all: number[]): number {
  if (m.lowerBetter) return Math.max(8, (Math.min(...all) / v) * 100);
  return Math.max(8, (v / Math.max(...all)) * 100);
}

function bestIndex(m: Metric, values: (number | null)[]): number {
  let best = -1;
  values.forEach((v, i) => {
    if (v === null) return;
    const cur = best === -1 ? null : values[best];
    if (cur === null || cur === undefined || (m.lowerBetter ? v < cur : v > cur)) best = i;
  });
  return best;
}

export function ComparePage() {
  const { tt } = useI18n();
  const ids = useCompare();
  const { favorites } = useFavorites();
  const [q, setQ] = useState("");
  const [phase, setPhase] = useState<"idle" | "scanning" | "ready">("idle");
  const [grown, setGrown] = useState(false);

  const unis = useMemo(
    () => ids.map((id) => BY_ID.get(id)).filter((u): u is University => u !== undefined),
    [ids],
  );
  const key = ids.join("|");

  // Short "scan" animation each time the selection changes, then reveal the results.
  useEffect(() => {
    setGrown(false);
    if (unis.length < 2) {
      setPhase("idle");
      return undefined;
    }
    setPhase("scanning");
    const t1 = window.setTimeout(() => setPhase("ready"), 1400);
    return () => window.clearTimeout(t1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (phase !== "ready") return undefined;
    const raf = window.requestAnimationFrame(() => setGrown(true));
    return () => window.cancelAnimationFrame(raf);
  }, [phase]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    return UNIVERSITIES.filter(
      (u) =>
        !ids.includes(u.id) &&
        (u.name.toLowerCase().includes(s) || u.city.toLowerCase().includes(s) || u.country.toLowerCase().includes(s)),
    )
      .sort((a, b) => (a.worldRanking ?? 9999) - (b.worldRanking ?? 9999))
      .slice(0, 8);
  }, [q, ids]);

  const savedToAdd = favorites
    .map((f) => BY_ID.get(f.university_id))
    .filter((u): u is University => u !== undefined && !ids.includes(u.id));

  const add = (u: University) => {
    const r = toggleCompare(u.id);
    if (r === "full") toast.error(`${tt("You can compare up to")} ${COMPARE_MAX}`);
    else setQ("");
  };

  const highlights = useMemo(() => {
    if (unis.length < 2) return [];
    const pick = (m: Metric) => {
      const vals = unis.map((u) => m.value(u));
      const i = bestIndex(m, vals);
      const u = unis[i];
      return u ? u.name : "—";
    };
    return [
      { title: "Lowest tuition", name: pick(METRICS[0]!) },
      { title: "Lowest total cost", name: pick(METRICS[1]!) },
      { title: "Easiest to get into", name: pick(METRICS[2]!) },
      { title: "Best world ranking", name: pick(METRICS[3]!) },
    ];
  }, [unis]);

  const slots = Array.from({ length: COMPARE_MAX }, (_, i) => unis[i] ?? null);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl text-gilded sm:text-5xl">{tt("Compare universities")}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        {tt("Search up to four universities and see tuition, total cost, selectivity and ranking side by side.")}
      </p>

      {/* Slots */}
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {slots.map((u, i) =>
          u ? (
            <div
              key={u.id}
              className="glass animate-fade-in relative overflow-hidden rounded-2xl border border-primary/40"
            >
              <div className="h-28 w-full">
                <UniversityThumb university={u} />
              </div>
              <button
                type="button"
                aria-label={`${tt("Remove")} ${u.name}`}
                onClick={() => toggleCompare(u.id)}
                className="absolute right-2 top-2 grid size-7 place-items-center rounded-full bg-background/80 text-muted-foreground backdrop-blur hover:text-foreground"
              >
                <X className="size-4" />
              </button>
              <div className="p-3">
                <p className="line-clamp-2 text-sm font-semibold leading-snug">{u.name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Flag country={u.country} className="h-3 w-4" />
                  {u.country}
                </p>
              </div>
            </div>
          ) : (
            <button
              key={`empty-${i}`}
              type="button"
              onClick={() => document.getElementById("compare-search")?.focus()}
              className="grid min-h-[11.5rem] place-items-center rounded-2xl border border-dashed border-primary/30 text-muted-foreground outline-none transition-colors hover:border-primary/60 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex flex-col items-center gap-2 text-sm">
                <span className="grid size-10 animate-pulse place-items-center rounded-full border border-primary/40">
                  <Plus className="size-5" />
                </span>
                {tt("Add a university")}
              </span>
            </button>
          ),
        )}
      </div>

      {/* Search */}
      <div className="relative mt-6 max-w-xl">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary/70" />
        <input
          id="compare-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tt("Search by university, city or country…")}
          disabled={ids.length >= COMPARE_MAX}
          className="w-full rounded-xl border border-border bg-velvet/60 py-3 pe-4 ps-11 text-sm outline-none transition-all focus:border-primary/70 focus:ring-2 focus:ring-ring disabled:opacity-50"
        />
        {results.length > 0 && (
          <ul className="glass absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border shadow-xl">
            {results.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => add(u)}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm transition-colors hover:bg-primary/10"
                >
                  <Flag country={u.country} className="h-4 w-6 shrink-0" />
                  <span className="min-w-0 flex-1 truncate">{u.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{u.country}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {q.trim().length >= 2 && results.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">{tt("No universities match")} “{q}”.</p>
        )}
      </div>

      {savedToAdd.length > 0 && ids.length < COMPARE_MAX && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Heart className="size-3.5" /> {tt("From your saved list")}:
          </span>
          {savedToAdd.slice(0, 8).map((u) => (
            <button
              key={u.id}
              type="button"
              onClick={() => add(u)}
              className="rounded-full border border-border px-3 py-1 text-xs transition-colors hover:border-primary/60 hover:text-primary"
            >
              + {u.name}
            </button>
          ))}
        </div>
      )}

      {/* Result area */}
      <div className="mt-10">
        {phase === "idle" && (
          <div className="glass rounded-2xl p-8 text-center">
            <Scale className="mx-auto size-8 text-primary/70" />
            <p className="mt-3 text-sm text-muted-foreground">
              {unis.length === 0
                ? tt("Pick at least two universities to start comparing.")
                : tt("Add one more university to see the comparison.")}
            </p>
          </div>
        )}

        {phase === "scanning" && (
          <div className="glass overflow-hidden rounded-2xl p-8" role="status" aria-live="polite">
            <p className="text-sm text-primary">
              {tt("Comparing")} {unis.length} {tt("universities")}…
            </p>
            <div className="relative mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
              <span className="absolute inset-y-0 w-1/3 animate-[compare-sweep_1.1s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
            <div className="mt-6 space-y-3" aria-hidden>
              {[88, 72, 80].map((w, i) => (
                <div key={i} className="h-3 animate-pulse rounded-full bg-velvet/70" style={{ width: `${w}%`, animationDelay: `${i * 140}ms` }} />
              ))}
            </div>
          </div>
        )}

        {phase === "ready" && unis.length >= 2 && (
          <div className="space-y-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((h, i) => (
                <div
                  key={h.title}
                  className="glass animate-fade-in rounded-2xl p-4"
                  style={{ animationDelay: `${i * 90}ms`, animationFillMode: "both" }}
                >
                  <p className="text-xs text-muted-foreground">{tt(h.title)}</p>
                  <p className="mt-1 text-sm font-semibold text-primary">{h.name}</p>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 sm:p-6">
              <div className="space-y-8">
                {METRICS.map((m) => {
                  const vals = unis.map((u) => m.value(u));
                  const nums = vals.filter((v): v is number => v !== null);
                  const best = bestIndex(m, vals);
                  return (
                    <div key={m.label}>
                      <h3 className="text-sm font-semibold text-primary">{tt(m.label)}</h3>
                      <div className="mt-3 space-y-2.5">
                        {unis.map((u, i) => {
                          const v = vals[i] ?? null;
                          return (
                            <div key={u.id} className="grid grid-cols-[7rem_1fr_5.5rem] items-center gap-3 text-xs sm:grid-cols-[11rem_1fr_6rem]">
                              <span className="truncate" title={u.name}>{u.name}</span>
                              <div className="h-2.5 overflow-hidden rounded-full bg-secondary">
                                <div
                                  className={cn(
                                    "h-full rounded-full transition-[width] duration-1000 ease-out",
                                    i === best ? "bg-gradient-to-r from-gold-soft to-gold" : "bg-primary/35",
                                  )}
                                  style={{ width: v === null || !grown ? "0%" : `${barWidth(m, v, nums)}%`, transitionDelay: `${i * 120}ms` }}
                                />
                              </div>
                              <span className={cn("text-end tabular-nums", i === best && "font-semibold text-primary")}>
                                {v === null ? "—" : m.format(v)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                {tt("Living costs are rough regional averages")} ({unis.map((u) => `$${livingCost(u).toLocaleString()}`).join(", ")}).{" "}
                {tt("Confirm every figure on the official website.")}
              </p>
            </div>

            <div className="glass overflow-x-auto rounded-2xl p-2 sm:p-4">
              <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
                <tbody>
                  {[
                    { label: "Location", cell: (u: University) => (u.city && u.city !== "Main campus" ? `${u.city}, ${u.country}` : u.country) },
                    { label: "Founded", cell: (u: University) => String(u.founded) },
                    { label: "Aid for internationals", cell: (u: University) => (u.aidForInternationals ? tt("Yes") : tt("No")) },
                    { label: "Strengths", cell: (u: University) => u.strengths.slice(0, 4).map(tt).join(", ") },
                  ].map((r) => (
                    <tr key={r.label}>
                      <th scope="row" className="w-36 border-b border-border/60 p-3 text-start text-xs font-normal text-muted-foreground">
                        {tt(r.label)}
                      </th>
                      {unis.map((u) => (
                        <td key={u.id} className="border-b border-border/60 p-3 align-top">{r.cell(u)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <th scope="row" className="w-36 p-3 text-start text-xs font-normal text-muted-foreground">{tt("Official website")}</th>
                    {unis.map((u) => (
                      <td key={u.id} className="p-3">
                        <a href={u.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-primary underline-offset-4 hover:underline">
                          {tt("Open")} <ExternalLink className="size-3.5" />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={clearCompare} className="rounded-xl border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary/50">
                {tt("Start over")}
              </button>
              <Link to="/universities" className="rounded-xl border border-border px-5 py-2.5 text-sm transition-colors hover:border-primary/50">
                {tt("Browse the directory")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
