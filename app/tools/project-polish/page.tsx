import { AiToolForm } from "@/components/ai-tool-form";

export default function ProjectPolishPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold text-brand-700">AI 项目包装</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">把普通项目改成简历亮点</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          输入项目经历，AI 会生成项目包装角度、简历 bullet 和面试表达。
        </p>
      </div>
      <AiToolForm
        endpoint="/api/ai/project-polish"
        fields={[
          {
            name: "project",
            label: "项目经历",
            type: "textarea",
            placeholder: "例如：负责会员活动页开发，接了运营需求，做了优惠券配置、活动页面、数据埋点..."
          }
        ]}
      />
    </section>
  );
}
