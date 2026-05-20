export const runtime = "nodejs";

const PICKJEJU_CATEGORIES = {
  "jeju-life-news": [
    "jeju-news",
    "youth-support",
    "jeju-jobs"
  ],
  "community-tip": [
    "community-tip"
  ],
  "picjeju-friends": [
    "picjeju-friends"
  ],
  "community-event": [
    "community-event"
  ],
  market: [
    "talent-class",
    "giveaway",
    "sale"
  ],
  "point-exchange": [
    "point-buy",
    "point-sell",
    "point-done"
  ]
};

const PRIMARY_CATEGORY_ALIASES = {
  event: "community-event",
  community: "jeju-life-news",
  "board-news": "jeju-life-news",
  "community-friends": "picjeju-friends",
  "board-market": "market",
  "pickpoint-exchange": "point-exchange",
  "point-market": "point-exchange",
  point: "point-exchange"
};

const CATEGORY_ALIASES = {
  "board-news": "jeju-news",
  "youth-program": "youth-support",
  jobs: "jeju-jobs",
  tip: "community-tip",
  "picjeju-event": "community-event",
  event: "community-event",
  "community-friends": "picjeju-friends",
  friends: "picjeju-friends",
  "board-market": "sale",
  "market-sale": "sale",
  sharing: "giveaway",
  sell: "sale",
  "point-exchange": "point-buy",
  buy: "point-buy",
  "point-buy": "point-buy",
  "point-purchase": "point-buy",
  "point-wanted": "point-buy",
  "point-sale": "point-sell",
  "point-sell": "point-sell",
  done: "point-done",
  complete: "point-done",
  completed: "point-done",
  "point-done": "point-done",
  "trade-done": "point-done"
};

const POINT_EXCHANGE_CATEGORY_ALIASES = {
  "point-exchange": "point-buy",
  buy: "point-buy",
  sell: "point-sell",
  done: "point-done",
  complete: "point-done",
  completed: "point-done"
};

function normalizePrimaryCategory(value) {
  const key = String(value || "").trim();
  return PRIMARY_CATEGORY_ALIASES[key] || key;
}

function normalizeCategory(value, primaryValue = "") {
  const key = String(value || "").trim();
  if (primaryValue === "point-exchange") {
    return POINT_EXCHANGE_CATEGORY_ALIASES[key] || CATEGORY_ALIASES[key] || key;
  }
  return CATEGORY_ALIASES[key] || key;
}

function normalizeOptionalHttpUrl(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";

  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

function normalizeDate(value) {
  const trimmed = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return "";
  return Number.isNaN(Date.parse(`${trimmed}T00:00:00+09:00`)) ? "" : trimmed;
}

function normalizeBoolean(value, defaultValue = false) {
  if (value === null || value === undefined || value === "") return defaultValue;
  return ["1", "true", "on", "yes"].includes(String(value).trim().toLowerCase());
}

function normalizeTags(value) {
  return String(value || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function findPrimaryBySubCategory(subCategory) {
  return Object.entries(PICKJEJU_CATEGORIES).find(([, items]) => items.includes(subCategory))?.[0] || "";
}

export async function POST(request) {
  const formData = await request.formData();
  const title = String(formData.get("title") || "").trim();
  const requestedPrimaryCategory = normalizePrimaryCategory(formData.get("primaryCategory"));
  const subCategory = normalizeCategory(formData.get("subCategory") || formData.get("category"), requestedPrimaryCategory);
  const primaryCategory = findPrimaryBySubCategory(subCategory) || requestedPrimaryCategory;
  const category = subCategory;
  const content = String(formData.get("content") || "").trim();
  const startDate = normalizeDate(formData.get("startDate"));
  const endDate = normalizeDate(formData.get("endDate"));
  const venue = String(formData.get("venue") || "").trim();
  const contact = String(formData.get("contact") || "").trim();
  const tags = normalizeTags(formData.get("tags"));
  const notice = normalizeBoolean(formData.get("notice"));
  const visible = normalizeBoolean(formData.get("visible"), true);
  const detailUrl = normalizeOptionalHttpUrl(formData.get("detailUrl"));
  const applyUrl = normalizeOptionalHttpUrl(formData.get("applyUrl"));

  if (!title || !primaryCategory || !subCategory || !startDate || !endDate || !venue || !content) {
    return Response.json(
      { ok: false, message: "Required fields are missing." },
      { status: 400 }
    );
  }

  if (!PICKJEJU_CATEGORIES[primaryCategory]?.includes(subCategory)) {
    return Response.json(
      { ok: false, message: "Invalid category selection." },
      { status: 400 }
    );
  }

  if (endDate < startDate) {
    return Response.json(
      { ok: false, message: "Invalid date range." },
      { status: 400 }
    );
  }

  if (detailUrl === null || applyUrl === null) {
    return Response.json(
      { ok: false, message: "Invalid link URL." },
      { status: 400 }
    );
  }

  return Response.json({
    ok: true,
    id: Date.now(),
    title,
    primaryCategory,
    subCategory,
    category,
    startDate,
    endDate,
    venue,
    contact,
    tags,
    notice,
    visible,
    status: visible ? "published" : "private",
    detailUrl,
    applyUrl
  });
}
