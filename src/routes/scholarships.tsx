import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/unifinder/PageShell";
import { ScholarshipTracks } from "@/components/unifinder/ScholarshipTracks";

const title = "Sovereign Scholarship Tracks — UniFinder Global";
const description =
  "DAAD, MEXT, CSC, GKS, Fulbright, Chevening, Erasmus Mundus and Knight-Hennessy — coverage, stipends, deadlines and official application portals in one directory.";

export const Route = createFileRoute("/scholarships")({
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
  component: () => (
    <PageShell>
      <ScholarshipTracks />
    </PageShell>
  ),
});