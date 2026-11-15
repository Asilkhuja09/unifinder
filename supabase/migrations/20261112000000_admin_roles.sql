-- Admin role: lets the site owner review student stories on the Stories page.
-- Roles live in their own table, never on the profile. Nobody can grant a role from the website:
-- only the database owner can insert a row, and a signed-in user can read only their own rows.
-- Safe to run more than once.

CREATE TABLE IF NOT EXISTS public.user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.user_roles FROM anon, authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
DROP POLICY IF EXISTS "Users read their own roles" ON public.user_roles;
CREATE POLICY "Users read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- SECURITY DEFINER so a policy on another table can look at user_roles without recursing into its RLS.
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
REVOKE ALL ON FUNCTION public.has_role(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, text) TO authenticated, service_role;

-- Admins see every story (including pending and rejected ones), approve or reject them, and remove them.
DROP POLICY IF EXISTS "Admins read all stories" ON public.student_stories;
CREATE POLICY "Admins read all stories" ON public.student_stories FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins review stories" ON public.student_stories;
CREATE POLICY "Admins review stories" ON public.student_stories FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
DROP POLICY IF EXISTS "Admins remove stories" ON public.student_stories;
CREATE POLICY "Admins remove stories" ON public.student_stories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
