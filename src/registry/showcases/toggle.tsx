import * as React from "react";
import { Toggle } from "@/registry/ui/toggle";

export const usage = `import { Toggle } from "@/components/neoncite/toggle"

export function Demo() {
  return <Toggle defaultChecked />
}`;

export const preview = (
  <div className="flex items-center gap-6">
    <div className="flex flex-col items-center gap-2">
      <Toggle defaultChecked />
      <span className="font-mono text-[10px] uppercase tracking-widest neon-green">Active</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Toggle />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Off
      </span>
    </div>
  </div>
);
