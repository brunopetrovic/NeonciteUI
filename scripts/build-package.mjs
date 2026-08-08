// Mirrors canonical registry component source into packages/ui and keeps the npm
// package barrel/dependencies aligned with the complete Neoncite UI inventory.
// packages/ui/tokens.css remains the canonical distributable token stylesheet.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src/registry/ui");
const DEST = path.join(ROOT, "packages/ui/src/components");
const ITEMS_PATH = path.join(ROOT, "src/registry/items.json");
const EXTRA_ITEMS_PATH = path.join(ROOT, "src/registry/items-extra.json");
const ROOT_PACKAGE_PATH = path.join(ROOT, "package.json");
const UI_PACKAGE_PATH = path.join(ROOT, "packages/ui/package.json");
const TOKENS_PATH = path.join(ROOT, "packages/ui/tokens.css");

const ITEMS = [
  ...JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8")),
  ...JSON.parse(fs.readFileSync(EXTRA_ITEMS_PATH, "utf8")),
];
const rootPackage = JSON.parse(fs.readFileSync(ROOT_PACKAGE_PATH, "utf8"));
const uiPackage = JSON.parse(fs.readFileSync(UI_PACKAGE_PATH, "utf8"));

if (!fs.existsSync(TOKENS_PATH))
  throw new Error(`[pkg] missing canonical token stylesheet ${TOKENS_PATH}`);
fs.mkdirSync(DEST, { recursive: true });

const componentFiles = new Set(ITEMS.map((item) => `${item.slug}.tsx`));
for (const file of fs.readdirSync(DEST)) {
  if ((file.endsWith(".tsx") || file.endsWith(".ts")) && !componentFiles.has(file)) {
    fs.rmSync(path.join(DEST, file));
    console.log(`[pkg] removed stale ${file}`);
  }
}

for (const item of ITEMS) {
  const file = `${item.slug}.tsx`;
  const sourcePath = path.join(SRC, file);
  if (!fs.existsSync(sourcePath)) throw new Error(`[pkg] missing canonical source ${sourcePath}`);
  const original = fs.readFileSync(sourcePath, "utf8");
  const rewritten = original
    .replace(/@\/lib\/utils/g, "../lib/utils")
    .replace(/@\/registry\/ui\//g, "./");
  fs.writeFileSync(path.join(DEST, file), rewritten);
  console.log(`[pkg] mirrored ${file}`);
}

const indexHeader = `// @neoncite/ui — barrel export for direct npm consumption.
// Most users should prefer the CLI (\`npx neoncite add <component>\`) which
// copies source into your project so you can fully customize. This package
// is for teams that want to consume components as a versioned dependency.

`;
const exports = ITEMS.map((item) => `export * from "./components/${item.slug}";`).join("\n");
fs.writeFileSync(
  path.join(ROOT, "packages/ui/src/index.ts"),
  `${indexHeader}${exports}\n\nexport { cn } from "./lib/utils";\n`,
);
console.log("[pkg] wrote src/index.ts");

const dependencyNames = [...new Set(ITEMS.flatMap((item) => item.dependencies))].sort();
const dependencyVersions = {};
for (const dep of dependencyNames) {
  const version = rootPackage.dependencies?.[dep] ?? rootPackage.devDependencies?.[dep];
  if (!version) throw new Error(`[pkg] no root package version found for dependency ${dep}`);
  dependencyVersions[dep] = version;
}
for (const dep of ["clsx", "tailwind-merge", "tw-animate-css"]) {
  const version = rootPackage.dependencies?.[dep] ?? rootPackage.devDependencies?.[dep];
  if (!version) throw new Error(`[pkg] no root package version found for dependency ${dep}`);
  dependencyVersions[dep] = version;
}

uiPackage.dependencies = Object.fromEntries(
  Object.entries(dependencyVersions).sort(([a], [b]) => a.localeCompare(b)),
);
fs.writeFileSync(UI_PACKAGE_PATH, `${JSON.stringify(uiPackage, null, 2)}\n`);
console.log("[pkg] wrote package.json dependencies");
console.log("[pkg] preserved canonical tokens.css");
