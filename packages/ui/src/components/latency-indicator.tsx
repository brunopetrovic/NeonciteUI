import * as React from "react";
import { cn } from "../lib/utils";

export interface LatencyIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  thresholds?: { good: number; warning: number };
}

export function LatencyIndicator({
  value,
  thresholds = { good: 80, warning: 180 },
  className,
  ...props
}: LatencyIndicatorProps) {
  const tone =
    value <= thresholds.good
      ? "var(--neon-green)"
      : value <= thresholds.warning
        ? "var(--neon-yellow)"
        : "var(--neon-red)";
  const bars = value <= thresholds.good ? 4 : value <= thresholds.warning ? 3 : 1;
  return (
    <div
      className={cn("inline-flex items-end gap-2 font-mono", className)}
      aria-label={`${value} milliseconds latency`}
      {...props}
    >
      <span className="flex h-4 items-end gap-[2px]" aria-hidden="true">
        {[1, 2, 3, 4].map((bar) => (
          <span
            key={bar}
            className="w-[3px] rounded-[1px]"
            style={{
              height: `${bar * 25}%`,
              background: bar <= bars ? tone : "color-mix(in oklab, white 10%, transparent)",
              boxShadow: bar <= bars ? `0 0 6px ${tone}` : undefined,
            }}
          />
        ))}
      </span>
      <span className="text-[11px] tabular-nums text-foreground">
        {value}
        <span className="ml-0.5 text-[9px] uppercase text-muted-foreground">ms</span>
      </span>
    </div>
  );
}
