import { Slider } from "@/registry/ui/slider";

export const usage = `import { Slider } from "@/components/neoncite/slider"

export function Demo() {
  return <Slider defaultValue={[64]} max={100} step={1} className="w-[280px]" />
}`;

export const preview = (
  <div className="w-[280px] space-y-3">
    <Slider defaultValue={[64]} max={100} step={1} />
    <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      <span>Min</span>
      <span className="neon-yellow">64</span>
      <span>Max</span>
    </div>
  </div>
);
