import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[8px] bg-gradient-to-r from-[#0a0a0a] via-[#161618] to-[#0a0a0a]",
        "border border-[color:var(--hairline)]",
        className,
      )}
      {...props}
    />
  );
}
