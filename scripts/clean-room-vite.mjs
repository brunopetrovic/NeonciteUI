import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const appDir = fs.mkdtempSync(path.join(os.tmpdir(), "neoncite-cleanroom-"));
const port = 4174;
const registryUrl = `http://127.0.0.1:${port}`;

function run(command, args, options = {}) {
  console.log(`[clean-room] ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: options.cwd ?? root,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...(options.env ?? {}) },
  });
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} failed with exit code ${result.status}`);
  }
}

let server;
try {
  run("npm", ["run", "build:registry"]);
  run("npm", ["run", "build", "--prefix", "packages/cli"]);

  server = spawn(
    process.execPath,
    [path.join(root, "scripts/serve-registry.mjs"), path.join(root, "public/r"), String(port)],
    {
      cwd: root,
      stdio: "inherit",
    },
  );
  await new Promise((resolve) => setTimeout(resolve, 800));

  run("npm", ["create", "vite@latest", ".", "--", "--template", "react-ts"], { cwd: appDir });
  run("npm", ["install", "--no-audit", "--no-fund"], { cwd: appDir });
  run("npm", ["install", "tailwindcss@^4", "@tailwindcss/vite@^4", "--no-audit", "--no-fund"], {
    cwd: appDir,
  });

  const cssPath = path.join(appDir, "src/index.css");
  fs.writeFileSync(cssPath, '@import "tailwindcss";\n');

  const cli = path.join(root, "packages/cli/dist/index.js");
  run(process.execPath, [cli, "init", "-y", "--registry", registryUrl], { cwd: appDir });
  run(
    process.execPath,
    [
      cli,
      "add",
      "button",
      "data-table",
      "dialog",
      "form",
      "combobox",
      "date-picker",
      "terminal",
      "server-card",
      "telemetry-dashboard",
      "theme-neoncite",
      "-y",
    ],
    { cwd: appDir },
  );

  fs.writeFileSync(
    path.join(appDir, "src/App.tsx"),
    `import "./styles/theme-neoncite.css";
import { Button } from "./components/neoncite/button";
import { Combobox } from "./components/neoncite/combobox";
import { DatePicker } from "./components/neoncite/date-picker";
import { Terminal, TerminalLine } from "./components/neoncite/terminal";
import { ServerCard } from "./components/neoncite/server-card";
import { TelemetryDashboard } from "./components/neoncite/blocks/telemetry-dashboard";

export default function App() {
  return (
    <main className="min-h-screen bg-background p-8 text-foreground">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">Ship it</Button>
          <Combobox options={[{ value: "iad", label: "iad-1" }, { value: "fra", label: "fra-1" }]} />
          <DatePicker />
        </div>
        <Terminal><TerminalLine>neoncite doctor</TerminalLine></Terminal>
        <ServerCard name="edge-01" region="fra" cpu={34} memory={61} storage={48} />
        <TelemetryDashboard />
      </div>
    </main>
  );
}
`,
  );

  run("npm", ["run", "build"], { cwd: appDir });
  run("npx", ["tsc", "--noEmit"], { cwd: appDir });
  console.log(`[clean-room] passed at ${appDir}`);
} finally {
  server?.kill();
  fs.rmSync(appDir, { recursive: true, force: true });
}
