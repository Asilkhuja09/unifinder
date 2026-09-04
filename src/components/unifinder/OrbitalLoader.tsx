import { useEffect, useState } from "react";
import { Globe2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const ORBIT_TAGS = [
  "Harvard",
  "MIT",
  "Oxford",
  "ETH Zürich",
  "Tsinghua",
  "U of T",
  "NUS",
  "TUM",
  "Melbourne",
  "UTokyo",
];

/** Global match-generation window: exactly 30 seconds. */
export const LOADER_DURATION_MS = 30000;

const STAGES = [
  { until: 33, label: "Scanning top global universities…" },
  { until: 66, label: "Analyzing financial aid & STEM criteria…" },
  { until: 100, label: "Finalizing your custom recommendations…" },
];

export function OrbitalLoader({ onDone }: { onDone: () => void }) {
  const { t } = useI18n();
  const [progress, setProgress] = useState(0);
  const stage = STAGES.find((s) => progress < s.until) ?? STAGES[STAGES.length - 1]!;

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, ((now - start) / LOADER_DURATION_MS) * 100);
      setProgress(pct);
      if (pct < 100) frame = window.requestAnimationFrame(tick);
      else onDone();
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [onDone]);


  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background/92 backdrop-blur-xl">
      <div className="relative grid size-[min(78vw,520px)] place-items-center">
        {[0.45, 0.7, 1].map((s) => (
          <div
            key={s}
            className="absolute rounded-full border border-primary/20"
            style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
          />
        ))}
        <div className="radar-sweep absolute size-full rounded-full [background:conic-gradient(from_0deg,transparent_0deg,color-mix(in_oklab,var(--gold)_25%,transparent)_40deg,transparent_80deg)]" />

        <div className="orbit-spin absolute inset-0 size-full">
          {ORBIT_TAGS.map((tag, i) => {
            const angle = (i / ORBIT_TAGS.length) * 2 * Math.PI;
            const x = 50 + Math.cos(angle) * 42;
            const y = 50 + Math.sin(angle) * 24;
            return (
              <span
                key={tag}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="orbit-counter glass block whitespace-nowrap rounded-full px-3 py-1 text-[11px] tracking-wide text-primary">
                  {tag}
                </span>
              </span>
            );
          })}
        </div>

        <div className="relative grid size-28 place-items-center rounded-full border border-primary/50 bg-velvet/70 shadow-[0_0_60px_-10px_var(--gold)]">
          <Globe2 className="size-10 animate-pulse text-primary" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 text-xs">
          <p key={stage.label} className="animate-fade-in text-muted-foreground">
            {stage.label}
          </p>
          <span className="tabular-nums text-primary">{Math.round(progress)}%</span>
        </div>
      </div>


      <div className="mt-10 w-[min(88vw,520px)] px-4">
        <p className="mb-3 text-center text-xs uppercase tracking-[0.35em] text-primary/80">
          {t("loading")}
        </p>
        <div className="h-2 w-full overflow-hidden rounded-full border border-border bg-secondary/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent via-gold-soft to-gold transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 space-y-3" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="glass animate-pulse rounded-2xl p-4"
              style={{ animationDelay: `${i * 220}ms` }}
            >
              <div className="h-3 w-1/3 rounded-full bg-primary/20" />
              <div className="mt-3 h-2.5 w-4/5 rounded-full bg-secondary" />
              <div className="mt-2 h-2.5 w-2/3 rounded-full bg-secondary" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}