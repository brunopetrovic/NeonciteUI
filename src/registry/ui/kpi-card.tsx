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
  pink: { color: "#ff2a9d", glow: "rgba(255,42,157,0.5)" },
  cyan: { color: "#00f0ff", glow: "rgba(0,240,255,0.5)" },
  green: { color: "#00ff66", glow: "rgba(0,255,102,0.5)" },
  yellow: { color: "#ffcc00", glow: "rgba(255,204,0,0.5)" },
  purple: { color: "#b829ff", glow: "rgba(184,41,255,0.5)" },
} as const;

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  ({ className, label, value, delta, trend = "flat", accent = "cyan", ...props }, ref) => {
    const a = accentMap[accent];
    const trendColor = trend === "up" ? "#00ff66" : trend === "down" ? "#ff003c" : "#8e8e93";
    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-[14px] border border-[color:var(--hairline)] p-5",
          "bg-gradient-to-b from-[#121214] to-[#0a0a0c] shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)]",
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
