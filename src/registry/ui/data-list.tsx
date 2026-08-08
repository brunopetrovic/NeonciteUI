import * as React from "react";
import { cn } from "@/lib/utils";

export function DataList({ className, ...props }: React.ComponentProps<"dl">) {
  return <dl className={cn("divide-y divide-white/[.05]", className)} {...props} />;
}

export function DataListItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3", className)}
      {...props}
    />
  );
}

export function DataListLabel({ className, ...props }: React.ComponentProps<"dt">) {
  return (
    <dt
      className={cn(
        "font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function DataListValue({ className, ...props }: React.ComponentProps<"dd">) {
  return <dd className={cn("text-sm text-foreground", className)} {...props} />;
}
