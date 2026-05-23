// One-time refactor: extract the shared site chrome out of page-content.js
// into src/generated/chrome.js, then strip the chrome blocks from every page
// body in page-content.js. Layout.jsx renders the chrome from chrome.js once
// per request, eliminating ~50 KB of duplicated markup per page.
//
// Run with: `node scripts/lift-chrome.mjs`

import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "..");
const pagesPath = join(repoRoot, "src", "generated", "page-content.js");
const chromePath = join(repoRoot, "src", "generated", "chrome.js");

const CANONICAL_KEY = "board-news";

function fixPointExchangeLinks(html) {
  return html.replace(
    /(<a\b[^>]*href=(["']))((?:pages\/)?board-news\.html)(\2[^>]*>\s*픽포인트 거래소\s*<\/a>)/g,
    (_match, beforeHref, _q, href, afterHref) => {
      const next = href.startsWith("pages/") ? "pages/point-exchange.html" : "point-exchange.html";
      return `${beforeHref}${next}${afterHref}`;
    }
  );
}

function replaceDisplayNone(html) {
  return html.replace(
    /<([a-zA-Z][\w-]*)((?:\s+[^>\s]+="[^"]*")*?)\s+style="display:\s*none;?"((?:\s+[^>\s]+="[^"]*")*?)\s*(\/?)>/g,
    (_m, tag, a, b, slf) => {
      const attrs = `${a} ${b}`.trim();
      const classRe = /\bclass="([^"]*)"/;
      const cm = classRe.exec(attrs);
      const next = cm
        ? attrs.replace(classRe, `class="${`${cm[1].trim()} is-hidden`.trim()}"`)
        : `${attrs} class="is-hidden"`.trim();
      return `<${tag} ${next}${slf ? " /" : ""}>`;
    }
  );
}

function defangDeadlinks(html) {
  return html.replace(/(<a\b[^>]*\shref=)"#"/g, '$1"javascript:void(0);"');
}

function migrateInlineOnclick(html) {
  return html.replace(/\sonclick="history\.back\(\)"/g, ' data-pj-action="back"');
}

function normalizeMarkup(html) {
  return migrateInlineOnclick(defangDeadlinks(replaceDisplayNone(fixPointExchangeLinks(html))));
}

function splitMain(html) {
  const start = html.indexOf("<main");
  const end = html.indexOf("</main>", start);
  if (start < 0 || end < 0) return { beforeMain: "", main: "", afterMain: "" };
  return {
    beforeMain: html.slice(0, start),
    main: html.slice(start, end + "</main>".length),
    afterMain: html.slice(end + "</main>".length)
  };
}

function findBalancedClose(html, openIdx, tag) {
  const openRe = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const closeRe = new RegExp(`</${tag}\\s*>`, "gi");
  let depth = 0;
  let cursor = openIdx;
  while (cursor < html.length) {
    openRe.lastIndex = cursor;
    closeRe.lastIndex = cursor;
    const o = openRe.exec(html);
    const c = closeRe.exec(html);
    if (!c) return -1;
    if (o && o.index < c.index) {
      depth += 1;
      cursor = o.index + o[0].length;
    } else {
      depth -= 1;
      cursor = c.index + c[0].length;
      if (depth === 0) return cursor;
    }
  }
  return -1;
}

function extractTagInner(html, tag) {
  const openRe = new RegExp(`<${tag}\\b[^>]*>`, "i");
  const m = openRe.exec(html);
  if (!m) return "";
  const end = findBalancedClose(html, m.index, tag);
  if (end < 0) return "";
  return html.slice(m.index + m[0].length, end - (`</${tag}>`).length);
}

const ATTR_BLOCKS = [
  'tabindex="-1" id="main-nav"',
  'class="mo-navigation only-mo"',
  'id="loginModal"',
  'id="policyModal"',
  'id="privacyModal"',
  'tabindex="-1" id="Seachoffcanvas"'
];

function stripBalancedDiv(html, attr) {
  const re = /<div\b[^>]*>/gi;
  let m;
  while ((m = re.exec(html))) {
    if (m[0].includes(attr)) {
      const end = findBalancedClose(html, m.index, "div");
      if (end < 0) return html;
      return html.slice(0, m.index) + html.slice(end);
    }
  }
  return html;
}

function stripLiteral(html, lit) {
  const i = html.indexOf(lit);
  if (i < 0) return html;
  return html.slice(0, i) + html.slice(i + lit.length);
}

function stripChrome(body) {
  let html = body;
  // 1. page loader script
  const loaderStart = html.indexOf('<div id="pj-page-loader"');
  if (loaderStart >= 0) {
    const wrapStart = html.indexOf('<div id="wrap"', loaderStart);
    if (wrapStart >= 0) html = html.slice(0, loaderStart) + html.slice(wrapStart);
  }
  // 2. unwrap <div id="wrap">
  const wrapIdx = html.indexOf('<div id="wrap"');
  if (wrapIdx >= 0) {
    const wrapOpenEnd = html.indexOf(">", wrapIdx) + 1;
    const wrapClose = findBalancedClose(html, wrapIdx, "div");
    if (wrapClose > 0) {
      html = html.slice(0, wrapIdx) + html.slice(wrapOpenEnd, wrapClose - "</div>".length) + html.slice(wrapClose);
    }
  }
  // 3. <header>
  const hm = /<header\b[^>]*>/i.exec(html);
  if (hm) {
    const hc = findBalancedClose(html, hm.index, "header");
    if (hc > 0) html = html.slice(0, hm.index) + html.slice(hc);
  }
  // 4. <footer>
  const fm = /<footer\b[^>]*>/i.exec(html);
  if (fm) {
    const fc = findBalancedClose(html, fm.index, "footer");
    if (fc > 0) html = html.slice(0, fm.index) + html.slice(fc);
  }
  // 5. Modals & offcanvas
  for (const attr of ATTR_BLOCKS) html = stripBalancedDiv(html, attr);
  // 6. Toast + end scripts
  html = stripLiteral(html, '<div id="pj-toast-container"></div>');
  html = stripLiteral(html, '<script src="../assets/vendor/daum/postcode.v2.js"></script>');
  html = stripLiteral(html, '<script src="../assets/js/navigation-shell.js"></script>');
  return html.replace(/\s+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function main() {
  const raw = await readFile(pagesPath, "utf8");
  // Parse the file body as the JS literal — we trust it because we generated it.
  const mod = await import(`file://${pagesPath.replace(/\\/g, "/")}`);
  const pagesObj = mod.pages;
  if (!pagesObj || !pagesObj[CANONICAL_KEY]) {
    throw new Error(`Canonical page ${CANONICAL_KEY} not found.`);
  }

  // 1. Normalize the canonical body and extract chrome parts.
  const canonicalBody = normalizeMarkup(pagesObj[CANONICAL_KEY].body);
  const split = splitMain(canonicalBody);
  const loaderStart = split.beforeMain.indexOf('<div id="pj-page-loader"');
  const wrapStartInBefore = split.beforeMain.indexOf('<div id="wrap"', loaderStart);
  const pageLoaderHtml =
    loaderStart >= 0 && wrapStartInBefore >= 0
      ? split.beforeMain.slice(loaderStart, wrapStartInBefore)
      : "";
  const headerInnerHtml = extractTagInner(split.beforeMain, "header");
  const footerInnerHtml = extractTagInner(split.afterMain, "footer");
  const footerCloseIdx = split.afterMain.indexOf("</footer>");
  const postFooterHtml = footerCloseIdx >= 0 ? split.afterMain.slice(footerCloseIdx + "</footer>".length) : "";

  // 2. Write src/generated/chrome.js
  const chromeFileBody = `// Generated by scripts/lift-chrome.mjs. Do not edit by hand.
// Re-run the script after touching the canonical page (board-news) chrome.
/* eslint-disable */
export const PAGE_LOADER_HTML = ${JSON.stringify(pageLoaderHtml)};
export const HEADER_INNER_HTML = ${JSON.stringify(headerInnerHtml)};
export const FOOTER_INNER_HTML = ${JSON.stringify(footerInnerHtml)};
export const POST_FOOTER_HTML = ${JSON.stringify(postFooterHtml)};
`;
  await writeFile(chromePath, chromeFileBody, "utf8");

  // 3. Strip chrome from every page body and re-emit page-content.js.
  const cleaned = {};
  let before = 0;
  let after = 0;
  for (const [key, page] of Object.entries(pagesObj)) {
    const normalized = normalizeMarkup(page.body);
    const stripped = stripChrome(normalized);
    before += page.body.length;
    after += stripped.length;
    cleaned[key] = { ...page, body: stripped };
  }

  // Detect the leading commentary in the original file to preserve.
  const leading = raw.match(/^\/\/[^\n]*\n/);
  const header = leading ? leading[0] : "// Generated from the legacy HTML export. Do not edit by hand.\n";

  // Emit page-content.js as JSON-ish JS so it stays diff-friendly.
  const lines = ["export const pages = {"];
  const keys = Object.keys(cleaned);
  keys.forEach((key, idx) => {
    const p = cleaned[key];
    lines.push(`  ${JSON.stringify(key)}: {`);
    lines.push(`    "title": ${JSON.stringify(p.title || "")},`);
    lines.push(`    "description": ${JSON.stringify(p.description || "")},`);
    lines.push(`    "keywords": ${JSON.stringify(p.keywords || "")},`);
    lines.push(`    "body": ${JSON.stringify(p.body)}`);
    lines.push(`  }${idx === keys.length - 1 ? "" : ","}`);
  });
  lines.push("};");
  await writeFile(pagesPath, header + lines.join("\n") + "\n", "utf8");

  console.log(
    `Stripped chrome from ${keys.length} pages. ${before} → ${after} chars (${(((before - after) / before) * 100).toFixed(1)}% reduction).`
  );
  console.log(`Wrote chrome to ${chromePath}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
