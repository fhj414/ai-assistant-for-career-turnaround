import Link from "next/link";
import { BriefcaseBusiness, Sparkles } from "lucide-react";

const navItems = [
  { href: "/assessment", label: "职业评估" },
  { href: "/tools/project-polish", label: "项目包装" },
  { href: "/tools/performance-review", label: "绩效总结" },
  { href: "/tools/career-roadmap", label: "职业路线" },
  { href: "/tools/interview-coach", label: "面试教练" }
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-white">
            <BriefcaseBusiness className="h-5 w-5" />
          </span>
          <span className="truncate text-base font-bold text-ink">职场翻身 AI 助手</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white shadow-line transition hover:bg-black"
        >
          <Sparkles className="h-4 w-4" />
          生成报告
        </Link>
      </div>
    </header>
  );
}
