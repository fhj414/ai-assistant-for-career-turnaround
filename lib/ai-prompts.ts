import type { CareerInput } from "@/lib/types";

const systemPrompt =
  "你是一位熟悉中国互联网、制造业、金融、消费、ToB SaaS 与本地服务行业的资深职业规划顾问。你的风格具体、犀利、务实，不说空话。所有建议必须面向中国职场语境，考虑城市、薪资、年限、绩效、跳槽、晋升和 AI 自动化影响。你只输出合法 JSON，不要输出 Markdown。";

export function careerReportMessages(input: CareerInput) {
  return [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `请根据以下信息生成一份职业风险报告和 90 天翻身计划。

当前岗位：${input.jobTitle}
工作年限：${input.years}
所在城市：${input.city}
当前薪资：${input.salary}
当前困境：${input.painPoint}
职业目标：${input.goal}

输出必须是合法 JSON，字段固定如下：
{
  "riskScore": 0到100的整数，分数越高代表 AI 替代风险越高,
  "growthScore": 0到100的整数，分数越高代表职业成长性越强,
  "salaryPotential": "用一句话判断未来12个月涨薪潜力，要具体到幅度或条件",
  "coreProblem": "指出这个人当前最关键的问题，要直接",
  "aiImpact": ["3到5条 AI 对岗位影响，每条具体到工作内容"],
  "actionPlan": [
    {
      "phase": "第1阶段",
      "days": "1-30天",
      "focus": "阶段重点",
      "tasks": ["4条行动任务，要可执行"],
      "deliverable": "阶段交付物"
    }
  ],
  "projectSuggestions": [
    {
      "title": "项目建议标题",
      "angle": "为什么这个项目能提升竞争力",
      "steps": ["3条落地步骤"]
    }
  ],
  "resumeAdvice": ["5条简历包装建议，必须像真实简历 bullet"],
  "interviewScripts": [
    {
      "question": "可能被问到的问题",
      "answer": "可直接说出口的回答话术"
    }
  ],
  "finalAdvice": "最终建议，具体、犀利、可执行",
  "summaryTags": ["3到6个标签"],
  "learningResources": [
    {
      "title": "资源主题，例如 AI 产品经理入门实战",
      "platform": "B站 或 YouTube 或 GitHub 或 官方文档 或 其他",
      "query": "建议用户在该平台搜索的关键词，不要写具体视频链接",
      "reason": "为什么这个资源适合当前岗位和目标",
      "level": "入门/进阶/实战",
      "action": "学完后必须产出的作品或简历材料"
    }
  ]
}

要求：
- actionPlan 必须覆盖 1-30天、31-60天、61-90天。
- projectSuggestions 至少 3 条。
- interviewScripts 至少 4 条。
- learningResources 需要 6 到 8 条，必须包含至少 2 条 B站、2 条 YouTube，并优先推荐免费内容、官方文档、开源项目、公开课或可搜索到的教程。
- 不要编造具体 URL；query 要能让用户直接搜索到相关免费资源。
- 不要安慰式废话，不要泛泛而谈。`
    }
  ];
}

export function projectPolishMessages(input: Record<string, string>) {
  return toolMessages(`用户的项目经历：
${input.project || input.content || ""}

请生成项目包装、简历 bullet 和面试表达。重点是中国职场里的业务结果、复杂度、个人贡献、数据化表达。`);
}

export function performanceReviewMessages(input: Record<string, string>) {
  return toolMessages(`用户的工作成果：
${input.achievement || input.content || ""}

请生成年终总结、绩效自评和晋升表达。要适合中国公司绩效场景，强调目标、动作、结果、复盘、下一步。`);
}

export function careerRoadmapMessages(input: Record<string, string>) {
  return toolMessages(`当前岗位：${input.jobTitle || ""}
职业目标：${input.goal || ""}
当前基础或限制：${input.context || ""}

请生成学习路线和转型路径。必须包含阶段、学习重点、作品集、求职或晋升打法。`);
}

export function interviewCoachMessages(input: Record<string, string>) {
  return toolMessages(`目标岗位：${input.jobTitle || ""}
项目经历：${input.project || ""}
担心的问题：${input.concern || ""}

请生成面试问题和回答话术。问题要尖锐，回答要可直接复述，体现业务理解和个人贡献。`);
}

function toolMessages(task: string) {
  return [
    { role: "system" as const, content: systemPrompt },
    {
      role: "user" as const,
      content: `${task}

输出必须是合法 JSON，字段固定如下：
{
  "title": "结果标题",
  "summary": "一句话总结判断",
  "sections": [
    {
      "title": "小节标题",
      "items": ["至少4条具体内容"]
    }
  ],
  "scripts": [
    {
      "scene": "使用场景",
      "content": "可直接复制使用的话术"
    }
  ],
  "learningResources": [
    {
      "title": "资源主题",
      "platform": "B站 或 YouTube 或 GitHub 或 官方文档 或 其他",
      "query": "建议用户在该平台搜索的关键词，不要写具体视频链接",
      "reason": "为什么这个资源适合当前任务",
      "level": "入门/进阶/实战",
      "action": "学完后必须产出的作品、话术或简历材料"
    }
  ]
}

要求：
- sections 至少 4 个。
- learningResources 需要 4 到 6 条，至少包含 1 条 B站、1 条 YouTube，并优先推荐免费内容、官方文档、开源项目、公开课或可搜索到的教程。
- 不要编造具体 URL；query 要能让用户直接搜索到相关免费资源。
- 每条 item 要具体，有动作、有指标、有表达方式。
- 语言要中文、直接、职业化。
- 不要输出 Markdown，不要输出 JSON 以外的文字。`
    }
  ];
}
