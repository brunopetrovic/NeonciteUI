import * as React from "react";
import { cn } from "@/lib/utils";

export interface ResourceMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  ariaLabel?: string;
  value: number;
  max?: number;
  unit?: React.ReactNode;
  detail?: React.ReactNode;
}

export function ResourceMeter({
  label,
  ariaLabel,
  value,
  max = 100,
  unit = "%",
  detail,
  className,
  ...props
}: ResourceMeterProps) {
  const percent = Math.min(100, Math.max(0, max === 0 ? 0 : (value / max) * 100));
  const tone =
    percent >= 90 ? "var(--neon-red)" : percent >= 70 ? "var(--neon-yellow)" : "var(--neon-green)";
  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
            {label}
          </div>
          {detail && <div className="mt-0.5 text-xs text-muted-foreground/70">{detail}</div>}
        </div>
        <div className="font-mono text-sm font-semibold tabular-nums text-foreground">
          {value}
          <span className="ml-0.5 text-[10px] text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div
        className="h-2 overflow-hidden rounded-full border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] shadow-[var(--recessed-shadow)]"
        role="meter"
        aria-label={ariaLabel ?? `${label}: ${value}${unit}`}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div
          className="h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%`, background: tone, boxShadow: `0 0 12px ${tone}` }}
        />
      </div>
    </div>
  );
}
