const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

const shouldSkipDir = (dirName) => dirName === "_next";

const walk = (dir, fileList = []) => {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (shouldSkipDir(entry.name)) continue;
      walk(fullPath, fileList);
      continue;
    }
    fileList.push(fullPath);
  }
  return fileList;
};

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const main = () => {
  if (!fs.existsSync(outDir)) {
    console.error(`[fix-export-index] missing out dir: ${outDir}`);
    process.exit(1);
  }

  const files = walk(outDir);
  const htmlFiles = files.filter((p) => p.endsWith(".html"));

  let created = 0;
  for (const htmlPath of htmlFiles) {
    const base = path.basename(htmlPath);

    // Keep canonical files as-is.
    if (base === "index.html" || base === "404.html") continue;

    const dir = path.dirname(htmlPath);
    const nameWithoutExt = path.basename(htmlPath, ".html");
    const targetDir = path.join(dir, nameWithoutExt);
    const targetPath = path.join(targetDir, "index.html");

    ensureDir(targetDir);
    fs.copyFileSync(htmlPath, targetPath);
    created++;
  }

  // eslint-disable-next-line no-console
  console.log(`[fix-export-index] created/updated ${created} index.html files`);
};

main();

