import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter, Routes, Route } from 'react-router-dom'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const vite = await createServer({
  root, configFile: false, appType: 'custom',
  resolve: { alias: { '@': path.join(root, 'src') } },
  esbuild: { jsx: 'automatic', jsxDev: false },
  optimizeDeps: { noDiscovery: true },
  server: { middlewareMode: true },
})
const h = React.createElement
try {
  const { LocaleContext } = await vite.ssrLoadModule('/src/context/LocaleContext.tsx')
  const { PortfolioModeContext } = await vite.ssrLoadModule('/src/context/PortfolioModeContext.tsx')
  const { clientExperiences, experiences, selectedCases, getExperienceBySlug, localizeExperience } = await vite.ssrLoadModule('/src/data/experiences.ts')
  const { getLocalizedContent } = await vite.ssrLoadModule('/src/data/localizedContent.ts')
  const { ExperienceDetailPage } = await vite.ssrLoadModule('/src/components/experience/ExperienceDetailPage.tsx')
  const render = (child, locale, entry = '/', mode = 'recruiter') => renderToString(
    h(MemoryRouter, { initialEntries: [entry] },
      h(LocaleContext.Provider, { value: { locale, isSpanish: locale === 'es', setLocale() {}, toggleLocale() {} } },
        h(PortfolioModeContext.Provider, { value: { mode, isRecruiterMode: mode === 'recruiter', isDeepDiveMode: mode === 'deep', setMode() {}, toggleMode() {} } }, child))))

  assert.equal(experiences.length, 2, 'Home must have two trajectory entries')
  assert.equal(getExperienceBySlug('zetenta').projects.length, 7)
  const freelance = getExperienceBySlug('freelance')
  assert.equal(freelance.projects.length, 8)
  assert.equal(freelance.startDate.year, 2024)
  assert.equal(freelance.startDate.month, 4)
  assert.equal(freelance.endDate, null)
  assert.equal(freelance.projects.at(-1).id, 'kyriazis')
  const dated = clientExperiences.filter(e => e.type === 'freelance' && e.startDate).sort((a,b) => b.startDate.year - a.startDate.year || b.startDate.month - a.startDate.month)
  assert.deepEqual(freelance.projects.slice(2).map(p => p.id), dated.map(e => e.slug === 'espacio-boa' ? 'boa' : e.slug))
  for (const slug of ['don-teofilo-amoblamientos', 'format']) {
    const entry = getExperienceBySlug(slug)
    assert.equal(entry.startDate, null)
    assert.equal(entry.projects[0].media.length, 1)
    for (const locale of ['es', 'en']) assert.equal(entry.projects[0].body[locale].length, 4)
  }
  assert.equal(getExperienceBySlug('espacio-boa').projects[0].media.length, 1, 'BOA must not render a carousel')
  assert.equal(getExperienceBySlug('zetenta').projects.find(p => p.id === 'zetenta-site').media.length, 3, 'Preserve Zetenta slider')
  for (const study of selectedCases) {
    const [route, anchor] = study.href.split('#')
    assert.ok(getExperienceBySlug(route.split('/').pop()).projects.some(p => p.id === anchor), study.href)
    assert.equal(study.body.es.length, 4)
    assert.equal(study.body.en.length, 4)
  }

  const registered = new Map()
  for (const experience of clientExperiences) for (const project of experience.projects) for (const media of project.media) {
    for (const shot of [media.desktop, media.mobile].filter(Boolean)) registered.set(shot.src, shot)
  }
  for (const [src, shot] of registered) {
    assert.doesNotMatch(src, /admin|giftcard|inscripciones|metricas|fefebakes/i, 'Excluded screenshot registered')
    assert.ok(shot.alt.es && shot.alt.en)
    const filename = path.join(root, 'public', src)
    await access(filename)
    const bytes = await readFile(filename)
    if (src.endsWith('.png')) {
      assert.equal(bytes.toString('ascii', 1, 4), 'PNG')
      assert.deepEqual([bytes.readUInt32BE(16), bytes.readUInt32BE(20)], [shot.width, shot.height], src)
      continue
    }
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
    let size
    for (let offset = 12; offset + 8 < bytes.length;) {
      const chunk = bytes.toString('ascii', offset, offset + 4)
      const length = bytes.readUInt32LE(offset + 4)
      const data = offset + 8
      if (chunk === 'VP8X') size = [bytes.readUIntLE(data + 4, 3) + 1, bytes.readUIntLE(data + 7, 3) + 1]
      if (chunk === 'VP8 ' && !size) size = [bytes.readUInt16LE(data + 6) & 0x3fff, bytes.readUInt16LE(data + 8) & 0x3fff]
      if (chunk === 'VP8L' && !size) { const bits = bytes.readUInt32LE(data + 1); size = [(bits & 0x3fff) + 1, ((bits >>> 14) & 0x3fff) + 1] }
      offset = data + length + (length % 2)
    }
    assert.deepEqual(size, [shot.width, shot.height], src)
  }
  console.log('PASS: 15 work entries, case anchors, BOA single view, Zetenta slider, ' + registered.size + ' local screenshot contracts')

  for (const locale of ['es', 'en']) {
    const content = getLocalizedContent(locale)
    assert.deepEqual(content.projects.map(p => p.title), ['JobSearchBot', 'VYZON'])
    assert.deepEqual(content.projects[1].demos.map(d => d.title), ['TaskFlow', 'AURA AI', 'OBSIDIAN'])
    for (const demo of content.projects[1].demos) assert.match(demo.label, locale === 'es' ? /ficticio/ : /fictional/)
    assert.match(content.projects[0].results.join(' '), /stubs/)
    assert.equal(content.projects[0].roadmap.length, 6)
    assert.match(content.personalInfo.location, /B2/)
    assert.match(content.personalInfo.availability, /part-time/)
    assert.doesNotMatch(JSON.stringify(content), /NAVE|Naranja X|validated in production|95%|13 rutas|13 public|4 años|4 years|NECESITO|NEEDED/)
    if (locale === 'en') assert.doesNotMatch(JSON.stringify(content.skills), /básico|Agentes IA|Explorando|Plataformas|Automatización/)
    for (const mode of ['recruiter', 'deep']) {
      for (const name of ['Hero', 'SelectedCases', 'Experience', 'About', 'Projects', 'Skills', 'Contact']) {
        const mod = await vite.ssrLoadModule('/src/components/sections/' + name + '.tsx')
        const html = render(h(mod[name]), locale, '/', mode)
        assert.ok(html.length > 100, name)
        if (name === 'Hero') { assert.match(html, /B2/); assert.match(html, /part-time/); assert.match(html, /UTC−3/) }
        if (name === 'Experience') assert.equal((html.match(/<li /g) ?? []).length, 2)
        if (name === 'SelectedCases') for (const study of selectedCases) assert.ok(html.includes(study.href))
        if (name === 'Projects') { assert.match(html, /JobSearchBot/); assert.match(html, /VYZON/); assert.ok(html.includes(locale === 'es' ? 'No es una agencia con clientes.' : 'It is not an agency with clients.')) }
      }
    }
    for (const slug of ['zetenta', 'freelance', 'solution', 'espacio-boa', 'renova-tu-cocina', 'mdvproyectos', 'fefe-bakes', 'kyriazis', 'don-teofilo-amoblamientos', 'format']) {
      const html = render(h(Routes, null, h(Route, { path: '/experiencia/:slug', element: h(ExperienceDetailPage) })), locale, '/experiencia/' + slug)
      const source = getExperienceBySlug(slug)
      assert.ok(html.includes(localizeExperience(source, locale).company))
      for (const project of source.projects) assert.ok(html.includes('id="' + project.id + '"'), slug + '#' + project.id)
      if (source.type === 'freelance' && slug !== 'freelance') {
        const order = freelance.projects.map(p => p.id === 'boa' ? 'espacio-boa' : p.id)
        const index = order.indexOf(slug)
        for (const adjacent of [order[index - 1], order[index + 1]].filter(Boolean)) assert.ok(html.includes('href="/experiencia/' + adjacent + '"'), slug + ' navigation to ' + adjacent)
        if (slug === 'kyriazis') assert.ok(!html.includes('Next experience</span>') && !html.includes('Experiencia siguiente</span>'))
      }
      assert.doesNotMatch(html, /admin-actividades|admin-giftcards|boa-inscripciones|solution-metricas|fefebakes/)
      if (slug === 'solution' || slug === 'freelance') { assert.match(html, locale === 'es' ? /1\.086/ : /1,086/); assert.match(html, locale === 'es' ? /14 de septiembre de 2026/ : /September 14, 2026/) }
      if (slug === 'renova-tu-cocina') { assert.match(html, locale === 'es' ? /1 MES/ : /1 MONTH/); assert.doesNotMatch(html.replace(/<[^>]*>/g, ''), /\b13\b|nunca|never/) }
      if (slug === 'zetenta') { assert.match(html, /<picture>/); assert.match(html, /min-width: 1024px/); assert.match(html, /inert=""/) }
    }
    console.log('PASS: ' + locale.toUpperCase() + ' home sections in both reading modes, 10 routes, anchors, claims, roadmap, and localized skills')
  }
  const app = await readFile(path.join(root, 'src/App.tsx'), 'utf8')
  assert.ok(app.indexOf('<SelectedCases />') < app.indexOf('<Experience />'))
  assert.ok(app.indexOf('<SelectedCases />') < app.indexOf('<About />'))
  console.log('PASS: selected cases precede Experience and About')
} finally { await vite.close() }
