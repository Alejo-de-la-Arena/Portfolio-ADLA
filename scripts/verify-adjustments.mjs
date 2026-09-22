import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const walk = async directory => (await Promise.all((await readdir(directory, { withFileTypes: true })).map(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat()
const sources = (await walk(path.join(root, 'src'))).filter(file => /\.(tsx?|css)$/.test(file))
const images = new Set()
let externalLinks = 0
for (const file of [...sources, path.join(root, 'index.html')]) {
  const source = await readFile(file, 'utf8')
  for (const match of source.matchAll(/["'`](\/(?!\/)[^"'`\s]+\.(?:png|jpe?g|webp|svg|gif|avif))(?:[?#][^"'`\s]*)?["'`]/g)) images.add(match[1])
  if (!file.endsWith('.tsx')) continue
  const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const visit = node => {
    if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && ['a', 'motion.a'].includes(node.tagName.getText(ast))) {
      const attributes = new Map(node.attributes.properties.filter(ts.isJsxAttribute).map(item => [item.name.getText(ast), item.initializer]))
      const href = attributes.get('href')?.getText(ast)
      // Literal/hash/mailto links stay in-page; all other data-bound anchors must be safe externally.
      if (href && !/^['"](?:#|\/(?!\/)|mailto:)/.test(href) && !/^[{]\s*(?:`#|['"]mailto:)/.test(href)) {
        assert.equal(attributes.get('target')?.text, '_blank', file + ': ' + href)
        const rel = attributes.get('rel')?.text.split(/\s+/) ?? []
        assert.ok(rel.includes('noopener') && rel.includes('noreferrer'), file + ': ' + href)
        externalLinks++
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(ast)
}
for (const src of images) await access(path.join(root, 'public', src))
console.log(`PASS: ${images.size} local image paths in src + index.html exist in public; 0 missing`)
console.log(`PASS: ${externalLinks} external anchor templates use target=_blank and rel=noopener noreferrer`)

const vite = await createServer({ root, configFile: false, appType: 'custom', resolve: { alias: { '@': path.join(root, 'src') } }, esbuild: { jsx: 'automatic', jsxDev: false }, optimizeDeps: { noDiscovery: true }, server: { middlewareMode: true } })
try {
  const { getLocalizedContent } = await vite.ssrLoadModule('/src/data/localizedContent.ts')
  const { clientExperiences, selectedCases, experiences } = await vite.ssrLoadModule('/src/data/experiences.ts')
  const { Footer } = await vite.ssrLoadModule('/src/components/layout/Footer.tsx')
  const { LocaleContext } = await vite.ssrLoadModule('/src/context/LocaleContext.tsx')
  const es = getLocalizedContent('es'), en = getLocalizedContent('en')
  const shape = value => Array.isArray(value) ? value.map(shape) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, shape(value[key])])) : typeof value
  assert.deepEqual(shape(es), shape(en), 'ES/EN keys and list cardinality')
  for (const locale of ['es', 'en']) {
    const content = getLocalizedContent(locale)
    for (const value of Object.values(content.ui.footer)) assert.ok(value.trim())
    const html = renderToString(React.createElement(MemoryRouter, null, React.createElement(LocaleContext.Provider, { value: { locale, isSpanish: locale === 'es', setLocale() {}, toggleLocale() {} } }, React.createElement(Footer))))
    assert.ok(html.includes('mailto:' + content.personalInfo.email))
    assert.ok(html.includes(content.ui.footer.availability))
    assert.ok(html.includes(content.ui.footer.backToTop))
    assert.match(html, /Buenos Aires/)
    assert.doesNotMatch(html, /aria-live|abril de 2024|April 2024/)
    assert.match(html, /max-w-editorial/)
  }
  for (const slug of ['mdvproyectos', 'fefe-bakes', 'kyriazis']) {
    const entry = clientExperiences.find(item => item.slug === slug)
    assert.ok(entry.companyUrl && entry.projects[0].liveUrl === entry.companyUrl)
  }
  console.log('PASS: ES/EN key parity, footer copy, mailto, clock markup, shared container and production links')
  const missingProjects = clientExperiences.flatMap(entry => entry.projects.filter(project => !project.liveUrl).map(project => ({ entry: entry.company, project: project.name.es })))
  console.log('NO LIVE LINK — work entries: ' + JSON.stringify(missingProjects))
  console.log('NO LIVE LINK — selected cases: ' + JSON.stringify(selectedCases.filter(study => !study.project.liveUrl).map(study => study.title)))
  console.log('NO LIVE LINK — trajectory groups: ' + JSON.stringify(experiences.filter(entry => !entry.companyUrl).map(entry => entry.company)))
  console.log('NO LIVE LINK — personal projects: ' + JSON.stringify(es.projects.filter(project => !project.liveUrl).map(project => project.title)))
  console.log('NO LIVE LINK — demos: ' + JSON.stringify(es.projects.flatMap(project => (project.demos ?? []).filter(demo => !demo.liveUrl).map(demo => demo.title))))
  const oldFefe = ['/images/experiencia/fefe-bakes/fefebakes.webp', '/images/experiencia/fefe-bakes/fefebakes-mobile.webp']
  for (const src of oldFefe) { await access(path.join(root, 'public', src)); assert.ok(!images.has(src)) }
  console.log('UNUSED (preserved): ' + oldFefe.join(', '))
} finally { await vite.close() }
