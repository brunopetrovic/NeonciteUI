import * as React from "react";
import { cn } from "../lib/utils";

export interface TimelineItem {
  id?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
  icon?: React.ReactNode;
}
export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
}

export function Timeline({ items, className, ...props }: TimelineProps) {
  return (
    <div className={cn("relative space-y-6", className)} {...props}>
      <div className="absolute bottom-3 left-4 top-3 w-px bg-[color:var(--hairline)]" />
      {items.map((item, index) => (
        <div key={item.id ?? index} className="relative grid grid-cols-[32px_1fr] gap-3">
          <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface-2)] text-[color:var(--neon-cyan)] shadow-[var(--rim-light-shadow)]">
            {item.icon ?? (
              <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            )}
          </div>
          <div className="pt-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="text-sm font-medium text-foreground">{item.title}</div>
              {item.time && (
                <div className="font-mono text-[10px] text-muted-foreground">{item.time}</div>
              )}
            </div>
            {item.description && (
              <div className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
