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
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!user) {
      setProfile(emptyProfile);
      setLoading(false);
      return;
    }
    setLoading(true);
    void supabase
      .from("student_profiles")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("[profile] load failed", error);
        if (data) setProfile(rowToProfile(data as unknown as Row));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const save = useCallback(
    async (next: Profile) => {
      if (!user) return { error: "Not signed in" };
      setSaving(true);
      const { error } = await supabase
        .from("student_profiles")
        .upsert(profileToRow(next, user.id), { onConflict: "user_id" });
      setSaving(false);
      if (error) {
        console.error("[profile] save failed", error);
        return { error: error.message };
      }
      setProfile(next);
      return {};
    },
    [user],
  );

  return { profile, setProfile, loading, saving, save };
}

export function useTranscripts() {
  const { user } = useAuth();
  const [files, setFiles] = useState<TranscriptRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setFiles([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("transcripts")
      .select("id, file_name, storage_path, size_bytes, created_at")
      .order("created_at", { ascending: false });
    if (error) console.error("[transcripts] load failed", error);
    setFiles((data ?? []) as TranscriptRow[]);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const upload = useCallback(
    async (file: File) => {
      if (!user) return { error: "Not signed in" };
      setUploading(true);
      const path = `${user.id}/${Date.now()}-${file.name.replace(/[^\w.\-]+/g, "_")}`;
      const { error: upErr } = await supabase.storage.from("transcripts").upload(path, file);
      if (upErr) {
        setUploading(false);
        return { error: upErr.message };
      }
      const { error } = await supabase.from("transcripts").insert({
        user_id: user.id,
        file_name: file.name,
        storage_path: path,
        size_bytes: file.size,
      });
      setUploading(false);
      if (error) return { error: error.message };
      await refresh();
      return {};
    },
    [refresh, user],
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
