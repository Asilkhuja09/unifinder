CREATE TABLE public.university_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  university_id TEXT NOT NULL,
  university_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, university_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.university_favorites TO authenticated;
GRANT ALL ON public.university_favorites TO service_role;

ALTER TABLE public.university_favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own favorites" ON public.university_favorites FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can add their own favorites" ON public.university_favorites FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own favorites" ON public.university_favorites FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON public.university_favorites FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_university_favorites_updated_at BEFORE UPDATE ON public.university_favorites FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();