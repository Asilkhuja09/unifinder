import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, LogIn, MapPin, UserRound } from "lucide-react";
import { PageShell } from "@/components/unifinder/PageShell";
import { useAuth } from "@/lib/auth";
import { useFavorites } from "@/lib/favorites";
import { UNIVERSITIES } from "@/data/extendedData";

const title = "My Profile & Saved Universities — UniFinder Global";
const description =
  "Review your UniFinder Global account, manage your saved universities and jump back into the institutions you shortlisted.";

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

function ProfilePage() {
  const { user, hint, openGate } = useAuth();
  const { favorites, loading } = useFavorites();
  const email = user?.email ?? hint?.email ?? "";

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-16">
      <div className="glass flex flex-wrap items-center gap-5 rounded-3xl p-7">
        <span className="grid size-16 place-items-center rounded-2xl border border-primary/40 bg-velvet/70">
          <UserRound className="size-7 text-primary" />
        </span>
        <div>
          <h1 className="font-display text-3xl text-gilded">
            {(user?.user_metadata?.["full_name"] as string | undefined) ??
              email.split("@")[0] ??
              "Guest"}
          </h1>
          <p className="text-sm text-muted-foreground">{email || "Not signed in"}</p>
        </div>
        {!user && (
          <button
            onClick={openGate}
            className="ms-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-soft to-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            <LogIn className="size-4" /> Sign in
          </button>
        )}
      </div>

      <h2 className="mt-12 flex items-center gap-2 font-display text-2xl text-primary">
        <Heart className="size-5" /> My Saved Universities
      </h2>

      {loading && <p className="mt-4 text-sm text-muted-foreground">Loading your shortlist…</p>}

      {!loading && favorites.length === 0 && (
        <p className="mt-4 text-sm text-muted-foreground">
          No saved universities yet. Open the{" "}
          <Link to="/universities" className="text-accent underline">
            University Directory
          </Link>{" "}
          and tap the heart on any institution.
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {favorites.map((f) => {
          const u = UNIVERSITIES.find((x) => x.id === f.university_id);
          return (
            <article key={f.university_id} className="glass rounded-2xl p-5">
              <h3 className="font-display text-xl text-primary">{f.university_name}</h3>
              {u && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-3.5" /> {u.city}, {u.country}
                </p>
              )}
              {u && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Acceptance {u.acceptanceRate}% · Tuition ${u.tuitionUSD.toLocaleString()}
                  {u.worldRanking ? ` · World #${u.worldRanking}` : ""}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
