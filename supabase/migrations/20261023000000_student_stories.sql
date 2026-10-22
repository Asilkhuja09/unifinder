-- Student stories: activity lists and essays that students choose to share, shown only after review.
CREATE TABLE public.student_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL DEFAULT '',
  major text NOT NULL DEFAULT '',
  university text NOT NULL DEFAULT '',
  admit_year integer,
  activities text NOT NULL DEFAULT '',
  essay_text text NOT NULL DEFAULT '',
  consent_publish boolean NOT NULL DEFAULT false,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.student_stories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.student_stories TO authenticated;
GRANT ALL ON public.student_stories TO service_role;
ALTER TABLE public.student_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read approved stories" ON public.student_stories FOR SELECT TO anon, authenticated USING (status = 'approved' OR auth.uid() = user_id);
CREATE POLICY "Users submit their own pending story" ON public.student_stories FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'pending' AND consent_publish = true);
CREATE POLICY "Users edit their own pending story" ON public.student_stories FOR UPDATE TO authenticated USING (auth.uid() = user_id AND status = 'pending') WITH CHECK (auth.uid() = user_id AND status = 'pending');
CREATE POLICY "Users withdraw their own story" ON public.student_stories FOR DELETE TO authenticated USING (auth.uid() = user_id);
CREATE TRIGGER update_student_stories_updated_at BEFORE UPDATE ON public.student_stories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
