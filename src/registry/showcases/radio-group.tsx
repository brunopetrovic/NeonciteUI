import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/registry/ui/radio-group";

export const usage = `import { RadioGroup, RadioGroupItem } from "@/components/neoncite/radio-group"
import { Label } from "@/components/neoncite/label"

export function Demo() {
  return (
    <RadioGroup defaultValue="prod">
      <label className="flex items-center gap-2 text-[13px]"><RadioGroupItem value="dev" /> Development</label>
      <label className="flex items-center gap-2 text-[13px]"><RadioGroupItem value="prod" /> Production</label>
    </RadioGroup>
  )
}`;

export const preview = (
  <RadioGroup defaultValue="prod" className="space-y-2">
    <label className="flex items-center gap-2 text-[13px]">
      <RadioGroupItem value="dev" /> Development
    </label>
    <label className="flex items-center gap-2 text-[13px]">
      <RadioGroupItem value="prod" /> Production
    </label>
    <label className="flex items-center gap-2 text-[13px] opacity-50">
      <RadioGroupItem value="canary" disabled /> Canary
    </label>
  </RadioGroup>
);
