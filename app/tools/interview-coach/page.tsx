import { AiToolForm } from "@/components/ai-tool-form";

export default function InterviewCoachPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold text-brand-700">AI 面试教练</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">提前准备高压追问和回答话术</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          输入岗位和项目，AI 会生成面试问题、回答框架和可直接复述的话术。
        </p>
      </div>
      <AiToolForm
        endpoint="/api/ai/interview-coach"
        fields={[
          {
            name: "jobTitle",
            label: "目标岗位",
            placeholder: "例如：AI 产品经理 / 高级后端工程师 / 增长运营"
          },
          {
            name: "project",
            label: "项目经历",
            type: "textarea",
            placeholder: "例如：负责订单系统重构，降低接口超时，支持大促峰值..."
          },
          {
            name: "concern",
            label: "最担心被问到的问题",
            placeholder: "例如：项目数据不够亮眼、没有管理经验、转型动机不清晰"
          }
        ]}
      />
    </section>
  );
}
