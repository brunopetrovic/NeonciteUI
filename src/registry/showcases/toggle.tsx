import * as React from "react";
import { Bold, Star } from "lucide-react";
import { Toggle } from "@/registry/ui/toggle";

export const usage = `import { Toggle } from "@/components/neoncite/toggle"
import { Bold } from "lucide-react"

export function Demo() {
  return (
    <Toggle defaultPressed aria-label="Toggle bold">
      <Bold /> Bold
    </Toggle>
  )
}`;

export const preview = (
  <div className="flex items-center gap-3">
    <Toggle defaultPressed aria-label="Toggle bold">
      <Bold size={14} /> Bold
    </Toggle>
    <Toggle aria-label="Toggle favorite">
      <Star size={14} /> Favorite
    </Toggle>
  </div>
);
