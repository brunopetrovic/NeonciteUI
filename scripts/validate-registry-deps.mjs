import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const ITEMS_PATH = path.join(ROOT, "src/registry/items.json");
const EXTRA_ITEMS_PATH = path.join(ROOT, "src/registry/items-extra.json");
const REGISTRY_DIR = path.join(ROOT, "src/registry/ui");

const items = [
  ...JSON.parse(fs.readFileSync(ITEMS_PATH, "utf8")),
  ...JSON.parse(fs.readFileSync(EXTRA_ITEMS_PATH, "utf8")),
];
const bySlug = new Map(items.map((item) => [item.slug, item]));
const errors = [];

function packageName(specifier) {
  if (specifier.startsWith("@")) return specifier.split("/").slice(0, 2).join("/");
  return specifier.split("/")[0];
}

function importsFrom(source) {
  const imports = new Set();
  const patterns = [/\bfrom\s+["']([^"']+)["']/g, /\bimport\s+["']([^"']+)["']/g];
  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) imports.add(match[1]);
  }
  return [...imports];
}

for (const item of items) {
  const sourcePath = path.join(REGISTRY_DIR, `${item.slug}.tsx`);
  if (!fs.existsSync(sourcePath)) {
    errors.push(`${item.slug}: missing canonical source ${path.relative(ROOT, sourcePath)}`);
    continue;
  }

  for (const dep of item.registryDeps ?? []) {
    if (!bySlug.has(dep)) errors.push(`${item.slug}: unknown registry dependency "${dep}"`);
  }

  const declaredPackages = new Set(item.dependencies ?? []);
  const declaredRegistry = new Set(item.registryDeps ?? []);
  const source = fs.readFileSync(sourcePath, "utf8");

  for (const specifier of importsFrom(source)) {
    if (specifier === "react" || specifier === "react-dom" || specifier.startsWith("react-dom/"))
      continue;

    if (specifier.startsWith("@/registry/ui/")) {
      const slug = specifier.slice("@/registry/ui/".length).split("/")[0];
      if (!bySlug.has(slug))
        errors.push(`${item.slug}: imports unknown registry component "${slug}"`);
      else if (!declaredRegistry.has(slug))
        errors.push(`${item.slug}: imports registry component "${slug}" but does not declare it`);
      continue;
    }

    if (specifier.startsWith("@/") || specifier.startsWith("./") || specifier.startsWith("../"))
      continue;

    const pkg = packageName(specifier);
    if (!declaredPackages.has(pkg))
      errors.push(`${item.slug}: imports npm package "${pkg}" but does not declare it`);
  }
}

if (errors.length) {
  console.error("Registry dependency validation failed:\n");
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`Registry dependency validation passed (${items.length} UI items).`);
