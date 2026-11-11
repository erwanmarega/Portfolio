// Regenerates the two downloadable CVs (public/cv-erwan-marega-{fr,en}.pdf) from
// the /cv page, so the PDFs always match the site content.
// Usage: npm run cv:pdf   (run it after any change to the CV / journey texts)
// Needs Chrome or Chromium; set CHROME_BIN if it is not at a usual location.
import { execFile } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { build, preview } from "vite";

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const CHROME_CANDIDATES = [
  process.env.CHROME_BIN,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((path) => existsSync(path));
if (!chrome) {
  console.error("Chrome not found. Set CHROME_BIN to a Chrome or Chromium executable.");
  process.exit(1);
}

// A rendered CV is ~115 kB; a blank page is ~1 kB.
const MIN_BYTES = 20_000;

const TARGETS = [
  { locale: "fr", path: "/cv" },
  { locale: "en", path: "/en/cv" },
];

await build({ root, logLevel: "warn" });
const server = await preview({ root, logLevel: "warn", preview: { port: 4179, strictPort: true } });
const origin = server.resolvedUrls.local[0].replace(/\/$/, "");

let failed = false;
try {
  for (const { locale, path } of TARGETS) {
    const out = resolve(root, "public", `cv-erwan-marega-${locale}.pdf`);
    // A cold start can print before the page has rendered, which gives an
    // almost empty file: retry until the PDF has real content.
    for (let attempt = 1; attempt <= 3; attempt++) {
      await run(chrome, [
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        // Lets the lazy page chunk and the web fonts load before printing.
        "--virtual-time-budget=9000",
        `--print-to-pdf=${out}`,
        `${origin}${path}`,
      ]);
      if (statSync(out).size > MIN_BYTES) break;
      if (attempt === 3) {
        failed = true;
        console.error(`  The ${locale} CV came out empty after 3 attempts.`);
      }
    }
    const pages = (readFileSync(out, "latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
    console.log(`${locale}: ${out} (${pages} page${pages > 1 ? "s" : ""})`);
    if (pages !== 1) {
      failed = true;
      console.error(
        `  The ${locale} CV no longer fits one A4 page: shorten it or tune the print CSS.`,
      );
    }
  }
} finally {
  await new Promise((done) => server.httpServer.close(done));
}

process.exit(failed ? 1 : 0);
