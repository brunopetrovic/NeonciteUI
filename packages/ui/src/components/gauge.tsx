import * as React from "react";
import { cn } from "../lib/utils";

export interface GaugeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  min?: number;
  max?: number;
  label?: React.ReactNode;
  unit?: React.ReactNode;
  accent?: string;
}

export function Gauge({
  value,
  min = 0,
  max = 100,
  label,
  unit,
  accent = "var(--neon-cyan)",
  className,
  ...props
}: GaugeProps) {
  const bounded = Math.min(max, Math.max(min, value));
  const ratio = max === min ? 0 : (bounded - min) / (max - min);
  const degrees = Math.round(ratio * 270);
  return (
    <div className={cn("inline-flex flex-col items-center", className)} {...props}>
      <div
        className="relative h-32 w-32 rounded-full p-[9px]"
        style={{
          background: `conic-gradient(from 225deg, ${accent} 0deg ${degrees}deg, rgba(255,255,255,.08) ${degrees}deg 270deg, transparent 270deg 360deg)`,
        }}
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={bounded}
      >
        <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface-1)] shadow-[inset_0_8px_24px_rgba(0,0,0,.7),var(--rim-light-shadow)]">
          <div className="font-mono text-2xl font-bold tabular-nums text-foreground">{bounded}</div>
          {unit && (
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {unit}
            </div>
          )}
        </div>
      </div>
      {label && (
        <div className="mt-2 font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
          {label}
        </div>
      )}
    </div>
  );
}
