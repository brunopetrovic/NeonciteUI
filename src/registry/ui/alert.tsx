import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-[12px] border p-4 font-mono text-[12px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--surface-2)] border-[color:var(--hairline)] text-foreground",
        info: "bg-[var(--neon-cyan)]/[0.04] border-[var(--neon-cyan)]/30 text-[var(--neon-cyan)]",
        success: "bg-[var(--neon-green)]/[0.04] border-[var(--neon-green)]/30 text-[var(--neon-green)]",
        warning: "bg-[var(--neon-yellow)]/[0.04] border-[var(--neon-yellow)]/30 text-[var(--neon-yellow)]",
        destructive: "bg-[var(--neon-red)]/[0.04] border-[var(--neon-red)]/40 text-[var(--neon-red)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
));
Alert.displayName = "Alert";

export const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-mono text-[11px] uppercase tracking-[0.18em]", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-[12px] opacity-80 [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";
