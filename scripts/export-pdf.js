import { chromium } from "playwright";
import http from "http";
import { readFile } from "fs/promises";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Site GitHub Pages
const SITE_DIR = path.resolve(__dirname, "..", "docs");

// PDF output (servi par GitHub Pages)
const OUT_DIR = path.join(SITE_DIR, "exports");
const OUT_FILE = path.join(OUT_DIR, "dotnet-logging-strategy.pdf");

// Port local pour servir docs/
const PORT = 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2"
};

function safeJoin(root, reqUrl) {
  const cleanPath = decodeURIComponent((reqUrl || "/").split("?")[0]);
  const rel = cleanPath === "/" ? "/index.html" : cleanPath;
  const target = path.normalize(path.join(root, rel));
  return target.startsWith(root) ? target : null;
}

async function serveStatic(root) {
  const server = http.createServer(async (req, res) => {
    const target = safeJoin(root, req.url);
    if (!target) {
      res.writeHead(400);
      res.end("Bad request");
      return;
    }

    try {
      const data = await readFile(target);
      const ext = path.extname(target).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(PORT, resolve));
  return server;
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const server = await serveStatic(SITE_DIR);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });

  // print-pdf = mode impression Reveal
  await page.goto(`http://127.0.0.1:${PORT}/?print-pdf`, { waitUntil: "networkidle" });

  // Attendre que Reveal soit prêt (évite capture trop tôt)
  await page.waitForSelector(".reveal.ready", { timeout: 30000 });

  // Petit buffer pour les fonts/highlight après rendu
  await page.waitForTimeout(500);

  await page.pdf({
    path: OUT_FILE,
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  server.close();

  console.log(`PDF generated: ${OUT_FILE}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
