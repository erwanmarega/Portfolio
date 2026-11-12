import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";
import { afterAll, describe, expect, it } from "vitest";

const outDir = mkdtempSync(join(tmpdir(), "portfolio-build-"));

afterAll(() => rmSync(outDir, { recursive: true, force: true }));

describe("production build", () => {
  it("emits index.html and 404.html with bundled assets", async () => {
    await build({ logLevel: "silent", build: { outDir, emptyOutDir: true } });

    const index = readFileSync(join(outDir, "index.html"), "utf8");
    expect(index).toContain('<div id="app">');
    expect(index).toMatch(/<script type="module"[^>]+src="\/assets\/[^"]+\.js"/);
    expect(existsSync(join(outDir, "404.html"))).toBe(true);
  }, 120_000);
});
