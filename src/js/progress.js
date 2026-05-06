export function initReadingProgress() {
  const bar = document.querySelector(".reading-progress");
  if (!bar) return;

  function update() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.round((window.scrollY / scrollable) * 100) : 0;
    bar.setAttribute("aria-valuenow", progress);
  }

  window.addEventListener("scroll", update, { passive: true });
  update();
}
