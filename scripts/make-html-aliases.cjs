const fs = require("fs");
const path = require("path");

const exists = (filePath) => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const copyFile = (from, to) => {
  fs.copyFileSync(from, to);
  // keep timestamps stable-ish (optional), but at least ensure it exists
};

const ensureHtmlAliasForDir = (dirPath, outFilePath) => {
  const indexHtml = path.join(dirPath, "index.html");
  if (!exists(indexHtml)) return false;
  copyFile(indexHtml, outFilePath);
  return true;
};

const main = () => {
  const outDir = path.join(process.cwd(), "out");
  if (!exists(outDir)) {
    console.warn(`[make-html-aliases] skip: out dir not found: ${outDir}`);
    return;
  }

  // 1) Top-level route aliases: out/blog/index.html -> out/blog.html (etc.)
  const outEntries = fs.readdirSync(outDir, { withFileTypes: true });
  for (const entry of outEntries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_")) continue;

    const routeDir = path.join(outDir, entry.name);
    const aliasPath = path.join(outDir, `${entry.name}.html`);
    ensureHtmlAliasForDir(routeDir, aliasPath);
  }

  // 2) Blog post aliases: out/blog/<slug>/index.html -> out/blog/<slug>.html
  const blogDir = path.join(outDir, "blog");
  if (!exists(blogDir)) return;

  const blogEntries = fs.readdirSync(blogDir, { withFileTypes: true });
  for (const entry of blogEntries) {
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith("_")) continue;

    const postDir = path.join(blogDir, entry.name);
    const aliasPath = path.join(blogDir, `${entry.name}.html`);
    ensureHtmlAliasForDir(postDir, aliasPath);
  }

  console.log("[make-html-aliases] done");
};

main();

