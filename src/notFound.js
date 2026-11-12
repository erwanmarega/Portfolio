import "./assets/main.css";
import "./assets/not-found.css";
import en from "./data/locales/en.js";

if (/^\/en(\/|$)/.test(window.location.pathname)) {
  const texts = en.notFound;
  document.documentElement.lang = "en";
  document.title = texts.title;
  document.querySelectorAll("[data-t]").forEach((element) => {
    element.textContent = texts[element.dataset.t];
  });
  document.querySelector('a[data-t="back"]').setAttribute("href", "/en");
}
