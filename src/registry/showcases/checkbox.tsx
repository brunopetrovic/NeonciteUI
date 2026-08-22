import { Checkbox } from "@/registry/ui/checkbox";

export const usage = `import { Checkbox } from "@/components/neoncite/checkbox"

export function Demo() {
  return (
    <label className="flex items-center gap-2 text-[13px]">
      <Checkbox defaultChecked /> Accept terms
    </label>
  )
}`;

export const preview = (
  <div className="space-y-2.5">
    <label className="flex items-center gap-2.5 text-[13px]">
      <Checkbox defaultChecked /> Enable telemetry
    </label>
    <label className="flex items-center gap-2.5 text-[13px]">
      <Checkbox /> Auto-restart on crash
    </label>
    <label className="flex items-center gap-2.5 text-[13px] opacity-50">
      <Checkbox disabled /> Beta features
    </label>
  </div>
);
