import * as React from "react";
import { Clock3 } from "lucide-react";
import { cn } from "../lib/utils";

export const TimePicker = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <label
    className={cn(
      "flex h-10 items-center gap-2 rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] px-3 shadow-[var(--recessed-shadow)] focus-within:border-[color:var(--ring)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_18px_color-mix(in_srgb,var(--ring)_20%,transparent)]",
      className,
    )}
  >
    <Clock3 className="h-4 w-4 text-[color:var(--neon-cyan)]" />
    <input
      ref={ref}
      type="time"
      className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-foreground outline-none [color-scheme:dark]"
      {...props}
    />
  </label>
));
TimePicker.displayName = "TimePicker";
