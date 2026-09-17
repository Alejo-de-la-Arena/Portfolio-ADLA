import { useLocalizedContent } from '@/hooks/useLocalizedContent'

export function About() {
  const { about, ui } = useLocalizedContent()
  return <section id="about" className="section-space scroll-mt-20">
    <div className="editorial-grid mx-auto max-w-editorial gap-8 px-4 sm:px-6 lg:px-8">
      <header>
        <p className="eyebrow">{ui.about.eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{ui.about.titleStart} <span className="text-accent">{ui.about.titleAccent}</span></h2>
      </header>
      <div className="max-w-[68ch] space-y-5 text-base leading-8 text-foreground-secondary">
        {about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </div>
  </section>
}
