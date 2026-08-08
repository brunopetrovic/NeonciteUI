import * as React from "react";
import { cn } from "../lib/utils";

export interface SparklineMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  data: number[];
  delta?: React.ReactNode;
  accent?: string;
}

function points(data: number[], width = 120, height = 34) {
  if (data.length < 2) return "";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  return data
    .map(
      (value, index) =>
        `${(index / (data.length - 1)) * width},${height - ((value - min) / span) * height}`,
    )
    .join(" ");
}

export function SparklineMetric({
  label,
  value,
  data,
  delta,
  accent = "var(--neon-cyan)",
  className,
  ...props
}: SparklineMetricProps) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-4 shadow-[var(--rim-light-shadow)]",
        className,
      )}
      {...props}
    >
      <div className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex items-end justify-between gap-4">
        <div>
          <div className="font-mono text-2xl font-bold tabular-nums text-foreground">{value}</div>
          {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
        </div>
        <svg
          viewBox="0 0 120 34"
          className="h-[34px] w-[120px] overflow-visible"
          aria-hidden="true"
        >
          <polyline
            fill="none"
            stroke={accent}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points(data)}
            style={{ filter: `drop-shadow(0 0 5px ${accent})` }}
          />
        </svg>
      </div>
    </div>
  );
}
