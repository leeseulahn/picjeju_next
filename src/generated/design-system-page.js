// Picjeju Design System showcase page content.
// Renders inside the shared header/footer chrome via app/[[...path]]/page.jsx.

const COLOR_BRAND = [
  { name: "Primary", token: "--pj-color-primary", hex: "#FF6633", text: "#ffffff" },
  { name: "Primary Dark", token: "--pj-color-primary-dark", hex: "#DD572B", text: "#ffffff" },
  { name: "Primary Light", token: "--pj-color-primary-light", hex: "#FFB299", text: "#222222" },
  { name: "Primary Tint", token: "--pj-color-primary-tint", hex: "rgba(255,102,51,.18)", text: "#222222" },
  { name: "Secondary", token: "--pj-color-secondary", hex: "#00CC66", text: "#ffffff" },
  { name: "Secondary Dark", token: "--pj-color-secondary-dark", hex: "#01BF60", text: "#ffffff" },
  { name: "Secondary Light", token: "--pj-color-secondary-light", hex: "#99EBC2", text: "#222222" },
  { name: "Secondary Vivid", token: "--pj-color-secondary-vivid", hex: "#00FF80", text: "#222222" }
];

const COLOR_NEUTRAL = [
  { name: "Dark 1", token: "--pj-color-dark-1", hex: "#222222", text: "#ffffff" },
  { name: "Dark 2", token: "--pj-color-dark-2", hex: "#8C8C8C", text: "#ffffff" },
  { name: "Dark 3", token: "--pj-color-dark-3", hex: "#BDBDBD", text: "#222222" },
  { name: "Dark 4", token: "--pj-color-dark-4", hex: "#E3E3E3", text: "#222222" },
  { name: "Light 1", token: "--pj-color-light-1", hex: "#FFFFFF", text: "#222222" },
  { name: "Light 2", token: "--pj-color-light-2", hex: "#F9F9F9", text: "#222222" },
  { name: "Guide BG", token: "--pj-color-guide-bg", hex: "#FAFAFC", text: "#222222" },
  { name: "Guide Line", token: "--pj-color-guide-line", hex: "#F2F2F5", text: "#222222" }
];

const COLOR_STATUS = [
  { name: "Error", token: "--pj-color-error", hex: "#FF3B3B", text: "#ffffff" },
  { name: "Warning", token: "--pj-color-warning", hex: "#FFCC00", text: "#222222" },
  { name: "Info", token: "--pj-color-info", hex: "#0063F7", text: "#ffffff" },
  { name: "Success", token: "--pj-color-success", hex: "#06C270", text: "#ffffff" }
];

const CATEGORY_GROUPS = [
  {
    label: "[공연/축제] 카테고리 컬러",
    items: [
      { name: "공연", hex: "#7538B5" },
      { name: "축제/이벤트", hex: "#DF3B67" },
      { name: "전시", hex: "#0089D2" },
      { name: "마켓", hex: "#0A9500" },
      { name: "체험/교육", hex: "#F99100" },
      { name: "청년프로그램", hex: "#0644B8" }
    ]
  },
  {
    label: "[제주살이뉴스] 카테고리 컬러",
    items: [
      { name: "제주뉴스", hex: "#3C4356" },
      { name: "청년지원", hex: "#0644B8" },
      { name: "제주일자리", hex: "#0A9500" }
    ]
  },
  {
    label: "[픽제주 장터] 카테고리 컬러",
    items: [
      { name: "재능나눔/클래스", hex: "#0644B8" },
      { name: "나눔", hex: "#0A9500" },
      { name: "판매", hex: "#F99100" }
    ]
  }
];

