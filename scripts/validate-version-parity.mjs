import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const readJson = (relative) => JSON.parse(read(relative));

const cliPackage = readJson("packages/cli/package.json");
const uiPackage = readJson("packages/ui/package.json");
const cliSource = read("packages/cli/src/index.ts");
const releaseSource = read("src/lib/release-status.ts");

const cliSourceMatch = cliSource.match(/const CLI_VERSION = ["']([^"']+)["']/);
const sourceVersionMatch = releaseSource.match(/SOURCE_VERSION = ["']([^"']+)["']/);
const publicVersionMatch = releaseSource.match(/PUBLIC_VERSION = ["']([^"']+)["']/);
const sourceIsPublicMatch = releaseSource.match(/SOURCE_IS_PUBLIC = (true|false)/);

if (!cliSourceMatch) throw new Error("[version] CLI_VERSION constant not found");
if (!sourceVersionMatch) throw new Error("[version] SOURCE_VERSION constant not found");
if (!publicVersionMatch) throw new Error("[version] PUBLIC_VERSION constant not found");
if (!sourceIsPublicMatch) throw new Error("[version] SOURCE_IS_PUBLIC constant not found");

const sourceVersion = sourceVersionMatch[1];
const publicVersion = publicVersionMatch[1];
const sourceIsPublic = sourceIsPublicMatch[1] === "true";

const versions = {
  "neoncite CLI package": cliPackage.version,
  "@neoncite/ui package": uiPackage.version,
  "CLI source": cliSourceMatch[1],
  "release source": sourceVersion,
};
const unique = new Set(Object.values(versions));
if (unique.size !== 1) {
  throw new Error(
    `[version] source version drift: ${Object.entries(versions)
      .map(([name, version]) => `${name}=${version}`)
      .join(", ")}`,
  );
}

function semverTuple(version) {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/);
  if (!match) throw new Error(`[version] unsupported semver: ${version}`);
  return match.slice(1, 4).map(Number);
}

function compareSemver(a, b) {
  const left = semverTuple(a);
  const right = semverTuple(b);
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

if (compareSemver(publicVersion, sourceVersion) > 0) {
  throw new Error(
    `[version] public release ${publicVersion} cannot be newer than source ${sourceVersion}`,
  );
}

if (sourceIsPublic && publicVersion !== sourceVersion) {
  throw new Error(
    `[version] SOURCE_IS_PUBLIC=true requires PUBLIC_VERSION (${publicVersion}) to equal SOURCE_VERSION (${sourceVersion})`,
  );
}

if (!sourceIsPublic && publicVersion === sourceVersion) {
  throw new Error(
    `[version] SOURCE_IS_PUBLIC=false cannot use the source version (${sourceVersion}) as the public release`,
  );
}

const requiredCanonicalImports = {
  "src/components/site/SiteFooter.tsx": "@/lib/release-status",
  "src/routes/docs.index.tsx": "@/lib/release-status",
  "src/routes/changelog.tsx": "@/lib/release-status",
};
for (const [relative, marker] of Object.entries(requiredCanonicalImports)) {
  if (!read(relative).includes(marker)) {
    throw new Error(`[version] ${relative} must derive release copy from ${marker}`);
  }
}

const rootReadme = read("README.md");
const expectedPublicClaim = `Neoncite/UI v${publicVersion} is the current public release.`;
if (!rootReadme.includes(expectedPublicClaim)) {
  throw new Error(`[version] README public-release claim must include: ${expectedPublicClaim}`);
}
if (!sourceIsPublic) {
  const expectedSourceClaim = `Source currently targets v${sourceVersion}`;
  if (!rootReadme.includes(expectedSourceClaim)) {
    throw new Error(`[version] README unreleased-source claim must include: ${expectedSourceClaim}`);
  }
}

const packageReadme = read("packages/ui/README.md");
if (/\b23 Radix-based components\b/i.test(packageReadme)) {
  throw new Error("[version] packages/ui/README.md still contains the obsolete 23-component claim");
}

const changelog = read("CHANGELOG.md");
const expectedHeading = sourceIsPublic
  ? `## ${sourceVersion}\n`
  : `## ${sourceVersion} (unreleased)\n`;
if (!changelog.includes(expectedHeading)) {
  throw new Error(`[version] CHANGELOG must contain coordinated heading: ${expectedHeading.trim()}`);
}

console.log(
  `[version] source parity passed (${sourceVersion}); public=${publicVersion}; published=${sourceIsPublic}`,
);
