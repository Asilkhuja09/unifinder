import { useState } from "react";
import { Loader2, Mail, ShieldCheck, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { ConstellationFX } from "./ConstellationFX";

export function AuthDrawer() {
  const { gateOpen, closeGate } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [phase, setPhase] = useState<"email" | "code">("email");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  if (!gateOpen) return null;

  const sendCode = async () => {
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/` },
    });
    setBusy(false);
    if (error) return setErr(error.message);
    setPhase("code");
    setMsg(t("authCodeSent"));
  };

  const verify = async () => {
    setErr(null);
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setBusy(false);
    if (error) return setErr(error.message);
    closeGate();
  };

  const google = async () => {
    setErr(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return setErr(String(result.error.message ?? result.error));
    if (!("redirected" in result && result.redirected)) closeGate();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-background/75 backdrop-blur-md sm:items-center"
      onClick={closeGate}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass relative w-full max-w-md overflow-hidden rounded-t-3xl p-7 sm:rounded-3xl"
      >
        <ConstellationFX density={0.00016} />
        <div className="relative">
          <button
            onClick={closeGate}
            aria-label="Close"
            className="absolute end-0 top-0 rounded-full border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
          <span className="grid size-11 place-items-center rounded-xl border border-primary/40 bg-velvet/70">
            <ShieldCheck className="size-5 text-primary" />
          </span>
          <h2 className="mt-4 font-display text-3xl text-gilded">{t("authTitle")}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t("authSubtitle")}</p>

          <button
            onClick={google}
            className="glass mt-6 flex w-full items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:border-primary/60"
          >
            <svg viewBox="0 0 48 48" className="size-4" aria-hidden>
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
            {t("authGoogle")}
          </button>

          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {t("authOr")}
            <span className="h-px flex-1 bg-border" />
          </div>

          {phase === "email" ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-border bg-velvet/60 px-3">
                <Mail className="size-4 text-primary/80" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </div>
              <button
                disabled={busy || !/^\S+@\S+\.\S+$/.test(email.trim())}
                onClick={sendCode}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                {busy && <Loader2 className="size-4 animate-spin" />}
                {t("authSendCode")}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="••••••"
                className="w-full rounded-xl border border-border bg-velvet/60 py-3 text-center font-display text-2xl tracking-[0.6em] outline-none"
              />
              <button
                disabled={busy || code.length !== 6}
                onClick={verify}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-soft to-gold py-3 text-sm font-semibold text-primary-foreground disabled:opacity-40"
              >
                {busy && <Loader2 className="size-4 animate-spin" />}
                {t("authVerify")}
              </button>
              <button
                onClick={() => {
                  setPhase("email");
                  setCode("");
                  setMsg(null);
                }}
                className="w-full text-xs text-muted-foreground hover:text-primary"
              >
                {t("authChangeEmail")}
              </button>
            </div>
          )}

          {msg && <p className="mt-4 text-xs text-accent">{msg}</p>}
          {err && <p className="mt-4 text-xs text-destructive">{err}</p>}
        </div>
      </div>
    </div>
  );
}