import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));
const baseItems = readJson("src/registry/items.json");
const extraItems = readJson("src/registry/items-extra.json");
const baseShowcases = fs.readFileSync(path.join(root, "src/registry/showcases.tsx"), "utf8");
const phase2Showcases = fs.readFileSync(path.join(root, "src/registry/showcases/phase2.tsx"), "utf8");

function hasObjectKey(source, slug) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:["']${escaped}["']|\\b${escaped}\\b)\\s*:`).test(source);
}

test("every original registry component remains wired to a showcase", () => {
  for (const item of baseItems) {
    assert.ok(hasObjectKey(baseShowcases, item.slug), `${item.slug} is missing from SHOWCASES`);
  }
});

test("every Phase 2 registry component has a live showcase", () => {
  for (const item of extraItems) {
    assert.ok(hasObjectKey(phase2Showcases, item.slug), `${item.slug} is missing a Phase 2 showcase`);
  }
});
