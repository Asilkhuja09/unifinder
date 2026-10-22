import type { CSSProperties, ReactNode } from "react";
import { Check, Globe2 } from "lucide-react";
import { countryFlagUrl } from "@/lib/flags";
import { cn } from "@/lib/utils";

/** Sets the --i custom property used by the wiz-rise stagger animation. */
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}

export const inputCls =
  "w-full rounded-xl border border-border bg-velvet/60 px-4 py-3 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/70 focus:bg-velvet/80 focus:shadow-[0_0_28px_-12px_var(--gold)] focus:ring-2 focus:ring-ring";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-primary/90">{label}</span>
      {children}
    </label>
  );
}

export function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="rounded bg-gradient-to-br from-gold-soft to-gold px-0.5 font-semibold text-royal">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}

/** Round-cornered country flag; falls back to a globe when no flag is known. */
export function Flag({
  country,
  width = 80,
  className,
}: {
  country: string;
  width?: 40 | 80 | 160 | 320;
  className?: string;
}) {
  const src = countryFlagUrl(country, width);
  if (!src) {
    return (
      <span className={cn("grid place-items-center bg-secondary text-primary", className)}>
        <Globe2 className="size-1/2" />
      </span>
    );
  }
  return <img src={src} alt="" loading="lazy" decoding="async" className={cn("object-cover", className)} />;
}

/** Selectable card with a gold sheen and an animated check badge. */
export function OptionCard({
  selected,
  onClick,
  children,
  className,
  index = 0,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      style={stagger(index)}
      className={cn(
        "wiz-rise group relative overflow-hidden rounded-2xl border text-start outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.985]",
        selected
          ? "border-primary bg-primary/12 shadow-[0_0_34px_-12px_var(--gold)]"
          : "border-border bg-velvet/40 hover:-translate-y-0.5 hover:border-primary/50 hover:bg-velvet/60",
        className,
      )}
    >
      {selected && (
        <span
          aria-hidden
          className="wiz-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
        />
      )}
      {selected && (
        <span className="wiz-pop absolute right-3 top-3 z-10 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-3" strokeWidth={3.5} />
        </span>
      )}
      {children}
    </button>
  );
}
