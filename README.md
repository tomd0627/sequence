# Pressmark — Notes on the Typographic Page

A single-page scroll-driven editorial essay on the history of typography. Six sections from Gutenberg's press to variable fonts, built entirely in vanilla HTML, CSS, and JavaScript — no framework, no bundler.

---

## What this demonstrates

This project is a portfolio piece focused on platform-native CSS craft. If you're evaluating front-end capability, here's what to look for:

### Scroll-driven animations

All section animations use the CSS `animation-timeline` API — no JavaScript scroll listeners, no IntersectionObserver for the typography effects. Section headings bloom from light weight to bold as they enter the viewport; the reading progress bar tracks page position via `scroll(root block)`.

### Variable font control

Three variable fonts, three different control mechanisms:

- **Fraunces** (`wght`, `SOFT`, `opsz`) — animated entirely via CSS keyframes through `font-variation-settings`
- **Newsreader** (`opsz`) — driven by a JS `requestAnimationFrame` loop that sets a CSS custom property (`--p-opsz`) on each paragraph based on viewport proximity
- **DM Mono** — fixed weight, used for captions, labels, and navigation numbers

### CSS architecture

- All design tokens in `tokens.css` — one file controls the entire palette, type scale, spacing, and easing
- Native CSS nesting throughout — no PostCSS or Sass
- Logical properties (`margin-inline`, `padding-block`) for writing-mode compatibility
- Strict recess-order property ordering, enforced by Stylelint

### Accessibility

- Lighthouse Accessibility: **100**
- Skip-nav link, `aria-label` on all sections and nav items, `aria-current` updated by IntersectionObserver
- All scroll animations gated on `.js-enabled` — full content visible without JavaScript
- Complete `prefers-reduced-motion` kill-switch with explicit final states

### Performance

- Lighthouse Performance: **90** (local dev server, HTTP/1.1 — production with HTTP/2 CDN will be faster)
- Critical fonts preloaded (`fraunces-latin-normal.woff2`, `newsreader-latin-normal.woff2`)
- All fonts self-hosted — no Google Fonts, no CDN dependency
- `reduced-motion.css` loaded only for users who request it (`media="(prefers-reduced-motion: reduce)"`)

---

## Stack

| Layer   | Technology                                                         |
| ------- | ------------------------------------------------------------------ |
| Markup  | HTML5, semantic sectioning                                         |
| Styles  | CSS (native nesting, logical properties, scroll-driven animations) |
| Scripts | ES Modules, no dependencies                                        |
| Fonts   | Fraunces, Newsreader, DM Mono (variable, self-hosted woff2)        |
| Images  | Hand-coded SVG typographic specimens                               |
| Tooling | ESLint, Stylelint, Prettier, Husky, lint-staged                    |
| Deploy  | Netlify (`publish = "src"`, security headers in `netlify.toml`)    |

---

## Running locally

```bash
npm install
npx serve src -l 3000
```

No build step. Edit files in `src/`, refresh the browser.

## Linting

```bash
npm run lint      # ESLint + Stylelint + Prettier check
npm run format    # Prettier write
```

Pre-commit hook (Husky + lint-staged) runs automatically on `git commit`.

---

## File structure

```
src/
├── index.html            — single document, all six sections
├── css/
│   ├── tokens.css        — all custom properties
│   ├── reset.css         — modern minimal reset
│   ├── typography.css    — @font-face + base type styles
│   ├── layout.css        — header, hero, section grid, footer
│   ├── components.css    — dropcap, pullquote, figure, hr
│   ├── sections.css      — alternating section backgrounds
│   ├── animations.css    — scroll-driven + time-based animations
│   └── reduced-motion.css — prefers-reduced-motion overrides
├── js/
│   ├── main.js           — entry point, .js-enabled class
│   ├── nav.js            — header scroll state
│   ├── observer.js       — IntersectionObserver → .is-visible
│   ├── font-axes.js      — scroll → --p-opsz custom property
│   └── progress.js       — reading progress aria-valuenow
└── assets/
    ├── fonts/            — 10 woff2 variable font files
    └── images/           — 6 hand-coded SVG typographic specimens
```

---

## Lighthouse scores

| Category       | Score | Target |
| -------------- | ----- | ------ |
| Performance    | 90    | ≥ 90   |
| Accessibility  | 100   | 100    |
| Best Practices | 100   | ≥ 95   |
| SEO            | 100   | ≥ 95   |

_Measured on local dev server (HTTP/1.1). Production scores on Netlify with HTTP/2 and CDN will be higher._
