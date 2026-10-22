import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Check, Loader2, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import type { Profile } from "@/lib/profile";
import type { University } from "@/data/extendedData";
import { buildRoadmapSteps, datePlan } from "@/lib/roadmap";
import { cn } from "@/lib/utils";

export type AppEntry = { id: string; name: string; date: string };

const inputCls =
  "w-full rounded-xl border border-border bg-velvet/50 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring";

/** Birth year, target application date and per-university application dates, kept in the account's own metadata. */
export function useProfileExtras() {
  const { user } = useAuth();
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const birthYear = typeof meta["birth_year"] === "number" ? (meta["birth_year"] as number) : null;
  const applyBy = typeof meta["apply_by"] === "string" ? (meta["apply_by"] as string) : "";
  const apps = useMemo<AppEntry[]>(() => {
    const raw = meta["applications"];
    if (!Array.isArray(raw)) return [];
    return raw
      .map((r) => (r ?? {}) as Record<string, unknown>)
      .filter((r) => typeof r["id"] === "string" && typeof r["date"] === "string")
      .map((r) => ({ id: String(r["id"]), name: String(r["name"] ?? ""), date: String(r["date"]) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user_metadata]);

  const update = async (patch: Record<string, unknown>) => {
    const { error } = await supabase.auth.updateUser({ data: patch });
    return error ? error.message : null;
  };
  return { user, birthYear, applyBy, apps, update };
}

function daysUntil(iso: string): number {
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86_400_000);
}

/** Name, country, birth year: the personal facts at the top of the profile. */
export function PersonalCard({ profile }: { profile: Profile }) {
  const { tt } = useI18n();
  const { user, birthYear, update } = useProfileExtras();
  const [year, setYear] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => setYear(birthYear ? String(birthYear) : ""), [birthYear]);

  const now = new Date().getFullYear();
  const n = Number(year);
  const ok = year === "" || (Number.isInteger(n) && n >= now - 70 && n <= now - 10);

  const save = async () => {
    if (!user || !ok) return;
    setBusy(true);
    const err = await update({ birth_year: year === "" ? null : n });
    setBusy(false);
    if (err) toast.error(err);
    else toast.success(tt("Saved"));
  };

  const rows = [
    { k: "First name", v: profile.firstName },
    { k: "Last name", v: profile.lastName },
    { k: "Country", v: profile.country },
    { k: "Intended major", v: profile.major },
  ];
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-display text-2xl text-primary">{tt("Personal details")}</h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((r) => (
          <div key={r.k} className="rounded-xl border border-border bg-velvet/40 p-3">
            <dt className="text-xs text-muted-foreground">{tt(r.k)}</dt>
            <dd className="mt-0.5 truncate text-sm">{r.v || "—"}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="block text-xs text-muted-foreground">
          {tt("Birth year")}
          <input
            className={cn(inputCls, "mt-1 w-32")}
            inputMode="numeric"
            value={year}
            disabled={!user}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2007"
          />
        </label>
        <button
          type="button"
          disabled={!user || !ok || busy}
          onClick={() => void save()}
          className="inline-flex items-center gap-2 rounded-xl border border-primary/50 px-4 py-2.5 text-sm text-primary transition-colors hover:bg-primary/10 disabled:opacity-40"
        >
          {busy ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {tt("Save")}
        </button>
        {!ok && <p className="text-xs text-destructive">{tt("Enter a valid birth year.")}</p>}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {tt("Name and country come from your profile. Change them in the Edit profile tab.")}
      </p>
    </div>
  );
}

/** Application dates per university, with a countdown. */
export function ApplicationsCard({ candidates }: { candidates: University[] }) {
  const { tt } = useI18n();
  const { user, apps, update } = useProfileExtras();
  const [uid, setUid] = useState("");
  const [date, setDate] = useState("");

  const sorted = [...apps].sort((a, b) => a.date.localeCompare(b.date));
  const options = candidates.filter((u) => !apps.some((a) => a.id === u.id));

  const persist = async (next: AppEntry[]) => {
    const err = await update({ applications: next });
    if (err) toast.error(err);
  };

  const add = async () => {
    const u = options.find((x) => x.id === uid);
    if (!u || !date) return;
    await persist([...apps, { id: u.id, name: u.name, date }]);
    setUid("");
    setDate("");
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="flex items-center gap-2 font-display text-2xl text-primary">
        <CalendarDays className="size-5" /> {tt("My application dates")}
      </h2>
      {sorted.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          {tt("Add the date you plan to submit each application. Pick a university from your saved list or latest matches.")}
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {sorted.map((a) => {
            const d = daysUntil(a.date);
            return (
              <li key={a.id} className="flex items-center gap-3 rounded-xl border border-border bg-velvet/40 px-4 py-2.5 text-sm">
                <span className="min-w-0 flex-1 truncate">{a.name}</span>
                <span className="shrink-0 text-xs text-muted-foreground">{a.date}</span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-0.5 text-xs tabular-nums",
                    d < 0 ? "bg-destructive/15 text-destructive" : d <= 30 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground",
                  )}
                >
                  {d < 0 ? tt("passed") : `${d} ${tt("days")}`}
                </span>
                <button
                  type="button"
                  aria-label={tt("Remove")}
                  onClick={() => void persist(apps.filter((x) => x.id !== a.id))}
                  className="shrink-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
      {user && options.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_11rem_auto]">
          <select className={inputCls} value={uid} onChange={(e) => setUid(e.target.value)} aria-label={tt("University")}>
            <option value="">{tt("Choose a university")}</option>
            {options.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} aria-label={tt("Application date")} />
          <button
            type="button"
            disabled={!uid || !date}
            onClick={() => void add()}
            className="rounded-xl bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
          >
            {tt("Add")}
          </button>
        </div>
      )}
      {!user && <p className="mt-3 text-xs text-muted-foreground">{tt("Sign in to save application dates.")}</p>}
    </div>
  );
}

const DONE_KEY = "uf_roadmap_done";

/** Personal step-by-step plan counted back from the application date. */
export function RoadmapTab({ profile }: { profile: Profile }) {
  const { tt } = useI18n();
  const { user, apps, applyBy, update } = useProfileExtras();
  const [done, setDone] = useState<string[]>([]);
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DONE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      setDone(Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : []);
    } catch {
      setDone([]);
    }
  }, []);
  useEffect(() => setDateInput(applyBy), [applyBy]);

  const earliestApp = [...apps].sort((a, b) => a.date.localeCompare(b.date))[0]?.date ?? "";
  const target = applyBy || earliestApp;

  const plan = useMemo(
    () => (target ? datePlan(buildRoadmapSteps(profile), new Date(target)) : []),
    [profile, target],
  );

  const toggle = (id: string) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    try {
      window.localStorage.setItem(DONE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const count = plan.filter((s) => done.includes(s.id)).length;
  const hasProfile = Boolean(profile.major || profile.gpa);

  return (
    <div className="mt-8 space-y-6">
      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-2xl text-primary">{tt("Your road to university")}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {tt("A step-by-step plan counted back from the day you want to submit. It changes with your profile: major, tests, activities and funding needs.")}
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="block text-xs text-muted-foreground">
            {tt("Submit my applications by")}
            <input type="date" className={cn(inputCls, "mt-1 w-48")} value={dateInput} onChange={(e) => setDateInput(e.target.value)} />
          </label>
          <button
            type="button"
            disabled={!user || !dateInput}
            onClick={() =>
              void update({ apply_by: dateInput }).then((err) => (err ? toast.error(err) : toast.success(tt("Saved"))))
            }
            className="rounded-xl bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-40"
          >
            {tt("Build my plan")}
          </button>
        </div>
        {!user && <p className="mt-2 text-xs text-muted-foreground">{tt("Sign in to save your plan.")}</p>}
        {!hasProfile && (
          <p className="mt-3 text-sm text-muted-foreground">
            {tt("Complete the")}{" "}
            <Link to="/assessment" className="text-accent underline">
              {tt("assessment")}
            </Link>{" "}
            {tt("to make the plan fit you.")}
          </p>
        )}
      </div>

      {plan.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-to-r from-gold-soft to-gold transition-[width] duration-500"
                style={{ width: `${(count / plan.length) * 100}%` }}
              />
            </div>
            <span className="text-xs tabular-nums text-muted-foreground">
              {count}/{plan.length}
            </span>
          </div>
          <ol className="relative space-y-3 border-s border-border ps-6">
            {plan.map((s) => {
              const finished = done.includes(s.id);
              const overdue = !finished && s.daysLeft < 0;
              const soon = !finished && s.daysLeft >= 0 && s.daysLeft <= 30;
              return (
                <li key={s.id} className="relative">
                  <span
                    className={cn(
                      "absolute -start-[1.95rem] top-4 size-3 rounded-full border-2 border-background",
                      finished ? "bg-emerald-400" : overdue ? "bg-destructive" : soon ? "bg-primary" : "bg-border",
                    )}
                  />
                  <div className={cn("glass rounded-2xl p-4 transition-opacity", finished && "opacity-60")}>
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        aria-pressed={finished}
                        aria-label={tt("Mark as done")}
                        onClick={() => toggle(s.id)}
                        className={cn(
                          "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border transition-colors",
                          finished ? "border-emerald-400 bg-emerald-400 text-black" : "border-border",
                        )}
                      >
                        {finished && <Check className="size-3" strokeWidth={3.5} />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className={cn("text-sm font-semibold", finished && "line-through")}>{tt(s.title)}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{tt(s.detail)}</p>
                        {s.link && (
                          <Link to={s.link} className="mt-2 inline-block text-xs text-primary underline-offset-4 hover:underline">
                            {tt("Open")}
                          </Link>
                        )}
                      </div>
                      <div className="shrink-0 text-end text-xs">
                        <p className="tabular-nums">{s.due.toISOString().slice(0, 10)}</p>
                        <p className={cn("mt-0.5", overdue ? "text-destructive" : soon ? "text-primary" : "text-muted-foreground")}>
                          {finished ? tt("done") : overdue ? tt("overdue") : `${s.daysLeft} ${tt("days")}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            {tt("This is a planning guide, not official advice. Every university and scholarship sets its own deadlines; confirm them on the official website.")}
          </p>
        </div>
      )}
    </div>
  );
}
