import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({ essay: z.string().min(1), language: z.string().default("en") });

const SYSTEM = `You are a senior admissions officer for Ivy League, Oxbridge and top-30 global universities.
Analyse the applicant's personal statement and reply in clean markdown with exactly these sections:
## Grammar & Syntax
## Vocabulary & Style Upgrades
## Admission Traps & Pitfall Warnings
## Elite University Compatibility
End with a single line: **Overall readiness: X/100**.
Be concrete, quote weak phrases, and propose stronger rewrites.`;

export const analyseEssay = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            content: `Reply in this language code: ${data.language}.\n\nESSAY:\n${data.essay.slice(0, 12000)}`,
          },
        ],
      }),
    });

    if (res.status === 429) throw new Error("Rate limit reached — please retry in a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted for this workspace.");
    if (!res.ok) throw new Error(`AI request failed (${res.status}): ${await res.text()}`);

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    return { analysis: json.choices?.[0]?.message?.content ?? "" };
  });