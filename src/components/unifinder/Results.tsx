import { useMemo, useState } from "react";
import { Compass, ExternalLink, GraduationCap, MapPin, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Profile } from "@/lib/profile";
import { SCHOLARSHIPS, type University } from "@/data/extendedData";
import { matchUniversities, type MatchCategory } from "@/lib/matching";
import { CAMPUS_MEDIA, FALLBACK_MEDIA } from "@/data/campusMedia";
import { cn } from "@/lib/utils";

const CATEGORY_STYLE: Record<MatchCategory, { label: string; cls: string }> = {
  reach: { label: "Reach", cls: "border-rose-400/40 text-rose-300" },
  target: { label: "Target", cls: "border-primary/50 text-primary" },
  safety: { label: "Safety", cls: "border-emerald-400/40 text-emerald-300" },
};


export function Results({ profile, onRestart }: { profile: Profile; onRestart: () => void }) {
  const { t } = useI18n();
  const [active, setActive] = useState<University | null>(null);

  const [limit, setLimit] = useState(24);
  const { profileScore, matches } = useMemo(() => matchUniversities(profile), [profile]);
  const shown = matches.slice(0, limit);
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

      <div className="glass mb-10 grid gap-6 rounded-3xl p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="relative grid size-28 place-items-center rounded-full">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(var(--gold) ${profileScore.total * 3.6}deg, color-mix(in oklab, var(--gold) 12%, transparent) 0deg)`,
            }}
          />
          <div className="absolute inset-[6px] rounded-full bg-background/85" />
          <div className="relative text-center">
            <p className="font-display text-3xl text-primary">{profileScore.total}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">/ 100</p>
          </div>
        </div>
        <div>
          <h3 className="font-display text-2xl text-gilded">Your admissions profile score</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {matches.length} institutions ranked by fit against your grades, testing, leadership
            record, funding needs and target regions.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
            {[
              ["Academics", profileScore.academics, 45],
              ["Testing", profileScore.testing, 25],
              ["Leadership", profileScore.activities, 15],
              ["Profile depth", profileScore.completeness, 15],
            ].map(([label, value, max]) => (
              <div key={label as string} className="rounded-xl border border-border/70 p-3">
                <dt className="text-muted-foreground">{label as string}</dt>
                <dd className="mt-1 text-primary">
                  {value as number}
                  <span className="text-muted-foreground"> / {max as number}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((m, i) => {
          const u = m.university;
          const cat = CATEGORY_STYLE[m.category];
          return (
            <article key={u.id} className="glass flex flex-col rounded-2xl p-6">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-accent">
                  #{i + 1} · {u.region}
                </p>
                <span
                  className={cn("rounded-full border px-2.5 py-1 text-[10px] uppercase", cat.cls)}
                >
                  {cat.label}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl leading-tight text-primary">{u.name}</h3>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-3.5" /> {u.city}, {u.country}
              </p>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Match fit</span>
                  <span className="text-primary">{m.score}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary/70">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent via-gold-soft to-gold"
                    style={{ width: `${m.score}%` }}
                  />
                </div>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                {m.reasons.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="text-primary">•</span>
                    {r}
                  </li>
                ))}
              </ul>

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
          );
        })}
        {matches.length === 0 && (
          <p className="text-muted-foreground">No institutions match this filter combination.</p>
        )}
      </div>

      {limit < matches.length && (
        <button
          onClick={() => setLimit((l) => l + 24)}
          className="glass mx-auto mt-8 block rounded-xl px-6 py-2.5 text-sm transition-colors hover:border-primary/60"
        >
          Show more matches ({matches.length - limit} remaining)
        </button>
      )}


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

            {(() => {
              const media = CAMPUS_MEDIA[active.id] ?? FALLBACK_MEDIA;
              return (
                <>
                  {media.photos.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {media.photos.map((p) => (
                        <figure key={p.url} className="overflow-hidden rounded-2xl border border-border">
                          <img
                            src={p.url}
                            alt={`${active.name} — ${p.caption}`}
                            loading="lazy"
                            className="h-48 w-full object-cover"
                          />
                          <figcaption className="bg-velvet/60 px-3 py-2 text-xs text-muted-foreground">
                            {p.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                  {media.stats.length > 0 && (
                    <dl className="mt-6 grid gap-3 sm:grid-cols-3">
                      {media.stats.map((s) => (
                        <div key={s.label} className="rounded-xl border border-border p-4">
                          <dt className="text-xs text-muted-foreground">{s.label}</dt>
                          <dd className="text-lg text-primary">{s.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {media.alumni.length > 0 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="text-primary/80">Notable alumni: </span>
                      {media.alumni.join(" · ")}
                    </p>
                  )}
                </>
              );
            })()}

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
                <Compass className="size-4" />
                {t("mapsChip")}
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