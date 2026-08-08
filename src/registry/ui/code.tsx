import * as React from "react";
import { cn } from "@/lib/utils";

export function InlineCode({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cn("rounded-[6px] border border-[color:var(--hairline)] bg-[color:var(--surface-2)] px-1.5 py-0.5 font-mono text-[.9em] text-[color:var(--neon-cyan)]", className)} {...props} />;
}

export function Code({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <code className={cn("font-mono text-[13px] text-foreground", className)} {...props} />;
}

export function CodeBlock({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  return <pre className={cn("overflow-x-auto rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] p-4 font-mono text-[12px] leading-relaxed text-foreground shadow-[var(--recessed-shadow)]", className)} {...props} />;
}
