"use client";
import * as React from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/ui/button";
import { Calendar } from "@/registry/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onValueChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  fromDate?: Date;
  toDate?: Date;
}

export function DatePicker({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  disabled,
  className,
  fromDate,
  toDate,
}: DatePickerProps) {
  const [internal, setInternal] = React.useState<Date | undefined>(defaultValue);
  const selected = value ?? internal;

  function select(date: Date | undefined) {
    if (value === undefined) setInternal(date);
    onValueChange?.(date);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn("w-[240px] justify-start gap-2 text-left font-normal", !selected && "text-muted-foreground", className)}
        >
          <CalendarDays className="h-4 w-4 text-[color:var(--primary)]" />
          {selected ? format(selected, "PPP") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={select}
          startMonth={fromDate}
          endMonth={toDate}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}
