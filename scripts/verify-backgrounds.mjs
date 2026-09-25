import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import vm from 'node:vm'
import ts from 'typescript'

const source = readFileSync('src/components/effects/halftoneRenderer.ts', 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText

function lifecycle({ mobile = false, webgl = true, fail = false, renderFail = false, staticFrame = false, slow = false } = {}) {
  const frames = new Map(), listeners = new Map(), canvasListeners = new Map()
  let next = 0, draws = 0, disposed = 0, intersection, renderer, shaderProgram
  const gl = { LINK_STATUS: 1, getProgramParameter: () => true, getExtension: () => ({ loseContext() {} }) }
  const canvas = { style: {}, getContext: () => webgl ? gl : null, addEventListener: (name, fn) => canvasListeners.set(name, fn), removeEventListener: name => canvasListeners.delete(name), remove() {} }
  const document = { hidden: false, createElement: () => canvas, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) }
  const media = { matches: mobile, addEventListener() {}, removeEventListener() {} }
  const ogl = {
    Renderer: class { constructor() { if (fail) throw new Error('No WebGL'); this.gl = gl; renderer = this } setSize(w, h) { this.size = [w, h] } render() { if (renderFail) throw new Error('Draw failed'); draws++ } },
    Triangle: class { remove() { disposed++ } },
    Program: class { constructor(_gl, options) { this.uniforms = options.uniforms; shaderProgram = this } remove() { disposed++ } },
    Mesh: class {},
  }
  const context = { exports: {}, require: () => ogl, document, window: { devicePixelRatio: 3, matchMedia: () => media },
    requestAnimationFrame: fn => { frames.set(++next, fn); return next }, cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class { constructor(fn) { intersection = fn } observe() {} disconnect() {} },
    ResizeObserver: class { observe() {} disconnect() {} },
  }
  vm.runInNewContext(compiled, context)
  const ready = []
  const cleanup = context.exports.mountHalftone({ clientWidth: 800, clientHeight: 600, appendChild() {}, closest() { return this } }, value => ready.push(value), {
    dissolve: true, spacing: 15, dotScale: .62, contourStrength: .38, speed: .075, dissolveStrength: .34,
    faceDesktop: [.62, .58], faceMobile: [.5, .69], faceQuietRadius: .30, faceQuietStrength: .44,
    textDesktop: [.26, .49], textMobile: [.5, .22], textQuietSize: [.34, .43], textQuietStrength: .78,
    dissolveYDesktop: .20, dissolveYMobile: .52, contourCount: 6, minMobileFps: 28, staticFrame,
  })
  assert.equal(frames.size, 0)
  if (!webgl || fail) { cleanup(); assert.equal(draws, 0); return }
  assert.equal(renderer.dpr, mobile ? 1 : 1.5)
  assert.deepEqual(renderer.size, mobile ? [520, 390] : [800, 600])
  assert.equal(shaderProgram.uniforms.uContours.value, .38)
  intersection([{ isIntersecting: true }]); assert.equal(frames.size, 1)
  const tick = now => { const [id, fn] = frames.entries().next().value; frames.delete(id); fn(now) }
  tick(10)
  if (renderFail) { assert.equal(frames.size, 0); assert.equal(ready.at(-1), false); cleanup(); return }
  assert.equal(ready.at(-1), true)
  if (staticFrame) { assert.equal(draws, 1); assert.equal(frames.size, 0); cleanup(); return }
  if (slow) {
    for (let i = 1; i <= 24; i++) tick(10 + i * 50)
    assert.equal(frames.size, 0, 'Slow mobile GPU retains a static frame')
    cleanup(); return
  }
  tick(26); assert.equal(draws, 2)
  assert.ok(Math.abs(shaderProgram.uniforms.uTime.value - .0012) < 1e-10)
  document.hidden = true; listeners.get('visibilitychange')(); assert.equal(frames.size, 0)
  document.hidden = false; listeners.get('visibilitychange')(); assert.equal(frames.size, 1)
  tick(10000); assert.ok(Math.abs(shaderProgram.uniforms.uTime.value - .0012) < 1e-10)
  intersection([{ isIntersecting: false }]); assert.equal(frames.size, 0)
  intersection([{ isIntersecting: true }]); assert.equal(frames.size, 1)
  canvasListeners.get('webglcontextlost')({ preventDefault() {} }); assert.equal(frames.size, 0)
  assert.equal(ready.at(-1), false)
  cleanup(); assert.equal(listeners.size, 0); assert.equal(canvasListeners.size, 0); assert.equal(disposed, 2)
}
for (const options of [{}, { mobile: true }, { mobile: true, slow: true }, { webgl: false }, { fail: true }, { renderFail: true }, { staticFrame: true }]) lifecycle(options)
console.log('PASS: lifecycle, visibility resume, mobile DPR, slow-device/static frames, WebGL failure and context loss')

const wrapper = readFileSync('src/components/effects/HeroHalftone.tsx', 'utf8')
assert.doesNotMatch(readFileSync('src/styles/index.css', 'utf8'), /\.hero-halftone\s*\{[^}]*mask-image:/)
assert.match(wrapper, /import\('\.\/halftoneRenderer'\)/)
assert.match(wrapper, /export const DEBUG_HALFTONE = false/)
assert.doesNotMatch(readFileSync('src/components/sections/Hero.tsx', 'utf8'), /Aurora/)
console.log('PASS: deferred import and full-width coverage')

if (process.argv.includes('--bundle')) {
  const sizes = readdirSync('dist/assets').filter(name => name.endsWith('.js')).map(file => ({ file, gzipBytes: gzipSync(readFileSync(`dist/assets/${file}`)).length }))
  console.log(JSON.stringify({ sizes, totalJsGzipBytes: sizes.reduce((n, item) => n + item.gzipBytes, 0) }, null, 2))
}
