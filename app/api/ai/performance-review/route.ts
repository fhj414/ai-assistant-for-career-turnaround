import { NextResponse } from "next/server";
import { performanceReviewMessages } from "@/lib/ai-prompts";
import { generateToolResult } from "@/lib/ai-generation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const input = (await request.json()) as Record<string, string>;

  if (!input.achievement?.trim()) {
    return NextResponse.json({ error: "请先输入工作成果" }, { status: 400 });
  }

  try {
    const result = await generateToolResult({
      tool: "performance-review",
      input,
      messages: performanceReviewMessages(input)
    });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "生成失败" },
      { status: 500 }
    );
  }
}
