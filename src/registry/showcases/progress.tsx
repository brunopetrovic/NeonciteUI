import * as React from "react";
import { Progress } from "@/registry/ui/progress";

export const usage = `import { Progress } from "@/components/neoncite/progress"

export function Demo() {
  return <Progress value={68} className="w-[280px]" />
}`;

export const preview = (
  <div className="w-[280px] space-y-3">
    <Progress value={68} />
    <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      <span>Sync</span>
      <span className="neon-pink">68%</span>
    </div>
  </div>
);
