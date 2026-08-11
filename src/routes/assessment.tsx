import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useRef, useState } from "react";
import { PageShell } from "@/components/unifinder/PageShell";
import { OrbitalLoader } from "@/components/unifinder/OrbitalLoader";
import { Results } from "@/components/unifinder/Results";
import { Wizard } from "@/components/unifinder/Wizard";
import type { Profile } from "@/lib/profile";

const title = "Scholarship & University Assessment — UniFinder Global";
const description =
  "Complete a 9-step admissions profile — academics, target regions, testing, funding needs and difficulty tier — and receive matched universities and sovereign scholarship tracks.";

export const Route = createFileRoute("/assessment")({
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
  component: AssessmentPage,
});

function AssessmentPage() {
  const [stage, setStage] = useState<"idle" | "loading" | "results">("idle");
  const [profile, setProfile] = useState<Profile | null>(null);
  const wizardRef = useRef<HTMLDivElement | null>(null);

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
    <PageShell>
      <div ref={wizardRef}>
        <Wizard onComplete={handleComplete} />
      </div>

      {stage === "results" && profile && (
        <Results
          profile={profile}
          onRestart={() => {
            setStage("idle");
            setProfile(null);
            wizardRef.current?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}

      {stage === "loading" && <OrbitalLoader onDone={handleLoaded} />}
    </PageShell>
  );
}