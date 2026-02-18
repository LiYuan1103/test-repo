import { readFileSync, existsSync } from "fs";
import { join, extname, resolve } from "path";

const PORT = process.env.PORT || 3000;
const ROOT = resolve(".");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

Bun.serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    let pathname = url.pathname === "/" ? "/index.html" : url.pathname;

    // Resolve the path and prevent path traversal
    const filePath = resolve(ROOT, "." + pathname);
    if (!filePath.startsWith(ROOT)) {
      return new Response("403 Forbidden", { status: 403 });
    }

    if (!existsSync(filePath)) {
      return new Response("404 Not Found", { status: 404 });
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const file = readFileSync(filePath);

    return new Response(file, {
      headers: { "Content-Type": contentType },
    });
  },
});

console.log(`
╔══════════════════════════════════════════╗
║   ☁  CloudFlow Dev Server               ║
║                                          ║
║   Local:  http://localhost:${PORT}          ║
║                                          ║
║   Press Ctrl+C to stop                   ║
╚══════════════════════════════════════════╝
`);
