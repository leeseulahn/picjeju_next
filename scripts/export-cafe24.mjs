import { spawn } from "node:child_process";
import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { adminPages } from "../src/generated/admin-page-content.js";
import { pages } from "../src/generated/page-content.js";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const outputDir = path.join(rootDir, "cafe24-deploy");
const nextBin = path.join(rootDir, "node_modules", "next", "dist", "bin", "next");

const extraPageKeys = ["board-write", "point-exchange"];
const textExtensions = new Set([".css", ".html", ".js", ".json", ".txt"]);
const defaultBasePath = "/picjeju_next";
const deployBasePath = normalizeBasePath(getArgValue("--base-path") || process.env.CAFE24_BASE_PATH || defaultBasePath);

function getArgValue(name) {
  const prefix = `${name}=`;
  const direct = process.argv.find((arg) => arg.startsWith(prefix));
  if (direct) return direct.slice(prefix.length);

  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : "";
}

function normalizeBasePath(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed || trimmed === "/") return "";
  return `/${trimmed.replace(/^\/+|\/+$/g, "")}`;
}

function toFilePath(relativePath) {
  const target = path.resolve(outputDir, relativePath);
  if (target !== outputDir && !target.startsWith(`${outputDir}${path.sep}`)) {
    throw new Error(`Refusing to write outside output directory: ${relativePath}`);
  }
  return target;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function canUsePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, "127.0.0.1");
  });
}

async function findPort(startPort) {
  for (let port = startPort; port < startPort + 100; port += 1) {
    if (await canUsePort(port)) return port;
  }
  throw new Error("Could not find an available local port.");
}

async function assertExists(targetPath, label) {
  try {
    await stat(targetPath);
  } catch {
    throw new Error(`${label} not found: ${targetPath}`);
  }
}

async function waitForServer(baseUrl, serverProcess) {
  let lastError = null;

  for (let attempt = 0; attempt < 90; attempt += 1) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Next server exited before it was ready with code ${serverProcess.exitCode}.`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.status < 500) return;
    } catch (error) {
      lastError = error;
    }

    await delay(500);
  }

  throw new Error(`Timed out waiting for Next server. ${lastError?.message || ""}`.trim());
}

function startNextServer(port) {
  const child = spawn(process.execPath, [nextBin, "start", "-H", "127.0.0.1", "-p", String(port)], {
    cwd: rootDir,
    env: {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1"
    },
    stdio: ["ignore", "pipe", "pipe"]
  });

  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));

  return child;
}

async function copyStaticAssets() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });
  await cp(path.join(rootDir, "public"), outputDir, { recursive: true });
}

function addPageRoutes(routes) {
  const pageKeys = new Set([...Object.keys(pages), ...extraPageKeys]);

  routes.push({ route: "/", file: "index.html" });
  routes.push({ route: "/pages/index.html", file: "pages/index.html" });

  for (const key of pageKeys) {
    if (key === "index") continue;

    routes.push({ route: `/pages/${key}.html`, file: `pages/${key}.html` });
    routes.push({ route: `/${key}`, file: `${key}/index.html` });
    routes.push({ route: `/${key}.html`, file: `${key}.html` });
  }
}

function addAdminRoutes(routes) {
  for (const key of Object.keys(adminPages)) {
    if (!key) {
      routes.push({ route: "/admin", file: "admin/index.html" });
      continue;
    }

    routes.push({ route: `/admin/${key}`, file: `admin/${key}/index.html` });
    routes.push({ route: `/admin/${key}.html`, file: `admin/${key}.html` });
  }
}

function buildRoutes() {
  const routes = [];
  addPageRoutes(routes);
  addAdminRoutes(routes);
  return routes;
}

async function fetchHtml(baseUrl, route, file) {
  const url = new URL(route, baseUrl);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to export ${route}: ${response.status} ${response.statusText}`);
  }

  const html = await response.text();
  const target = toFilePath(file);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, rewriteForDeployBase(html.replaceAll(baseUrl.replace(/\/$/, ""), ""), ".html"), "utf8");
}

async function writeGuide(routeCount) {
  const guide = `Picjeju Cafe24 deployment package

Upload every file and folder inside this directory to:
https://plandertest2.mycafe24.com${deployBasePath || "/"}

Do not upload the parent cafe24-deploy folder itself.

Generated routes: ${routeCount}
Base path: ${deployBasePath || "/"}

Notes:
- This is a static export for Cafe24 web hosting.
- Files under assets and admin/assets must stay in place.
- Next.js runtime scripts are stripped because this package is for static hosting.
- Dynamic POST endpoints such as /api/posts are not included in static hosting.
`;

  await writeFile(toFilePath("UPLOAD_GUIDE.txt"), guide, "utf8");
}

function injectBaseGlobals(html) {
  if (!deployBasePath || !/<head[\s>]/i.test(html)) return html;
  if (html.includes("window.PICJEJU_BASE_PATH=")) return html;

  const globals = `<script>window.PICJEJU_BASE_PATH="${deployBasePath}";window.ADMIN_BASE_PATH="${deployBasePath}/admin";window.ADMIN_BASE_URL="${deployBasePath}/admin/";</script>`;
  return html.replace(/<head(\s[^>]*)?>/i, (match) => `${match}\n${globals}`);
}

