import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  LineChart,
  MessageSquareText,
  ShieldAlert,
  Sparkles,
  Target,
  TimerReset,
  WalletCards
} from "lucide-react";

const scenarios = [
  {
    title: "程序员",
    detail: "识别 CRUD、外包、低壁垒开发风险，转向 AI 工程化、业务系统和架构能力。",
    icon: BarChart3
  },
  {
    title: "财务",
    detail: "从记账报表转向经营分析、预算控制、自动化流程和业务决策支持。",
    icon: WalletCards
  },
  {
    title: "运营",
    detail: "把活动执行升级为用户增长、内容策略、数据分析和 AI 提效闭环。",
    icon: LineChart
  },
  {
    title: "产品经理",
    detail: "梳理 AI 时代产品竞争力，强化行业理解、数据指标和商业结果表达。",
    icon: Target
  }
];

const features = [
  { title: "岗位风险评估", desc: "判断你的岗位哪些工作会被 AI 压缩，哪些能力还能升值。", icon: ShieldAlert },
  { title: "90 天翻身计划", desc: "拆成 1-30、31-60、61-90 天，给出每天能推进的行动方向。", icon: TimerReset },
  { title: "简历项目优化", desc: "把普通经历改成有业务结果、指标和个人贡献的项目表达。", icon: FileText },
  { title: "面试话术生成", desc: "针对岗位和项目生成尖锐问题、回答框架和可直接复述的话术。", icon: MessageSquareText }
];

const prices = [
  {
    name: "体验版",
    price: "¥0",
    desc: "适合快速判断岗位风险",
    items: ["生成 1 份职业风险报告", "基础 90 天行动计划", "项目建议与简历方向"]
  },
  {
    name: "进阶版",
    price: "¥29",
    desc: "适合准备跳槽或晋升",
    items: ["深度报告", "4 个 AI 职业工具", "面试话术与绩效表达", "后续可接入支付"]
  },
  {
    name: "陪跑版",
    price: "¥199",
    desc: "适合需要持续转型的人",
    items: ["每周计划复盘", "简历项目多轮打磨", "面试问答模拟", "职业路线迭代"]
  }
];

export default function Home() {
  return (
    <div className="noise">
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_520px] lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-md border border-brand-100 bg-white px-3 py-2 text-sm font-semibold text-brand-700 shadow-line">
            <Sparkles className="h-4 w-4" />
            面向中国职场人的 AI 职业规划 SaaS
          </div>
          <h1 className="max-w-3xl text-4xl font-black tracking-normal text-ink sm:text-5xl lg:text-6xl">
            AI 时代，你的职业还有多少安全感？
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            输入岗位，30 秒生成你的职业风险报告和 90 天翻身计划。看清岗位风险、补齐能力短板，把简历、绩效和面试表达改到能打。
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/assessment"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-semibold text-white transition hover:bg-black"
            >
              立即生成报告
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/project-polish"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-line bg-white px-6 text-sm font-semibold text-ink transition hover:border-slate-300 hover:bg-slate-50"
            >
              先优化项目经历
            </Link>
          </div>
          <div className="mt-8 grid max-w-2xl grid-cols-2 gap-3 text-sm text-slate-700 sm:grid-cols-3">
            {["岗位风险", "涨薪潜力", "项目包装"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="text-sm font-semibold text-brand-700">AI 职业风险报告</p>
              <h2 className="mt-1 text-xl font-bold text-ink">产品经理 · 上海 · 5 年</h2>
            </div>
            <div className="rounded-md bg-orange-50 px-3 py-2 text-sm font-bold text-orange-600">
              风险 68
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-ink">AI 替代风险</span>
                <span className="text-orange-600">68/100</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[68%] rounded-full bg-orange-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-ink">职业成长性</span>
                <span className="text-brand-700">76/100</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[76%] rounded-full bg-brand-500" />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["补 AI 产品能力", "沉淀可量化项目", "重写简历 bullet", "准备高压面试"].map((item) => (
                <div key={item} className="rounded-md border border-line bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-md bg-ink p-4 text-white">
              <p className="text-sm font-semibold text-brand-100">90 天关键动作</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">
                用一个 AI 提效项目替换“需求沟通型 PM”标签，证明你能把业务指标、模型能力和落地成本讲清楚。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold text-brand-700">使用场景</p>
            <h2 className="mt-2 text-3xl font-black text-ink">不同岗位，都要重新定义竞争力</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-muted">
            不是简单问“会不会被 AI 替代”，而是拆清楚哪些任务会贬值、哪些能力该马上补。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-lg border border-line bg-white p-5 shadow-line">
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-md bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-6 shadow-soft md:p-8">
          <p className="text-sm font-bold text-brand-700">产品功能</p>
          <h2 className="mt-2 text-3xl font-black text-ink">从风险判断到求职表达，一次打通</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-lg border border-line bg-slate-50 p-5">
                  <Icon className="h-6 w-6 text-accent-600" />
                  <h3 className="mt-4 text-base font-bold text-ink">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold text-brand-700">价格</p>
          <h2 className="mt-2 text-3xl font-black text-ink">先跑通价值，再扩展付费</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {prices.map((plan, index) => (
            <div
              key={plan.name}
              className={`rounded-lg border bg-white p-6 shadow-line ${
                index === 1 ? "border-brand-500 shadow-soft" : "border-line"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-ink">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted">{plan.desc}</p>
                </div>
                {index === 1 ? (
                  <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
                    推荐
                  </span>
                ) : null}
              </div>
              <p className="mt-6 text-4xl font-black text-ink">{plan.price}</p>
              <ul className="mt-6 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/assessment"
                className={`mt-6 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-semibold transition ${
                  index === 1
                    ? "bg-ink text-white hover:bg-black"
                    : "border border-line bg-white text-ink hover:bg-slate-50"
                }`}
              >
                开始使用
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
