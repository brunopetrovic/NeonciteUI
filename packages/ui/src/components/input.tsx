import * as React from "react";
import { cn } from "../lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex h-10 w-full rounded-[10px] bg-[color:var(--recessed-bg)] px-3.5 py-2 text-[13px] text-foreground",
        "border border-[color:var(--hairline)] shadow-[var(--recessed-shadow)]",
        "placeholder:text-muted-foreground/60 file:border-0 file:bg-transparent file:text-sm",
        "focus-visible:outline-none focus-visible:border-[color:var(--ring)]/60 focus-visible:shadow-[var(--recessed-shadow)] focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)]/15",
        "transition-all disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
