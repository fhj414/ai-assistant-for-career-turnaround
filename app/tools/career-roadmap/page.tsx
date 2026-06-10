import { AiToolForm } from "@/components/ai-tool-form";

export default function CareerRoadmapPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold text-brand-700">AI 职业路线</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">生成可执行的学习和转型路线</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          输入当前岗位和目标，AI 会生成阶段路线、学习重点、作品集和求职打法。
        </p>
      </div>
      <AiToolForm
        endpoint="/api/ai/career-roadmap"
        fields={[
          {
            name: "jobTitle",
            label: "当前岗位",
            placeholder: "例如：传统软件测试 / 财务会计 / 内容运营"
          },
          {
            name: "goal",
            label: "职业目标",
            placeholder: "例如：转 AI 产品经理 / 进入数据分析 / 晋升运营负责人"
          },
          {
            name: "context",
            label: "当前基础或限制",
            type: "textarea",
            placeholder: "例如：英语一般、每天能学习 1.5 小时、没有 AI 项目经验..."
          }
        ]}
      />
    </section>
  );
}
