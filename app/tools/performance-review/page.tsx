import { AiToolForm } from "@/components/ai-tool-form";

export default function PerformanceReviewPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold text-brand-700">AI 绩效总结</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">把工作成果说成老板听得懂的价值</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          输入工作成果，AI 会生成年终总结、绩效自评和晋升表达。
        </p>
      </div>
      <AiToolForm
        endpoint="/api/ai/performance-review"
        fields={[
          {
            name: "achievement",
            label: "工作成果",
            type: "textarea",
            placeholder: "例如：今年负责用户增长活动、上线 12 次版本、降低客服工单、优化数据看板..."
          }
        ]}
      />
    </section>
  );
}
