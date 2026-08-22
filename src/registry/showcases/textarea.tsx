import { Textarea } from "@/registry/ui/textarea";

export const usage = `import { Textarea } from "@/components/neoncite/textarea"

export function Demo() {
  return <Textarea placeholder="// systemd unit description" />
}`;

export const preview = (
  <div className="w-[300px]">
    <Textarea placeholder="// systemd unit description" />
  </div>
);
