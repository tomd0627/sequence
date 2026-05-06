# Pressmark — Handoff

Last updated: 2026-05-05. **Phases 1–4 complete. Phase 5 is next.**

---

## What this project is

A single-page scroll-driven editorial essay: *Pressmark: Notes on the Typographic Page*. Six sections covering typography history from Gutenberg to variable fonts. Built in vanilla HTML/CSS/JS — no framework, no bundler. Purpose: demonstrate platform-native CSS craft (scroll-driven animations, variable fonts, CSS nesting, logical properties) for developer/designer recruiting.

Deploy target: Netlify, `publish = "src"`.

Dev server: `npx serve src -l 3001`

---

## Phase 5 — what to do next

Install and configure the pre-commit tooling stack. These scripts are referenced in CLAUDE.md but not yet wired up:

```
npm run lint      → runs ESLint + Stylelint
npm run format    → runs Prettier
```

### Steps

1. **Check `package.json`** — it may exist from a previous session. Audit what's already there before installing.

2. **Install devDependencies**:
   ```
   prettier
   eslint  @eslint/js
   stylelint  stylelint-config-standard  stylelint-config-recess-order
   husky  lint-staged
   ```

3. **Configure ESLint** (`eslint.config.js`, flat config):
   - `@eslint/js` recommended rules
   - `no-console` warning
   - Targets `src/js/**/*.js`

4. **Configure Stylelint** (`.stylelintrc.json`):
   - Extends `stylelint-config-standard` + `stylelint-config-recess-order`
   - Targets `src/css/**/*.css`
   - `stylelint-config-recess-order` enforces the property order already used throughout

5. **Configure Prettier** (`.prettierrc`):
   - `printWidth: 100`, `singleQuote: false`, `trailingComma: "all"`, `tabWidth: 2`
   - Targets HTML, CSS, JS

6. **Wire `lint-staged`** (in `package.json`):
   ```json
   "lint-staged": {
     "src/**/*.js": ["eslint --fix", "prettier --write"],
     "src/**/*.css": ["stylelint --fix", "prettier --write"],
     "src/**/*.html": ["prettier --write"]
   }
   ```

7. **Initialize Husky** and add pre-commit hook running `lint-staged`

8. **Add npm scripts** to `package.json`:
   ```json
   "scripts": {
     "lint": "eslint src/js && stylelint src/css",
     "format": "prettier --write src",
     "lighthouse": "lighthouse http://localhost:3001 --output html --output-path ./lighthouse-report.html"
   }
   ```

9. **Run `npm run lint`** and fix any violations (especially Stylelint property-order warnings — the CSS was written informally and may have some recess-order violations)

---

## Current state of each file

### HTML — `src/index.html`
- Complete. All 6 sections with full essay copy, pullquotes, figures, and closing ornament.
- 6 `<picture>` elements each with a single `<img src="assets/images/xxx.svg">` (no AVIF/WebP sources).
- `width="800" height="450"` on all images (16:9, matching CSS `aspect-ratio: 16/9`).
- All JS loaded via `<script type="module" src="js/main.js">` at end of body.

