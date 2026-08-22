import { Label } from "@/registry/ui/label";
import { Input } from "@/registry/ui/input";

export const usage = `import { Label } from "@/components/neoncite/label"
import { Input } from "@/components/neoncite/input"

export function Demo() {
  return (
    <div className="space-y-1.5"><Label htmlFor="h">Hostname</Label><Input id="h" placeholder="cluster-01" /></div>
  )
}`;

export const preview = (
  <div className="space-y-1.5 w-[260px]">
    <Label htmlFor="h">Hostname</Label>
    <Input id="h" placeholder="cluster-01" />
  </div>
);
