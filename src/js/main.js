import { initNav } from "./nav.js";
import { initSectionObserver } from "./observer.js";
import { initReadingProgress } from "./progress.js";

function init() {
  document.documentElement.classList.add("js-enabled");
  initNav();
  initSectionObserver();
  initReadingProgress();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
