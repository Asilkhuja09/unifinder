import { createServerFn } from "@tanstack/react-start";
import { Output, streamText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const inputSchema = z.object({
  lang: z.string().min(2).max(12),
  langName: z.string().min(2).max(60),
  texts: z.array(z.string().min(1).max(4000)).min(1).max(60),
});

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator(inputSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("Translation service is not configured.");

    const provider = createLovableAiGatewayProvider(apiKey, undefined, {
      baseURL: "https://ai.gateway.lovable.dev/v1",
      structuredOutputs: true,
    });

    const numbered = data.texts.map((text, i) => `${i + 1}. ${text}`).join("\n");
    const result = streamText({
      model: provider("openai/gpt-6-astra"),
      providerOptions: { lovable: { reasoningEffort: "low" } },
      system:
        "You are a professional UI translator for a university and scholarship discovery website. " +
        "Translate each numbered line into the target language. Keep brand names (UniFinder Global), " +
        "proper nouns (university, city, scholarship names), numbers, %, URLs and emoji unchanged. " +
        "Return only the translations, one per input line, in the same order.",
      prompt: `Target language: ${data.langName} (${data.lang})\n\n${numbered}`,
      output: Output.object({
        schema: z.object({
          translations: z.array(z.string()),
        }),
      }),
    });

    const output = await result.output;
    return { translations: output.translations };
  });
