import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const workflow = readFileSync(
  new URL("../.github/workflows/npm-publish.yml", import.meta.url),
  "utf8",
);

const publishStepNames = ["Publish neoncite CLI", "Publish @neoncite/ui"];

function stepBlock(name) {
  const marker = `      - name: ${name}\n`;
  const start = workflow.indexOf(marker);
  assert.notEqual(start, -1, `workflow step not found: ${name}`);

  const end = workflow.indexOf("\n      - name:", start + marker.length);
  return workflow.slice(start, end === -1 ? workflow.length : end);
}

function stepCondition(name) {
  return stepBlock(name)
    .match(/^        if:\s*(.+)$/m)?.[1]
    ?.trim();
}

function evaluatesPublishCondition(name, dryRun) {
  const condition = stepCondition(name);
  assert.equal(condition, "${{ !inputs.dry_run }}", `${name} must be guarded by the dry_run input`);
  return !dryRun;
}

test("dry_run skips every npm publish step", () => {
  for (const name of publishStepNames) {
    assert.equal(evaluatesPublishCondition(name, true), false, name);
  }
});

test("a real run enables every npm publish step", () => {
  for (const name of publishStepNames) {
    assert.equal(evaluatesPublishCondition(name, false), true, name);
    assert.match(stepBlock(name), /npm publish --provenance --access public/);
  }
});

test("dry_run still builds and packs the CLI without publishing", () => {
  assert.match(
    workflow,
    /- name: Build @neoncite\/ui package[\s\S]*?run: npm --prefix packages\/ui run build/,
  );
  assert.match(workflow, /- name: Pack CLI[\s\S]*?run: npm pack --dry-run=false/);
});

test("dry_run skips publish verification and a real run performs it", () => {
  const verification = stepBlock("Verify published versions");
  assert.equal(verification.match(/^        if:\s*(.+)$/m)?.[1]?.trim(), "${{ !inputs.dry_run }}");
  assert.doesNotMatch(verification, /github\.event\.inputs\.dry_run/);
  assert.match(verification, /npm view neoncite@\$\{V\} version/);
  assert.match(verification, /npm view @neoncite\/ui@\$\{V\} version/);
});

test("release actions are pinned to immutable commits with readable versions", () => {
  assert.match(workflow, /uses: actions\/checkout@[0-9a-f]{40} # v7 as of 2026-08-21/);
  assert.match(workflow, /uses: actions\/setup-node@[0-9a-f]{40} # v6 as of 2026-08-21/);
});
