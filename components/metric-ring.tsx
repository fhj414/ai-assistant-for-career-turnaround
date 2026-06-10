import { clsx } from "clsx";

type MetricRingProps = {
  label: string;
  value: number;
  tone?: "danger" | "success" | "warning";
  caption?: string;
};

const toneMap = {
  danger: "#F97316",
  success: "#10B981",
  warning: "#F59E0B"
};

export function MetricRing({ label, value, tone = "success", caption }: MetricRingProps) {
  const score = Math.max(0, Math.min(100, Math.round(value)));
  const color = toneMap[tone];

  return (
    <div className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <div className="flex items-center gap-5">
        <div
          className="relative grid h-24 w-24 shrink-0 place-items-center rounded-full"
          style={{
            background: `conic-gradient(${color} ${score * 3.6}deg, #EAECF0 0deg)`
          }}
        >
          <div className="grid h-[76px] w-[76px] place-items-center rounded-full bg-white">
            <span className="text-2xl font-bold text-ink">{score}</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-muted">{label}</p>
          <p
            className={clsx(
              "mt-2 text-xl font-bold",
              tone === "success" && "text-brand-700",
              tone === "danger" && "text-orange-600",
              tone === "warning" && "text-warning-600"
            )}
          >
            {score}/100
          </p>
          {caption ? <p className="mt-2 text-sm leading-6 text-muted">{caption}</p> : null}
        </div>
      </div>
    </div>
  );
}
