import { useState } from "react";
import { ChevronDown, Crown, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LANGUAGES, useI18n, type LangCode } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export function Navbar({ onStart }: { onStart: () => void }) {
  const { t, lang, setLang } = useI18n();
  const { user, hint, openGate, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  const links = [
    { to: "/", label: t("navHome") },
    { to: "/assessment", label: "Assessment" },
    { to: "/universities", label: "University Directory" },
    { to: "/scholarships", label: "Scholarships" },
    { to: "/essay", label: "Essay Analyzer" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-lg border border-primary/40 bg-velvet/70">
            <Crown className="size-4 text-primary" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg text-primary">UniFinder Global</span>
            <span className="block text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("tagline")}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="ms-auto flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="glass flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-primary/10"
            >
              <span className="text-base leading-none" aria-hidden>
                {current.flag}
              </span>
              <span className="hidden sm:inline">{current.label}</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground sm:hidden">
                {current.code}
              </span>
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>
            {open && (
              <ul
                role="listbox"
                className="glass absolute end-0 z-50 mt-2 w-52 origin-top-right animate-scale-in overflow-hidden rounded-xl border border-border/70 bg-background/70 py-1 shadow-[0_20px_60px_-20px_var(--gold)] backdrop-blur-md"
              >
                {LANGUAGES.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={l.code === lang}
                      onClick={() => {
                        setLang(l.code as LangCode);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-2 text-start text-sm transition-colors hover:bg-primary/10 hover:text-primary ${
                        l.code === lang ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      <span className="text-base leading-none" aria-hidden>
                        {l.flag}
                      </span>
                      <span className="flex-1">{l.label}</span>
                      <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {l.code}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {(user || hint) && (
            <Link
              to="/profile"
              aria-label="Profile"
              className="glass grid size-10 place-items-center rounded-full text-primary transition-colors hover:border-primary/60"
            >
              <UserRound className="size-4" />
            </Link>
          )}
          {user || hint ? (
            <button
              onClick={() => void signOut()}
              title={user?.email ?? hint?.email ?? ""}
              className="glass hidden rounded-full px-4 py-2 text-sm sm:inline-flex"
            >
              {t("signOut")}
            </button>
          ) : (
            <button
              onClick={openGate}
              className="glass hidden rounded-full px-4 py-2 text-sm sm:inline-flex"
            >
              {t("signIn")}
            </button>
          )}
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