### CSS — `src/css/`
- `tokens.css` — all custom properties (colours, type scale, spacing, easing, layout vars)
- `reset.css` — modern minimal reset
- `typography.css` — @font-face + base styles; `p` uses `font-variation-settings: "wght" 400, "opsz" var(--p-opsz)`
- `layout.css` — fixed header, hero (100svh), essay section grid, footer
- `components.css` — dropcap (`::first-letter`), pullquote, figure, hr, `.section-ornament`
- `sections.css` — even sections (#02, #04, #06) have `--color-paper-warm` background
- `animations.css` — all animations; see animation inventory below
- `reduced-motion.css` — complete kill-switch + explicit final states for all animated elements

### JS — `src/js/`
- `main.js` — adds `.js-enabled` to `<html>`, calls all four `init*()` functions
- `nav.js` — adds `.is-scrolled` to `.site-header` after 80px scroll
- `observer.js` — IntersectionObserver on `.essay-section` → `.is-visible`; updates `aria-current` on nav links
- `font-axes.js` — rAF-throttled scroll listener; sets `--p-opsz` (12–18) on each `.section__text > p` based on viewport proximity
- `progress.js` — scroll listener; updates `aria-valuenow` on `.reading-progress` progressbar

### Images — `src/assets/images/`
All 6 are hand-coded SVG typographic specimens (viewBox 0 0 800 450, 16:9):

| File | What it shows |
|---|---|
| `gutenberg-press.svg` | 3×3 grid of lead type "sorts" spelling GUTENBERG; first G in vermilion |
| `tschichold-grid.svg` | Asymmetric grid construction lines + *Die neue Typographie* title block |
| `fraunces-specimen.svg` | Three-panel weight axis: outlined A (wght 200) → semi-filled (wght 500) → bold (wght 700) |
| `eye-tracking.svg` | Essay prose from §04 with fixation circles + saccade polylines overlaid |
| `crt-type.svg` | Dark CRT screen with rasterized "R" pixel blocks + scan-line pattern overlay |
| `library-shelf.svg` | 13 named book spines; "Pressmark" spine in vermilion |

### Fonts — `src/assets/fonts/`
10 woff2 files. All self-hosted, no CDN dependency:
- Fraunces: `fraunces-latin-normal.woff2`, `fraunces-latin-italic.woff2`, `fraunces-latin-ext-normal.woff2`, `fraunces-latin-ext-italic.woff2`
- Newsreader: same four pattern
- DM Mono: `dm-mono-latin-normal.woff2`, `dm-mono-latin-ext-normal.woff2`

---

## Animation inventory

All animations are in `animations.css`. Reduced-motion overrides are in `reduced-motion.css`.

| Element | Mechanism | Keyframes |
|---|---|---|
| Reading progress bar | `scroll(root block)` | `grow-bar` (scaleX 0→1) |
| `.section-heading` | `view(block)` entry 0–55% | `heading-bloom` (wght/SOFT/opsz + opacity + translate) |
| `.section__number` | `view(block)` entry 5–40% | `number-appear` (opacity + translate Y) |
| `.section__deck` | `view(block)` entry 15–50% | `deck-appear` (opacity) |
| `hr, .section-rule` | `view(block)` entry 10–50% | `rule-draw` (scale 0 1 → 1 1) |
| `.section__figure` | IO `.is-visible` | CSS transition (opacity + translate Y) |
| `.section__text > p` | `view(block)` entry 5–35% | `para-rise` (opacity + translate Y) |
| `.pullquote` | `view(block)` entry 15–55% | `quote-rise` (opacity + translate X from left) |
| `.section-ornament` | `view(block)` entry 40–70% | `deck-appear` (opacity) |
| `.hero__title span` (×3) | time-based, delays 100/220/340ms | `title-reveal` (opacity + translate Y 100%) |
| `.hero__subtitle` | time-based, delay 500ms | `para-rise` |
| `.hero__scroll-cue` | time-based, delay 700ms | `para-rise` |
| `.hero__scroll-text` | infinite loop, delay 2s | `cue-breathe` (opacity 1→0.35→1) |

---

## Key decisions — do not change without reason

- **Never write `fontVariationSettings` inline** — always `style.setProperty("--custom-prop", value)` to keep CSP strict
- **`.js-enabled` gates** all IO-driven animation initial states — no-JS shows full content without animation
- **Property order in CSS** is recess-order throughout — Stylelint will enforce this in Phase 5
- **No dark mode** — intentional editorial decision; palette is warm paper + ink
- **Images are SVGs** — not photographs; do not replace unless you have properly licensed photos that match the alt text

---

## Phase 6 — after tooling

- Lighthouse CLI audit (targets: Performance ≥ 90, Accessibility = 100, Best Practices ≥ 95, SEO ≥ 95)
- Check `netlify.toml` for security headers (CSP, X-Frame-Options)
- Recruiter-facing `README.md`
- Verify OG tags, `theme-color`, `<meta name="description">`
