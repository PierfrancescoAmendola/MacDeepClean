// Fill in once the app is live (App Store Connect › App Information › Apple ID), e.g. "https://apps.apple.com/app/id1234567890".
const APP_STORE_URL = "";

(function () {
  const root = document.documentElement;
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  const browser = (navigator.language || "en").toLowerCase().startsWith("it") ? "it" : "en";
  setLang(saved || browser);

  function setLang(lang) {
    root.lang = lang;
    document.querySelectorAll("[data-title-" + lang + "]").forEach(function (el) {
      document.title = el.getAttribute("data-title-" + lang);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLang(root.lang);
    document.querySelectorAll(".lang-switch").forEach(function (button) {
      button.addEventListener("click", function () {
        const next = root.lang === "it" ? "en" : "it";
        try { localStorage.setItem("lang", next); } catch (e) {}
        setLang(next);
      });
    });
    document.querySelectorAll("[data-appstore]").forEach(function (link) {
      if (APP_STORE_URL) {
        link.href = APP_STORE_URL;
      } else {
        link.removeAttribute("href");
        link.classList.add("soon");
        link.querySelectorAll("[data-label]").forEach(function (label) {
          label.textContent = label.lang === "it" ? "Presto sul Mac App Store" : "Coming soon to the Mac App Store";
        });
      }
    });
    const year = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });
  });
})();
