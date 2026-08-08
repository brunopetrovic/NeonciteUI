import * as React from "react";
import { cn } from "@/lib/utils";
import { StatusLed } from "@/registry/ui/status-led";

export interface ActivityItem { id?: string; title: React.ReactNode; detail?: React.ReactNode; time?: React.ReactNode; status?: "online" | "warning" | "error" | "info" | "idle"; icon?: React.ReactNode; }
export interface ActivityStreamProps extends React.HTMLAttributes<HTMLDivElement> { items: ActivityItem[]; }

export function ActivityStream({ items, className, ...props }: ActivityStreamProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="absolute bottom-3 left-[7px] top-3 w-px bg-[color:var(--hairline)]" aria-hidden="true" />
      <div className="space-y-4">{items.map((item, index) => <div key={item.id ?? index} className="relative grid grid-cols-[16px_1fr_auto] gap-3"><div className="relative z-10 flex items-start justify-center pt-1">{item.icon ?? <StatusLed status={item.status ?? "idle"} size="sm" />}</div><div className="min-w-0"><div className="text-sm text-foreground">{item.title}</div>{item.detail && <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</div>}</div>{item.time && <div className="font-mono text-[10px] tabular-nums text-muted-foreground">{item.time}</div>}</div>)}</div>
    </div>
  );
}
