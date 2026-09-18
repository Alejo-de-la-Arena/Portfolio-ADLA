import { useId, useState } from 'react'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function About() {
  const { about, ui } = useLocalizedContent()
  const [expanded, setExpanded] = useState(false)
  const detailsId = useId()
  return <section id="about" className="section-space scroll-mt-20">
    <div className="editorial-grid mx-auto max-w-editorial gap-8 px-4 sm:px-6 lg:px-8">
      <header>
        <p className="eyebrow">{ui.about.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{ui.about.titleStart} <span className="text-accent">{ui.about.titleAccent}</span></h2>
      </header>
      <div className="min-w-0 max-w-[68ch] text-base leading-8 text-foreground-secondary">
        <p>{about.summary}</p>
        <div id={detailsId} aria-hidden={!expanded} className="grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none" style={{ gridTemplateRows: expanded ? '1fr' : '0fr', visibility: expanded ? 'visible' : 'hidden' }}>
          <div className="min-h-0 overflow-hidden">
            <div className="space-y-5 pt-5">{about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          </div>
        </div>
        <button type="button" aria-expanded={expanded} aria-controls={detailsId} onClick={() => setExpanded(value => !value)} className="mt-3 min-h-11 rounded-sm text-sm font-medium text-accent underline underline-offset-4 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          {expanded ? about.showLess : about.showMore}
        </button>
      </div>
    </div>
  </section>
}
