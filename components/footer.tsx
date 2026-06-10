import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line/70 bg-white/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>© 2026 职场翻身 AI 助手。为中国职场人的下一步负责。</p>
        <div className="flex flex-wrap gap-4">
          <Link href="/assessment" className="hover:text-ink">
            职业评估
          </Link>
          <Link href="/tools/project-polish" className="hover:text-ink">
            项目包装
          </Link>
          <Link href="/tools/interview-coach" className="hover:text-ink">
            面试教练
          </Link>
        </div>
      </div>
    </footer>
  );
}
