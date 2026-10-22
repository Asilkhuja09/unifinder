import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Loader2, Quote, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { MODEL_STORIES, STORY_FIELDS } from "@/data/studentStories";
import { cn } from "@/lib/utils";

type SharedStory = {
  id: string;
  display_name: string;
  major: string;
  university: string;
  admit_year: number | null;
  activities: string;
  essay_text: string;
};

const input =
  "mt-2 w-full rounded-xl border border-border bg-velvet/50 px-4 py-3 text-sm outline-none transition-colors focus:border-primary/60 focus:ring-2 focus:ring-ring";

export function StudentStories() {
  const { tt } = useI18n();
  const { user, requireAuth } = useAuth();

  const [field, setField] = useState<string | null>(null);
  const [shared, setShared] = useState<SharedStory[]>([]);

  const [name, setName] = useState("");
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");
  const [year, setYear] = useState("");
  const [activities, setActivities] = useState("");
  const [essay, setEssay] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { data } = await supabase
        .from("student_stories")
        .select("id, display_name, major, university, admit_year, activities, essay_text")
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(30);
      if (!cancelled && data) setShared(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const models = useMemo(
    () => MODEL_STORIES.filter((s) => field === null || s.field === field),
    [field],
  );

  const yearNum = year.trim() === "" ? null : Number(year);
  const yearOk = yearNum === null || (Number.isInteger(yearNum) && yearNum >= 2000 && yearNum <= new Date().getFullYear() + 1);
  const canSend =
    consent && university.trim().length > 1 && activities.trim().length >= 40 && yearOk && !busy;

  const submit = async () => {
    if (!requireAuth() || !user || !canSend) return;
    setBusy(true);
    const { error } = await supabase.from("student_stories").insert({
      user_id: user.id,
      display_name: name.trim(),
      major: major.trim(),
      university: university.trim(),
      admit_year: yearNum,
      activities: activities.trim(),
      essay_text: essay.trim(),
      consent_publish: true,
      status: "pending",
    });
    setBusy(false);
    if (error) {
      toast.error(tt("Could not send your story. Please try again later."));
      return;
    }
    setSent(true);
    toast.success(tt("Thank you. Your story will appear after review."));
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-14">
      <h1 className="font-display text-4xl text-gilded sm:text-5xl">{tt("Student Stories")}</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {tt("Learn what a strong activity list and essay opening look like, then share your own to help the next applicant.")}
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={tt("Filter by field")}>
        {[null, ...STORY_FIELDS].map((f) => (
          <button
            key={f ?? "all"}
            type="button"
            aria-pressed={field === f}
            onClick={() => setField(f)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
              field === f ? "border-primary bg-primary/15 text-primary" : "border-border hover:border-primary/50",
            )}
          >
            {f === null ? tt("All fields") : tt(f)}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="font-display text-2xl text-primary">{tt("Model examples")}</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          {tt("Written by UniFinder to teach. These are not real applicants and not real admission results.")}
        </p>
        <div className="mt-4 space-y-4">
          {models.map((s) => (
            <details key={s.id} className="glass group rounded-2xl p-5">
              <summary className="cursor-pointer list-none">
                <span className="rounded-full border border-primary/40 px-2.5 py-0.5 text-xs text-primary">
                  {tt("Example")}
                </span>
                <span className="ms-3 font-display text-xl">{tt(s.field)}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{tt(s.profile)}</span>
              </summary>
              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-primary">{tt("Activities")}</h3>
                  <ul className="mt-2 list-disc space-y-1.5 ps-5 text-sm text-muted-foreground">
                    {s.activities.map((a) => (
                      <li key={a}>{tt(a)}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-sm font-semibold text-primary">
                    <Quote className="size-4" /> {tt("Essay opening")}
                  </h3>
                  <blockquote className="mt-2 border-s-2 border-primary/50 ps-4 text-sm leading-relaxed">
                    {tt(s.excerpt)}
                  </blockquote>
                  <h3 className="mt-4 text-sm font-semibold text-primary">{tt("Why it works")}</h3>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    {s.whyItWorks.map((w) => (
                      <li key={w} className="flex gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                        {tt(w)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          ))}
        </div>
        <Link
          to="/essay"
          className="mt-4 inline-block text-sm text-primary underline-offset-4 hover:underline"
        >
          {tt("Check your own essay with the analyzer")}
        </Link>
      </div>

      {shared.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl text-primary">{tt("Shared by students")}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {tt("Published with the author's permission after review. UniFinder does not independently verify admission results.")}
          </p>
          <div className="mt-4 space-y-4">
            {shared.map((s) => (
              <details key={s.id} className="glass rounded-2xl p-5">
                <summary className="cursor-pointer list-none">
                  <span className="font-display text-xl">{s.university}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {s.display_name || tt("Anonymous student")}
                    {s.major ? ` · ${s.major}` : ""}
                    {s.admit_year ? ` · ${s.admit_year}` : ""}
                  </span>
                </summary>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{s.activities}</p>
                {s.essay_text && (
                  <blockquote className="mt-4 whitespace-pre-wrap border-s-2 border-primary/50 ps-4 text-sm leading-relaxed">
                    {s.essay_text}
                  </blockquote>
                )}
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="glass mt-12 rounded-2xl p-6">
        <h2 className="font-display text-2xl text-primary">{tt("Share your story")}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {tt("Were you admitted? Share your activities and essay so others can learn. We review every story before it appears, and you can ask us to remove it at any time.")}
        </p>

        {sent ? (
          <p className="mt-5 rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
            {tt("Thank you. Your story will appear after review.")}
          </p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-primary/90">
              {tt("Name to show (optional)")}
              <input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder={tt("Leave empty to stay anonymous")} />
            </label>
            <label className="block text-sm font-medium text-primary/90">
              {tt("Major")}
              <input className={input} value={major} onChange={(e) => setMajor(e.target.value)} />
            </label>
            <label className="block text-sm font-medium text-primary/90">
              {tt("University you were admitted to")}
              <input className={input} value={university} onChange={(e) => setUniversity(e.target.value)} />
            </label>
            <label className="block text-sm font-medium text-primary/90">
              {tt("Year of admission (optional)")}
              <input className={input} inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} placeholder="2026" />
            </label>
            <label className="block text-sm font-medium text-primary/90 sm:col-span-2">
              {tt("Your activities, awards and work")}
              <textarea className={cn(input, "resize-y")} rows={6} value={activities} onChange={(e) => setActivities(e.target.value)} />
              <span className="mt-1 block text-xs font-normal text-muted-foreground">{activities.trim().length}/40 {tt("minimum characters")}</span>
            </label>
            <label className="block text-sm font-medium text-primary/90 sm:col-span-2">
              {tt("Essay or essay excerpt (optional)")}
              <textarea className={cn(input, "resize-y")} rows={8} value={essay} onChange={(e) => setEssay(e.target.value)} />
            </label>
            <label className="flex items-start gap-3 text-sm sm:col-span-2">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 size-4 accent-[var(--gold)]" />
              <span>
                {tt("I wrote this myself and I allow UniFinder to publish it on this site after review. I can ask for removal at any time.")}
              </span>
            </label>
            <div className="sm:col-span-2">
              <button
                type="button"
                disabled={!canSend}
                onClick={() => void submit()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                {busy ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                {tt("Send for review")}
              </button>
              {!user && <p className="mt-2 text-xs text-muted-foreground">{tt("Sign in required to send a story.")}</p>}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
