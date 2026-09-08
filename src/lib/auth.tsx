import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type Context,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

const COOKIE = "uf_session";

/** Secure client-side cookie engine: tracks only non-sensitive session metadata. */
export const sessionCookie = {
  read(): { uid: string; email: string; exp: number } | null {
    if (typeof document === "undefined") return null;
    const raw = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE}=`))
      ?.slice(COOKIE.length + 1);
    if (!raw) return null;
    try {
      return JSON.parse(decodeURIComponent(raw));
    } catch {
      return null;
    }
  },
  write(session: Session) {
    if (typeof document === "undefined") return;
    const payload = encodeURIComponent(
      JSON.stringify({
        uid: session.user.id,
        email: session.user.email ?? "",
        exp: session.expires_at ?? 0,
      }),
    );
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${COOKIE}=${payload}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Strict${secure}`;
  },
  clear() {
    if (typeof document === "undefined") return;
    document.cookie = `${COOKIE}=; Path=/; Max-Age=0; SameSite=Strict`;
  },
};

type AuthCtx = {
  user: User | null;
  loading: boolean;
  /** cookie-hinted identity available before the async re-auth resolves */
  hint: { uid: string; email: string } | null;
  requireAuth: () => boolean;
  gateOpen: boolean;
  openGate: () => void;
  closeGate: () => void;
  signOut: () => Promise<void>;
  /** true right after a fresh sign-in, until the welcome animation completes */
  welcoming: boolean;
  dismissWelcome: () => void;
};

// Cached on globalThis so a hot-reload of this module cannot create a second
// context instance (which would make consumers see an empty provider).
const g = globalThis as typeof globalThis & {
  __uf_auth_ctx?: React.Context<AuthCtx | null>;
};
const Ctx: React.Context<AuthCtx | null> =
  g.__uf_auth_ctx ?? (g.__uf_auth_ctx = createContext<AuthCtx | null>(null));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [gateOpen, setGateOpen] = useState(false);
  const [hint, setHint] = useState<{ uid: string; email: string } | null>(null);
  const [welcoming, setWelcoming] = useState(false);

  useEffect(() => {
    setHint(sessionCookie.read());

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session) {
        sessionCookie.write(session);
        setGateOpen(false);
        if (_event === "SIGNED_IN") setWelcoming(true);
      } else if (_event === "SIGNED_OUT") {
        sessionCookie.clear();
        setHint(null);
      }
      setLoading(false);
    });

    // Asynchronous re-authentication of the persisted session on cold start.
    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) console.error("[auth] getSession failed", error);
        setUser(data.session?.user ?? null);
        if (data.session) sessionCookie.write(data.session);
      })
      .catch((e) => console.error("[auth] getSession threw", e))
      .finally(() => setLoading(false));

    return () => sub.subscription.unsubscribe();
  }, []);

  const openGate = useCallback(() => setGateOpen(true), []);
  const closeGate = useCallback(() => setGateOpen(false), []);

  const requireAuth = useCallback(() => {
    if (user) return true;
    setGateOpen(true);
    return false;
  }, [user]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    sessionCookie.clear();
    setHint(null);
    setWelcoming(false);
  }, []);

  const dismissWelcome = useCallback(() => setWelcoming(false), []);

  const value = useMemo(
    () => ({
      user,
      loading,
      hint,
      requireAuth,
      gateOpen,
      openGate,
      closeGate,
      signOut,
      welcoming,
      dismissWelcome,
    }),
    [
      user,
      loading,
      hint,
      requireAuth,
      gateOpen,
      openGate,
      closeGate,
      signOut,
      welcoming,
      dismissWelcome,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}