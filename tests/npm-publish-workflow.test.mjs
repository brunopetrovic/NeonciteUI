import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { existsSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const workflow = readFileSync(
  new URL("../.github/workflows/npm-publish.yml", import.meta.url),
  "utf8",
);
const rootDir = fileURLToPath(new URL("../", import.meta.url));
const cliDir = path.join(rootDir, "packages/cli");

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

test("builds the CLI before packing its declared executable and assets", () => {
  const buildStep = stepBlock("Build CLI package");
  const packStep = stepBlock("Pack CLI");
  assert.match(buildStep, /run: npm run build --prefix packages\/cli/);
  assert.ok(
    workflow.indexOf(buildStep) < workflow.indexOf(packStep),
    "CLI must be built before its package is packed",
  );

  const cliPackage = JSON.parse(readFileSync(path.join(cliDir, "package.json"), "utf8"));
  assert.equal(cliPackage.bin.neoncite, "dist/index.js");
  assert.ok(cliPackage.files.includes("dist"));
  assert.ok(cliPackage.files.includes("theme.css"));

  const generatedPaths = [path.join(cliDir, "dist"), path.join(cliDir, "theme.css")];
  const generatedBeforeTest = generatedPaths.map((generatedPath) => existsSync(generatedPath));
  let tarballPath;

  try {
    execFileSync("npm", ["run", "build", "--prefix", "packages/cli"], {
      cwd: rootDir,
      stdio: "inherit",
    });
    const packOutput = execFileSync("npm", ["pack", "--dry-run=false", "--json"], {
      cwd: cliDir,
      encoding: "utf8",
    });
    const [packMetadata] = JSON.parse(packOutput);
    assert.ok(packMetadata?.filename, "npm pack must produce a tarball");
    tarballPath = path.join(cliDir, packMetadata.filename);

    const packedEntries = new Set(
      execFileSync("tar", ["-tzf", tarballPath], { encoding: "utf8" }).trim().split("\n"),
    );
    assert.ok(
      packedEntries.has(`package/${cliPackage.bin.neoncite}`),
      "packed CLI must include its declared executable",
    );
    assert.ok(
      packedEntries.has("package/theme.css"),
      "packed CLI must include its declared theme asset",
    );
  } finally {
    if (tarballPath) rmSync(tarballPath, { force: true });
    generatedPaths.forEach((generatedPath, index) => {
      if (!generatedBeforeTest[index]) rmSync(generatedPath, { force: true, recursive: true });
    });
  }
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
