import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { ConstellationFX } from "./ConstellationFX";
import { emptyProfile, type Profile } from "@/lib/profile";
import { countryFlagEmoji, countryFlagUrl } from "@/lib/flags";
import { majorTheme } from "@/lib/majorThemes";
import {
  AID_TRACKS,
  COUNTRIES,
  DIFFICULTY_TIERS,
  GPA_SCALES,
  INCOME_BRACKETS,
  MAJORS,
  REGIONS,
  TESTS,
  TEST_RANGES,
  type DifficultyTier,
  type Region,
  type TestName,
} from "@/data/extendedData";
import { cn } from "@/lib/utils";


const TOTAL_STEPS = 9;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-primary/80">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-velvet/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/70 focus:ring-2 focus:ring-ring";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span className="rounded bg-gradient-to-br from-gold-soft to-gold px-0.5 font-semibold text-royal">
        {text.slice(idx, idx + query.length)}
      </span>
      {text.slice(idx + query.length)}
    </>
  );
}

export function Wizard({ onComplete }: { onComplete: (profile: Profile) => void }) {
  const { t, lang } = useI18n();
  const { user, requireAuth } = useAuth();

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [majorQuery, setMajorQuery] = useState("");

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    setProfile((p) => ({ ...p, [key]: value }));

  const filteredMajors = useMemo(() => {
    const q = majorQuery.trim().toLowerCase();
    return MAJORS.filter((m) => m.toLowerCase().includes(q));
  }, [majorQuery]);

  const stepTitles = [t("s1"), t("s2"), t("s3"), t("s4"), t("s5"), t("s6"), t("s7"), t("s8"), t("s9")];

  const valid = useMemo(() => {
    switch (step) {
      case 1:
        return (
          profile.firstName.trim().length > 1 &&
          profile.lastName.trim().length > 1 &&
          profile.country !== ""
        );
      case 2: {
        const scale = GPA_SCALES.find((s) => s.id === profile.gpaScale);
        const gpa = Number(profile.gpa);
        return (
          !!scale &&
          profile.gpa.trim() !== "" &&
          Number.isFinite(gpa) &&
          gpa > 0 &&
          gpa <= scale.max
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
          profile.needsAid === "no" ||
          (profile.needsAid === "yes" && profile.aidTracks.length > 0)
        );
      case 8:
        return profile.income !== "";
      case 9:
        return profile.difficulty !== "";
      default:
        return false;
    }
  }, [step, profile]);

  const toggleRegion = (r: Region) =>
    set(
      "regions",
      profile.regions.includes(r)
        ? profile.regions.filter((x) => x !== r)
        : [...profile.regions, r],
    );

  const toggleTest = (name: TestName) => {
    const active = profile.activeTests.includes(name);
    setProfile((p) => ({
      ...p,
      noTests: false,
      activeTests: active ? p.activeTests.filter((x) => x !== name) : [...p.activeTests, name],
      tests: active ? { ...p.tests, [name]: undefined } : p.tests,
    }));
  };

  const handleNext = () => {
    if (!valid) return;
    if (!requireAuth()) return;
    if (step === TOTAL_STEPS) onComplete(profile);
    else setStep((s) => s + 1);
  };

  return (
    <section id="assessment" className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
        <ConstellationFX density={0.00012} />
        <header className="relative mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/80">
            {t("step")} {step} {t("of")} {TOTAL_STEPS}
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-gilded">{stepTitles[step - 1]}</h2>
          <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </header>

        <div className="relative min-h-[320px] space-y-6">
          {step === 1 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("firstName")}>
                <input
                  className={inputCls}
                  value={profile.firstName}
                  onChange={(e) => set("firstName", e.target.value)}
                  placeholder="Alex"
                />
              </Field>
              <Field label={t("lastName")}>
                <input
                  className={inputCls}
                  value={profile.lastName}
                  onChange={(e) => set("lastName", e.target.value)}
                  placeholder="Morgan"
                />
              </Field>
              <div className="sm:col-span-2">
                <div
                  className="relative overflow-hidden rounded-2xl border border-border/70 bg-velvet/40 p-4 transition-all"
                  style={
                    profile.country
                      ? { borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)" }
                      : undefined
                  }
                >
                  {profile.country && countryFlagUrl(profile.country, 320) && (
                    <img
                      src={countryFlagUrl(profile.country, 320)!}
                      alt=""
                      aria-hidden
                      className="pointer-events-none absolute inset-0 size-full object-cover opacity-15 blur-[2px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
                    />
                  )}
                  <div className="relative">
                    <Field label={t("country")}>
                      <div className="flex items-center gap-3">
                        {profile.country && countryFlagUrl(profile.country) && (
                          <img
                            src={countryFlagUrl(profile.country)!}
                            alt={`${profile.country} flag`}
                            className="h-7 w-10 shrink-0 rounded-md object-cover shadow-[0_0_18px_-6px_var(--gold)] ring-1 ring-border"
                          />
                        )}
                        <select
                          className={inputCls}
                          value={profile.country}
                          onChange={(e) => set("country", e.target.value)}
                        >
                          <option value="">—</option>
                          {COUNTRIES.map((c) => (
                            <option key={c} value={c}>
                              {countryFlagEmoji(c)} {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Field>
                  </div>
                </div>
              </div>

            </div>
          )}

          {step === 2 && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label={t("gpaScale")}>
                <select
                  className={inputCls}
                  value={profile.gpaScale}
                  onChange={(e) => set("gpaScale", e.target.value)}
                >
                  <option value="">—</option>
                  {GPA_SCALES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("gpa")}>
                <input
                  className={inputCls}
                  inputMode="decimal"
                  value={profile.gpa}
                  onChange={(e) => set("gpa", e.target.value)}
                  placeholder={
                    profile.gpaScale
                      ? `0 – ${GPA_SCALES.find((s) => s.id === profile.gpaScale)?.max}`
                      : "Select a scale first"
                  }
                />
              </Field>
              {profile.gpaScale && profile.gpa !== "" && !valid && (
                <p className="text-sm text-destructive sm:col-span-2">
                  Enter a value between 0 and{" "}
                  {GPA_SCALES.find((s) => s.id === profile.gpaScale)?.max}.
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute start-4 top-1/2 size-4 -translate-y-1/2 text-primary/70" />
                <input
                  className={cn(inputCls, "ps-11")}
                  value={majorQuery}
                  onChange={(e) => setMajorQuery(e.target.value)}
                  placeholder={t("searchMajors")}
                />
              </div>
              {profile.major && (
                <div
                  className="relative animate-fade-in overflow-hidden rounded-2xl border backdrop-blur-md transition-all"
                  style={{
                    borderColor: `color-mix(in oklab, ${majorTheme(profile.major).accent} 60%, transparent)`,
                    boxShadow: `0 0 42px -14px ${majorTheme(profile.major).accent}`,
                  }}
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      background: majorTheme(profile.major).background,
                      backgroundSize:
                        majorTheme(profile.major).id === "tech" ? "26px 26px" : undefined,
                    }}
                  />
                  <div className="relative flex flex-wrap items-center justify-between gap-3 p-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.28em] text-primary/80">
                        {majorTheme(profile.major).label}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-gilded">{profile.major}</p>
                    </div>
                    <Sparkles className="size-5 text-primary" />
                  </div>
                </div>
              )}
              <div className="max-h-72 space-y-1 overflow-y-auto rounded-2xl border border-border bg-velvet/40 p-2">
                {filteredMajors.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => selectMajor(m)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-start text-sm transition-all",
                      profile.major === m
                        ? "bg-primary/15 text-primary shadow-[0_0_26px_-10px_var(--gold)] ring-1 ring-primary/50 backdrop-blur-md"
                        : "hover:bg-secondary/70",
                    )}
                  >
                    <span>
                      <Highlight text={m} query={majorQuery.trim()} />
                    </span>
                    {profile.major === m && <Sparkles className="size-4" />}
                  </button>
                ))}
                {filteredMajors.length === 0 && (
                  <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                    No majors match “{majorQuery}”.
                  </p>
                )}
              </div>

            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() =>
                  set("regions", profile.regions.length === REGIONS.length ? [] : [...REGIONS])
                }
                className="rounded-full border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/10"
              >
                {t("selectAll")}
              </button>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {REGIONS.map((r) => {
                  const on = profile.regions.includes(r);
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => toggleRegion(r)}
                      className={cn(
                        "rounded-2xl border px-4 py-4 text-sm transition-all",
                        on
                          ? "border-primary bg-primary/15 text-primary shadow-[0_0_24px_-8px_var(--gold)]"
                          : "border-border bg-velvet/40 hover:border-primary/50",
                      )}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={() =>
                  setProfile((p) => ({
                    ...p,
                    noTests: !p.noTests,
                    activeTests: [],
                    tests: {},
                  }))
                }
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl border px-5 py-4 text-start text-sm transition-colors",
                  profile.noTests
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-velvet/40 hover:border-primary/50",
                )}
              >
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-md border transition-colors",
                    profile.noTests ? "border-primary bg-primary" : "border-border",
                  )}
                >
                  {profile.noTests && <span className="size-2 rounded-sm bg-primary-foreground" />}
                </span>
                <span>
                  None / No standardized test yet
                  <span className="block text-xs text-muted-foreground">
                    Continue without scores — matches will use academics and funding needs only.
                  </span>
                </span>
              </button>
              {TESTS.map((name) => {
                const on = profile.activeTests.includes(name);
                if (profile.noTests) return null;
                return (
                  <div
                    key={name}
                    className="overflow-hidden rounded-2xl border border-border bg-velvet/40"
                  >
                    <button
                      type="button"
                      onClick={() => toggleTest(name)}
                      className="flex w-full items-center justify-between px-5 py-4 text-sm"
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid size-5 place-items-center rounded-md border transition-colors",
                            on ? "border-primary bg-primary" : "border-border",
                          )}
                        >
                          {on && <span className="size-2 rounded-sm bg-primary-foreground" />}
                        </span>
                        {name}
                      </span>
                      <span className="text-xs text-muted-foreground">{TEST_RANGES[name]}</span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-all duration-300",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-border px-5 py-4">
                          <Field label={`${name} ${t("score")}`}>
                            <input
                              className={inputCls}
                              inputMode="decimal"
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

          {step === 6 && (
            <div className="rounded-2xl border border-primary/25 bg-[oklch(0.14_0.05_264)] p-4 font-mono">
              <div className="mb-3 flex items-center gap-2 text-xs text-primary/70">
                <span className="size-2 rounded-full bg-destructive/70" />
                <span className="size-2 rounded-full bg-primary/70" />
                <span className="size-2 rounded-full bg-accent/70" />
                <span className="ms-2 tracking-[0.2em]">leadership_profile.log</span>
              </div>
              <textarea
                rows={9}
                value={profile.extracurricular}
                onChange={(e) => set("extracurricular", e.target.value)}
                placeholder={t("extracurricular")}
                className="w-full resize-none bg-transparent font-mono text-sm text-accent outline-none placeholder:text-muted-foreground/60"
              />
              <p className="text-right text-xs text-muted-foreground">
                {profile.extracurricular.trim().length}/20 min {t("characters")}
              </p>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground">{t("needAid")}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setProfile((p) => ({
                        ...p,
                        needsAid: v,
                        aidTracks: v === "no" ? [] : p.aidTracks,
                      }))
                    }
                    className={cn(
                      "rounded-2xl border px-6 py-8 text-lg transition-all",
                      profile.needsAid === v
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-border bg-velvet/40 hover:border-primary/50",
                    )}
                  >
                    {v === "yes" ? t("yes") : t("no")}
                  </button>
                ))}
              </div>
              {profile.needsAid === "yes" && (
                <div className="grid gap-3">
                  {AID_TRACKS.map((track) => {
                    const on = profile.aidTracks.includes(track.id);
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() =>
                          set(
                            "aidTracks",
                            on
                              ? profile.aidTracks.filter((x) => x !== track.id)
                              : [...profile.aidTracks, track.id],
                          )
                        }
                        className={cn(
                          "rounded-2xl border p-5 text-start transition-all",
                          on
                            ? "border-primary bg-primary/10"
                            : "border-border bg-velvet/40 hover:border-primary/50",
                        )}
                      >
                        <p className="font-display text-xl text-primary">{track.title}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{track.detail}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {step === 8 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {INCOME_BRACKETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => set("income", b.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-10 text-lg transition-all",
                    profile.income === b.id
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border bg-velvet/40 hover:border-primary/50",
                  )}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}

          {step === 9 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {DIFFICULTY_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => set("difficulty", tier.id as DifficultyTier)}
                  className={cn(
                    "rounded-2xl border p-6 text-start transition-all",
                    profile.difficulty === tier.id
                      ? "border-primary bg-primary/15 shadow-[0_0_30px_-10px_var(--gold)]"
                      : "border-border bg-velvet/40 hover:border-primary/50",
                  )}
                >
                  <p className="font-display text-2xl text-primary">{tier.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{tier.note}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        <footer className="relative mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="glass inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ChevronLeft className="size-4 rtl:rotate-180" />
            {t("back")}
          </button>
          <button
            type="button"
            disabled={!valid}
            onClick={handleNext}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_10px_40px_-12px_var(--gold)] transition-all disabled:cursor-not-allowed disabled:opacity-35 disabled:shadow-none"
          >
            {step === TOTAL_STEPS ? t("submit") : t("next")}
            <ChevronRight className="size-4 rtl:rotate-180" />
          </button>
          {!user && (
            <p className="col-span-2 text-center text-xs text-muted-foreground">
              {t("authRequired")}
            </p>
          )}
        </footer>
      </div>
    </section>
  );
}