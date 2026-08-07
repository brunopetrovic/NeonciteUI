import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(ROOT, "packages/ui/tokens.css");
const DEST = path.join(ROOT, "packages/cli/theme.css");

if (!fs.existsSync(SOURCE)) {
  throw new Error(`[cli-theme] missing canonical token stylesheet ${SOURCE}`);
}

const css = fs
  .readFileSync(SOURCE, "utf8")
  .split("\n")
  .filter(
    (line) =>
      !line.startsWith('@import "tailwindcss"') &&
      !line.startsWith("@source ") &&
      !line.startsWith("@custom-variant dark"),
  )
  .join("\n")
  .trimStart();

fs.writeFileSync(DEST, `${css}\n`);
console.log("[cli-theme] wrote packages/cli/theme.css");
