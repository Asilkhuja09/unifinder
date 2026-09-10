import { ExternalLink, Heart, Landmark, MapPin, MoveRight, Sparkles } from "lucide-react";
import campusFallback from "@/assets/campus-fallback.jpg";
import { CAMPUS_MEDIA, FALLBACK_MEDIA } from "@/data/campusMedia";
import type { University } from "@/data/extendedData";
import type { MatchCategory } from "@/lib/matching";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CATEGORY_STYLE: Record<MatchCategory, { label: string; className: string }> = {
  reach: { label: "Reach", className: "border-status-reach/60 text-status-reach" },
  target: { label: "Target", className: "border-primary/70 text-primary" },
  safety: { label: "Safety", className: "border-status-success/60 text-status-success" },
};

function cardTag(university: University, category?: MatchCategory) {
  if (category) return CATEGORY_STYLE[category];
  if ((university.worldRanking ?? 999) <= 25) {
    return { label: "Top 25", className: "border-primary/70 text-primary" };
  }
  return { label: university.region, className: "border-accent/50 text-accent" };
}

function deadlineFor(university: University) {
  if (university.region === "USA" || university.region === "Canada") return "Jan 2027";
  if (university.region === "UK") return "Oct 2026";
  return "See portal";
}

export function UniversityCard({
  university,
  category,
  matchScore,
  reasons = [],
  onView,
  favorite,
  onFavorite,
}: {
  university: University;
  category?: MatchCategory;
  matchScore?: number;
  reasons?: string[];
  onView: () => void;
  favorite?: boolean;
  onFavorite?: () => void;
}) {
  const media = CAMPUS_MEDIA[university.id] ?? FALLBACK_MEDIA;
  const image = media.photos[0];
  const tag = cardTag(university, category);
  const highlights = media.alumni.length > 0 ? media.alumni.slice(0, 3) : university.strengths.slice(0, 3);

  return (
    <article className="university-card flex h-full flex-col rounded-3xl border border-primary/25 p-4 sm:p-6">
      <header className="flex items-start gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-primary/30 bg-feed">
          <img
            src={image?.url ?? campusFallback}
            alt={image ? `${university.name} campus` : `${university.name} university campus`}
            loading="lazy"
            width={1280}
            height={720}
            className="size-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-feed/80 py-0.5 text-center text-[9px] font-semibold uppercase text-foreground backdrop-blur-sm">
            {university.country.slice(0, 2)}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-display text-xl leading-tight text-foreground sm:text-2xl">
                {university.name}
              </h3>
              <p className="mt-1 flex items-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-3.5 shrink-0" />
                <span>{university.city}, {university.country}</span>
              </p>
            </div>
            <span className={cn("shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase", tag.className)}>
              {tag.label}
            </span>
          </div>
        </div>

        {onFavorite && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onFavorite}
            aria-label={favorite ? "Remove from favorites" : "Save to favorites"}
            aria-pressed={favorite}
            className="shrink-0 rounded-full border-border/80 bg-feed/70"
          >
            <Heart className={cn("size-4", favorite && "fill-primary text-primary")} />
          </Button>
        )}
      </header>

      <dl className="mt-5 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-status-success/35 bg-feed/70 p-3">
          <dt className="text-[9px] font-semibold uppercase text-status-success sm:text-[10px]">Qabul %</dt>
          <dd className="mt-1 text-sm font-semibold text-status-success sm:text-base">{university.acceptanceRate}%</dd>
        </div>
        <div className="rounded-xl border border-primary/45 bg-feed/70 p-3">
          <dt className="text-[9px] font-semibold uppercase text-primary sm:text-[10px]">Muddati</dt>
          <dd className="mt-1 text-sm font-semibold text-primary sm:text-base">{deadlineFor(university)}</dd>
        </div>
        <div className="rounded-xl border border-muted-foreground/45 bg-feed/70 p-3">
          <dt className="text-[9px] font-semibold uppercase text-muted-foreground sm:text-[10px]">Maksimal yordam</dt>
          <dd className="mt-1 text-xs font-semibold text-foreground sm:text-sm">
            {university.aidForInternationals ? "Up to full need" : `$${university.tuitionUSD.toLocaleString()}/yr`}
          </dd>
        </div>
      </dl>

      {typeof matchScore === "number" && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Match fit</span>
            <span className="font-semibold text-primary">{matchScore}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-gradient-to-r from-accent via-gold-soft to-gold" style={{ width: `${matchScore}%` }} />
          </div>
        </div>
      )}

      <div className="mt-5 flex-1 rounded-2xl border border-border/70 bg-feed/65 p-4 sm:p-5">
        <p className="flex items-start gap-2 text-[10px] font-semibold uppercase text-primary">
          <Sparkles className="mt-0.5 size-3.5 shrink-0" />
          {media.alumni.length > 0 ? "Mashhur bitiruvchilar" : "Asosiy yutuqlar"}
        </p>
        {university.worldRanking && (
          <p className="mt-3 font-display text-2xl text-foreground">World #{university.worldRanking}</p>
        )}
        <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-muted-foreground">
          {highlights.map((item) => <li key={item}>• {item}</li>)}
          {reasons.slice(0, 2).map((reason) => <li key={reason}>• {reason}</li>)}
        </ul>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_auto] gap-2">
        <Button type="button" onClick={onView} className="h-11 rounded-xl bg-gradient-to-r from-gold-soft to-gold text-primary-foreground hover:opacity-90">
          Batafsil <MoveRight />
        </Button>
        <Button asChild variant="outline" size="icon" className="size-11 rounded-xl border-primary/70 bg-feed/70 text-primary">
          <a href={university.website} target="_blank" rel="noopener noreferrer" aria-label={`${university.name} official website`}>
            <ExternalLink />
          </a>
        </Button>
        <Button asChild variant="outline" size="icon" className="size-11 rounded-xl border-accent/60 bg-feed/70 text-accent">
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(university.mapsQuery)}`} target="_blank" rel="noopener noreferrer" aria-label={`View ${university.name} on map`}>
            <Landmark />
          </a>
        </Button>
      </div>
    </article>
  );
}