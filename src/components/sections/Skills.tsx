import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { skillExamples, skills, optimizationFocus } from '@/data/content'
import { usePortfolioMode } from '@/context/PortfolioModeContext'

export function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { isRecruiterMode } = usePortfolioMode()
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const skillCategories = useMemo(() => [
    { key: 'frontend', data: skills.frontend },
    { key: 'backend', data: skills.backend },
    { key: 'devops', data: skills.devops },
    { key: 'testing', data: skills.testing },
  ], [])

  const SkillLevel = ({ items, level }: { items: string[], level: string }) => (
    <div className="mb-4">
      <p className="text-xs text-foreground-tertiary uppercase mb-2 font-medium">{level}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <button
            type="button"
            key={skill}
            onMouseEnter={() => setActiveSkill(skill)}
            onFocus={() => setActiveSkill(skill)}
            onMouseLeave={() => setActiveSkill(null)}
            className="px-3 py-1.5 text-sm rounded-lg bg-background-tertiary text-foreground hover:bg-border-light transition-colors"
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <section id="skills" className="section-space bg-background-secondary/40">
      <div className="mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="editorial-grid mb-10">
            <div className="space-y-3">
              <p className="eyebrow">Mapa de habilidades</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold">
                Capacidades por <span className="text-accent">nivel de profundidad</span>
              </h2>
            </div>
            <p className="text-foreground-secondary max-w-2xl">
              {isRecruiterMode
                ? 'Core, strong y familiar para validar encaje de stack rápidamente.'
                : 'Vista técnica para entender cómo aplico cada tecnología en producto real.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.key}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="rounded-2xl border border-border bg-background-secondary/80 p-6"
              >
                <h3 className="text-xl font-semibold mb-6">{category.data.label}</h3>
                <div className="space-y-4">
                  <SkillLevel items={category.data.core} level="Core" />
                  <SkillLevel items={category.data.strong} level="Strong" />
                  {!isRecruiterMode && <SkillLevel items={category.data.familiar} level="Familiar" />}
                </div>
              </motion.div>
            ))}
          </div>

          {activeSkill && skillExamples[activeSkill] && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-foreground-secondary"
            >
              <span className="text-foreground font-medium">{activeSkill}: </span>
              {skillExamples[activeSkill]}
            </motion.div>
          )}

          {/* Optimization Focus */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Qué optimizo en cada proyecto</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {optimizationFocus.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="rounded-2xl border border-border bg-background-secondary/80 p-5 text-center"
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-foreground-secondary">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
