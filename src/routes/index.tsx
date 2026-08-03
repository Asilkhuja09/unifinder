import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import worldNight from "@/assets/world-night.asset.json";
import { ConstellationFX } from "@/components/unifinder/ConstellationFX";
import { EssayOptimizer } from "@/components/unifinder/EssayOptimizer";
import { Footer } from "@/components/unifinder/Footer";
import { Navbar } from "@/components/unifinder/Navbar";
import { OrbitalLoader } from "@/components/unifinder/OrbitalLoader";
import { Results } from "@/components/unifinder/Results";
import { Wizard } from "@/components/unifinder/Wizard";
import { AuthDrawer } from "@/components/unifinder/AuthDrawer";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider, useI18n } from "@/lib/i18n";
import type { Profile } from "@/lib/profile";

const title = "UniFinder Global — Elite Universities & Full-Ride Scholarships";
const description =
  "A private network for discovering elite universities, sovereign scholarships like DAAD, MEXT, CSC, Fulbright and Knight-Hennessy, and full-ride funding tracks worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const FAQ = [
  {
    q: "How are matches generated?",
    a: "Your region targets, admissions-difficulty tier, funding needs and intended major are applied as filters over a verified directory of institutions and sovereign scholarship tracks.",
  },
  {
    q: "Why don't I see Harvard or MIT in my results?",
    a: "When you select the 76–100% (Accessible) difficulty tier, ultra-competitive institutions are mathematically excluded so every match stays realistic for your profile.",
  },
  {
    q: "Are the scholarship programmes real?",
    a: "Yes. Every track listed — DAAD, MEXT, CSC, Fulbright, Chevening, Erasmus Mundus, GKS, Pearson, Knight-Hennessy and Australia Awards — links to its official government or university portal.",
  },
];

function Content() {
  const { t } = useI18n();
  const [stage, setStage] = useState<"idle" | "loading" | "results">("idle");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState({ records: 18420, scholarships: 962, countries: 148 });
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const wizardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStats((s) => ({
        records: s.records + Math.floor(Math.random() * 9) + 1,
        scholarships: s.scholarships + (Math.random() > 0.6 ? 1 : 0),
        countries: s.countries,
      }));
      setSessionSeconds((v) => v + 12);
    }, 12000);
    return () => window.clearInterval(id);
  }, []);

  const scrollToWizard = useCallback(() => {
    wizardRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleComplete = useCallback((p: Profile) => {
    setProfile(p);
    setStage("loading");
  }, []);

  const handleLoaded = useCallback(() => {
    setStage("results");
    window.requestAnimationFrame(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <div id="top" className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${worldNight.url})` }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-background/[0.82]" />
      <div aria-hidden className="fixed inset-0 -z-10 bg-black/[0.18]" />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <ConstellationFX />
      </div>

      <Navbar onStart={scrollToWizard} />

      <main>
        <section className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:py-32">
          <h1 className="font-display text-5xl leading-[1.05] text-gilded sm:text-7xl">
            {t("heroTitle")}
          </h1>
          <div className="my-8 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{t("heroSubtitle")}</p>
          <button
            onClick={scrollToWizard}
            className="mt-10 rounded-full bg-gradient-to-r from-gold-soft to-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_50px_-14px_var(--gold)]"
          >
            {t("heroCta")}
          </button>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4">
          <div className="glass rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">{t("liveFeed")}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {[
                { label: t("dbUpdated"), value: stats.records },
                { label: t("scholarshipsTracked"), value: stats.scholarships },
                { label: t("countriesCovered"), value: stats.countries },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-primary tabular-nums">
                    {s.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              {t("sessionDuration")}: {Math.floor(sessionSeconds / 60)}m {sessionSeconds % 60}s
            </p>
          </div>
        </section>

        <div ref={wizardRef}>
          <Wizard onComplete={handleComplete} />
        </div>

        {stage === "results" && profile && (
          <Results
            profile={profile}
            onRestart={() => {
              setStage("idle");
              setProfile(null);
              scrollToWizard();
            }}
          />
        )}

        <EssayOptimizer />

        <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-16">
          <h2 className="mb-8 text-4xl font-semibold text-gilded">{t("navFaq")}</h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer font-display text-xl text-primary">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      {stage === "loading" && <OrbitalLoader onDone={handleLoaded} />}
      <AuthDrawer />
    </div>
  );
}

function Index() {
  return (
    <I18nProvider>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </I18nProvider>
  );
}
