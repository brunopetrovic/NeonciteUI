import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ledVariants = cva("inline-block rounded-full bg-current shadow-[0_0_12px_currentColor]", {
  variants: {
    status: {
      online: "text-[color:var(--neon-green)]",
      warning: "text-[color:var(--neon-yellow)]",
      error: "text-[color:var(--neon-red)]",
      info: "text-[color:var(--neon-cyan)]",
      idle: "text-muted-foreground",
    },
    size: { sm: "h-1.5 w-1.5", md: "h-2.5 w-2.5", lg: "h-3.5 w-3.5" },
  },
  defaultVariants: { status: "idle", size: "md" },
});

export interface StatusLedProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof ledVariants> {
  pulse?: boolean;
  label?: string;
}
export function StatusLed({
  status,
  size,
  pulse = false,
  label,
  className,
  ...props
}: StatusLedProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn(
        ledVariants({ status, size }),
        pulse && "animate-pulse motion-reduce:animate-none",
        className,
      )}
      {...props}
    />
  );
}
export { ledVariants };
