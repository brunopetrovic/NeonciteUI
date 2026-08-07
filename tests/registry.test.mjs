import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const itemsPath = path.join(root, "src/registry/items.json");
const registrySourceDir = path.join(root, "src/registry/ui");
const publicRegistryDir = path.join(root, "public/r");
const items = JSON.parse(fs.readFileSync(itemsPath, "utf8"));

const bySlug = new Map(items.map((item) => [item.slug, item]));

test("registry slugs and target paths are unique", () => {
  const slugs = items.map((item) => item.slug);
  const targetPaths = items.map((item) => item.targetPath);

  assert.equal(new Set(slugs).size, slugs.length, "registry contains duplicate slugs");
  assert.equal(
    new Set(targetPaths).size,
    targetPaths.length,
    "registry contains duplicate target paths",
  );
});

test("every registry item has canonical source and a Neoncite target path", () => {
  for (const item of items) {
    const sourcePath = path.join(registrySourceDir, `${item.slug}.tsx`);
    assert.ok(fs.existsSync(sourcePath), `${item.slug} is missing canonical source`);
    assert.match(
      item.targetPath,
      /^components\/neoncite\/[a-z0-9-]+\.tsx$/,
      `${item.slug} has an unexpected target path`,
    );
  }
});

test("every registry dependency refers to another registered item", () => {
  for (const item of items) {
    for (const dependency of item.registryDeps ?? []) {
      assert.ok(bySlug.has(dependency), `${item.slug} references unknown registry dependency ${dependency}`);
    }
  }
});

test("generated public registry metadata matches canonical metadata", () => {
  const index = JSON.parse(fs.readFileSync(path.join(publicRegistryDir, "index.json"), "utf8"));
  assert.equal(index.items.length, items.length, "public registry item count is stale");

  for (const item of items) {
    const generated = JSON.parse(
      fs.readFileSync(path.join(publicRegistryDir, `${item.slug}.json`), "utf8"),
    );
    assert.equal(generated.name, item.slug);
    assert.equal(generated.type, "registry:ui");
    assert.deepEqual(generated.dependencies, item.dependencies);
    assert.deepEqual(generated.registryDependencies, item.registryDeps);
    assert.equal(generated.files[0]?.path, item.targetPath);
  }
});

test("Toggle and Switch retain distinct semantics", () => {
  const toggleSource = fs.readFileSync(path.join(registrySourceDir, "toggle.tsx"), "utf8");
  const switchSource = fs.readFileSync(path.join(registrySourceDir, "switch.tsx"), "utf8");

  assert.match(toggleSource, /@radix-ui\/react-toggle/);
  assert.doesNotMatch(toggleSource, /@radix-ui\/react-switch/);
  assert.match(switchSource, /@radix-ui\/react-switch/);
});
