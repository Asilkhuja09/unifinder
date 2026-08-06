import { createFileRoute } from "@tanstack/react-router";
import worldNight from "@/assets/world-night.asset.json";
import { AuthDrawer } from "@/components/unifinder/AuthDrawer";
import { ConstellationFX } from "@/components/unifinder/ConstellationFX";
import { EssayAnalyzer } from "@/components/unifinder/EssayAnalyzer";
import { Footer } from "@/components/unifinder/Footer";
import { Navbar } from "@/components/unifinder/Navbar";
import { AuthProvider } from "@/lib/auth";
import { I18nProvider } from "@/lib/i18n";

const title = "AI Essay Analyzer — UniFinder Global";
const description =
  "Score your admissions essay in seconds: overall readiness, grammar and tone, structure, strengths, weaknesses and actionable rewrite steps from an AI admissions officer.";

export const Route = createFileRoute("/essay")({
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
  component: EssayPage,
});

function EssayPage() {
  return (
    <I18nProvider>
      <AuthProvider>
        <div className="relative min-h-screen overflow-x-hidden">
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

          <Navbar onStart={() => window.scrollTo({ top: 0, behavior: "smooth" })} />
          <main>
            <EssayAnalyzer />
          </main>
          <Footer />
          <AuthDrawer />
        </div>
      </AuthProvider>
    </I18nProvider>
  );
}