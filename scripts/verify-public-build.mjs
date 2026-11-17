#!/usr/bin/env node
// Refuse to deploy private scholarly source material or ebook formats.
// The only intended web output is the Vite-generated dist/ tree.
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const forbiddenDirectories = new Set(["literary-source-materials", "research-sources", "private-research", "private-sources", "private-literary-sources"]);
const forbiddenExtensions = new Set([".pdf", ".epub", ".mobi", ".azw", ".azw3", ".djvu", ".docx", ".rtf", ".odt"]);
const violations = [];

if (!existsSync(dist)) {
  console.error("Refusing deployment: dist/ is missing. Run the build first.");
  process.exit(1);
}

function inspect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    const rel = path.relative(dist, fullPath).replaceAll(path.sep, "/");
    if (entry.isDirectory()) {
      if (forbiddenDirectories.has(entry.name.toLowerCase())) {
        violations.push(rel + "/");
      } else {
        inspect(fullPath);
      }
    } else if (!entry.isFile() || forbiddenExtensions.has(path.extname(entry.name).toLowerCase())) {
      violations.push(rel);
    }
  }
}

inspect(dist);
if (violations.length) {
  console.error("Refusing deployment: prohibited file types or private research paths in the public build:");
  for (const violation of violations) console.error(" - " + violation);
  process.exit(1);
}
console.log("Public-build inspection passed: no ebook/PDF research materials in dist/.");
