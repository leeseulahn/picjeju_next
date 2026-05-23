// Runtime helpers for the front-end page chrome. The actual chrome HTML is
// pre-extracted into src/generated/chrome.js by scripts/lift-chrome.mjs, and
// page bodies in src/generated/page-content.js have their chrome blocks
// stripped at build time. The helpers below only apply small per-request
// normalizations and (defensively) a no-op strip in case new pages are added
// with their chrome still inline.

import {
  PAGE_LOADER_HTML as RAW_PAGE_LOADER_HTML,
  HEADER_INNER_HTML,
  FOOTER_INNER_HTML,
  POST_FOOTER_HTML as RAW_POST_FOOTER_HTML
} from "../generated/chrome";

// Strip <script>...</script> blocks from chrome HTML — these were inline IIFE
// loaders. We re-load them via real <script src> from layout.jsx so React stops
// warning about "Scripts inside React components are never executed".
function stripScripts(html) {
  return String(html || "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
}

export const PAGE_LOADER_HTML = stripScripts(RAW_PAGE_LOADER_HTML);
export const POST_FOOTER_HTML = stripScripts(RAW_POST_FOOTER_HTML);
export { HEADER_INNER_HTML, FOOTER_INNER_HTML };

function fixPointExchangeLinks(html) {
  return html.replace(
    /(<a\b[^>]*href=(["']))((?:pages\/)?board-news\.html)(\2[^>]*>\s*픽포인트 거래소\s*<\/a>)/g,
    (_match, beforeHref, _quote, href, afterHref) => {
      const nextHref = href.startsWith("pages/") ? "pages/point-exchange.html" : "point-exchange.html";
      return `${beforeHref}${nextHref}${afterHref}`;
    }
  );
}

function replaceDisplayNone(html) {
  return html.replace(
    /<([a-zA-Z][\w-]*)((?:\s+[^>\s]+="[^"]*")*?)\s+style="display:\s*none;?"((?:\s+[^>\s]+="[^"]*")*?)\s*(\/?)>/g,
    (_match, tag, attrsBefore, attrsAfter, selfClose) => {
      const attrs = `${attrsBefore} ${attrsAfter}`.trim();
      const classRe = /\bclass="([^"]*)"/;
      const cm = classRe.exec(attrs);
      const nextAttrs = cm
        ? attrs.replace(classRe, `class="${`${cm[1].trim()} is-hidden`.trim()}"`)
        : `${attrs} class="is-hidden"`.trim();
      return `<${tag} ${nextAttrs}${selfClose ? " /" : ""}>`;
    }
  );
}

function defangDeadlinks(html) {
  return html.replace(/(<a\b[^>]*\shref=)"#"/g, '$1"javascript:void(0);"');
}

function migrateInlineOnclick(html) {
  return html.replace(/\sonclick="history\.back\(\)"/g, ' data-pj-action="back"');
}

// Strip inline main-grid.js script tag — it's reloaded from layout.jsx as a
// real <script src> so Next.js streaming/hydration doesn't drop it.
function stripInlineMainGridScript(html) {
  return html.replace(/<script[^>]*src=["'][^"']*\/?(?:\.\.\/)?assets\/js\/main-grid\.js[^"']*["'][^>]*><\/script>\s*/g, "");
}

function normalizeMarkup(html) {
  if (!html) return html;
  return stripInlineMainGridScript(
    migrateInlineOnclick(
      defangDeadlinks(replaceDisplayNone(fixPointExchangeLinks(html)))
    )
  );
}

export function extractPageContent(body) {
  // Pages are already chrome-stripped & normalized at build time, so this is
  // a defensive idempotent pass for any future page that might re-introduce
  // chrome blocks. It also keeps the page.jsx call site uniform.
  return { html: normalizeMarkup(body || "") };
}
