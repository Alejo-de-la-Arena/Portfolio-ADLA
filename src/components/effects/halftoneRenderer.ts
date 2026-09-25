import { Mesh, Program, Renderer, Triangle } from 'ogl'

const vertex = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`

const fragment = `
precision highp float;
varying vec2 vUv;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpacing;
uniform float uDotScale;
uniform float uContours;
uniform float uDissolve;
uniform float uMobile;
uniform vec2 uFaceDesktop;
uniform vec2 uFaceMobile;
uniform float uFaceQuietRadius;
uniform float uFaceQuietStrength;
uniform vec2 uTextDesktop;
uniform vec2 uTextMobile;
uniform vec2 uTextQuietSize;
uniform float uTextQuietStrength;
uniform float uDissolveYDesktop;
uniform float uDissolveYMobile;
uniform float uContourCount;

void main() {
  vec2 uv = vUv;
  vec2 focus = mix(uFaceDesktop, uFaceMobile, uMobile);
  vec2 d = (uv - focus) * vec2(1.0, 1.22);
  float faceQuiet = 1.0 - smoothstep(uFaceQuietRadius * 0.36, uFaceQuietRadius, length(d));
  vec2 textFocus = mix(uTextDesktop, uTextMobile, uMobile);
  vec2 textDistance = (uv - textFocus) / uTextQuietSize;
  float textQuiet = 1.0 - smoothstep(0.66, 1.18, length(textDistance));
  float drift = uTime * (1.0 - faceQuiet * 0.94);

  // A low-frequency height field creates depth without an isolated object.
  float ridge = sin(uv.x * 14.0 + sin(uv.y * 9.0 + drift) * 1.15);
  ridge += 0.48 * sin(uv.y * 19.0 - uv.x * 4.0 + drift * 0.72);
  float terrain = ridge * 0.28 + 0.5;
  float contourPhase = fract(terrain * uContourCount);
  float contourWidth = 0.055;
  float contour = 1.0 - smoothstep(0.035, 0.035 + contourWidth, min(contourPhase, 1.0 - contourPhase));

  vec2 cell = (uv * uResolution) / uSpacing;
  vec2 cellId = floor(cell);
  vec2 local = fract(cell) - 0.5;
  float hash = fract(sin(dot(cellId, vec2(127.1, 311.7))) * 43758.5453);
  float waves = 0.50 + 0.28 * sin(terrain * 7.0 + drift * 0.4) + 0.10 * (hash - 0.5);
  float lowerFade = exp(-pow((uv.y - mix(uDissolveYDesktop, uDissolveYMobile, uMobile)) / mix(0.16, 0.13, uMobile), 2.0));
  float horizontal = 1.0 - smoothstep(mix(0.18, 0.32, uMobile), mix(0.55, 0.66, uMobile), abs(uv.x - focus.x));
  float dissolve = lowerFade * horizontal * uDissolve;
  float density = clamp(waves + dissolve - faceQuiet * uFaceQuietStrength - textQuiet * uTextQuietStrength * 0.45, 0.04, 0.92);
  float radius = (0.10 + density * 0.33) * uDotScale;
  float dot = 1.0 - smoothstep(radius - 0.035, radius + 0.035, length(local));

  float field = smoothstep(0.03, 0.35, uv.y) * smoothstep(0.01, 0.18, 1.0 - uv.y);
  float ink = (dot * density + contour * uContours * (1.0 - faceQuiet * 0.82)) * field * (1.0 - textQuiet * uTextQuietStrength);
  ink = clamp(ink, 0.0, 1.0);
  vec3 violet = mix(vec3(0.17, 0.09, 0.32), vec3(0.486, 0.361, 1.0), clamp(density * 0.72 + contour * 0.25, 0.0, 1.0));
  gl_FragColor = vec4(violet * ink, ink);
}
`

export interface HalftoneOptions {
  dissolve: boolean
  spacing: number
  dotScale: number
  contourStrength: number
  speed: number
  dissolveStrength: number
  faceDesktop: [number, number]
  faceMobile: [number, number]
  faceQuietRadius: number
  faceQuietStrength: number
  textDesktop: [number, number]
  textMobile: [number, number]
  textQuietSize: [number, number]
  textQuietStrength: number
  dissolveYDesktop: number
  dissolveYMobile: number
  contourCount: number
  minMobileFps: number
  staticFrame: boolean
}

export function mountHalftone(host: HTMLDivElement, onReady: (ready: boolean) => void, options: HalftoneOptions): () => void {
  onReady(false)
  const canvas = document.createElement('canvas')
  let renderer: Renderer | undefined
  let program: Program | undefined
  let geometry: Triangle | undefined
  let mesh: Mesh | undefined
  let observer: IntersectionObserver | undefined
  let resizeObserver: ResizeObserver | undefined
  let frame = 0
  let intersecting = false
  let lost = false
  let elapsed = 0
  let previous = 0
  let hasRendered = false
  let slowSampleMs = 0
  let slowSampleFrames = 0
  let performanceFrozen = false
  const mobile = window.matchMedia('(max-width: 767px)')
  const active = () => intersecting && !document.hidden && !lost
  const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0 }

  function draw(now: number) {
    frame = 0
    if (!active() || !renderer || !program || !mesh) return
    if (previous) {
      const delta = Math.min(now - previous, 100)
      elapsed += delta * 0.001 * options.speed
      if (mobile.matches && slowSampleFrames < 24) {
        slowSampleMs += delta
        slowSampleFrames++
        if (slowSampleFrames === 24 && slowSampleMs / 24 > 1000 / options.minMobileFps) performanceFrozen = true
      }
    }
    previous = now
    program.uniforms.uTime.value = elapsed
    try {
      renderer.render({ scene: mesh })
      if (!hasRendered) { hasRendered = true; onReady(true) }
      if (!options.staticFrame && !performanceFrozen) frame = requestAnimationFrame(draw)
    } catch {
      lost = true
      stop()
      onReady(false)
    }
  }
  function updateActivity() {
    if (active() && ((!options.staticFrame && !performanceFrozen) || !hasRendered) && !frame) frame = requestAnimationFrame(draw)
    else if (!active()) stop()
  }
  function resize() {
    if (!renderer || !program || lost) return
    const scale = mobile.matches ? 0.65 : 1
    renderer.dpr = Math.min(window.devicePixelRatio || 1, mobile.matches ? 1 : 1.5)
    const width = Math.max(1, Math.round(host.clientWidth * scale))
    const height = Math.max(1, Math.round(host.clientHeight * scale))
    renderer.setSize(width, height)
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    program.uniforms.uResolution.value = [width * renderer.dpr, height * renderer.dpr]
    program.uniforms.uMobile.value = mobile.matches ? 1 : 0
    if (!mobile.matches) { performanceFrozen = false; slowSampleFrames = 0; slowSampleMs = 0 }
    if ((options.staticFrame || performanceFrozen) && hasRendered) { hasRendered = false; updateActivity() }
  }
  function contextLost(event: Event) {
    event.preventDefault()
    lost = true
    stop()
    onReady(false)
  }
  function cleanup() {
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
  try {
    if (!canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true })) return cleanup
    renderer = new Renderer({ canvas, webgl: 1, alpha: true, antialias: false, premultipliedAlpha: true })
    geometry = new Triangle(renderer.gl)
    program = new Program(renderer.gl, { vertex, fragment, transparent: true, depthTest: false, depthWrite: false,
      uniforms: {
        uResolution: { value: [1, 1] }, uTime: { value: 0 },
        uSpacing: { value: options.spacing }, uDotScale: { value: options.dotScale },
        uContours: { value: options.contourStrength },
        uDissolve: { value: options.dissolve ? options.dissolveStrength : 0 },
        uMobile: { value: mobile.matches ? 1 : 0 },
        uFaceDesktop: { value: options.faceDesktop },
        uFaceMobile: { value: options.faceMobile },
        uFaceQuietRadius: { value: options.faceQuietRadius },
        uFaceQuietStrength: { value: options.faceQuietStrength },
        uTextDesktop: { value: options.textDesktop },
        uTextMobile: { value: options.textMobile },
        uTextQuietSize: { value: options.textQuietSize },
        uTextQuietStrength: { value: options.textQuietStrength },
        uDissolveYDesktop: { value: options.dissolveYDesktop },
        uDissolveYMobile: { value: options.dissolveYMobile },
        uContourCount: { value: options.contourCount },
      },
    })
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
