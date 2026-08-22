import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const LazyMotionButton = React.lazy(async () => {
  const { motion } = await import("framer-motion");
  return { default: motion.button };
});

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-mono text-sm font-medium uppercase tracking-wider transition-[color,background-color,border-color,box-shadow,filter] duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[color:var(--surface-3)] to-[color:var(--surface-2)] text-foreground border border-[color:var(--hairline)] shadow-[var(--shadow-button)] hover:brightness-125",
        primary:
          "bg-[color:var(--neon-pink)] text-[color:var(--surface-0)] border border-[color:var(--neon-pink)] shadow-[var(--glow-pink)] hover:shadow-[var(--glow-pink-strong)]",
        neon: "bg-transparent border border-[color:var(--neon-cyan)]/40 text-[color:var(--neon-cyan)] [text-shadow:var(--text-glow-cyan)] hover:bg-[color:var(--neon-cyan)]/10 hover:border-[color:var(--neon-cyan)] hover:shadow-[var(--glow-cyan)]",
        ghost:
          "bg-transparent text-muted-foreground border border-transparent hover:text-foreground hover:bg-[color:var(--surface-2)] hover:border-[color:var(--hairline)]",
        outline:
          "bg-[color:var(--surface-1)] text-foreground border border-[color:var(--hairline)] shadow-[var(--shadow-inset-hairline)] hover:bg-[color:var(--surface-2)] hover:border-[color:var(--hairline-strong)]",
        destructive:
          "bg-[color:var(--neon-red)] text-[color:var(--surface-0)] border border-[color:var(--neon-red)] shadow-[var(--glow-red)] hover:shadow-[var(--glow-red-strong)]",
      },
      size: {
        sm: "h-8 rounded px-3 text-[11px]",
        md: "h-10 px-4 py-2",
        lg: "h-12 rounded-md px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

export interface ButtonProps extends NativeButtonProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Lazily loads Framer Motion and enables press/hover scale feedback. */
  animated?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, animated = false, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if (asChild) {
      return <Slot ref={ref} className={classes} {...props} />;
    }

    if (!animated) {
      return <button ref={ref} className={classes} {...props} />;
    }

    return (
      <React.Suspense fallback={<button ref={ref} className={classes} {...props} />}>
        <LazyMotionButton
          ref={ref}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className={classes}
          {...props}
        />
      </React.Suspense>
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
