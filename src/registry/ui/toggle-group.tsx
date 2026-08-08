"use client";
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toggleGroupItemVariants = cva(
  "inline-flex h-9 min-w-9 items-center justify-center rounded-[9px] border border-transparent px-3 text-[12px] font-medium text-muted-foreground transition-all hover:bg-white/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] disabled:pointer-events-none disabled:opacity-40 data-[state=on]:border-[color:var(--primary)]/50 data-[state=on]:bg-[color:var(--primary)]/10 data-[state=on]:text-[color:var(--primary)] data-[state=on]:shadow-[0_0_16px_color-mix(in_srgb,var(--primary)_24%,transparent)]",
  {
    variants: {
      variant: {
        default: "",
        outline: "border-[color:var(--hairline)] bg-[color:var(--surface-1)]",
      },
      size: {
        sm: "h-8 min-w-8 px-2 text-[11px]",
        md: "h-9 min-w-9 px-3",
        lg: "h-10 min-w-10 px-4 text-[13px]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
);

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleGroupItemVariants>>({
  size: "md",
  variant: "default",
});

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleGroupItemVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "inline-flex items-center gap-1 rounded-[12px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] p-1",
      className,
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));
ToggleGroup.displayName = "ToggleGroup";

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleGroupItemVariants>
>(({ className, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleGroupItemVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className,
      )}
      {...props}
    />
  );
});
ToggleGroupItem.displayName = "ToggleGroupItem";

export { toggleGroupItemVariants };