const TYPOGRAPHY = [
  { label: "Heading 1", className: "ds-type-h1", token: "--pj-text-h1", size: "42 → 46px", sample: "찐친 바이브, 제주살이" },
  { label: "Heading 2", className: "ds-type-h2", token: "--pj-text-h2", size: "30 → 34px", sample: "오늘의 제주 핫스팟" },
  { label: "Heading 3", className: "ds-type-h3", token: "--pj-text-h3", size: "26 → 30px", sample: "성산일출봉에서의 하루" },
  { label: "Heading 4", className: "ds-type-h4", token: "--pj-text-h4", size: "22 → 26px", sample: "이번 주 추천 장소" },
  { label: "Lead", className: "ds-type-lead", token: "--pj-text-lead", size: "19 → 21px", sample: "제주에서 살아본 사람만 아는 진짜 이야기를 전해드려요." },
  { label: "Body Large", className: "ds-type-body-lg", token: "--pj-text-body-lg", size: "17 → 19px", sample: "본문 큰 사이즈입니다. 가독성이 높아야 하는 본문에 사용해 주세요." },
  { label: "Body Medium", className: "ds-type-body-md", token: "--pj-text-body-md", size: "15 → 17px", sample: "본문 기본 사이즈입니다. 일반적인 텍스트에 사용합니다." },
  { label: "Body Small", className: "ds-type-body-sm", token: "--pj-text-body-sm", size: "13 → 15px", sample: "보조 설명이나 작은 본문에 사용합니다." },
  { label: "Caption", className: "ds-type-caption", token: "--pj-text-caption", size: "12 → 13px", sample: "이미지 캡션, 보조 메타 텍스트에 사용합니다." }
];

const SPACING = [
  { token: "--pj-space-1", value: "0.25rem" },
  { token: "--pj-space-2", value: "0.5rem" },
  { token: "--pj-space-3", value: "1rem" },
  { token: "--pj-space-4", value: "1.5rem" },
  { token: "--pj-space-5", value: "2rem" },
  { token: "--pj-space-6", value: "3rem" },
  { token: "--pj-space-7", value: "4rem" },
  { token: "--pj-space-8", value: "4.5rem" }
];

const RADIUS = [
  { token: "--pj-radius-xs", value: "4px" },
  { token: "--pj-radius-sm", value: "8px" },
  { token: "--pj-radius-md", value: "10px" },
  { token: "--pj-radius-lg", value: "15px" },
  { token: "--pj-radius-xl", value: "30px" },
  { token: "--pj-radius-pill", value: "999px" }
];

const SHADOWS = [
  { token: "--pj-shadow-sm", value: "0 6px 18px rgba(18,19,26,.08)" },
  { token: "--pj-shadow-md", value: "4px 8px 24px rgba(242,242,245,.95)" },
  { token: "--pj-focus-ring", value: "0 0 0 4px rgba(255,102,51,.22)" }
];

const SAMPLE_ICONS = [
  "ri-home-5-line",
  "ri-search-line",
  "ri-heart-line",
  "ri-bookmark-line",
  "ri-user-line",
  "ri-notification-3-line",
  "ri-chat-3-line",
  "ri-map-pin-line",
  "ri-calendar-event-line",
  "ri-image-line",
  "ri-camera-line",
  "ri-gift-line",
  "ri-shopping-bag-line",
  "ri-share-line",
  "ri-arrow-right-line",
  "ri-arrow-left-line",
  "ri-arrow-up-line",
  "ri-arrow-down-line",
  "ri-add-line",
  "ri-close-line",
  "ri-check-line",
  "ri-information-line",
  "ri-error-warning-line",
  "ri-settings-3-line"
];

