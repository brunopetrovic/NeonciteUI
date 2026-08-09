import * as React from "react";
import { cn } from "../lib/utils";

export function TelemetryPanel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] shadow-[var(--machined-shadow)]",
        className,
      )}
      {...props}
    />
  );
}

export function TelemetryHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-[color:var(--hairline)] px-4 py-3 font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export interface TelemetryRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  detail?: React.ReactNode;
  tone?: "default" | "green" | "cyan" | "yellow" | "red" | "purple";
}

const tones = {
  default: "text-foreground",
  green: "text-[color:var(--neon-green)]",
  cyan: "text-[color:var(--neon-cyan)]",
  yellow: "text-[color:var(--neon-yellow)]",
  red: "text-[color:var(--neon-red)]",
  purple: "text-[color:var(--neon-purple)]",
};

export function TelemetryRow({
  label,
  value,
  detail,
  tone = "default",
  className,
  ...props
}: TelemetryRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-white/[.04] px-4 py-3 last:border-b-0",
        className,
      )}
      {...props}
    >
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-[.15em] text-muted-foreground">
          {label}
        </div>
        {detail && <div className="mt-1 truncate text-xs text-muted-foreground">{detail}</div>}
      </div>
      <div className={cn("font-mono text-sm font-semibold tabular-nums", tones[tone])}>{value}</div>
    </div>
  );
}
