import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const registrySourceDir = path.join(root, "src/registry/ui");
const publicRegistryDir = path.join(root, "public/r");
const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
const items = [...readJson("src/registry/items.json"), ...readJson("src/registry/items-extra.json")];
const blocks = readJson("src/registry/blocks.json");
const themes = readJson("src/registry/themes.json");
const bySlug = new Map(items.map((item) => [item.slug, item]));

test("registry slugs and target paths are unique", () => {
  const slugs = items.map((item) => item.slug);
  const targetPaths = items.map((item) => item.targetPath);
  assert.equal(new Set(slugs).size, slugs.length, "registry contains duplicate slugs");
  assert.equal(new Set(targetPaths).size, targetPaths.length, "registry contains duplicate target paths");
});

test("every registry item has canonical source and a Neoncite target path", () => {
  for (const item of items) {
    const sourcePath = path.join(registrySourceDir, `${item.slug}.tsx`);
    assert.ok(fs.existsSync(sourcePath), `${item.slug} is missing canonical source`);
    assert.match(item.targetPath, /^components\/neoncite\/[a-z0-9-]+\.tsx$/, `${item.slug} has an unexpected target path`);
  }
});

test("every registry dependency refers to another registered UI item", () => {
  for (const item of items) {
    for (const dependency of item.registryDeps ?? []) {
      assert.ok(bySlug.has(dependency), `${item.slug} references unknown registry dependency ${dependency}`);
    }
  }
});

test("generated public UI metadata matches canonical metadata", () => {
  const index = readJson("public/r/index.json");
  const uiIndex = index.items.filter((item) => item.type === "registry:ui");
  assert.equal(uiIndex.length, items.length, "public registry UI item count is stale");

  for (const item of items) {
    const generated = readJson(`public/r/${item.slug}.json`);
    assert.equal(generated.name, item.slug);
    assert.equal(generated.type, "registry:ui");
    assert.deepEqual(generated.dependencies, item.dependencies);
    assert.deepEqual(generated.registryDependencies, item.registryDeps);
    assert.equal(generated.files[0]?.path, item.targetPath);
  }
});

test("all canonical Blocks are published as registry:block", () => {
  const index = readJson("public/r/index.json");
  const blockIndex = new Set(index.items.filter((item) => item.type === "registry:block").map((item) => item.name));
  assert.equal(blockIndex.size, blocks.length, "public block count is stale");
  for (const block of blocks) {
    assert.ok(blockIndex.has(block.slug), `${block.slug} missing from registry index`);
    const generated = readJson(`public/r/${block.slug}.json`);
    assert.equal(generated.type, "registry:block");
    assert.match(generated.files[0]?.path ?? "", /^components\/neoncite\/blocks\/[a-z0-9-]+\.tsx$/);
  }
});

test("all five dark presets are published as registry:theme", () => {
  const index = readJson("public/r/index.json");
  const themeIndex = new Set(index.items.filter((item) => item.type === "registry:theme").map((item) => item.name));
  assert.equal(themeIndex.size, themes.length, "public theme count is stale");
  for (const theme of themes) {
    assert.ok(themeIndex.has(theme.slug), `${theme.slug} missing from registry index`);
    const generated = readJson(`public/r/${theme.slug}.json`);
    assert.equal(generated.type, "registry:theme");
    assert.match(generated.files[0]?.content ?? "", /dark-only registry theme/);
    assert.doesNotMatch(generated.files[0]?.content ?? "", /light\s*\{/i);
  }
});

test("Toggle and Switch retain distinct semantics", () => {
  const toggleSource = fs.readFileSync(path.join(registrySourceDir, "toggle.tsx"), "utf8");
  const switchSource = fs.readFileSync(path.join(registrySourceDir, "switch.tsx"), "utf8");
  assert.match(toggleSource, /@radix-ui\/react-toggle/);
  assert.doesNotMatch(toggleSource, /@radix-ui\/react-switch/);
  assert.match(switchSource, /@radix-ui\/react-switch/);
});
