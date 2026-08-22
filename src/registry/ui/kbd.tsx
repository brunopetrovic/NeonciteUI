import * as React from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-6 items-center justify-center rounded-[6px] border border-[color:var(--hairline)] bg-gradient-to-b from-[color:var(--surface-3)] to-[color:var(--surface-1)] px-1.5 font-mono text-[10px] font-medium text-muted-foreground shadow-[var(--shadow-keycap)]",
        className,
      )}
      {...props}
    />
  );
}
