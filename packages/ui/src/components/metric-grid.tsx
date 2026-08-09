import * as React from "react";
import { cn } from "../lib/utils";

export function MetricGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)} {...props} />;
}
