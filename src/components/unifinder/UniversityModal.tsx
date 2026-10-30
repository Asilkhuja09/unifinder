import { useState } from "react";
import { Compass, ExternalLink, Heart, Navigation, Scale, Share2, X } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { CAMPUS_MEDIA, FALLBACK_MEDIA } from "@/data/campusMedia";
import type { University } from "@/data/extendedData";
import { useUniversityPhotos } from "@/lib/universityPhotos";
import { browserMapsKey, directionsUrl, embedUrl, placeUrl } from "@/lib/maps";
import { useFavorites } from "@/lib/favorites";
import { COMPARE_MAX, toggleCompare, useCompare } from "@/lib/compare";
import type { UniversityMatch } from "@/lib/matching";
import { ApplicationChecklist, CostCalculator, FitPanel } from "@/components/unifinder/UniversityExtras";
import { cn } from "@/lib/utils";

/** Language codes Google Maps understands, where they differ from ours. */
const MAP_LANGUAGE: Record<string, string> = { zh: "zh-CN" };

export function UniversityModal({
  university,
  onClose,
  match,
}: {
  university: University;
  onClose: () => void;
  /** Present when opened from personalised results; adds the fit breakdown. */
  match?: UniversityMatch | undefined;
}) {
  const { t, tt, lang } = useI18n();
  const { ids, toggle } = useFavorites();
  const compared = useCompare();
  const saved = ids.has(university.id);
  const inCompare = compared.includes(university.id);

  const share = async () => {
    const text = `${university.name} — ${location}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: university.name, text, url: university.website });
      } else {
        await navigator.clipboard.writeText(`${text}\n${university.website}`);
        toast.success(tt("Link copied"));
      }
    } catch {
      /* share sheet dismissed */
    }
  };

  const onCompare = () => {
    const r = toggleCompare(university.id);
    if (r === "full") toast.error(`${tt("You can compare up to")} ${COMPARE_MAX}`);
    else toast.success(r === "added" ? tt("Added to compare") : tt("Removed from compare"));
  };
  const media = CAMPUS_MEDIA[university.id] ?? FALLBACK_MEDIA;

  // Curated photos win; every other university gets photos looked up from Wikipedia.
  const hasCurated = media.photos.length > 0;
  const { status, data } = useUniversityPhotos(university.id, university.name, !hasCurated);
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const [satellite, setSatellite] = useState(false);
  const fetched = data?.photos ?? [];
  const source: { url: string; caption: string }[] = hasCurated ? media.photos : fetched;
  const gallery = source.filter((p) => !failed.has(p.url));
  const loadingPhotos = !hasCurated && status !== "done";
  const fromWikipedia = !hasCurated && fetched.length > 0;

  const target = { query: university.mapsQuery };
  const mapKey = browserMapsKey();
  const mapSrc = embedUrl(target, { key: mapKey, language: MAP_LANGUAGE[lang] ?? lang, satellite });
  const location =
    !university.city || university.city === "Main campus"
      ? university.country
      : `${university.city}, ${university.country}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="glass max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              {tt("Founded")} {university.founded}
            </p>
            <h3 className="mt-1 font-display text-3xl text-gilded">{university.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {location}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={tt("Close")}
            className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => void toggle(university.id, university.name)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              saved ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50",
            )}
          >
            <Heart className={cn("size-4", saved && "fill-current")} />
            {saved ? tt("Saved") : tt("Save")}
          </button>
          <button
            type="button"
            aria-pressed={inCompare}
            onClick={onCompare}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              inCompare ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50",
            )}
          >
            <Scale className="size-4" />
            {inCompare ? tt("In compare") : tt("Compare")}
          </button>
          <button
            type="button"
            onClick={() => void share()}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm outline-none transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Share2 className="size-4" />
            {tt("Share")}
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {university.strengths.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-primary/25 bg-velvet/50 px-3 py-6 text-center text-sm text-primary"
            >
              {tt(s)}
            </div>
          ))}
        </div>

        {loadingPhotos && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2" aria-hidden>
            <div className="h-48 animate-pulse rounded-2xl border border-border bg-velvet/40" />
            <div className="hidden h-48 animate-pulse rounded-2xl border border-border bg-velvet/40 sm:block" />
          </div>
        )}
        {gallery.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {gallery.map((p) => (
              <figure key={p.url} className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={p.url}
                  alt={`${university.name} — ${p.caption}`}
                  loading="lazy"
                  decoding="async"
                  onError={() => setFailed((prev) => new Set(prev).add(p.url))}
                  className="h-48 w-full object-cover"
                />
                <figcaption className="bg-velvet/60 px-3 py-2 text-xs text-muted-foreground">
                  {tt(p.caption)}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {fromWikipedia && gallery.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {tt("Photos from Wikipedia and Wikimedia Commons")}
            {data?.article && (
              <>
                {" · "}
                <a
                  href={data.article}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  {tt("Source article")}
                </a>
              </>
            )}
          </p>
        )}
        {mapKey && (
          <section className="mt-6" aria-label={t("mapTitle")}>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="font-display text-xl text-primary">{t("mapTitle")}</h4>
              <div role="group" aria-label={t("mapTitle")} className="inline-flex overflow-hidden rounded-full border border-border text-xs">
                {([false, true] as const).map((isSatellite) => (
                  <button
                    key={String(isSatellite)}
                    type="button"
                    aria-pressed={satellite === isSatellite}
                    onClick={() => setSatellite(isSatellite)}
                    className={cn(
                      "px-3 py-1.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                      satellite === isSatellite ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {isSatellite ? t("mapSatellite") : t("mapRoad")}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border">
              {mapSrc && (
                <iframe
                  key={mapSrc}
                  src={mapSrc}
                  title={`${university.name} — ${t("mapTitle")}`}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="h-64 w-full sm:h-80"
                />
              )}
            </div>
          </section>
        )}
        {media.stats.length > 0 && (
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {media.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border p-4">
                <dt className="text-xs text-muted-foreground">{tt(s.label)}</dt>
                <dd className="text-lg text-primary">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {media.alumni.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="text-primary/80">{tt("Notable alumni")}: </span>
            {media.alumni.map(tt).join(" · ")}
          </p>
        )}

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {tt(university.description)}
        </p>

        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-4">
            <dt className="text-xs text-muted-foreground">{t("acceptance")}</dt>
            <dd className="text-lg text-primary">{university.acceptanceRate}%</dd>
          </div>
          <div className="rounded-xl border border-border p-4">
            <dt className="text-xs text-muted-foreground">{t("tuition")}</dt>
            <dd className="text-lg text-primary">${university.tuitionUSD.toLocaleString()}</dd>
          </div>
          <div className="rounded-xl border border-border p-4">
            <dt className="text-xs text-muted-foreground">{tt("Aid for internationals")}</dt>
            <dd className="text-lg text-primary">
              {university.aidForInternationals ? t("yes") : t("no")}
            </dd>
          </div>
        </dl>

        {match && <FitPanel match={match} />}
        <CostCalculator university={university} />
        <ApplicationChecklist university={university} />

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
          <a
            href={placeUrl(target)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Compass className="size-4" />
            {t("mapsChip")}
          </a>
          <a
            href={directionsUrl(target)}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
          >
            <Navigation className="size-4" />
            {t("mapDirections")}
          </a>
          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
          >
            {tt("Official website")} <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}