import { useMemo, useState } from "react";
import { Heart, MapPin, Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { countryFlagEmoji, countryFlagUrl } from "@/lib/flags";
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
import { UniversityCard } from "@/components/unifinder/UniversityCard";

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
        <div
          className="relative overflow-hidden rounded-xl border border-border/70 px-3 py-2 transition-all"
          style={
            country !== "all"
              ? {
                  borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)",
                  boxShadow: "0 0 30px -14px var(--gold)",
                }
              : undefined
          }
        >
          {country !== "all" && countryFlagUrl(country, 320) && (
            <img
              src={countryFlagUrl(country, 320)!}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 size-full object-cover opacity-15 blur-[2px] [mask-image:linear-gradient(to_left,black,transparent_80%)]"
            />
          )}
          <label className="relative flex items-center gap-2 text-xs text-muted-foreground">
            {country !== "all" && countryFlagUrl(country) ? (
              <img
                src={countryFlagUrl(country)!}
                alt={`${country} flag`}
                className="h-5 w-7 rounded-sm object-cover ring-1 ring-border"
              />
            ) : null}
            Country
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={selectCls}
            >
              <option value="all">All countries</option>
              {COUNTRY_LIST.map((c) => (
                <option key={c} value={c}>
                  {countryFlagEmoji(c)} {c}
                </option>
              ))}
            </select>
          </label>
        </div>

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
          <UniversityCard
            key={u.id}
            university={u}
            favorite={ids.has(u.id)}
            onFavorite={() => void toggle(u.id, u.name)}
            onView={() => setActive(u)}
          />
        ))}
        {rows.length === 0 && (
          <p className="text-muted-foreground">No institutions match this search.</p>
        )}
      </div>

      {active && <UniversityModal university={active} onClose={() => setActive(null)} />}
    </section>
  );
}