import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/unifinder/PageShell";
import { UniversityDirectory } from "@/components/unifinder/UniversityDirectory";

const title = "Global University Directory — UniFinder Global";
const description =
  "Browse verified elite and accessible universities worldwide with acceptance rates, tuition, international aid policy, campus photography and Google Maps routing.";

export const Route = createFileRoute("/universities")({
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
      <UniversityDirectory />
    </PageShell>
  ),
});