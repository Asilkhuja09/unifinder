import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Check } from "lucide-react";
import { landDots } from "@/data/worldLand";
import { countryFlagUrl } from "@/lib/flags";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type ScanTarget = {
  short: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
};

/** Order matters: the globe rolls through these one by one. */
const TARGETS: readonly ScanTarget[] = [
  { short: "Toronto", name: "University of Toronto", country: "Canada", lat: 43.66, lon: -79.4 },
  { short: "Harvard", name: "Harvard University", country: "United States", lat: 42.37, lon: -71.12 },
  { short: "Stanford", name: "Stanford University", country: "United States", lat: 37.43, lon: -122.17 },
  { short: "São Paulo", name: "University of São Paulo", country: "Brazil", lat: -23.56, lon: -46.73 },
  { short: "Oxford", name: "University of Oxford", country: "United Kingdom", lat: 51.75, lon: -1.25 },
  { short: "ETH Zürich", name: "ETH Zürich", country: "Switzerland", lat: 47.38, lon: 8.55 },
  { short: "Cape Town", name: "University of Cape Town", country: "South Africa", lat: -33.96, lon: 18.46 },
  { short: "Tsinghua", name: "Tsinghua University", country: "China", lat: 40.0, lon: 116.33 },
  { short: "Seoul National", name: "Seoul National University", country: "South Korea", lat: 37.46, lon: 126.95 },
  { short: "UTokyo", name: "University of Tokyo", country: "Japan", lat: 35.71, lon: 139.76 },
  { short: "NUS", name: "National University of Singapore", country: "Singapore", lat: 1.3, lon: 103.77 },
  { short: "Melbourne", name: "University of Melbourne", country: "Australia", lat: -37.8, lon: 144.96 },
];

const N = TARGETS.length;
const INTRO_MS = 1000;
const OUTRO_MS = 2000;
const CHECKS = ["Admission data", "Tuition & aid", "Program fit"] as const;

type Slot = { index: number; phase: number; finished: boolean };

function slotAt(t: number, total: number): Slot {
  const slot = (total - INTRO_MS - OUTRO_MS) / N;
  const finished = t >= total - OUTRO_MS;
  const raw = Math.floor((t - INTRO_MS) / slot);
  const index = Math.min(N - 1, Math.max(0, raw));
  const phase = finished ? 1 : Math.min(1, Math.max(0, (t - INTRO_MS - index * slot) / slot));
  return { index, phase, finished };
}

type Layout = {
  w: number;
  h: number;
  cx: number;
  cy: number;
  R: number;
  narrow: boolean;
  chips: { x: number; y: number }[];
};

function layoutFor(w: number, h: number): Layout {
  const narrow = w < 560;
  const R = Math.min(w * (narrow ? 0.27 : 0.19), h * 0.3);
  const rx = w * (narrow ? 0.41 : 0.34);
  const ry = h * 0.42;
  const cx = w / 2;
  const cy = h / 2;
  const chips = TARGETS.map((_, i) => {
    const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / N;
    return { x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
  });
  return { w, h, cx, cy, R, narrow, chips };
}

function rad(d: number) {
  return (d * Math.PI) / 180;
}

function wrapPi(a: number) {
  let x = a;
  while (x > Math.PI) x -= 2 * Math.PI;
  while (x < -Math.PI) x += 2 * Math.PI;
  return x;
}

/** Deterministic star field so SSR/client agree and nothing flickers on re-render. */
function makeStars(count: number) {
  let s = 1234567;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: rnd(),
    y: rnd(),
    r: 0.4 + rnd() * 1.0,
    p: rnd() * Math.PI * 2,
  }));
}

