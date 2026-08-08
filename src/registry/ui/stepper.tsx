import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperItem { title: React.ReactNode; description?: React.ReactNode; }
export interface StepperProps extends React.HTMLAttributes<HTMLOListElement> { items: StepperItem[]; current: number; }

export function Stepper({ items, current, className, ...props }: StepperProps) {
  return <ol className={cn("flex flex-col gap-4 sm:flex-row sm:gap-0", className)} {...props}>{items.map((item, index) => { const complete = index < current; const active = index === current; return <li key={index} className="relative flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:text-center"><div className={cn("relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold", complete && "border-[color:var(--neon-green)] bg-[color:var(--neon-green)]/15 text-[color:var(--neon-green)]", active && "border-[color:var(--primary)] bg-[color:var(--primary)]/15 text-[color:var(--primary)] shadow-[0_0_18px_color-mix(in_srgb,var(--primary)_30%,transparent)]", !complete && !active && "border-[color:var(--hairline)] bg-[color:var(--surface-2)] text-muted-foreground")}>{complete ? <Check className="h-4 w-4" /> : index + 1}</div>{index < items.length - 1 && <div className={cn("absolute left-4 top-8 h-[calc(100%+1rem)] w-px -translate-x-1/2 bg-[color:var(--hairline)] sm:left-1/2 sm:top-4 sm:h-px sm:w-full sm:translate-x-4", complete && "bg-[color:var(--neon-green)]/50")} aria-hidden="true" />}<div><div className={cn("text-sm font-medium", active || complete ? "text-foreground" : "text-muted-foreground")}>{item.title}</div>{item.description && <div className="mt-1 text-xs text-muted-foreground">{item.description}</div>}</div></li>; })}</ol>;
}
