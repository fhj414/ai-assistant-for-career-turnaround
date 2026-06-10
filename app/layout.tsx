import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "职场翻身 AI 助手",
  description: "评估 AI 时代岗位风险，生成 90 天职业翻身计划、简历项目优化和面试话术。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
