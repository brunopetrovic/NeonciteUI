# Contributing to Neoncite/UI

Thanks for helping improve Neoncite/UI. Contributions should preserve the project's dark-only machined/neon design language while improving correctness, accessibility, developer experience, and maintainability.

## Development

Use the production-pinned Node.js 22 release and install the root dependencies:

```bash
npm ci
npm run dev
```

The canonical component implementations live in `src/registry/ui`. Do not edit generated copies in `public/r` or `packages/ui/src/components` as the primary source of a component change.

After changing canonical component source or registry metadata, regenerate and validate the derived artifacts:

```bash
npm run build:dist
npm run validate:registry
npm run validate:generated
```

Before opening a pull request, run:

```bash
npm run validate
npm run build --prefix packages/cli
npm run build --prefix packages/ui
```

## Registry workflow

Do not run `npx shadcn add` directly to add new components. Use the NeonciteUI registry workflow instead, as shadcn defaults will produce light-mode components that are incompatible with the dark-only system.

`components.json` uses `neutral` only as a shadcn compatibility shim. The actual Neoncite surface, accent, glow, contrast, and semantic color system is defined by `packages/ui/tokens.css`.

## Component expectations

New and modified components should:

- use semantic Neoncite design tokens instead of duplicating raw colors where a token exists;
- use Radix primitives for interactive behavior when an appropriate primitive exists;
- preserve visible focus states and keyboard behavior;
- give every icon-only interactive control a descriptive accessible name;
- respect `prefers-reduced-motion` for non-essential motion;
- keep dependencies and `registryDependencies` accurate in `src/registry/items.json`;
- include or update a representative showcase;
- include isolated unit coverage for interaction-heavy primitives;
- avoid unnecessary API breaks.

If a public API must change, document the migration path and preserve a compatibility alias when practical.

## Generated source policy

`src/registry/ui` is canonical. `scripts/build-registry.mjs` generates the public registry and `scripts/build-package.mjs` mirrors canonical source into `@neoncite/ui`. CI fails when these outputs drift. Registry file integrity digests are generated from the exact source content and must never be edited manually.

## Pull requests and branch protection

Keep pull requests focused and explain:

- what changed;
- why it changed;
- user/developer impact;
- any migration requirements;
- validation performed.

The `main` branch is expected to be protected by CODEOWNERS and require at least one approving review before merge. Changes under `src/registry/` and `packages/` automatically request the configured code owner.

Do not include fictional product metrics, customer endorsements, paid-plan promises, or unsupported compatibility claims in documentation or demos.
