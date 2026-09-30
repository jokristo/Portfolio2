// Fails the build if the exported site contains a dead link: href="#", an empty
// href, "undefined"/"null", or an internal path that does not resolve to a file.
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;
if (!existsSync(OUT)) {
  console.error("check-links: out/ not found, run `next build` first.");
  process.exit(1);
}

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".html")) htmlFiles.push(p);
  }
};
walk(OUT);

const resolves = (path) => {
  const clean = decodeURIComponent(path.split(/[?#]/)[0]).replace(/^\//, "");
  if (clean === "") return existsSync(join(OUT, "index.html"));
  return [clean, `${clean}.html`, join(clean, "index.html")].some((c) => existsSync(join(OUT, c)) && statSync(join(OUT, c)).isFile());
};

const problems = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const page = relative(OUT, file);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, href] of html.matchAll(/<a\b[^>]*?\shref="([^"]*)"/g)) {
    const h = href.trim();
    if (h === "" || h === "#" || /^(undefined|null)$/i.test(h) || /\/(undefined|null)(\/|$)/.test(h)) problems.push(`${page}: dead link "${href}"`);
    else if (h.startsWith("#") && !ids.has(h.slice(1)) && h !== "#top") problems.push(`${page}: anchor "${h}" has no matching id`);
    else if (h.startsWith("/") && !h.startsWith("//") && !resolves(h)) problems.push(`${page}: "${h}" does not exist in the export`);
  }
}

if (problems.length) {
  console.error(`check-links: ${problems.length} problem(s)\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`check-links: ${htmlFiles.length} page(s), no dead links.`);
