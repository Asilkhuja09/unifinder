import { createFileRoute } from "@tanstack/react-router";
import { ComparePage } from "@/components/unifinder/ComparePage";
import { PageShell } from "@/components/unifinder/PageShell";

const title = "Compare Universities — UniFinder Global";
const description =
  "Search up to four universities and compare tuition, total cost, acceptance rate and world ranking side by side.";

export const Route = createFileRoute("/compare")({
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
      <ComparePage />
    </PageShell>
  ),
});
