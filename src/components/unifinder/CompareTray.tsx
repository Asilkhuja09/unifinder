import { useMemo, useState } from "react";
import { Scale, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { UNIVERSITIES, type University } from "@/data/extendedData";
import { clearCompare, toggleCompare, useCompare } from "@/lib/compare";
import { livingCost } from "@/lib/costs";

const BY_ID = new Map(UNIVERSITIES.map((u) => [u.id, u]));

type Row = { label: string; cell: (u: University) => string };

const ROWS: Row[] = [
  { label: "Location", cell: (u) => (u.city && u.city !== "Main campus" ? `${u.city}, ${u.country}` : u.country) },
  { label: "Founded", cell: (u) => String(u.founded) },
  { label: "World ranking", cell: (u) => (u.worldRanking ? `#${u.worldRanking}` : "—") },
  { label: "Acceptance rate", cell: (u) => `${u.acceptanceRate}%` },
  { label: "Tuition per year", cell: (u) => `$${u.tuitionUSD.toLocaleString()}` },
  { label: "Living per year (estimate)", cell: (u) => `$${livingCost(u).toLocaleString()}` },
  { label: "Aid for internationals", cell: (u) => (u.aidForInternationals ? "Yes" : "No") },
  { label: "Strengths", cell: (u) => u.strengths.slice(0, 4).join(", ") },
];

/** Floating bar plus side-by-side table for the universities picked in the details window. */
export function CompareTray() {
  const { tt } = useI18n();
  const ids = useCompare();
  const [open, setOpen] = useState(false);
  const unis = useMemo(
    () => ids.map((id) => BY_ID.get(id)).filter((u): u is University => u !== undefined),
    [ids],
  );
  if (unis.length === 0) return null;

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(92vw,34rem)] items-center gap-3 rounded-2xl border border-primary/40 bg-background/90 px-4 py-3 shadow-[0_10px_40px_-12px_var(--gold)] backdrop-blur-xl">
        <Scale className="size-4 shrink-0 text-primary" />
        <p className="min-w-0 flex-1 truncate text-sm">
          {unis.length} {tt("selected to compare")}
        </p>
        <button
          type="button"
          disabled={unis.length < 2}
          onClick={() => setOpen(true)}
          className="rounded-xl bg-gradient-to-r from-gold-soft to-gold px-4 py-1.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
        >
          {unis.length < 2 ? tt("Pick one more") : tt("Compare")}
        </button>
        <button type="button" aria-label={tt("Clear")} onClick={clearCompare} className="text-muted-foreground hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>

      {open && unis.length >= 2 && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-label={tt("Compare universities")}
            className="glass max-h-[88vh] w-full max-w-5xl overflow-auto rounded-t-3xl p-5 sm:rounded-3xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-3">
              <h3 className="font-display text-2xl text-gilded">{tt("Compare universities")}</h3>
              <button type="button" aria-label={tt("Close")} onClick={() => setOpen(false)} className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>
            <table className="w-full min-w-[34rem] border-separate border-spacing-0 text-sm">
              <thead>
                <tr>
                  <th className="w-36 p-3 text-start text-xs font-normal text-muted-foreground" />
                  {unis.map((u) => (
                    <th key={u.id} className="border-b border-border p-3 text-start align-top font-display text-base text-primary">
                      {u.name}
                      <button
                        type="button"
                        onClick={() => toggleCompare(u.id)}
                        className="mt-1 block text-xs font-sans font-normal text-muted-foreground underline hover:text-foreground"
                      >
                        {tt("Remove")}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row" className="border-b border-border/60 p-3 text-start text-xs font-normal text-muted-foreground">
                      {tt(r.label)}
                    </th>
                    {unis.map((u) => (
                      <td key={u.id} className="border-b border-border/60 p-3 align-top">
                        {r.cell(u)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-xs text-muted-foreground">
              {tt("Living costs are rough regional averages. Confirm every figure on the official website.")}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
