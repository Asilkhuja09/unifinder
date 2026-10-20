import { GraduationCap, Library } from "lucide-react";
import { SCHOLARSHIPS, UNIVERSITIES } from "@/data/extendedData";
import { useI18n } from "@/lib/i18n";

export function LiveIntelligenceFeed({ compact = false }: { compact?: boolean }) {
  const { tt } = useI18n();

  return (
    <section className="intelligence-panel overflow-hidden rounded-3xl border border-primary/25 p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-status-success">
            {tt("LATEST HIGHLIGHTS")}
          </p>
          <h2 className="mt-2 font-display text-2xl leading-tight text-foreground sm:text-3xl">
            {tt("Scholarship & admissions highlights")}
          </h2>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <div className="flex min-h-12 items-center gap-2 rounded-xl border border-status-success/35 bg-status-success/10 px-4 py-2.5 text-sm font-semibold text-status-success">
          <Library className="size-4 shrink-0" /> {tt(`${UNIVERSITIES.length} institutions in the directory`)}
        </div>
        <div className="flex min-h-12 items-center gap-2 rounded-xl border border-primary/70 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary">
          <GraduationCap className="size-4 shrink-0" /> {tt(`${SCHOLARSHIPS.length} scholarship tracks`)}
        </div>
      </div>

      <div tabIndex={0} aria-label={tt("Scholarship highlights")} className={`feed-window mt-6 overflow-hidden motion-reduce:overflow-y-auto rounded-2xl border border-border/80 bg-feed/75 ${compact ? "h-44" : "h-60"}`}>
        <div className="feed-scroll motion-reduce:animate-none">
          {[false, true].map((duplicate) => (
            <div key={String(duplicate)} aria-hidden={duplicate || undefined} className={duplicate ? "motion-reduce:hidden" : undefined}>
              {SCHOLARSHIPS.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="grid min-h-16 grid-cols-[8px_1fr] items-center gap-3 border-b border-border/40 px-4 py-3 text-xs sm:text-sm"
                >
                  <span aria-hidden className="size-1.5 rounded-full bg-primary" />
                  <p className="min-w-0 font-medium leading-snug text-foreground">
                    {tt(`${scholarship.name} · ${scholarship.coverage}`)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}