const STYLES = `
<style>
  .ds-page { background: var(--pj-color-guide-bg); color: var(--pj-color-dark-1); padding: 56px 0 96px; }
  .ds-page * { box-sizing: border-box; }
  .ds-page .ds-container { max-width: 1240px; margin: 0 auto; padding: 0 24px; }

  .ds-hero { padding: 40px 0 32px; }
  .ds-hero__kicker { display: inline-block; padding: 6px 12px; border-radius: 999px; background: var(--pj-color-primary-tint); color: var(--pj-color-primary-dark); font-size: 13px; font-weight: 700; letter-spacing: 0.02em; }
  .ds-hero__title { margin: 14px 0 12px; font-size: clamp(34px, 4vw, 48px); font-weight: 800; line-height: 1.15; letter-spacing: -0.01em; }
  .ds-hero__desc { max-width: 720px; color: var(--pj-color-dark-2); font-size: 17px; line-height: 1.6; }
  .ds-hero__meta { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .ds-hero__meta span { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); font-size: 13px; color: var(--pj-color-dark-2); font-weight: 600; }

  .ds-layout { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 40px; margin-top: 32px; align-items: start; }
  .ds-toc { position: sticky; top: 96px; padding: 18px; border-radius: 18px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); }
  .ds-toc__title { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; color: var(--pj-color-dark-2); text-transform: uppercase; margin: 0 0 12px; }
  .ds-toc__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
  .ds-toc__list a { display: block; padding: 8px 10px; border-radius: 8px; color: var(--pj-color-dark-1); text-decoration: none; font-size: 14px; font-weight: 600; transition: background .15s ease, color .15s ease; }
  .ds-toc__list a:hover { background: var(--pj-color-guide-bg); color: var(--pj-color-primary); }
  .ds-toc__group { margin-top: 14px; }
  .ds-toc__group:first-child { margin-top: 0; }
  .ds-toc__group-label { font-size: 11px; font-weight: 800; letter-spacing: 0.08em; color: var(--pj-color-dark-2); text-transform: uppercase; padding: 6px 10px; }

  .ds-section { padding: 36px 32px; border-radius: 22px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); margin-bottom: 24px; }
  .ds-section__head { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 1px dashed var(--pj-color-guide-line); }
  .ds-section__title { margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.01em; }
  .ds-section__desc { margin: 8px 0 0; color: var(--pj-color-dark-2); font-size: 14px; line-height: 1.6; }
  .ds-section__tag { padding: 4px 10px; border-radius: 999px; background: var(--pj-color-guide-bg); color: var(--pj-color-dark-2); font-size: 12px; font-weight: 700; letter-spacing: 0.04em; }

  .ds-sub { margin: 28px 0 12px; font-size: 15px; font-weight: 700; color: var(--pj-color-dark-1); display: inline-flex; align-items: center; gap: 8px; }
  .ds-sub::before { content: ""; display: inline-block; width: 4px; height: 14px; border-radius: 2px; background: var(--pj-color-primary); }
  .ds-sub:first-child { margin-top: 0; }

  .ds-color-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px; }
  .ds-color { border-radius: 14px; overflow: hidden; border: 1px solid var(--pj-color-guide-line); background: #ffffff; }
  .ds-color__swatch { height: 88px; display: flex; align-items: flex-end; justify-content: flex-end; padding: 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; }
  .ds-color__meta { padding: 12px 14px 14px; }
  .ds-color__name { font-size: 13px; font-weight: 700; color: var(--pj-color-dark-1); }
  .ds-color__hex { font-size: 12px; color: var(--pj-color-dark-2); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
  .ds-color__token { font-size: 11px; color: var(--pj-color-dark-2); font-family: ui-monospace, SFMono-Regular, Menlo, monospace; margin-top: 4px; word-break: break-all; }

  .ds-type-row { display: grid; grid-template-columns: 1fr 220px; align-items: center; gap: 20px; padding: 18px 0; border-top: 1px solid var(--pj-color-guide-line); }
  .ds-type-row:first-of-type { border-top: 0; padding-top: 0; }
  .ds-type-row__meta { color: var(--pj-color-dark-2); font-size: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; text-align: right; }
  .ds-type-row__meta strong { display: block; color: var(--pj-color-dark-1); font-family: inherit; font-size: 13px; font-weight: 700; margin-bottom: 2px; }
  .ds-type-h1 { font-size: var(--pj-text-h1); font-weight: 800; line-height: 1.15; }
  .ds-type-h2 { font-size: var(--pj-text-h2); font-weight: 800; line-height: 1.2; }
  .ds-type-h3 { font-size: var(--pj-text-h3); font-weight: 700; line-height: 1.25; }
  .ds-type-h4 { font-size: var(--pj-text-h4); font-weight: 700; line-height: 1.3; }
  .ds-type-lead { font-size: var(--pj-text-lead); font-weight: 500; line-height: 1.45; color: var(--pj-color-dark-1); }
  .ds-type-body-lg { font-size: var(--pj-text-body-lg); line-height: 1.55; }
  .ds-type-body-md { font-size: var(--pj-text-body-md); line-height: 1.55; }
  .ds-type-body-sm { font-size: var(--pj-text-body-sm); line-height: 1.5; color: var(--pj-color-dark-2); }
  .ds-type-caption { font-size: var(--pj-text-caption); line-height: 1.4; color: var(--pj-color-dark-2); }

  .ds-space-grid { display: grid; gap: 12px; }
  .ds-space-row { display: grid; grid-template-columns: 140px 1fr 80px; align-items: center; gap: 16px; padding: 6px 0; }
  .ds-space-row code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-space-bar { height: 14px; border-radius: 999px; background: linear-gradient(90deg, var(--pj-color-primary), var(--pj-color-primary-light)); }
  .ds-space-row span:last-child { font-size: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--pj-color-dark-1); font-weight: 600; }

  .ds-radius-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
  .ds-radius { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 18px 10px; border: 1px solid var(--pj-color-guide-line); background: var(--pj-color-light-2); }
  .ds-radius__box { width: 78px; height: 78px; background: var(--pj-color-primary-tint); border: 2px solid var(--pj-color-primary); }
  .ds-radius code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: var(--pj-color-dark-2); text-align: center; word-break: break-all; }
  .ds-radius strong { font-size: 12px; font-weight: 700; color: var(--pj-color-dark-1); }

  .ds-shadow-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px; }
  .ds-shadow { padding: 22px; border-radius: 16px; background: #ffffff; text-align: center; }
  .ds-shadow code { display: block; margin-top: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; color: var(--pj-color-dark-2); word-break: break-all; }

  .ds-preview { padding: 20px; border-radius: 14px; background: var(--pj-color-guide-bg); border: 1px dashed var(--pj-color-guide-line); }
  .ds-preview + .ds-preview { margin-top: 14px; }
  .ds-row-gap { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }

  .ds-form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; }
  .ds-form-grid label.pj-label { display: block; margin-bottom: 6px; font-weight: 700; font-size: 13px; }

  .ds-card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }
  .ds-card-demo { border-radius: 18px; overflow: hidden; background: #ffffff; border: 1px solid var(--pj-color-guide-line); display: flex; flex-direction: column; }
  .ds-card-demo__img { aspect-ratio: 16/10; background: linear-gradient(135deg, var(--pj-color-primary-light), var(--pj-color-primary)); display: flex; align-items: flex-end; padding: 14px; }
  .ds-card-demo__img .ds-tag { background: rgba(255,255,255,.85); color: var(--pj-color-primary-dark); padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
  .ds-card-demo__body { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 8px; }
  .ds-card-demo__title { font-size: 16px; font-weight: 700; line-height: 1.35; }
  .ds-card-demo__meta { font-size: 12px; color: var(--pj-color-dark-2); }

  .ds-icon-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; }
  .ds-icon { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 18px 6px; border: 1px solid var(--pj-color-guide-line); border-radius: 14px; background: #ffffff; }
  .ds-icon i { font-size: 24px; color: var(--pj-color-dark-1); }
  .ds-icon code { font-size: 11px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--pj-color-dark-2); text-align: center; word-break: break-all; }

  .ds-badge-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }

  .ds-cat-group { background: var(--pj-color-light-2); border: 1px solid var(--pj-color-guide-line); border-radius: 14px; padding: 22px 24px; margin-top: 14px; }
  .ds-cat-group__label { display: block; font-size: 15px; font-weight: 800; color: var(--pj-color-dark-1); margin-bottom: 14px; letter-spacing: -0.01em; }
  .ds-cat-row { display: flex; flex-wrap: nowrap; gap: 2px; }
  .ds-cat-tile { flex: 0 0 130px; min-height: 124px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; padding: 14px 8px; color: #ffffff; text-align: center; }
  .ds-cat-tile__name { font-size: 14px; font-weight: 600; line-height: 1.35; }
  .ds-cat-tile__hex { font-size: 13px; font-weight: 500; line-height: 1.3; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; opacity: 0.95; }
  @media (max-width: 720px) {
    .ds-cat-row { flex-wrap: wrap; gap: 1px; overflow-x: visible; }
    .ds-cat-tile { flex: 1 1 calc(50% - 1px); min-height: 100px; }
  }

  .ds-pagination { display: inline-flex; gap: 4px; }
  .ds-pagination a { display: inline-flex; align-items: center; justify-content: center; min-width: 36px; height: 36px; padding: 0 10px; border-radius: 10px; background: var(--pj-color-guide-bg); color: var(--pj-color-dark-1); text-decoration: none; font-size: 13px; font-weight: 600; border: 1px solid transparent; }
  .ds-pagination a.is-active { background: var(--pj-color-primary); color: #ffffff; }
  .ds-pagination a:hover:not(.is-active) { background: var(--pj-color-light-2); border-color: var(--pj-color-guide-line); }

  .ds-table { width: 100%; border-collapse: separate; border-spacing: 0; font-size: 14px; }
  .ds-table th, .ds-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--pj-color-guide-line); }
  .ds-table th { background: var(--pj-color-guide-bg); font-weight: 700; font-size: 13px; color: var(--pj-color-dark-2); }
  .ds-table tr:last-child td { border-bottom: 0; }

  .ds-alert { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; border-radius: 12px; font-size: 14px; line-height: 1.5; }
  .ds-alert i { font-size: 20px; flex-shrink: 0; margin-top: 1px; }
  .ds-alert--info { background: #eef4ff; color: #1742a6; }
  .ds-alert--success { background: #e6faef; color: #036a3e; }
  .ds-alert--warning { background: #fff6dc; color: #7a5b00; }
  .ds-alert--error { background: #ffeaea; color: #b3201b; }

  .ds-toggle-row { display: flex; align-items: center; gap: 12px; }
  .ds-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
  .ds-switch input { opacity: 0; width: 0; height: 0; }
  .ds-switch .ds-slider { position: absolute; inset: 0; background: var(--pj-color-dark-4); border-radius: 999px; transition: background .2s ease; cursor: pointer; }
  .ds-switch .ds-slider::before { content: ""; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; background: #ffffff; border-radius: 50%; transition: transform .2s ease; box-shadow: 0 2px 6px rgba(0,0,0,.15); }
  .ds-switch input:checked + .ds-slider { background: var(--pj-color-primary); }
  .ds-switch input:checked + .ds-slider::before { transform: translateX(20px); }

  @media (max-width: 960px) {
    .ds-layout { grid-template-columns: 1fr; }
    .ds-toc { position: static; }
    .ds-section { padding: 24px 18px; }
    .ds-type-row { grid-template-columns: 1fr; }
    .ds-type-row__meta { text-align: left; }
  }
</style>
`;

