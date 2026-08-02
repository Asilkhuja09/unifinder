import { useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n";

function analyse(text: string) {
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const avgSentence = sentences.length ? words.length / sentences.length : 0;
  const unique = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z']/g, ""))).size;
  const passive = (text.match(/\b(was|were|been|being|is|are)\s+\w+ed\b/gi) ?? []).length;
  const firstPerson = (text.match(/\bI\b/g) ?? []).length;
  const cliches = [
    "since I was a child",
    "passion for",
    "changed my life",
    "outside the box",
    "hard work pays off",
  ].filter((c) => text.toLowerCase().includes(c));

  return { words: words.length, sentences: sentences.length, avgSentence, unique, passive, firstPerson, cliches };
}

export function EssayOptimizer() {
  const { t } = useI18n();
  const [text, setText] = useState("");
  const stats = useMemo(() => analyse(text), [text]);

  const notes: { label: string; body: string; tone: "good" | "warn" | "info" }[] = [];
  if (stats.words === 0) {
    notes.push({
      label: "Awaiting draft",
      body: "Paste a personal statement on the left. Feedback streams here as you type — structure, rhythm, voice and cliché density.",
      tone: "info",
    });
  } else {
    notes.push({
      label: "Length",
      body:
        stats.words < 250
          ? `${stats.words} words. Most Common App and UCAS statements land between 500 and 650 words; expand the evidence behind your claims.`
          : stats.words > 700
            ? `${stats.words} words. Trim toward 650 — admissions readers spend under 8 minutes per file.`
            : `${stats.words} words. Comfortably inside the standard 500–650 word envelope.`,
      tone: stats.words >= 250 && stats.words <= 700 ? "good" : "warn",
    });
    notes.push({
      label: "Sentence rhythm",
      body: `Average sentence length is ${stats.avgSentence.toFixed(1)} words across ${stats.sentences} sentences. ${
        stats.avgSentence > 26
          ? "Break the longest constructions in two; the reader loses the thread past ~25 words."
          : "Rhythm is readable. Vary short declaratives against longer analytical lines for texture."
      }`,
      tone: stats.avgSentence > 26 ? "warn" : "good",
    });
    notes.push({
      label: "Voice",
      body: `${stats.passive} likely passive constructions and ${stats.firstPerson} first-person references. Admissions essays reward agency: name what you decided, built and changed.`,
      tone: stats.passive > 4 ? "warn" : "good",
    });
    notes.push({
      label: "Lexical range",
      body: `${stats.unique} unique tokens (${stats.words ? Math.round((stats.unique / stats.words) * 100) : 0}% of total). Repetition below 40% uniqueness usually signals recycled phrasing.`,
      tone: "info",
    });
    notes.push({
      label: "Cliché scan",
      body: stats.cliches.length
        ? `Detected: ${stats.cliches.join(", ")}. Replace each with a specific scene only you could have written.`
        : "No high-frequency admissions clichés detected. Keep anchoring claims in concrete detail.",
      tone: stats.cliches.length ? "warn" : "good",
    });
  }

  return (
    <section id="essay" className="mx-auto w-full max-w-6xl px-4 py-16">
      <h2 className="mb-8 text-4xl font-semibold text-gilded">{t("essayTitle")}</h2>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass flex flex-col rounded-2xl p-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={18}
            placeholder={t("essayPlaceholder")}
            className="w-full flex-1 resize-none rounded-xl border border-border bg-velvet/50 p-4 text-sm leading-relaxed outline-none focus:border-primary/60"
          />
          <div className="mt-3 flex justify-between text-xs text-muted-foreground">
            <span>
              {text.length} {t("characters")}
            </span>
            <span>
              {stats.words} {t("words")}
            </span>
          </div>
        </div>

        <div className="glass space-y-4 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">{t("analysis")}</p>
          {notes.map((n) => (
            <div key={n.label} className="rounded-xl border border-border bg-velvet/40 p-4">
              <p
                className={
                  n.tone === "warn"
                    ? "text-sm font-semibold text-destructive"
                    : n.tone === "good"
                      ? "text-sm font-semibold text-accent"
                      : "text-sm font-semibold text-primary"
                }
              >
                {n.label}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}