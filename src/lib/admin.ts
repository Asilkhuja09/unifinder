import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";

/**
 * Whether the signed-in visitor is a site admin. This only decides what the page shows: what an admin
 * may actually read or change is enforced by the database (row-level security on `student_stories`
 * and `user_roles`), so a visitor who edits this value in the browser gets an empty list and refused writes.
 */
export function useIsAdmin(): boolean {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsAdmin(false);
    if (!userId) return;
    void supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) console.error("[admin] role check failed", error);
        setIsAdmin(Boolean(data));
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  return isAdmin;
}
