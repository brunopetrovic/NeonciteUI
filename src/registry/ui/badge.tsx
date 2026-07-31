import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white/[0.04] text-foreground border-[color:var(--hairline)]",
        pink: "bg-[color:var(--neon-pink)]/10 text-[color:var(--neon-pink)] border-[color:var(--neon-pink)]/40 [text-shadow:0_0_8px_rgba(255,42,157,0.6)]",
        cyan: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/40 [text-shadow:0_0_8px_rgba(0,240,255,0.6)]",
        green:
          "bg-[#00ff66]/10 text-[#00ff66] border-[#00ff66]/40 [text-shadow:0_0_8px_rgba(0,255,102,0.6)]",
        yellow:
          "bg-[#ffcc00]/10 text-[#ffcc00] border-[#ffcc00]/40 [text-shadow:0_0_8px_rgba(255,204,0,0.6)]",
        red: "bg-[#ff003c]/10 text-[#ff003c] border-[#ff003c]/40 [text-shadow:0_0_8px_rgba(255,0,60,0.6)]",
        outline: "bg-transparent text-muted-foreground border-[color:var(--hairline)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps extends HTMLMotionProps<"span">, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <motion.span
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { badgeVariants };
