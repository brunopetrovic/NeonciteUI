import { Switch } from "@/registry/ui/switch";

export const usage = `import { Switch } from "@/components/neoncite/switch"

export function Demo() {
  return <Switch defaultChecked />
}`;

export const preview = (
  <div className="flex items-center gap-6">
    <div className="flex flex-col items-center gap-2">
      <Switch defaultChecked />
      <span className="font-mono text-[10px] uppercase tracking-widest neon-pink">On</span>
    </div>
    <div className="flex flex-col items-center gap-2">
      <Switch />
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Off
      </span>
    </div>
  </div>
);
