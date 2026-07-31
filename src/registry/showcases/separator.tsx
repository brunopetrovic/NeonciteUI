import * as React from "react";
import { Separator } from "@/registry/ui/separator";

export const usage = `import { Separator } from "@/components/neoncite/separator"

export function Demo() {
  return (
    <div className="space-y-2 w-[260px]">
      <p className="text-[12px] text-muted-foreground">Section A</p>
      <Separator />
      <p className="text-[12px] text-muted-foreground">Section B</p>
    </div>
  )
}`;

export const preview = (
  <div className="space-y-2 w-[260px] text-center">
    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      Section A
    </p>
    <Separator />
    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      Section B
    </p>
  </div>
);
