const SCROLL_THRESHOLD = 80;

export function initNav() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  }

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}
