import { initNav } from "./nav.js";
import { initSectionObserver } from "./observer.js";
import { initFontAxes } from "./font-axes.js";
import { initReadingProgress } from "./progress.js";

function init() {
  document.documentElement.classList.add("js-enabled");
  initNav();
  initSectionObserver();
  initFontAxes();
  initReadingProgress();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
