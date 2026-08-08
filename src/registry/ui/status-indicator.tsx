import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusIndicatorVariants = cva("inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em]", {
  variants: {
    status: {
      online: "text-[color:var(--neon-green)]",
      warning: "text-[color:var(--neon-yellow)]",
      offline: "text-[color:var(--neon-red)]",
      info: "text-[color:var(--neon-cyan)]",
      idle: "text-muted-foreground",
    },
  },
  defaultVariants: { status: "idle" },
});

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statusIndicatorVariants> {
  pulse?: boolean;
}

export function StatusIndicator({ status, pulse = false, className, children, ...props }: StatusIndicatorProps) {
  return (
    <span className={cn(statusIndicatorVariants({ status }), className)} {...props}>
      <span className={cn("h-2 w-2 rounded-full bg-current shadow-[0_0_10px_currentColor]", pulse && "animate-pulse motion-reduce:animate-none")} aria-hidden="true" />
      {children}
    </span>
  );
}

export { statusIndicatorVariants };
