import { Link, useRouterState } from "@tanstack/react-router";
import { Scale, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { clearCompare, useCompare } from "@/lib/compare";

/** Floating reminder of the universities picked for comparison; opens the Compare page. */
export function CompareTray() {
  const { tt } = useI18n();
  const ids = useCompare();
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (ids.length === 0 || path === "/compare") return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 mx-auto flex w-[min(92vw,34rem)] items-center gap-3 rounded-2xl border border-primary/40 bg-background/90 px-4 py-3 shadow-[0_10px_40px_-12px_var(--gold)] backdrop-blur-xl">
      <Scale className="size-4 shrink-0 text-primary" />
      <p className="min-w-0 flex-1 truncate text-sm">
        {ids.length} {tt("selected to compare")}
      </p>
      <Link
        to="/compare"
        className="rounded-xl bg-gradient-to-r from-gold-soft to-gold px-4 py-1.5 text-sm font-semibold text-primary-foreground"
      >
        {ids.length < 2 ? tt("Add more") : tt("Compare")}
      </Link>
      <button type="button" aria-label={tt("Clear")} onClick={clearCompare} className="text-muted-foreground hover:text-foreground">
        <X className="size-4" />
      </button>
    </div>
  );
}
