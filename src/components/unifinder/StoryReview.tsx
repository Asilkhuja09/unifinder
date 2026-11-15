import { useCallback, useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";

type PendingStory = {
  id: string;
  display_name: string;
  major: string;
  university: string;
  admit_year: number | null;
  activities: string;
  essay_text: string;
};

/**
 * Review panel for site admins: approve or reject the stories students sent in.
 * It is only mounted for admins; the database also refuses to show or change other people's stories to anyone else.
 */
export function StoryReview({ onApproved }: { onApproved: () => void }) {
  const { tt } = useI18n();
  const [stories, setStories] = useState<PendingStory[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("student_stories")
      .select("id, display_name, major, university, admit_year, activities, essay_text")
      .eq("status", "pending")
      .order("created_at", { ascending: true });
    if (error) {
      console.error("[stories] review list failed", error);
      toast.error(tt("Could not load the stories to review."));
      setStories([]);
      return;
    }
    setStories(data ?? []);
  }, [tt]);

  useEffect(() => {
    void load();
    // Load once when the panel opens; `tt` changes with the language and must not reload the list.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const decide = async (id: string, status: "approved" | "rejected") => {
    setBusyId(id);
    // `.select()` returns the changed rows: an empty answer means the database did not allow the change.
    const { data, error } = await supabase.from("student_stories").update({ status }).eq("id", id).select("id");
    setBusyId(null);
    if (error || !data || data.length === 0) {
      if (error) console.error("[stories] review update failed", error);
      toast.error(tt("Could not update the story. Try again."));
      return;
    }
    setStories((list) => (list ?? []).filter((s) => s.id !== id));
    toast.success(status === "approved" ? tt("Story published.") : tt("Story rejected."));
    if (status === "approved") onApproved();
  };

  return (
    <div className="glass mt-8 rounded-2xl border border-primary/30 p-5">
      <h2 className="font-display text-2xl text-primary">{tt("Review submitted stories")}</h2>
      <p className="mt-1 text-xs text-muted-foreground">
        {tt("Only admins can see this panel.")}
        {stories !== null && stories.length > 0 ? ` ${tt("Waiting for review")}: ${stories.length}` : ""}
      </p>

      {stories === null && <Loader2 className="mt-4 size-5 animate-spin text-primary" aria-hidden="true" />}
      {stories !== null && stories.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">{tt("No stories are waiting for review.")}</p>
      )}

      <div className="mt-4 space-y-4">
        {(stories ?? []).map((s) => (
          <article key={s.id} className="rounded-xl border border-border p-4">
            <p className="font-display text-xl">{s.university}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {s.display_name || tt("Anonymous student")}
              {s.major ? ` · ${s.major}` : ""}
              {s.admit_year ? ` · ${s.admit_year}` : ""}
            </p>
            <h3 className="mt-3 text-sm font-semibold text-primary">{tt("Activities")}</h3>
            <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{s.activities}</p>
            {s.essay_text && (
              <>
                <h3 className="mt-3 text-sm font-semibold text-primary">{tt("Essay")}</h3>
                <p className="mt-1 whitespace-pre-wrap border-s-2 border-primary/50 ps-3 text-sm leading-relaxed">
                  {s.essay_text}
                </p>
              </>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled={busyId !== null}
                onClick={() => void decide(s.id, "approved")}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold px-4 py-2 text-sm font-semibold text-primary-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
              >
                {busyId === s.id ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
                {tt("Approve")}
              </button>
              <button
                type="button"
                disabled={busyId !== null}
                onClick={() => void decide(s.id, "rejected")}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm outline-none transition-colors hover:border-destructive hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
              >
                <X className="size-4" />
                {tt("Reject")}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
