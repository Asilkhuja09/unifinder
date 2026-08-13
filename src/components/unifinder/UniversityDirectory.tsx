import { useMemo, useState } from "react";
import { Heart, MapPin, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useFavorites } from "@/lib/favorites";
import {
  COUNTRY_LIST,
  RANK_TIERS,
  REGIONS,
  UNIVERSITIES,
  US_STATES,
  type RankTier,
  type Region,
  type University,
} from "@/data/extendedData";
import { UniversityModal } from "@/components/unifinder/UniversityModal";

const selectCls =
  "rounded-xl border border-border bg-velvet/60 px-3 py-2 text-sm text-foreground outline-none focus:border-primary/70";

export function UniversityDirectory() {
  const { t } = useI18n();
  const { ids, toggle } = useFavorites();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [country, setCountry] = useState<string>("all");
  const [state, setState] = useState<string>("all");
  const [rank, setRank] = useState<RankTier | "all">("all");
  const [active, setActive] = useState<University | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNIVERSITIES.filter((u) => {
      if (region !== "all" && u.region !== region) return false;
      if (country !== "all" && u.country !== country) return false;
      if (state !== "all" && u.usState !== state) return false;
      if (rank !== "all") {
        const tier = RANK_TIERS.find((r) => r.id === rank);
        if (tier && !tier.test(u.worldRanking)) return false;
      }
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q) ||
        u.city.toLowerCase().includes(q) ||
        u.strengths.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [query, region, country, state, rank]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl text-gilded sm:text-5xl">Global University Directory</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        {UNIVERSITIES.length} verified institutions across {REGIONS.length} regions, with
        acceptance rates, tuition, world rankings, aid policy for internationals and campus
        multimedia.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="glass flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 sm:max-w-sm">
          <Search className="size-4 text-primary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search universities, countries, fields…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(["all", ...REGIONS] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r as Region | "all")}
              className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                region === r
                  ? "bg-gradient-to-r from-gold-soft to-gold text-primary-foreground"
                  : "glass text-muted-foreground hover:text-primary"
              }`}
            >
              {r === "all" ? "All regions" : r}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          Country
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={selectCls}
          >
            <option value="all">All countries</option>
            {COUNTRY_LIST.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          US state
          <select value={state} onChange={(e) => setState(e.target.value)} className={selectCls}>
            <option value="all">All states</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          World ranking
          <select
            value={rank}
            onChange={(e) => setRank(e.target.value as RankTier | "all")}
            className={selectCls}
          >
            <option value="all">Any tier</option>
            {RANK_TIERS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
        <p className="self-center text-xs text-accent">{rows.length} matches</p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((u) => (
          <article key={u.id} className="glass flex flex-col rounded-2xl p-6">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">
                {u.region}
                {u.worldRanking ? ` · World #${u.worldRanking}` : ""}
              </p>
              <button
                onClick={() => void toggle(u.id, u.name)}
                aria-label={ids.has(u.id) ? "Remove from favorites" : "Save to favorites"}
                aria-pressed={ids.has(u.id)}
                className="rounded-full border border-border p-2 transition-colors hover:border-primary/60"
              >
                <Heart
                  className={`size-4 ${ids.has(u.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              </button>
            </div>
            <h2 className="mt-2 font-display text-2xl leading-tight text-primary">{u.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" /> {u.city}, {u.country}
            </p>
            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-muted-foreground">{t("acceptance")}</dt>
                <dd className="text-foreground">{u.acceptanceRate}%</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">{t("tuition")}</dt>
                <dd className="text-foreground">${u.tuitionUSD.toLocaleString()}</dd>
              </div>
            </dl>
            <button
              onClick={() => setActive(u)}
              className="mt-6 rounded-xl border border-primary/40 py-2.5 text-sm text-primary transition-colors hover:bg-primary/10"
            >
              {t("viewCampus")}
            </button>
          </article>
        ))}
        {rows.length === 0 && (
          <p className="text-muted-foreground">No institutions match this search.</p>
        )}
      </div>

      {active && <UniversityModal university={active} onClose={() => setActive(null)} />}
    </section>
  );
}