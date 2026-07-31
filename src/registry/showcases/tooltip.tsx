import * as React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/registry/ui/tooltip";
import { Button } from "@/registry/ui/button";

export const usage = `import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/neoncite/tooltip"
import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild><Button variant="ghost">Hover me</Button></TooltipTrigger>
        <TooltipContent>System uptime</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}`;

export const preview = (
  <TooltipProvider>
    <Tooltip open>
      <TooltipTrigger asChild>
        <Button variant="ghost">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>System uptime</TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
