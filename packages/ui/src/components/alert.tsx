import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-[12px] border p-4 font-mono text-[12px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--surface-2)] border-[color:var(--hairline)] text-foreground",
        info: "bg-[#00f0ff]/[0.04] border-[#00f0ff]/30 text-[#00f0ff]",
        success: "bg-[#00ff66]/[0.04] border-[#00ff66]/30 text-[#00ff66]",
        warning: "bg-[#ffcc00]/[0.04] border-[#ffcc00]/30 text-[#ffcc00]",
        destructive: "bg-[#ff003c]/[0.04] border-[#ff003c]/40 text-[#ff003c]",
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
