import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import http from "node:http";
import os from "node:os";
import path from "node:path";

const root = process.cwd();
const cli = path.join(root, "packages/cli/dist/index.js");
const registryDir = path.join(root, "public/r");

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", env: process.env });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

function registryServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const pathname = new URL(req.url ?? "/", "http://127.0.0.1").pathname;
      const file = path.basename(pathname);
      if (!file.endsWith(".json")) {
        res.writeHead(404).end();
        return;
      }
      const content = await fs.readFile(path.join(registryDir, file));
      res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      res.end(content);
    } catch {
      res.writeHead(404).end();
    }
  });

  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      if (!address || typeof address === "string") {
        reject(new Error("Could not resolve registry test server address"));
        return;
      }
      resolve({
        server,
        registry: `http://127.0.0.1:${address.port}`,
      });
    });
  });
}

const temp = await fs.mkdtemp(path.join(os.tmpdir(), "neoncite-vite-"));
const { server, registry } = await registryServer();

try {
  await fs.mkdir(path.join(temp, "src"), { recursive: true });

  await fs.writeFile(
    path.join(temp, "package.json"),
    `${JSON.stringify(
      {
        name: "neoncite-clean-room",
        private: true,
        type: "module",
        scripts: { build: "tsc --noEmit && vite build" },
        dependencies: {
          "@tailwindcss/vite": "^4.2.1",
          "@vitejs/plugin-react": "^5.0.4",
          react: "^19.2.0",
          "react-dom": "^19.2.0",
          tailwindcss: "^4.2.1",
          typescript: "^5.8.3",
          vite: "^7.3.1",
        },
        devDependencies: {
          "@types/react": "^19.2.0",
          "@types/react-dom": "^19.2.0",
        },
      },
      null,
      2,
    )}\n`,
  );

  await fs.writeFile(
    path.join(temp, "tsconfig.json"),
    `${JSON.stringify(
      {
        compilerOptions: {
          target: "ES2022",
          useDefineForClassFields: true,
          lib: ["ES2022", "DOM", "DOM.Iterable"],
          allowJs: false,
          skipLibCheck: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          strict: true,
          forceConsistentCasingInFileNames: true,
          module: "ESNext",
          moduleResolution: "Bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          noEmit: true,
          jsx: "react-jsx",
        },
        include: ["src"],
      },
      null,
      2,
    )}\n`,
  );

  await fs.writeFile(
    path.join(temp, "vite.config.ts"),
    `import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwindcss from "@tailwindcss/vite";\n\nexport default defineConfig({ plugins: [react(), tailwindcss()] });\n`,
  );

  await fs.writeFile(
    path.join(temp, "index.html"),
    `<div id="root"></div><script type="module" src="/src/main.tsx"></script>\n`,
  );
  await fs.writeFile(path.join(temp, "src/index.css"), '@import "tailwindcss";\n');
  await fs.writeFile(
    path.join(temp, "src/main.tsx"),
    `import React from "react";\nimport ReactDOM from "react-dom/client";\nimport "./index.css";\nimport App from "./App";\n\nReactDOM.createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);\n`,
  );
  await fs.writeFile(
    path.join(temp, "src/App.tsx"),
    `export default function App() { return <main>Neoncite clean room</main>; }\n`,
  );

  await run("npm", ["install", "--no-audit", "--no-fund"], temp);
  await run("node", [cli, "init", "-y", "--registry", registry], temp);
  await run("node", [cli, "add", "button", "data-table", "dialog", "-y"], temp);

  await fs.writeFile(
    path.join(temp, "src/App.tsx"),
    `import { Button } from "./components/neoncite/button";\n\nexport default function App() { return <main className="min-h-screen bg-black p-8"><Button variant="primary">Neoncite ready</Button></main>; }\n`,
  );

  const button = await fs.readFile(path.join(temp, "src/components/neoncite/button.tsx"), "utf8");
  const dialog = await fs.readFile(path.join(temp, "src/components/neoncite/dialog.tsx"), "utf8");
  const dataTable = await fs.readFile(
    path.join(temp, "src/components/neoncite/data-table.tsx"),
    "utf8",
  );

  assert.doesNotMatch(button, /@\/lib\/utils/);
  assert.doesNotMatch(dialog, /@\/registry\/ui\//);
  assert.doesNotMatch(dataTable, /@\/lib\/utils/);
  assert.match(dialog, /from "\.\/button"/);

  await run("npm", ["run", "build"], temp);
  console.log(`[clean-room] Vite project passed at ${temp}`);
} finally {
  await new Promise((resolve) => server.close(resolve));
  await fs.rm(temp, { recursive: true, force: true });
}
