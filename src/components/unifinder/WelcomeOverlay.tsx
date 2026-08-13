import { useEffect, useState } from "react";
import { Crown } from "lucide-react";
import { ConstellationFX } from "./ConstellationFX";

export function WelcomeOverlay({ name, onDone }: { name: string; onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 2600);
      setProgress(p);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLeaving(true);
        window.setTimeout(onDone, 600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[90] grid place-items-center bg-background/95 backdrop-blur-2xl transition-opacity duration-500 ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      <ConstellationFX density={0.00018} />
      <div className="relative flex animate-scale-in flex-col items-center px-6 text-center">
        <span className="grid size-20 animate-[spin_9s_linear_infinite] place-items-center rounded-full border border-primary/40 bg-velvet/60">
          <Crown className="size-8 text-primary" />
        </span>
        <h2 className="mt-8 font-display text-4xl text-gilded sm:text-5xl">
          Welcome back{name ? `, ${name}` : ""}
        </h2>
        <p className="mt-3 text-sm uppercase tracking-[0.35em] text-accent">
          Unlocking elite portals…
        </p>
        <div className="mt-10 h-1.5 w-72 overflow-hidden rounded-full bg-velvet/70 sm:w-96">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-100"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
