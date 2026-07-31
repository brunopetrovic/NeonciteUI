"use client";
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export const Toggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      "peer inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=unchecked]:bg-[color:var(--recessed-bg)] data-[state=unchecked]:border-[color:var(--hairline)] data-[state=unchecked]:shadow-[var(--recessed-shadow)]",
      "data-[state=checked]:bg-[#00ff66]/20 data-[state=checked]:border-[#00ff66]/60 data-[state=checked]:shadow-[0_0_24px_rgba(0,255,102,0.3),inset_0_2px_8px_rgba(0,0,0,0.5)]",
      className,
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full ring-0 transition-transform",
        "bg-gradient-to-b from-[#e5e5ea] to-[#8e8e93] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)]",
        "data-[state=checked]:translate-x-[22px] data-[state=checked]:from-[#00ff66] data-[state=checked]:to-[#00cc52] data-[state=checked]:shadow-[0_0_12px_rgba(0,255,102,0.8)]",
        "data-[state=unchecked]:translate-x-1",
      )}
    />
  </SwitchPrimitive.Root>
));
Toggle.displayName = "Toggle";
