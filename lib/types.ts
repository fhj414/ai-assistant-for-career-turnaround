export type CareerInput = {
  jobTitle: string;
  years: string;
  city: string;
  salary: string;
  painPoint: string;
  goal: string;
};

export type LearningResource = {
  title: string;
  platform: "B站" | "YouTube" | "GitHub" | "官方文档" | "其他";
  query: string;
  reason: string;
  level: string;
  action: string;
};

export type CareerReportResult = {
  riskScore: number;
  growthScore: number;
  salaryPotential: string;
  coreProblem: string;
  aiImpact: string[];
  actionPlan: Array<{
    phase: string;
    days: string;
    focus: string;
    tasks: string[];
    deliverable: string;
  }>;
  projectSuggestions: Array<{
    title: string;
    angle: string;
    steps: string[];
  }>;
  resumeAdvice: string[];
  interviewScripts: Array<{
    question: string;
    answer: string;
  }>;
  finalAdvice: string;
  summaryTags: string[];
  learningResources?: LearningResource[];
};

export type ToolResult = {
  title: string;
  summary: string;
  sections: Array<{
    title: string;
    items: string[];
  }>;
  scripts?: Array<{
    scene: string;
    content: string;
  }>;
  learningResources?: LearningResource[];
};
