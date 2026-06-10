import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[62vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-sm font-semibold text-brand-700">404</p>
      <h1 className="text-3xl font-bold text-ink md:text-4xl">没有找到这份报告</h1>
      <p className="mt-4 text-base leading-7 text-muted">
        报告可能还没有生成成功，或者链接里的 ID 不正确。
      </p>
      <Link
        href="/assessment"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
      >
        <ArrowLeft className="h-4 w-4" />
        重新生成报告
      </Link>
    </section>
  );
}
