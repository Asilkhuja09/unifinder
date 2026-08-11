import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";

const CYCLE_MS = 9000;
const SWEEP_MS = 1400;

/** 9-second live refresh indicator: sweeps briefly each cycle to signal a feed update. */
export function LiveRefreshOverlay() {
  const [active, setActive] = useState(false);
  const [pass, setPass] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive(true);
      setPass((p) => p + 1);
      window.setTimeout(() => setActive(false), SWEEP_MS);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      aria-live="polite"
      className={`pointer-events-none fixed bottom-5 end-5 z-50 transition-all duration-500 ${
        active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="glass flex items-center gap-3 rounded-full px-4 py-2.5 shadow-[0_16px_50px_-20px_var(--gold)]">
        <RefreshCw className={`size-4 text-primary ${active ? "animate-spin" : ""}`} />
        <span className="text-xs text-muted-foreground">
          Refreshing live directory feed · pass {pass}
        </span>
        <span className="relative h-1 w-20 overflow-hidden rounded-full bg-velvet/70">
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-[1300ms] ease-out"
            style={{ width: active ? "100%" : "0%" }}
          />
        </span>
      </div>
    </div>
  );
}