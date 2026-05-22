// Picjeju Design System showcase page content.
// Renders inside the shared header/footer chrome via app/[[...path]]/page.jsx.

const SCALE_PRIMARY = [
  { step: 50, hex: "#FFF5F1" },
  { step: 100, hex: "#FFE6DA" },
  { step: 200, hex: "#FFC9B0" },
  { step: 300, hex: "#FFA785" },
  { step: 400, hex: "#FF8B5C" },
  { step: 500, hex: "#FF6633" },
  { step: 600, hex: "#DD572B" },
  { step: 700, hex: "#B14422" },
  { step: 800, hex: "#82321A" },
  { step: 900, hex: "#531F10" }
];

const SCALE_SECONDARY = [
  { step: 50, hex: "#ECFDF3" },
  { step: 100, hex: "#D1FAE0" },
  { step: 200, hex: "#99EBC2" },
  { step: 300, hex: "#5AD899" },
  { step: 400, hex: "#2BC57C" },
  { step: 500, hex: "#00CC66" },
  { step: 600, hex: "#01BF60" },
  { step: 700, hex: "#028A48" },
  { step: 800, hex: "#045D32" },
  { step: 900, hex: "#02351D" }
];

const SCALE_GRAY = [
  { step: 50, hex: "#F9F9F9" },
  { step: 100, hex: "#F2F2F5" },
  { step: 200, hex: "#E3E3E3" },
  { step: 300, hex: "#BDBDBD" },
  { step: 400, hex: "#8C8C8C" },
  { step: 500, hex: "#6B6E80" },
  { step: 600, hex: "#4F525F" },
  { step: 700, hex: "#3A3D49" },
  { step: 800, hex: "#2A2C36" },
  { step: 900, hex: "#222222" }
];

const SEMANTIC_TEXT = [
  { token: "--pj-text-primary", name: "Text / Primary", value: "#222222", use: "본문, 제목, 강조 텍스트" },
  { token: "--pj-text-secondary", name: "Text / Secondary", value: "#4F525F", use: "보조 본문, 메타 정보" },
  { token: "--pj-text-tertiary", name: "Text / Tertiary", value: "#8C8C8C", use: "캡션, 비활성 라벨" },
  { token: "--pj-text-disabled", name: "Text / Disabled", value: "#BDBDBD", use: "비활성 입력값" },
  { token: "--pj-text-inverse", name: "Text / Inverse", value: "#FFFFFF", use: "어두운 배경 위 텍스트" },
  { token: "--pj-text-link", name: "Text / Link", value: "#DD572B", use: "본문 내 링크" }
];

const SEMANTIC_SURFACE = [
  { token: "--pj-surface-base", name: "Surface / Base", value: "#FFFFFF", use: "기본 콘텐츠 배경" },
  { token: "--pj-surface-1", name: "Surface / 1", value: "#F9F9F9", use: "섹션·필드 배경" },
  { token: "--pj-surface-2", name: "Surface / 2", value: "#F2F2F5", use: "경계가 있는 박스 배경" },
  { token: "--pj-surface-raised", name: "Surface / Raised", value: "#FFFFFF", use: "카드, 모달 (그림자 동반)" },
  { token: "--pj-surface-inverse", name: "Surface / Inverse", value: "#222222", use: "다크 영역, Toast" },
  { token: "--pj-overlay", name: "Overlay", value: "rgba(17,24,39,.55)", use: "모달 백드롭, Drawer 스크림" }
];

const SEMANTIC_BORDER = [
  { token: "--pj-border-subtle", name: "Border / Subtle", value: "#F2F2F5", use: "구분선, 약한 경계" },
  { token: "--pj-border-default", name: "Border / Default", value: "#E3E3E3", use: "입력 필드, 카드 외곽" },
  { token: "--pj-border-strong", name: "Border / Strong", value: "#BDBDBD", use: "비활성 강조 외곽" },
  { token: "--pj-border-focus", name: "Border / Focus", value: "#FF6633", use: "포커스 링, 활성 외곽" }
];

const STATUS_EXTENDED = [
  { name: "Error", text: "#B3201B", bg: "#FFEAEA", border: "#FFCBCB", base: "#FF3B3B" },
  { name: "Warning", text: "#7A5B00", bg: "#FFF6DC", border: "#F5E0A0", base: "#FFCC00" },
  { name: "Info", text: "#1742A6", bg: "#EEF4FF", border: "#C7D8FF", base: "#0063F7" },
  { name: "Success", text: "#036A3E", bg: "#E6FAEF", border: "#BFE9CF", base: "#06C270" }
];

const GRADIENTS = [
  { name: "Brand · Soft", token: "--pj-gradient-brand-soft", css: "linear-gradient(135deg, #FFB299 0%, #FF6633 100%)", use: "히어로, 카드 썸네일" },
  { name: "Brand · Vivid", token: "--pj-gradient-brand-vivid", css: "linear-gradient(135deg, #FF8B5C 0%, #DD572B 100%)", use: "CTA 강조, 배너" },
  { name: "Mint · Soft", token: "--pj-gradient-mint-soft", css: "linear-gradient(135deg, #99EBC2 0%, #00CC66 100%)", use: "마켓 카테고리" },
  { name: "Sunset", token: "--pj-gradient-sunset", css: "linear-gradient(135deg, #FFE082 0%, #F99100 100%)", use: "체험·축제 카테고리" },
  { name: "Sky", token: "--pj-gradient-sky", css: "linear-gradient(135deg, #E0EBFF 0%, #0644B8 100%)", use: "청년·뉴스 카테고리" },
  { name: "Dawn", token: "--pj-gradient-dawn", css: "linear-gradient(180deg, #FFF7F2 0%, #FFFFFF 100%)", use: "알림 패널, 부드러운 헤더" }
];

