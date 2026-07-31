import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/registry/ui/popover";
import { Button } from "@/registry/ui/button";

export const usage = `import { Popover, PopoverContent, PopoverTrigger } from "@/components/neoncite/popover"
import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <Popover><PopoverTrigger asChild><Button variant="ghost">Open</Button></PopoverTrigger>
      <PopoverContent>Anchored panel</PopoverContent>
    </Popover>
  )
}`;

export const preview = (
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="ghost">Open popover</Button>
    </PopoverTrigger>
    <PopoverContent>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Anchored panel
      </p>
    </PopoverContent>
  </Popover>
);
