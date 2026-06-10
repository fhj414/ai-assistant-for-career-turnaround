import { NextResponse } from "next/server";
import { careerRoadmapMessages } from "@/lib/ai-prompts";
import { generateToolResult } from "@/lib/ai-generation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const input = (await request.json()) as Record<string, string>;

  if (!input.jobTitle?.trim() || !input.goal?.trim()) {
    return NextResponse.json({ error: "请填写当前岗位和职业目标" }, { status: 400 });
  }

  try {
    const result = await generateToolResult({
      tool: "career-roadmap",
      input,
      messages: careerRoadmapMessages(input)
    });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "生成失败" },
      { status: 500 }
    );
  }
}
