# Séquence — Codebase Guide

## Project

Pressmark: a single-page scroll-driven editorial essay built in vanilla HTML/CSS/JS.
No framework, no bundler. Deployed to Netlify with `publish = "src"`.

## Stack

- HTML5, CSS (with native nesting), ES Modules
- CSS scroll-driven animations (`animation-timeline`)
- Intersection Observer for section state
- Variable fonts: Fraunces (wght/SOFT/opsz), Newsreader (wght/opsz), DM Mono
- Pre-commit: Husky + lint-staged + Prettier + ESLint + Stylelint

## File Structure

```
src/
├── index.html          — single document, all sections
├── css/
│   ├── tokens.css      — all CSS custom properties
│   ├── reset.css       — modern minimal reset
│   ├── typography.css  — @font-face + type scale
│   ├── layout.css      — grid, containers, header, hero, sections
│   ├── components.css  — dropcap, pullquote, figure, hr
│   ├── sections.css    — per-section background overrides
│   ├── animations.css  — scroll-driven + IO-triggered animations
│   └── reduced-motion.css — prefers-reduced-motion kill-switch
├── js/
│   ├── main.js         — entry point, adds .js-enabled to <html>
│   ├── nav.js          — header scroll state (.is-scrolled)
│   ├── observer.js     — IO: .is-visible class on .essay-section
│   └── font-axes.js    — scroll → --p-opsz CSS custom property
└── assets/
    ├── fonts/          — self-hosted woff2 variable fonts
    └── images/         — WebP + AVIF pairs (added in Phase 4)
```

## CSS Architecture

- All values via custom properties in `tokens.css`
- Logical properties throughout (`margin-inline`, `padding-block`, etc.)
- Native CSS nesting — no PostCSS
- Property order: recess-order (position → box model → typography → visual → animation)
- No vendor prefixes for properties supported in last 2 major evergreen browsers

## JS Architecture

- ES modules only (type="module")
- JS communicates to CSS via `element.style.setProperty("--custom-prop", value)` — never writes `fontVariationSettings` inline (preserves strict CSP)
- `document.documentElement.classList.add("js-enabled")` in main.js — animation initial states should be scoped to `.js-enabled` for no-JS graceful degradation

## Variable Font Axes

| Font | Axes | Used for |
|---|---|---|
| Fraunces | `wght` 100–900, `SOFT` 0–100, `opsz` 9–144 | Headlines, dropcaps, pullquotes |
| Newsreader | `wght` 200–800, `opsz` 6–72 | All body text |
| DM Mono | fixed 400 | Captions, section numbers, labels |

Fraunces scroll animation: `wght` 200→700, `SOFT` 0→20, `opsz` 9→48 via `animation-timeline: view(block)`.
Newsreader scroll effect: `opsz` 12→18 via `--p-opsz` custom property set by `font-axes.js`.

## Phases

1. Pre-code declaration — DONE
2. Core HTML/CSS scaffold — DONE
3. Scroll animations + variable font transitions — pending
4. Final editorial pass (copy, images, favicon) — pending
5. Pre-commit tooling (Husky, ESLint, Stylelint, Prettier) — pending
6. Recruiter audit + pre-deploy (Lighthouse) + README — pending

## Commands

```bash
npx serve src -l 3000           # local dev server
npm run lint                    # run all linters
npm run format                  # format all files
npm run lighthouse              # Lighthouse CLI audit (requires dev server)
```
