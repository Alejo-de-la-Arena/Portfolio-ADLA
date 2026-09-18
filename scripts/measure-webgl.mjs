import { build } from 'vite'
import { gzipSync } from 'node:zlib'
import { decode } from '@jridgewell/sourcemap-codec'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

// Analysis only: transformations run in memory; production sources are never edited.
const root = fileURLToPath(new URL('../', import.meta.url))
const group = id => {
  if (id.includes('/node_modules/three/')) return 'three'
  if (/\/drei\/(core\/(?:Environment|useEnvironment)|helpers\/environment-assets)/.test(id)) return 'environment'
  if (id.includes('/@react-three/drei/')) return 'drei-other'
  if (id.includes('/@react-three/fiber/')) return 'fiber'
  if (id.includes('/three-stdlib/')) return 'three-stdlib'
  if (id.includes('/@monogrid/gainmap-js/')) return 'gainmap'
  if (id.includes('/react-reconciler/')) return 'react-reconciler'
  return 'other'
}
const results = []
for (const scenario of ['baseline', 'no-environment', 'no-hero-webgl', 'no-webgl']) {
  const result = await build({ root, logLevel: 'error', plugins: [{ name: 'measure-webgl', enforce: 'pre', transform(code, id) {
    id = id.replaceAll('\\', '/')
    if (id.endsWith('/src/components/sections/Hero.tsx')) {
      if (scenario === 'no-environment') return { code: code.replace(', Environment', '').replace(/<Environment[^>]*\/>/g, ''), map: null }
      if (scenario === 'no-hero-webgl' || scenario === 'no-webgl') return { code: code
        .replace(/^import .*from ['"](?:@react-three\/fiber|@react-three\/drei|three)['"].*$/gm, '')
        .replace(/\/\* ========== 3D ORB CLUSTER[\s\S]*?(?=\/\* ========== PILL CTA)/, '')
        .replace(/<Canvas[\s\S]*?<\/Canvas>/g, '<div aria-hidden="true" />'), map: null }
    }
    if (scenario === 'no-webgl' && id.endsWith('/src/components/sections/Skills.tsx')) return { code: code
      .replace(/^import \* as THREE[^\n]*\n/m, '')
      .replace(/function useTorusKnotBg[\s\S]*?(?=function SkillItemTile)/, '')
      .replace(/  useTorusKnotBg\(canvasRef, reduceMotion\)\r?\n/, '')
      .replace(/  const canvasRef = useRef<HTMLCanvasElement>\(null\)\r?\n/, '')
      .replace(/<canvas[\s\S]*?\/>/, '<div aria-hidden="true" />'), map: null }
  } }], build: { write: false, sourcemap: 'hidden' } })
  const chunks = (Array.isArray(result) ? result : [result]).flatMap(r => r.output).filter(o => o.type === 'chunk')
  const fragments = {}
  const rendered = {}
  for (const chunk of chunks) {
    for (const [id, mod] of Object.entries(chunk.modules)) {
      const key = group(id.replaceAll('\\', '/'))
      rendered[key] = (rendered[key] ?? 0) + mod.renderedLength
    }
    const lines = chunk.code.split('\n')
    const mappings = decode(chunk.map.mappings)
    for (let line = 0; line < lines.length; line++) {
      const segments = mappings[line] ?? []
      for (let i = 0; i < segments.length; i++) {
        const seg = segments[i]
        if (seg.length < 4) continue
        const key = group(chunk.map.sources[seg[1]])
        fragments[key] = (fragments[key] ?? '') + lines[line].slice(seg[0], segments[i + 1]?.[0] ?? lines[line].length)
      }
    }
  }
  const row = { scenario, bytes: chunks.reduce((n,c)=>n+Buffer.byteLength(c.code),0), gzipBytes: chunks.reduce((n,c)=>n+gzipSync(c.code).length,0), groups: Object.fromEntries(Object.entries(fragments).map(([name,code])=>[name,{ mappedMinifiedBytes: Buffer.byteLength(code), isolatedGzipBytes: gzipSync(code).length, renderedBytes: rendered[name] ?? 0 }])) }
  results.push(row)
  console.log(JSON.stringify(row))
}
await writeFile(new URL('../docs/webgl-measurements.json', import.meta.url), JSON.stringify({ method: 'Production builds transformed in memory. Package fragments attributed via sourcemaps; isolated gzip values are non-additive, NOT marginal package savings. No replacement visuals included. HDR network asset excluded.', results }, null, 2) + '\n')
