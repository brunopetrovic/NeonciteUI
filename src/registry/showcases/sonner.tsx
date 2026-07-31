import * as React from "react";
import { toast } from "@/registry/ui/sonner";
import { Button } from "@/registry/ui/button";

export const usage = `import { Toaster, toast } from "@/components/neoncite/sonner"
import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <Button onClick={() => toast.success("Deployed", { description: "v1.0.0 is live" })}>Show toast</Button>
  )
}`;

export const preview = (
  <Button
    variant="neon"
    onClick={() => toast.success("Deployed", { description: "v1.0.0 is live" })}
  >
    Show toast
  </Button>
);
