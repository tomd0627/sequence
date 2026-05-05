export function initFontAxes() {
  const paragraphs = document.querySelectorAll(".section__text > p");
  if (!paragraphs.length) return;

  let scheduled = false;

  function update() {
    scheduled = false;
    const vh = window.innerHeight;
    const mid = vh / 2;

    paragraphs.forEach((p) => {
      const rect = p.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const proximity = 1 - Math.min(1, Math.abs(center - mid) / mid);
      const opsz = (12 + proximity * 6).toFixed(1);
      p.style.setProperty("--p-opsz", opsz);
    });
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );

  update();
}