function renderColorCard({ name, token, hex, text = "#ffffff" }) {
  const swatchStyle = `background:${hex};color:${text};`;
  return `
    <div class="ds-color">
      <div class="ds-color__swatch" style="${swatchStyle}">${hex.toUpperCase()}</div>
      <div class="ds-color__meta">
        <div class="ds-color__name">${name}</div>
        <div class="ds-color__hex">${hex}</div>
        <div class="ds-color__token">${token}</div>
      </div>
    </div>`;
}

function renderTypographyRow({ label, className, token, size, sample }) {
  return `
    <div class="ds-type-row">
      <div class="${className}">${sample}</div>
      <div class="ds-type-row__meta">
        <strong>${label}</strong>
        ${size}<br>
        <code>${token}</code>
      </div>
    </div>`;
}

function renderSpaceRow({ token, value }) {
  return `
    <div class="ds-space-row">
      <code>${token}</code>
      <div class="ds-space-bar" style="width:${value};"></div>
      <span>${value}</span>
    </div>`;
}

function renderRadius({ token, value }) {
  return `
    <div class="ds-radius">
      <div class="ds-radius__box" style="border-radius:${value};"></div>
      <strong>${value}</strong>
      <code>${token}</code>
    </div>`;
}

function renderShadow({ token, value }) {
  return `
    <div class="ds-shadow" style="box-shadow:${value};">
      <strong>${token.replace("--pj-", "")}</strong>
      <code>${value}</code>
    </div>`;
}

