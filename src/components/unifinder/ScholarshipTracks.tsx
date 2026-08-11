import { useMemo, useState } from "react";
import { ExternalLink, GraduationCap, Search } from "lucide-react";
import { REGIONS, SCHOLARSHIPS, type Region } from "@/data/extendedData";

export function ScholarshipTracks() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region | "all">("all");
  const [needOnly, setNeedOnly] = useState(false);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SCHOLARSHIPS.filter((s) => {
      if (region !== "all" && s.region !== region) return false;
      if (needOnly && !s.needBased) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.sponsor.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    });
  }, [query, region, needOnly]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <h1 className="font-display text-4xl text-gilded sm:text-5xl">Sovereign Scholarship Tracks</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        Government and university funding programmes — DAAD, MEXT, CSC, GKS, Fulbright,
        Knight-Hennessy and more — with coverage, deadlines and official portals.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <label className="glass flex flex-1 items-center gap-2 rounded-xl px-4 py-2.5 sm:max-w-sm">
          <Search className="size-4 text-primary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search scholarships, sponsors…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {(["all", ...REGIONS] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r as Region | "all")}
              className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                region === r
                  ? "bg-gradient-to-r from-gold-soft to-gold text-primary-foreground"
                  : "glass text-muted-foreground hover:text-primary"
              }`}
            >
              {r === "all" ? "All regions" : r}
            </button>
          ))}
          <button
            onClick={() => setNeedOnly((v) => !v)}
            className={`rounded-full px-3.5 py-1.5 text-xs transition-colors ${
              needOnly
                ? "bg-gradient-to-r from-gold-soft to-gold text-primary-foreground"
                : "glass text-muted-foreground hover:text-primary"
            }`}
          >
            Need-based only
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {rows.map((s) => (
          <article key={s.id} className="glass rounded-2xl p-6">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-accent">
              <GraduationCap className="size-4" /> {s.sponsor}
            </p>
            <h2 className="mt-2 font-display text-2xl text-primary">{s.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            <p className="mt-3 text-sm">
              <span className="text-primary/80">Coverage: </span>
              {s.coverage}
            </p>
            <p className="mt-1 text-sm">
              <span className="text-primary/80">Deadline: </span>
              {s.deadline}
            </p>
            <a
              href={s.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-primary underline-offset-4 hover:underline"
            >
              Official portal <ExternalLink className="size-3.5" />
            </a>
          </article>
        ))}
        {rows.length === 0 && (
          <p className="text-muted-foreground">No scholarship tracks match this filter.</p>
        )}
      </div>
    </section>
  );
}