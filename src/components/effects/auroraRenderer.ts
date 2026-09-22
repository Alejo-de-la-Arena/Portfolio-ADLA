// Adapted from React Bits Aurora (TypeScript + Tailwind), David Haz.
// https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/Backgrounds/Aurora/Aurora.tsx
// See THIRD_PARTY_NOTICES.md. Simplex noise retained; the horizontal band is
// replaced by an elliptical, feathered field with no edge attached to the top.
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`
const fragment = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 a0 = x - floor(x + 0.5);
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
void main() {
  vec2 p = (vUv - vec2(0.62, 0.50)) * vec2(1.7, 1.4);
  float n = snoise(p * 1.55 + vec2(sin(uTime * 0.31), cos(uTime * 0.23)) * 0.18);
  float detail = snoise(p * 2.4 + vec2(n * 0.35, uTime * 0.10));
  float energy = clamp(0.42 + n * 0.24 + detail * 0.12, 0.0, 1.0);
  float envelope = exp(-dot(p, p) * 3.1);
  envelope *= smoothstep(0.0, 0.22, vUv.y) * smoothstep(0.0, 0.22, 1.0-vUv.y);
  vec3 violet = mix(vec3(0.12, 0.055, 0.27), vec3(124.0, 92.0, 255.0)/255.0, energy);
  // Premultiplied alpha; the wrapper also bounds brightness for contrast.
  float alpha = envelope * (0.30 + energy * 0.50);
  gl_FragColor = vec4(violet * alpha, alpha);
}
`

export function mountAurora(host: HTMLDivElement, onReady: (ready: boolean) => void): () => void {
  onReady(false)
  const canvas = document.createElement('canvas')
  let renderer: Renderer | undefined
  let program: Program | undefined
  let geometry: Triangle | undefined
  let frame = 0
  let intersecting = false
  let lost = false
  let time = 0
  let previous = 0
  let observer: IntersectionObserver | undefined
  let resizeObserver: ResizeObserver | undefined
  const mobile = window.matchMedia('(max-width: 767px)')

  const active = () => intersecting && !document.hidden && !lost
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0 }
  const cleanup = () => {
    stop()
    observer?.disconnect()
    resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', updateActivity)
    mobile.removeEventListener('change', resize)
    canvas.removeEventListener('webglcontextlost', contextLost)
    geometry?.remove()
    program?.remove()
    renderer?.gl.getExtension('WEBGL_lose_context')?.loseContext()
    canvas.remove()
  }
  let mesh: Mesh | undefined
  function draw(now: number) {
    frame = 0
    if (!active() || !renderer || !program || !mesh) return
    if (previous) time += Math.min(now - previous, 100) * 0.000025
    previous = now
    program.uniforms.uTime.value = time
    try {
      renderer.render({ scene: mesh })
      onReady(true)
      frame = requestAnimationFrame(draw)
    } catch {
      lost = true
      stop()
      onReady(false)
    }
  }
  function updateActivity() {
    if (active()) { if (!frame) frame = requestAnimationFrame(draw) }
    else stop()
  }
  function resize() {
    if (!renderer || lost) return
    // Mobile: 0.75 CSS pixels per backing pixel, DPR <= 1. Desktop <= 1.5.
    const scale = mobile.matches ? 0.75 : 1
    renderer.dpr = Math.min(window.devicePixelRatio || 1, mobile.matches ? 1 : 1.5)
    renderer.setSize(Math.max(1, Math.round(host.clientWidth * scale)), Math.max(1, Math.round(host.clientHeight * scale)))
    canvas.style.width = '100%'
    canvas.style.height = '100%'
  }
  function contextLost(event: Event) {
    event.preventDefault()
    lost = true
    stop()
    onReady(false)
  }
  try {
    // Avoid initializing OGL at all when the browser cannot create WebGL.
    if (!canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true })) return cleanup
    renderer = new Renderer({ canvas, webgl: 1, alpha: true, antialias: false, premultipliedAlpha: true })
    geometry = new Triangle(renderer.gl)
    program = new Program(renderer.gl, { vertex, fragment, transparent: true, depthTest: false, depthWrite: false, uniforms: { uTime: { value: 0 } } })
    if (!renderer.gl.getProgramParameter(program.program, renderer.gl.LINK_STATUS)) { cleanup(); return () => {} }
    mesh = new Mesh(renderer.gl, { geometry, program })
    canvas.className = 'block h-full w-full'
    host.appendChild(canvas)
    resize()
    canvas.addEventListener('webglcontextlost', contextLost)
    observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; updateActivity() })
    observer.observe(host.closest('#hero') ?? host)
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(host)
    mobile.addEventListener('change', resize)
    document.addEventListener('visibilitychange', updateActivity)
  } catch {
    cleanup()
    onReady(false)
    return () => {}
  }
  return cleanup
}
