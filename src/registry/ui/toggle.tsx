"use client";
import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "@/lib/utils";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  /** @deprecated Use `pressed` for a Toggle. Kept temporarily for Switch-style migration compatibility. */
  checked?: boolean;
  /** @deprecated Use `defaultPressed` for a Toggle. Kept temporarily for Switch-style migration compatibility. */
  defaultChecked?: boolean;
  /** @deprecated Use `onPressedChange` for a Toggle. Kept temporarily for Switch-style migration compatibility. */
  onCheckedChange?: (checked: boolean) => void;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(
  (
    {
      className,
      checked,
      defaultChecked,
      onCheckedChange,
      pressed,
      defaultPressed,
      onPressedChange,
      ...props
    },
    ref,
  ) => (
    <TogglePrimitive.Root
      ref={ref}
      pressed={pressed ?? checked}
      defaultPressed={defaultPressed ?? defaultChecked}
      onPressedChange={(nextPressed) => {
        onPressedChange?.(nextPressed);
        onCheckedChange?.(nextPressed);
      }}
      className={cn(
        "inline-flex h-9 items-center justify-center gap-2 rounded-[10px] border px-3 font-mono text-[11px] font-semibold uppercase tracking-wider transition-all",
        "border-[color:var(--hairline)] bg-[color:var(--surface-1)] text-muted-foreground shadow-[var(--rim-light-shadow)]",
        "hover:border-white/15 hover:bg-[color:var(--surface-2)] hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)]",
        "disabled:pointer-events-none disabled:opacity-40",
        "data-[state=on]:border-[color:var(--neon-green)]/60 data-[state=on]:bg-[color:var(--neon-green)]/10 data-[state=on]:text-[color:var(--neon-green)] data-[state=on]:shadow-[0_0_18px_var(--neon-green-glow),var(--rim-light-shadow)]",
        className,
      )}
      {...props}
    />
  ),
);
Toggle.displayName = "Toggle";
