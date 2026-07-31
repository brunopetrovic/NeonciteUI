import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/registry/ui/sheet";
import { Button } from "@/registry/ui/button";

export const usage = `import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/neoncite/sheet"
import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <Sheet><SheetTrigger asChild><Button variant="neon">Open sheet</Button></SheetTrigger>
      <SheetContent><SheetHeader><SheetTitle>Settings</SheetTitle></SheetHeader></SheetContent>
    </Sheet>
  )
}`;

export const preview = (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="neon">Open sheet</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Settings</SheetTitle>
        <SheetDescription>Adjust runtime parameters.</SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
);
