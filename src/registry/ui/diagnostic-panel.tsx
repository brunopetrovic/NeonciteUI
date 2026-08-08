import * as React from "react";
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DiagnosticItem {
  id?: string;
  severity: "pass" | "info" | "warning" | "error";
  title: React.ReactNode;
  detail?: React.ReactNode;
}

export interface DiagnosticPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  items: DiagnosticItem[];
  title?: React.ReactNode;
}

const meta = {
  pass: { icon: CheckCircle2, tone: "text-[color:var(--neon-green)]" },
  info: { icon: Info, tone: "text-[color:var(--neon-cyan)]" },
  warning: { icon: AlertTriangle, tone: "text-[color:var(--neon-yellow)]" },
  error: { icon: XCircle, tone: "text-[color:var(--neon-red)]" },
};

export function DiagnosticPanel({
  items,
  title = "Diagnostics",
  className,
  ...props
}: DiagnosticPanelProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] shadow-[var(--machined-shadow)]",
        className,
      )}
      {...props}
    >
      <div className="border-b border-[color:var(--hairline)] px-4 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
        {title}
      </div>
      {items.map((item, index) => {
        const itemMeta = meta[item.severity];
        const Icon = itemMeta.icon;
        return (
          <div
            key={item.id ?? index}
            className="grid grid-cols-[auto_1fr] gap-3 border-b border-white/[.04] px-4 py-3 last:border-b-0"
          >
            <Icon className={cn("mt-0.5 h-4 w-4", itemMeta.tone)} />
            <div>
              <div className="text-sm text-foreground">{item.title}</div>
              {item.detail && (
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
