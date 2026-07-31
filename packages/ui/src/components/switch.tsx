"use client";
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../lib/utils";

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer items-center rounded-full",
      "border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]",
      "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)]",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:bg-[color:var(--neon-pink)] data-[state=checked]:border-[color:var(--neon-pink)] data-[state=checked]:shadow-[inset_0_1px_2px_rgba(0,0,0,0.4),0_0_16px_rgba(255,42,157,0.5)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-[16px] w-[16px] rounded-full bg-gradient-to-b from-[#f5f5f7] to-[#a8a8ad]",
        "shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)]",
        "ring-0 transition-transform data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-[2px]",
      )}
    />
  </SwitchPrimitive.Root>
));
Switch.displayName = "Switch";
