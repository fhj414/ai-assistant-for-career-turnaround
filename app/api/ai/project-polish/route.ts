import { NextResponse } from "next/server";
import { projectPolishMessages } from "@/lib/ai-prompts";
import { generateToolResult } from "@/lib/ai-generation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const input = (await request.json()) as Record<string, string>;

  if (!input.project?.trim()) {
    return NextResponse.json({ error: "请先输入项目经历" }, { status: 400 });
  }

  try {
    const result = await generateToolResult({
      tool: "project-polish",
      input,
      messages: projectPolishMessages(input)
    });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "生成失败" },
      { status: 500 }
    );
  }
}
