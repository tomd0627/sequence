import { initNav } from "./nav.js";
import { initSectionObserver } from "./observer.js";
import { initFontAxes } from "./font-axes.js";

function init() {
  document.documentElement.classList.add("js-enabled");
  initNav();
  initSectionObserver();
  initFontAxes();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
