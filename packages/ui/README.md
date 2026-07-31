# @neoncite/ui

Neoncite & Neon — a brutalist-tactile UI design system built on Radix UI primitives and Tailwind CSS.

> Most teams should use the **Neoncite CLI** (`npx neoncite add <component>`) which copies source into your project so you fully own and customize it. This npm package exists for teams that prefer a versioned dependency.

## Install

```bash
npm install @neoncite/ui
```

## Usage

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@neoncite/ui";

export function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cluster Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="neon">Deploy</Button>
      </CardContent>
    </Card>
  );
}
```

## Design tokens

Import the Neoncite design tokens once at the top of your global CSS:

```css
@import "@neoncite/ui/tokens.css";
```

This brings in OLED surface scale, neon accents, animation keyframes (`scan`, `glitch`, `ripple`, `radar-spin`) and Tailwind v4 `@theme` mappings.

## Components

23 Radix-based components: Button, Input, Textarea, Card, Badge, Separator, Avatar, Dialog, Tooltip, Tabs, Toggle, Checkbox, Slider, Progress, KPI Card, Label, Skeleton, Alert, Popover, Radio Group, Select, Sheet, Dropdown Menu.

## License

MIT
