"use client";
import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../lib/utils";

export interface NumberFieldProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange" | "value" | "defaultValue"
> {
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
  step?: number;
}

export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    { className, value, defaultValue = 0, onValueChange, min, max, step = 1, disabled, ...props },
    ref,
  ) => {
    const [internal, setInternal] = React.useState(defaultValue);
    const current = value ?? internal;
    const update = (next: number) => {
      const minValue = typeof min === "number" ? min : -Infinity;
      const maxValue = typeof max === "number" ? max : Infinity;
      const bounded = Math.min(maxValue, Math.max(minValue, next));
      if (value === undefined) setInternal(bounded);
      onValueChange?.(bounded);
    };
    return (
      <div
        className={cn(
          "inline-flex h-10 items-stretch overflow-hidden rounded-[10px] border border-[color:var(--hairline)] bg-[color:var(--recessed-bg)] shadow-[var(--recessed-shadow)] focus-within:border-[color:var(--ring)]",
          className,
        )}
      >
        <button
          type="button"
          disabled={disabled}
          onClick={() => update(current - step)}
          aria-label="Decrease value"
          className="w-9 border-r border-[color:var(--hairline)] text-muted-foreground hover:bg-white/5 hover:text-foreground disabled:opacity-40"
        >
          <Minus className="mx-auto h-3.5 w-3.5" />
        </button>
        <input
          ref={ref}
          type="number"
          value={current}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          onChange={(event) => update(Number(event.target.value))}
          className="w-20 bg-transparent px-2 text-center font-mono text-[12px] tabular-nums text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          {...props}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={() => update(current + step)}
          aria-label="Increase value"
          className="w-9 border-l border-[color:var(--hairline)] text-muted-foreground hover:bg-white/5 hover:text-foreground disabled:opacity-40"
        >
          <Plus className="mx-auto h-3.5 w-3.5" />
        </button>
      </div>
    );
  },
);
NumberField.displayName = "NumberField";
