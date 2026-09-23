import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync('src/components/effects/auroraRenderer.ts', 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText

function lifecycle({ mobile = false, webgl = true, fail = false, renderFail = false } = {}) {
  let frames = new Map(), next = 0, draws = 0, disposed = 0, intersection, resized, renderer, shaderProgram
  const listeners = new Map(), canvasListeners = new Map()
  const gl = { LINK_STATUS: 1, getProgramParameter: () => true, getExtension: () => ({ loseContext() {} }) }
  const canvas = { style: {}, getContext: () => webgl ? gl : null, addEventListener: (name, fn) => canvasListeners.set(name, fn), removeEventListener: name => canvasListeners.delete(name), remove() {} }
  const document = { hidden: false, createElement: () => canvas, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) }
  const media = { matches: mobile, addEventListener() {}, removeEventListener() {} }
  const ogl = {
    Renderer: class { constructor() { if (fail) throw new Error('No WebGL'); this.gl = gl; renderer = this } setSize(w, h) { this.size = [w, h] } render() { if (renderFail) throw new Error('Draw failed'); draws++ } },
    Triangle: class { remove() { disposed++ } },
    Program: class { constructor(_gl, options) { this.uniforms = options.uniforms; shaderProgram = this } remove() { disposed++ } },
    Mesh: class {}
  }
  const context = { exports: {}, require: () => ogl, document, window: { devicePixelRatio: 3, matchMedia: () => media },
    requestAnimationFrame: fn => { frames.set(++next, fn); return next }, cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class { constructor(fn) { intersection = fn } observe() {} disconnect() {} },
    ResizeObserver: class { constructor(fn) { resized = fn } observe() {} disconnect() {} }
  }
  vm.runInNewContext(compiled, context)
  const ready = []
  const cleanup = context.exports.mountAurora({ clientWidth: 800, clientHeight: 600, appendChild() {}, closest() { return this } }, value => ready.push(value), { intensity: .88, amplitude: .46, speed: .72, scale: 1.08 })
  assert.equal(frames.size, 0, 'No frame before intersection')
  if (!webgl || fail) { cleanup(); assert.equal(draws, 0); return }
  assert.equal(renderer.dpr, mobile ? 1 : 1.5)
  assert.deepEqual(renderer.size, mobile ? [600, 450] : [800, 600])
  intersection([{ isIntersecting: true }]); assert.equal(frames.size, 1)
  const tick = now => { const [id, fn] = frames.entries().next().value; frames.delete(id); fn(now) }
  tick(10)
  if (renderFail) { assert.equal(frames.size, 0); assert.equal(ready.at(-1), false); cleanup(); return }
  tick(26); assert.equal(draws, 2)
  assert.ok(Math.abs(shaderProgram.uniforms.uTime.value - .01152) < 1e-10, 'Shader clock advances in seconds on every frame')
  document.hidden = true; listeners.get('visibilitychange')(); assert.equal(frames.size, 0)
  resized(); assert.equal(draws, 2, 'No draw on hidden resize')
  document.hidden = false; listeners.get('visibilitychange')(); assert.equal(frames.size, 1, 'Visibility resume schedules the loop')
  tick(10000); assert.ok(Math.abs(shaderProgram.uniforms.uTime.value - .01152) < 1e-10, 'Resume does not jump the shader clock')
  tick(10016); assert.ok(Math.abs(shaderProgram.uniforms.uTime.value - .02304) < 1e-10, 'Resumed loop keeps advancing')
  intersection([{ isIntersecting: false }]); assert.equal(frames.size, 0)
  intersection([{ isIntersecting: true }]); assert.equal(frames.size, 1)
  canvasListeners.get('webglcontextlost')({ preventDefault() {} }); assert.equal(frames.size, 0)
  assert.equal(ready.at(-1), false)
  cleanup(); assert.equal(listeners.size, 0); assert.equal(canvasListeners.size, 0); assert.equal(disposed, 2)
}
for (const options of [{}, { mobile: true }, { webgl: false }, { fail: true }, { renderFail: true }]) lifecycle(options)
console.log('PASS: visibility, intersection, DPR, mobile resolution, context loss, no WebGL, failed initialization, cleanup')

const linear = value => (value /= 255) <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4
const luminance = rgb => rgb.map(linear).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0)
const contrast = (a, b) => (Math.max(luminance(a), luminance(b)) + .05) / (Math.min(luminance(a), luminance(b)) + .05)
const mix = (base, color, alpha) => base.map((n, i) => n * (1-alpha) + color[i] * alpha)
const css = readFileSync('src/styles/index.css', 'utf8')
assert.match(css, /min\(var\(--hero-aurora-opacity, 0\.28\), \.16\)/)
// Bound every possible frame by the shader/fallback maximum channel values.
// Ignore the mask and assume full opacity even behind the text (more conservative).
const darkWorst = mix([7,7,11], [124,92,255], .28)
// For light theme use an even darker bound than the effect can produce.
const lightWorst = mix([246,248,252], [0,0,0], .16)
for (const [theme, bg, foreground, secondary, tertiary, accent] of [
  ['dark', darkWorst, [245,247,255], [180,185,208], [127,134,159], [124,92,255]],
  ['light', lightWorst, [19,24,38], [62,73,96], [98,111,140], [108,78,240]]
]) {
  const measurements = { foreground: contrast(foreground,bg), secondary: contrast(secondary,bg), tertiary: contrast(tertiary,bg), accent: contrast(accent,bg), whiteCTA: contrast([255,255,255],[108,78,240]) }
  console.log(theme, 'worst background', bg.map(n => n.toFixed(2)), measurements)
  assert.ok(measurements.foreground >= 4.5 && measurements.secondary >= 4.5 && measurements.whiteCTA >= 4.5)
  assert.ok(measurements.accent >= 3, 'Large bold name: AA >= 3')
  const smallAccent = contrast(theme === 'dark' ? [188,170,255] : [80,50,187], bg)
  assert.ok(smallAccent >= 4.5, 'Small location text: AA >= 4.5')
  console.log(theme, 'small location contrast', smallAccent)
}
const hero = readFileSync('src/components/sections/Hero.tsx', 'utf8')
assert.match(hero, /text-xs font-medium text-accent-on-subtle/)
assert.doesNotMatch(hero, /text-foreground-tertiary/)
assert.match(hero, /opacity: 0\.82/)
assert.match(hero, /index \* motionTokens\.smallGroup\.step/)
const wrapper = readFileSync('src/components/effects/HeroAurora.tsx', 'utf8')
assert.match(wrapper, /if \(reducedMotion && !DEBUG_AURORA\) return/)
assert.match(wrapper, /import\('\.\/auroraRenderer'\)/)
assert.match(wrapper, /export const DEBUG_AURORA = false/)
assert.match(css, /\.hero-aurora--debug[\s\S]*mask-image: none !important/)
const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
assert.ok(pkg.dependencies.ogl)
for (const name of Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })) assert.doesNotMatch(name, /three/)
console.log('PASS: primary/secondary text, large name and solid CTA contrast bounds; package dependencies')

if (process.argv.includes('--bundle')) {
  const files = readdirSync('dist/assets').filter(name => name.endsWith('.js'))
  const sizes = files.map(file => ({ file, gzipBytes: gzipSync(readFileSync(`dist/assets/${file}`)).length }))
  const total = sizes.reduce((n, item) => n + item.gzipBytes, 0)
  console.log(JSON.stringify({ sizes, totalJsGzipBytes: total, baselineBytes: 432753, savingsBytes: 432753-total, reductionPercent: (1-total/432753)*100 }, null, 2))
}
