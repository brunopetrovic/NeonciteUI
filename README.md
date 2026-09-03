# Neoncite/UI

**Machined React components for technical products.**

Neoncite/UI is an opinionated, dark-mode-only React component system built around OLED-black surfaces, hardware-inspired rim lighting, nine neon accents, Radix UI primitives, and Tailwind CSS v4. It is designed for developer tools, AI interfaces, observability products, dashboards, and other high-density applications.

[Live site](https://neoncite-ui.thorus.workers.dev/) · [Components](https://neoncite-ui.thorus.workers.dev/components) · [Docs](https://neoncite-ui.thorus.workers.dev/docs/installation) · [Motion Lab source](src/routes/docs.motion.tsx) · [Registry](https://neoncite-ui.thorus.workers.dev/r/index.json)

## Status

Neoncite/UI v0.2.0 is the current public release. Source currently targets v0.3.0, which has not yet been published to npm or tagged as a GitHub release. The public registry contains 84 UI components, 18 blocks, and 5 installable dark themes. APIs and installation behavior remain under active development.

> **Accessibility constraint:** Neoncite/UI is intentionally dark-mode only. It does not support light mode. Projects with accessibility requirements for light interfaces or high-contrast modes should evaluate whether this constraint is compatible with their needs. `prefers-contrast: more` is partially supported through increased glow intensity.
>
> The current high-contrast implementation also strengthens hairlines and muted text and suppresses decorative glows where they would add visual noise. See `/docs/accessibility` for the complete support contract.

## Design principles

- **Dark-only by design.** Neoncite does not ship a light theme.
- **OLED surface hierarchy.** Pure black and near-black semantic surfaces keep dense interfaces legible.
- **Machined lighting.** Hairlines, recessed surfaces, rim-light shadows, and restrained glow create the hardware-inspired identity.
- **Nine neon accents.** Pink, cyan, blue, yellow, orange, green, purple, red, and lime are exposed through design tokens.
- **Source ownership.** The CLI installs component source into your project from a shadcn-style registry.
- **Accessible foundations.** Interactive primitives use Radix where appropriate and are expected to preserve keyboard/focus semantics; accessibility is validated continuously rather than treated as a blanket claim.

## Requirements

- React 18 or 19
- Tailwind CSS v4
- TypeScript recommended

Installed Neoncite components use relative imports for their internal component dependencies and for the generated `cn()` utility, so the source itself does not require a project-specific `@/` alias to compile.

## Peer Dependencies

The direct-consumption package and registry use peers to keep framework and heavyweight optional features out of the core dependency graph:

- `react >=18.0.0`
- `react-dom >=18.0.0`
- `tailwindcss >=4.0.0`
- `framer-motion >=10.0.0` — required only when using an `animated={true}` component path such as `Button` or `Badge`.
- `recharts >=2.0.0` — required only when installing chart components that actually import Recharts. Registry metadata installs it automatically for those items.

Framer Motion and Recharts are optional peers of `@neoncite/ui`; plain Button/Input/core usage does not require either package at runtime.

## Browser Support

Neoncite/UI targets current evergreen browsers:

- Chrome / Edge 110+
- Firefox 115+
- Safari 16.4+
- Internet Explorer 11 is not supported; the system relies extensively on CSS custom properties and modern CSS.

Several components use `backdrop-filter`. Firefox support landed well before the documented Firefox 115 minimum (the feature was unavailable without a flag before Firefox 103), so Firefox 115+ is the supported baseline.

## Installation

Initialize Neoncite with non-interactive defaults:

```bash
npx neoncite@latest init -y
```

Initialization creates `neoncite.json`, scaffolds the shared `cn()` utility when missing, installs the small utility dependencies required by the token layer, and wires the Neoncite theme into a detected global Tailwind v4 stylesheet.

Then install one or more components:

```bash
npx neoncite add button card dialog
```

With the default configuration, installed component source lives under:

```text
src/components/neoncite/
```

The aliases stored in `neoncite.json` control where Neoncite writes components and utilities. The CLI resolves those locations to relative imports inside installed source, avoiding an extra bundler-alias requirement.

## Usage

If your app already has the common `@/` alias, you can import components like this:

```tsx
import { Button } from "@/components/neoncite/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/neoncite/card";

export function DashboardWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Telemetry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Real-time node cluster monitoring initialized.
        </p>
        <Button variant="neon" size="sm">
          Run diagnostics
        </Button>
      </CardContent>
    </Card>
  );
}
```

Otherwise, import from the component path relative to your application source as you would any local module.

## CLI

Current npm release: 0.2.0. Source version: 0.3.0.

```text
neoncite init [-y|--yes]
neoncite add <component...>
neoncite list
neoncite diff <component>
neoncite --version
```

Run `npx neoncite --help` for command options. Only implemented commands are documented as available.

Registry source files include a SHA-256 integrity value. The CLI verifies each downloaded source file before writing it and aborts installation if the digest does not match the registry metadata.

## Registry and generated artifacts

Canonical component source lives in `src/registry/ui`. Registry JSON and the direct-consumption `@neoncite/ui` package are generated/validated against that source.

Useful repository checks:

```bash
npm run validate:registry
npm run validate:generated
npm run validate
```

`validate:registry` verifies that component imports are represented by `dependencies` or `registryDependencies` and enforces registry motion/token rules. `validate:generated` detects drift between canonical source and generated registry/package/SEO output.

The core Button + Input + `cn()` bundle has a CI budget of **<20 KiB gzipped**. Use `npm run check:bundle` for the enforceable core budget and `npm run build:analyze` for a full production visualization.

## Project structure

```text
packages/
  cli/                 Neoncite CLI
  ui/                  Direct-consumption package and canonical token stylesheet
src/
  components/          Documentation/showcase components and Blocks
  registry/ui/         Canonical component implementations
  registry/items.json  Registry metadata
  routes/              TanStack Start routes and documentation
scripts/
  build-registry.mjs
  build-package.mjs
  build-cli-theme.mjs
  build-sitemap.mjs
  validate-registry-deps.mjs
public/r/               Generated public registry JSON
```

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) for development guidance and [SECURITY.md](SECURITY.md) for vulnerability reporting. General support guidance is in [SUPPORT.md](SUPPORT.md).

## License

MIT © 2026 Bruno Petrovic. See [LICENSE](LICENSE).
