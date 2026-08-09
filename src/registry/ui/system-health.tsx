import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusLed } from "@/registry/ui/status-led";

export interface HealthCheck {
  label: React.ReactNode;
  status: "online" | "warning" | "error" | "idle";
  value?: React.ReactNode;
  detail?: React.ReactNode;
}

export interface SystemHealthProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  checks: HealthCheck[];
  title?: React.ReactNode;
}

export function SystemHealth({
  checks,
  title = "System health",
  className,
  ...props
}: SystemHealthProps) {
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
      {checks.map((check, index) => (
        <div
          key={index}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-white/[.04] px-4 py-3 last:border-b-0"
        >
          <StatusLed
            status={check.status}
            pulse={check.status === "warning"}
            label={typeof check.label === "string" ? check.label : check.status}
          />
          <div className="min-w-0">
            <div className="text-sm text-foreground">{check.label}</div>
            {check.detail && (
              <div className="mt-0.5 truncate text-xs text-muted-foreground">{check.detail}</div>
            )}
          </div>
          {check.value && (
            <div className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {check.value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
