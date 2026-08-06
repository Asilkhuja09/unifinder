CREATE TABLE public.essay_evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_topic TEXT NOT NULL DEFAULT '',
  essay_text TEXT NOT NULL,
  overall_score INTEGER NOT NULL DEFAULT 0,
  grammar_score INTEGER NOT NULL DEFAULT 0,
  structure_score INTEGER NOT NULL DEFAULT 0,
  summary TEXT NOT NULL DEFAULT '',
  strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
  weaknesses JSONB NOT NULL DEFAULT '[]'::jsonb,
  actionable_steps JSONB NOT NULL DEFAULT '[]'::jsonb,
  model TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.essay_evaluations TO authenticated;
GRANT ALL ON public.essay_evaluations TO service_role;

ALTER TABLE public.essay_evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own essay evaluations"
  ON public.essay_evaluations FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own essay evaluations"
  ON public.essay_evaluations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own essay evaluations"
  ON public.essay_evaluations FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own essay evaluations"
  ON public.essay_evaluations FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX essay_evaluations_user_created_idx ON public.essay_evaluations (user_id, created_at DESC);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_essay_evaluations_updated_at
BEFORE UPDATE ON public.essay_evaluations
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();