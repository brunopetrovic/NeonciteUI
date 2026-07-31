import * as React from "react";
import { Calendar } from "@/registry/ui/calendar";

export const usage = `import { Calendar } from "@/components/neoncite/calendar"
import { useState } from "react"

export function Demo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return <Calendar mode="single" selected={date} onSelect={setDate} />
}`;

export const preview = (
  <div className="rounded-[14px] border border-[color:var(--hairline)] bg-[color:var(--surface-1)] inline-block">
    <Calendar mode="single" />
  </div>
);
