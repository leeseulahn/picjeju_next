/*
 * aos-lite — minimal drop-in replacement for the AOS library.
 * Honors data-aos="fade-up" (only effect used by this project) plus
 * data-aos-delay and data-aos-duration via CSS custom properties.
 * Exposes window.AOS = { init, refresh, refreshHard } for legacy callers.
 */
(function () {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  var ANIMATE_CLASS = "aos-animate";
  var observer = null;
  var seen = new WeakSet();

  function applyVars(el) {
    var delay = el.getAttribute("data-aos-delay");
    var duration = el.getAttribute("data-aos-duration");
    if (delay) el.style.setProperty("--aos-delay", parseInt(delay, 10) + "ms");
    if (duration) el.style.setProperty("--aos-duration", parseInt(duration, 10) + "ms");
  }

  function reveal(el) {
    applyVars(el);
    // Force a reflow so the transition fires when toggling the class.
    void el.offsetWidth;
    el.classList.add(ANIMATE_CLASS);
  }

  function fallbackRevealAll() {
    document.querySelectorAll("[data-aos]").forEach(reveal);
  }

  function ensureObserver() {
    if (observer) return observer;
    if (!("IntersectionObserver" in window)) {
      fallbackRevealAll();
      return null;
    }
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
    return observer;
  }

  function observeAll() {
    var io = ensureObserver();
    if (!io) return;
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      if (seen.has(el)) return;
      seen.add(el);
      // Element already in viewport on first paint should animate immediately.
      var rect = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh && rect.bottom > 0) {
        reveal(el);
        return;
      }
      io.observe(el);
    });
  }

  function init() { observeAll(); }
  function refresh() { observeAll(); }
  function refreshHard() {
    if (observer) observer.disconnect();
    observer = null;
    seen = new WeakSet();
    document.querySelectorAll("[data-aos]").forEach(function (el) {
      el.classList.remove(ANIMATE_CLASS);
    });
    observeAll();
  }

  window.AOS = { init: init, refresh: refresh, refreshHard: refreshHard };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  // Catch elements added later during hydration / async swiper init.
  window.addEventListener("load", init);
  if ("MutationObserver" in window) {
    var hydrationObserver = new MutationObserver(function () { init(); });
    var startMO = function () {
      if (document.body) hydrationObserver.observe(document.body, { childList: true, subtree: true });
    };
    if (document.body) startMO();
    else document.addEventListener("DOMContentLoaded", startMO);
    // Stop watching after the page has stabilized.
    setTimeout(function () { hydrationObserver.disconnect(); }, 5000);
  }
})();
