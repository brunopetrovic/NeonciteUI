# Contributing to Neoncite/UI

Thanks for helping improve Neoncite/UI. Contributions should preserve the project's dark-only machined/neon design language while improving correctness, accessibility, developer experience, and maintainability.

## Development

Use a supported Node.js 22 release and install the root dependencies:

```bash
npm install
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

## Component expectations

New and modified components should:

- use semantic Neoncite design tokens instead of duplicating raw colors where a token exists;
- use Radix primitives for interactive behavior when an appropriate primitive exists;
- preserve visible focus states and keyboard behavior;
- respect `prefers-reduced-motion` for non-essential motion;
- keep dependencies and `registryDependencies` accurate in `src/registry/items.json`;
- include or update a representative showcase;
- avoid unnecessary API breaks.

If a public API must change, document the migration path and preserve a compatibility alias when practical.

## Generated source policy

`src/registry/ui` is canonical. `scripts/build-registry.mjs` generates the public registry and `scripts/build-package.mjs` mirrors canonical source into `@neoncite/ui`. CI fails when these outputs drift.

## Pull requests

Keep pull requests focused and explain:

- what changed;
- why it changed;
- user/developer impact;
- any migration requirements;
- validation performed.

Do not include fictional product metrics, customer endorsements, paid-plan promises, or unsupported compatibility claims in documentation or demos.
