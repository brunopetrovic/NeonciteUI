import * as React from "react";
import { cn } from "@/lib/utils";

export interface HudPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  corner?: React.ReactNode;
}
export function HudPanel({ label, corner, className, children, ...props }: HudPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[4px] border border-[color:var(--neon-cyan)]/25 bg-[color:var(--surface-1)] p-5 shadow-[inset_0_0_32px_rgba(0,240,255,.025)]",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-[color:var(--neon-cyan)]" />
      <span className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-[color:var(--neon-cyan)]" />
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[color:var(--neon-cyan)]" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[color:var(--neon-cyan)]" />
      {(label || corner) && (
        <div className="mb-4 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground">
          <span>{label}</span>
          <span>{corner}</span>
        </div>
      )}
      {children}
    </div>
  );
}
