import { Button } from "@/registry/ui/button";

export const usage = `import { Button } from "@/components/neoncite/button"

export function Demo() {
  return (
    <div className="flex gap-3">
      <Button variant="primary">Deploy</Button>
      <Button variant="neon">Connect</Button>
      <Button variant="default">Settings</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  )
}`;

export const preview = (
  <div className="flex flex-wrap items-center justify-center gap-3">
    <Button variant="primary">Deploy</Button>
    <Button variant="neon">Connect</Button>
    <Button variant="default">Settings</Button>
    <Button variant="ghost">Cancel</Button>
  </div>
);

export const variations = [
  {
    name: "Sizes",
    usage: `<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`,
    preview: (
      <div className="flex items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    ),
  },
  {
    name: "States",
    usage: `<Button disabled>Disabled</Button>
<Button variant="primary" className="opacity-70">Loading...</Button>`,
    preview: (
      <div className="flex items-center gap-3">
        <Button disabled>Disabled</Button>
        <Button variant="primary" className="opacity-70">
          Loading...
        </Button>
      </div>
    ),
  },
];
