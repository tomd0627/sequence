const IO_OPTIONS = {
  rootMargin: "-10% 0px -10% 0px",
  threshold: [0, 0.3, 0.6],
};

export function initSectionObserver() {
  const sections = document.querySelectorAll(".essay-section");
  const navLinks = document.querySelectorAll(".section-nav a");

  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
      if (entry.isIntersecting) entry.target.classList.add("has-been-visible");

      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.setAttribute(
            "aria-current",
            link.getAttribute("href") === `#${id}` ? "true" : "false",
          );
        });
      }
    });
  }, IO_OPTIONS);

  sections.forEach((section) => observer.observe(section));
}
