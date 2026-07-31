import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/registry/ui/alert";
import { AlertTriangle } from "lucide-react";

export const usage = `import { Alert, AlertTitle, AlertDescription } from "@/components/neoncite/alert"
import { AlertTriangle } from "lucide-react"

export function Demo() {
  return (
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Disk pressure</AlertTitle>
      <AlertDescription>Node-02 at 91% utilization.</AlertDescription>
    </Alert>\n  )\n}`;

export const preview = (
  <div className="w-[340px]">
    <Alert variant="warning">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Disk pressure</AlertTitle>
      <AlertDescription>Node-02 at 91% utilization.</AlertDescription>
    </Alert>
  </div>
);
