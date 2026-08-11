import { Compass, ExternalLink, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CAMPUS_MEDIA, FALLBACK_MEDIA } from "@/data/campusMedia";
import type { University } from "@/data/extendedData";

export function openCampusMaps(uni: University) {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni.mapsQuery)}`,
    "_blank",
    "noopener,noreferrer",
  );
}

export function UniversityModal({
  university,
  onClose,
}: {
  university: University;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const media = CAMPUS_MEDIA[university.id] ?? FALLBACK_MEDIA;

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
              Founded {university.founded}
            </p>
            <h3 className="mt-1 font-display text-3xl text-gilded">{university.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {university.city}, {university.country}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {university.strengths.map((s) => (
            <div
              key={s}
              className="rounded-xl border border-primary/25 bg-velvet/50 px-3 py-6 text-center text-sm text-primary"
            >
              {s}
            </div>
          ))}
        </div>

        {media.photos.length > 0 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {media.photos.map((p) => (
              <figure key={p.url} className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={p.url}
                  alt={`${university.name} — ${p.caption}`}
                  loading="lazy"
                  className="h-48 w-full object-cover"
                />
                <figcaption className="bg-velvet/60 px-3 py-2 text-xs text-muted-foreground">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
        {media.stats.length > 0 && (
          <dl className="mt-6 grid gap-3 sm:grid-cols-3">
            {media.stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border p-4">
                <dt className="text-xs text-muted-foreground">{s.label}</dt>
                <dd className="text-lg text-primary">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {media.alumni.length > 0 && (
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="text-primary/80">Notable alumni: </span>
            {media.alumni.join(" · ")}
          </p>
        )}

        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          {university.description}
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
            <dt className="text-xs text-muted-foreground">Aid for internationals</dt>
            <dd className="text-lg text-primary">
              {university.aidForInternationals ? t("yes") : t("no")}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-border pt-6">
          <button
            onClick={() => openCampusMaps(university)}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Compass className="size-4" />
            {t("mapsChip")}
          </button>
          <a
            href={university.website}
            target="_blank"
            rel="noopener noreferrer"
            className="glass inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm"
          >
            Official website <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}