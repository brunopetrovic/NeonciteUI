import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const LazyMotionSpan = React.lazy(async () => {
  const { motion } = await import("framer-motion");
  return { default: motion.span };
});

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest border transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--surface-2)] text-foreground border-[color:var(--hairline)]",
        pink: "bg-[color:var(--neon-pink)]/10 text-[color:var(--neon-pink)] border-[color:var(--neon-pink)]/40 [text-shadow:var(--text-glow-pink)]",
        cyan: "bg-[color:var(--neon-cyan)]/10 text-[color:var(--neon-cyan)] border-[color:var(--neon-cyan)]/40 [text-shadow:var(--text-glow-cyan)]",
        green:
          "bg-[color:var(--neon-green)]/10 text-[color:var(--neon-green)] border-[color:var(--neon-green)]/40 [text-shadow:var(--text-glow-green)]",
        yellow:
          "bg-[color:var(--neon-yellow)]/10 text-[color:var(--neon-yellow)] border-[color:var(--neon-yellow)]/40 [text-shadow:var(--text-glow-yellow)]",
        red: "bg-[color:var(--neon-red)]/10 text-[color:var(--neon-red)] border-[color:var(--neon-red)]/40 [text-shadow:var(--text-glow-red)]",
        outline: "bg-transparent text-muted-foreground border-[color:var(--hairline)]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
  /** Lazily loads Framer Motion and enables press/hover movement. */
  animated?: boolean;
}

export function Badge({ className, variant, animated = false, ...props }: BadgeProps) {
  const classes = cn(badgeVariants({ variant }), className);

  if (!animated) {
    return <span className={classes} {...props} />;
  }

  return (
    <React.Suspense fallback={<span className={classes} {...props} />}>
      <LazyMotionSpan
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
        className={classes}
        {...props}
      />
    </React.Suspense>
  );
}

export { badgeVariants };
