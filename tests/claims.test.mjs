import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const forbidden = [
  /v1\.0\.0\s*[—-]\s*Initial release/i,
  /@Lovable\b/i,
  /\b29 components\b/i,
  /\b60\+ Pro blocks\b/i,
  /Figma (kit|library).*(included|access)/i,
  /\bSLA support\b/i,
];

function collect(target, output = []) {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return output;
  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    output.push(absolute);
    return output;
  }
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const relative = path.join(target, entry.name);
    if (entry.isDirectory()) collect(relative, output);
    else if (/\.(?:ts|tsx|md|txt)$/.test(entry.name)) output.push(path.join(root, relative));
  }
  return output;
}

test("public source does not reintroduce known stale or unsupported claims", () => {
  const violations = [];
  for (const file of [...collect("src"), ...collect("README.md"), ...collect("public/llms.txt")]) {
    const content = fs.readFileSync(file, "utf8");
    for (const pattern of forbidden) {
      if (pattern.test(content)) violations.push(`${path.relative(root, file)} matched ${pattern}`);
    }
  }
  assert.deepEqual(violations, []);
});
