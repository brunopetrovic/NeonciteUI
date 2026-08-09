"use client";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div
      className={cn(
        "flex h-10 items-center rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] pr-2 shadow-[var(--recessed-shadow)] focus-within:border-[color:var(--ring)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_18px_color-mix(in_srgb,var(--ring)_20%,transparent)]",
        className,
      )}
    >
      <input
        ref={ref}
        type={visible ? "text" : "password"}
        className="h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="flex h-7 w-7 items-center justify-center rounded-[7px] text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
});
PasswordInput.displayName = "PasswordInput";
