"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Send } from "lucide-react";

const fields = [
  { name: "jobTitle", label: "当前岗位", placeholder: "例如：电商运营 / Java 后端 / 财务主管" },
  { name: "years", label: "工作年限", placeholder: "例如：3 年" },
  { name: "city", label: "所在城市", placeholder: "例如：上海" },
  { name: "salary", label: "当前薪资", placeholder: "例如：18k * 14" },
  { name: "painPoint", label: "当前困境", placeholder: "例如：涨薪慢、项目没亮点、担心被 AI 替代", textarea: true },
  { name: "goal", label: "职业目标", placeholder: "例如：90 天内跳到 25k，转 AI 产品方向", textarea: true }
];

export default function AssessmentPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, ""]))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/ai/career-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const data = (await response.json()) as { id?: string; error?: string };

      if (!response.ok || !data.id) {
        throw new Error(data.error || "报告生成失败，请稍后再试");
      }

      router.push(`/report/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-bold text-brand-700">职业评估</p>
        <h1 className="mt-2 text-3xl font-black text-ink md:text-5xl">生成你的职业风险报告</h1>
        <p className="mt-4 text-base leading-7 text-muted">
          请尽量具体描述岗位、困境和目标。AI 会结合中国职场环境，给出风险评分、成长性判断和 90 天行动计划。
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form onSubmit={onSubmit} className="rounded-lg border border-line bg-white p-5 shadow-soft md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={field.textarea ? "block md:col-span-2" : "block"}>
                <span className="text-sm font-semibold text-ink">{field.label}</span>
                {field.textarea ? (
                  <textarea
                    required
                    value={values[field.name]}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, [field.name]: event.target.value }))
                    }
                    placeholder={field.placeholder}
                    className="mt-2 min-h-28 w-full resize-y rounded-md border border-line px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  />
                ) : (
                  <input
                    required
                    value={values[field.name]}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, [field.name]: event.target.value }))
                    }
                    placeholder={field.placeholder}
                    className="mt-2 h-12 w-full rounded-md border border-line px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                  />
                )}
              </label>
            ))}
          </div>

          {error ? (
            <div className="mt-5 flex gap-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-65 md:w-auto"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {loading ? "正在生成报告" : "提交并生成报告"}
          </button>
        </form>

        <aside className="rounded-lg border border-line bg-ink p-5 text-white shadow-soft">
          <p className="text-sm font-semibold text-brand-100">报告包含</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
            <li>AI 替代风险评分</li>
            <li>职业成长性评分</li>
            <li>涨薪潜力判断</li>
            <li>当前核心问题</li>
            <li>90 天行动计划</li>
            <li>项目、简历、面试建议</li>
          </ul>
          <div className="mt-6 rounded-md bg-white/10 p-4 text-sm leading-6 text-slate-100">
            建议写真实薪资和困境。越怕被看见的问题，越应该交给报告拆开处理。
          </div>
        </aside>
      </div>
    </section>
  );
}
