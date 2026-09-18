# UI round 2 — 18 September 2026

## Applied blocks

- 65575f5: header and hero use the same max-w-editorial (72rem) container and px-4 / sm:px-6 / lg:px-8 padding as the sections. Header background remains full width.
- 4e11f78: working-process summary in ES/EN, real expansion button with aria-expanded / aria-controls, stable useId, all three exact Spanish paragraphs retained in the DOM. English translation retained. CSS grid height transition; reduced motion disables it. Hidden content is removed from the accessibility tree while collapsed.
- 1ed5079: taller personal-project slider (240px mobile image, 288px small screens, 400px minimum desktop image column), more content padding. Removed cards, filters, ordering state, sorting helpers, unused labels and pause/resume button. Autoplay pauses on hover, focus within and reduced motion; resumes after pointer/focus leaves. Detail remains available from the slider.
- 3bf09d8: JobSearchBot screenshot pair registered through a typed screenshot() map and one ProjectMedia. Desktop 2560 × 1278; mobile 850 × 1100, read from PNG headers. ES/EN alt text, picture swap at 1024px, existing lightbox and modal focus handling reused. Images show an empty login form with a placeholder email, no personal records or credentials. PNG files retained without conversion.

No new dependencies. No deployment. Unrelated package-lock and worktree changes were left untouched, as were the unregistered private screenshots.

## Verification

- TypeScript strict check passed.
- ESLint passed with zero warnings.
- Production build passed: 2551 modules, CSS 45.82 kB / 8.56 kB gzip; JS approximately 1497 kB / 433.39 kB gzip.
- Existing Vite warning about chunks over 500 kB persists; no build errors. Temporary output directory is outside the repo and was not emptied.
- Content/SSR checks passed for ES and EN, home sections, 10 routes, case anchors, 32 local screenshot contracts, real image dimensions, BOA single view, Zetenta slider, expandable copy in initial markup and personal-project responsive media.
- No browser connection was available (runtime discovery returned an empty list). Visual layout, horizontal overflow and actual console checks at 375, 768, 1024 and 1440 remain pending, including light/dark and interactive focus/hover behavior. SSR and static checks are not a substitute for those browser checks.

## WebGL analysis — no implementation

The previous 122 kB gzip figure was a difference between complete builds with Skills still using Three.js. It was not the size of the whole Three.js library. Removing the hero also allows tree shaking of Three exports that Skills does not use, plus the React Three integration and its dependencies.

Measured again on this round's final source with the existing dependency installation. The script transforms source only in memory, uses production minification and gzipSync, writes no transformed application files, and includes no replacement SVG/CSS. kB here means 1000 bytes.

Complete JS gzip sizes:

- Baseline: 433,394 bytes (433.394 kB).
- Hero without Environment only: 413,148 bytes. Saving: 20,246 bytes.
- Hero without WebGL, retaining Skills WebGL: 311,243 bytes. Saving: **122,151 bytes (122.151 kB)**.
- Neither hero nor Skills uses WebGL: 193,392 bytes. Saving against baseline: **240,002 bytes (240.002 kB)**; additional saving beyond the hero: **117,851 bytes (117.851 kB)**.

These are actual whole-bundle differences, before the cost of the replacement visuals. The final SVG/CSS result would need another build measurement. JS only; CSS, screenshots and HDR are separate.

Package attribution via production sourcemaps, compressing each package's mapped minified fragments in isolation:

- Three: 173.759 kB isolated gzip in baseline → 116.012 kB with Skills only. Difference: 57.747 kB. Mapped minified raw code: 668,375 → 454,473 bytes.
- React Three Fiber: 12.035 kB → absent.
- Drei excluding Environment: 1.511 kB → absent.
- Environment / useEnvironment / preset mapping (part of Drei): 2.231 kB → absent.
- three-stdlib: 9.703 kB → absent.
- gainmap-js: 5.616 kB → absent.
- react-reconciler used by Fiber: 28.453 kB → absent (React DOM itself remains).
- Other mapped code: 200.589 → 193.793 kB, a 6.796 kB isolated difference including other helpers and application changes.

**These isolated gzip differences are diagnostic, not additive shares of the 122.151 kB.** Gzip shares a dictionary across packages; minification and tree shaking change with the import graph. There is no unique exact per-package partition of the whole-bundle compressed saving. Only the complete-build differences above are net savings. The Environment-only 20.246 kB saving includes its dependent loaders; do not add it again to the other package figures.

The city preset selects potsdamer_platz_1k.hdr. The HDR is fetched at runtime, not bundled in JS. Its public pinned URL returned HTTP 200, application/octet-stream, no Content-Encoding and **1,540,678 bytes (1.54 MB)** during this measurement. It is excluded from the 122.151 kB. Removing Environment/the hero avoids this cold-cache download in addition to the JavaScript saving. This is file size, not a measured page-load time or a guarantee about every CDN response.

HDR source: https://raw.githack.com/pmndrs/drei-assets/456060a26bbeb8fdf79326f224b6d99b8bcce736/hdri/potsdamer_platz_1k.hdr

To remove WebGL from Skills, replace its decorative TorusKnot background with SVG paths/CSS in the existing palette, retaining the skill content and interactions. Remove useTorusKnotBg, its canvas, renderer/scene/material construction, render loop, visibility/resize observers used only for that background, and Three imports. The dormant ParticleField component also imports the WebGL stack but is not included in the current bundle; it would need removal or replacement before deleting those dependencies and their types from package.json. Dependency cleanup itself would not add to the measured runtime saving once imports are gone. Reduced motion should show a static composition.

Recommendation: SVG/CSS in both hero and the decorative Skills background. This removes all WebGL initialization and yields about 240 kB gzip savings before replacement code, plus the 1.54 MB HDR request. This is a proposal only. The session signature and all WebGL replacements remain unimplemented pending user confirmation.

Reproduce: node scripts/measure-webgl.mjs. Raw results: docs/webgl-measurements.json. The script uses the already installed sourcemap-codec transitive dependency; it installs nothing. Source maps are generated in memory for measurement only and are not published.
