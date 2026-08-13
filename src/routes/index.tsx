import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ClipboardList, GraduationCap, PenLine, University } from "lucide-react";
import { PageShell } from "@/components/unifinder/PageShell";
import { useI18n } from "@/lib/i18n";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";

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
  const { t } = useI18n();
  const [stats, setStats] = useState({ records: 18420, scholarships: 962, countries: 148 });
  const [sessionSeconds, setSessionSeconds] = useState(0);

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
        <section className="relative mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:py-32">
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
            <video
              className="size-full object-cover"
              src={heroVideo.url}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
            <div className="absolute inset-0 bg-black/50" />
          </div>
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

        <section className="mx-auto w-full max-w-6xl px-4 py-16">
          <h2 className="mb-8 text-3xl font-semibold text-gilded">Explore the network</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="glass group rounded-2xl p-6 transition-colors hover:border-primary/60"
              >
                <s.icon className="size-6 text-primary" />
                <h3 className="mt-4 font-display text-2xl text-primary">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                <span className="mt-4 inline-block text-sm text-accent group-hover:underline">
                  Open →
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
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
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
