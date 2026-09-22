import { useEntrance } from '@/hooks/useEntrance'
import { motionTokens, motionTransition } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Monitor, Server, GitBranch, Globe, Bot, Compass,
  Zap, RefreshCw, MessageSquare, Database, Braces, Triangle, Layers, Link2,
  ChevronDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLocale } from '@/context/LocaleContext'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'
import type { SkillItem, SkillCard } from '@/types'

// ─── Icon maps ─────────────────────────────────────────────────────────────────

const CARD_ICONS: Record<string, LucideIcon> = {
  Monitor, Server, GitBranch, Globe, Bot, Compass,
}

const SKILL_ICONS: Record<string, LucideIcon> = {
  Zap, RefreshCw, MessageSquare, Database, Braces, Triangle, Layers,
  Webhook: Link2,
  Bot,
}

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/'

function SkillItemTile({
  item,
  reduceMotion,
}: {
  item: SkillItem
  reduceMotion: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)

  const LucideComp = item.lucide ? (SKILL_ICONS[item.lucide] ?? null) : null
  const fallbackColor =
    item.fallbackColor === 'accent'
      ? 'rgb(var(--accent))'
      : (item.fallbackColor ?? 'rgb(var(--accent))')

  return (
    <div
      className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 cursor-default select-none"
      style={{
        backgroundColor: hovered ? 'rgb(124 92 255 / 0.10)' : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo / icon */}
      <div
        className="flex h-8 w-8 items-center justify-center"
        style={{
          transform: hovered && !reduceMotion ? `scale(${motionTokens.interaction.hoverScale})` : 'scale(1)',
          transition: 'transform var(--motion-fast) var(--motion-standard)',
        }}
      >
        {item.fallback ? (
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold leading-none"
            style={{
              color: fallbackColor,
              backgroundColor: `color-mix(in srgb, ${fallbackColor} 9.4%, transparent)`,
              border: `1px solid color-mix(in srgb, ${fallbackColor} 26.7%, transparent)`,
            }}
          >
            {item.fallback}
          </div>
        ) : LucideComp ? (
          <LucideComp size={20} className="text-accent" />
        ) : item.devicon && !imgError ? (
          item.darkBg ? (
            <span className="inline-flex items-center justify-center rounded bg-white p-0.5">
              <img
                src={`${DEVICON_BASE}${item.devicon}.svg`}
                alt={item.name}
                width={26}
                height={26}
                loading="lazy"
                decoding="async"
                onError={() => setImgError(true)}
                className={`h-[26px] w-[26px] object-contain${item.invert ? ' invert' : ''}`}
              />
            </span>
          ) : (
            <img
              src={`${DEVICON_BASE}${item.devicon}.svg`}
              alt={item.name}
              width={28}
              height={28}
              loading="lazy"
              decoding="async"
              onError={() => setImgError(true)}
              className={`h-7 w-7 object-contain${item.invert ? ' dark:invert' : ''}`}
            />
          )
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-xs font-bold text-accent">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name — always visible */}
      <span
        className="max-w-full break-words text-center text-xs leading-tight transition-none duration-[var(--motion-fast)]"
        style={{ color: hovered ? 'rgb(var(--accent))' : 'rgb(var(--foreground-tertiary, 136 136 136))' }}
      >
        {item.name}
      </span>
    </div>
  )
}

// ─── LevelSection ──────────────────────────────────────────────────────────────

function LevelSection({
  label,
  badgeClass,
  items,
  reduceMotion,
}: {
  label: string
  badgeClass: string
  items: SkillItem[]
  reduceMotion: boolean
}) {
  if (items.length === 0) return null
  return (
    <div>
      <span className={`mb-2 inline-flex items-center rounded px-2 py-0.5 text-xs font-bold tracking-widest ${badgeClass}`}>
        {label}
      </span>
      <div className="grid grid-cols-4 gap-0 sm:grid-cols-5 lg:grid-cols-6">
        {items.map(item => (
          <SkillItemTile
            key={item.name}
            item={item}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </div>
  )
}

// ─── SkillCardPanel ────────────────────────────────────────────────────────────

function SkillCardPanel({
  card,
  cardIndex,
  reduceMotion,
  showFamiliarLabel,
  hideFamiliarLabel,
}: {
  card: SkillCard
  cardIndex: number
  reduceMotion: boolean
  showFamiliarLabel: string
  hideFamiliarLabel: string
}) {
  const { isSpanish } = useLocale()
  const [showFamiliar, setShowFamiliar] = useState(false)
  const CardIcon = CARD_ICONS[card.icon] ?? Monitor
  const hasFamiliar = card.familiar.length > 0

  const entry = useEntrance('listItem', cardIndex)

  return (
    <motion.div
      {...entry}
      className="flex flex-col rounded-2xl border border-border bg-background-secondary/60 p-5"
    >
      {/* Card header */}
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <CardIcon size={16} />
          </div>
          <div>
            <h3 className="text-base font-semibold leading-tight text-foreground">{card.label}</h3>
            <p className="mt-0.5 text-xs text-foreground-secondary">{card.description}</p>
          </div>
        </div>

        {hasFamiliar && (
          <button
            onClick={() => setShowFamiliar(v => !v)}
            className="shrink-0 flex items-center gap-1 rounded-md border border-border/50 px-2 py-1 text-xs text-foreground-tertiary transition-none duration-[var(--motion-fast)] hover:border-accent/40 hover:text-accent"
            aria-expanded={showFamiliar}
          >
            {showFamiliar ? hideFamiliarLabel : showFamiliarLabel}
            <ChevronDown
              size={11}
              className="transition-transform duration-[var(--motion-fast)]"
              style={{ transform: showFamiliar ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
        )}
      </div>

      <div className="mb-3 h-px bg-border/40" />

      {/* Core + Strong — always visible */}
      <div className="flex-1 space-y-3">
        <LevelSection
          label={isSpanish ? 'PRINCIPALES' : 'CORE'}
          badgeClass="bg-accent-solid text-white"
          items={card.core}
          reduceMotion={reduceMotion}
        />
        <LevelSection
          label={isSpanish ? 'USO HABITUAL' : 'REGULAR USE'}
          badgeClass="bg-accent/15 text-accent-on-subtle border border-accent/30"
          items={card.strong}
          reduceMotion={reduceMotion}
        />
      </div>

      {/* Familiar — expandable with AnimatePresence */}
      <AnimatePresence initial={false}>
        {showFamiliar && hasFamiliar && (
          <motion.div
            key="familiar"
            initial={reduceMotion ? false : { opacity: motionTokens.opacity.initial }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={motionTransition(reduceMotion)}
            style={{ overflow: 'hidden' }}
          >
            <div className="mt-3 border-t border-border/30 pt-3">
              <LevelSection
                label={isSpanish ? 'FAMILIARIDAD' : 'FAMILIAR'}
                badgeClass="bg-background text-foreground-secondary border border-border/50"
                items={card.familiar}
                    reduceMotion={reduceMotion}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function Skills() {
  const heading = useEntrance()
  const reduceMotion = Boolean(useReducedMotionPreference())
  const { skills, ui } = useLocalizedContent()


  return (
    <section
      id="skills"
      className="relative overflow-hidden section-space bg-background-secondary/40"
    >
      <svg aria-hidden="true" focusable="false" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 h-full w-full text-accent opacity-[0.045]">
        <g fill="none" stroke="currentColor" strokeWidth="1.2">
          {[0, 1, 2, 3, 4, 5].map(index => <g key={index} transform={`translate(600 400) rotate(${index * 12})`}>
            <path d="M-430 0 C-430-260 200-290 260 0 S-250 280-260 0 S430-260 430 0 S-200 290-260 0 S250-280 260 0 S-430 260-430 0Z" />
          </g>)}
        </g>
      </svg>

      <div className="relative z-10 mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <div>
          {/* Section header */}
          <motion.div {...heading} className="editorial-grid mb-10">
            <div className="space-y-3">
              <p className="eyebrow">{ui.skills.eyebrow}</p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                {ui.skills.titleStart}{' '}
                <span className="text-accent">{ui.skills.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {ui.skills.intro}
            </p>
          </motion.div>

          {/* 6-card grid: 1 col mobile → 2 cols tablet+ */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.cards.map((card, i) => (
              <SkillCardPanel
                key={card.id}
                card={card}
                cardIndex={i}
                    reduceMotion={reduceMotion}
                showFamiliarLabel={ui.skills.showFamiliar}
                hideFamiliarLabel={ui.skills.hideFamiliar}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
