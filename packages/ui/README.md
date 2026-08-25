# @neoncite/ui

Neoncite/UI is a dark-only, source-first React component system for technical products, built with Radix UI foundations and Tailwind CSS v4.

> Most teams should prefer the **Neoncite CLI** (`npx neoncite add <component>`) because it copies source into your project so you can inspect, own, and customize it. This package exists for teams that prefer a versioned dependency.

## Install

```bash
npm install @neoncite/ui
```

Requirements:

- React 18+
- React DOM 18+
- Tailwind CSS v4

Framer Motion and Recharts are optional peers. They are only needed by component paths that actually use them.

## Design tokens

Import the canonical Neoncite token layer once from your global CSS:

```css
@import "@neoncite/ui/tokens.css";
```

The token layer includes the OLED surface hierarchy, nine neon accents, semantic foregrounds, hairlines, glows, shadows, reduced-motion behavior, contrast adjustments, and Tailwind v4 `@theme` mappings.

## Usage

```tsx
import { Button, Card, CardContent, CardHeader, CardTitle } from "@neoncite/ui";

export function ClusterCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cluster Status</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="neon">Run diagnostics</Button>
      </CardContent>
    </Card>
  );
}
```

Individual component subpaths are also exported:

```tsx
import { Button } from "@neoncite/ui/button";
import { Terminal } from "@neoncite/ui/terminal";
import { TelemetryPanel } from "@neoncite/ui/telemetry-panel";
```

## Package surface

The package is generated from the same canonical component source used by the Neoncite registry. It includes core primitives, forms, navigation, data-display components, overlays, feedback components, and the Neoncite Signature family for terminals, telemetry, diagnostics, infrastructure status, and observability interfaces.

For the complete live inventory and component documentation, use the Neoncite documentation site or the registry index rather than relying on a manually maintained count in this README.

## Source-first installation

For copy-in source ownership instead of a package dependency:

```bash
npx neoncite@latest init -y
npx neoncite add button card dialog
```

The CLI resolves registry dependencies, verifies SHA-256 integrity metadata, installs required npm dependencies, and rewrites Neoncite-internal imports for the consuming project.

## License

MIT
