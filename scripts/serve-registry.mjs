import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const directory = path.resolve(process.argv[2] ?? "public/r");
const port = Number(process.argv[3] ?? 4174);

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? "/", `http://127.0.0.1:${port}`).pathname);
  const relative = pathname.replace(/^\/+/, "");
  const file = path.resolve(directory, relative || "index.json");
  if (!file.startsWith(directory + path.sep) && file !== directory) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.setHeader("content-type", file.endsWith(".json") ? "application/json" : "text/plain");
  fs.createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`[registry-server] http://127.0.0.1:${port}`);
});
