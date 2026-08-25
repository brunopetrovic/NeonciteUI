# Releasing Neoncite/UI

Neoncite releases coordinate four public surfaces:

1. the `neoncite` CLI package,
2. the `@neoncite/ui` package,
3. the GitHub release/tag,
4. the documentation site and registry.

A release is not complete until all four agree on the same public version.

## Canonical version state

Source and public release state is centralized in `src/lib/release-status.ts`.

- `SOURCE_VERSION` must match `packages/cli/package.json`, `packages/ui/package.json`, and the CLI `CLI_VERSION` constant.
- `PUBLIC_VERSION` is the latest version verified live on npm and GitHub Releases.
- `SOURCE_IS_PUBLIC` is `false` while a source version is prepared but not yet published; it becomes `true` only after both npm packages and the GitHub release are verified.

`node scripts/validate-version-parity.mjs` enforces those invariants and checks the main README/changelog release wording.

## Required repository protection

Protect `main` before relying on automated dependency updates or release automation.

Recommended GitHub ruleset / branch-protection settings:

- require pull requests before merging,
- require the repository CI check to pass,
- require branches to be up to date before merging or use GitHub merge queue,
- block force pushes,
- block branch deletion,
- apply the rules to administrators unless emergency bypass is explicitly intended.

Renovate patch automerge must never be allowed to bypass required checks.

## npm Trusted Publishing

Preferred authentication is npm Trusted Publishing (OIDC), not a long-lived write token.

Configure a Trusted Publisher separately for **both** npm packages:

- GitHub owner/repository: `brunopetrovic/NeonciteUI`
- workflow filename: `npm-publish.yml`
- GitHub Environment: `npm`
- allowed action: `npm publish`

The release workflow grants `id-token: write`, runs on a compatible Node/npm version, and npm automatically prefers OIDC when the trusted publisher is configured.

During migration, the `npm` GitHub Environment may retain `NPM_TOKEN` as a fallback. After one successful OIDC release, remove the write token and set npm publishing access to disallow traditional tokens if that policy fits the project.

## Release procedure

### 1. Prepare source

Update the coordinated source version in:

- `packages/cli/package.json`,
- `packages/ui/package.json`,
- `packages/cli/src/index.ts` (`CLI_VERSION`),
- `src/lib/release-status.ts` (`SOURCE_VERSION`).

Keep `PUBLIC_VERSION` on the last verified release and `SOURCE_IS_PUBLIC=false` until publication succeeds.

Update `CHANGELOG.md` using an `## X.Y.Z (unreleased)` heading.

### 2. Validate the release branch

Run the full repository gate:

```bash
npm run validate
node scripts/validate-version-parity.mjs
```

The publish workflow repeats audit, browser installation, full validation, package builds, and package packing so a manual release cannot skip the release gate.

### 3. Dry-run publication

From GitHub Actions, run **Publish to npm** with `dry_run=true`.

The dry run must:

- pass `npm audit --audit-level=moderate`,
- pass the full `npm run validate` chain,
- build both packages,
- pack both packages,
- perform no npm publish and create no GitHub release.

### 4. Publish

Run **Publish to npm** with `dry_run=false` through the protected `npm` GitHub Environment.

The workflow is idempotent. It publishes only versions that are not already live, verifies both packages with `npm view`, and then creates the matching GitHub Release/tag if it does not already exist.

Do not mark the source version public before that workflow succeeds.

### 5. Finalize public release state

After npm and GitHub verification:

- set `PUBLIC_VERSION` equal to `SOURCE_VERSION`,
- set `SOURCE_IS_PUBLIC=true`,
- change `## X.Y.Z (unreleased)` to `## X.Y.Z` in `CHANGELOG.md`,
- update README release wording if needed,
- run `npm run validate` and `node scripts/validate-version-parity.mjs`,
- merge the finalization PR to `main`,
- verify the production Cloudflare deployment succeeds.

### 6. Clean-room verification

In a fresh application, verify the released public packages and registry rather than local source:

```bash
npx neoncite@X.Y.Z init -y
npx neoncite@X.Y.Z add button card dialog
npm install @neoncite/ui@X.Y.Z
```

Typecheck and production-build that application. Verify root imports, component subpath imports, and `@neoncite/ui/tokens.css`.

## Release is complete only when

- npm `neoncite@X.Y.Z` is live,
- npm `@neoncite/ui@X.Y.Z` is live,
- GitHub Release `vX.Y.Z` exists,
- `src/lib/release-status.ts` marks that version public,
- the production documentation site displays that public version,
- the production registry is reachable,
- the main-branch CI and Cloudflare deployment are green.
