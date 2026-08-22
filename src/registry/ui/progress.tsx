"use client";
import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    aria-label="progress"
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-[color:var(--recessed-bg)] border border-[color:var(--hairline)] shadow-[var(--shadow-recessed-compact)]",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-gradient-to-r from-[color:var(--neon-pink)] via-[var(--neon-purple)] to-[var(--neon-cyan)] shadow-[var(--glow-pink-strong)] transition-transform"
      style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = "Progress";
