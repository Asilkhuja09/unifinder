import { useMemo, useRef, useState, type ComponentType } from "react";
import {
  Award,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Coins,
  GraduationCap,
  Globe2,
  Landmark,
  Plus,
  ShieldCheck,
  Target,
  Trophy,
  User,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { ConstellationFX } from "./ConstellationFX";
import { emptyProfile, type Profile } from "@/lib/profile";
import { majorTheme } from "@/lib/majorThemes";
import {
  AID_TRACKS,
  DIFFICULTY_TIERS,
  GPA_SCALES,
  INCOME_BRACKETS,
  TESTS,
  TEST_RANGES,
  type DifficultyTier,
  type Region,
  type TestName,
} from "@/data/extendedData";
import { cn } from "@/lib/utils";
import { Field, OptionCard, inputCls, stagger } from "./WizardParts";
import { CountryPicker, MajorPicker, RegionPicker } from "./WizardPickers";

const TOTAL_STEPS = 9;

type Icon = ComponentType<{ className?: string }>;

const STEP_ICONS: Icon[] = [User, GraduationCap, BookOpen, Globe2, ClipboardCheck, Trophy, Coins, Wallet, Target];

const STEP_HINTS = [
  "Tell us who you are and where you study now.",
  "Pick your grading scale, then enter your average.",
  "Choose the field you want to study.",
  "Where in the world would you like to study?",
  "Add any English or admissions test scores you have.",
  "Share what you do outside class: clubs, sports, projects, work.",
  "Do you need scholarships or financial aid to study abroad?",
  "Roughly what is your family's yearly income?",
  "How selective should your matches be?",
];

const ACTIVITY_IDEAS = [
  "Student council",
  "Olympiad medal",
  "Volunteering",
  "Research project",
  "Sports captain",
  "Started a business",
  "Coding club",
  "Debate team",
];

const TRACK_ICONS: Record<string, Icon> = {
  "full-ride": Trophy,
  merit: Award,
  sovereign: Landmark,
};

export function Wizard({ onComplete }: { onComplete: (profile: Profile) => void }) {
  const { t, tt } = useI18n();
  const { user, requireAuth } = useAuth();

  const [step, setStep] = useState(1);
  const dir = useRef<"fwd" | "back">("fwd");
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const stepTitles = [t("s1"), t("s2"), t("s3"), t("s4"), t("s5"), t("s6"), t("s7"), t("s8"), t("s9")];

  const scale = GPA_SCALES.find((s) => s.id === profile.gpaScale);

  const valid = useMemo(() => {
    switch (step) {
      case 1:
        return (
          profile.firstName.trim().length > 1 &&
          profile.lastName.trim().length > 1 &&
          profile.country !== ""
        );
      case 2: {
        const gpa = Number(profile.gpa);
        return (
          !!scale && profile.gpa.trim() !== "" && Number.isFinite(gpa) && gpa > 0 && gpa <= scale.max
        );
      }
      case 3:
        return profile.major !== "";
      case 4:
        return profile.regions.length > 0;
      case 5:
        return (
          profile.noTests ||
          (profile.activeTests.length > 0 &&
            profile.activeTests.every((name) => (profile.tests[name] ?? "").trim() !== ""))
        );
      case 6:
        return profile.extracurricular.trim().length >= 20;
      case 7:
        return (
          profile.needsAid === "no" || (profile.needsAid === "yes" && profile.aidTracks.length > 0)
        );
      case 8:
        return profile.income !== "";
      case 9:
        return profile.difficulty !== "";
      default:
        return false;
    }
  }, [step, profile, scale]);

  const selectMajor = (m: string) => {
    set("major", m);
    toast.success(`${tt("You selected")}: ${m}`, { description: tt(majorTheme(m).label) });
  };

  const toggleTest = (name: TestName) => {
    const active = profile.activeTests.includes(name);
    setProfile((p) => ({
      ...p,
      noTests: false,
      activeTests: active ? p.activeTests.filter((x) => x !== name) : [...p.activeTests, name],
      tests: active ? { ...p.tests, [name]: undefined } : p.tests,
    }));
  };

  const goTo = (n: number) => {
    dir.current = n > step ? "fwd" : "back";
    setStep(n);
  };

  const handleNext = () => {
    if (!valid) return;
    if (!requireAuth()) return;
    if (step === TOTAL_STEPS) onComplete(profile);
    else goTo(step + 1);
  };

  const gpaNum = Number(profile.gpa);
  const gpaPct =
    scale && Number.isFinite(gpaNum) && gpaNum > 0 ? Math.min(100, (gpaNum / scale.max) * 100) : 0;
  const gpaOver = !!scale && profile.gpa.trim() !== "" && !valid;
  const charCount = profile.extracurricular.trim().length;

  const HeaderIcon = STEP_ICONS[step - 1] ?? User;

  return (
    <section id="assessment" className="mx-auto w-full max-w-5xl px-4 py-16">
      <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-8">
        <ConstellationFX density={0.00012} />

        <div className="relative grid gap-8 lg:grid-cols-[13.5rem_1fr]">
          {/* Stepper: vertical rail on desktop, compact dots on mobile */}
          <nav aria-label={tt("Assessment progress")} className="lg:pt-1">
            <ol className="flex items-center justify-between gap-1 lg:flex-col lg:items-stretch lg:justify-start lg:gap-0">
              {stepTitles.map((title, i) => {
                const n = i + 1;
                const done = n < step;
                const current = n === step;
                const Icon = STEP_ICONS[i] ?? User;
                return (
                  <li key={n} className="relative flex lg:block">
                    {n < TOTAL_STEPS && (
                      <span
                        aria-hidden
                        className="absolute left-[1.1rem] top-9 hidden h-[calc(100%-1.4rem)] w-px overflow-hidden bg-border lg:block"
                      >
                        <span
                          className={cn(
                            "block w-full bg-primary transition-[height] duration-700",
                            done ? "h-full" : "h-0",
                          )}
                        />
                      </span>
                    )}
                    <button
                      type="button"
                      disabled={!done}
                      onClick={() => goTo(n)}
                      aria-current={current ? "step" : undefined}
                      aria-label={`${n}. ${title}`}
                      className="group flex items-center gap-3 rounded-xl py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring enabled:cursor-pointer disabled:cursor-default lg:w-full"
                    >
                      <span
                        className={cn(
                          "relative grid size-9 shrink-0 place-items-center rounded-full border text-primary transition-all duration-500",
                          current && "wiz-pulse-ring border-primary bg-primary/15 scale-110",
                          done && "border-primary bg-primary text-primary-foreground",
                          !current && !done && "border-border bg-velvet/50 text-muted-foreground",
                        )}
                      >
                        {done ? (
                          <Check key="c" className="wiz-pop size-4" strokeWidth={3} />
                        ) : (
                          <Icon className="size-4" />
                        )}
                      </span>
                      <span
                        className={cn(
                          "hidden text-sm transition-colors lg:block",
                          current ? "font-semibold text-primary" : done ? "text-foreground/85 group-hover:text-primary" : "text-muted-foreground",
                        )}
                      >
                        {title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="min-w-0">
            <header className="mb-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-primary/80">
                  {t("step")} {step} {t("of")} {TOTAL_STEPS}
                </p>
                <HeaderIcon className="size-5 text-primary/70" />
              </div>
              <h2 key={step} className="wiz-rise mt-1 text-3xl font-semibold text-gilded">
                {stepTitles[step - 1]}
              </h2>
              <p key={`h${step}`} className="wiz-rise mt-1 text-sm text-muted-foreground" style={stagger(1)}>
                {tt(STEP_HINTS[step - 1] ?? "")}
              </p>
              <div className="relative mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="relative h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-700 ease-out"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                >
                  <span className="wiz-sheen absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
              </div>
            </header>

            <div
              key={step}
              className={cn("min-h-[340px] space-y-6", dir.current === "fwd" ? "wiz-in-fwd" : "wiz-in-back")}
            >
              {step === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={t("firstName")}>
                    <input
                      className={inputCls}
                      value={profile.firstName}
                      onChange={(e) => set("firstName", e.target.value)}
                      placeholder="Alex"
                      autoComplete="given-name"
                    />
                  </Field>
                  <Field label={t("lastName")}>
                    <input
                      className={inputCls}
                      value={profile.lastName}
                      onChange={(e) => set("lastName", e.target.value)}
                      placeholder="Morgan"
                      autoComplete="family-name"
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <CountryPicker value={profile.country} onChange={(c) => set("country", c)} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-sm font-medium text-primary/90">{t("gpaScale")}</p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {GPA_SCALES.map((s, i) => (
                        <OptionCard
                          key={s.id}
                          index={i}
                          selected={profile.gpaScale === s.id}
                          onClick={() => set("gpaScale", s.id)}
                          className="px-4 py-3.5"
                        >
                          <p className="pe-6 text-sm font-medium">{s.label}</p>
                          <p className="text-xs text-muted-foreground">
                            0 – {s.max}
                          </p>
                        </OptionCard>
                      ))}
                    </div>
                  </div>

                  <div
                    className={cn(
                      "rounded-2xl border bg-velvet/40 p-5 transition-all duration-500",
                      scale ? "border-primary/40" : "border-border opacity-60",
                    )}
                  >
                    <div className="grid items-end gap-5 sm:grid-cols-[12rem_1fr]">
                      <Field label={t("gpa")}>
                        <input
                          className={cn(inputCls, "text-lg font-semibold tabular-nums")}
                          inputMode="decimal"
                          disabled={!scale}
                          value={profile.gpa}
                          onChange={(e) => set("gpa", e.target.value)}
                          placeholder={scale ? `0 – ${scale.max}` : tt("Select a scale first")}
                        />
                      </Field>
                      <div>
                        <div className="relative h-3 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={cn(
                              "h-full rounded-full transition-[width] duration-700 ease-out",
                              gpaOver ? "bg-destructive" : "bg-gradient-to-r from-accent via-gold-soft to-gold",
                            )}
                            style={{ width: `${gpaPct}%` }}
                          />
                          {[25, 50, 75].map((p) => (
                            <span
                              key={p}
                              aria-hidden
                              className="absolute top-0 h-full w-px bg-background/60"
                              style={{ left: `${p}%` }}
                            />
                          ))}
                        </div>
                        <div className="mt-2 flex justify-between text-xs tabular-nums text-muted-foreground">
                          <span>0</span>
                          <span className={cn("transition-colors", gpaPct > 0 && "text-primary")}>
                            {gpaPct > 0 ? `${Math.round(gpaPct)}%` : ""}
                          </span>
                          <span>{scale?.max ?? "—"}</span>
                        </div>
                      </div>
                    </div>
                    {gpaOver && scale && (
                      <p className="wiz-rise mt-3 text-sm text-destructive">
                        {tt("Enter a value between 0 and")} {scale.max}.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 3 && <MajorPicker value={profile.major} onSelect={selectMajor} />}

              {step === 4 && (
                <RegionPicker value={profile.regions} onChange={(next: Region[]) => set("regions", next)} />
              )}

              {step === 5 && (
                <div className="space-y-3">
                  <OptionCard
                    selected={profile.noTests}
                    index={0}
                    onClick={() =>
                      setProfile((p) => ({ ...p, noTests: !p.noTests, activeTests: [], tests: {} }))
                    }
                    className="w-full px-5 py-4"
                  >
                    <p className="pe-8 text-sm font-medium">{tt("None / No standardized test yet")}</p>
                    <p className="mt-0.5 pe-8 text-xs text-muted-foreground">
                      {tt("Continue without scores — matches will use academics and funding needs only.")}
                    </p>
                  </OptionCard>

                  {!profile.noTests && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {TESTS.map((name, i) => {
                        const on = profile.activeTests.includes(name);
                        return (
                          <div
                            key={name}
                            style={stagger(i + 1)}
                            className={cn(
                              "wiz-rise relative overflow-hidden rounded-2xl border transition-all duration-300",
                              on
                                ? "border-primary bg-primary/12 shadow-[0_0_34px_-12px_var(--gold)]"
                                : "border-border bg-velvet/40 hover:border-primary/50",
                            )}
                          >
                            <button
                              type="button"
                              aria-pressed={on}
                              onClick={() => toggleTest(name)}
                              className="flex w-full items-center gap-3 px-4 py-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              <span
                                className={cn(
                                  "grid size-11 place-items-center rounded-xl border text-xs font-bold transition-colors",
                                  on
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border bg-secondary text-primary",
                                )}
                              >
                                {name.slice(0, 3).toUpperCase()}
                              </span>
                              <span className="flex-1">
                                <span className="block text-sm font-semibold">{name}</span>
                                <span className="block text-xs text-muted-foreground">{TEST_RANGES[name]}</span>
                              </span>
                              {on && (
                                <span className="wiz-pop grid size-5 place-items-center rounded-full bg-primary text-primary-foreground">
                                  <Check className="size-3" strokeWidth={3.5} />
                                </span>
                              )}
                            </button>
                            <div
                              className={cn(
                                "grid transition-all duration-300",
                                on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                              )}
                            >
                              <div className="overflow-hidden">
                                <div className="border-t border-border/70 px-4 py-3">
                                  <Field label={`${name} ${t("score")}`}>
                                    <input
                                      className={inputCls}
                                      inputMode="decimal"
                                      tabIndex={on ? 0 : -1}
                                      value={profile.tests[name] ?? ""}
                                      onChange={(e) =>
                                        setProfile((p) => ({
                                          ...p,
                                          tests: { ...p.tests, [name]: e.target.value },
                                        }))
                                      }
                                      placeholder={TEST_RANGES[name]}
                                    />
                                  </Field>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {step === 6 && (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-primary/25 bg-[oklch(0.14_0.05_264)] p-4 font-mono transition-shadow focus-within:shadow-[0_0_34px_-12px_var(--gold)]">
                    <div className="mb-3 flex items-center gap-2 text-xs text-primary/70">
                      <span className="size-2 rounded-full bg-destructive/70" />
                      <span className="size-2 rounded-full bg-primary/70" />
                      <span className="size-2 rounded-full bg-accent/70" />
                      <span className="ms-2 tracking-[0.2em]">leadership_profile.log</span>
                    </div>
                    <textarea
                      rows={8}
                      value={profile.extracurricular}
                      onChange={(e) => set("extracurricular", e.target.value)}
                      placeholder={t("extracurricular")}
                      className="w-full resize-none bg-transparent font-mono text-sm text-accent outline-none placeholder:text-muted-foreground/60"
                    />
                    <div className="mt-2 flex items-center gap-3">
                      <div className="h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            charCount >= 20 ? "bg-emerald-400" : "bg-primary",
                          )}
                          style={{ width: `${Math.min(100, (charCount / 20) * 100)}%` }}
                        />
                      </div>
                      <p className="text-xs tabular-nums text-muted-foreground">
                        {charCount}/20 min {t("characters")}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 text-sm text-muted-foreground">{tt("Quick add")}</p>
                    <div className="flex flex-wrap gap-2">
                      {ACTIVITY_IDEAS.map((idea, i) => (
                        <button
                          key={idea}
                          type="button"
                          style={stagger(i)}
                          onClick={() =>
                            set(
                              "extracurricular",
                              `${profile.extracurricular.trim()}${profile.extracurricular.trim() ? "; " : ""}${tt(idea)}`,
                            )
                          }
                          className="wiz-rise inline-flex items-center gap-1.5 rounded-full border border-border bg-velvet/40 px-3 py-1.5 text-sm outline-none transition-all hover:border-primary/60 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
                        >
                          <Plus className="size-3.5 text-primary" />
                          {tt(idea)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 7 && (
                <div className="space-y-5">
                  <p className="text-sm font-medium text-primary/90">{t("needAid")}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {(["yes", "no"] as const).map((v, i) => {
                      const Icon = v === "yes" ? Coins : ShieldCheck;
                      const on = profile.needsAid === v;
                      return (
                        <OptionCard
                          key={v}
                          index={i}
                          selected={on}
                          onClick={() =>
                            setProfile((p) => ({
                              ...p,
                              needsAid: v,
                              aidTracks: v === "no" ? [] : p.aidTracks,
                            }))
                          }
                          className="px-6 py-7"
                        >
                          <Icon className={cn("size-8 transition-transform duration-300 group-hover:scale-110", on ? "text-primary" : "text-primary/70")} />
                          <p className="mt-3 text-xl font-semibold">{v === "yes" ? t("yes") : t("no")}</p>
                          <p className="text-sm text-muted-foreground">
                            {v === "yes" ? tt("Show me scholarship tracks") : tt("I can cover the costs myself")}
                          </p>
                        </OptionCard>
                      );
                    })}
                  </div>
                  {profile.needsAid === "yes" && (
                    <div className="grid gap-3">
                      {AID_TRACKS.map((track, i) => {
                        const on = profile.aidTracks.includes(track.id);
                        const Icon = TRACK_ICONS[track.id] ?? Award;
                        return (
                          <OptionCard
                            key={track.id}
                            index={i}
                            selected={on}
                            onClick={() =>
                              set(
                                "aidTracks",
                                on
                                  ? profile.aidTracks.filter((x) => x !== track.id)
                                  : [...profile.aidTracks, track.id],
                              )
                            }
                            className="flex gap-4 p-5"
                          >
                            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                              <Icon className="size-5" />
                            </span>
                            <span className="pe-6">
                              <span className="block font-display text-xl text-primary">{tt(track.title)}</span>
                              <span className="mt-1 block text-sm text-muted-foreground">{tt(track.detail)}</span>
                            </span>
                          </OptionCard>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {step === 8 && (
                <div className="space-y-4">
                  <p className="text-sm font-medium text-primary/90">{t("income")}</p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {INCOME_BRACKETS.map((b, i) => {
                      const on = profile.income === b.id;
                      return (
                        <OptionCard
                          key={b.id}
                          index={i}
                          selected={on}
                          onClick={() => set("income", b.id)}
                          className="px-5 py-8 text-center"
                        >
                          <span className="flex justify-center gap-1" aria-hidden>
                            {Array.from({ length: i + 1 }, (_, k) => (
                              <Coins
                                key={k}
                                className={cn(
                                  "size-7 transition-all duration-300 group-hover:-translate-y-1",
                                  on ? "text-primary" : "text-primary/55",
                                )}
                              />
                            ))}
                          </span>
                          <p className="mt-4 text-lg font-semibold tabular-nums">{b.label}</p>
                        </OptionCard>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 9 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {DIFFICULTY_TIERS.map((tier, i) => {
                    const on = profile.difficulty === tier.id;
                    const level = DIFFICULTY_TIERS.length - i;
                    return (
                      <OptionCard
                        key={tier.id}
                        index={i}
                        selected={on}
                        onClick={() => set("difficulty", tier.id as DifficultyTier)}
                        className="p-6"
                      >
                        <span className="flex items-end gap-1" aria-hidden>
                          {DIFFICULTY_TIERS.map((_, k) => (
                            <span
                              key={k}
                              className={cn(
                                "w-2 rounded-sm transition-all duration-500",
                                k < level ? "bg-primary" : "bg-secondary",
                              )}
                              style={{ height: `${10 + k * 7}px`, transitionDelay: `${k * 60}ms` }}
                            />
                          ))}
                        </span>
                        <p className="mt-4 font-display text-2xl text-primary">{tt(tier.label)}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{tt(tier.note)}</p>
                      </OptionCard>
                    );
                  })}
                </div>
              )}
            </div>

            <footer className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
              <button
                type="button"
                disabled={step === 1}
                onClick={() => goTo(Math.max(1, step - 1))}
                className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium outline-none transition-all hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-35"
              >
                <ChevronLeft className="size-4 rtl:rotate-180" />
                {t("back")}
              </button>
              <button
                type="button"
                disabled={!valid}
                onClick={handleNext}
                className={cn(
                  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--gold)] outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none",
                  valid && "enabled:hover:-translate-y-0.5 enabled:active:scale-[0.98]",
                )}
              >
                {valid && (
                  <span
                    aria-hidden
                    className="wiz-sheen pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  />
                )}
                <span className="relative">{step === TOTAL_STEPS ? t("submit") : t("next")}</span>
                <ChevronRight className="relative size-4 rtl:rotate-180" />
              </button>
              {!user && (
                <p className="col-span-2 text-center text-xs text-muted-foreground">{t("authRequired")}</p>
              )}
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
