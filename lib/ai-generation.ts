import { callOpenRouter } from "@/lib/openrouter";
import { parseAiJson, safeStringify } from "@/lib/safe-json";
import { prisma } from "@/lib/prisma";
import type { ToolResult } from "@/lib/types";

export async function generateToolResult({
  tool,
  input,
  messages
}: {
  tool: string;
  input: Record<string, string>;
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>;
}) {
  try {
    const content = await callOpenRouter(messages);
    const result = parseAiJson<ToolResult>(content);

    await prisma.generationLog.create({
      data: {
        tool,
        inputJson: safeStringify(input),
        outputJson: safeStringify(result),
        status: "success"
      }
    });

    return result;
  } catch (error) {
    await prisma.generationLog.create({
      data: {
        tool,
        inputJson: safeStringify(input),
        status: "failed",
        error: error instanceof Error ? error.message : "未知错误"
      }
    });
    throw error;
  }
}
