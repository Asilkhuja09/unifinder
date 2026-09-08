import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Heart,
  LogIn,
  LogOut,
  MapPin,
  Save,
  Trash2,
  Upload,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/unifinder/PageShell";
import { useAuth } from "@/lib/auth";
import { useFavorites } from "@/lib/favorites";
import { useStudentProfile, useTranscripts, type TranscriptRow } from "@/lib/student-profile";
import { matchUniversities } from "@/lib/matching";
import {
  DIFFICULTY_TIERS,
  INCOME_BRACKETS,
  REGIONS,
  TESTS,
  TEST_RANGES,
  UNIVERSITIES,
  type DifficultyTier,
  type Region,
  type TestName,
} from "@/data/extendedData";

const title = "Student Profile & Dashboard — UniFinder Global";
const description =
  "Edit your admissions profile, upload transcripts and track your personalised university matches and saved institutions on UniFinder Global.";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <PageShell>
      <ProfilePage />
    </PageShell>
  ),
});

type Tab = "dashboard" | "edit" | "transcripts";

const field =
  "w-full rounded-xl border border-border/70 bg-background/40 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary/70";
const label = "mb-1.5 block text-xs uppercase tracking-[0.18em] text-muted-foreground";

function ProfilePage() {
  const { user, hint, openGate, signOut } = useAuth();
  const { favorites, loading: favLoading } = useFavorites();
  const { profile, setProfile, loading, saving, save } = useStudentProfile();
  const [tab, setTab] = useState<Tab>("dashboard");

  const email = user?.email ?? hint?.email ?? "";
  const displayName =
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    (user?.user_metadata?.["full_name"] as string | undefined) ||
    email.split("@")[0] ||
    "Guest";

  const result = useMemo(() => {
    if (!profile.major && !profile.gpa && profile.regions.length === 0) return null;
    try {
      return matchUniversities(profile);
    } catch {
      return null;
    }
  }, [profile]);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-14">
      <div className="glass flex flex-wrap items-center gap-5 rounded-3xl p-7">
        <span className="grid size-16 place-items-center rounded-2xl border border-primary/40 bg-velvet/70">
          <UserRound className="size-7 text-primary" />
        </span>
        <div className="min-w-0">
          <h1 className="truncate font-display text-3xl text-gilded">{displayName}</h1>
          <p className="truncate text-sm text-muted-foreground">{email || "Not signed in"}</p>
        </div>
        <div className="ms-auto flex flex-wrap items-center gap-2">
          {user ? (
            <button
              onClick={() => void signOut()}
              className="glass flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-colors hover:border-primary/60 hover:text-primary"
            >
              <LogOut className="size-4" /> Sign out
            </button>
          ) : (
            <button
              onClick={openGate}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <LogIn className="size-4" /> Sign in
            </button>
          )}
        </div>
      </div>

      {!user && (
        <p className="mt-6 text-sm text-muted-foreground">
          Sign in to edit your profile, upload transcripts and keep your shortlist across devices.
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-2">
        {(
          [
            ["dashboard", "Dashboard"],
            ["edit", "Edit profile"],
            ["transcripts", "Transcripts"],
          ] as const
        ).map(([id, text]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-full px-5 py-2 text-sm transition-all ${
              tab === id
                ? "border border-primary/60 bg-primary/15 text-primary"
                : "glass text-muted-foreground hover:text-primary"
            }`}
          >
            {text}
          </button>
        ))}
      </div>

      {tab === "dashboard" && (
        <Dashboard
          loading={loading}
          result={result}
          favorites={favorites}
          favLoading={favLoading}
        />
      )}

      {tab === "edit" && (
        <EditProfile
          profile={profile}
          setProfile={setProfile}
          disabled={!user}
          saving={saving}
          onSave={async (p) => {
            const { error } = await save(p);
            if (error) toast.error(error);
            else toast.success("Profile saved");
          }}
        />
      )}

      {tab === "transcripts" && <Transcripts disabled={!user} />}
    </section>
  );
}

function Dashboard({
  loading,
  result,
  favorites,
  favLoading,
}: {
  loading: boolean;
  result: ReturnType<typeof matchUniversities> | null;
  favorites: { university_id: string; university_name: string }[];
  favLoading: boolean;
}) {
  const top = result?.matches.slice(0, 6) ?? [];
  return (
    <div className="mt-8 space-y-12">
      <div>
        <h2 className="font-display text-2xl text-primary">Profile strength</h2>
        {loading && <p className="mt-3 text-sm text-muted-foreground">Loading your profile…</p>}
        {!loading && !result && (
          <p className="mt-3 text-sm text-muted-foreground">
            Fill in the <span className="text-accent">Edit profile</span> tab (or complete the{" "}
            <Link to="/assessment" className="text-accent underline">
              assessment
            </Link>
            ) to unlock your personalised matches.
          </p>
        )}
        {result && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { k: "Overall", v: result.profileScore.total },
              { k: "Academics", v: result.profileScore.academics },
              { k: "Testing", v: result.profileScore.testing },
              { k: "Activities", v: result.profileScore.activities },
            ].map((s) => (
              <div key={s.k} className="glass rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.k}</p>
                <p className="mt-2 font-display text-3xl text-gilded">{s.v}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {top.length > 0 && (
        <div>
          <h2 className="font-display text-2xl text-primary">Your top matches</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {top.map((m) => (
              <article key={m.university.id} className="glass rounded-2xl p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg text-primary">{m.university.name}</h3>
                  <span className="shrink-0 rounded-full border border-primary/40 px-3 py-1 text-xs text-primary">
                    {m.score}%
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {m.university.city}, {m.university.country} ·{" "}
                  <span className="capitalize">{m.category}</span>
                </p>
                <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                  {m.reasons.map((r) => (
                    <li key={r}>• {r}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="flex items-center gap-2 font-display text-2xl text-primary">
          <Heart className="size-5" /> Saved universities
        </h2>
        {favLoading && <p className="mt-3 text-sm text-muted-foreground">Loading your shortlist…</p>}
        {!favLoading && favorites.length === 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            No saved universities yet. Open the{" "}
            <Link to="/universities" className="text-accent underline">
              University Directory
            </Link>{" "}
            and tap the heart on any institution.
          </p>
        )}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {favorites.map((f) => {
            const u = UNIVERSITIES.find((x) => x.id === f.university_id);
            return (
              <article key={f.university_id} className="glass rounded-2xl p-5">
                <h3 className="font-display text-xl text-primary">{f.university_name}</h3>
                {u && (
                  <>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="size-3.5" /> {u.city}, {u.country}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Acceptance {u.acceptanceRate}% · Tuition ${u.tuitionUSD.toLocaleString()}
                      {u.worldRanking ? ` · World #${u.worldRanking}` : ""}
                    </p>
                  </>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EditProfile({
  profile,
  setProfile,
  disabled,
  saving,
  onSave,
}: {
  profile: ReturnType<typeof useStudentProfile>["profile"];
  setProfile: ReturnType<typeof useStudentProfile>["setProfile"];
  disabled: boolean;
  saving: boolean;
  onSave: (p: ReturnType<typeof useStudentProfile>["profile"]) => void;
}) {
  const set = <K extends keyof typeof profile>(k: K, v: (typeof profile)[K]) =>
    setProfile({ ...profile, [k]: v });

  const toggleRegion = (r: Region) =>
    set(
      "regions",
      profile.regions.includes(r)
        ? profile.regions.filter((x) => x !== r)
        : [...profile.regions, r],
    );

  return (
    <form
      className="mt-8 space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(profile);
      }}
    >
      <fieldset disabled={disabled} className="space-y-8 disabled:opacity-60">
        <div className="glass grid gap-5 rounded-3xl p-6 sm:grid-cols-2">
          <div>
            <label className={label}>First name</label>
            <input
              className={field}
              value={profile.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              placeholder="Alex"
            />
          </div>
          <div>
            <label className={label}>Last name</label>
            <input
              className={field}
              value={profile.lastName}
              onChange={(e) => set("lastName", e.target.value)}
              placeholder="Morgan"
            />
          </div>
          <div>
            <label className={label}>Country of residence</label>
            <input
              className={field}
              value={profile.country}
              onChange={(e) => set("country", e.target.value)}
              placeholder="Uzbekistan"
            />
          </div>
          <div>
            <label className={label}>Intended major</label>
            <input
              className={field}
              value={profile.major}
              onChange={(e) => set("major", e.target.value)}
              placeholder="Computer Science"
            />
          </div>
          <div>
            <label className={label}>GPA</label>
            <input
              className={field}
              value={profile.gpa}
              onChange={(e) => set("gpa", e.target.value)}
              placeholder="3.8"
            />
          </div>
          <div>
            <label className={label}>GPA scale</label>
            <select
              className={field}
              value={profile.gpaScale}
              onChange={(e) => set("gpaScale", e.target.value)}
            >
              <option value="">Select scale</option>
              <option value="4.0">4.0</option>
              <option value="5.0">5.0</option>
              <option value="10.0">10.0</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <p className={label}>Target regions</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map((r) => (
              <button
                type="button"
                key={r}
                onClick={() => toggleRegion(r)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  profile.regions.includes(r)
                    ? "border border-primary/60 bg-primary/15 text-primary"
                    : "border border-border/70 text-muted-foreground hover:text-primary"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className={`${label} mb-0`}>Test scores</p>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={profile.noTests}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    noTests: e.target.checked,
                    ...(e.target.checked ? { tests: {}, activeTests: [] } : {}),
                  })
                }
              />
              No standardized test yet
            </label>
          </div>
          {!profile.noTests && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {TESTS.map((t: TestName) => (
                <div key={t}>
                  <label className={label}>
                    {t} <span className="normal-case tracking-normal">({TEST_RANGES[t]})</span>
                  </label>
                  <input
                    className={field}
                    value={profile.tests[t] ?? ""}
                    onChange={(e) => {
                      const tests = { ...profile.tests };
                      if (e.target.value) tests[t] = e.target.value;
                      else delete tests[t];
                      setProfile({
                        ...profile,
                        tests,
                        activeTests: Object.keys(tests) as TestName[],
                      });
                    }}
                    placeholder="—"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass grid gap-5 rounded-3xl p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Extracurriculars & leadership</label>
            <textarea
              className={`${field} min-h-28`}
              value={profile.extracurricular}
              onChange={(e) => set("extracurricular", e.target.value)}
              placeholder="Olympiads, volunteering, research, clubs, leadership roles…"
            />
          </div>
          <div>
            <label className={label}>Need financial aid?</label>
            <select
              className={field}
              value={profile.needsAid}
              onChange={(e) => set("needsAid", e.target.value as "yes" | "no" | "")}
            >
              <option value="">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label className={label}>Annual family budget</label>
            <select
              className={field}
              value={profile.income}
              onChange={(e) => set("income", e.target.value)}
            >
              <option value="">Select</option>
              {INCOME_BRACKETS.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Admissions difficulty tier</label>
            <select
              className={field}
              value={profile.difficulty}
              onChange={(e) => set("difficulty", e.target.value as DifficultyTier | "")}
            >
              <option value="">Select</option>
              {DIFFICULTY_TIERS.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.label} — {d.note}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          <Save className="size-4" /> {saving ? "Saving…" : "Save profile"}
        </button>
      </fieldset>
    </form>
  );
}

function Transcripts({ disabled }: { disabled: boolean }) {
  const { files, loading, uploading, upload, remove, openFile } = useTranscripts();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onPick = async (file: File | undefined) => {
    if (!file) return;
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File is larger than 20 MB");
      return;
    }
    const { error } = await upload(file);
    if (error) toast.error(error);
    else toast.success(`${file.name} uploaded`);
  };

  return (
    <div className="mt-8">
      <div className="glass rounded-3xl p-7 text-center">
        <FileText className="mx-auto size-8 text-primary" />
        <h2 className="mt-3 font-display text-2xl text-primary">Transcripts & documents</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          PDF, image or Word files up to 20 MB. Only you can see these.
        </p>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => {
            void onPick(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
        <button
          disabled={disabled || uploading}
          onClick={() => inputRef.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          <Upload className="size-4" /> {uploading ? "Uploading…" : "Upload transcript"}
        </button>
        {disabled && <p className="mt-3 text-xs text-muted-foreground">Sign in to upload files.</p>}
      </div>

      {loading && <p className="mt-6 text-sm text-muted-foreground">Loading your documents…</p>}

      <div className="mt-6 space-y-3">
        {files.map((f: TranscriptRow) => (
          <div key={f.id} className="glass flex items-center gap-4 rounded-2xl px-5 py-4">
            <FileText className="size-5 shrink-0 text-primary" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{f.file_name}</p>
              <p className="text-xs text-muted-foreground">
                {(f.size_bytes / 1024).toFixed(0)} KB · {new Date(f.created_at).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => void openFile(f)}
              className="rounded-full border border-border/70 px-4 py-1.5 text-xs transition-colors hover:border-primary/60 hover:text-primary"
            >
              View
            </button>
            <button
              onClick={() => void remove(f)}
              aria-label={`Delete ${f.file_name}`}
              className="rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:border-destructive/60 hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
