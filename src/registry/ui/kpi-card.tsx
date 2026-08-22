import * as React from "react";
import { cn } from "@/lib/utils";

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  accent?: "pink" | "cyan" | "green" | "yellow" | "purple";
}

const accentMap = {
  pink: { color: "var(--neon-pink)", glow: "var(--neon-pink-glow)" },
  cyan: { color: "var(--neon-cyan)", glow: "var(--neon-cyan-glow)" },
  green: { color: "var(--neon-green)", glow: "var(--neon-green-glow)" },
  yellow: { color: "var(--neon-yellow)", glow: "var(--neon-yellow-glow)" },
  purple: { color: "var(--neon-purple)", glow: "var(--neon-purple-glow)" },
} as const;

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ className, label, value, delta, trend = "flat", accent = "cyan", ...props }, ref) => {
    const a = accentMap[accent];
    const trendColor =
      trend === "up"
        ? "var(--neon-green)"
        : trend === "down"
          ? "var(--neon-red)"
          : "var(--muted-foreground)";
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[14px] border border-[color:var(--hairline)] p-5",
          "bg-gradient-to-b from-[var(--surface-2)] to-[var(--card)] shadow-[var(--machined-shadow)]",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${a.color}, transparent)` }}
        />
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div
          className="mt-2 text-[28px] font-semibold tabular-nums leading-none"
          style={{ color: a.color, textShadow: `0 0 16px ${a.glow}` }}
        >
          {value}
        </div>
        {delta && (
          <div className="mt-3 font-mono text-[11px] tabular-nums" style={{ color: trendColor }}>
            {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"} {delta}
          </div>
        )}
      </div>
    );
  },
);
KpiCard.displayName = "KpiCard";
