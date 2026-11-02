import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

export type FavoriteRow = {
  university_id: string;
  university_name: string;
  created_at: string;
};

type FavCtx = {
  favorites: FavoriteRow[];
  ids: Set<string>;
  loading: boolean;
  toggle: (id: string, name: string) => Promise<void>;
};

const Ctx = createContext<FavCtx | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user, requireAuth } = useAuth();
  // Keyed on the id, not the user object: that object is replaced on every token refresh and every
  // time a phone browser returns to the tab, which would reload the list each time.
  const userId = user?.id ?? null;
  const [favorites, setFavorites] = useState<FavoriteRow[]>([]);
  const [loading, setLoading] = useState(false);
  // Only the newest request may write the list, so a slow answer for the previous account is dropped.
  const requestRef = useRef(0);

  const load = useCallback(async () => {
    const request = ++requestRef.current;
    if (!userId) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("university_favorites")
      .select("university_id, university_name, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (request !== requestRef.current) return;
    if (error) console.error("[favorites] load failed", error);
    setFavorites(data ?? []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    // Another account must not see the previous account's list while its own loads.
    setFavorites([]);
    void load();
  }, [load]);

  const ids = useMemo(() => new Set(favorites.map((f) => f.university_id)), [favorites]);

  const toggle = useCallback(
    async (id: string, name: string) => {
      if (!requireAuth()) return;
      if (!userId) return;
      const removing = ids.has(id);
      // Show the change at once, then undo it if the server refuses.
      if (removing) {
        setFavorites((f) => f.filter((x) => x.university_id !== id));
      } else {
        setFavorites((f) => [
          { university_id: id, university_name: name, created_at: new Date().toISOString() },
          ...f,
        ]);
      }
      const { error } = removing
        ? await supabase
            .from("university_favorites")
            .delete()
            .eq("user_id", userId)
            .eq("university_id", id)
        : await supabase
            .from("university_favorites")
            .insert({ user_id: userId, university_id: id, university_name: name });
      if (error) {
        console.error("[favorites] toggle failed", error);
        void load();
      }
    },
    [ids, load, requireAuth, userId],
  );

  const value = useMemo(() => ({ favorites, ids, loading, toggle }), [favorites, ids, loading, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
