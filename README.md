# Neoncite/UI

**Machined React components for technical products.**

Neoncite/UI is an opinionated, dark-mode-only React component system built around OLED-black surfaces, hardware-inspired rim lighting, nine neon accents, Radix UI primitives, and Tailwind CSS v4. It is designed for developer tools, AI interfaces, observability products, dashboards, and other high-density applications.

[Live site](https://neoncite-ui.brunopetrovic33.workers.dev/) · [Components](https://neoncite-ui.brunopetrovic33.workers.dev/components) · [Docs](https://neoncite-ui.brunopetrovic33.workers.dev/docs/installation) · [Registry](https://neoncite-ui.brunopetrovic33.workers.dev/r/index.json)

## Status

Neoncite/UI is under active pre-1.0 development. The public registry currently contains 84 UI components, 18 blocks, and 5 installable dark themes. APIs and installation behavior are being hardened before a stable 1.0 release.

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

Current CLI 0.2 release target:

```text
neoncite init [-y|--yes]
neoncite add <component...>
neoncite list
neoncite diff <component>
neoncite --version
```

Run `npx neoncite --help` for command options. Only implemented commands are documented as available.

## Registry and generated artifacts

Canonical component source lives in `src/registry/ui`. Registry JSON and the direct-consumption `@neoncite/ui` package are generated/validated against that source.

Useful repository checks:

```bash
npm run validate:registry
npm run validate:generated
npm run validate
```

`validate:registry` verifies that component imports are represented by `dependencies` or `registryDependencies`. `validate:generated` detects drift between canonical source and generated registry/package/SEO output.

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
