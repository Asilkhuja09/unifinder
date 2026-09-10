import { useEffect, useMemo, useState } from "react";
import { Activity, CircleCheck, TrendingUp } from "lucide-react";

const UPDATES = [
  "GKS · Seoul National University added 60 seats",
  "Stipendium Hungaricum · 5,200 seats confirmed",
  "ETH Zürich · Robotics fellowship added",
  "MEXT · International scholarship profile refreshed",
  "Harvard · International aid policy checked",
];

function formatTime(offsetMinutes: number) {
  const now = new Date(Date.now() - offsetMinutes * 60_000);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

export function LiveIntelligenceFeed({ compact = false }: { compact?: boolean }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 4_000);
    return () => window.clearInterval(timer);
  }, []);

  const rows = useMemo(
    () =>
      UPDATES.map((text, index) => ({
        text,
        time: formatTime(index * 3 + 1),
      })),
    [tick],
  );

  return (
    <section className="intelligence-panel overflow-hidden rounded-3xl border border-primary/25 p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="relative mt-11 flex size-3 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-status-success opacity-60" />
          <span className="relative inline-flex size-3 rounded-full bg-status-success" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-status-success">
            JONLI RAZVEDKA OQIMI
          </p>
          <h2 className="mt-2 font-display text-2xl leading-tight text-foreground sm:text-3xl">
            Baza yangilangan <span className="text-primary">1 daqiqa oldin</span>
          </h2>
          <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
            <Activity className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
            Ma&apos;lumotlar har 30 daqiqa ichida xavfsiz API orqali sinxronlanadi
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <div className="flex min-h-12 items-center gap-2 rounded-xl border border-status-success/35 bg-status-success/10 px-4 py-2.5 text-sm font-semibold text-status-success">
          <CircleCheck className="size-4 shrink-0" /> Barcha tizimlar ishlamoqda
        </div>
        <div className="flex min-h-12 items-center gap-2 rounded-xl border border-primary/70 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary">
          <TrendingUp className="size-4 shrink-0" /> +182 yangi yozuv bugun
        </div>
      </div>

      <div className={`feed-window mt-6 overflow-hidden rounded-2xl border border-border/80 bg-feed/75 ${compact ? "h-44" : "h-60"}`}>
        <div key={tick} className="feed-scroll divide-y divide-border/40">
          {[...rows, ...rows].map((row, index) => (
            <div
              key={`${row.text}-${index}`}
              className="grid min-h-16 grid-cols-[8px_4.8rem_1fr] items-center gap-3 px-4 py-3 text-xs sm:text-sm"
            >
              <span className="size-1.5 rounded-full bg-status-success" />
              <time className="font-mono text-muted-foreground">{row.time}</time>
              <p className="min-w-0 font-medium leading-snug text-foreground">
                <span className="me-2 text-primary">›</span>
                {row.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}