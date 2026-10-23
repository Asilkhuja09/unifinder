import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ClipboardList, GraduationCap, PenLine, University } from "lucide-react";
import { PageShell } from "@/components/unifinder/PageShell";
import { useI18n } from "@/lib/i18n";
import { HeroVideo } from "@/components/unifinder/HeroVideo";
import { LiveIntelligenceFeed } from "@/components/unifinder/LiveIntelligenceFeed";

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
    q: "How is UniFinder different from asking a general AI chatbot for universities?",
    a: "A general chatbot writes an answer from memory each time, so the same question can return different schools, and it can invent a deadline, a tuition figure or even a university that does not exist. UniFinder works the other way round: your 9-step profile is matched against a fixed directory of real institutions with the same rules every time, so you get the same ranked list again tomorrow, and every result shows why it fits (grades, test scores, region, selectivity, aid policy). Figures that are modelled estimates rather than published numbers are labelled as estimates, and every school and scholarship links to its official website so you can confirm before you apply. Scholarship tracks, campus photos and map routes sit in the same place, so you do not have to piece an answer together from several chat replies.",
  },
  {
    q: "How are university rankings and aid matches calculated?",
    a: "Each institution in the directory carries a composite world ranking (QS/THE band), a published acceptance rate, international tuition and an aid-for-internationals flag. Your assessment answers — target regions, difficulty tier, intended major, income bracket and funding needs — are applied as filters over that dataset, so a match means the school's ranking tier, selectivity and aid policy all fit your profile. Nothing is randomised.",
  },
  {
    q: "Do I need an official English certificate to start using the platform?",
    a: "No. In the testing step you can select “None / No standardized test yet” and continue straight through the assessment. Matching then relies on your academics, funding needs and target regions, and your results will highlight institutions and pathway programmes that accept later score submission.",
  },
  {
    q: "How do sovereign funding tracks (Fulbright, DAAD, MEXT, CSC) work?",
    a: "These are government-funded scholarships awarded by a country rather than a single university. You apply through the sponsoring body — a national commission, embassy or ministry — usually 9–12 months before intake, and the award typically covers tuition plus a monthly living stipend, insurance and flights. UniFinder lists each track's coverage, eligibility and official portal so you apply directly on the government site.",
  },
  {
    q: "Is my application profile data stored securely?",
    a: "Yes. Sign-in runs through managed OAuth providers, and anything tied to your account — saved universities and essay evaluations — is stored with row-level security so only your authenticated session can read or modify it. Assessment answers stay in your browser session unless you choose to save them, and we never sell or share your data.",
  },
];

function Content() {
  const { t, tt } = useI18n();
  const sections = [
    {
      to: "/assessment" as const,
      icon: ClipboardList,
      title: "Assessment",
      body: "A 9-step admissions profile — identity, academics, testing, funding needs and difficulty tier — returning matched institutions.",
    },
    {
      to: "/universities" as const,
      icon: University,
      title: "Universities",
      body: "The full verified directory: acceptance rates, tuition, international aid policy, campus multimedia and map routing.",
    },
    {
      to: "/scholarships" as const,
      icon: GraduationCap,
      title: "Scholarships",
      body: "Sovereign funding tracks — DAAD, MEXT, CSC, GKS, Fulbright, Knight-Hennessy — with coverage and official portals.",
    },
    {
      to: "/essay" as const,
      icon: PenLine,
      title: "Essay Analyzer",
      body: "AI admissions review scoring structure, grammar and tone, with strengths, weaknesses and actionable rewrite steps.",
    },
  ];

  return (
    <>
        <section className="relative flex min-h-[calc(100svh-4rem)] flex-col items-center justify-center py-24 text-center sm:min-h-[640px] sm:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            <HeroVideo />
            {/* Even tint keeps the footage visible while the centred headline stays readable */}
            <div className="absolute inset-0 bg-background/45" />
            {/* Soft pool of darkness right behind the text, so the bright beam never fights the headline */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 75% 60% at 50% 50%, color-mix(in oklab, var(--background) 58%, transparent), transparent 78%)",
              }}
            />
            {/* Only the top and bottom blend into the page; the sides run edge to edge */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
          </div>
          <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4">
          <h1 className="font-display text-5xl leading-[1.05] text-gilded sm:text-7xl">
            {t("heroTitle")}
          </h1>
          <div className="my-8 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{t("heroSubtitle")}</p>
          <Link
            to="/assessment"
            className="mt-10 rounded-full bg-gradient-to-r from-gold-soft to-gold px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_16px_50px_-14px_var(--gold)]"
          >
            {t("heroCta")}
          </Link>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4">
          <LiveIntelligenceFeed />
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-semibold text-gilded">{tt("Explore the network")}</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="glass group rounded-2xl p-6 transition-colors hover:border-primary/60"
              >
                <s.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-display text-2xl text-primary">{tt(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tt(s.body)}</p>
                <span className="mt-4 inline-block text-sm text-accent group-hover:underline">
                  {tt("Open")} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-16">
          <h2 className="mb-8 text-4xl font-semibold text-gilded">{t("navFaq")}</h2>
          <div className="space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer font-display text-xl text-primary">
                  {tt(f.q)}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tt(f.a)}</p>
              </details>
            ))}
          </div>
        </section>
    </>
  );
}

function Index() {
  return (
    <PageShell>
      <Content />
    </PageShell>
  );
}
