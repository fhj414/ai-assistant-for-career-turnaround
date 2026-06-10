"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, Loader2, Send, Sparkles } from "lucide-react";
import { LearningResources } from "@/components/learning-resources";
import type { ToolResult } from "@/lib/types";

export type ToolField = {
  name: string;
  label: string;
  placeholder: string;
  type?: "input" | "textarea";
  required?: boolean;
};

type AiToolFormProps = {
  endpoint: string;
  fields: ToolField[];
};

export function AiToolForm({ endpoint, fields }: AiToolFormProps) {
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(fields.map((field) => [field.name, ""]))
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ToolResult | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const data = (await response.json()) as { result?: ToolResult; error?: string };

      if (!response.ok || !data.result) {
        throw new Error(data.error || "AI 生成失败，请稍后再试");
      }

      setResult(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "请求失败，请稍后再试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <form onSubmit={onSubmit} className="rounded-lg border border-line bg-white p-5 shadow-soft">
        <div className="space-y-5">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="text-sm font-semibold text-ink">{field.label}</span>
              {field.type === "textarea" ? (
                <textarea
                  required={field.required ?? true}
                  value={values[field.name]}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                  placeholder={field.placeholder}
                  className="mt-2 min-h-40 w-full resize-y rounded-md border border-line bg-white px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
                />
              ) : (
                <input
                  required={field.required ?? true}
                  value={values[field.name]}
                  onChange={(event) =>
                    setValues((current) => ({ ...current, [field.name]: event.target.value }))
                  }
                  placeholder={field.placeholder}
                  className="mt-2 h-12 w-full rounded-md border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
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
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-65"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "AI 正在生成" : "生成结果"}
        </button>
      </form>

      <section className="min-h-[420px] rounded-lg border border-line bg-white p-5 shadow-soft">
        {!result && !loading ? (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center text-center">
            <div className="mb-4 grid h-12 w-12 place-items-center rounded-md bg-brand-50 text-brand-700">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-ink">生成结果会显示在这里</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted">
              输入越具体，输出越能贴近你的岗位、业务和晋升场景。
            </p>
          </div>
        ) : null}

        {loading ? (
          <div className="space-y-4">
            <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
            <div className="h-24 animate-pulse rounded-md bg-slate-100" />
            <div className="h-32 animate-pulse rounded-md bg-slate-100" />
            <div className="h-28 animate-pulse rounded-md bg-slate-100" />
          </div>
        ) : null}

        {result ? (
          <div>
            <p className="text-sm font-semibold text-brand-700">AI 输出</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">{result.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{result.summary}</p>

            <div className="mt-6 space-y-5">
              {result.sections.map((section) => (
                <div key={section.title} className="rounded-md border border-line bg-slate-50 p-4">
                  <h3 className="text-base font-bold text-ink">{section.title}</h3>
                  <ul className="mt-3 space-y-2">
                    {section.items.map((item, index) => (
                      <li key={`${section.title}-${index}`} className="text-sm leading-6 text-slate-700">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {result.scripts?.length ? (
                <div className="rounded-md border border-line bg-white p-4">
                  <h3 className="text-base font-bold text-ink">可直接复用的话术</h3>
                  <div className="mt-3 space-y-3">
                    {result.scripts.map((script) => (
                      <div key={script.scene} className="rounded-md bg-slate-50 p-3">
                        <p className="text-xs font-semibold text-muted">{script.scene}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">{script.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <LearningResources resources={result.learningResources} variant="embedded" />
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