function renderIcon(name) {
  return `
    <div class="ds-icon">
      <i class="${name}" aria-hidden="true"></i>
      <code>${name}</code>
    </div>`;
}

function renderCategoryGroup({ label, items }) {
  const tiles = items
    .map(
      ({ name, hex }) => `
      <div class="ds-cat-tile" style="background:${hex};">
        <span class="ds-cat-tile__name">${name}</span>
        <span class="ds-cat-tile__hex">${hex}</span>
      </div>`
    )
    .join("");
  return `
    <div class="ds-cat-group">
      <span class="ds-cat-group__label">${label}</span>
      <div class="ds-cat-row">${tiles}</div>
    </div>`;
}

export function buildDesignSystemMain() {
  const colorBrand = COLOR_BRAND.map(renderColorCard).join("");
  const colorNeutral = COLOR_NEUTRAL.map(renderColorCard).join("");
  const colorStatus = COLOR_STATUS.map(renderColorCard).join("");
  const typography = TYPOGRAPHY.map(renderTypographyRow).join("");
  const spacing = SPACING.map(renderSpaceRow).join("");
  const radius = RADIUS.map(renderRadius).join("");
  const shadows = SHADOWS.map(renderShadow).join("");
  const icons = SAMPLE_ICONS.map(renderIcon).join("");
  const categoryGroups = CATEGORY_GROUPS.map(renderCategoryGroup).join("");

  return `
${STYLES}
<main class="ds-page">
  <div class="ds-container">

    <header class="ds-hero">
      <span class="ds-hero__kicker">PICJEJU DESIGN SYSTEM</span>
      <h1 class="ds-hero__title">픽제주 디자인 시스템</h1>
      <p class="ds-hero__desc">
        픽제주 서비스에서 사용하는 색상, 타이포그래피, 컴포넌트와 인터랙션 패턴을
        한 곳에 모았습니다. 일관된 사용자 경험과 빠른 디자인-개발 협업을 위한
        싱글 소스 오브 트루스로 활용해 주세요.
      </p>
      <div class="ds-hero__meta">
        <span>Version 1.0</span>
        <span>Pretendard Variable</span>
        <span>Mobile-first</span>
        <span>WCAG 2.1 AA</span>
      </div>
    </header>

    <div class="ds-layout">
      <aside class="ds-toc" aria-label="디자인 시스템 목차">
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Foundation</div>
          <ul class="ds-toc__list">
            <li><a href="#colors">Colors</a></li>
            <li><a href="#category-filter">Category Filter</a></li>
            <li><a href="#typography">Typography</a></li>
            <li><a href="#spacing">Spacing</a></li>
            <li><a href="#radius">Radius</a></li>
            <li><a href="#shadow">Shadow</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Components</div>
          <ul class="ds-toc__list">
            <li><a href="#buttons">Buttons</a></li>
            <li><a href="#forms">Forms</a></li>
            <li><a href="#cards">Cards</a></li>
            <li><a href="#badges">Badges</a></li>
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#table">Table</a></li>
            <li><a href="#pagination">Pagination</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Assets</div>
          <ul class="ds-toc__list">
            <li><a href="#icons">Icons</a></li>
          </ul>
        </div>
      </aside>

      <div class="ds-content">

        <section class="ds-section" id="colors">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Colors</h2>
              <p class="ds-section__desc">브랜드 컬러 팔레트와 시멘틱 컬러, 카테고리 컬러 토큰입니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>

          <div class="ds-sub">Brand</div>
          <div class="ds-color-grid">${colorBrand}</div>

          <div class="ds-sub">Neutral</div>
          <div class="ds-color-grid">${colorNeutral}</div>

          <div class="ds-sub">Status</div>
          <div class="ds-color-grid">${colorStatus}</div>

        </section>

        <section class="ds-section" id="category-filter">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Category Filter</h2>
              <p class="ds-section__desc">게시판/필터에서 카테고리를 구분하기 위한 컬러 시스템입니다. 콘텐츠 영역별로 분리된 팔레트를 사용해 주세요.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          ${categoryGroups}</section>

        <section class="ds-section" id="typography">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Typography</h2>
              <p class="ds-section__desc">Pretendard Variable 기반 반응형 타입 스케일입니다. 모든 사이즈는 뷰포트에 따라 자동 보간됩니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          ${typography}
        </section>

        <section class="ds-section" id="spacing">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Spacing</h2>
              <p class="ds-section__desc">컴포넌트 간 간격과 내부 패딩에 사용하는 기본 스페이싱 토큰입니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-space-grid">${spacing}</div>
        </section>

        <section class="ds-section" id="radius">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Border Radius</h2>
              <p class="ds-section__desc">버튼, 카드, 모달 등에서 사용하는 라운드 코너 단계입니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-radius-grid">${radius}</div>
        </section>

        <section class="ds-section" id="shadow">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Shadow & Elevation</h2>
              <p class="ds-section__desc">표면 깊이와 포커스 표시에 사용하는 그림자 토큰입니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-shadow-grid">${shadows}</div>
        </section>

        <section class="ds-section" id="buttons">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Buttons</h2>
              <p class="ds-section__desc">변형(Variant), 크기(Size), 상태(State)별 버튼 컴포넌트입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Variant</div>
          <div class="ds-preview">
            <div class="ds-row-gap">
              <button type="button" class="pj-button pj-button--primary pj-button--md">Primary</button>
              <button type="button" class="pj-button pj-button--secondary pj-button--md">Secondary</button>
              <button type="button" class="pj-button pj-button--outline-primary pj-button--md">Outline</button>
              <button type="button" class="pj-button pj-button--gray pj-button--md">Gray</button>
              <button type="button" class="pj-button pj-button--dark pj-button--md">Dark</button>
              <button type="button" class="pj-button pj-button--danger pj-button--md">Danger</button>
              <button type="button" class="pj-button pj-button--link">Link</button>
            </div>
          </div>

          <div class="ds-sub">Size</div>
          <div class="ds-preview">
            <div class="ds-row-gap">
              <button type="button" class="pj-button pj-button--primary pj-button--sm">Small</button>
              <button type="button" class="pj-button pj-button--primary pj-button--md">Medium</button>
              <button type="button" class="pj-button pj-button--primary pj-button--lg">Large</button>
              <button type="button" class="pj-button pj-button--primary pj-button--xlg">X-Large</button>
            </div>
          </div>

          <div class="ds-sub">State</div>
          <div class="ds-preview">
            <div class="ds-row-gap">
              <button type="button" class="pj-button pj-button--primary pj-button--md">Default</button>
              <button type="button" class="pj-button pj-button--primary pj-button--md is-pressed">Pressed</button>
              <button type="button" class="pj-button pj-button--primary pj-button--md" disabled>Disabled</button>
              <button type="button" class="pj-button pj-button--primary pj-button--md pj-button--pill">
                <i class="ri-add-line" aria-hidden="true"></i> With Icon
              </button>
            </div>
          </div>
        </section>

        <section class="ds-section" id="forms">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Form Controls</h2>
              <p class="ds-section__desc">입력 필드, 셀렉트, 체크박스, 라디오, 토글 등 폼 요소입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-form-grid">
            <div>
              <label class="pj-label" for="ds-input">Text Input</label>
              <input id="ds-input" class="pj-field" type="text" placeholder="예) 김제주">
            </div>
            <div>
              <label class="pj-label" for="ds-email">Email</label>
              <input id="ds-email" class="pj-field" type="email" placeholder="name@picjeju.com">
            </div>
            <div>
              <label class="pj-label" for="ds-select">Select</label>
              <select id="ds-select" class="pj-field">
                <option>제주시</option>
                <option>서귀포시</option>
                <option>애월읍</option>
                <option>성산읍</option>
              </select>
            </div>
            <div>
              <label class="pj-label" for="ds-date">Date</label>
              <input id="ds-date" class="pj-field" type="date">
            </div>
            <div style="grid-column: 1 / -1;">
              <label class="pj-label" for="ds-textarea">Textarea</label>
              <textarea id="ds-textarea" class="pj-field" rows="4" placeholder="제주살이 이야기를 들려주세요."></textarea>
            </div>
          </div>

          <div class="ds-sub">Checkbox · Radio · Toggle</div>
          <div class="ds-preview">
            <div class="ds-row-gap" style="gap:24px;">
              <label class="ds-toggle-row"><input type="checkbox" checked> <span>동의합니다</span></label>
              <label class="ds-toggle-row"><input type="checkbox"> <span>마케팅 수신</span></label>
              <label class="ds-toggle-row"><input type="radio" name="ds-radio" checked> <span>전체</span></label>
              <label class="ds-toggle-row"><input type="radio" name="ds-radio"> <span>제주시</span></label>
              <span class="ds-toggle-row">
                <label class="ds-switch">
                  <input type="checkbox" checked>
                  <span class="ds-slider"></span>
                </label>
                <span>공개 게시</span>
              </span>
            </div>
          </div>
        </section>

        <section class="ds-section" id="cards">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Cards</h2>
              <p class="ds-section__desc">콘텐츠 카드의 기본 레이아웃 예시입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>
          <div class="ds-card-grid">
            <article class="ds-card-demo">
              <div class="ds-card-demo__img" style="background:linear-gradient(135deg,#FF8A65,#FF6633);">
                <span class="ds-tag">핫스팟</span>
              </div>
              <div class="ds-card-demo__body">
                <div class="ds-card-demo__title">한라산 둘레길 한 바퀴 코스</div>
                <div class="ds-card-demo__meta">제주시 · 2026.05.20</div>
              </div>
            </article>
            <article class="ds-card-demo">
              <div class="ds-card-demo__img" style="background:linear-gradient(135deg,#99EBC2,#00CC66);">
                <span class="ds-tag">장터</span>
              </div>
              <div class="ds-card-demo__body">
                <div class="ds-card-demo__title">해녀가 직접 잡은 성게알 한정 판매</div>
                <div class="ds-card-demo__meta">서귀포시 · 2026.05.18</div>
              </div>
            </article>
            <article class="ds-card-demo">
              <div class="ds-card-demo__img" style="background:linear-gradient(135deg,#FFE082,#F99100);">
                <span class="ds-tag">체험</span>
              </div>
              <div class="ds-card-demo__body">
                <div class="ds-card-demo__title">우도 자전거 일주 워크숍</div>
                <div class="ds-card-demo__meta">우도 · 2026.06.02</div>
              </div>
            </article>
          </div>
        </section>

        <section class="ds-section" id="badges">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Badges & Tags</h2>
              <p class="ds-section__desc">짧은 메타 정보를 표시하는 뱃지/태그입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>
          <div class="ds-preview">
            <div class="ds-badge-row">
              <span class="pj-badge" style="background:var(--pj-color-primary);color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">NEW</span>
              <span class="pj-badge" style="background:var(--pj-color-secondary);color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">HOT</span>
              <span class="pj-badge" style="background:var(--pj-color-dark-1);color:#fff;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">공지</span>
              <span class="pj-badge" style="background:var(--pj-color-warning);color:#222;padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;">이벤트</span>
              <span class="pj-badge" style="background:var(--pj-color-guide-bg);color:var(--pj-color-dark-1);padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;border:1px solid var(--pj-color-guide-line);">#제주살이</span>
              <span class="pj-badge" style="background:var(--pj-color-guide-bg);color:var(--pj-color-dark-1);padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;border:1px solid var(--pj-color-guide-line);">#한달살이</span>
              <span class="pj-badge" style="background:var(--pj-color-guide-bg);color:var(--pj-color-dark-1);padding:4px 10px;border-radius:999px;font-size:12px;font-weight:700;border:1px solid var(--pj-color-guide-line);">#성산일출봉</span>
            </div>
          </div>
        </section>

        <section class="ds-section" id="alerts">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Alerts & Toasts</h2>
              <p class="ds-section__desc">사용자에게 상태나 알림을 표시할 때 사용합니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>
          <div style="display:grid;gap:12px;">
            <div class="ds-alert ds-alert--info">
              <i class="ri-information-line" aria-hidden="true"></i>
              <div><strong>안내</strong> · 가입한 이메일로 인증 메일이 발송되었습니다.</div>
            </div>
            <div class="ds-alert ds-alert--success">
              <i class="ri-checkbox-circle-line" aria-hidden="true"></i>
              <div><strong>완료</strong> · 게시글이 정상적으로 등록되었습니다.</div>
            </div>
            <div class="ds-alert ds-alert--warning">
              <i class="ri-error-warning-line" aria-hidden="true"></i>
              <div><strong>주의</strong> · 본 이벤트는 오늘 자정에 마감됩니다.</div>
            </div>
            <div class="ds-alert ds-alert--error">
              <i class="ri-close-circle-line" aria-hidden="true"></i>
              <div><strong>오류</strong> · 비밀번호가 일치하지 않습니다.</div>
            </div>
          </div>
        </section>

        <section class="ds-section" id="table">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Table</h2>
              <p class="ds-section__desc">목록형 데이터를 보여주는 기본 테이블입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>
          <div style="overflow-x:auto;">
            <table class="ds-table">
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>날짜</th>
                  <th>조회</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>4</td><td>제주 5월 장마 대비 꿀팁 모음</td><td>물비늘</td><td>2026.05.20</td><td>1,283</td></tr>
                <tr><td>3</td><td>우도 캠핑 추천 스폿 5곳</td><td>제주캠퍼</td><td>2026.05.18</td><td>987</td></tr>
                <tr><td>2</td><td>흑돼지 맛집 진짜 리스트</td><td>먹제주</td><td>2026.05.16</td><td>2,401</td></tr>
                <tr><td>1</td><td>해녀가 알려주는 바다 이야기</td><td>해녀삼춘</td><td>2026.05.14</td><td>3,150</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="ds-section" id="pagination">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Pagination</h2>
              <p class="ds-section__desc">긴 목록을 페이지 단위로 나누어 보여줍니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>
          <div class="ds-preview" style="display:flex;justify-content:center;">
            <nav class="ds-pagination" aria-label="페이지네이션">
              <a href="#" aria-label="이전 페이지">‹</a>
              <a href="#" class="is-active">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#" aria-label="다음 페이지">›</a>
            </nav>
          </div>
        </section>

        <section class="ds-section" id="icons">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Icons</h2>
              <p class="ds-section__desc">Remix Icon 라이브러리를 사용합니다. 자주 쓰는 아이콘 일부를 모았습니다.</p>
            </div>
            <span class="ds-section__tag">Assets</span>
          </div>
          <div class="ds-icon-grid">${icons}</div>
        </section>

      </div>
    </div>
  </div>
</main>
`;
}
