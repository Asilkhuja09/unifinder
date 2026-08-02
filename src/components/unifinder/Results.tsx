import { useMemo, useState } from "react";
import { ExternalLink, GraduationCap, MapPin, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Profile } from "@/lib/profile";
import {
  SCHOLARSHIPS,
  UNIVERSITIES,
  tierFromRate,
  type University,
} from "@/data/extendedData";
import { cn } from "@/lib/utils";

const tierOrder = ["1-25", "26-50", "51-75", "76-100"] as const;

function matchUniversities(profile: Profile): University[] {
  let pool = UNIVERSITIES;

  if (profile.regions.length > 0) {
    const scoped = pool.filter((u) => profile.regions.includes(u.region));
    if (scoped.length > 0) pool = scoped;
  }

  if (profile.difficulty) {
    const selectedIdx = tierOrder.indexOf(profile.difficulty);
    // Accessible (76-100) requests must exclude ultra-competitive elites entirely.
    pool = pool.filter((u) => {
      const uniIdx = tierOrder.indexOf(tierFromRate(u.acceptanceRate));
      if (selectedIdx === 3) return uniIdx === 3 || uniIdx === 2;
      return uniIdx >= selectedIdx - 1 && uniIdx <= selectedIdx + 1;
    });
  }

  if (profile.needsAid === "yes") {
    pool = pool.filter((u) => u.aidForInternationals);
  }

  const major = profile.major.toLowerCase();
  return [...pool].sort((a, b) => {
    const aM = a.strengths.some((s) => s.toLowerCase() === major) ? 1 : 0;
    const bM = b.strengths.some((s) => s.toLowerCase() === major) ? 1 : 0;
    if (aM !== bM) return bM - aM;
    return a.acceptanceRate - b.acceptanceRate;
  });
}

export function Results({ profile, onRestart }: { profile: Profile; onRestart: () => void }) {
  const { t } = useI18n();
  const [active, setActive] = useState<University | null>(null);

  const unis = useMemo(() => matchUniversities(profile), [profile]);
  const scholarships = useMemo(() => {
    const scoped = SCHOLARSHIPS.filter(
      (s) => profile.regions.length === 0 || profile.regions.includes(s.region),
    );
    return scoped.length > 0 ? scoped : SCHOLARSHIPS;
  }, [profile.regions]);

  const openMaps = (uni: University) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni.mapsQuery)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section id="results" className="mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
            {profile.firstName} {profile.lastName} · {profile.major}
          </p>
          <h2 className="mt-2 text-4xl font-semibold text-gilded">{t("results")}</h2>
        </div>
        <button
          onClick={onRestart}
          className="glass rounded-xl px-5 py-2.5 text-sm transition-colors hover:border-primary/60"
        >
          {t("restart")}
        </button>
      </header>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {unis.map((u) => (
          <article key={u.id} className="glass flex flex-col rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{u.region}</p>
            <h3 className="mt-2 font-display text-2xl leading-tight text-primary">{u.name}</h3>
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
              {t("viewDetails")}
            </button>
          </article>
        ))}
        {unis.length === 0 && (
          <p className="text-muted-foreground">No institutions match this filter combination.</p>
        )}
      </div>

      <h2 className="mb-6 mt-16 text-3xl font-semibold text-gilded">{t("scholarshipResults")}</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {scholarships.map((s) => (
          <article key={s.id} className="glass rounded-2xl p-6">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
              <GraduationCap className="size-4" /> {s.sponsor}
            </p>
            <h3 className="mt-2 font-display text-2xl text-primary">{s.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            <p className="mt-3 text-sm">
              <span className="text-primary/80">Coverage: </span>
              {s.coverage}
            </p>
            <p className="mt-1 text-sm">
              <span className="text-primary/80">Deadline: </span>
              {s.deadline}
            </p>
            <a
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline"
            >
              Official portal <ExternalLink className="size-3.5" />
            </a>
          </article>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setActive(null)}
        >
          <div
            className={cn(
              "glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-accent">
                  Founded {active.founded}
                </p>
                <h3 className="mt-1 font-display text-3xl text-gilded">{active.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {active.city}, {active.country}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {active.strengths.map((s) => (
                <div
                  key={s}
                  className="rounded-xl border border-primary/25 bg-velvet/50 px-3 py-6 text-center text-sm text-primary"
                >
                  {s}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {active.description}
            </p>

            <dl className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs text-muted-foreground">{t("acceptance")}</dt>
                <dd className="text-lg text-primary">{active.acceptanceRate}%</dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs text-muted-foreground">{t("tuition")}</dt>
                <dd className="text-lg text-primary">${active.tuitionUSD.toLocaleString()}</dd>
              </div>
              <div className="rounded-xl border border-border p-4">
                <dt className="text-xs text-muted-foreground">Aid for internationals</dt>
                <dd className="text-lg text-primary">
                  {active.aidForInternationals ? t("yes") : t("no")}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
              <button
                onClick={() => openMaps(active)}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <MapPin className="size-4" />
                {t("exploreDirectory")}
              </button>
              <a
                href={active.website}
                target="_blank"
                rel="noopener noreferrer"
                className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
              >
                Official website <ExternalLink className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}