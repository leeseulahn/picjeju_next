/*
 * Page loader — fades out the #pj-page-loader spinner once the document
 * is ready. Previously this lived as an inline <script> inside the chrome
 * HTML, which React warns about on the client. Moved to an external file
 * so it loads cleanly and Next.js stops complaining.
 */
(function () {
  if (typeof window === "undefined") return;
  var finished = false;

  function finishPageLoader() {
    if (finished || !document.body) return;
    finished = true;
    var loader = document.getElementById("pj-page-loader");
    document.body.classList.remove("pj-page-loading");
    document.body.classList.add("pj-page-loaded");
    if (loader) {
      loader.setAttribute("aria-hidden", "true");
      window.setTimeout(function () {
        if (loader.parentNode) loader.parentNode.removeChild(loader);
      }, 520);
    }
  }

  window.addEventListener("load", function () {
    window.setTimeout(finishPageLoader, 380);
  }, { once: true });

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) finishPageLoader();
  });

  window.setTimeout(finishPageLoader, 3600);
})();
