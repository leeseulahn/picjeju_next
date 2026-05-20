import { notFound } from "next/navigation";
import { pages } from "../../src/generated/page-content";

function escapeInvalidAngleText(html) {
  return html.replace(/<([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})>/gi, "&lt;$1&gt;");
}

function getWriteCategoryQuery(pageKey) {
  const defaults = {
    event: "?primary=community-event",
    "event-calendar": "?primary=community-event",
    "board-news": "?primary=jeju-life-news&sub=jeju-news",
    "board-view": "?primary=jeju-life-news&sub=jeju-news",
    community: "?primary=jeju-life-news",
    "community-event": "?primary=community-event",
    "community-friends": "?primary=picjeju-friends",
    "community-tip": "?primary=community-tip",
    "single-view": "?primary=community-tip",
    "board-market": "?primary=market&sub=sale",
    "point-exchange": "?primary=point-exchange&sub=point-buy"
  };

  return defaults[pageKey] || "";
}

const writeButtonPageKeys = new Set([
  "community-tip",
  "community-friends",
  "community-event",
  "board-market",
  "point-exchange"
]);

function hasFrontendWriteButton(html) {
  return (
    /\bclass=(["'])[^"']*\bboard-write\b[^"']*\1/.test(html) ||
    /\bdata-pj-href=(["'])[^"']*\/pages\/board-write\.html[^"']*\1/.test(html)
  );
}

function findMatchingClosingDiv(html, startIndex) {
  const tagPattern = /<\/?div\b[^>]*>/gi;
  tagPattern.lastIndex = startIndex;
  let depth = 0;
  let match;

  while ((match = tagPattern.exec(html))) {
    const tag = match[0];
    if (/^<div\b/i.test(tag)) {
      depth += 1;
      continue;
    }

    depth -= 1;
    if (depth === 0) {
      return { start: match.index, end: tagPattern.lastIndex };
    }
  }

  return null;
}

function injectFrontendWriteButton(html, pageKey) {
  if (!writeButtonPageKeys.has(pageKey) || hasFrontendWriteButton(html)) return html;

  const pageWrapMatch = /<div\b[^>]*\bid=(["'])page-wrap\1[^>]*>/i.exec(html);
  if (!pageWrapMatch) return html;

  const closeTag = findMatchingClosingDiv(html, pageWrapMatch.index);
  if (!closeTag) return html;

  const writeHref = `/pages/board-write.html${getWriteCategoryQuery(pageKey)}`;
  const writeButton = `\r\n                <div class="board-write">\r\n                    <button type="button" class="pj-button pj-button--primary pj-button--md" data-pj-href="${writeHref}">&#44544;&#50416;&#44592;</button>\r\n                </div>`;

  return `${html.slice(0, closeTag.start)}${writeButton}${html.slice(closeTag.start)}`;
}

function fillFindPasswordTab(html, pageKey) {
  if (pageKey !== "find" || html.includes("비밀번호를 찾을 방법을 선택해 주세요.")) return html;

  const passwordContent = `
                            <div class="find-id">
                                <div class="title">비밀번호를 찾을 방법을 선택해 주세요.</div>
                                <div class="pj-button--wrap">
                                    <button class="pj-button pj-button--lg pj-button--primary" type="button">가입한 이메일로 찾기</button>
                                    <button type="button" class="pj-button pj-button--lg pj-button--primary">가입한 휴대폰번호로 찾기</button>
                                    <button type="button" class="pj-button pj-button--lg pj-button--primary">휴대폰 본인인증</button>
                                    <button type="button" class="pj-button pj-button--lg pj-button--primary">간편 본인인증</button>
                                </div>
                            </div>
                            <div class="find-info">
                                <div class="title">안내사항</div>
                                <ul>
                                    <li>가입 시 등록한 아이디와 이메일 또는 휴대폰번호로 비밀번호를 재설정할 수 있습니다.</li>
                                    <li>본인 확인 후 임시 비밀번호 또는 비밀번호 재설정 안내가 발송됩니다.</li>
                                    <li>비밀번호를 찾지 못하셨을 경우 고객센터(010-4443-1492)로 문의해 주세요.</li>
                                </ul>
                            </div>`;

  return html.replace(
    /(<div class="pj-tab-pane pj-fade" id="pw-tab-pane"[^>]*>\s*)<\/div>/,
    `$1${passwordContent}\n                        </div>`
  );
}

function fixPointExchangeLinks(html) {
  return html.replace(
    /(<a\b[^>]*href=(["']))((?:pages\/)?board-news\.html)(\2[^>]*>\s*픽포인트 거래소\s*<\/a>)/g,
    (_match, beforeHref, _quote, href, afterHref) => {
      const nextHref = href.startsWith("pages/") ? "pages/point-exchange.html" : "point-exchange.html";
      return `${beforeHref}${nextHref}${afterHref}`;
    }
  );
}

function wireFrontendWriteButtons(html, pageKey) {
  const linkedHtml = fillFindPasswordTab(injectFrontendWriteButton(fixPointExchangeLinks(html), pageKey), pageKey);
  const writeHref = `/pages/board-write.html${getWriteCategoryQuery(pageKey)}`;

  return linkedHtml.replace(/<button\b([^>]*)>(\s*글쓰기\s*)<\/button>/g, (match, attributes, label) => {
    const nextAttributes = attributes.replace(/\sdata-pj-href=(["']).*?\1/g, "");
    return `<button${nextAttributes} data-pj-href="${writeHref}">${label}</button>`;
  });
}

function splitMain(html) {
  const mainStart = html.indexOf("<main");
  const mainEnd = html.indexOf("</main>", mainStart);

  if (mainStart < 0 || mainEnd < 0) {
    return { beforeMain: "", afterMain: "" };
  }

  return {
    beforeMain: html.slice(0, mainStart),
    afterMain: html.slice(mainEnd + "</main>".length)
  };
}

function getBoardWriteHtml() {
  const { beforeMain, afterMain } = splitMain(pages["board-news"]?.body || "");

  return `${beforeMain}
<main class="board-write-page">
  <section>
    <div class="page-title">
      <p>커뮤니티</p>
      <h3>게시글 작성</h3>
    </div>

    <div class="pj-container front-board-write__container">
      <div class="front-board-write__layout">
        <div class="front-board-write__main">
      <form id="frontBoardWriteForm" class="front-board-write" data-board-write-form data-endpoint="/api/posts" novalidate>
        <div class="front-board-write__panel">
          <div class="front-board-write__grid">
            <div class="front-board-write__field front-board-write__col--4">
              <label class="pj-label pj-u-fw-bold" for="boardPrimaryCategory">게시판 <span class="pj-u-text-primary">*</span></label>
              <select id="boardPrimaryCategory" name="primaryCategory" class="pj-field" required data-board-primary-category>
                <option value="">선택하세요</option>
                <option value="jeju-life-news">제주살이 뉴스</option>
                <option value="community-tip">제주살이 꿀팁</option>
                <option value="picjeju-friends">픽제주 친구들</option>
                <option value="community-event">이벤트</option>
                <option value="market">장터</option>
                <option value="point-exchange">픽포인트 거래소</option>
              </select>
            </div>
            <div class="front-board-write__field front-board-write__col--4">
              <label class="pj-label pj-u-fw-bold" for="boardSubCategory">카테고리 <span class="pj-u-text-primary">*</span></label>
              <select id="boardSubCategory" name="subCategory" class="pj-field" required data-board-sub-category>
                <option value="">선택하세요</option>
              </select>
            </div>
            <input id="boardCategory" name="category" type="hidden" value="">
            <div class="front-board-write__field front-board-write__field--switch front-board-write__col--2">
              <span class="pj-label pj-u-fw-bold">공지사항</span>
              <div class="front-board-write__switch">
                <input class="front-board-write__switch-input" type="checkbox" id="boardNotice" name="notice">
                <label class="front-board-write__switch-label" for="boardNotice">공지</label>
              </div>
            </div>
            <div class="front-board-write__field front-board-write__field--switch front-board-write__col--2">
              <span class="pj-label pj-u-fw-bold">노출</span>
              <div class="front-board-write__switch">
                <input class="front-board-write__switch-input" type="checkbox" id="boardVisible" name="visible" checked>
                <label class="front-board-write__switch-label" for="boardVisible">공개</label>
              </div>
            </div>

            <div class="front-board-write__field front-board-write__col--12">
              <label class="pj-label pj-u-fw-bold" for="boardTitle">제목 <span class="pj-u-text-primary">*</span></label>
              <input id="boardTitle" name="title" class="pj-field" type="text" placeholder="제목을 입력해 주세요." required>
            </div>

            <div class="front-board-write__field front-board-write__col--6">
              <label class="pj-label pj-u-fw-bold" for="boardStart">시작일 <span class="pj-u-text-primary">*</span></label>
              <input id="boardStart" name="startDate" class="pj-field" type="date" required>
            </div>
            <div class="front-board-write__field front-board-write__col--6">
              <label class="pj-label pj-u-fw-bold" for="boardEnd">종료일 <span class="pj-u-text-primary">*</span></label>
              <input id="boardEnd" name="endDate" class="pj-field" type="date" required>
            </div>

            <div class="front-board-write__field front-board-write__col--6">
              <label class="pj-label pj-u-fw-bold" for="boardVenue">장소 <span class="pj-u-text-primary">*</span></label>
              <div class="front-board-write__address">
                <input id="boardVenue" name="venue" class="pj-field" type="text" placeholder="주소를 입력하세요" readonly required>
                <button type="button" class="pj-button pj-button--line pj-button--md" id="btnFindAddress">
                  <i class="ri-map-pin-line" aria-hidden="true"></i> 주소찾기
                </button>
              </div>
            </div>
            <div class="front-board-write__field front-board-write__col--6">
              <label class="pj-label pj-u-fw-bold" for="boardContact">문의</label>
              <input id="boardContact" name="contact" class="pj-field" type="text" placeholder="(064)782-9898">
            </div>

            <div class="front-board-write__field front-board-write__col--12">
              <label class="pj-label pj-u-fw-bold" for="boardThumbnail">썸네일 이미지</label>
              <div class="front-board-write__uploader">
                <label class="pj-button pj-button--gray pj-button--md" for="boardThumbnail">이미지 선택</label>
                <input id="boardThumbnail" name="thumbnail" class="pj-visually-hidden" type="file" accept="image/*">
                <div class="front-board-write__thumb" data-board-thumb-preview aria-live="polite"></div>
              </div>
            </div>

            <div class="front-board-write__field front-board-write__col--12">
              <label class="pj-label pj-u-fw-bold" for="boardEditor">상세 설명 <span class="pj-u-text-primary">*</span></label>
              <div class="front-editor front-editor--toast" data-board-editor>
                <div id="boardEditorFallback" class="front-editor__fallback" data-editor-fallback hidden>
                  <textarea class="pj-field" rows="10" placeholder="에디터 로딩 실패시 내용을 입력해 주세요."></textarea>
                </div>
                <div id="boardEditor" class="front-editor__toast" data-editor-body data-placeholder="상세 설명을 작성해 주세요."></div>
                <textarea name="content" class="pj-visually-hidden" data-editor-output required></textarea>
              </div>
            </div>

            <div class="front-board-write__field front-board-write__col--6">
              <label class="pj-label pj-u-fw-bold" for="boardDetailUrl">자세히보기 링크</label>
              <input id="boardDetailUrl" name="detailUrl" class="pj-field" type="url" inputmode="url" placeholder="https://example.com/detail">
            </div>
            <div class="front-board-write__field front-board-write__col--6">
              <label class="pj-label pj-u-fw-bold" for="boardApplyUrl">신청하기 링크</label>
              <input id="boardApplyUrl" name="applyUrl" class="pj-field" type="url" inputmode="url" placeholder="https://example.com/apply">
            </div>

            <div class="front-board-write__field front-board-write__col--12">
              <label class="pj-label pj-u-fw-bold" for="boardTags">태그</label>
              <input id="boardTags" name="tags" class="pj-field" type="text" placeholder="쉼표로 구분: 제주, 가족, 무료">
            </div>
          </div>

          <div class="front-board-write__footer">
            <p class="front-board-write__note">새 게시물을 작성합니다.</p>
          <div class="front-board-write__actions">
            <div class="front-board-write__actions-left">
                <button type="button" class="pj-button pj-button--line pj-button--md" data-board-preview>
                  <i class="ri-external-link-line" aria-hidden="true"></i> 미리보기
                </button>
            </div>
            <div class="front-board-write__actions-right">
                <button type="button" class="pj-button pj-button--gray pj-button--md" data-board-cancel>취소</button>
                <button type="button" class="pj-button pj-button--line pj-button--md" data-board-draft>임시저장</button>
                <button type="submit" class="pj-button pj-button--primary pj-button--md">
                  <i class="ri-save-3-line" aria-hidden="true"></i> 저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
        </div>

        <aside class="front-board-write__aside" aria-label="글쓰기 도움말">
          <div class="front-board-write__help">
            <strong>도움말</strong>
            <p>· 제목/기간은 필수입니다.<br>· 썸네일은 목록 카드에 표시됩니다.<br>· 저장 후 목록으로 이동합니다.</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</main>
${afterMain}`;
}

function getPointExchangeHtml() {
  const { beforeMain, afterMain } = splitMain(pages["board-market"]?.body || "");

  return `${fixPointExchangeLinks(beforeMain)}
<main>
    <section>
        <div class="page-title">
            <p>커뮤니티</p>
            <h3>픽포인트 거래소</h3>
        </div>

        <div class="category-wrap">
            <ul>
                <li><a href="point-exchange.html" class="active">전체</a></li>
                <li><a href="point-exchange.html?category=buy">구해요</a></li>
                <li><a href="point-exchange.html?category=sell">팔아요</a></li>
                <li><a href="point-exchange.html?category=done">거래완료</a></li>
            </ul>
        </div>

        <div class="pj-container">
            <div class="page-pb-48">
                <div id="market-main" data-aos="fade-up" data-aos-duration="800">
                    <div class="sort">
                        <div class="pj-dropdown">
                            <button class="pj-button pj-dropdown-toggle" data-pj-toggle="dropdown">정렬</button>
                            <ul class="pj-dropdown-menu">
                                <li><a class="pj-dropdown-item" href="point-exchange.html?sort=latest">최신순</a></li>
                                <li><a class="pj-dropdown-item" href="point-exchange.html?sort=views">조회수순</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="list">
                        <ul>
                            <li class="notice">
                                <a href="board-view.html">
                                    <div class="left">
                                        <div class="num"><img src="../assets/images/svg/icon_notice_or.svg" alt="notice"></div>
                                        <div class="title">
                                            <div class="category"><span class="notice">공지</span></div>
                                            <span>픽포인트 거래소 이용 전 필독 공지</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="meta-l">
                                            <div class="author">물비늘</div>
                                            <div class="date">2025.08.28</div>
                                        </div>
                                        <div class="meta-r">
                                            <div class="view number">9999</div>
                                            <div class="reply number">999</div>
                                        </div>
                                    </div>
                                </a>
                            </li>

                            ${Array.from({ length: 8 }, (_, index) => {
                              const isSell = index % 2 === 0;
                              const status = index === 5 ? "거래완료" : isSell ? "팔아요" : "구해요";
                              const className = index === 5 ? "green" : isSell ? "yellow" : "blue";
                              const amount = [5000, 10000, 3000, 20000, 7000, 15000, 12000, 9000][index];
                              return `
                            <li>
                                <a href="board-view.html">
                                    <div class="left">
                                        <div class="thumbnail">
                                            <img src="../assets/remote/${isSell ? "433656892a6065896ed70f67e353808c73be2e59.jpeg" : "947e181736445396e260d57b7c35204e23fecd8a.png"}" alt="">
                                        </div>
                                        <div class="title">
                                            <div class="category"><span class="${className}">${status}</span></div>
                                            <span>${amount.toLocaleString("ko-KR")} Pic ${isSell ? "양도합니다" : "구합니다"}</span>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="meta-l">
                                            <div class="author">${index % 3 === 0 ? "물비늘" : "픽제주"}</div>
                                            <div class="date">2025.08.28</div>
                                        </div>
                                        <div class="meta-r">
                                            <div class="view number">${128 + index}</div>
                                            <div class="reply number">${index + 1}</div>
                                        </div>
                                    </div>
                                </a>
                            </li>`;
                            }).join("")}
                        </ul>
                    </div>
                </div>
            </div>

            <div id="page-wrap">
                <div class="page-nav">
                    <div>
                        <ul>
                            <li class="prev"><a href="#">이전</a></li>
                            <li><a href="#" class="active">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li class="next"><a href="#">다음</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="list-back pj-u-d-flex pj-u-justify-content-end pj-u-mt-4">
                <button type="button" class="pj-button pj-button--primary pj-button--md" data-pj-href="/pages/board-write.html?primary=point-exchange&sub=point-buy">글쓰기</button>
            </div>
        </div>
    </section>
</main>
${fixPointExchangeLinks(afterMain)}`;
}

function normalizeSegment(value) {
  return String(value || "").replace(/\.html$/i, "");
}

async function resolveRoute(paramsPromise) {
  const params = await paramsPromise;
  const segments = Array.isArray(params?.path) ? params.path : [];

  if (segments.length === 0) {
    return { key: "index", page: pages.index };
  }

  if (segments.length === 1) {
    const key = normalizeSegment(segments[0]);
    if (key === "index") return { key: "index", page: pages.index };
    if (key === "board-write") {
      return {
        key,
        page: {
          title: "픽제주 - 게시글 작성",
          description: "픽제주 프론트 게시글 작성",
          keywords: "픽제주, 게시글, 글쓰기",
          body: getBoardWriteHtml()
        }
      };
    }
    if (key === "point-exchange") {
      return {
        key,
        page: {
          title: "픽제주 - 픽포인트 거래소",
          description: "픽포인트를 사고팔 수 있는 픽제주 거래소",
          keywords: "픽제주, 픽포인트, 거래소",
          body: getPointExchangeHtml()
        }
      };
    }
    return pages[key] ? { key, page: pages[key] } : null;
  }

  if (segments.length === 2 && segments[0] === "pages") {
    const key = normalizeSegment(segments[1]);
    if (key === "board-write") {
      return {
        key,
        page: {
          title: "픽제주 - 게시글 작성",
          description: "픽제주 프론트 게시글 작성",
          keywords: "픽제주, 게시글, 글쓰기",
          body: getBoardWriteHtml()
        }
      };
    }
    if (key === "point-exchange") {
      return {
        key,
        page: {
          title: "픽제주 - 픽포인트 거래소",
          description: "픽포인트를 사고팔 수 있는 픽제주 거래소",
          keywords: "픽제주, 픽포인트, 거래소",
          body: getPointExchangeHtml()
        }
      };
    }
    return pages[key] ? { key, page: pages[key] } : null;
  }

  return null;
}

export async function generateMetadata({ params }) {
  const route = await resolveRoute(params);
  const page = route?.page;

  if (!page) {
    return {};
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const logoUrl = new URL("/assets/images/logo.png", siteUrl).toString();

  return {
    metadataBase: new URL(siteUrl),
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    authors: [{ name: "랄라고고 주식회사" }],
    openGraph: {
      type: "website",
      title: page.title,
      description: page.description,
      images: [logoUrl]
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [logoUrl]
    }
  };
}

export default async function StaticPage({ params }) {
  const route = await resolveRoute(params);
  const page = route?.page;

  if (!page) {
    notFound();
  }

  const html = route.key === "board-write" ? page.body : wireFrontendWriteButtons(page.body, route.key);

  return (
    <div
      id="pj-next-page"
      style={{ display: "contents" }}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: escapeInvalidAngleText(html) }}
    />
  );
}
