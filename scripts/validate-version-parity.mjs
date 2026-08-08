import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), "utf8"));

const cliPackage = readJson("packages/cli/package.json");
const uiPackage = readJson("packages/ui/package.json");
const cliSource = fs.readFileSync(path.join(root, "packages/cli/src/index.ts"), "utf8");
const sourceMatch = cliSource.match(/const CLI_VERSION = ["']([^"']+)["']/);

if (!sourceMatch) throw new Error("[version] CLI_VERSION constant not found");
const versions = {
  "neoncite CLI package": cliPackage.version,
  "@neoncite/ui package": uiPackage.version,
  "CLI source": sourceMatch[1],
};
const unique = new Set(Object.values(versions));
if (unique.size !== 1) {
  throw new Error(`[version] version drift: ${Object.entries(versions).map(([name, version]) => `${name}=${version}`).join(", ")}`);
}
console.log(`[version] parity passed (${cliPackage.version})`);
