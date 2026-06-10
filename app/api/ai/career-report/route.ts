import { NextResponse } from "next/server";
import { careerReportMessages } from "@/lib/ai-prompts";
import { callOpenRouter } from "@/lib/openrouter";
import { prisma } from "@/lib/prisma";
import { parseAiJson, safeStringify } from "@/lib/safe-json";
import type { CareerInput, CareerReportResult } from "@/lib/types";

export const runtime = "nodejs";

const requiredFields: Array<keyof CareerInput> = [
  "jobTitle",
  "years",
  "city",
  "salary",
  "painPoint",
  "goal"
];

export async function POST(request: Request) {
  const input = (await request.json()) as CareerInput;

  for (const field of requiredFields) {
    if (!input[field]?.trim()) {
      return NextResponse.json({ error: "请完整填写评估表单" }, { status: 400 });
    }
  }

  try {
    const content = await callOpenRouter(careerReportMessages(input));
    const report = parseAiJson<CareerReportResult>(content);

    const record = await prisma.careerReport.create({
      data: {
        jobTitle: input.jobTitle,
        years: input.years,
        city: input.city,
        salary: input.salary,
        painPoint: input.painPoint,
        goal: input.goal,
        riskScore: normalizeScore(report.riskScore),
        growthScore: normalizeScore(report.growthScore),
        salaryPotential: report.salaryPotential,
        inputJson: safeStringify(input),
        reportJson: safeStringify({
          ...report,
          riskScore: normalizeScore(report.riskScore),
          growthScore: normalizeScore(report.growthScore)
        })
      }
    });

    await prisma.generationLog.create({
      data: {
        tool: "career-report",
        inputJson: safeStringify(input),
        outputJson: record.reportJson,
        status: "success"
      }
    });

    return NextResponse.json({ id: record.id, report });
  } catch (error) {
    await prisma.generationLog.create({
      data: {
        tool: "career-report",
        inputJson: safeStringify(input),
        status: "failed",
        error: error instanceof Error ? error.message : "未知错误"
      }
    });

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "报告生成失败" },
      { status: 500 }
    );
  }
}

function normalizeScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(Number(score) || 0)));
}
