import * as React from "react";
import { cn } from "../lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[8px] bg-gradient-to-r from-[var(--surface-1)] via-[var(--surface-2)] to-[var(--surface-1)]",
        "border border-[color:var(--hairline)]",
        className,
      )}
      {...props}
    />
  );
}
