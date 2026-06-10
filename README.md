# 职场翻身 AI 助手

一个完整可运行的 AI 职业规划 SaaS MVP，面向中国职场人，支持职业风险评估、90 天翻身计划、项目包装、绩效总结、职业路线和面试教练。

## 技术栈

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite
- OpenRouter API

## 本地启动

要求 Node.js `>=16.14.0`。当前依赖固定在 Next.js `13.5.11`，支持 App Router 并兼容 Node 16。

```bash
npm install
cp .env.example .env
```

在 `.env` 中填写：

```bash
OPENROUTER_API_KEY="你的 OpenRouter Key"
```

启动开发服务：

```bash
npm run dev
```

访问 `http://localhost:3000`。

`npm run dev` 会自动执行 `prisma generate` 和 `prisma db push`，SQLite 数据库文件会生成在 `prisma/dev.db`。

## 目录结构

```text
app/
  api/ai/
    career-report/
    project-polish/
    performance-review/
    career-roadmap/
    interview-coach/
  assessment/
  report/[id]/
  tools/
components/
lib/
prisma/
```

## 页面

- `/` 首页
- `/assessment` 职业评估表单
- `/report/[id]` 报告详情页
- `/tools/project-polish` 项目包装工具
- `/tools/performance-review` 绩效总结工具
- `/tools/career-roadmap` 职业路线工具
- `/tools/interview-coach` 面试教练工具

## API

- `POST /api/ai/career-report`
- `POST /api/ai/project-polish`
- `POST /api/ai/performance-review`
- `POST /api/ai/career-roadmap`
- `POST /api/ai/interview-coach`

所有 AI 接口使用：

- endpoint: `https://openrouter.ai/api/v1/chat/completions`
- model: `openrouter/auto`
- key: `OPENROUTER_API_KEY`

## 数据模型

包含：

- `User`
- `CareerReport`
- `GenerationLog`
- `Payment`

MVP 不强制登录，职业报告会保存到 Prisma 配置的数据库。生产部署建议使用托管 Postgres。

## Vercel 部署准备

当前项目可以通过 Vercel 的 Next.js 预设部署，构建命令使用默认的 `npm run build` 即可。构建脚本会先执行 `prisma migrate deploy`，再执行 `prisma generate` 和 `next build`。

建议在 Vercel Project Settings -> Build and Deployment -> Node.js Version 中选择 `20.x`，减少旧版 Next.js 项目在新 Node 运行时上的差异风险。

需要在 Vercel Project Settings -> Environment Variables 中配置：

```bash
DATABASE_URL="postgresql://..."
OPENROUTER_API_KEY="你的 OpenRouter Key"
OPENROUTER_SITE_URL="https://你的生产域名"
```

注意：`DATABASE_URL` 必须是 Postgres 连接串，例如 Vercel Marketplace、Neon、Supabase 或 Prisma Postgres 提供的连接地址。首次部署时，Vercel 会根据已提交的 `prisma/migrations` 自动建表。
