export type MajorTheme = {
  id: string;
  label: string;
  /** CSS background layers rendered behind the selected-major card. */
  background: string;
  accent: string;
};

const THEMES: Record<string, MajorTheme> = {
  quant: {
    id: "quant",
    label: "Quantitative & Financial Markets",
    accent: "var(--gold)",
    background:
      "repeating-linear-gradient(115deg, color-mix(in oklab, var(--gold) 10%, transparent) 0 2px, transparent 2px 22px), linear-gradient(140deg, color-mix(in oklab, var(--gold) 18%, transparent), transparent 65%)",
  },
  tech: {
    id: "tech",
    label: "Computing & Intelligent Systems",
    accent: "var(--accent)",
    background:
      "linear-gradient(color-mix(in oklab, var(--accent) 16%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--accent) 16%, transparent) 1px, transparent 1px)",
  },
  life: {
    id: "life",
    label: "Life & Health Sciences",
    accent: "var(--accent)",
    background:
      "radial-gradient(circle at 20% 30%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 45%), radial-gradient(circle at 78% 70%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 50%)",
  },
  engineering: {
    id: "engineering",
    label: "Engineering & Applied Physics",
    accent: "var(--gold-soft)",
    background:
      "repeating-linear-gradient(45deg, color-mix(in oklab, var(--gold-soft) 12%, transparent) 0 6px, transparent 6px 18px)",
  },
  humanities: {
    id: "humanities",
    label: "Humanities, Law & Society",
    accent: "var(--primary)",
    background:
      "repeating-linear-gradient(0deg, color-mix(in oklab, var(--primary) 10%, transparent) 0 1px, transparent 1px 14px), linear-gradient(160deg, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)",
  },
  creative: {
    id: "creative",
    label: "Design, Media & Creative Arts",
    accent: "var(--gold-soft)",
    background:
      "conic-gradient(from 210deg at 30% 40%, color-mix(in oklab, var(--gold-soft) 20%, transparent), transparent 55%), radial-gradient(circle at 80% 20%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 55%)",
  },
};

const KEYWORDS: Array<[RegExp, keyof typeof THEMES]> = [
  [/econom|finance|account|actuar|statistic|business|marketing|fintech|quantitat/i, "quant"],
  [/comput|data|software|cyber|artificial|information|robot|game/i, "tech"],
  [/bio|medic|health|nurs|dent|pharm|genet|neuro|psycho|veterin|marine/i, "life"],
  [/engineer|physic|aerospace|material|energy|mechan|electric|civil|chemic|math/i, "engineering"],
  [/law|history|politic|relations|philosoph|linguist|sociolog|anthropo|education|public/i, "humanities"],
  [/design|art|music|film|media|journal|architect|fashion|theat/i, "creative"],
];

export function majorTheme(major: string): MajorTheme {
  for (const [re, key] of KEYWORDS) if (re.test(major)) return THEMES[key];
  return THEMES.humanities;
}
