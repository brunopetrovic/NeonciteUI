import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const recipesSource = fs.readFileSync(path.join(root, "src/lib/motion-recipes.ts"), "utf8");
const labSource = fs.readFileSync(path.join(root, "src/components/docs/MotionLab.tsx"), "utf8");
const routeSource = fs.readFileSync(path.join(root, "src/routes/docs.motion.tsx"), "utf8");

const recipeIds = ["pressed-surface", "state-morph", "focus-relay"];

test("motion recipes expose the three source formats and reduced-motion contract", () => {
  assert.match(recipesSource, /export const MOTION_RECIPES/);
  for (const id of recipeIds) {
    assert.match(
      recipesSource,
      new RegExp(`id: "${id}"`),
      `${id} is missing from the recipe catalog`,
    );
  }
  for (const field of ["css", "react", "prompt", "reducedMotion"]) {
    assert.ok(
      (recipesSource.match(new RegExp(`\\n    ${field}:`, "g")) ?? []).length >= recipeIds.length,
      `${field} should be defined for every recipe`,
    );
  }
});

test("motion lab is a documented route with keyboard and reduced-motion affordances", () => {
  assert.match(routeSource, /createFileRoute\("\/docs\/motion"\)/);
  assert.match(labSource, /reducedMotion="user"/);
  assert.match(labSource, /role="tablist"/);
  assert.match(labSource, /motion-reduce:animate-none/);
  assert.match(recipesSource, /prefers-reduced-motion/);
  assert.match(labSource, /Copy-ready source/);
});
