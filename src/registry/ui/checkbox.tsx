"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-[4px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)]",
      "shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)]",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:bg-[color:var(--neon-pink)] data-[state=checked]:border-[color:var(--neon-pink)] data-[state=checked]:shadow-[0_0_12px_rgba(255,42,157,0.5)] data-[state=checked]:text-white",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      <Check className="h-3 w-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = "Checkbox";
