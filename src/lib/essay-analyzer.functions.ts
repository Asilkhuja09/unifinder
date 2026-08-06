import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const MODEL = "openai/gpt-5.5";

const AnalyzeInput = z.object({
  essay_text: z.string().min(40, "Essay is too short to analyse."),
  prompt_topic: z.string().default(""),
  language: z.string().default("en"),
});

export type EssayAnalysis = {
  overall_score: number;
  grammar_score: number;
  structure_score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  actionable_steps: { title: string; detail: string }[];
};

const JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    overall_score: { type: "integer", description: "Overall admissions readiness from 1 to 100" },
    grammar_score: { type: "integer", description: "Grammar and tone quality from 1 to 100" },
    structure_score: { type: "integer", description: "Structure and narrative arc from 1 to 100" },
    summary: { type: "string", description: "Two-sentence verdict from an admissions officer" },
    strengths: { type: "array", items: { type: "string" } },
    weaknesses: { type: "array", items: { type: "string" } },
    actionable_steps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          title: { type: "string" },
          detail: { type: "string" },
        },
        required: ["title", "detail"],
      },
    },
  },
  required: [
    "overall_score",
    "grammar_score",
    "structure_score",
    "summary",
    "strengths",
    "weaknesses",
    "actionable_steps",
  ],
} as const;

const SYSTEM = `You are a senior admissions officer for Ivy League, Oxbridge and top-30 global universities.
Evaluate the applicant's essay against the given prompt/topic.
Scores are integers 1-100 and must be strict and realistic (most drafts land 55-75).
Give 3-5 strengths, 3-5 weaknesses, and 3-5 actionable steps. Each actionable step has a short imperative title and a concrete detail that quotes or references the essay.`;

function clampScore(value: unknown): number {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return 0;
  return Math.min(100, Math.max(0, n));
}

function toStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.map((v) => String(v)).filter(Boolean).slice(0, 8) : [];
}

async function callGateway(key: string, body: unknown): Promise<string> {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify(body),
  });

  if (res.status === 429) throw new Error("Rate limit reached — please retry in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted for this workspace.");
  if (!res.ok || !res.body) throw new Error(`AI request failed (${res.status}): ${await res.text()}`);

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const evt = JSON.parse(payload) as {
          type?: string;
          delta?: string;
          response?: { output_text?: string };
        };
        if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
          text += evt.delta;
        } else if (evt.type === "response.completed" && !text && evt.response?.output_text) {
          text = evt.response.output_text;
        }
      } catch {
        // ignore keep-alive / non-JSON frames
      }
    }
  }

  return text;
}

export const analyzeEssay = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AnalyzeInput.parse(input))
  .handler(async ({ data, context }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this project.");

    const raw = await callGateway(key, {
      model: MODEL,
      stream: true,
      reasoning: { effort: "medium" },
      instructions: SYSTEM,
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `Write all feedback in this language code: ${data.language}.\n\nPROMPT / TOPIC:\n${
                data.prompt_topic || "(no prompt provided — treat as an open personal statement)"
              }\n\nESSAY:\n${data.essay_text.slice(0, 20000)}`,
            },
          ],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          name: "essay_evaluation",
          strict: true,
          schema: JSON_SCHEMA,
        },
      },
    });

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      throw new Error("The analyser returned an unreadable response. Please try again.");
    }

    const analysis: EssayAnalysis = {
      overall_score: clampScore(parsed["overall_score"]),
      grammar_score: clampScore(parsed["grammar_score"]),
      structure_score: clampScore(parsed["structure_score"]),
      summary: String(parsed["summary"] ?? ""),
      strengths: toStringList(parsed["strengths"]),
      weaknesses: toStringList(parsed["weaknesses"]),
      actionable_steps: Array.isArray(parsed["actionable_steps"])
        ? (parsed["actionable_steps"] as unknown[])
            .map((s) => {
              const step = (s ?? {}) as { title?: unknown; detail?: unknown };
              return { title: String(step.title ?? ""), detail: String(step.detail ?? "") };
            })
            .filter((s) => s.title || s.detail)
            .slice(0, 8)
        : [],
    };

    const { data: row, error } = await context.supabase
      .from("essay_evaluations")
      .insert({
        user_id: context.userId,
        prompt_topic: data.prompt_topic,
        essay_text: data.essay_text,
        overall_score: analysis.overall_score,
        grammar_score: analysis.grammar_score,
        structure_score: analysis.structure_score,
        summary: analysis.summary,
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        actionable_steps: analysis.actionable_steps,
        model: MODEL,
      })
      .select("id, created_at")
      .single();

    if (error) throw new Error(error.message);

    return { id: row.id, created_at: row.created_at, analysis };
  });

export const listEssayEvaluations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("essay_evaluations")
      .select(
        "id, created_at, prompt_topic, essay_text, overall_score, grammar_score, structure_score, summary, strengths, weaknesses, actionable_steps, model",
      )
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const deleteEssayEvaluation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("essay_evaluations").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });