# Aurora and static Skills background

Implemented a local TypeScript adaptation of React Bits Aurora using OGL 1.0.11.
The original top-edge band is replaced by a feathered elliptical noise field,
confined to the right of the hero. The palette contains dark violet and attenuated
#7c5cff. Text and CTAs render fully opaque immediately; the renderer is dynamically
imported after two animation frames and fades with `motionTransition(..., 'slow')`.

Skills now uses a static inline SVG of interlaced curves with group opacity 0.045.
The old scenes, grid, unused ParticleField, pointer hint and scene measurement
scripts were removed. No GLB/GLTF/HDR/EXR files were present in src/public.
Three, R3F, drei and their exclusive transitive dependencies were uninstalled;
the lockfile contains none. Historical project descriptions now say WebGL so the
requested case-insensitive source grep is empty. The footer names OGL in ES/EN.

## Production bundle

Measured by gzip-compressing each emitted JavaScript chunk with Node's gzipSync
and summing the results (decimal kB; same method as the baseline).

- Baseline: 432,753 bytes gzip.
- Final entry chunk: 193,762 bytes gzip.
- Deferred Aurora/OGL chunk: 14,569 bytes gzip.
- Final total: 208,331 bytes gzip (208.33 kB).
- Saved: 224,422 bytes gzip, 51.86%.

No new visual is omitted from the final measurement. Build still reports the
existing warning for a minified entry chunk above 500 kB; compilation succeeds.

## Contrast

These are mathematical worst-case bounds, not browser pixel samples. Hero has a
solid theme background. Canvas and fallback share a group opacity limit: 0.16
dark and 0.08 light, halved on mobile. Even overlapping layers cannot exceed it.
The shader's color channels and fallback are bounded by RGB(124,92,255). Ignoring
the protective mask entirely gives dark background RGB(25.72,20.60,50.04).
For light theme, black at the maximum opacity gives an even more conservative
background bound RGB(226.32,228.16,231.84).

- Dark: foreground 16.45:1, secondary 9.04:1, location 8.66:1, least-contrasting
  gradient stop in the large bold name 4.05:1.
- Light: foreground 13.93:1, secondary 7.10:1, location 6.57:1, least-contrasting
  name gradient stop 4.15:1.
- White on solid primary CTA: 5.27:1 in both themes; hover is darker.
- The name's minimum size is 27px bold (large text AA threshold 3:1).
  Normal text/CTA threshold is 4.5:1.

## Checks and limits

- TypeScript strict and ESLint passed with no errors.
- Full `npm run build` passed.
- `scripts/verify-backgrounds.mjs --bundle` passed: mocked lifecycle checks cover
  intersection/visibility pauses, hidden resize, desktop/mobile DPR and resolution,
  cleanup, no WebGL, initialization failure, render failure and context loss.
- Reduced motion selects CSS fallback and skips the renderer import; the CSS
  fallback remains available during loading and on failures.
- ES/EN content/route checks and image/link checks passed. The SSR harness emits
  React Router/Framer Motion useLayoutEffect warnings; this is not a browser
  console verification.
- `grep -ri "three\|@react-three" src`: no output, exit status 1.
- No matching dependencies in package.json or package-lock.json.
- The running Vite server returned HTTP 200 for the transformed Aurora module
  at localhost:5173, with its OGL import resolved (the reported import error is fixed).
- Browser runtime returned no available browsers. Horizontal overflow at
  375/768/1024/1440, the 1440x900 fold, actual shader appearance/compilation on GPU,
  pixel-sampled contrast, and browser console in ES/EN remain unverified.

The reusable lifecycle/contrast verifier replaces the one-off measurement scripts.
Historical baseline data in `docs/webgl-measurements.json` remains documentation.
