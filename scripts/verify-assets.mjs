import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
const root = new URL("../public/assets/archive/", import.meta.url);
const { assets } = JSON.parse(
  await readFile(new URL("manifest.json", root), "utf8"),
);
for (const asset of assets) {
  const bytes = await readFile(new URL(asset.file, root));
  const actual = createHash("sha256").update(bytes).digest("hex");
  if (actual !== asset.sha256 || bytes.length !== asset.bytes)
    throw new Error(`Asset/provenance mismatch: ${asset.file}`);
  if (!asset.sourceFileUrl || !asset.rightsEvidenceUrl || !asset.use)
    throw new Error(`Incomplete provenance: ${asset.file}`);
  console.log(
    `Verified ${asset.file}: ${bytes.length} bytes, SHA-256 matches manifest`,
  );
}
