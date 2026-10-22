import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/unifinder/PageShell";
import { StudentStories } from "@/components/unifinder/StudentStories";

const title = "Student Stories — UniFinder Global";
const description =
  "See how strong activity lists and essay openings are built, and share your own admissions story to help the next applicant.";

export const Route = createFileRoute("/stories")({
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
      <StudentStories />
    </PageShell>
  ),
});
