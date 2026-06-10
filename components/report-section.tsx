import { CheckCircle2 } from "lucide-react";

type ReportSectionProps = {
  title: string;
  items?: string[];
  children?: React.ReactNode;
};

export function ReportSection({ title, items, children }: ReportSectionProps) {
  return (
    <section className="rounded-lg border border-line bg-white p-5 shadow-soft">
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {items ? (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li key={`${title}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-700">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </section>
  );
}
