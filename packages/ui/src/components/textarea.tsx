import * as React from "react";
import { cn } from "../lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[88px] w-full rounded-[10px] bg-[color:var(--recessed-bg)] px-3.5 py-2.5 text-[13px] text-foreground",
        "border border-[color:var(--hairline)] shadow-[var(--recessed-shadow)]",
        "placeholder:text-muted-foreground/60 resize-y",
        "focus-visible:outline-none focus-visible:border-[color:var(--ring)]/60 focus-visible:shadow-[var(--recessed-shadow)] focus-visible:ring-[3px] focus-visible:ring-[color:var(--ring)]/15",
        "transition-all disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";
