/*
 * Picjeju Components — vanilla JS template helpers.
 *
 * 핵심 원칙: 기존 디자인 시스템(.ds-*)의 클래스를 **그대로** 활용한다.
 * 새 prefix(pj-*)를 만들지 않고, design-system.css가 정의해 둔 ds-* 컴포넌트의
 * 마크업을 자동 생성하는 얇은 헬퍼다. 이미 시스템에 없는 패턴(예: 가격/별점)
 * 만 별도 정의한다.
 */
(function (global) {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" })[c];
    });
  }
  function attr(name, val) {
    if (val == null || val === false || val === "") return "";
    return " " + name + '="' + esc(val) + '"';
  }
  function cls() { return Array.prototype.slice.call(arguments).filter(Boolean).join(" "); }

  // ──────────────────────────────────────────────────────────────────────
  // Section header — design-system 패턴: 페이지/섹션 상단 kicker + title
  // 디자인시스템에 `.ds-section__head` 가 정의되어 있으므로 그대로 사용.
  // ──────────────────────────────────────────────────────────────────────
  function SectionHeader(opts) {
    opts = opts || {};
    var kicker = opts.kicker ? '<span class="ds-section__tag">' + esc(opts.kicker) + "</span>" : "";
    var more = opts.moreHref
      ? '<a class="ds-section__more" href="' + esc(opts.moreHref) + '">' + esc(opts.moreLabel || "더보기") + " →</a>"
      : "";
    return ''
      + '<header class="ds-section__head">'
      +   '<div>' + kicker + '<h3 class="ds-section__title">' + esc(opts.title || "") + "</h3>"
      +   (opts.desc ? '<p class="ds-section__desc">' + esc(opts.desc) + "</p>" : "")
      +   "</div>"
      +   more
      + "</header>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Pagination — 기존 `.ds-pagination` 활용
  // ──────────────────────────────────────────────────────────────────────
  function Pagination(opts) {
    opts = opts || {};
    var current = Math.max(1, parseInt(opts.current || 1, 10));
    var total = Math.max(1, parseInt(opts.total || 1, 10));
    var base = opts.baseHref || "?page=";
    var win = Math.max(1, parseInt(opts.windowSize || 2, 10));
    function link(n, label, isActive, isDisabled, ariaLabel) {
      var c = cls(isActive && "is-active", isDisabled && "is-disabled");
      var aria = (isActive ? ' aria-current="page"' : "") + (isDisabled ? ' aria-disabled="true" tabindex="-1"' : "");
      var href = isDisabled ? "javascript:void(0)" : (base + n);
      return '<a class="' + c + '" href="' + esc(href) + '"' + attr("aria-label", ariaLabel) + aria + '>' + (label || n) + '</a>';
    }
    var html = [];
    html.push(link(Math.max(1, current - 1), "‹", false, current === 1, "이전 페이지"));
    var min = Math.max(1, current - win);
    var max = Math.min(total, current + win);
    if (min > 1) {
      html.push(link(1, "1", current === 1, false, "1페이지"));
      if (min > 2) html.push('<span class="ds-pagination__gap" aria-hidden="true">…</span>');
    }
    for (var i = min; i <= max; i++) html.push(link(i, String(i), i === current, false, i + "페이지"));
    if (max < total) {
      if (max < total - 1) html.push('<span class="ds-pagination__gap" aria-hidden="true">…</span>');
      html.push(link(total, String(total), current === total, false, total + "페이지"));
    }
    html.push(link(Math.min(total, current + 1), "›", false, current === total, "다음 페이지"));
    return '<nav class="ds-pagination" aria-label="페이지 네비게이션">' + html.join("") + '</nav>';
  }

  // ──────────────────────────────────────────────────────────────────────
  // Empty state — 기존 `.ds-empty` + __icon/__title/__desc
  // ──────────────────────────────────────────────────────────────────────
  function EmptyState(opts) {
    opts = opts || {};
    var iconChar = ({ inbox: "📭", cart: "🛒", bell: "🔔", document: "📄", search: "🔍" })[opts.icon] || "✨";
    var action = opts.action
      ? '<a class="ds-button ds-button--primary ds-button--sm" href="' + esc(opts.action.href || "#") + '">' + esc(opts.action.label || "확인") + "</a>"
      : "";
    return ''
      + '<div class="ds-empty">'
      +   '<div class="ds-empty__icon" aria-hidden="true">' + iconChar + "</div>"
      +   '<h4 class="ds-empty__title">' + esc(opts.title || "표시할 내용이 없어요") + "</h4>"
      +   (opts.desc ? '<p class="ds-empty__desc">' + esc(opts.desc) + "</p>" : "")
      +   (action ? '<div style="margin-top:12px">' + action + "</div>" : "")
      + "</div>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Badge — 기존 `.ds-badge` + tone modifiers
  // ──────────────────────────────────────────────────────────────────────
  function Badge(opts) {
    opts = opts || {};
    var c = cls("ds-badge", opts.tone && "ds-badge--" + opts.tone);
    return '<span class="' + c + '">' + esc(opts.text || "") + "</span>";
  }
  // Tag — 기존 `.ds-tag` (카테고리/상태 라벨용 살짝 다른 톤)
  function Tag(opts) {
    opts = opts || {};
    var c = cls("ds-tag", opts.tone && "ds-tag--" + opts.tone);
    return '<span class="' + c + '">' + esc(opts.text || "") + "</span>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Chip — 기존 `.ds-chip` + __remove
  // ──────────────────────────────────────────────────────────────────────
  function Chip(opts) {
    opts = opts || {};
    var c = cls("ds-chip", opts.selected && "is-selected");
    var dataVal = attr("data-pj-value", opts.value);
    var remove = opts.removable ? '<button class="ds-chip__remove" type="button" aria-label="제거">×</button>' : "";
    return '<button type="button" class="' + c + '" aria-pressed="' + (opts.selected ? "true" : "false") + '"' + dataVal + ">" + esc(opts.text || "") + remove + "</button>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Card — 기존 `.ds-card-demo` 활용
  // ──────────────────────────────────────────────────────────────────────
  function CardTile(opts) {
    opts = opts || {};
    var href = opts.href || "#";
    var thumb = opts.thumb || "";
    var badge = opts.badge ? Tag({ text: opts.badge, tone: opts.badgeTone || "neutral" }) : "";
    var meta = opts.meta ? '<div class="ds-card-demo__meta">' + esc(opts.meta) + "</div>" : "";
    return ''
      + '<a class="ds-card-demo" href="' + esc(href) + '">'
      +   '<div class="ds-card-demo__img"><img src="' + esc(thumb) + '" alt="" loading="lazy"></div>'
      +   '<div class="ds-card-demo__body">'
      +     (badge ? '<div>' + badge + "</div>" : "")
      +     '<p class="ds-card-demo__title">' + esc(opts.title || "").replace(/\n/g, "<br>") + "</p>"
      +     meta
      +   "</div>"
      + "</a>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Avatar — 기존 `.ds-avatar / --xs/sm/md/lg/xl`, group은 `.ds-avatar-group`
  // ──────────────────────────────────────────────────────────────────────
  function Avatar(opts) {
    opts = opts || {};
    var sz = opts.size || "md";
    var src = opts.src || "/assets/images/avatar-sample.png";
    return '<span class="ds-avatar ds-avatar--' + esc(sz) + '"><img src="' + esc(src) + '"' + attr("alt", opts.alt || "프로필") + " /></span>";
  }
  function AvatarGroup(items) {
    items = items || [];
    return '<div class="ds-avatar-group">' + items.map(function (it) { return Avatar(it); }).join("") + "</div>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Status badge — 기존 `.ds-tag` + 톤 매핑
  // ──────────────────────────────────────────────────────────────────────
  function StatusBadge(opts) {
    opts = opts || {};
    var s = opts.status || "pending";
    var map = {
      pending:    { tone: "warning", text: "대기" },
      answered:   { tone: "success", text: "답변완료" },
      done:       { tone: "success", text: "완료" },
      cancelled:  { tone: "neutral", text: "취소" },
      shipping:   { tone: "info",    text: "배송중" },
      waiting:    { tone: "warning", text: "입금대기" },
      processing: { tone: "info",    text: "처리중" }
    };
    var preset = map[s] || { tone: "neutral", text: s };
    return Tag({ text: opts.text || preset.text, tone: preset.tone });
  }

  // ──────────────────────────────────────────────────────────────────────
  // List row — 기존 `.ds-board-row` 구조
  // ──────────────────────────────────────────────────────────────────────
  function ListRow(opts) {
    opts = opts || {};
    var cat = opts.category;
    var catHtml = cat ? '<div class="ds-board-row__cat">' + Tag({ text: cat.label, tone: cat.tone || "neutral" }) + "</div>" : "";
    var meta = opts.meta || {};
    var side = '<div class="ds-board-row__side">'
      + (meta.author ? '<span>' + esc(meta.author) + "</span>" : "")
      + (meta.date ? '<span>' + esc(meta.date) + "</span>" : "")
      + (meta.view != null ? '<span>👁 ' + meta.view + "</span>" : "")
      + (meta.reply != null ? '<span>💬 ' + meta.reply + "</span>" : "")
      + "</div>";
    var thumb = opts.thumb ? '<div class="ds-board-row__thumb"><img src="' + esc(opts.thumb) + '" alt=""></div>' : "";
    return ''
      + '<a class="ds-board-row" href="' + esc(opts.href || "#") + '">'
      +   thumb
      +   '<div class="ds-board-row__body">'
      +     catHtml
      +     '<div class="ds-board-row__title">' + esc(opts.title || "") + "</div>"
      +     (opts.sub ? '<div class="ds-board-row__sub">' + esc(opts.sub) + "</div>" : "")
      +   "</div>"
      +   side
      + "</a>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Skeleton — 기존 `.ds-skeleton / __line / __thumb / .ds-skeleton-card`
  // ──────────────────────────────────────────────────────────────────────
  function SkeletonRow() {
    return ''
      + '<div style="display:grid;grid-template-columns:64px 1fr;gap:12px;padding:12px 0;border-bottom:1px solid var(--pj-color-guide-line,#e3e6ea)">'
      +   '<div class="ds-skeleton ds-skeleton__thumb"></div>'
      +   '<div style="display:flex;flex-direction:column;gap:6px">'
      +     '<div class="ds-skeleton ds-skeleton__line" style="width:70%"></div>'
      +     '<div class="ds-skeleton ds-skeleton__line" style="width:40%"></div>'
      +   "</div>"
      + "</div>";
  }
  function SkeletonGrid(n) {
    n = n || 6;
    var arr = [];
    for (var i = 0; i < n; i++) arr.push('<div class="ds-skeleton ds-skeleton-card"></div>');
    return '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">' + arr.join("") + "</div>";
  }

  // ──────────────────────────────────────────────────────────────────────
  // Toast — 기존 `.ds-toast / --success/--info/--error`
  // ──────────────────────────────────────────────────────────────────────
  function emitToast(opts) {
    opts = opts || {};
    var c = document.getElementById("pj-toast-container");
    if (!c) {
      c = document.createElement("div");
      c.id = "pj-toast-container";
      c.setAttribute("aria-live", "polite");
      document.body.appendChild(c);
    }
    var tone = opts.tone || "info";
    var t = document.createElement("div");
    t.className = "ds-toast ds-toast--" + tone;
    t.setAttribute("role", "status");
    t.innerHTML = '<span>' + esc(opts.text || "") + '</span>'
      + '<button class="ds-toast__close" type="button" aria-label="닫기">×</button>';
    c.appendChild(t);
    var close = function () {
      t.style.opacity = "0";
      t.style.transform = "translateY(8px)";
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 200);
    };
    t.querySelector(".ds-toast__close").addEventListener("click", close);
    setTimeout(close, opts.duration || 3000);
    return t;
  }

  // ──────────────────────────────────────────────────────────────────────
  // ── 이하는 기존 디자인 시스템에 없는 신규 패턴 ──
  // PriceBlock — 가격(sale/origin/할인율/적립 안내)
  // ──────────────────────────────────────────────────────────────────────
  function PriceBlock(opts) {
    opts = opts || {};
    var sale = opts.sale != null ? Number(opts.sale).toLocaleString() : "";
    var origin = opts.origin != null ? Number(opts.origin).toLocaleString() : "";
    var pct = opts.pctOff != null ? opts.pctOff
      : (opts.sale != null && opts.origin && opts.sale < opts.origin
          ? Math.round((1 - Number(opts.sale) / Number(opts.origin)) * 100)
          : null);
    var currency = opts.currency || "원";
    return ''
      + '<div class="pj-price-block">'
      +   '<div class="pj-price-block__sale">'
      +     (pct != null ? '<span class="pj-price-block__pct">' + pct + "%</span>" : "")
      +     '<span class="pj-price-block__amount">' + sale + currency + "</span>"
      +   "</div>"
      +   (origin && origin !== sale ? '<div class="pj-price-block__origin">' + origin + currency + "</div>" : "")
      +   (opts.notice ? '<div class="pj-price-block__notice">' + esc(opts.notice) + "</div>" : "")
      + "</div>";
  }

  // Rating — 별점 (디자인시스템에 동일 패턴 없음)
  function Rating(opts) {
    opts = opts || {};
    var score = Number(opts.score || 0);
    var rounded = Math.round(score);
    var stars = "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(0, 5 - rounded);
    return ''
      + '<span class="pj-rating">'
      +   '<span class="pj-rating__stars" aria-label="평점 ' + score + ' / 5">' + stars + '</span>'
      +   '<span class="pj-rating__score">' + score.toFixed(1) + '</span>'
      +   (opts.count != null ? '<span class="pj-rating__count">' + opts.count + '</span>' : '')
      + '</span>';
  }

  // ──────────────────────────────────────────────────────────────────────
  // Public API
  // ──────────────────────────────────────────────────────────────────────
  var api = {
    SectionHeader: SectionHeader,
    Pagination: Pagination,
    EmptyState: EmptyState,
    Badge: Badge,
    Tag: Tag,
    Chip: Chip,
    CardTile: CardTile,
    Avatar: Avatar,
    AvatarGroup: AvatarGroup,
    StatusBadge: StatusBadge,
    ListRow: ListRow,
    SkeletonRow: SkeletonRow,
    SkeletonGrid: SkeletonGrid,
    PriceBlock: PriceBlock,
    Rating: Rating,
    toast: emitToast
  };

  global.PjComponents = api;
  global.PJ = global.PJ || {};
  global.PJ.Components = api;
})(typeof window !== "undefined" ? window : globalThis);