function rewriteRootRelativePaths(content) {
  if (!deployBasePath) return content;

  const rootPathPattern = /(^|[^A-Za-z0-9_:@.-])\/(assets|_next|admin|api|pages)(?=\/|["'?#<>)\]\s]|$)/g;
  return content
    .replaceAll("/picjeju/admin", `${deployBasePath}/admin`)
    .replace(rootPathPattern, (_match, before, segment) => `${before}${deployBasePath}/${segment}`);
}

function rewriteRelativeHtmlAssets(content) {
  if (!deployBasePath) return content;

  const assetRoot = `${deployBasePath}/assets/`;
  return content
    .replace(/((?:href|src|poster|data-source|content)=["'])(?:\.\.\/|\.\/)?assets\//gi, `$1${assetRoot}`)
    .replace(/(url\(["']?)(?:\.\.\/|\.\/)?assets\//gi, `$1${assetRoot}`)
    .replace(/(["'])\.\.\/assets\//g, `$1${assetRoot}`)
    .replace(/(["'])\.\/assets\//g, `$1${assetRoot}`)
    .replace(/(["'])assets\//g, `$1${assetRoot}`)
    .replace(
      /window\.PICJEJU_ASSET_ROOT = isPagesRoute \? "\.\.\/assets" : "assets";/g,
      `window.PICJEJU_ASSET_ROOT = "${deployBasePath}/assets";`
    )
    .replace(
      /window\.PICJEJU_PAGE_ROOT = isPagesRoute \? "\." : "pages";/g,
      `window.PICJEJU_PAGE_ROOT = "${deployBasePath}/pages";`
    );
}

function rewriteRelativeAssetStrings(content, extension) {
  if (!deployBasePath) return content;

  const assetRoot = `${deployBasePath}/assets/`;
  const rewritten = content
    .replaceAll("../assets/", assetRoot)
    .replaceAll("./assets/", assetRoot)
    .replaceAll("..\\/assets\\/", `${assetRoot.replaceAll("/", "\\/")}`)
    .replaceAll(".\\/assets\\/", `${assetRoot.replaceAll("/", "\\/")}`);

  if (extension !== ".json") return rewritten;

  return rewritten.replace(/(["'])assets\//g, `$1${assetRoot}`);
}

function stripNextRuntime(html) {
  return html
    .replace(/\s*<link\b[^>]*\bhref=(["'])[^"']*\/_next\/static\/[^"']+\1[^>]*>/gi, "")
    .replace(/\s*<script\b[^>]*\bsrc=(["'])[^"']*\/_next\/static\/[^"']+\1[^>]*>\s*<\/script>/gi, "")
    .replace(/\s*<script>\s*\(?self\.__next_f[\s\S]*?<\/script>/gi, "")
    .replace(/\s*<script>\s*window\.__next[\s\S]*?<\/script>/gi, "")
    .replace(/<!--\$-->|<!--\/\$-->/g, "");
}

function rewriteForDeployBase(content, extension) {
  if (!deployBasePath) return content;

  const withGlobals = extension === ".html" ? injectBaseGlobals(content) : content;
  const withRootPaths = rewriteRootRelativePaths(withGlobals);
  const withRelativeAssets = rewriteRelativeAssetStrings(withRootPaths, extension);
  if (extension !== ".html") return withRelativeAssets;

  return stripNextRuntime(rewriteRelativeHtmlAssets(withRelativeAssets));
}

async function getTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getTextFiles(entryPath));
    } else if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files;
}

async function rewriteDeploymentFiles() {
  if (!deployBasePath) return;

  const files = await getTextFiles(outputDir);
  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    const original = await readFile(file, "utf8");
    const rewritten = rewriteForDeployBase(original, extension);
    if (rewritten !== original) {
      await writeFile(file, rewritten, "utf8");
    }
  }
}

async function main() {
  await assertExists(nextBin, "Next.js binary");
  await assertExists(path.join(rootDir, ".next"), "Next build output");
  await assertExists(path.join(rootDir, ".next", "static"), "Next static output");

  const port = await findPort(4100);
  const baseUrl = `http://127.0.0.1:${port}/`;
  const routes = buildRoutes();
  const serverProcess = startNextServer(port);

  try {
    await waitForServer(baseUrl, serverProcess);
    await copyStaticAssets();

    for (const item of routes) {
      await fetchHtml(baseUrl, item.route, item.file);
      process.stdout.write(`exported ${item.route} -> cafe24-deploy/${item.file}\n`);
    }

    await writeGuide(routes.length);
    await rewriteDeploymentFiles();
    process.stdout.write(`\nCafe24 export complete: ${outputDir}\n`);
    process.stdout.write(`Base path: ${deployBasePath || "/"}\n`);
  } finally {
    serverProcess.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
