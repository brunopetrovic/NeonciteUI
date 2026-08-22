"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-4", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-[13px] font-mono font-semibold text-foreground",
        nav: "space-x-1 flex items-center",
        nav_button:
          "h-7 w-7 inline-flex items-center justify-center rounded-[8px] border border-[color:var(--hairline)] bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-[6px] w-9 font-mono text-[10px] uppercase tracking-widest font-normal",
        row: "flex w-full mt-1",
        cell: cn(
          "relative p-0 text-center text-[13px] focus-within:relative focus-within:z-20",
          "[&:has([aria-selected])]:bg-[color:var(--primary)]/10 [&:has([aria-selected])]:rounded-[8px]",
        ),
        day: cn(
          "h-9 w-9 p-0 font-normal inline-flex items-center justify-center rounded-[8px] transition-all",
          "text-foreground hover:bg-white/[0.06] hover:text-foreground",
          "focus:outline-none focus:ring-2 focus:ring-[color:var(--ring)] focus:ring-offset-0",
          "aria-selected:bg-[color:var(--primary)] aria-selected:text-[color:var(--surface-0)] aria-selected:shadow-[var(--glow-pink)] aria-selected:hover:bg-[color:var(--primary)]",
        ),
        day_today: "border border-[color:var(--primary)]/40 text-[color:var(--primary)]",
        day_outside:
          "text-muted-foreground/40 aria-selected:bg-[color:var(--primary)]/30 aria-selected:text-white/60",
        day_disabled: "text-muted-foreground/20 cursor-not-allowed",
        day_range_middle:
          "aria-selected:bg-[color:var(--primary)]/15 aria-selected:text-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
