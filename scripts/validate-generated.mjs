import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
const items = [...readJson("src/registry/items.json"), ...readJson("src/registry/items-extra.json")];
const blocks = readJson("src/registry/blocks.json");
const themes = readJson("src/registry/themes.json");
const registryDir = path.join(ROOT, "public/r");
const packageComponentsDir = path.join(ROOT, "packages/ui/src/components");

const expectedRegistry = new Set([
  ...items.map((item) => `${item.slug}.json`),
  ...blocks.map((block) => `${block.slug}.json`),
  ...themes.map((theme) => `${theme.slug}.json`),
  "index.json",
]);
const ignoredRegistry = new Set(["schema.json", "theme.schema.json"]);

for (const file of expectedRegistry) {
  if (!fs.existsSync(path.join(registryDir, file))) throw new Error(`[generated] missing public/r/${file}`);
}
for (const file of fs.readdirSync(registryDir)) {
  if (!file.endsWith(".json") || ignoredRegistry.has(file)) continue;
  if (!expectedRegistry.has(file)) throw new Error(`[generated] stale public/r/${file}`);
}

const expectedPackageComponents = new Set(items.map((item) => `${item.slug}.tsx`));
for (const file of expectedPackageComponents) {
  if (!fs.existsSync(path.join(packageComponentsDir, file))) throw new Error(`[generated] missing packages/ui/src/components/${file}`);
}
for (const file of fs.readdirSync(packageComponentsDir)) {
  if (!/\.[cm]?[jt]sx?$/.test(file)) continue;
  if (!expectedPackageComponents.has(file)) throw new Error(`[generated] stale packages/ui/src/components/${file}`);
}

const index = readJson("public/r/index.json");
const expectedCount = items.length + blocks.length + themes.length;
if (index.items.length !== expectedCount) {
  throw new Error(`[generated] registry index contains ${index.items.length} items, expected ${expectedCount}`);
}

console.log(`[generated] validation passed (${items.length} UI, ${blocks.length} blocks, ${themes.length} themes)`);
