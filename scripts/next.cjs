const { spawn } = require("child_process");

const nextBin = require.resolve("next/dist/bin/next");

const command = process.argv[2];
if (!command) {
  console.error("Usage: node scripts/next.cjs <dev|build|start> [...args]");
  process.exit(1);
}

const passthroughArgs = process.argv.slice(3);

const run = (args) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [nextBin, ...args], {
      env: process.env,
      stdio: ["inherit", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
      process.stdout.write(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
      process.stderr.write(chunk);
    });

    child.on("close", (code) => resolve({ code: code ?? 1, stdout, stderr }));
  });

const main = async () => {
  const supportsWebpackFlag = command === "build" || command === "dev";

  if (supportsWebpackFlag) {
    const withWebpack = await run([command, "--webpack", ...passthroughArgs]);
    if (withWebpack.code === 0) return process.exit(0);

    const combined = `${withWebpack.stdout}\n${withWebpack.stderr}`;
    if (combined.includes("unknown option '--webpack'")) {
      const fallback = await run([command, ...passthroughArgs]);
      return process.exit(fallback.code);
    }

    return process.exit(withWebpack.code);
  }

  const res = await run([command, ...passthroughArgs]);
  return process.exit(res.code);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

