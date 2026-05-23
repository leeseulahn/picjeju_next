/*
 * Renewal shell — delegated handlers and ARIA setup that belong to the
 * cross-page layout chrome. Loaded by app/layout.jsx as an external script
 * so Next.js client navigation / HMR re-executes it correctly.
 */
(function () {
  window.__rs_loaded = (window.__rs_loaded || 0) + 1;
  // 1. Back navigation delegation: any [data-pj-action="back"] click goes back.
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest('[data-pj-action="back"]');
    if (!trigger) return;
    e.preventDefault();
    if (history.length > 1) history.back();
  });

  // 2. Bottom tabbar active state — based on the current pathname.
  var tabMap = {
    "": "home", index: "home",
    event: "event", "event-calendar": "event", apply: "event",
    community: "community", "community-event": "community",
    "community-tip": "community", "community-friends": "community",
    "board-news": "community", "board-market": "community",
    "board-view": "community", "single-view": "community",
    "point-exchange": "community", life: "community", map: "community",
    store: "store", category: "store", detail: "store", cart: "store",
    order: "store",
    mypage: "mypage"
  };
  function highlightTabbar() {
    var items = document.querySelectorAll(".pj-tabbar__item");
    if (!items.length) return false;
    var path = location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";
    var first = path.split("/").filter(Boolean)[0] || "home";
    var active = tabMap[first] || (first.indexOf("mypage") === 0 ? "mypage" : "home");
    items.forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-pj-tab") === active);
    });
    return true;
  }

  // 3. Toast container — announce updates politely to assistive tech.
  function ensureToastAria() {
    var c = document.getElementById("pj-toast-container");
    if (!c) return false;
    if (!c.hasAttribute("aria-live")) {
      c.setAttribute("aria-live", "polite");
      c.setAttribute("aria-atomic", "false");
      c.setAttribute("role", "status");
    }
    return true;
  }

  // 4. Main grid bootstrap — Next.js streaming/hydration sometimes skips the
  //    main-grid.js <script> tag. Detect the grid element and run a minimal
  //    renderer that pulls JSON and prints the cards directly.
  var mainGridPosts = null;
  function bootstrapMainGrid() {
    var grid = document.getElementById("main-content");
    if (!grid) return;
    if (grid.children.length > 0) return;
    if (mainGridPosts) {
      paintMainGrid(grid, mainGridPosts);
      return;
    }
    var src = grid.getAttribute("data-source") || "";
    if (!src) return;
    // Mark loading so we don't kick off multiple fetches.
    if (grid.dataset.pjLoading === "1") return;
    grid.dataset.pjLoading = "1";
    fetch(src, { cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : []; })
      .catch(function () { return []; })
      .then(function (posts) {
        if (!Array.isArray(posts) || !posts.length) return;
        mainGridPosts = posts;
        var liveGrid = document.getElementById("main-content");
        if (liveGrid) paintMainGrid(liveGrid, posts);
      });
  }
  function assetUrl(path) {
    var v = String(path || "").trim();
    if (!v) return "";
    if (/^(?:[a-z][a-z0-9+.\-]*:)?\/\//i.test(v) || /^(data|blob):/i.test(v)) return v;
    if (v.indexOf("/") === 0 || v.indexOf("../") === 0 || v.indexOf("./") === 0) return v;
    if (v.indexOf("assets/") === 0) {
      var local = v.replace(/^assets\//, "");
      return window.picjejuAsset ? window.picjejuAsset(local) : "/assets/" + local;
    }
    return window.picjejuAsset ? window.picjejuAsset(v) : "/" + v;
  }
  function escapeHtml(s) { return String(s || "").replace(/[&<>"]/g, function (c) { return ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" })[c]; }); }
  function badgeColor(badge) {
    var map = { "전시":"category--exhibit", "공연":"category--show", "공연/홍보":"category--show", "축제/이벤트":"category--festival", "체험":"category--exp", "마켓":"category--market", "체험/교육":"category--edu" };
    return map[badge] || "category--neutral";
  }
  function swiperReady() { return typeof window.Swiper === "function"; }
  function paintMainGrid(grid, posts) {
    var detailPath = grid.getAttribute("data-detail-path") || "single-view.html";
    var detailUrl = window.picjejuPage ? window.picjejuPage(detailPath) : detailPath;

    // Take first 3 lg posts (or any first 3) as hero slides.
    var lgPosts = posts.filter(function (p) { return (p.size || p[3]) === "lg"; });
    var heroPosts = (lgPosts.length >= 3 ? lgPosts : posts.slice(0, 3)).slice(0, 5);
    // Sectional slices for horizontal carousels.
    var trending = posts.filter(function (p, i) { return i % 3 === 1; }).slice(0, 8);
    var newCards = posts.slice(0, 12);
    var festivals = posts.filter(function (p) { var b = p.badge||p[1]||""; return /축제|이벤트|공연/.test(b); }).slice(0, 8);
    if (festivals.length < 4) festivals = posts.slice(0, 8);

    function cardHtml(post, opts) {
      opts = opts || {};
      var thumb = post.thumb || post[0] || "";
      var badge = post.badge || post[1] || "";
      var title = post.title || post[2] || "";
      var cls = "pj-card-tile" + (opts.mini ? " pj-card-tile--mini" : "");
      return '<a class="' + cls + '" href="' + detailUrl + '">'
        + '<div class="pj-card-tile__thumb"><img src="' + assetUrl(thumb) + '" alt="" loading="lazy"></div>'
        + '<div class="pj-card-tile__body">'
        +   (badge ? '<span class="pj-card-tile__badge ' + badgeColor(badge) + '">' + escapeHtml(badge) + '</span>' : '')
        +   '<p class="pj-card-tile__title">' + escapeHtml(title).replace(/\n/g, "<br>") + '</p>'
        + '</div></a>';
    }
    function heroSlideHtml(post) {
      var thumb = post.thumb || post[0] || "";
      var badge = post.badge || post[1] || "";
      var title = post.title || post[2] || "";
      return '<div class="swiper-slide pj-hero-slide" data-pj-hero-slide>'
        + '<div class="pj-hero-slide__media"><img src="' + assetUrl(thumb) + '" alt="" /></div>'
        + '<div class="pj-hero-slide__overlay"></div>'
        + '<div class="pj-hero-slide__caption">'
        +   '<span class="pj-hero-slide__badge ' + badgeColor(badge) + '">' + escapeHtml(badge || "PICK") + '</span>'
        +   '<h2 class="pj-hero-slide__title">' + escapeHtml(title).replace(/\n/g, "<br>") + '</h2>'
        +   '<a class="pj-hero-slide__cta" href="' + detailUrl + '">자세히 보기 <span aria-hidden="true">→</span></a>'
        + '</div>'
        + '</div>';
    }
    function sectionSwiperHtml(opts, items) {
      return '<section class="pj-section" data-aos="fade-up" data-aos-duration="600">'
        + '<header class="pj-section__head">'
        +   '<div><p class="pj-section__kicker">' + escapeHtml(opts.kicker) + '</p>'
        +   '<h3 class="pj-section__title">' + escapeHtml(opts.title) + '</h3></div>'
        +   (opts.moreHref ? '<a class="pj-section__more" href="' + opts.moreHref + '">' + (opts.moreLabel || '더보기') + ' →</a>' : '')
        + '</header>'
        + '<div class="swiper pj-section__swiper" data-pj-swiper="' + opts.preset + '">'
        +   '<div class="swiper-wrapper">'
        +     items.map(function (p) { return '<div class="swiper-slide">' + cardHtml(p) + '</div>'; }).join("")
        +   '</div>'
        + '</div>'
        + '</section>';
    }

    function categoryRowHtml() {
      var cats = [
        { label: "공연/축제", icon: "🎪", href: "/event" },
        { label: "커뮤니티", icon: "💬", href: "/community" },
        { label: "픽제주몰", icon: "🛍️", href: "/store" },
        { label: "이벤트", icon: "🎁", href: "/community-event" },
        { label: "친구들", icon: "👋", href: "/community-friends" },
        { label: "꿀팁", icon: "💡", href: "/community-tip" },
        { label: "장터", icon: "🤝", href: "/board-market" },
        { label: "거래소", icon: "🪙", href: "/point-exchange" }
      ];
      return '<nav class="pj-category-rail" aria-label="카테고리 바로가기">'
        + '<ul>'
        + cats.map(function (c) {
            return '<li><a class="pj-category-rail__item" href="' + c.href + '"><span class="pj-category-rail__icon" aria-hidden="true">' + c.icon + '</span><span class="pj-category-rail__label">' + c.label + '</span></a></li>';
          }).join("")
        + '</ul>'
        + '</nav>';
    }

    function bentoGridHtml(items) {
      return '<section class="pj-bento" data-aos="fade-up" data-aos-duration="600">'
        + '<header class="pj-section__head">'
        +   '<div><p class="pj-section__kicker">RECENT</p>'
        +   '<h3 class="pj-section__title">새로 올라온 픽</h3></div>'
        + '</header>'
        + '<div class="pj-bento__grid">'
        +   items.map(function (p, i) {
              var size = (p.size || p[3] || "") === "lg" ? " pj-bento__item--lg" : "";
              return '<a class="pj-bento__item' + size + '" href="' + detailUrl + '" data-aos="fade-up" data-aos-delay="' + ((i % 6) * 40) + '" data-aos-duration="500">'
                + '<div class="pj-bento__thumb"><img src="' + assetUrl(p.thumb||p[0]) + '" alt="" loading="lazy"></div>'
                + '<div class="pj-bento__overlay"></div>'
                + '<div class="pj-bento__caption">'
                +   '<span class="pj-bento__badge ' + badgeColor(p.badge||p[1]) + '">' + escapeHtml(p.badge||p[1]||"PICK") + '</span>'
                +   '<span class="pj-bento__title">' + escapeHtml(p.title||p[2]||"").replace(/\n/g, " ") + '</span>'
                + '</div>'
                + '</a>';
            }).join("")
        + '</div>'
        + '</section>';
    }

    // ---- Compose the new index layout (target = parent of #main-content) ----
    var host = grid.parentElement && grid.parentElement.classList.contains("pj-main-container")
      ? grid.parentElement
      : grid;

    var heroHtml = '<section class="pj-hero" data-pj-hero>'
      + '<div class="swiper pj-hero__swiper" data-pj-swiper="hero">'
      +   '<div class="swiper-wrapper">' + heroPosts.map(heroSlideHtml).join("") + '</div>'
      +   '<div class="pj-hero__pagination swiper-pagination"></div>'
      +   '<button class="pj-hero__nav pj-hero__nav--prev" type="button" aria-label="이전 슬라이드"><span aria-hidden="true">‹</span></button>'
      +   '<button class="pj-hero__nav pj-hero__nav--next" type="button" aria-label="다음 슬라이드"><span aria-hidden="true">›</span></button>'
      + '</div>'
      + '</section>';

    host.innerHTML = heroHtml
      + categoryRowHtml()
      + sectionSwiperHtml({ kicker: "TRENDING", title: "이번 주 픽", moreHref: "/community", preset: "cards-3" }, trending)
      + bentoGridHtml(newCards)
      + sectionSwiperHtml({ kicker: "FESTIVAL", title: "지금 진행 중인 이벤트", moreHref: "/event", preset: "cards-2" }, festivals)
      + sectionSwiperHtml({ kicker: "COMMUNITY", title: "제주 살이 픽", moreHref: "/community-tip", preset: "cards-4" }, posts.slice(0, 10));

    initIndexInteractions(host);
    if (window.AOS && typeof window.AOS.refresh === "function") window.AOS.refresh();
  }

  function initIndexInteractions(root) {
    // Swipers
    if (!swiperReady()) return;
    var heroEl = root.querySelector('.pj-hero__swiper');
    if (heroEl && !heroEl.dataset.pjInit) {
      heroEl.dataset.pjInit = "1";
      new window.Swiper(heroEl, {
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true },
        speed: 700,
        effect: "fade",
        fadeEffect: { crossFade: true },
        pagination: { el: heroEl.querySelector('.pj-hero__pagination'), clickable: true },
        navigation: {
          prevEl: root.querySelector('.pj-hero__nav--prev'),
          nextEl: root.querySelector('.pj-hero__nav--next')
        }
      });
    }
    root.querySelectorAll('[data-pj-swiper]').forEach(function (el) {
      if (el.dataset.pjInit || el.classList.contains('pj-hero__swiper')) return;
      el.dataset.pjInit = "1";
      var preset = el.getAttribute('data-pj-swiper');
      var opts = {
        slidesPerView: 1.2, spaceBetween: 12,
        breakpoints: {
          480: { slidesPerView: 2.1, spaceBetween: 14 },
          720: { slidesPerView: 3.1, spaceBetween: 16 },
          1024:{ slidesPerView: 4,   spaceBetween: 18 }
        }
      };
      if (preset === "cards-2") {
        opts.breakpoints = { 480: { slidesPerView: 1.5, spaceBetween: 14 }, 720: { slidesPerView: 2, spaceBetween: 16 }, 1024:{ slidesPerView: 2, spaceBetween: 20 } };
      } else if (preset === "cards-3") {
        opts.breakpoints = { 480: { slidesPerView: 2.1, spaceBetween: 14 }, 720: { slidesPerView: 3, spaceBetween: 16 }, 1024:{ slidesPerView: 3, spaceBetween: 18 } };
      } else if (preset === "cards-4") {
        opts.breakpoints = { 480: { slidesPerView: 2.2, spaceBetween: 12 }, 720: { slidesPerView: 3, spaceBetween: 14 }, 1024:{ slidesPerView: 4, spaceBetween: 16 } };
      }
      new window.Swiper(el, opts);
    });

    // Hero parallax via GSAP ScrollTrigger if available
    if (window.gsap && window.ScrollTrigger) {
      try {
        window.gsap.registerPlugin(window.ScrollTrigger);
        window.gsap.utils.toArray('.pj-hero-slide__media img').forEach(function (img) {
          window.gsap.to(img, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: { trigger: img.closest('.pj-hero'), start: "top top", end: "bottom top", scrub: true }
          });
        });
        window.gsap.utils.toArray('.pj-hero-slide__caption').forEach(function (cap) {
          window.gsap.to(cap, {
            yPercent: -20, opacity: 0.3, ease: "none",
            scrollTrigger: { trigger: cap.closest('.pj-hero'), start: "top top", end: "bottom top", scrub: true }
          });
        });
      } catch (e) { /* swallow */ }
    }
  }

  function watchMainGrid() {
    bootstrapMainGrid();
    bindProductGallery();
    enhanceListingPages();
    bindStickyRail();
    var tries = 0;
    var t = setInterval(function () {
      tries += 1;
      bootstrapMainGrid();
      bindProductGallery();
      enhanceListingPages();
      bindStickyRail();
      if (tries > 100) clearInterval(t);
    }, 100);
  }

  // 5. Universal scroll progress bar — thin top indicator on every page.
  function ensureScrollProgress() {
    if (document.getElementById("pj-scroll-progress")) return;
    var bar = document.createElement("div");
    bar.id = "pj-scroll-progress";
    bar.setAttribute("role", "progressbar");
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var raf = 0;
    function update() {
      raf = 0;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      bar.style.setProperty("--pj-progress", pct + "%");
    }
    function onScroll() { if (!raf) raf = requestAnimationFrame(update); }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  // 6. Product detail gallery — main Swiper + click-based thumb syncing.
  function bindProductGallery() {
    if (!swiperReady()) return;
    var main = document.querySelector(".gallery .gallery-main");
    if (!main || main.dataset.pjInit) return;
    // Skip if legacy detail.js already initialized the same swiper.
    if (main.classList.contains("swiper-initialized")) {
      main.dataset.pjInit = "1";
      return;
    }
    // Wait until container has a sensible width — Swiper can compute slide widths
    // as Infinity if it initializes while the parent is collapsed.
    var w = main.getBoundingClientRect().width;
    if (!w || w < 80) return;
    main.dataset.pjInit = "1";
    var thumbItems = document.querySelectorAll(".gallery-thumbs .thumb-grid .item");
    function syncThumbActive(idx) {
      if (!thumbItems || !thumbItems.forEach) return;
      thumbItems.forEach(function (el, i) { el.classList.toggle("is-active", i === idx); });
    }
    var inst = new window.Swiper(main, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      keyboard: { enabled: true },
      effect: "fade",
      fadeEffect: { crossFade: true },
      on: {
        slideChange: function () {
          var indicator = main.querySelector(".page-indicator");
          if (indicator) indicator.textContent = (this.realIndex + 1) + "/" + this.slides.length;
          syncThumbActive(this.realIndex);
        }
      }
    });
    thumbItems.forEach(function (el, i) {
      el.addEventListener("click", function () { inst.slideToLoop(i); });
    });
    syncThumbActive(0);
    main.__pjSwiper = inst;
  }

  // 6a1. Design-system page — append a "PjComponents 사용 예시" section that
  //      demonstrates how to call the helpers (which themselves render ds-*
  //      markup). We do NOT duplicate component showcases — the existing ds-*
  //      sections already cover them.
  function injectComponentCatalog() {
    var path = (location.pathname.replace(/\.html$/, "").replace(/^\//, "")) || "";
    if (path !== "design-system" && path !== "pages/design-system") return;
    var host = document.querySelector(".ds-content, main");
    if (!host || host.dataset.pjCatalogInit) return;
    if (!window.PjComponents) return;
    host.dataset.pjCatalogInit = "1";

    var C = window.PjComponents;
    function pre(code) {
      return '<pre class="pj-catalog__code"><code>' + code.replace(/[&<>]/g, function (c) { return ({ "&":"&amp;","<":"&lt;",">":"&gt;" })[c]; }) + "</code></pre>";
    }
    function example(id, title, code, preview, note) {
      return ''
        + '<div class="pj-catalog__row" id="' + id + '">'
        +   '<header><h4>' + title + "</h4>" + (note ? '<p>' + note + "</p>" : "") + "</header>"
        +   '<div class="pj-catalog__preview">' + preview + "</div>"
        +   pre(code)
        + "</div>";
    }

    var section = document.createElement("section");
    section.className = "ds-section pj-catalog";
    section.id = "pj-components-usage";
    section.innerHTML =
      '<header class="ds-section__head">'
      +   '<div>'
      +     '<span class="ds-section__tag">UTILITIES</span>'
      +     '<h3 class="ds-section__title">PjComponents 사용 예시</h3>'
      +     '<p class="ds-section__desc">디자인 시스템의 ds-* 컴포넌트를 직접 마크업하지 않고 <code>window.PjComponents</code> 헬퍼로 생성합니다. ds-* 시스템에 없는 가격(<code>PriceBlock</code>)·별점(<code>Rating</code>)만 신규 패턴입니다.</p>'
      +   '</div>'
      + "</header>"
      + example("usage-pagination", "Pagination",
          'PjComponents.Pagination({ current: 3, total: 12 })',
          C.Pagination({ current: 3, total: 12 }),
          '내부적으로 .ds-pagination 마크업을 생성합니다.')
      + example("usage-empty", "EmptyState",
          'PjComponents.EmptyState({ icon: "cart", title: "장바구니가 비었어요", desc: "마음에 드는 상품을 담아 보세요.", action: { label: "스토어 가기", href: "/store" } })',
          C.EmptyState({ icon: "cart", title: "장바구니가 비었어요", desc: "마음에 드는 상품을 담아 보세요.", action: { label: "스토어 가기", href: "/store" } }),
          '.ds-empty / __icon / __title / __desc 구조 사용.')
      + example("usage-status", "StatusBadge",
          'PjComponents.StatusBadge({ status: "shipping" })',
          '<div style="display:flex;gap:6px;flex-wrap:wrap">' + C.StatusBadge({ status: "waiting" }) + C.StatusBadge({ status: "processing" }) + C.StatusBadge({ status: "shipping" }) + C.StatusBadge({ status: "done" }) + C.StatusBadge({ status: "cancelled" }) + C.StatusBadge({ status: "answered" }) + "</div>",
          '.ds-tag 톤 매핑으로 상태별 라벨 생성.')
      + example("usage-list-row", "ListRow",
          'PjComponents.ListRow({ href: "/board-view", category: { tone: "info", label: "제주뉴스" }, title: "한 달 후에 올게! 🎬", meta: { author: "물비늘", date: "2025.08.28", view: 9999, reply: 999 } })',
          '<div style="display:grid;gap:8px">' + C.ListRow({ href: "#", category: { tone: "warning", label: "공지" }, title: "필독 공지!", meta: { author: "관리자", date: "오늘", view: 999, reply: 12 } }) + C.ListRow({ href: "#", category: { tone: "info", label: "제주뉴스" }, title: "한 달 후에 올게! 🎬", meta: { author: "물비늘", date: "2025.08.28", view: 9999, reply: 999 } }) + "</div>",
          '.ds-board-row 구조로 게시판 행 생성.')
      + example("usage-toast", "Toast emitter",
          'PjComponents.toast({ tone: "success", text: "주문이 완료되었어요." })',
          '<div style="display:flex;gap:8px;flex-wrap:wrap">'
          + '<button class="pj-button pj-button--primary pj-button--sm" data-pj-demo-toast="success">성공</button>'
          + '<button class="pj-button pj-button--secondary pj-button--sm" data-pj-demo-toast="info">정보</button>'
          + '<button class="ds-button ds-button--outline ds-button--sm" data-pj-demo-toast="warning">경고</button>'
          + '<button class="ds-button ds-button--ghost ds-button--sm" data-pj-demo-toast="error">오류</button>'
          + "</div>",
          '런타임에 .ds-toast 마크업을 #pj-toast-container에 추가합니다.')
      + example("usage-price", "PriceBlock (신규)",
          'PjComponents.PriceBlock({ sale: 12900, origin: 19900, notice: "픽포인트 1,290P 적립" })',
          '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px">'
          + '<div style="background:var(--pj-color-light-1,#fff);padding:16px;border:1px solid var(--pj-color-guide-line,#e3e6ea);border-radius:12px">' + C.PriceBlock({ sale: 12900, origin: 19900, notice: "픽포인트 1,290P 적립" }) + "</div>"
          + '<div style="background:var(--pj-color-light-1,#fff);padding:16px;border:1px solid var(--pj-color-guide-line,#e3e6ea);border-radius:12px">' + C.PriceBlock({ sale: 35000, origin: 35000 }) + "</div>"
          + "</div>",
          'ds-* 시스템에 없는 e-커머스 전용 패턴.')
      + example("usage-rating", "Rating (신규)",
          'PjComponents.Rating({ score: 4.8, count: 1287 })',
          '<div style="display:flex;flex-direction:column;gap:6px">' + C.Rating({ score: 4.8, count: 1287 }) + C.Rating({ score: 3.2, count: 42 }) + "</div>",
          'ds-* 시스템에 없는 별점 표시.');

    host.appendChild(section);

    // Toast demo binding
    section.addEventListener("click", function (e) {
      var b = e.target.closest("[data-pj-demo-toast]");
      if (!b) return;
      var tone = b.getAttribute("data-pj-demo-toast");
      var msgs = { success: "저장되었어요.", info: "새 알림이 도착했어요.", warning: "입력값을 확인해 주세요.", error: "전송에 실패했어요." };
      C.toast({ tone: tone, text: msgs[tone] || "토스트 메시지" });
    });
  }

  // 6a2. Magazine card pair wrapper — community-tip etc. emit each card as TWO
  //      sibling DIVs (`<div>` body + `<div class="meta">`). Wrap each pair in
  //      a single `.pj-loop-card` so they become one grid cell.
  function wrapLoopCardPairs() {
    var loops = document.querySelectorAll(".loop");
    loops.forEach(function (loop) {
      if (loop.dataset.pjPaired) return;
      loop.dataset.pjPaired = "1";
      var children = Array.from(loop.children);
      for (var i = 0; i < children.length; i++) {
        var node = children[i];
        var next = node.nextElementSibling;
        if (
          node.tagName === "DIV" &&
          !node.classList.contains("meta") &&
          !node.classList.contains("pj-loop-card") &&
          next && next.classList.contains("meta")
        ) {
          var wrap = document.createElement("div");
          wrap.className = "pj-loop-card";
          loop.insertBefore(wrap, node);
          wrap.appendChild(node);
          wrap.appendChild(next);
        }
      }
    });
  }

  // 6b. Nav submenu populator — when a menu item is clicked/tapped, copy the
  //     corresponding hidden submenu into #global-sub-container.
  function bindNavSubmenus() {
    var nav = document.getElementById("main-nav");
    if (!nav || nav.dataset.pjSubInit) return;
    nav.dataset.pjSubInit = "1";
    var subStore = nav.querySelector("#hidden-submenus");
    var dest = nav.querySelector("#global-sub-container");
    if (!subStore || !dest) return;
    var items = nav.querySelectorAll(".panel-navigation .menu-item[data-sub]");
    items.forEach(function (li) {
      li.addEventListener("click", function (e) {
        // Only swap submenu, do not navigate when a sub menu exists.
        var subId = li.getAttribute("data-sub");
        var src = subStore.querySelector("#" + subId + " .sub-menu, #" + subId + " ul");
        if (src) {
          e.preventDefault();
          dest.innerHTML = "";
          dest.appendChild(src.cloneNode(true));
          items.forEach(function (x) { x.classList.toggle("is-active", x === li); });
        }
      });
      li.addEventListener("mouseenter", function () {
        var subId = li.getAttribute("data-sub");
        var src = subStore.querySelector("#" + subId + " .sub-menu, #" + subId + " ul");
        if (src) {
          dest.innerHTML = "";
          dest.appendChild(src.cloneNode(true));
          items.forEach(function (x) { x.classList.toggle("is-active", x === li); });
        }
      });
    });
    // Initialize with the first submenu visible by default for empty state.
    if (items[0] && !dest.children.length) {
      var subId = items[0].getAttribute("data-sub");
      var src = subStore.querySelector("#" + subId + " .sub-menu, #" + subId + " ul");
      if (src) {
        dest.appendChild(src.cloneNode(true));
        items[0].classList.add("is-active");
      }
    }
  }

  // 7. Listing density — auto-inject trending tags + recommended swiper.
  function enhanceListingPages() {
    var listing = document.querySelector("main .category-wrap");
    if (!listing) return;
    if (listing.dataset.pjEnhanced) return;
    listing.dataset.pjEnhanced = "1";

    var pageKey = (location.pathname.replace(/\.html$/, "").replace(/^\//, "")) || "index";
    var tagsByPage = {
      "board-news": ["제주뉴스","청년지원","제주일자리","공지","마감임박","핫이슈"],
      "board-market": ["중고","나눔","구매","판매","렌탈","교환"],
      "community": ["꿀팁","후기","질문","모임","번개","함께"],
      "community-event": ["이벤트","경품","무료","선착순","당첨","참여"],
      "community-tip": ["맛집","숙소","액티비티","교통","날씨","코스"],
      "community-friends": ["랜선친구","오프라인","번개","취미","러닝","서핑"],
      "event": ["축제","공연","전시","체험","마켓","교육"]
    };
    var tags = tagsByPage[pageKey];
    if (!tags) return;

    var titles = {
      "board-news": "지금 주목받는 키워드",
      "board-market": "인기 카테고리",
      "community": "오늘의 핫토픽",
      "community-event": "지금 진행 중",
      "community-tip": "이번 주 꿀팁",
      "community-friends": "함께할 친구 찾기",
      "event": "지금 핫한 행사"
    };

    var wrap = document.createElement("div");
    wrap.className = "pj-trending-tags";
    wrap.setAttribute("aria-label", "인기 태그");
    wrap.innerHTML = '<span class="pj-trending-tags__label">' + titles[pageKey] + '</span>'
      + tags.map(function (t) { return '<a href="?tag=' + encodeURIComponent(t) + '">' + t + '</a>'; }).join("");
    listing.parentNode.insertBefore(wrap, listing.nextSibling);
  }

  // 8 (pre-a). Magazine reading enhancements — inject engagement bar after the article body.
  function decorateArticleView() {
    var pageKey = (location.pathname.replace(/\.html$/, "").replace(/^\//, "")) || "";
    if (!/^(board-view|single-view)/.test(pageKey)) return;
    var main = document.querySelector("main");
    if (!main || main.dataset.pjArticleInit) return;
    main.dataset.pjArticleInit = "1";

    // Inject engagement bar before the related section (or at bottom of section)
    var section = main.querySelector("section");
    if (!section) return;
    var engage = document.createElement("div");
    engage.className = "article-engage";
    engage.setAttribute("role", "group");
    engage.setAttribute("aria-label", "기사 반응");
    engage.innerHTML =
      '<button class="article-engage__btn" data-pj-engage="like" type="button"><span aria-hidden="true">♡</span> <span>좋아요</span> <strong>32</strong></button>'
      + '<span class="article-engage__sep" aria-hidden="true"></span>'
      + '<button class="article-engage__btn" data-pj-engage="bookmark" type="button"><span aria-hidden="true">🔖</span> <span>저장</span></button>'
      + '<span class="article-engage__sep" aria-hidden="true"></span>'
      + '<button class="article-engage__btn" data-pj-engage="share" type="button"><span aria-hidden="true">↗</span> <span>공유</span></button>';
    section.appendChild(engage);

    engage.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-pj-engage]");
      if (!btn) return;
      var kind = btn.getAttribute("data-pj-engage");
      if (kind === "like") {
        var active = btn.classList.toggle("is-active");
        btn.querySelector("span[aria-hidden]").textContent = active ? "❤" : "♡";
        var c = btn.querySelector("strong");
        if (c) c.textContent = String(Math.max(0, parseInt(c.textContent || "0", 10) + (active ? 1 : -1)));
      } else if (kind === "bookmark") {
        btn.classList.toggle("is-active");
      } else if (kind === "share" && navigator.share) {
        navigator.share({ url: location.href, title: document.title }).catch(function () {});
      }
    });
  }

  // 8a. Register wizard — inject a step indicator above the legacy register form.
  function decorateRegisterWizard() {
    if (location.pathname.replace(/\.html$/, "").replace(/^\//, "") !== "register") return;
    var host = document.querySelector("main");
    if (!host || host.dataset.pjWizardInit) return;
    host.dataset.pjWizardInit = "1";
    var steps = ["약관 동의", "본인 인증", "계정 정보", "완료"];
    var current = 0;
    var wiz = document.createElement("div");
    wiz.className = "pj-wizard";
    wiz.setAttribute("aria-label", "회원가입 진행 단계");
    wiz.innerHTML =
      '<div class="pj-wizard__progress"><div class="pj-wizard__progress__fill" style="width:' + ((current + 1) / steps.length * 100) + '%"></div></div>'
      + '<ol class="pj-wizard__steps" role="list">'
      + steps.map(function (s, i) {
          var cls = "pj-wizard__step" + (i < current ? " is-done" : i === current ? " is-active" : "");
          var sep = i < steps.length - 1 ? '<span class="pj-wizard__sep" aria-hidden="true"></span>' : "";
          return '<li class="' + cls + '"><span class="pj-wizard__bullet"><span>' + (i + 1) + '</span></span><span class="pj-wizard__label">' + s + '</span></li>' + sep;
        }).join("")
      + '</ol>';
    host.insertBefore(wiz, host.firstChild);
  }

  // 8b. Sticky filter rail — toggle `.is-pinned` once the rail starts sticking.
  function bindStickyRail() {
    var rail = document.querySelector('.category-wrap');
    if (!rail || rail.dataset.pjPin) return;
    rail.dataset.pjPin = "1";
    var sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:-1px;height:1px;width:1px';
    var holder = rail.parentNode;
    if (holder) holder.insertBefore(sentinel, rail);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        rail.classList.toggle('is-pinned', !entries[0].isIntersecting);
      });
      io.observe(sentinel);
    }
  }

  function runAll() {
    highlightTabbar();
    ensureToastAria();
    ensureScrollProgress();
    watchMainGrid();
    bindStickyRail();
    bindProductGallery();
    enhanceListingPages();
    decorateRegisterWizard();
    decorateArticleView();
    bindNavSubmenus();
    wrapLoopCardPairs();
    injectComponentCatalog();
  }

  function withRetry(fn, intervalMs, maxTries) {
    if (fn()) return;
    var tries = 0;
    var t = setInterval(function () {
      tries += 1;
      if (fn() || tries >= maxTries) clearInterval(t);
    }, intervalMs);
  }

  function safeRunAll() {
    try { runAll(); window.__rs_ran = (window.__rs_ran || 0) + 1; }
    catch (e) { window.__rs_err = e.message + " @ " + (e.stack || "").split("\n")[1]; }
  }
  // Fire immediately AND on DOM ready, retry for a couple seconds.
  safeRunAll();
  document.addEventListener("DOMContentLoaded", safeRunAll, { once: true });
  window.addEventListener("load", safeRunAll, { once: true });
  withRetry(safeRunAll, 50, 60);
  window.addEventListener("pageshow", safeRunAll);
})();