export function GlobeScan({
  startRef,
  totalMs,
}: {
  startRef: MutableRefObject<number>;
  totalMs: number;
}) {
  const { tt } = useI18n();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const layoutRef = useRef<Layout>(layoutFor(640, 460));
  const [layout, setLayout] = useState<Layout>(() => layoutFor(640, 460));
  const [slot, setSlot] = useState<Slot>({ index: 0, phase: 0, finished: false });
  const [checks, setChecks] = useState(0);

  // Track container size.
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const apply = () => {
      const r = el.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) return;
      const next = layoutFor(r.width, r.height);
      layoutRef.current = next;
      setLayout(next);
    };
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Render loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dots = landDots();
    const nd = dots.length;
    const sinLat = new Float32Array(nd);
    const cosLat = new Float32Array(nd);
    const lonR = new Float32Array(nd);
    const vx = new Float32Array(nd);
    const vy = new Float32Array(nd);
    const vz = new Float32Array(nd);
    dots.forEach((d, i) => {
      const la = rad(d.lat);
      const lo = rad(d.lon);
      sinLat[i] = Math.sin(la);
      cosLat[i] = Math.cos(la);
      lonR[i] = lo;
      vx[i] = Math.cos(la) * Math.cos(lo);
      vy[i] = Math.cos(la) * Math.sin(lo);
      vz[i] = Math.sin(la);
    });
    const pins = TARGETS.map((tg) => {
      const la = rad(tg.lat);
      const lo = rad(tg.lon);
      return {
        la,
        lo,
        sl: Math.sin(la),
        cl: Math.cos(la),
        x: Math.cos(la) * Math.cos(lo),
        y: Math.cos(la) * Math.sin(lo),
        z: Math.sin(la),
      };
    });
    const stars = makeStars(70);

    let lam = rad(TARGETS[0]?.lon ?? 0) - 1.2;
    let phi = 0;
    let last = performance.now();
    let frame = 0;
    let lastIndex = -1;
    let lastChecks = -1;
    let lastFinished = false;
    let dpr = 1;
    let sizeKey = "";

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const L = layoutRef.current;
      const key = `${L.w}x${L.h}`;
      if (key !== sizeKey) {
        sizeKey = key;
        dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = Math.round(L.w * dpr);
        canvas.height = Math.round(L.h * dpr);
        canvas.style.width = `${L.w}px`;
        canvas.style.height = `${L.h}px`;
      }
      const t = startRef.current > 0 ? now - startRef.current : 0;
      const s = slotAt(t, totalMs);
      const tg = TARGETS[s.index] ?? TARGETS[0];
      const chip = L.chips[s.index];
      if (!tg || !chip) {
        frame = requestAnimationFrame(draw);
        return;
      }

      const checkCount = s.finished ? 3 : (s.phase > 0.45 ? 1 : 0) + (s.phase > 0.62 ? 1 : 0) + (s.phase > 0.78 ? 1 : 0);
      if (s.index !== lastIndex || checkCount !== lastChecks || s.finished !== lastFinished) {
        lastIndex = s.index;
        lastChecks = checkCount;
        lastFinished = s.finished;
        setSlot({ index: s.index, phase: s.phase, finished: s.finished });
        setChecks(checkCount);
      }

      // Orientation: ease toward the active campus, nudged so the pin sits toward its chip.
      const side = Math.max(-1, Math.min(1, (chip.x - L.cx) / (L.w * 0.34)));
      if (s.finished) {
        lam += reduce ? 0 : dt * 0.35;
      } else {
        const targetLam = rad(tg.lon) - side * 0.55;
        const targetPhi = Math.max(-0.5, Math.min(0.75, rad(tg.lat) * 0.6));
        const k = reduce ? 1 : 1 - Math.exp(-dt * 2.4);
        lam += wrapPi(targetLam - lam) * k;
        phi += (targetPhi - phi) * k;
      }
      const sp = Math.sin(phi);
      const cp = Math.cos(phi);

      const { cx, cy, R } = L;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, L.w, L.h);

      // Stars
      for (const st of stars) {
        const tw = reduce ? 0.7 : 0.55 + 0.45 * Math.sin(t / 900 + st.p);
        ctx.fillStyle = `rgba(255,244,220,${(0.5 * tw).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(st.x * L.w, st.y * L.h, st.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Atmosphere
      const atm = ctx.createRadialGradient(cx, cy, R * 0.92, cx, cy, R * 1.45);
      atm.addColorStop(0, "rgba(120,170,255,0.30)");
      atm.addColorStop(0.45, "rgba(120,170,255,0.09)");
      atm.addColorStop(1, "rgba(120,170,255,0)");
      ctx.fillStyle = atm;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // Ocean sphere
      const sea = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      sea.addColorStop(0, "#1b2a52");
      sea.addColorStop(1, "#070b18");
      ctx.fillStyle = sea;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // Graticule
      ctx.strokeStyle = "rgba(160,190,255,0.10)";
      ctx.lineWidth = 0.7;
      const proj = (la: number, lo: number) => {
        const dl = lo - lam;
        const cosc = sp * Math.sin(la) + cp * Math.cos(la) * Math.cos(dl);
        const x = Math.cos(la) * Math.sin(dl);
        const y = cp * Math.sin(la) - sp * Math.cos(la) * Math.cos(dl);
        return { x: cx + R * x, y: cy - R * y, z: cosc };
      };
      for (let m = -180; m < 180; m += 30) {
        ctx.beginPath();
        let pen = false;
        for (let la = -90; la <= 90; la += 6) {
          const p = proj(rad(la), rad(m));
          if (p.z > 0) {
            if (pen) ctx.lineTo(p.x, p.y);
            else ctx.moveTo(p.x, p.y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
      }
      for (let la = -60; la <= 60; la += 30) {
        ctx.beginPath();
        let pen = false;
        for (let m = -180; m <= 180; m += 6) {
          const p = proj(rad(la), rad(m));
          if (p.z > 0) {
            if (pen) ctx.lineTo(p.x, p.y);
            else ctx.moveTo(p.x, p.y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
      }

      // Land dots (batched by depth), plus ripple + verified highlights.
      const buckets = [new Path2D(), new Path2D(), new Path2D(), new Path2D(), new Path2D()];
      const hot = new Path2D();
      const green = new Path2D();
      const r0 = Math.max(0.8, R * 0.0092);
      const active = pins[s.index];
      const scanning = !s.finished && s.phase > 0.18 && s.phase < 0.9;
      const wave = scanning ? ((s.phase - 0.18) / 0.72) * 0.85 : -1;
      const doneCount = s.finished ? N : s.index;
      let hotCount = 0;
      for (let i = 0; i < nd; i++) {
        const dl = (lonR[i] ?? 0) - lam;
        const cl = cosLat[i] ?? 0;
        const sl = sinLat[i] ?? 0;
        const cosc = sp * sl + cp * cl * Math.cos(dl);
        if (cosc <= 0.02) continue;
        const x = cx + R * cl * Math.sin(dl);
        const y = cy - R * (cp * sl - sp * cl * Math.cos(dl));
        const b = Math.min(4, Math.floor(cosc * 5));
        const bucket = buckets[b];
        if (bucket) {
          bucket.moveTo(x + r0, y);
          bucket.arc(x, y, r0, 0, Math.PI * 2);
        }
        const dx = vx[i] ?? 0;
        const dy = vy[i] ?? 0;
        const dz = vz[i] ?? 0;
        if (active && wave >= 0) {
          const d = Math.acos(Math.min(1, Math.max(-1, dx * active.x + dy * active.y + dz * active.z)));
          const h = Math.exp(-(((d - wave) / 0.07) ** 2)) + 0.6 * Math.exp(-(((d - (wave - 0.28)) / 0.06) ** 2));
          if (h > 0.18) {
            const rr = r0 * (1 + 1.4 * h);
            hot.moveTo(x + rr, y);
            hot.arc(x, y, rr, 0, Math.PI * 2);
            hotCount++;
          }
        }
        for (let k2 = 0; k2 < doneCount; k2++) {
          const pn = pins[k2];
          if (pn && dx * pn.x + dy * pn.y + dz * pn.z > 0.985) {
            const rr = r0 * 1.5;
            green.moveTo(x + rr, y);
            green.arc(x, y, rr, 0, Math.PI * 2);
            break;
          }
        }
      }
      const alphas = [0.16, 0.3, 0.5, 0.72, 0.92];
      buckets.forEach((p, i) => {
        ctx.fillStyle = `rgba(238,205,140,${alphas[i] ?? 0.5})`;
        ctx.fill(p);
      });
      ctx.fillStyle = "rgba(110,231,161,0.85)";
      ctx.fill(green);
      if (hotCount > 0) {
        ctx.fillStyle = "rgba(255,246,205,0.95)";
        ctx.shadowColor = "rgba(255,220,130,0.9)";
        ctx.shadowBlur = 8;
        ctx.fill(hot);
        ctx.shadowBlur = 0;
      }

      // Scan band
      if (!reduce && !s.finished) {
        const yb = cy - R + (((t / 1100) % 1) * 2.4 - 0.2) * R;
        const g = ctx.createLinearGradient(0, yb - R * 0.22, 0, yb + R * 0.02);
        g.addColorStop(0, "rgba(255,225,150,0)");
        g.addColorStop(1, "rgba(255,225,150,0.16)");
        ctx.fillStyle = g;
        ctx.fillRect(cx - R, yb - R * 0.22, R * 2, R * 0.24);
        ctx.fillStyle = "rgba(255,236,180,0.55)";
        ctx.fillRect(cx - R, yb, R * 2, 1);
      }

      // Night-side shading for depth
      const shade = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R);
      shade.addColorStop(0, "rgba(0,0,12,0)");
      shade.addColorStop(0.55, "rgba(0,0,12,0.08)");
      shade.addColorStop(1, "rgba(0,0,12,0.6)");
      ctx.fillStyle = shade;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.restore();

      ctx.strokeStyle = "rgba(170,200,255,0.28)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.stroke();

      // Pins
      let activePoint: { x: number; y: number } | null = null;
      pins.forEach((pn, i) => {
        const p = proj(pn.la, pn.lo);
        const isActive = i === s.index && !s.finished;
        if (isActive) {
          if (p.z > 0.02) activePoint = { x: p.x, y: p.y };
          else {
            const ddx = p.x - cx;
            const ddy = p.y - cy;
            const len = Math.hypot(ddx, ddy) || 1;
            activePoint = { x: cx + (ddx / len) * R, y: cy + (ddy / len) * R };
          }
        }
        if (p.z <= 0.02) return;
        const isDone = s.finished || i < s.index;
        if (isActive) {
          ctx.fillStyle = "rgba(255,226,140,1)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3.4, 0, Math.PI * 2);
          ctx.fill();
          if (!reduce) {
            for (let k3 = 0; k3 < 2; k3++) {
              const u = ((t / 1200 + k3 * 0.5) % 1);
              ctx.strokeStyle = `rgba(255,226,140,${(1 - u) * 0.7})`;
              ctx.lineWidth = 1.4;
              ctx.beginPath();
              ctx.arc(p.x, p.y, 3.4 + u * R * 0.16, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        } else if (isDone) {
          ctx.fillStyle = "rgba(110,231,161,1)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(255,255,255,0.55)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Beam to the chip being verified
      const ap = activePoint as { x: number; y: number } | null;
      if (ap && !s.finished && s.phase > 0.14 && s.phase < 0.93) {
        const fade = Math.min(1, (s.phase - 0.14) / 0.1, (0.93 - s.phase) / 0.08);
        const mx = (ap.x + chip.x) / 2;
        const my = (ap.y + chip.y) / 2;
        const qx = mx + (mx - cx) * 0.18;
        const qy = my + (my - cy) * 0.18;
        const grad = ctx.createLinearGradient(ap.x, ap.y, chip.x, chip.y);
        grad.addColorStop(0, `rgba(255,226,140,${0.95 * fade})`);
        grad.addColorStop(1, `rgba(255,226,140,${0.3 * fade})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "rgba(255,210,110,0.8)";
        ctx.shadowBlur = 10;
        ctx.setLineDash(reduce ? [] : [7, 7]);
        ctx.lineDashOffset = reduce ? 0 : -t / 28;
        ctx.beginPath();
        ctx.moveTo(ap.x, ap.y);
        ctx.quadraticCurveTo(qx, qy, chip.x, chip.y);
        ctx.stroke();
        ctx.setLineDash([]);
        if (!reduce) {
          const u = (t / 650) % 1;
          const bx = (1 - u) * (1 - u) * ap.x + 2 * (1 - u) * u * qx + u * u * chip.x;
          const by = (1 - u) * (1 - u) * ap.y + 2 * (1 - u) * u * qy + u * u * chip.y;
          ctx.fillStyle = `rgba(255,246,205,${fade})`;
          ctx.beginPath();
          ctx.arc(bx, by, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [startRef, totalMs]);

  const active = TARGETS[slot.index] ?? TARGETS[0];
  const flags = useMemo(() => TARGETS.map((tg) => countryFlagUrl(tg.country, 80)), []);

  return (
    <div className="w-full">
      <div
        ref={boxRef}
        role="img"
        aria-label={tt("Rotating globe checking universities around the world")}
        className="relative mx-auto h-[min(92vw,340px)] w-full max-w-4xl sm:h-[460px]"
      >
        <canvas ref={canvasRef} className="absolute left-0 top-0" aria-hidden />
        <ol className="m-0 list-none p-0">
          {TARGETS.map((tg, i) => {
            const pos = layout.chips[i];
            if (!pos) return null;
            const done = slot.finished || i < slot.index;
            const current = !slot.finished && i === slot.index;
            const right = pos.x > layout.cx;
            return (
              <li
                key={tg.short}
                className="absolute -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                style={{ left: pos.x, top: pos.y, animationDelay: `${i * 70}ms` }}
              >
                <div
                  className={cn(
                    "relative size-9 rounded-full transition-all duration-500 sm:size-11",
                    current && "scale-125",
                    !done && !current && "opacity-40 saturate-50",
                  )}
                >
                  {current && (
                    <span className="absolute -inset-1 rounded-full bg-primary/30 motion-safe:animate-ping" />
                  )}
                  <span
                    className={cn(
                      "relative block size-full overflow-hidden rounded-full border-2 bg-secondary transition-colors duration-500",
                      current ? "border-primary" : done ? "border-emerald-400/80" : "border-border",
                    )}
                  >
                    {flags[i] ? (
                      <img
                        src={flags[i] ?? undefined}
                        alt=""
                        loading="eager"
                        className="size-full object-cover"
                      />
                    ) : null}
                  </span>
                  {done && (
                    <span className="absolute -bottom-1 -right-1 grid size-4 place-items-center rounded-full bg-emerald-400 text-black animate-fade-in">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                  )}
                  {!layout.narrow && (
                    <span
                      className={cn(
                        "pointer-events-none absolute top-1/2 w-32 -translate-y-1/2 truncate text-[11px] leading-tight transition-colors duration-500",
                        right ? "left-full ml-3 text-left" : "right-full mr-3 text-right",
                        current ? "text-primary" : done ? "text-foreground/80" : "text-muted-foreground/60",
                      )}
                    >
                      {tg.short}
                    </span>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {active && (
        <div className="mx-auto mt-2 flex w-full max-w-md flex-col items-center gap-2 px-4" aria-live="polite">
          <p key={active.name + String(slot.finished)} className="animate-fade-in text-center text-sm text-foreground">
            {slot.finished ? tt("All universities checked") : active.name}
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
            {CHECKS.map((c, i) => {
              const on = slot.finished || checks > i;
              return (
                <li key={c} className={cn("flex items-center gap-1.5 transition-colors duration-300", on && "text-emerald-300")}>
                  <span
                    className={cn(
                      "grid size-3.5 place-items-center rounded-full border transition-colors duration-300",
                      on ? "border-emerald-400 bg-emerald-400 text-black" : "border-border",
                    )}
                  >
                    {on && <Check className="size-2.5" strokeWidth={3.5} />}
                  </span>
                  {tt(c)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
