"use client";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cn } from "../lib/utils";

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "aspect-square h-4 w-4 rounded-full border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)]",
      "shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--surface-1)]",
      "disabled:cursor-not-allowed disabled:opacity-40",
      "data-[state=checked]:border-[color:var(--neon-pink)] data-[state=checked]:shadow-[0_0_12px_rgba(255,42,157,0.4)]",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2 w-2 fill-[color:var(--neon-pink)] text-[color:var(--neon-pink)]" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";
