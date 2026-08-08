import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] text-foreground border border-[color:var(--hairline)] shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.12)] hover:from-[#3a3a3c] hover:to-[#252527]",
        primary:
          "bg-[#d11a7d] text-white border border-[#d11a7d] shadow-[0_0_24px_rgba(255,42,157,0.4),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:shadow-[0_0_32px_rgba(255,42,157,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)]",
        neon: "bg-transparent border border-[#00f0ff]/40 text-[#00f0ff] [text-shadow:0_0_12px_rgba(0,240,255,0.5)] hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] hover:shadow-[0_0_24px_rgba(0,240,255,0.3)]",
        ghost: "bg-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground",
        outline:
          "bg-transparent border border-[color:var(--hairline)] text-foreground hover:bg-white/5 hover:border-white/20",
        destructive:
          "bg-[#ff003c] text-white shadow-[0_0_24px_rgba(255,0,60,0.4)] hover:shadow-[0_0_32px_rgba(255,0,60,0.6)]",
      },
      size: {
        sm: "h-8 px-3 text-[12px]",
        md: "h-10 px-4 text-[13px]",
        lg: "h-12 px-6 text-[14px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

type NativeButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"
>;

export interface ButtonProps extends NativeButtonProps, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
      );
    }
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
