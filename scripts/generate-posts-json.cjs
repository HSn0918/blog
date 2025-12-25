const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDir = path.join(process.cwd(), "posts");
const outputPath = path.join(process.cwd(), "public", "posts.json");

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

const readPosts = () => {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => {
      const id = file.replace(/\.mdx?$/, "");
      const fullPath = path.join(postsDir, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      if (data?.draft) return null;
      return {
        id,
        title: data?.title ?? id,
        date: data?.date ?? null,
        summary: data?.summary ?? "",
        tags: Array.isArray(data?.tags) ? data.tags : [],
      };
    })
    .filter(Boolean);
};

const writeIndex = (posts) => {
  const payload = {
    code: 200,
    message: "ok",
    data: posts,
  };
  ensureDir(path.dirname(outputPath));
  fs.writeFileSync(outputPath, JSON.stringify(payload, null, 2));
};

const posts = readPosts();
writeIndex(posts);
