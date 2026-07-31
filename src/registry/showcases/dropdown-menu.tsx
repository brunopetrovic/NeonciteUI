import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/registry/ui/dropdown-menu";
import { Button } from "@/registry/ui/button";

export const usage = `import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/neoncite/dropdown-menu"
import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <DropdownMenu><DropdownMenuTrigger asChild><Button variant="default">Actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Restart</DropdownMenuItem>
        <DropdownMenuItem>Drain node</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`;

export const preview = (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="default">Actions</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>Cluster</DropdownMenuLabel>
      <DropdownMenuItem>Restart</DropdownMenuItem>
      <DropdownMenuItem>Drain node</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logs</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
