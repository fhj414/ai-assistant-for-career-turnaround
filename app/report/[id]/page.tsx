import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BriefcaseBusiness, FileText, MessageSquareText, Target } from "lucide-react";
import { LearningResources } from "@/components/learning-resources";
import { MetricRing } from "@/components/metric-ring";
import { ReportSection } from "@/components/report-section";
import { prisma } from "@/lib/prisma";
import type { CareerReportResult } from "@/lib/types";

export const dynamic = "force-dynamic";

type ReportPageProps = {
  params: {
    id: string;
  };
};

export default async function ReportPage({ params }: ReportPageProps) {
  const record = await prisma.careerReport.findUnique({
    where: { id: params.id }
  });

  if (!record) {
    notFound();
  }

  const report = JSON.parse(record.reportJson) as CareerReportResult;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-lg border border-line bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold text-brand-700">职业风险报告</p>
            <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">
              {record.jobTitle} 的 90 天翻身计划
            </h1>
            <p className="mt-4 text-sm leading-6 text-muted">
              {record.city} · {record.years} · 当前薪资 {record.salary} · 生成时间{" "}
              {record.createdAt.toLocaleDateString("zh-CN")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {report.summaryTags.map((tag) => (
                <span key={tag} className="rounded-md bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/assessment"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-black"
          >
            再生成一份
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <MetricRing
          label="AI 替代风险评分"
          value={report.riskScore}
          tone="danger"
          caption="分数越高，说明当前工作内容越容易被 AI 压缩或重组。"
        />
        <MetricRing
          label="职业成长性评分"
          value={report.growthScore}
          tone="success"
          caption="分数越高，说明能力迁移空间、行业机会和议价潜力越强。"
        />
        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <p className="text-sm font-semibold text-muted">涨薪潜力</p>
          <p className="mt-4 text-2xl font-black leading-9 text-ink">{report.salaryPotential}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="space-y-6">
          <section className="rounded-lg border border-line bg-ink p-5 text-white shadow-soft">
            <p className="text-sm font-semibold text-brand-100">当前核心问题</p>
            <p className="mt-3 text-lg font-bold leading-8">{report.coreProblem}</p>
          </section>

          <ReportSection title="AI 对岗位的影响" items={report.aiImpact} />

          <ReportSection title="项目建议">
            <div className="space-y-4">
              {report.projectSuggestions.map((project) => (
                <div key={project.title} className="rounded-md border border-line bg-slate-50 p-4">
                  <div className="flex gap-3">
                    <Target className="mt-1 h-5 w-5 shrink-0 text-accent-600" />
                    <div>
                      <h3 className="font-bold text-ink">{project.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-700">{project.angle}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-2 pl-8 text-sm leading-6 text-slate-700">
                    {project.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ReportSection>
        </div>

        <div className="space-y-6">
          <ReportSection title="90 天行动计划">
            <div className="space-y-4">
              {report.actionPlan.map((phase) => (
                <div key={phase.days} className="rounded-md border border-line bg-white p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                      {phase.phase}
                    </span>
                    <span className="text-sm font-bold text-ink">{phase.days}</span>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-ink">{phase.focus}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {phase.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-md bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-700">
                    交付物：{phase.deliverable}
                  </p>
                </div>
              ))}
            </div>
          </ReportSection>

          <ReportSection title="简历包装建议">
            <div className="space-y-3">
              {report.resumeAdvice.map((item) => (
                <div key={item} className="flex gap-3 rounded-md border border-line bg-slate-50 p-3">
                  <FileText className="mt-1 h-4 w-4 shrink-0 text-brand-700" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </ReportSection>

          <ReportSection title="面试话术">
            <div className="space-y-3">
              {report.interviewScripts.map((script) => (
                <div key={script.question} className="rounded-md border border-line bg-white p-4">
                  <div className="flex gap-2">
                    <MessageSquareText className="mt-1 h-4 w-4 shrink-0 text-accent-600" />
                    <h3 className="text-sm font-bold leading-6 text-ink">{script.question}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{script.answer}</p>
                </div>
              ))}
            </div>
          </ReportSection>
        </div>
      </div>

      <section className="mt-6 rounded-lg border border-line bg-white p-6 shadow-soft">
        <div className="flex gap-3">
          <BriefcaseBusiness className="mt-1 h-6 w-6 shrink-0 text-brand-700" />
          <div>
            <h2 className="text-xl font-black text-ink">最终建议</h2>
            <p className="mt-3 text-base leading-8 text-slate-700">{report.finalAdvice}</p>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <LearningResources resources={report.learningResources} />
      </div>
    </section>
  );
}
