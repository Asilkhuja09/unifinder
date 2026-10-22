import { useMemo, useState, type ComponentType } from "react";
import { BookOpen, Check, Cog, Cpu, Dna, Palette, Search, Sigma, Sparkles, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { majorTheme, type MajorTheme } from "@/lib/majorThemes";
import { COUNTRIES, MAJORS, REGIONS, UNIVERSITIES, type Region } from "@/data/extendedData";
import { UniversityThumb } from "@/components/unifinder/UniversityThumb";
import { cn } from "@/lib/utils";
import { Flag, Highlight, OptionCard, inputCls, stagger } from "./WizardParts";

/* ------------------------------------------------------------------ */
/* Country                                                             */
/* ------------------------------------------------------------------ */

export function CountryPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  const { t, tt } = useI18n();
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return COUNTRIES.filter((c) => c.toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-primary/90">{t("country")}</p>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border p-4 transition-all duration-500",
          value ? "border-primary/50 bg-velvet/50" : "border-dashed border-border bg-velvet/30",
        )}
      >
        {value && (
          <Flag
            country={value}
            width={320}
            className="pointer-events-none absolute inset-0 size-full opacity-20 blur-[3px] [mask-image:linear-gradient(to_left,black,transparent_80%)]"
          />
        )}
        <div className="relative flex items-center gap-4">
          {value ? (
            <div key={value} className="wiz-pop relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-1 ring-primary/40 shadow-[0_0_30px_-8px_var(--gold)]">
              <Flag country={value} width={160} className="size-full" />
              <span className="wiz-sheen pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>
          ) : (
            <div className="grid h-14 w-20 shrink-0 place-items-center rounded-lg border border-dashed border-border text-muted-foreground">
              <Sparkles className="size-5" />
            </div>
          )}
          <div>
            <p className="text-lg font-semibold text-gilded">{value || tt("Choose your country")}</p>
            <p className="text-xs text-muted-foreground">{tt("The country where you study or live now.")}</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary/70" />
        <input
          className={cn(inputCls, "ps-11")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tt("Search countries…")}
        />
      </div>

      <div className="grid max-h-60 grid-cols-2 gap-2 overflow-y-auto pe-1 sm:grid-cols-3">
        {list.map((c, i) => {
          const on = c === value;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(c)}
              style={stagger(Math.min(i, 12))}
              className={cn(
                "wiz-rise flex items-center gap-2.5 rounded-xl border px-3 py-2 text-start text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring",
                on
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border bg-velvet/40 hover:border-primary/50 hover:bg-velvet/70",
              )}
            >
              <Flag country={c} width={40} className="h-4 w-6 shrink-0 rounded-[3px] ring-1 ring-border" />
              <span className="truncate">
                <Highlight text={c} query={q.trim()} />
              </span>
            </button>
          );
        })}
        {list.length === 0 && (
          <p className="col-span-full px-2 py-6 text-center text-sm text-muted-foreground">
            {tt("No countries match")} “{q}”.
          </p>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Regions                                                             */
/* ------------------------------------------------------------------ */

const REGION_FLAGS: Record<Region, string[]> = {
  USA: ["United States"],
  UK: ["United Kingdom"],
  Canada: ["Canada"],
  Europe: ["France", "Italy", "Spain", "Netherlands"],
  Germany: ["Germany"],
  China: ["China"],
  Asia: ["Japan", "South Korea", "Singapore", "India"],
  Oceania: ["Australia", "New Zealand"],
};

const REGION_STATS = (() => {
  const out = {} as Record<Region, { count: number; top: typeof UNIVERSITIES }>;
  for (const r of REGIONS) {
    const inRegion = UNIVERSITIES.filter((u) => u.region === r);
    const ranked = inRegion
      .filter((u) => u.worldRanking !== undefined)
      .sort((a, b) => (a.worldRanking ?? 9999) - (b.worldRanking ?? 9999));
    out[r] = { count: inRegion.length, top: ranked.slice(0, 3) };
  }
  return out;
})();

export function RegionPicker({
  value,
  onChange,
}: {
  value: Region[];
  onChange: (next: Region[]) => void;
}) {
  const { t, tt } = useI18n();
  const all = value.length === REGIONS.length;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {value.length > 0 ? `${value.length} ${tt("selected")}` : tt("Pick one or more regions.")}
        </p>
        <button
          type="button"
          onClick={() => onChange(all ? [] : [...REGIONS])}
          className="rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary outline-none transition-colors hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {all ? tt("Clear all") : t("selectAll")}
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {REGIONS.map((r, i) => {
          const on = value.includes(r);
          const stats = REGION_STATS[r];
          return (
            <OptionCard
              key={r}
              index={i}
              selected={on}
              onClick={() => onChange(on ? value.filter((x) => x !== r) : [...value, r])}
              className="p-4"
            >
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {REGION_FLAGS[r].map((c) => (
                  <Flag
                    key={c}
                    country={c}
                    width={80}
                    className="size-9 rounded-full ring-2 ring-background transition-transform duration-300 group-hover:scale-110"
                  />
                ))}
              </div>
              <p className={cn("mt-3 text-base font-semibold", on ? "text-primary" : "text-foreground")}>{tt(r)}</p>
              <p className="text-xs text-muted-foreground">
                {stats.count} {tt("universities")}
              </p>
              <div className="mt-3 flex -space-x-2 rtl:space-x-reverse" aria-hidden>
                {stats.top.map((u) => (
                  <span
                    key={u.id}
                    title={u.name}
                    className="block size-8 overflow-hidden rounded-full bg-secondary ring-2 ring-background"
                  >
                    <UniversityThumb university={u} />
                  </span>
                ))}
              </div>
            </OptionCard>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Major                                                               */
/* ------------------------------------------------------------------ */

const THEME_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  quant: Sigma,
  tech: Cpu,
  life: Dna,
  engineering: Cog,
  humanities: BookOpen,
  creative: Palette,
};

type Group = { theme: MajorTheme; majors: string[] };

const GROUPS: Group[] = (() => {
  const map = new Map<string, Group>();
  for (const m of MAJORS) {
    const theme = majorTheme(m);
    const g = map.get(theme.id);
    if (g) g.majors.push(m);
    else map.set(theme.id, { theme, majors: [m] });
  }
  return [...map.values()].sort((a, b) => b.majors.length - a.majors.length);
})();

function themeBg(theme: MajorTheme): { background: string; backgroundSize?: string } {
  return theme.id === "tech"
    ? { background: theme.background, backgroundSize: "22px 22px" }
    : { background: theme.background };
}

export function MajorPicker({ value, onSelect }: { value: string; onSelect: (m: string) => void }) {
  const { t, tt } = useI18n();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);

  const query = q.trim();
  const shown = useMemo(() => {
    const s = query.toLowerCase();
    const pool = cat ? (GROUPS.find((g) => g.theme.id === cat)?.majors ?? []) : MAJORS;
    return pool.filter((m) => m.toLowerCase().includes(s));
  }, [query, cat]);

  const selTheme = value ? majorTheme(value) : null;
  const SelIcon = selTheme ? (THEME_ICONS[selTheme.id] ?? Sparkles) : Sparkles;

  return (
    <div className="space-y-5">
      {/* Selected hero */}
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border p-5 transition-all duration-500",
          selTheme ? "" : "border-dashed border-border bg-velvet/30",
        )}
        style={
          selTheme
            ? {
                borderColor: `color-mix(in oklab, ${selTheme.accent} 60%, transparent)`,
                boxShadow: `0 0 46px -16px ${selTheme.accent}`,
              }
            : undefined
        }
      >
        {selTheme && (
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70" style={themeBg(selTheme)} />
        )}
        <div className="relative flex items-center gap-4">
          <div
            key={selTheme?.id ?? "none"}
            className={cn(
              "grid size-14 shrink-0 place-items-center rounded-2xl border bg-background/60 backdrop-blur-md",
              selTheme ? "wiz-pop wiz-float border-primary/50 text-primary" : "border-border text-muted-foreground",
            )}
          >
            <SelIcon className="size-7" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-primary/80">
              {selTheme ? tt(selTheme.label) : tt("Your field of study")}
            </p>
            <p key={value} className="wiz-rise truncate text-xl font-semibold text-gilded">
              {value || tt("Choose a major below")}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary/70" />
        <input
          className={cn(inputCls, "ps-11 pe-10")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("searchMajors")}
        />
        {q && (
          <button
            type="button"
            aria-label={tt("Clear search")}
            onClick={() => setQ("")}
            className="absolute end-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full text-muted-foreground transition-colors hover:text-primary"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {GROUPS.map((g, i) => {
          const Icon = THEME_ICONS[g.theme.id] ?? Sparkles;
          const on = cat === g.theme.id;
          return (
            <button
              key={g.theme.id}
              type="button"
              aria-pressed={on}
              onClick={() => setCat(on ? null : g.theme.id)}
              style={stagger(i)}
              className={cn(
                "wiz-rise group relative overflow-hidden rounded-2xl border p-4 text-start outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.985]",
                on
                  ? "border-primary shadow-[0_0_34px_-12px_var(--gold)]"
                  : "border-border hover:-translate-y-0.5 hover:border-primary/50",
              )}
            >
              <div
                aria-hidden
                className={cn("pointer-events-none absolute inset-0 transition-opacity duration-300", on ? "opacity-90" : "opacity-45 group-hover:opacity-70")}
                style={themeBg(g.theme)}
              />
              <div className="relative">
                <Icon className={cn("size-6 transition-transform duration-300 group-hover:scale-110", on ? "text-primary" : "text-primary/80")} />
                <p className="mt-3 text-sm font-semibold leading-snug text-foreground">{tt(g.theme.label)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {g.majors.length} {tt("majors")}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Majors */}
      <div key={`${cat ?? "all"}-${query}`} className="flex max-h-64 flex-wrap gap-2 overflow-y-auto pe-1">
        {shown.map((m, i) => {
          const on = m === value;
          return (
            <button
              key={m}
              type="button"
              aria-pressed={on}
              onClick={() => onSelect(m)}
              style={stagger(Math.min(i, 14))}
              className={cn(
                "wiz-rise inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring active:scale-95",
                on
                  ? "border-primary bg-gradient-to-br from-gold-soft to-gold font-semibold text-primary-foreground shadow-[0_0_24px_-8px_var(--gold)]"
                  : "border-border bg-velvet/40 hover:border-primary/60 hover:bg-primary/10",
              )}
            >
              {on && <Check className="wiz-pop size-3.5" strokeWidth={3} />}
              <Highlight text={m} query={query} />
            </button>
          );
        })}
        {shown.length === 0 && (
          <p className="w-full px-2 py-6 text-center text-sm text-muted-foreground">
            {tt("No majors match")} “{q}”.
          </p>
        )}
      </div>
    </div>
  );
}
