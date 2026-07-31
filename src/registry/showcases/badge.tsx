import * as React from "react";
import { Badge } from "@/registry/ui/badge";

export const usage = `import { Badge } from "@/components/neoncite/badge"

export function Demo() {
  return (
    <div className="flex gap-2">
      <Badge variant="green">Online</Badge>
      <Badge variant="yellow">Degraded</Badge>
      <Badge variant="red">Down</Badge>
      <Badge variant="cyan">Beta</Badge>
    </div>
  )
}`;

export const preview = (
  <div className="flex flex-wrap gap-2 justify-center">
    <Badge variant="green">Online</Badge>
    <Badge variant="yellow">Degraded</Badge>
    <Badge variant="red">Down</Badge>
    <Badge variant="cyan">Beta</Badge>
    <Badge variant="pink">v0.1</Badge>
  </div>
);