const USAGE_RULES = [
  { color: "#FF6633", title: "Primary", do: "CTA 버튼, 강조 링크, 핵심 메트릭, 포커스 링", dont: "본문 텍스트, 큰 영역의 배경 색칠" },
  { color: "#00CC66", title: "Secondary", do: "성공 배지, 픽포인트 강조, 보조 액션", dont: "주요 CTA(Primary와 경쟁하지 않도록)" },
  { color: "#222222", title: "Dark", do: "본문, 헤더 텍스트, 다크 영역 배경", dont: "에러/경고 등 상태를 표현해야 할 때" },
  { color: "#FF3B3B", title: "Error", do: "유효성 실패, 삭제 위험 표시", dont: "단순 강조 색으로 남용 금지" }
];

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

  .ds-hero { padding: 40px 0 32px; height: auto; position: relative; }
  .ds-hero__kicker { display: inline-block; padding: 6px 12px; border-radius: 999px; background: var(--pj-color-primary-tint); color: var(--pj-color-primary-dark); font-size: 13px; font-weight: 700; letter-spacing: 0.02em; }
  .ds-hero__title { margin: 14px 0 12px; font-size: clamp(34px, 4vw, 48px); font-weight: 800; line-height: 1.15; letter-spacing: -0.01em; }
  .ds-hero__desc { max-width: 720px; color: var(--pj-color-dark-2); font-size: 17px; line-height: 1.6; }
  .ds-hero__meta { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; }
  .ds-hero__meta span { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 999px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); font-size: 12px; color: var(--pj-color-dark-2); font-weight: 700; letter-spacing: 0.02em; }

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

  .ds-tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--pj-color-guide-line); padding: 0 2px; }
  .ds-tab { padding: 12px 18px; background: none; border: 0; border-bottom: 2px solid transparent; font-size: 14px; font-weight: 700; color: var(--pj-color-dark-2); cursor: pointer; }
  .ds-tab.is-active { color: var(--pj-color-primary); border-bottom-color: var(--pj-color-primary); }
  .ds-pill-tabs { display: inline-flex; padding: 4px; gap: 4px; background: var(--pj-color-guide-bg); border-radius: 999px; }
  .ds-pill-tab { padding: 8px 16px; background: transparent; border: 0; border-radius: 999px; font-size: 13px; font-weight: 700; color: var(--pj-color-dark-2); cursor: pointer; }
  .ds-pill-tab.is-active { background: #ffffff; color: var(--pj-color-dark-1); box-shadow: 0 2px 6px rgba(0,0,0,.06); }

  .ds-modal-mock { width: 100%; max-width: 480px; margin: 0 auto; border-radius: 18px; background: #ffffff; box-shadow: 0 24px 64px rgba(17,24,39,.18); overflow: hidden; }
  .ds-modal-mock__head { display: flex; align-items: center; justify-content: space-between; padding: 18px 22px; border-bottom: 1px solid var(--pj-color-guide-line); }
  .ds-modal-mock__title { font-size: 17px; font-weight: 800; }
  .ds-modal-mock__close { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: 0; background: var(--pj-color-guide-bg); border-radius: 50%; color: var(--pj-color-dark-1); cursor: pointer; }
  .ds-modal-mock__body { padding: 22px; color: var(--pj-color-dark-2); font-size: 14px; line-height: 1.6; }
  .ds-modal-mock__foot { display: flex; justify-content: flex-end; gap: 8px; padding: 0 22px 22px; }

  .ds-drawer-mock { width: 100%; max-width: 520px; margin: 0 auto; display: grid; grid-template-columns: 1fr 280px; min-height: 280px; border-radius: 18px; overflow: hidden; box-shadow: 0 24px 64px rgba(17,24,39,.12); }
  .ds-drawer-mock__scrim { background: rgba(17,24,39,.45); }
  .ds-drawer-mock__panel { background: #ffffff; padding: 22px; display: flex; flex-direction: column; gap: 14px; }
  .ds-drawer-mock__panel h4 { margin: 0; font-size: 16px; font-weight: 800; }
  .ds-drawer-mock__panel ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
  .ds-drawer-mock__panel li a { display: block; padding: 10px 12px; border-radius: 10px; color: var(--pj-color-dark-1); text-decoration: none; font-size: 14px; font-weight: 600; }
  .ds-drawer-mock__panel li a:hover { background: var(--pj-color-guide-bg); }

  .ds-avatar-row { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
  .ds-avatar { display: inline-flex; align-items: center; justify-content: center; background: var(--pj-color-primary-tint); color: var(--pj-color-primary-dark); font-weight: 800; border-radius: 50%; position: relative; }
  .ds-avatar--xs { width: 24px; height: 24px; font-size: 11px; }
  .ds-avatar--sm { width: 32px; height: 32px; font-size: 12px; }
  .ds-avatar--md { width: 40px; height: 40px; font-size: 14px; }
  .ds-avatar--lg { width: 56px; height: 56px; font-size: 18px; }
  .ds-avatar--xl { width: 80px; height: 80px; font-size: 24px; }
  .ds-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .ds-avatar__badge { position: absolute; right: -2px; bottom: -2px; width: 12px; height: 12px; border-radius: 50%; background: var(--pj-color-success); border: 2px solid #ffffff; }
  .ds-avatar-group { display: inline-flex; align-items: center; }
  .ds-avatar-group .ds-avatar { border: 2px solid #ffffff; }
  .ds-avatar-group .ds-avatar + .ds-avatar { margin-left: -10px; }
  .ds-user-row { display: flex; align-items: center; gap: 12px; }
  .ds-user-row__name { font-size: 14px; font-weight: 700; color: var(--pj-color-dark-1); }
  .ds-user-row__meta { font-size: 12px; color: var(--pj-color-dark-2); }

  .ds-empty { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px; border: 1px dashed var(--pj-color-guide-line); border-radius: 16px; background: var(--pj-color-light-2); text-align: center; gap: 8px; }
  .ds-empty__icon { width: 64px; height: 64px; border-radius: 50%; background: var(--pj-color-guide-bg); display: inline-flex; align-items: center; justify-content: center; color: var(--pj-color-dark-2); font-size: 30px; }
  .ds-empty__title { font-size: 16px; font-weight: 800; color: var(--pj-color-dark-1); margin-top: 6px; }
  .ds-empty__desc { font-size: 13px; color: var(--pj-color-dark-2); max-width: 320px; line-height: 1.5; }

  .ds-skeleton { background: linear-gradient(90deg, #ececf0 0%, #f6f6f9 50%, #ececf0 100%); background-size: 200% 100%; animation: ds-skel 1.4s infinite ease; border-radius: 8px; }
  @keyframes ds-skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  .ds-skeleton-card { padding: 14px; border: 1px solid var(--pj-color-guide-line); border-radius: 14px; background: #ffffff; display: grid; gap: 10px; }
  .ds-skel-thumb { aspect-ratio: 16/10; border-radius: 10px; }
  .ds-skel-line { height: 12px; }
  .ds-skel-line.w-60 { width: 60%; }
  .ds-skel-line.w-40 { width: 40%; }

  .ds-filter-chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .ds-chip { display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px; border-radius: 999px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); color: var(--pj-color-dark-1); font-size: 13px; font-weight: 700; cursor: pointer; transition: background .15s ease, border-color .15s ease, color .15s ease; }
  .ds-chip:hover { background: var(--pj-color-guide-bg); }
  .ds-chip.is-active { background: var(--pj-color-primary); color: #ffffff; border-color: var(--pj-color-primary); }
  .ds-chip__remove { font-size: 12px; opacity: 0.7; }

  .ds-sort-mock { display: inline-flex; align-items: center; gap: 6px; padding: 10px 14px; border-radius: 12px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); font-size: 13px; font-weight: 700; color: var(--pj-color-dark-1); cursor: pointer; }
  .ds-sort-mock i { font-size: 16px; color: var(--pj-color-dark-2); }
  .ds-sort-list { margin-top: 8px; padding: 6px; background: #ffffff; border-radius: 12px; box-shadow: 0 12px 32px rgba(17,24,39,.12); display: inline-flex; flex-direction: column; min-width: 160px; }
  .ds-sort-list a { padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: var(--pj-color-dark-1); text-decoration: none; }
  .ds-sort-list a.is-active { background: var(--pj-color-primary-tint); color: var(--pj-color-primary-dark); }
  .ds-sort-list a:hover:not(.is-active) { background: var(--pj-color-guide-bg); }

  .ds-breadcrumb { display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: center; font-size: 13px; color: var(--pj-color-dark-2); }
  .ds-breadcrumb a { color: var(--pj-color-dark-2); text-decoration: none; font-weight: 600; }
  .ds-breadcrumb a:hover { color: var(--pj-color-primary); }
  .ds-breadcrumb .ds-bc-sep { color: var(--pj-color-dark-3); }
  .ds-breadcrumb .ds-bc-current { color: var(--pj-color-dark-1); font-weight: 700; }

  .ds-motion-grid { display: grid; gap: 12px; }
  .ds-motion-row { display: grid; grid-template-columns: 180px 100px 1fr; align-items: center; gap: 14px; padding: 8px 0; }
  .ds-motion-row code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-motion-row strong { font-size: 13px; font-weight: 700; color: var(--pj-color-dark-1); }

  .ds-z-grid { display: grid; gap: 8px; }
  .ds-z-row { display: grid; grid-template-columns: 180px 80px 1fr; padding: 10px 12px; background: var(--pj-color-light-2); border-radius: 8px; align-items: center; font-size: 13px; }
  .ds-z-row code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-z-row strong { font-weight: 700; color: var(--pj-color-dark-1); }

  .ds-bp-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; }
  .ds-bp { padding: 16px; border: 1px solid var(--pj-color-guide-line); border-radius: 12px; background: #ffffff; }
  .ds-bp strong { display: block; font-size: 14px; font-weight: 800; color: var(--pj-color-dark-1); margin-bottom: 4px; }
  .ds-bp code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-bp span { display: block; font-size: 12px; color: var(--pj-color-dark-2); margin-top: 6px; }

  .ds-grid-demo { display: grid; grid-template-columns: repeat(12, 1fr); gap: 6px; }
  .ds-grid-demo > div { padding: 14px 8px; background: var(--pj-color-primary-tint); color: var(--pj-color-primary-dark); border-radius: 6px; font-size: 11px; font-weight: 700; text-align: center; }
  .ds-grid-demo--row2 > div { background: var(--pj-color-secondary-light); color: #036A3E; }

  .ds-logo-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
  .ds-logo-card { padding: 28px; border-radius: 16px; border: 1px solid var(--pj-color-guide-line); display: flex; align-items: center; justify-content: center; min-height: 140px; }
  .ds-logo-card img { max-width: 180px; height: auto; }
  .ds-logo-card--light { background: #ffffff; }
  .ds-logo-card--dark { background: var(--pj-color-dark-1); }
  .ds-logo-card--brand { background: var(--pj-color-primary); }
  .ds-logo-card__label { position: absolute; }
  .ds-logo-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 14px; }
  .ds-logo-meta__item { padding: 16px 18px; background: var(--pj-color-light-2); border-radius: 12px; }
  .ds-logo-meta__item strong { display: block; font-size: 13px; font-weight: 800; color: var(--pj-color-dark-1); margin-bottom: 4px; }
  .ds-logo-meta__item span { font-size: 12px; color: var(--pj-color-dark-2); line-height: 1.5; }
  .ds-logo-dont { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 14px; }
  .ds-logo-dont__card { padding: 22px; border-radius: 14px; border: 1px solid var(--pj-color-guide-line); background: #ffffff; display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
  .ds-logo-dont__pill { display: inline-flex; align-items: center; gap: 4px; padding: 2px 10px; border-radius: 999px; font-size: 11px; font-weight: 800; }
  .ds-logo-dont__pill--no { background: #ffeaea; color: #b3201b; }
  .ds-logo-dont__sample { width: 140px; height: 70px; display: flex; align-items: center; justify-content: center; }
  .ds-logo-dont__caption { font-size: 12px; color: var(--pj-color-dark-2); line-height: 1.5; }

  /* Drawer mock — full-screen scrim + right slide-in panel */
  .ds-drawer2 { position: relative; width: 100%; max-width: 760px; margin: 0 auto; height: 360px; border-radius: 16px; overflow: hidden; box-shadow: 0 24px 64px rgba(17,24,39,.18); background: #ffffff; }
  .ds-drawer2__page { position: absolute; inset: 0; background: linear-gradient(180deg, #f4f5f8 0%, #ffffff 100%); padding: 18px; display: flex; flex-direction: column; gap: 12px; }
  .ds-drawer2__page-bar { height: 36px; border-radius: 8px; background: #ffffff; border: 1px solid var(--pj-color-guide-line); }
  .ds-drawer2__page-row { height: 14px; border-radius: 4px; background: var(--pj-color-guide-line); }
  .ds-drawer2__page-row.short { width: 60%; }
  .ds-drawer2__scrim { position: absolute; inset: 0; background: rgba(17,24,39,.55); }
  .ds-drawer2__panel { position: absolute; top: 0; right: 0; bottom: 0; width: 320px; max-width: 80%; background: #ffffff; padding: 22px; display: flex; flex-direction: column; gap: 14px; box-shadow: -16px 0 32px rgba(17,24,39,.14); }
  .ds-drawer2__panel h4 { margin: 0; font-size: 16px; font-weight: 800; }
  .ds-drawer2__panel ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
  .ds-drawer2__panel li a { display: block; padding: 10px 12px; border-radius: 10px; color: var(--pj-color-dark-1); text-decoration: none; font-size: 14px; font-weight: 600; }
  .ds-drawer2__panel li a:hover { background: var(--pj-color-guide-bg); }
  .ds-drawer2__close { position: absolute; right: 16px; top: 16px; width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: 0; background: var(--pj-color-guide-bg); border-radius: 50%; font-size: 16px; cursor: pointer; }

  /* Sort dropdown — button stacked above menu */
  .ds-sort { display: inline-flex; flex-direction: column; align-items: flex-start; gap: 4px; position: relative; }
  .ds-sort__menu { margin-top: 0; padding: 6px; background: #ffffff; border-radius: 12px; box-shadow: 0 12px 32px rgba(17,24,39,.12); display: flex; flex-direction: column; min-width: 100%; }
  .ds-sort__menu a { padding: 10px 12px; border-radius: 8px; font-size: 13px; font-weight: 600; color: var(--pj-color-dark-1); text-decoration: none; }
  .ds-sort__menu a.is-active { background: var(--pj-color-primary-tint); color: var(--pj-color-primary-dark); }
  .ds-sort__menu a:hover:not(.is-active) { background: var(--pj-color-guide-bg); }

  /* Toast */
  .ds-toast { position: relative; min-width: 280px; max-width: 360px; display: flex; align-items: flex-start; gap: 10px; padding: 14px 16px; border-radius: 12px; background: #1d1f2a; color: #ffffff; box-shadow: 0 12px 32px rgba(17,24,39,.18); font-size: 13px; line-height: 1.5; }
  .ds-toast i { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .ds-toast--success { background: #0c8a4e; }
  .ds-toast--error { background: #c2362e; }
  .ds-toast--info { background: #1d4dd4; }
  .ds-toast__close { margin-left: auto; background: transparent; border: 0; color: rgba(255,255,255,.7); font-size: 16px; cursor: pointer; padding: 0 0 0 8px; line-height: 1; }

  /* Search bar */
  .ds-search { display: inline-flex; align-items: center; gap: 8px; width: 100%; max-width: 420px; padding: 0 14px; border: 1px solid var(--pj-color-guide-line); border-radius: 999px; background: #ffffff; height: 44px; }
  .ds-search i { font-size: 18px; color: var(--pj-color-dark-2); }
  .ds-search input { flex: 1; height: 100%; border: 0; outline: 0; background: transparent; font-size: 14px; color: var(--pj-color-dark-1); }
  .ds-search input::placeholder { color: var(--pj-color-dark-3); }
  .ds-search--lg { height: 52px; padding: 0 18px; }
  .ds-search--lg input { font-size: 15px; }
  .ds-search__clear { width: 22px; height: 22px; border: 0; border-radius: 50%; background: var(--pj-color-guide-bg); color: var(--pj-color-dark-2); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; }

  /* Form validation state */
  .ds-field-wrap { display: grid; gap: 6px; }
  .ds-field-wrap .pj-field.is-invalid { border-color: var(--pj-color-error); box-shadow: 0 0 0 4px rgba(255,59,59,.16); }
  .ds-field-wrap .pj-field.is-valid { border-color: var(--pj-color-success); box-shadow: 0 0 0 4px rgba(6,194,112,.16); }
  .ds-field-err { color: var(--pj-color-error); font-size: 12px; display: inline-flex; align-items: center; gap: 4px; }
  .ds-field-help { color: var(--pj-color-dark-2); font-size: 12px; }
  .ds-field-success { color: var(--pj-color-success); font-size: 12px; display: inline-flex; align-items: center; gap: 4px; }

  /* Spinner */
  .ds-spinner { display: inline-block; width: 14px; height: 14px; border-radius: 50%; border: 2px solid currentColor; border-right-color: transparent; animation: ds-spin .7s linear infinite; vertical-align: middle; }
  @keyframes ds-spin { to { transform: rotate(360deg); } }
  .pj-button.is-loading { pointer-events: none; opacity: 0.9; }

  /* Board list (horizontal) card variant */
  .ds-board-list { display: grid; gap: 8px; }
  .ds-board-row { display: grid; grid-template-columns: 96px 1fr auto; gap: 14px; padding: 12px; border: 1px solid var(--pj-color-guide-line); border-radius: 14px; background: #ffffff; align-items: center; }
  .ds-board-row__thumb { aspect-ratio: 1; border-radius: 10px; background: linear-gradient(135deg,#FFB299,#FF6633); }
  .ds-board-row__thumb--b { background: linear-gradient(135deg,#99EBC2,#00CC66); }
  .ds-board-row__thumb--c { background: linear-gradient(135deg,#E0EBFF,#0644B8); }
  .ds-board-row__body { display: grid; gap: 4px; min-width: 0; }
  .ds-board-row__meta { display: flex; gap: 8px; align-items: center; font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-board-row__title { font-size: 15px; font-weight: 700; color: var(--pj-color-dark-1); line-height: 1.35; }
  .ds-board-row__sub { font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-board-row__side { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; font-size: 12px; color: var(--pj-color-dark-2); }
  .ds-board-row__cat { display: inline-flex; align-items: center; padding: 3px 8px; border-radius: 999px; color: #ffffff; font-size: 11px; font-weight: 700; }

  /* Voice & Tone */
  .ds-tone-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
  .ds-tone-card { padding: 18px; border-radius: 14px; border: 1px solid var(--pj-color-guide-line); background: #ffffff; }
  .ds-tone-card h4 { margin: 0 0 8px; font-size: 15px; font-weight: 800; color: var(--pj-color-dark-1); }
  .ds-tone-card p { margin: 0; font-size: 13px; line-height: 1.55; color: var(--pj-color-dark-2); }
  .ds-tone-compare { display: grid; gap: 8px; margin-top: 12px; }
  .ds-tone-compare > div { padding: 10px 12px; border-radius: 10px; font-size: 13px; line-height: 1.5; display: flex; gap: 8px; align-items: flex-start; }
  .ds-tone-do { background: #e6faef; color: #036a3e; }
  .ds-tone-dont { background: #ffeaea; color: #b3201b; }
  .ds-tone-tag { font-weight: 800; font-size: 11px; letter-spacing: 0.04em; }

  /* Tonal scale */
  .ds-scale { display: grid; grid-template-columns: 90px 1fr; gap: 14px; align-items: stretch; }
  .ds-scale__label { display: flex; flex-direction: column; gap: 4px; padding: 6px 0; font-size: 13px; font-weight: 800; color: var(--pj-color-dark-1); }
  .ds-scale__label span { font-size: 11px; font-weight: 600; color: var(--pj-color-dark-2); letter-spacing: 0.04em; }
  .ds-scale__row { display: grid; grid-template-columns: repeat(10, 1fr); gap: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 0 rgba(17,24,39,.04); }
  .ds-scale__step { padding: 10px 4px 14px; display: flex; flex-direction: column; align-items: center; gap: 2px; min-height: 88px; justify-content: flex-end; cursor: pointer; transition: transform .15s ease; }
  .ds-scale__step:hover { transform: translateY(-2px); }
  .ds-scale__step .ds-scale__step-num { font-size: 12px; font-weight: 800; }
  .ds-scale__step .ds-scale__step-hex { font-size: 10px; font-weight: 600; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; opacity: 0.9; }
  @media (max-width: 720px) {
    .ds-scale { grid-template-columns: 1fr; }
    .ds-scale__row { grid-template-columns: repeat(5, 1fr); }
  }

  /* Semantic token table */
  .ds-tokens { display: grid; gap: 8px; }
  .ds-token-row { display: grid; grid-template-columns: 48px 220px 140px 1fr; align-items: center; gap: 14px; padding: 10px 14px; border: 1px solid var(--pj-color-guide-line); border-radius: 12px; background: #ffffff; cursor: pointer; transition: border-color .15s ease, background .15s ease; }
  .ds-token-row:hover { border-color: var(--pj-color-primary-light); background: var(--pj-color-light-2); }
  .ds-token-row__swatch { width: 36px; height: 36px; border-radius: 10px; border: 1px solid var(--pj-color-guide-line); }
  .ds-token-row__name { font-size: 13px; font-weight: 700; color: var(--pj-color-dark-1); }
  .ds-token-row__token { font-size: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--pj-color-primary-dark); word-break: break-all; }
  .ds-token-row__use { font-size: 12px; color: var(--pj-color-dark-2); }
  @media (max-width: 720px) {
    .ds-token-row { grid-template-columns: 36px 1fr; }
    .ds-token-row__token, .ds-token-row__use { grid-column: 1 / -1; }
  }

  /* Status extended */
  .ds-status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
  .ds-status-card { padding: 18px; border-radius: 14px; border: 1px solid; background: #ffffff; display: grid; gap: 12px; }
  .ds-status-card__head { display: flex; align-items: center; gap: 10px; }
  .ds-status-card__head strong { font-size: 14px; font-weight: 800; }
  .ds-status-card__chip { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; border: 1px solid; font-size: 12px; font-weight: 700; }
  .ds-status-card__sample { padding: 12px 14px; border-radius: 10px; font-size: 13px; line-height: 1.5; font-weight: 600; }
  .ds-status-card__tokens { display: grid; gap: 4px; }
  .ds-status-card__tokens code { font-size: 11px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--pj-color-dark-2); }

  /* Gradients */
  .ds-grad-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
  .ds-grad { border-radius: 14px; overflow: hidden; border: 1px solid var(--pj-color-guide-line); background: #ffffff; cursor: pointer; transition: transform .15s ease; }
  .ds-grad:hover { transform: translateY(-2px); }
  .ds-grad__swatch { height: 104px; display: flex; align-items: flex-end; padding: 12px; color: #ffffff; font-size: 12px; font-weight: 800; letter-spacing: 0.02em; text-shadow: 0 1px 2px rgba(0,0,0,.18); }
  .ds-grad__meta { padding: 12px 14px 14px; }
  .ds-grad__name { font-size: 13px; font-weight: 800; color: var(--pj-color-dark-1); }
  .ds-grad__use { font-size: 12px; color: var(--pj-color-dark-2); margin-top: 4px; }
  .ds-grad__token { display: block; font-size: 11px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--pj-color-dark-2); margin-top: 6px; word-break: break-all; }

  /* Color usage */
  .ds-usage-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
  .ds-usage-card { display: grid; grid-template-rows: 64px auto auto; border-radius: 14px; border: 1px solid var(--pj-color-guide-line); overflow: hidden; background: #ffffff; }
  .ds-usage-card__band { display: flex; align-items: center; padding: 0 18px; color: #ffffff; font-weight: 800; font-size: 15px; text-shadow: 0 1px 2px rgba(0,0,0,.14); }
  .ds-usage-card__row { display: grid; grid-template-columns: 38px 1fr; gap: 10px; padding: 12px 16px; font-size: 12px; line-height: 1.5; }
  .ds-usage-card__row + .ds-usage-card__row { border-top: 1px solid var(--pj-color-guide-line); }
  .ds-usage-card__pill { display: inline-flex; align-items: center; justify-content: center; height: 22px; border-radius: 999px; font-size: 11px; font-weight: 800; letter-spacing: 0.04em; }
  .ds-usage-card__pill--do { background: #e6faef; color: #036a3e; }
  .ds-usage-card__pill--no { background: #ffeaea; color: #b3201b; }

  /* Toast (for click-to-copy feedback) */
  .ds-copy-toast { position: fixed; left: 50%; bottom: 32px; transform: translateX(-50%) translateY(20px); padding: 10px 16px; background: #1d1f2a; color: #ffffff; border-radius: 999px; font-size: 13px; font-weight: 700; box-shadow: 0 12px 32px rgba(17,24,39,.24); opacity: 0; pointer-events: none; transition: transform .2s ease, opacity .2s ease; z-index: 12000; }
  .ds-copy-toast.is-show { opacity: 1; transform: translateX(-50%) translateY(0); }

  /* Make color cards & tiles look clickable */
  .ds-color, .ds-cat-tile, .ds-pair, .ds-shadow { cursor: pointer; }
  .ds-color { transition: transform .15s ease; }
  .ds-color:hover { transform: translateY(-2px); }

  /* Accessibility pairing */
  .ds-pair-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; }
  .ds-pair { padding: 22px; border-radius: 14px; display: flex; flex-direction: column; gap: 6px; min-height: 132px; justify-content: space-between; }
  .ds-pair__text { font-size: 16px; font-weight: 700; }
  .ds-pair__meta { font-size: 12px; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; opacity: 0.85; display: flex; justify-content: space-between; gap: 8px; }
  .ds-pair__pass { display: inline-flex; align-items: center; gap: 4px; padding: 2px 8px; border-radius: 999px; background: rgba(255,255,255,.18); font-weight: 800; }

  @media (max-width: 960px) {
    .ds-layout { grid-template-columns: 1fr; }
    .ds-toc { position: static; }
    .ds-section { padding: 24px 18px; }
    .ds-type-row { grid-template-columns: 1fr; }
    .ds-type-row__meta { text-align: left; }
    .ds-drawer-mock { grid-template-columns: 1fr; min-height: auto; }
    .ds-drawer-mock__scrim { display: none; }
    .ds-motion-row { grid-template-columns: 1fr; }
    .ds-z-row { grid-template-columns: 1fr 80px; }
  }
</style>
`;

function renderColorCard({ name, token, hex, text = "#ffffff" }) {
  const swatchStyle = `background:${hex};color:${text};`;
  return `
    <div class="ds-color" data-copy="${hex}" title="클릭하여 복사">
      <div class="ds-color__swatch" style="${swatchStyle}">${hex.toUpperCase()}</div>
      <div class="ds-color__meta">
        <div class="ds-color__name">${name}</div>
        <div class="ds-color__hex">${hex}</div>
        <div class="ds-color__token">${token}</div>
      </div>
    </div>`;
}

function scaleTextColor(step) {
  return step >= 400 ? "#ffffff" : "#222222";
}

function renderScaleRow(label, scale) {
  const steps = scale
    .map(
      ({ step, hex }) => `
      <button type="button" class="ds-scale__step" data-copy="${hex}" title="${hex}" style="background:${hex};color:${scaleTextColor(step)};">
        <span class="ds-scale__step-num">${step}</span>
        <span class="ds-scale__step-hex">${hex.replace("#", "")}</span>
      </button>`
    )
    .join("");
  return `
    <div class="ds-scale">
      <div class="ds-scale__label">${label}<span>50 → 900</span></div>
      <div class="ds-scale__row">${steps}</div>
    </div>`;
}

function renderTokenRow({ token, name, value, use }) {
  return `
    <div class="ds-token-row" data-copy="${token}" title="토큰명 복사: ${token}">
      <span class="ds-token-row__swatch" style="background:${value};"></span>
      <div>
        <div class="ds-token-row__name">${name}</div>
        <div class="ds-token-row__token">${token}</div>
      </div>
      <code style="font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;color:var(--pj-color-dark-2);">${value}</code>
      <span class="ds-token-row__use">${use}</span>
    </div>`;
}

function renderStatusExtended({ name, text, bg, border, base }) {
  return `
    <div class="ds-status-card" style="border-color:${border};">
      <div class="ds-status-card__head">
        <span class="ds-status-card__chip" style="background:${bg};color:${text};border-color:${border};">${name}</span>
        <strong style="color:${text};">${name} state</strong>
      </div>
      <div class="ds-status-card__sample" style="background:${bg};color:${text};border:1px solid ${border};">
        예시: ${name === "Error" ? "비밀번호가 일치하지 않습니다." : name === "Success" ? "정상적으로 저장되었습니다." : name === "Warning" ? "오늘 자정에 마감됩니다." : "안내가 도착했습니다."}
      </div>
      <div class="ds-status-card__tokens">
        <code data-copy="${text}" title="복사: ${text}">text · ${text}</code>
        <code data-copy="${bg}" title="복사: ${bg}">bg · ${bg}</code>
        <code data-copy="${border}" title="복사: ${border}">border · ${border}</code>
        <code data-copy="${base}" title="복사: ${base}">base · ${base}</code>
      </div>
    </div>`;
}

function renderGradient({ name, token, css, use }) {
  return `
    <div class="ds-grad" data-copy="${css}" title="CSS 복사">
      <div class="ds-grad__swatch" style="background:${css};">${name.split("·")[1] ? name.split("·")[1].trim() : name}</div>
      <div class="ds-grad__meta">
        <div class="ds-grad__name">${name}</div>
        <div class="ds-grad__use">${use}</div>
        <code class="ds-grad__token">${token}</code>
      </div>
    </div>`;
}

function renderUsageCard({ color, title, do: doText, dont }) {
  return `
    <div class="ds-usage-card">
      <div class="ds-usage-card__band" style="background:${color};">${title} · ${color}</div>
      <div class="ds-usage-card__row">
        <span class="ds-usage-card__pill ds-usage-card__pill--do">DO</span>
        <span>${doText}</span>
      </div>
      <div class="ds-usage-card__row">
        <span class="ds-usage-card__pill ds-usage-card__pill--no">DON'T</span>
        <span>${dont}</span>
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
  const scalePrimary = renderScaleRow("Primary", SCALE_PRIMARY);
  const scaleSecondary = renderScaleRow("Secondary", SCALE_SECONDARY);
  const scaleGray = renderScaleRow("Gray", SCALE_GRAY);
  const semanticText = SEMANTIC_TEXT.map(renderTokenRow).join("");
  const semanticSurface = SEMANTIC_SURFACE.map(renderTokenRow).join("");
  const semanticBorder = SEMANTIC_BORDER.map(renderTokenRow).join("");
  const statusExtended = STATUS_EXTENDED.map(renderStatusExtended).join("");
  const gradients = GRADIENTS.map(renderGradient).join("");
  const usageCards = USAGE_RULES.map(renderUsageCard).join("");

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
            <li><a href="#semantic-tokens">Semantic Tokens</a></li>
            <li><a href="#status-extended">Status Extended</a></li>
            <li><a href="#gradients">Gradients</a></li>
            <li><a href="#color-usage">Color Usage</a></li>
            <li><a href="#category-filter">Category Filter</a></li>
            <li><a href="#typography">Typography</a></li>
            <li><a href="#spacing">Spacing</a></li>
            <li><a href="#radius">Radius</a></li>
            <li><a href="#shadow">Shadow</a></li>
            <li><a href="#grid">Grid</a></li>
            <li><a href="#motion">Motion</a></li>
            <li><a href="#z-index">Z-Index</a></li>
            <li><a href="#breakpoints">Breakpoints</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Components</div>
          <ul class="ds-toc__list">
            <li><a href="#buttons">Buttons</a></li>
            <li><a href="#forms">Forms</a></li>
            <li><a href="#search">Search bar</a></li>
            <li><a href="#cards">Cards</a></li>
            <li><a href="#badges">Badges</a></li>
            <li><a href="#alerts">Alerts</a></li>
            <li><a href="#toast">Toast</a></li>
            <li><a href="#table">Table</a></li>
            <li><a href="#pagination">Pagination</a></li>
            <li><a href="#tabs">Tabs</a></li>
            <li><a href="#modal">Modal & Drawer</a></li>
            <li><a href="#avatar">Avatar</a></li>
            <li><a href="#empty">Empty & Skeleton</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Patterns</div>
          <ul class="ds-toc__list">
            <li><a href="#filter-ui">Filter & Sort</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Writing</div>
          <ul class="ds-toc__list">
            <li><a href="#voice">Voice & Tone</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">A11y</div>
          <ul class="ds-toc__list">
            <li><a href="#a11y">Accessibility</a></li>
          </ul>
        </div>
        <div class="ds-toc__group">
          <div class="ds-toc__group-label">Brand</div>
          <ul class="ds-toc__list">
            <li><a href="#brand">Logo</a></li>
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

          <div class="ds-sub">Tonal scale</div>
          <p style="margin:-6px 0 14px;font-size:13px;color:var(--pj-color-dark-2);line-height:1.5;">10단계 색조 팔레트입니다. 호버·배경·보더에 쓸 단계를 즉시 고를 수 있도록 정리했습니다. 클릭하면 HEX가 복사됩니다.</p>
          <div style="display:grid;gap:14px;">
            ${scalePrimary}
            ${scaleSecondary}
            ${scaleGray}
          </div>

          <div class="ds-sub">Neutral (legacy alias)</div>
          <div class="ds-color-grid">${colorNeutral}</div>

          <div class="ds-sub">Status (base)</div>
          <div class="ds-color-grid">${colorStatus}</div>

        </section>

        <section class="ds-section" id="semantic-tokens">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Semantic Tokens</h2>
              <p class="ds-section__desc">값(<code>--pj-color-dark-2</code>)이 아니라 역할로 컬러를 사용하세요. 향후 다크 모드/리브랜딩 대응이 쉬워집니다. 행을 클릭하면 토큰명이 복사됩니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>

          <div class="ds-sub">Text</div>
          <div class="ds-tokens">${semanticText}</div>

          <div class="ds-sub">Surface</div>
          <div class="ds-tokens">${semanticSurface}</div>

          <div class="ds-sub">Border</div>
          <div class="ds-tokens">${semanticBorder}</div>
        </section>

        <section class="ds-section" id="status-extended">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Status — extended</h2>
              <p class="ds-section__desc">상태별로 text · soft background · border 3종 세트를 정의해 알림 / 뱃지 / 입력 검증을 일관되게 표현합니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-status-grid">${statusExtended}</div>
        </section>

        <section class="ds-section" id="gradients">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Gradients</h2>
              <p class="ds-section__desc">히어로·썸네일·카테고리에 자주 쓰는 그라데이션을 토큰화했습니다. 클릭하면 CSS 값이 복사됩니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-grad-grid">${gradients}</div>
        </section>

        <section class="ds-section" id="color-usage">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Color Usage</h2>
              <p class="ds-section__desc">각 컬러를 어디에 써야 하고, 어디에 쓰지 않아야 하는지 한눈에 보는 가이드입니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-usage-grid">${usageCards}</div>
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
              <button type="button" class="pj-button pj-button--primary pj-button--md is-pressed" aria-pressed="true" style="background:var(--pj-color-primary-dark);box-shadow:inset 0 2px 6px rgba(0,0,0,.18);">Pressed</button>
              <button type="button" class="pj-button pj-button--primary pj-button--md" disabled>Disabled</button>
              <button type="button" class="pj-button pj-button--primary pj-button--md is-loading">
                <span class="ds-spinner" aria-hidden="true"></span>
                <span style="margin-left:8px;">처리 중</span>
              </button>
            </div>
          </div>

          <div class="ds-sub">With icon · Icon-only</div>
          <div class="ds-preview">
            <div class="ds-row-gap">
              <button type="button" class="pj-button pj-button--primary pj-button--md">
                <i class="ri-add-line" aria-hidden="true"></i> 글쓰기
              </button>
              <button type="button" class="pj-button pj-button--outline-primary pj-button--md">
                <i class="ri-download-line" aria-hidden="true"></i> 다운로드
              </button>
              <button type="button" class="pj-button pj-button--gray pj-button--md">
                좋아요 <i class="ri-heart-3-line" aria-hidden="true"></i>
              </button>
              <button type="button" class="pj-button pj-button--gray pj-button--md" aria-label="좋아요" style="width:40px;height:40px;padding:0;border-radius:50%;">
                <i class="ri-heart-3-line" aria-hidden="true"></i>
              </button>
              <button type="button" class="pj-button pj-button--gray pj-button--md" aria-label="공유" style="width:40px;height:40px;padding:0;border-radius:50%;">
                <i class="ri-share-line" aria-hidden="true"></i>
              </button>
              <button type="button" class="pj-button pj-button--primary pj-button--md" aria-label="더보기" style="width:40px;height:40px;padding:0;border-radius:50%;">
                <i class="ri-more-2-fill" aria-hidden="true"></i>
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
              <label class="pj-check pj-check-inline">
                <input class="pj-check-input" type="checkbox" id="ds-chk-1" checked>
                <span class="pj-check-label" for="ds-chk-1">동의합니다</span>
              </label>
              <label class="pj-check pj-check-inline">
                <input class="pj-check-input" type="checkbox" id="ds-chk-2">
                <span class="pj-check-label" for="ds-chk-2">마케팅 수신</span>
              </label>
              <label class="pj-check pj-check-inline">
                <input class="pj-check-input" type="radio" name="ds-radio" id="ds-rd-1" checked>
                <span class="pj-check-label" for="ds-rd-1">전체</span>
              </label>
              <label class="pj-check pj-check-inline">
                <input class="pj-check-input" type="radio" name="ds-radio" id="ds-rd-2">
                <span class="pj-check-label" for="ds-rd-2">제주시</span>
              </label>
              <span class="ds-toggle-row">
                <label class="ds-switch">
                  <input type="checkbox" checked>
                  <span class="ds-slider"></span>
                </label>
                <span>공개 게시</span>
              </span>
            </div>
          </div>

          <div class="ds-sub">Validation states</div>
          <div class="ds-form-grid">
            <div class="ds-field-wrap">
              <label class="pj-label" for="ds-val-1">이메일 <span class="pj-u-text-primary">*</span></label>
              <input id="ds-val-1" class="pj-field is-invalid" type="email" value="invalid-email">
              <span class="ds-field-err"><i class="ri-error-warning-line" aria-hidden="true"></i> 올바른 이메일 형식을 입력해 주세요.</span>
            </div>
            <div class="ds-field-wrap">
              <label class="pj-label" for="ds-val-2">닉네임</label>
              <input id="ds-val-2" class="pj-field is-valid" type="text" value="물비늘">
              <span class="ds-field-success"><i class="ri-checkbox-circle-line" aria-hidden="true"></i> 사용할 수 있는 닉네임이에요.</span>
            </div>
            <div class="ds-field-wrap">
              <label class="pj-label" for="ds-val-3">비밀번호</label>
              <input id="ds-val-3" class="pj-field" type="password" placeholder="8자 이상 입력해 주세요.">
              <span class="ds-field-help">영문, 숫자, 특수문자를 조합하면 더 안전해요.</span>
            </div>
            <div class="ds-field-wrap">
              <label class="pj-label" for="ds-val-4">아이디 (변경 불가)</label>
              <input id="ds-val-4" class="pj-field" type="text" value="picjeju_user" disabled>
              <span class="ds-field-help">가입 시 등록한 아이디는 변경할 수 없습니다.</span>
            </div>
          </div>
        </section>

        <section class="ds-section" id="search">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Search Bar</h2>
              <p class="ds-section__desc">목록 검색·전체 검색에 사용하는 입력 컴포넌트입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Default</div>
          <div class="ds-preview">
            <div class="ds-search">
              <i class="ri-search-line" aria-hidden="true"></i>
              <input type="search" placeholder="제주 핫스팟, 게시글 검색">
            </div>
          </div>

          <div class="ds-sub">With value & clear</div>
          <div class="ds-preview">
            <div class="ds-search">
              <i class="ri-search-line" aria-hidden="true"></i>
              <input type="search" value="성산일출봉">
              <button type="button" class="ds-search__clear" aria-label="검색어 지우기">×</button>
            </div>
          </div>

          <div class="ds-sub">Large (hero)</div>
          <div class="ds-preview">
            <div class="ds-search ds-search--lg" style="max-width:520px;">
              <i class="ri-search-line" aria-hidden="true"></i>
              <input type="search" placeholder="가고 싶은 제주 어디든 검색해 보세요">
              <button type="button" class="pj-button pj-button--primary pj-button--sm" style="height:32px;">검색</button>
            </div>
          </div>
        </section>

        <section class="ds-section" id="toast">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Toast</h2>
              <p class="ds-section__desc">즉시 사라지는 액션 결과 알림입니다. 화면 우하단(데스크탑) / 하단(모바일)에서 슬라이드 인 합니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>
          <div class="ds-preview" style="display:grid;gap:10px;justify-items:center;">
            <div class="ds-toast">
              <i class="ri-information-line" aria-hidden="true"></i>
              <div><strong style="font-weight:800;">알림</strong> · 임시저장이 완료되었어요.</div>
              <button type="button" class="ds-toast__close" aria-label="닫기">×</button>
            </div>
            <div class="ds-toast ds-toast--success">
              <i class="ri-checkbox-circle-line" aria-hidden="true"></i>
              <div><strong style="font-weight:800;">완료</strong> · 게시글이 정상적으로 등록되었습니다.</div>
              <button type="button" class="ds-toast__close" aria-label="닫기">×</button>
            </div>
            <div class="ds-toast ds-toast--info">
              <i class="ri-notification-3-line" aria-hidden="true"></i>
              <div><strong style="font-weight:800;">새 댓글</strong> · 회원님의 글에 댓글이 달렸어요.</div>
              <button type="button" class="ds-toast__close" aria-label="닫기">×</button>
            </div>
            <div class="ds-toast ds-toast--error">
              <i class="ri-close-circle-line" aria-hidden="true"></i>
              <div><strong style="font-weight:800;">실패</strong> · 네트워크 오류로 전송하지 못했습니다.</div>
              <button type="button" class="ds-toast__close" aria-label="닫기">×</button>
            </div>
          </div>
        </section>

        <section class="ds-section" id="cards">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Cards</h2>
              <p class="ds-section__desc">콘텐츠 유형에 따라 세로형 카드와 가로형 리스트 카드를 골라 사용합니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Vertical card</div>
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

          <div class="ds-sub">Horizontal list card</div>
          <div class="ds-board-list">
            <div class="ds-board-row">
              <div class="ds-board-row__thumb"></div>
              <div class="ds-board-row__body">
                <div class="ds-board-row__meta">
                  <span class="ds-board-row__cat" style="background:#7538B5;">공연</span>
                  <span>제주시</span>
                </div>
                <div class="ds-board-row__title">한라산 둘레길 한 바퀴 코스 모집</div>
                <div class="ds-board-row__sub">물비늘 · 2026.05.20 · 댓글 12</div>
              </div>
              <div class="ds-board-row__side">
                <strong style="color:var(--pj-color-dark-1);font-size:14px;">조회 1,283</strong>
                <span>좋아요 89</span>
              </div>
            </div>
            <div class="ds-board-row">
              <div class="ds-board-row__thumb ds-board-row__thumb--b"></div>
              <div class="ds-board-row__body">
                <div class="ds-board-row__meta">
                  <span class="ds-board-row__cat" style="background:#0A9500;">마켓</span>
                  <span>서귀포시</span>
                </div>
                <div class="ds-board-row__title">해녀가 직접 잡은 성게알 한정 판매</div>
                <div class="ds-board-row__sub">해녀삼춘 · 2026.05.18 · 댓글 5</div>
              </div>
              <div class="ds-board-row__side">
                <strong style="color:var(--pj-color-dark-1);font-size:14px;">조회 987</strong>
                <span>좋아요 32</span>
              </div>
            </div>
            <div class="ds-board-row">
              <div class="ds-board-row__thumb ds-board-row__thumb--c"></div>
              <div class="ds-board-row__body">
                <div class="ds-board-row__meta">
                  <span class="ds-board-row__cat" style="background:#0644B8;">청년프로그램</span>
                  <span>제주 전역</span>
                </div>
                <div class="ds-board-row__title">2026 제주 청년 창업 지원사업 모집</div>
                <div class="ds-board-row__sub">픽제주 · 2026.05.16 · 댓글 8</div>
              </div>
              <div class="ds-board-row__side">
                <strong style="color:var(--pj-color-dark-1);font-size:14px;">조회 2,401</strong>
                <span>좋아요 154</span>
              </div>
            </div>
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

        <section class="ds-section" id="tabs">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Tabs</h2>
              <p class="ds-section__desc">서브 페이지 컨텐츠 분기에 사용하는 탭 스타일입니다. Underline / Pill 두 가지 변형을 제공합니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Underline tabs</div>
          <div class="ds-preview">
            <div class="ds-tabs" role="tablist">
              <button type="button" class="ds-tab is-active" role="tab" aria-selected="true">전체</button>
              <button type="button" class="ds-tab" role="tab">제주살이 뉴스</button>
              <button type="button" class="ds-tab" role="tab">제주살이 꿀팁</button>
              <button type="button" class="ds-tab" role="tab">픽제주 친구들</button>
              <button type="button" class="ds-tab" role="tab">이벤트</button>
            </div>
          </div>

          <div class="ds-sub">Pill tabs</div>
          <div class="ds-preview">
            <div class="ds-pill-tabs" role="tablist">
              <button type="button" class="ds-pill-tab is-active">최신순</button>
              <button type="button" class="ds-pill-tab">인기순</button>
              <button type="button" class="ds-pill-tab">조회순</button>
              <button type="button" class="ds-pill-tab">댓글순</button>
            </div>
          </div>
        </section>

        <section class="ds-section" id="modal">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Modal & Drawer</h2>
              <p class="ds-section__desc">사용자 주의를 끌어야 하는 액션은 모달을, 보조 메뉴/필터는 드로어(Offcanvas)를 사용합니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Modal</div>
          <div class="ds-preview">
            <div class="ds-modal-mock" role="dialog" aria-modal="true">
              <div class="ds-modal-mock__head">
                <div class="ds-modal-mock__title">게시글을 삭제하시겠어요?</div>
                <button type="button" class="ds-modal-mock__close" aria-label="닫기">×</button>
              </div>
              <div class="ds-modal-mock__body">
                삭제한 게시글은 되돌릴 수 없습니다. 정말 삭제하시려면 확인을 눌러주세요.
              </div>
              <div class="ds-modal-mock__foot">
                <button type="button" class="pj-button pj-button--gray pj-button--md">취소</button>
                <button type="button" class="pj-button pj-button--primary pj-button--md">삭제</button>
              </div>
            </div>
          </div>

          <div class="ds-sub">Drawer / Offcanvas</div>
          <div class="ds-preview">
            <div class="ds-drawer2" aria-label="사이드 메뉴 데모">
              <div class="ds-drawer2__page" aria-hidden="true">
                <div class="ds-drawer2__page-bar"></div>
                <div class="ds-drawer2__page-row"></div>
                <div class="ds-drawer2__page-row short"></div>
                <div class="ds-drawer2__page-row"></div>
                <div class="ds-drawer2__page-row short"></div>
              </div>
              <div class="ds-drawer2__scrim" aria-hidden="true"></div>
              <aside class="ds-drawer2__panel" role="dialog" aria-modal="true" aria-label="메인 메뉴">
                <button type="button" class="ds-drawer2__close" aria-label="닫기">×</button>
                <h4>메뉴</h4>
                <ul>
                  <li><a href="#">홈</a></li>
                  <li><a href="#">제주 핫스팟</a></li>
                  <li><a href="#">제주살이 뉴스</a></li>
                  <li><a href="#">픽포인트 거래소</a></li>
                  <li><a href="#">마이페이지</a></li>
                </ul>
                <button type="button" class="pj-button pj-button--primary pj-button--md" style="margin-top:auto;">로그아웃</button>
              </aside>
            </div>
          </div>
        </section>

        <section class="ds-section" id="avatar">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Avatar & User identity</h2>
              <p class="ds-section__desc">작성자, 댓글, 마이페이지에서 사용자 식별에 사용하는 아바타입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Size</div>
          <div class="ds-preview">
            <div class="ds-avatar-row">
              <span class="ds-avatar ds-avatar--xs">제</span>
              <span class="ds-avatar ds-avatar--sm">제</span>
              <span class="ds-avatar ds-avatar--md">제</span>
              <span class="ds-avatar ds-avatar--lg">제</span>
              <span class="ds-avatar ds-avatar--xl">제</span>
            </div>
          </div>

          <div class="ds-sub">With photo & status</div>
          <div class="ds-preview">
            <div class="ds-avatar-row">
              <span class="ds-avatar ds-avatar--lg" aria-label="프로필 이미지"><img src="/assets/images/svg/avatar.svg" alt=""></span>
              <span class="ds-avatar ds-avatar--lg" aria-label="온라인 상태"><img src="/assets/images/svg/avatar-n.svg" alt=""><span class="ds-avatar__badge" aria-hidden="true"></span></span>
              <div class="ds-avatar-group" aria-label="3명 참여">
                <span class="ds-avatar ds-avatar--md">물</span>
                <span class="ds-avatar ds-avatar--md" style="background:var(--pj-color-secondary-light);color:#036A3E;">먹</span>
                <span class="ds-avatar ds-avatar--md" style="background:#E0EBFF;color:#1742A6;">해</span>
                <span class="ds-avatar ds-avatar--md" style="background:var(--pj-color-dark-4);color:var(--pj-color-dark-1);">+12</span>
              </div>
            </div>
          </div>

          <div class="ds-sub">Author row</div>
          <div class="ds-preview">
            <div class="ds-user-row">
              <span class="ds-avatar ds-avatar--md"><img src="/assets/images/svg/avatar.svg" alt=""></span>
              <div>
                <div class="ds-user-row__name">물비늘</div>
                <div class="ds-user-row__meta">제주시 · 5분 전</div>
              </div>
            </div>
          </div>
        </section>

        <section class="ds-section" id="empty">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Empty State & Skeleton</h2>
              <p class="ds-section__desc">데이터가 없을 때(빈 상태)와 데이터를 불러오는 중일 때(스켈레톤)의 일관된 패턴입니다.</p>
            </div>
            <span class="ds-section__tag">Components</span>
          </div>

          <div class="ds-sub">Empty state</div>
          <div class="ds-preview">
            <div class="ds-empty">
              <div class="ds-empty__icon"><i class="ri-inbox-line" aria-hidden="true"></i></div>
              <div class="ds-empty__title">아직 등록된 게시글이 없어요</div>
              <div class="ds-empty__desc">첫 번째로 제주살이 이야기를 들려주세요. 작은 경험도 누군가에겐 큰 정보가 됩니다.</div>
              <button type="button" class="pj-button pj-button--primary pj-button--md" style="margin-top:6px;">글쓰기</button>
            </div>
          </div>

          <div class="ds-sub">Skeleton (loading)</div>
          <div class="ds-preview">
            <div class="ds-card-grid">
              <div class="ds-skeleton-card">
                <div class="ds-skeleton ds-skel-thumb"></div>
                <div class="ds-skeleton ds-skel-line"></div>
                <div class="ds-skeleton ds-skel-line w-60"></div>
                <div class="ds-skeleton ds-skel-line w-40"></div>
              </div>
              <div class="ds-skeleton-card">
                <div class="ds-skeleton ds-skel-thumb"></div>
                <div class="ds-skeleton ds-skel-line"></div>
                <div class="ds-skeleton ds-skel-line w-60"></div>
                <div class="ds-skeleton ds-skel-line w-40"></div>
              </div>
              <div class="ds-skeleton-card">
                <div class="ds-skeleton ds-skel-thumb"></div>
                <div class="ds-skeleton ds-skel-line"></div>
                <div class="ds-skeleton ds-skel-line w-60"></div>
                <div class="ds-skeleton ds-skel-line w-40"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="ds-section" id="filter-ui">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Filter & Sort</h2>
              <p class="ds-section__desc">목록 페이지에서 자주 사용하는 필터 칩, 정렬 드롭다운, 브레드크럼 패턴입니다.</p>
            </div>
            <span class="ds-section__tag">Patterns</span>
          </div>

          <div class="ds-sub">Filter chips</div>
          <div class="ds-preview">
            <div class="ds-filter-chips">
              <button type="button" class="ds-chip is-active">전체</button>
              <button type="button" class="ds-chip">공연</button>
              <button type="button" class="ds-chip">축제/이벤트</button>
              <button type="button" class="ds-chip">전시</button>
              <button type="button" class="ds-chip">마켓</button>
              <button type="button" class="ds-chip">체험/교육</button>
              <button type="button" class="ds-chip">청년프로그램</button>
            </div>
          </div>

          <div class="ds-sub">Applied filter chips (removable)</div>
          <div class="ds-preview">
            <div class="ds-filter-chips">
              <span class="ds-chip is-active">제주시 <span class="ds-chip__remove" aria-hidden="true">×</span></span>
              <span class="ds-chip is-active">5월 <span class="ds-chip__remove" aria-hidden="true">×</span></span>
              <span class="ds-chip is-active">무료 <span class="ds-chip__remove" aria-hidden="true">×</span></span>
              <button type="button" class="pj-button pj-button--text" style="font-size:13px;font-weight:700;">전체 해제</button>
            </div>
          </div>

          <div class="ds-sub">Sort dropdown</div>
          <div class="ds-preview" style="display:flex;gap:36px;flex-wrap:wrap;align-items:flex-start;">
            <div>
              <div class="ds-field-help" style="margin-bottom:6px;">Closed</div>
              <button type="button" class="ds-sort-mock">
                <span>최신순</span>
                <i class="ri-arrow-down-s-line" aria-hidden="true"></i>
              </button>
            </div>
            <div>
              <div class="ds-field-help" style="margin-bottom:6px;">Opened</div>
              <div class="ds-sort">
                <button type="button" class="ds-sort-mock" aria-expanded="true">
                  <span>최신순</span>
                  <i class="ri-arrow-up-s-line" aria-hidden="true"></i>
                </button>
                <div class="ds-sort__menu" role="listbox">
                  <a href="#" class="is-active">최신순</a>
                  <a href="#">인기순</a>
                  <a href="#">조회순</a>
                  <a href="#">댓글순</a>
                </div>
              </div>
            </div>
          </div>

          <div class="ds-sub">Breadcrumb</div>
          <div class="ds-preview">
            <nav class="ds-breadcrumb" aria-label="현재 위치">
              <a href="#">홈</a>
              <span class="ds-bc-sep">›</span>
              <a href="#">커뮤니티</a>
              <span class="ds-bc-sep">›</span>
              <a href="#">제주살이 꿀팁</a>
              <span class="ds-bc-sep">›</span>
              <span class="ds-bc-current">5월 장마 대비 꿀팁</span>
            </nav>
          </div>
        </section>

        <section class="ds-section" id="grid">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Grid System</h2>
              <p class="ds-section__desc">12 컬럼 기반 반응형 그리드입니다. <code>pj-row</code> / <code>pj-col-*</code> 클래스로 구성합니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>

          <div class="ds-sub">12 columns</div>
          <div class="ds-preview">
            <div class="ds-grid-demo">
              ${Array.from({ length: 12 }, (_, i) => `<div>${i + 1}</div>`).join("")}
            </div>
          </div>

          <div class="ds-sub">Common splits</div>
          <div class="ds-preview" style="display:grid;gap:6px;">
            <div class="ds-grid-demo ds-grid-demo--row2"><div style="grid-column:span 6;">6</div><div style="grid-column:span 6;">6</div></div>
            <div class="ds-grid-demo ds-grid-demo--row2"><div style="grid-column:span 4;">4</div><div style="grid-column:span 4;">4</div><div style="grid-column:span 4;">4</div></div>
            <div class="ds-grid-demo ds-grid-demo--row2"><div style="grid-column:span 3;">3</div><div style="grid-column:span 3;">3</div><div style="grid-column:span 3;">3</div><div style="grid-column:span 3;">3</div></div>
            <div class="ds-grid-demo ds-grid-demo--row2"><div style="grid-column:span 8;">8</div><div style="grid-column:span 4;">4</div></div>
          </div>
        </section>

        <section class="ds-section" id="motion">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Motion</h2>
              <p class="ds-section__desc">트랜지션 시간과 이징 함수 가이드입니다. 마이크로 인터랙션은 빠르게, 페이지 전환은 부드럽게.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>

          <div class="ds-motion-grid">
            <div class="ds-motion-row">
              <strong>Fast · Hover</strong>
              <code>120ms</code>
              <div style="display:flex;align-items:center;gap:10px;color:var(--pj-color-dark-2);font-size:12px;">
                <span style="display:inline-block;width:24px;height:6px;background:var(--pj-color-primary);border-radius:3px;"></span>
                <code>ease-out</code> · 호버, 포커스, 작은 토글
              </div>
            </div>
            <div class="ds-motion-row">
              <strong>Default · UI</strong>
              <code>180ms</code>
              <div style="display:flex;align-items:center;gap:10px;color:var(--pj-color-dark-2);font-size:12px;">
                <span style="display:inline-block;width:48px;height:6px;background:var(--pj-color-primary);border-radius:3px;"></span>
                <code>ease</code> · 토스트, 드롭다운, 탭 전환
              </div>
            </div>
            <div class="ds-motion-row">
              <strong>Smooth · Surface</strong>
              <code>280ms</code>
              <div style="display:flex;align-items:center;gap:10px;color:var(--pj-color-dark-2);font-size:12px;">
                <span style="display:inline-block;width:72px;height:6px;background:var(--pj-color-primary);border-radius:3px;"></span>
                <code>cubic-bezier(.4,0,.2,1)</code> · 모달, 드로어
              </div>
            </div>
            <div class="ds-motion-row">
              <strong>Slow · Page</strong>
              <code>420ms</code>
              <div style="display:flex;align-items:center;gap:10px;color:var(--pj-color-dark-2);font-size:12px;">
                <span style="display:inline-block;width:120px;height:6px;background:var(--pj-color-primary);border-radius:3px;"></span>
                <code>cubic-bezier(.16,1,.3,1)</code> · 페이지 전환, 히어로 인트로
              </div>
            </div>
          </div>
        </section>

        <section class="ds-section" id="z-index">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Z-Index Scale</h2>
              <p class="ds-section__desc">레이어 충돌을 피하기 위한 표준 z-index 단계입니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-z-grid">
            <div class="ds-z-row"><strong>Base</strong><code>1</code><span>본문 콘텐츠 기본</span></div>
            <div class="ds-z-row"><strong>Dropdown</strong><code>1000</code><span>드롭다운, 셀렉트 메뉴</span></div>
            <div class="ds-z-row"><strong>Sticky</strong><code>1020</code><span>스티키 헤더, 서브 네비</span></div>
            <div class="ds-z-row"><strong>Fixed</strong><code>1030</code><span>플로팅 버튼, 고정 UI</span></div>
            <div class="ds-z-row"><strong>Modal backdrop</strong><code>1040</code><span>모달/드로어 백드롭</span></div>
            <div class="ds-z-row"><strong>Modal</strong><code>1050</code><span>모달, 드로어 콘텐츠</span></div>
            <div class="ds-z-row"><strong>Popover</strong><code>1070</code><span>팝오버, 컨텍스트 메뉴</span></div>
            <div class="ds-z-row"><strong>Tooltip</strong><code>1080</code><span>툴팁</span></div>
            <div class="ds-z-row"><strong>Notification</strong><code>11000</code><span>알림 패널</span></div>
            <div class="ds-z-row"><strong>Toast</strong><code>12000</code><span>토스트 (최상위)</span></div>
          </div>
        </section>

        <section class="ds-section" id="breakpoints">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Breakpoints</h2>
              <p class="ds-section__desc">반응형 디자인의 기준점입니다. 모바일 우선으로 작성해 주세요.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>
          <div class="ds-bp-grid">
            <div class="ds-bp"><strong>Mobile</strong><code>&lt; 768px</code><span>기본 모바일 레이아웃</span></div>
            <div class="ds-bp"><strong>Tablet</strong><code>≥ 768px</code><span>2단 레이아웃 시작</span></div>
            <div class="ds-bp"><strong>Desktop</strong><code>≥ 1024px</code><span>사이드바, 다단 그리드</span></div>
            <div class="ds-bp"><strong>Wide</strong><code>≥ 1280px</code><span>최대 컨테이너 1240px</span></div>
          </div>
        </section>

        <section class="ds-section" id="voice">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Voice & Tone</h2>
              <p class="ds-section__desc">픽제주의 카피는 가까운 친구가 제주 이야기를 들려주듯 따뜻하고 친근해야 합니다.</p>
            </div>
            <span class="ds-section__tag">Writing</span>
          </div>

          <div class="ds-tone-grid">
            <div class="ds-tone-card">
              <h4>찐친 톤</h4>
              <p>친구가 옆에서 알려주는 느낌으로. 정중한 존댓말을 유지하되 어렵지 않게 풀어 씁니다.</p>
              <div class="ds-tone-compare">
                <div class="ds-tone-do"><span class="ds-tone-tag">DO</span><span>오늘은 어디로 떠나볼까요? 픽제주가 알려드릴게요.</span></div>
                <div class="ds-tone-dont"><span class="ds-tone-tag">DON'T</span><span>고객님의 여행 계획 수립을 지원하는 서비스입니다.</span></div>
              </div>
            </div>
            <div class="ds-tone-card">
              <h4>간결하게</h4>
              <p>버튼·제목은 한 호흡, 본문도 한 문장은 25자 이내를 권장합니다.</p>
              <div class="ds-tone-compare">
                <div class="ds-tone-do"><span class="ds-tone-tag">DO</span><span>지금 가입하기</span></div>
                <div class="ds-tone-dont"><span class="ds-tone-tag">DON'T</span><span>회원가입을 진행해 주시기 바랍니다</span></div>
              </div>
            </div>
            <div class="ds-tone-card">
              <h4>긍정적인 안내</h4>
              <p>실패·에러도 비난하지 않고 다음 행동을 알려주는 톤으로 작성합니다.</p>
              <div class="ds-tone-compare">
                <div class="ds-tone-do"><span class="ds-tone-tag">DO</span><span>네트워크가 잠시 불안정해요. 다시 시도해 볼까요?</span></div>
                <div class="ds-tone-dont"><span class="ds-tone-tag">DON'T</span><span>오류가 발생했습니다. (Error 500)</span></div>
              </div>
            </div>
            <div class="ds-tone-card">
              <h4>제주다움</h4>
              <p>제주 방언/지명/문화를 자연스럽게 녹여 픽제주만의 결을 만듭니다(과도한 사용 X).</p>
              <div class="ds-tone-compare">
                <div class="ds-tone-do"><span class="ds-tone-tag">DO</span><span>제주 삼춘들이 추천하는 오늘의 핫스팟</span></div>
                <div class="ds-tone-dont"><span class="ds-tone-tag">DON'T</span><span>오늘의 추천 장소 모음</span></div>
              </div>
            </div>
          </div>
        </section>

        <section class="ds-section" id="a11y">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Accessibility</h2>
              <p class="ds-section__desc">WCAG 2.1 AA 기준의 텍스트/배경 컬러 페어링 가이드입니다. 본문 4.5:1, 큰 텍스트(18pt+) 3:1 이상을 유지합니다.</p>
            </div>
            <span class="ds-section__tag">Foundation</span>
          </div>

          <div class="ds-sub">Approved pairings</div>
          <div class="ds-pair-grid">
            <div class="ds-pair" style="background:#FFFFFF;color:#222222;border:1px solid var(--pj-color-guide-line);">
              <div class="ds-pair__text">제주살이 이야기</div>
              <div class="ds-pair__meta"><span>#222 on #FFF</span><span class="ds-pair__pass" style="background:#e6faef;color:#036a3e;">AAA 17.7:1</span></div>
            </div>
            <div class="ds-pair" style="background:var(--pj-color-primary);color:#FFFFFF;">
              <div class="ds-pair__text">픽제주와 함께</div>
              <div class="ds-pair__meta"><span>#FFF on #FF6633</span><span class="ds-pair__pass">AA 4.66:1</span></div>
            </div>
            <div class="ds-pair" style="background:var(--pj-color-primary-dark);color:#FFFFFF;">
              <div class="ds-pair__text">버튼 강조</div>
              <div class="ds-pair__meta"><span>#FFF on #DD572B</span><span class="ds-pair__pass">AA 5.34:1</span></div>
            </div>
            <div class="ds-pair" style="background:var(--pj-color-dark-1);color:#FFFFFF;">
              <div class="ds-pair__text">다크 영역</div>
              <div class="ds-pair__meta"><span>#FFF on #222</span><span class="ds-pair__pass">AAA 15.9:1</span></div>
            </div>
            <div class="ds-pair" style="background:var(--pj-color-secondary-dark);color:#FFFFFF;">
              <div class="ds-pair__text">새 알림 배지</div>
              <div class="ds-pair__meta"><span>#FFF on #01BF60</span><span class="ds-pair__pass">AA 3.06:1 (Large)</span></div>
            </div>
            <div class="ds-pair" style="background:#FFFFFF;color:var(--pj-color-primary-dark);border:1px solid var(--pj-color-guide-line);">
              <div class="ds-pair__text">링크 텍스트</div>
              <div class="ds-pair__meta"><span>#DD572B on #FFF</span><span class="ds-pair__pass" style="background:#e6faef;color:#036a3e;">AA 4.83:1</span></div>
            </div>
          </div>

          <div class="ds-sub">Focus & keyboard</div>
          <div class="ds-preview">
            <div style="display:grid;gap:14px;">
              <div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
                <button type="button" class="pj-button pj-button--primary pj-button--md" style="box-shadow:var(--pj-focus-ring);">포커스 링 노출</button>
                <span class="ds-field-help">키보드(Tab) 사용자에게는 항상 4px 포커스 링이 보여야 합니다.</span>
              </div>
              <ul style="margin:0;padding-left:18px;color:var(--pj-color-dark-2);font-size:13px;line-height:1.7;">
                <li>모든 인터랙티브 요소는 키보드만으로 도달·활성화 가능해야 합니다.</li>
                <li>모달이 열리면 첫 인터랙티브 요소로 포커스를 이동하고, 닫히면 호출 요소로 복귀합니다.</li>
                <li>이미지에는 의미 있는 <code>alt</code>를, 장식 이미지에는 <code>alt=""</code>을 사용합니다.</li>
                <li>아이콘 전용 버튼에는 <code>aria-label</code>을 반드시 부여합니다.</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="ds-section" id="brand">
          <div class="ds-section__head">
            <div>
              <h2 class="ds-section__title">Brand & Logo</h2>
              <p class="ds-section__desc">픽제주 워드마크 로고 변형과 사용 가이드입니다.</p>
            </div>
            <span class="ds-section__tag">Brand</span>
          </div>

          <div class="ds-sub">Logo variants</div>
          <div class="ds-logo-row">
            <div class="ds-logo-card ds-logo-card--light"><img src="/assets/images/logo.png" alt="픽제주 컬러 로고"></div>
            <div class="ds-logo-card ds-logo-card--dark"><img src="/assets/images/logo-w.png" alt="픽제주 흰색 로고"></div>
            <div class="ds-logo-card ds-logo-card--brand"><img src="/assets/images/logo-w.png" alt="픽제주 흰색 로고 (브랜드 배경)"></div>
            <div class="ds-logo-card ds-logo-card--light"><img src="/assets/images/logo-bk.png" alt="픽제주 단색(흑) 로고"></div>
          </div>

          <div class="ds-sub">Usage</div>
          <div class="ds-logo-meta">
            <div class="ds-logo-meta__item">
              <strong>Clear space</strong>
              <span>로고의 'p' 자체 높이만큼의 여백을 사방으로 확보해 주세요. 다른 요소와 겹치지 않도록 주의합니다.</span>
            </div>
            <div class="ds-logo-meta__item">
              <strong>Minimum size</strong>
              <span>웹 48px, 인쇄 12mm 이상으로 사용해 가독성을 보장해 주세요.</span>
            </div>
            <div class="ds-logo-meta__item">
              <strong>Background</strong>
              <span>밝은 배경에는 컬러/단색 로고, 어두운 배경에는 화이트 로고, 브랜드 배경(Primary)에는 화이트 로고를 사용합니다.</span>
            </div>
          </div>

          <div class="ds-sub">Don't</div>
          <div class="ds-logo-dont">
            <div class="ds-logo-dont__card">
              <span class="ds-logo-dont__pill ds-logo-dont__pill--no">NO</span>
              <div class="ds-logo-dont__sample"><img src="/assets/images/logo.png" alt="" style="transform:scaleX(1.6);max-width:160px;"></div>
              <div class="ds-logo-dont__caption">비율을 임의로 늘리거나 줄이지 마세요.</div>
            </div>
            <div class="ds-logo-dont__card">
              <span class="ds-logo-dont__pill ds-logo-dont__pill--no">NO</span>
              <div class="ds-logo-dont__sample" style="background:#FFF7E6;border-radius:8px;"><img src="/assets/images/logo.png" alt="" style="max-width:120px;filter:hue-rotate(120deg);"></div>
              <div class="ds-logo-dont__caption">브랜드 컬러 외 다른 색상으로 변경하지 마세요.</div>
            </div>
            <div class="ds-logo-dont__card">
              <span class="ds-logo-dont__pill ds-logo-dont__pill--no">NO</span>
              <div class="ds-logo-dont__sample" style="background:#999;border-radius:8px;"><img src="/assets/images/logo.png" alt="" style="max-width:120px;opacity:0.5;"></div>
              <div class="ds-logo-dont__caption">대비가 낮은 배경 위에 사용하지 마세요.</div>
            </div>
            <div class="ds-logo-dont__card">
              <span class="ds-logo-dont__pill ds-logo-dont__pill--no">NO</span>
              <div class="ds-logo-dont__sample"><img src="/assets/images/logo.png" alt="" style="max-width:120px;transform:rotate(-12deg);"></div>
              <div class="ds-logo-dont__caption">로고를 회전시키지 마세요.</div>
            </div>
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
  <div id="ds-copy-toast" class="ds-copy-toast" role="status" aria-live="polite">복사되었어요</div>
</main>
<script>
(function () {
  if (typeof document === 'undefined') return;
  function init() {
    var toast = document.getElementById('ds-copy-toast');
    var hideTimer;
    function showToast(text) {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add('is-show');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 1500);
    }
    function fallbackCopy(text) {
      var area = document.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.left = '-9999px';
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); } catch (_e) {}
      document.body.removeChild(area);
    }
    function copy(text) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
      } else {
        fallbackCopy(text);
      }
    }
    document.addEventListener('click', function (event) {
      var target = event.target.closest('[data-copy]');
      if (!target) return;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' && target.type === 'submit') return;
      var value = target.getAttribute('data-copy');
      if (!value) return;
      event.preventDefault();
      copy(value);
      showToast('복사 · ' + value);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
</script>
`;
}
