# Séquence — Handoff

## Current Phase

**Phase 2 — Core HTML/CSS Scaffold — COMPLETE**

## What Was Just Completed

All Phase 2 deliverables are in place and verified against a local dev server:

- **Directory structure**: `src/css/`, `src/js/`, `src/assets/fonts/`, `src/assets/images/`
- **Self-hosted fonts**: 10 woff2 variable font files downloaded to `src/assets/fonts/` — Fraunces (normal + italic × latin + latin-ext), Newsreader (same), DM Mono (latin + latin-ext)
- **CSS design system**: 8 files — tokens, reset, typography, layout, components, sections, animations, reduced-motion
- **HTML document**: `src/index.html` — complete 6-section essay with final headings, deck lines, ~5 paragraphs per section, and all structural markup
- **JS modules**: `main.js`, `nav.js`, `observer.js`, `font-axes.js` — all functional
- **Favicon**: `src/favicon.svg` — section-sign §, vermilion on paper
- **CLAUDE.md**: codebase documentation

## The Exact Next Task

**Phase 3 — Scroll-driven Animations and Variable Font Transitions**

The CSS animations are already written (`animations.css`) and the JS modules are functional stubs. Phase 3 is about verifying, refining, and enhancing:

1. Verify CSS `animation-timeline: view(block)` is working for section heading bloom (wght 200→700, SOFT 0→20, opsz 9→48)
2. Verify reading progress bar scaleX animation
3. Verify HR rule draw animation
4. Enhance `font-axes.js` opsz scroll proximity effect
5. Test `prefers-reduced-motion` kill-switch
6. Add `@supports (animation-timeline: scroll())` graceful fallback for non-supporting browsers
7. Test keyboard navigation and focus indicators
8. Open in browser and verify all animations render correctly

## Decisions Made This Session

1. **Named grid with `min(measure, 100%)`**: Used `1fr` for the text column (not `min(65ch, 100%)`) because it's simpler and the `max-inline-size: var(--measure)` on `.section__text` achieves the same result
2. **Section figures layout**: On mobile, figures go below text in document flow; on desktop (≥64rem), they float to the `wide` column via CSS grid row-pinning (`grid-row: 1`)
3. **JS-gated animations**: Hero title and section figure reveals are scoped to `.js-enabled` (set by `main.js`) to prevent invisible content if JS fails
4. **Font axis via CSS custom property**: `font-axes.js` sets `--p-opsz` via `element.style.setProperty()` rather than writing `fontVariationSettings` inline — keeps CSP `style-src 'self'` strict
5. **Newsreader italic**: Using the true italic @font-face file for pullquotes — not attempting to use a continuous ital axis (those axis files weren't separately available)
6. **Font download method**: Used Google Fonts API with Chrome user-agent to get stable CDN woff2 URLs, downloaded with curl

## Unfinished Work / Gotchas

- **No images yet**: `src/assets/images/` is empty. All 6 `<picture>`/`<img>` elements have correct markup but will show broken image icons until Phase 4
- **No pre-commit hooks yet**: `package.json` exists but `npm install` has not been run and Husky is not initialized — do this in Phase 5
- **CSS property order**: Written informally (not strictly recess-ordered) — Stylelint will flag violations in Phase 5 that need fixing
- **`animation-timeline` browser support**: CSS scroll-driven animations require Chrome 115+ / Firefox 110+ (behind flag) / Safari limited — add `@supports` check in Phase 3
- **Inline styles purged**: 5 instances of `style="..."` in the HTML were replaced with proper class selectors — CSP `style-src 'self'` will be applied in Phase 6
- **Server startup**: Use port 3001 if 3000 is in use: `npx serve src -l 3001`

## Remaining Phases

- **Phase 3** — Scroll-driven animations and variable font transitions (verify + refine)
- **Phase 4** — Final editorial pass: full copy expansion, image optimization (WebP/AVIF), favicon polish
- **Phase 5** — Pre-commit tooling: Husky + lint-staged + ESLint + Stylelint + Prettier
- **Phase 6** — Recruiter audit + pre-deploy audit (Lighthouse CLI) + netlify.toml + README
