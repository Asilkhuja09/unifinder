import { useMemo, useState } from "react";
import { ExternalLink, GraduationCap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Profile } from "@/lib/profile";
import { SCHOLARSHIPS, type University } from "@/data/extendedData";
import { matchUniversities } from "@/lib/matching";
import { UniversityCard } from "@/components/unifinder/UniversityCard";
import { UniversityModal } from "@/components/unifinder/UniversityModal";
import { Button } from "@/components/ui/button";

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

  return (
    <section id="results" className="mx-auto w-full max-w-6xl px-4 py-16">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
            {profile.firstName} {profile.lastName} · {profile.major}
          </p>
          <h2 className="mt-2 text-4xl font-semibold text-gilded">{t("results")}</h2>
        </div>
        <Button
          variant="outline"
          onClick={onRestart}
          className="glass rounded-xl px-5 py-2.5 text-sm transition-colors hover:border-primary/60"
        >
          {t("restart")}
        </Button>
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
            {([
              { label: "Academics", value: profileScore.academics, max: 45 },
              { label: "Testing", value: profileScore.testing, max: 25 },
              { label: "Leadership", value: profileScore.activities, max: 15 },
              { label: "Profile depth", value: profileScore.completeness, max: 15 },
            ] as const).map((row) => (
              <div key={row.label} className="rounded-xl border border-border/70 p-3">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="mt-1 text-primary">
                  {row.value}
                  <span className="text-muted-foreground"> / {row.max}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((m) => (
          <UniversityCard
            key={m.university.id}
            university={m.university}
            category={m.category}
            matchScore={m.score}
            reasons={m.reasons}
            onView={() => setActive(m.university)}
          />
        ))}
        {matches.length === 0 && (
          <p className="text-muted-foreground">No institutions match this filter combination.</p>
        )}
      </div>

      {limit < matches.length && (
        <Button
          variant="outline"
          onClick={() => setLimit((l) => l + 24)}
          className="glass mx-auto mt-8 block rounded-xl px-6 py-2.5 text-sm transition-colors hover:border-primary/60"
        >
          Show more matches ({matches.length - limit} remaining)
        </Button>
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

      {active && <UniversityModal university={active} onClose={() => setActive(null)} />}
    </section>
  );
}