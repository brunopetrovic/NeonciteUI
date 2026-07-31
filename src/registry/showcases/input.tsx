import * as React from "react";
import { Input } from "@/registry/ui/input";

export const usage = `import { Input } from "@/components/neoncite/input"

export function Demo() {
  return <Input placeholder="hostname.local" />
}`;

export const preview = (
  <div className="w-[280px]">
    <Input placeholder="hostname.local" />
  </div>
);
