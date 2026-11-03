import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { emptyProfile, type Profile } from "@/lib/profile";
import type { DifficultyTier, Region, TestName } from "@/data/extendedData";

export type TranscriptRow = {
  id: string;
  file_name: string;
  storage_path: string;
  size_bytes: number;
  created_at: string;
};

type Row = {
  first_name: string;
  last_name: string;
  country: string;
  gpa: string;
  gpa_scale: string;
  major: string;
  regions: unknown;
  tests: unknown;
  no_tests: boolean;
  extracurricular: string;
  needs_aid: string;
  income: string;
  difficulty: string;
};

function rowToProfile(row: Row): Profile {
  const tests = (row.tests ?? {}) as Partial<Record<TestName, string>>;
  return {
    ...emptyProfile,
    firstName: row.first_name,
    lastName: row.last_name,
    country: row.country,
    gpa: row.gpa,
    gpaScale: row.gpa_scale,
    major: row.major,
    regions: (Array.isArray(row.regions) ? row.regions : []) as Region[],
    tests,
    activeTests: Object.keys(tests) as TestName[],
    noTests: row.no_tests,
    extracurricular: row.extracurricular,
    needsAid: (row.needs_aid === "yes" || row.needs_aid === "no" ? row.needs_aid : "") as
      | "yes"
      | "no"
      | "",
    income: row.income,
    difficulty: (row.difficulty || "") as DifficultyTier | "",
  };
}

function profileToRow(p: Profile, userId: string) {
  return {
    user_id: userId,
    first_name: p.firstName,
    last_name: p.lastName,
    country: p.country,
    gpa: p.gpa,
    gpa_scale: p.gpaScale,
    major: p.major,
    regions: p.regions,
    tests: p.tests,
    no_tests: p.noTests,
    extracurricular: p.extracurricular,
    needs_aid: p.needsAid,
    income: p.income,
    difficulty: p.difficulty,
  };
}

export function useStudentProfile() {
  const { user } = useAuth();
  // Key everything on the id: the user object is replaced on every token refresh and every time a
  // phone browser returns to the tab, and reloading then would wipe what the student is typing.
  const userId = user?.id ?? null;
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!userId) {
      setProfile(emptyProfile);
      setLoading(false);
      return;
    }
    // A different account must never inherit the previous account's profile.
    setProfile(emptyProfile);
    setLoading(true);
    void supabase
      .from("student_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("[profile] load failed", error);
        setProfile(data ? rowToProfile(data as unknown as Row) : emptyProfile);
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const save = useCallback(
    async (next: Profile) => {
      if (!userId) return { error: "Not signed in" };
      setSaving(true);
      const { error } = await supabase
        .from("student_profiles")
        .upsert(profileToRow(next, userId), { onConflict: "user_id" });
      setSaving(false);
      if (error) {
        console.error("[profile] save failed", error);
        return { error: error.message };
      }
      setProfile(next);
      return {};
    },
    [userId],
  );

  return { profile, setProfile, loading, saving, save };
}

export function useTranscripts() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [files, setFiles] = useState<TranscriptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const refresh = useCallback(async () => {
    if (!userId) {
      setFiles([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("transcripts")
      .select("id, file_name, storage_path, size_bytes, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) console.error("[transcripts] load failed", error);
    setFiles((data ?? []) as TranscriptRow[]);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const upload = useCallback(
    async (file: File) => {
      if (!userId) return { error: "Not signed in" };
      setUploading(true);
      const path = `${userId}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("transcripts").upload(path, file);
      if (upErr) {
        setUploading(false);
        return { error: upErr.message };
      }
      const { error } = await supabase.from("transcripts").insert({
        user_id: userId,
        file_name: file.name,
        storage_path: path,
        size_bytes: file.size,
      });
      setUploading(false);
      if (error) return { error: error.message };
      await refresh();
      return {};
    },
    [refresh, userId],
  );

  const remove = useCallback(
    async (row: TranscriptRow) => {
      await supabase.storage.from("transcripts").remove([row.storage_path]);
      await supabase.from("transcripts").delete().eq("id", row.id);
      setFiles((f) => f.filter((x) => x.id !== row.id));
    },
    [],
  );

  const openFile = useCallback(async (row: TranscriptRow) => {
    const { data, error } = await supabase.storage
      .from("transcripts")
      .createSignedUrl(row.storage_path, 60);
    if (error || !data) return { error: error?.message ?? "Could not open file" };
    window.open(data.signedUrl, "_blank", "noopener");
    return {};
  }, []);

  return { files, loading, uploading, upload, remove, openFile, refresh };
}
