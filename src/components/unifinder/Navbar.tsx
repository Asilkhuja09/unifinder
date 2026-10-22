import { useState } from "react";
import { ChevronDown, Crown, Menu, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LANGUAGES, useI18n, type LangCode } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

function LangChip({ code }: { code: string }) {
  return (
    <span className="grid min-w-8 place-items-center rounded-md border border-primary/40 bg-velvet/60 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-primary">
      {code.toUpperCase()}
    </span>
  );
}

export function Navbar({ onStart }: { onStart: () => void }) {
  const { t, tt, lang, setLang } = useI18n();
  const { user, hint, openGate, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang)!;

  const links = [
    { to: "/", label: t("navHome") },
    { to: "/assessment", label: tt("Assessment") },
    { to: "/universities", label: tt("University Directory") },
    { to: "/compare", label: tt("Compare") },
    { to: "/scholarships", label: tt("Scholarships") },
    { to: "/essay", label: tt("Essay Analyzer") },
    { to: "/stories", label: tt("Student Stories") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-10">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-primary/40 bg-velvet/70">
            <Crown className="size-4 text-primary" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-lg text-primary">UniFinder Global</span>
            <span className="block text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              {t("tagline")}
            </span>
          </span>
        </Link>

        <div className="hidden shrink-0 items-center gap-6 lg:flex">
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

        <div className="ms-auto flex shrink-0 items-center gap-2">
          <div className="relative shrink-0">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={open}
              className="glass flex items-center gap-2 rounded-full border border-border/70 px-3 py-2 text-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-primary/10"
            >
              <LangChip code={current.code} />
              <span className="hidden sm:inline">{current.label}</span>
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
                      <LangChip code={l.code} />
                      <span className="flex-1">{l.label}</span>
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
              className="glass hidden size-10 place-items-center rounded-full text-primary transition-colors hover:border-primary/60 sm:grid"
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
            className="hidden rounded-full bg-gradient-to-r from-gold-soft to-gold px-4 py-2 text-sm font-semibold text-primary-foreground sm:inline-flex"
          >
            {t("heroCta")}
          </button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label={t("navHome") === "Home" ? "Open menu" : tt("Menu")}
                className="glass grid size-10 place-items-center rounded-full text-primary transition-colors hover:border-primary/60 lg:hidden"
              >
                <Menu className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-72 border-primary/30 bg-background/95 p-0 backdrop-blur-xl"
            >
              <SheetHeader className="border-b border-border/70 px-5 py-4">
                <SheetTitle className="font-display text-xl text-primary">
                  UniFinder Global
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-3 py-4">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMenuOpen(false)}
                    activeOptions={{ exact: l.to === "/" }}
                    activeProps={{ className: "bg-primary/10 text-primary" }}
                    className="rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="my-3 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                {user || hint ? (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      void signOut();
                    }}
                    className="glass rounded-full px-4 py-2.5 text-start text-sm"
                  >
                    {t("signOut")}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      openGate();
                    }}
                    className="glass rounded-full px-4 py-2.5 text-start text-sm"
                  >
                    {t("signIn")}
                  </button>
                )}
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    onStart();
                  }}
                  className="mt-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-4 py-2.5 text-sm font-semibold text-primary-foreground"
                >
                  {t("heroCta")}
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
