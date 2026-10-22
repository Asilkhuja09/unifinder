import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { GlobeScan } from "@/components/unifinder/GlobeScan";

/** Global match-generation window: exactly 30 seconds. */
export const LOADER_DURATION_MS = 30000;

const STAGES = [
  { until: 33, label: "Scanning top global universities…" },
  { until: 66, label: "Analyzing financial aid & STEM criteria…" },
  { until: 100, label: "Finalizing your custom recommendations…" },
];

export function OrbitalLoader({ onDone }: { onDone: () => void }) {
  const { t, tt } = useI18n();
  const [progress, setProgress] = useState(0);
  const startRef = useRef(0);
  const stage = STAGES.find((s) => progress < s.until) ?? STAGES[STAGES.length - 1]!;

  useEffect(() => {
    const start = performance.now();
    startRef.current = start;
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
    <div
      className="fixed inset-0 z-50 flex flex-col items-center overflow-y-auto bg-background/95 py-6 backdrop-blur-xl"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 70% 55% at 50% 38%, color-mix(in oklab, #3a5aa8 22%, transparent), transparent 70%)",
      }}
    >
      <div className="my-auto flex w-full flex-col items-center">
        <GlobeScan startRef={startRef} totalMs={LOADER_DURATION_MS} />

        <div className="mt-6 w-[min(88vw,520px)] px-4">
          <p className="mb-3 text-center text-sm text-primary/90">{t("loading")}</p>
          <div className="h-1.5 w-full overflow-hidden rounded-full border border-border bg-secondary/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent via-gold-soft to-gold transition-[width] duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3 text-xs">
            <p key={stage.label} className="animate-fade-in text-muted-foreground">
              {tt(stage.label)}
            </p>
            <span className="tabular-nums text-primary">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
