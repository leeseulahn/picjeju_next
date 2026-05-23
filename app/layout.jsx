import {
  PAGE_LOADER_HTML,
  HEADER_INNER_HTML,
  FOOTER_INNER_HTML,
  POST_FOOTER_HTML
} from "../src/lib/page-chrome";

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <link rel="stylesheet" href="/assets/css/design-system.css?v=20260520-select-svg" />
        <link rel="stylesheet" href="/assets/css/default.css" />
        {/* All legacy chrome/layout/component CSS removed — renewal.css is the single source of truth. store.css remains for cart/product-detail specifics. */}
        <link rel="stylesheet" href="/assets/css/store.css?v=20260514-figma-commerce-forms" />
        <link rel="stylesheet" href="/assets/vendor/pretendard/pretendard.min.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/vendor/remixicon/remixicon.css" />
        <link rel="stylesheet" href="/assets/css/flatpickr.min.css" />
        <link rel="stylesheet" href="https://uicdn.toast.com/editor/latest/toastui-editor.min.css" />
        <link rel="stylesheet" href="/assets/css/renewal.css?v=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var isPagesRoute = /^\\/pages(?:\\/|$)/.test(window.location.pathname);
                window.PICJEJU_ASSET_ROOT = isPagesRoute ? "../assets" : "assets";
                window.PICJEJU_PAGE_ROOT = isPagesRoute ? "." : "pages";
                window.picjejuAsset = function (path) {
                  return window.PICJEJU_ASSET_ROOT.replace(/\\/$/, '') + '/' + String(path || '').replace(/^\\//, '');
                };
                window.picjejuPage = function (path) {
                  return window.PICJEJU_PAGE_ROOT.replace(/\\/$/, '') + '/' + String(path || '').replace(/^\\//, '');
                };
              })();
            `
          }}
        />
        <script src="/assets/vendor/jquery/jquery-3.7.1.min.js" />
        <script src="/assets/vendor/gsap/gsap.min.js" />
        <script src="/assets/vendor/gsap/ScrollTrigger.min.js" />
        <script src="/assets/js/swiper-bundle.min.js" />
        <script src="/assets/js/aos-lite.js" defer />
        <script src="/assets/js/default.js" />
        <script src="/assets/js/board.js" />
        <script src="/assets/js/design-system.js?v=20260520-login-modal" />
        <script src="https://uicdn.toast.com/editor/latest/toastui-editor-all.min.js" defer />
        <script src="/assets/js/board-write.js?v=20260520-admin-write" defer />
        <script src="/assets/js/main-grid.js?v=2" defer />
        <script src="/assets/js/page-loader.js" defer />
        <script src="/assets/js/pj-components.js?v=3" defer />
        <script src="/assets/js/renewal-shell.js?v=26" defer />
      </head>
      <body className="is-logged-out pj-page-loading" suppressHydrationWarning>
        <a className="pj-skip-link" href="#pj-next-page">본문 바로가기</a>
        <div dangerouslySetInnerHTML={{ __html: PAGE_LOADER_HTML }} suppressHydrationWarning />
        <div id="wrap">
          <header dangerouslySetInnerHTML={{ __html: HEADER_INNER_HTML }} suppressHydrationWarning />
          {children}
          <footer dangerouslySetInnerHTML={{ __html: FOOTER_INNER_HTML }} suppressHydrationWarning />
        </div>
        <div dangerouslySetInnerHTML={{ __html: POST_FOOTER_HTML }} suppressHydrationWarning />
        <nav className="pj-tabbar" aria-label="주요 메뉴">
          <a className="pj-tabbar__item" href="/" data-pj-tab="home">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.2 3 11h2v8h5v-6h4v6h5v-8h2L12 3.2Z" /></svg>
            <span>홈</span>
          </a>
          <a className="pj-tabbar__item" href="/event" data-pj-tab="event">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2v2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3V2h-2v2H9V2H7Zm-2 8h14v9H5v-9Z" /></svg>
            <span>이벤트</span>
          </a>
          <a className="pj-tabbar__item" href="/community" data-pj-tab="community">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" /></svg>
            <span>커뮤니티</span>
          </a>
          <a className="pj-tabbar__item" href="/store" data-pj-tab="store">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5a1 1 0 0 0-1 1l-1 4v1a2 2 0 0 0 1 1.7V19a1 1 0 0 0 1 1h6v-6h2v6h6a1 1 0 0 0 1-1v-6.3A2 2 0 0 0 21 11v-1l-1-4a1 1 0 0 0-1-1H5Z" /></svg>
            <span>스토어</span>
          </a>
          <a className="pj-tabbar__item" href="/mypage" data-pj-tab="mypage">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-8 2-8 6v2h16v-2c0-4-4-6-8-6Z" /></svg>
            <span>마이</span>
          </a>
        </nav>
      </body>
    </html>
  );
}
