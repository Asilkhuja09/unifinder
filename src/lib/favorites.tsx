import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
  const [favorites, setFavorites] = useState<FavoriteRow[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase
      .from("university_favorites")
      .select("university_id, university_name, created_at")
      .order("created_at", { ascending: false });
    setFavorites(data ?? []);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const ids = useMemo(() => new Set(favorites.map((f) => f.university_id)), [favorites]);

  const toggle = useCallback(
    async (id: string, name: string) => {
      if (!requireAuth()) return;
      if (!user) return;
      if (ids.has(id)) {
        setFavorites((f) => f.filter((x) => x.university_id !== id));
        await supabase.from("university_favorites").delete().eq("university_id", id);
      } else {
        setFavorites((f) => [
          { university_id: id, university_name: name, created_at: new Date().toISOString() },
          ...f,
        ]);
        await supabase
          .from("university_favorites")
          .insert({ user_id: user.id, university_id: id, university_name: name });
      }
    },
    [ids, requireAuth, user],
  );

  const value = useMemo(() => ({ favorites, ids, loading, toggle }), [favorites, ids, loading, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFavorites must be used inside FavoritesProvider");
  return ctx;
}
