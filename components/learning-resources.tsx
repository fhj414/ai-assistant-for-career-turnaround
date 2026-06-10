"use client";

import { BookOpen, ExternalLink, Search } from "lucide-react";
import type { LearningResource } from "@/lib/types";

type LearningResourcesProps = {
  resources?: LearningResource[];
  variant?: "standalone" | "embedded";
};

export function LearningResources({ resources, variant = "standalone" }: LearningResourcesProps) {
  if (!resources?.length) {
    return null;
  }

  return (
    <section
      className={
        variant === "standalone"
          ? "rounded-lg border border-line bg-white p-5 shadow-soft"
          : "border-t border-line pt-5"
      }
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-brand-50 text-brand-700">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-ink">免费学习资源</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            下面给出搜索入口和学习产出要求，优先找免费观看内容，避免依赖单个不可验证链接。
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {resources.map((resource, index) => (
          <article
            key={`${resource.platform}-${resource.query}-${index}`}
            className="rounded-md border border-line bg-slate-50 p-4"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-ink shadow-line">
                {resource.platform}
              </span>
              <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                {resource.level}
              </span>
            </div>
            <h3 className="mt-3 text-base font-bold leading-6 text-ink">{resource.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">{resource.reason}</p>
            <p className="mt-3 rounded-md bg-white p-3 text-sm leading-6 text-slate-700 shadow-line">
              学完产出：{resource.action}
            </p>
            <a
              href={getResourceSearchUrl(resource)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
            >
              <Search className="h-4 w-4" />
              搜索资源
              <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function getResourceSearchUrl(resource: LearningResource) {
  const query = encodeURIComponent(resource.query || resource.title);

  if (resource.platform === "B站") {
    return `https://search.bilibili.com/all?keyword=${query}`;
  }

  if (resource.platform === "YouTube") {
    return `https://www.youtube.com/results?search_query=${query}`;
  }

  if (resource.platform === "GitHub") {
    return `https://github.com/search?q=${query}&type=repositories`;
  }

  if (resource.platform === "官方文档") {
    return `https://www.bing.com/search?q=${query}%20%E5%AE%98%E6%96%B9%E6%96%87%E6%A1%A3`;
  }

  return `https://www.bing.com/search?q=${query}`;
}
