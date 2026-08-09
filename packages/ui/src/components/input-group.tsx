import * as React from "react";
import { cn } from "../lib/utils";

export function InputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group flex h-10 w-full items-center rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] shadow-[var(--recessed-shadow)] transition-all focus-within:border-[color:var(--ring)] focus-within:shadow-[0_0_0_1px_var(--ring),0_0_18px_color-mix(in_srgb,var(--ring)_20%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupAddon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full shrink-0 items-center px-3 font-mono text-[11px] text-muted-foreground [&_svg]:h-4 [&_svg]:w-4",
        className,
      )}
      {...props}
    />
  );
}

export function InputGroupInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-3 text-[13px] text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
