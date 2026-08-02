import { useState } from "react";
import { ChevronDown, Crown } from "lucide-react";
import { LANGUAGES, useI18n, type LangCode } from "@/lib/i18n";

export function Navbar({ onStart }: { onStart: () => void }) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  const links = [
    { href: "#top", label: t("navHome") },
    { href: "#assessment", label: t("navMatcher") },
    { href: "#essay", label: t("navEssay") },
    { href: "#faq", label: t("navFaq") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg border border-primary/40 bg-velvet/70">
            <Crown className="size-4 text-primary" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-primary">UniFinder Global</span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("tagline")}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="ms-auto flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="glass flex items-center gap-2 rounded-full px-3 py-2 text-sm"
            >
              <span aria-hidden>{current.flag}</span>
              <span className="hidden sm:inline">{current.label}</span>
              <ChevronDown className="size-3.5" />
            </button>
            {open && (
              <ul className="glass absolute end-0 z-50 mt-2 w-48 overflow-hidden rounded-xl py-1">
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      onClick={() => {
                        setLang(l.code as LangCode);
                        setOpen(false);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2 text-start text-sm transition-colors hover:bg-primary/10"
                    >
                      <span aria-hidden>{l.flag}</span>
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={onStart}
            className="rounded-full bg-gradient-to-r from-gold-soft to-gold px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            {t("heroCta")}
          </button>
        </div>
      </nav>
    </header>
  );
}