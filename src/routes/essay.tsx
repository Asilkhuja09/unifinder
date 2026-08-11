import { createFileRoute } from "@tanstack/react-router";
import { EssayAnalyzer } from "@/components/unifinder/EssayAnalyzer";
import { PageShell } from "@/components/unifinder/PageShell";

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
    <PageShell>
      <EssayAnalyzer />
    </PageShell>
  );
}