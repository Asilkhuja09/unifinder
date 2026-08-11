import { useState } from "react";
import { Loader2, ShieldCheck, X } from "lucide-react";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { ConstellationFX } from "./ConstellationFX";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.8 6.1C12.3 13.2 17.6 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.2 5.3-4.7 6.9l7.3 5.7c4.3-3.9 7.1-9.8 7.1-17.1z"
      />
      <path
        fill="#FBBC05"
        d="M10.4 28.7A14.5 14.5 0 0 1 9.6 24c0-1.6.3-3.2.8-4.7l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.8-6.1z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.3-5.7c-2 1.4-4.7 2.3-8.6 2.3-6.4 0-11.7-3.7-13.6-8.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.417 2.2-1.25 3.02-.99.99-2.09 1.56-3.28 1.47-.05-1.1.44-2.24 1.24-3.03.85-.85 2.2-1.46 3.29-1.46zm3.53 16.2c-.53 1.22-.79 1.77-1.47 2.85-.95 1.5-2.29 3.36-3.95 3.37-1.47.02-1.85-.96-3.85-.95-2 .01-2.42.97-3.89.95-1.66-.02-2.93-1.7-3.88-3.2C.29 16.4-.02 11.2 2.13 8.48c1.09-1.37 2.8-2.23 4.44-2.23 1.67 0 2.72.97 4.1.97 1.34 0 2.16-.97 4.09-.97 1.46 0 3.01.79 4.11 2.16-3.61 1.97-3.02 7.12.02 8.22z" />
    </svg>
  );
}

export function AuthDrawer() {
  const { gateOpen, closeGate } = useAuth();
  const { t } = useI18n();
  const [busy, setBusy] = useState<"google" | "apple" | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!gateOpen) return null;

  const signIn = async (provider: "google" | "apple") => {
    setErr(null);
    setBusy(provider);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(null);
      return setErr(String(result.error.message ?? result.error));
    }
    if ("redirected" in result && result.redirected) return;
    setBusy(null);
    closeGate();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-background/75 backdrop-blur-md sm:items-center"
      onClick={closeGate}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-md overflow-hidden rounded-t-3xl p-8 sm:rounded-3xl"
      >
        <ConstellationFX density={0.00016} />
        <div className="relative flex flex-col items-center text-center">
          <button
            onClick={closeGate}
            aria-label="Close"
            className="absolute end-0 top-0 rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          <span className="grid size-12 place-items-center rounded-2xl border border-primary/40 bg-velvet/70">
            <ShieldCheck className="size-5 text-primary" />
          </span>
          <h2 className="mt-4 font-display text-3xl text-gilded">{t("authTitle")}</h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("authSubtitle")}</p>

          <div className="mt-7 w-full space-y-3">
            <button
              onClick={() => void signIn("google")}
              disabled={busy !== null}
              className="glass flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors hover:border-primary/60 disabled:opacity-50"
            >
              {busy === "google" ? <Loader2 className="size-5 animate-spin" /> : <GoogleIcon />}
              {t("authGoogle")}
            </button>
            <button
              onClick={() => void signIn("apple")}
              disabled={busy !== null}
              className="glass flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-colors hover:border-primary/60 disabled:opacity-50"
            >
              {busy === "apple" ? <Loader2 className="size-5 animate-spin" /> : <AppleIcon />}
              Continue with Apple
            </button>
          </div>

          {err && <p className="mt-5 text-xs text-destructive">{err}</p>}
        </div>
      </div>
    </div>
  );
}
