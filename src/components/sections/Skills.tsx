import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Monitor, Server, GitBranch, Globe, Bot, Compass,
  Zap, RefreshCw, MessageSquare, Database, Braces, Triangle, Layers, Link2,
  ChevronDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
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

// ─── Three.js TorusKnot background ────────────────────────────────────────────

function useTorusKnotBg(canvasRef: React.RefObject<HTMLCanvasElement | null>, reduceMotion: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const canvas = canvasRef.current
    if (!canvas) return

    const isMobile = window.innerWidth < 768

    const parent = canvas.parentElement
    const w = parent?.clientWidth ?? window.innerWidth
    const h = parent?.clientHeight ?? 500

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
    renderer.setSize(w, h)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 7

    // Mobile: 1 knot at half speed · Desktop: 3 knots full speed
    const speedMult = isMobile ? 0.5 : 1
    const configs: Array<{
      p: number; q: number; tube: number; size: number
      offset: [number, number, number]
      speed: [number, number, number]
    }> = isMobile
      ? [
          { p: 2, q: 3, tube: 0.28, size: 1.5, offset: [0, 0, 0], speed: [0.003 * speedMult, 0.005 * speedMult, 0.002 * speedMult] },
          { p: 3, q: 2, tube: 0.18, size: 0.75, offset: [-2.5, 1.2, -2], speed: [0.005 * speedMult, 0.003 * speedMult, 0.007 * speedMult] },
        ]
      : [
          { p: 2, q: 3, tube: 0.28, size: 1.5,  offset: [0, 0, 0],       speed: [0.003, 0.005, 0.002] },
          { p: 3, q: 2, tube: 0.18, size: 0.85, offset: [-3.2, 1.4, -2],  speed: [0.005, 0.003, 0.007] },
          { p: 4, q: 3, tube: 0.14, size: 0.65, offset: [3.0, -1.4, -3],  speed: [0.002, 0.007, 0.004] },
        ]

    const meshes: THREE.LineSegments[] = []

    configs.forEach(({ p, q, tube, size, offset, speed }) => {
      const geo = new THREE.TorusKnotGeometry(1, tube, 100, 16, p, q)
      const wireGeo = new THREE.WireframeGeometry(geo)
      geo.dispose()
      const mat = new THREE.LineBasicMaterial({ color: 0x7c3aed, transparent: true, opacity: 0.32 })
      const mesh = new THREE.LineSegments(wireGeo, mat)
      mesh.scale.setScalar(size)
      mesh.position.set(...offset)
      mesh.userData = { speed }
      scene.add(mesh)
      meshes.push(mesh)
    })

    let raf: number

    function animate() {
      raf = requestAnimationFrame(animate)
      if (!reduceMotion) {
        meshes.forEach(m => {
          const [rx, ry, rz] = m.userData.speed as [number, number, number]
          m.rotation.x += rx
          m.rotation.y += ry
          m.rotation.z += rz
        })
      }
      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      if (!canvas || !canvas.parentElement) return
      const nw = canvas.parentElement.clientWidth
      const nh = canvas.parentElement.clientHeight
      renderer.setSize(nw, nh)
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      meshes.forEach(m => {
        m.geometry.dispose()
        ;(m.material as THREE.LineBasicMaterial).dispose()
      })
      renderer.dispose()
    }
  }, [canvasRef, reduceMotion])
}

// ─── SkillItemTile ─────────────────────────────────────────────────────────────

function SkillItemTile({
  item,
  index,
  isInView,
  reduceMotion,
}: {
  item: SkillItem
  index: number
  isInView: boolean
  reduceMotion: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const [hovered, setHovered] = useState(false)

  const LucideComp = item.lucide ? (SKILL_ICONS[item.lucide] ?? null) : null
  const fallbackColor =
    item.fallbackColor === 'accent'
      ? 'var(--accent)'
      : (item.fallbackColor ?? 'var(--accent)')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : index * 0.025 }}
      className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 cursor-default select-none"
      style={{
        backgroundColor: hovered ? 'rgb(124 92 255 / 0.10)' : 'transparent',
        transition: 'background-color 0.18s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Logo / icon */}
      <div
        className="flex h-8 w-8 items-center justify-center"
        style={{
          transform: hovered && !reduceMotion ? 'scale(1.1)' : 'scale(1)',
          filter: hovered && !reduceMotion ? 'drop-shadow(0 0 6px var(--accent))' : 'none',
          transition: 'transform 0.18s ease, filter 0.18s ease',
        }}
      >
        {item.fallback ? (
          <div
            className="flex h-7 w-7 items-center justify-center rounded-md text-[9px] font-bold leading-none"
            style={{
              color: fallbackColor,
              backgroundColor: `${fallbackColor}18`,
              border: `1px solid ${fallbackColor}44`,
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
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-accent/30 bg-accent/10 text-[9px] font-bold text-accent">
            {item.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Name — always visible */}
      <span
        className="max-w-[64px] text-center text-[9px] leading-tight transition-colors duration-200"
        style={{ color: hovered ? 'var(--accent)' : 'var(--foreground-tertiary, #888)' }}
      >
        {item.name}
      </span>
    </motion.div>
  )
}

// ─── LevelSection ──────────────────────────────────────────────────────────────

function LevelSection({
  label,
  badgeClass,
  items,
  startIndex,
  isInView,
  reduceMotion,
}: {
  label: string
  badgeClass: string
  items: SkillItem[]
  startIndex: number
  isInView: boolean
  reduceMotion: boolean
}) {
  if (items.length === 0) return null
  return (
    <div>
      <span className={`mb-2 inline-flex items-center rounded px-2 py-0.5 text-[9px] font-bold tracking-widest ${badgeClass}`}>
        {label}
      </span>
      <div className="grid grid-cols-4 gap-0 sm:grid-cols-5 lg:grid-cols-6">
        {items.map((item, i) => (
          <SkillItemTile
            key={item.name}
            item={item}
            index={startIndex + i}
            isInView={isInView}
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
  isInView,
  reduceMotion,
  showFamiliarLabel,
  hideFamiliarLabel,
}: {
  card: SkillCard
  cardIndex: number
  isInView: boolean
  reduceMotion: boolean
  showFamiliarLabel: string
  hideFamiliarLabel: string
}) {
  const [showFamiliar, setShowFamiliar] = useState(false)
  const CardIcon = CARD_ICONS[card.icon] ?? Monitor
  const hasFamiliar = card.familiar.length > 0

  // stagger offset so tiles animate in sequence across the card
  const baseIdx = cardIndex * 12

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, delay: reduceMotion ? 0 : cardIndex * 0.08 }}
      className="flex flex-col rounded-2xl border border-border bg-background-secondary/60 p-5"
    >
      {/* Card header */}
      <div className="mb-3 flex items-start justify-between gap-2">
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
            className="shrink-0 flex items-center gap-1 rounded-md border border-border/50 px-2 py-1 text-[10px] text-foreground-tertiary transition-colors duration-200 hover:border-accent/40 hover:text-accent"
            aria-expanded={showFamiliar}
          >
            {showFamiliar ? hideFamiliarLabel : showFamiliarLabel}
            <ChevronDown
              size={11}
              className="transition-transform duration-200"
              style={{ transform: showFamiliar ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>
        )}
      </div>

      <div className="mb-3 h-px bg-border/40" />

      {/* Core + Strong — always visible */}
      <div className="flex-1 space-y-3">
        <LevelSection
          label="CORE"
          badgeClass="bg-accent text-white"
          items={card.core}
          startIndex={baseIdx}
          isInView={isInView}
          reduceMotion={reduceMotion}
        />
        <LevelSection
          label="STRONG"
          badgeClass="bg-accent/15 text-accent border border-accent/30"
          items={card.strong}
          startIndex={baseIdx + card.core.length}
          isInView={isInView}
          reduceMotion={reduceMotion}
        />
      </div>

      {/* Familiar — expandable with AnimatePresence */}
      <AnimatePresence initial={false}>
        {showFamiliar && hasFamiliar && (
          <motion.div
            key="familiar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="mt-3 border-t border-border/30 pt-3">
              <LevelSection
                label="FAMILIAR"
                badgeClass="bg-background text-foreground-secondary border border-border/50"
                items={card.familiar}
                startIndex={baseIdx + card.core.length + card.strong.length}
                isInView={isInView}
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const inViewRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(inViewRef, { once: true, margin: '-80px' })
  const reduceMotion = Boolean(useReducedMotion())
  const { isRecruiterMode } = usePortfolioMode()
  const { skills, ui } = useLocalizedContent()

  useTorusKnotBg(canvasRef, reduceMotion)

  return (
    <section
      id="skills"
      className="relative overflow-hidden section-space bg-background-secondary/40"
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ opacity: 0.20, zIndex: 0 }}
      />

      <div className="relative z-10 mx-auto max-w-editorial px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={inViewRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          {/* Section header */}
          <div className="editorial-grid mb-10">
            <div className="space-y-3">
              <p className="eyebrow">{ui.skills.eyebrow}</p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                {ui.skills.titleStart}{' '}
                <span className="text-accent">{ui.skills.titleAccent}</span>
              </h2>
            </div>
            <p className="max-w-2xl text-foreground-secondary">
              {isRecruiterMode ? ui.skills.recruiterIntro : ui.skills.deepIntro}
            </p>
          </div>

          {/* 6-card grid: 1 col mobile → 2 cols tablet+ */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {skills.cards.map((card, i) => (
              <SkillCardPanel
                key={card.id}
                card={card}
                cardIndex={i}
                isInView={isInView}
                reduceMotion={reduceMotion}
                showFamiliarLabel={ui.skills.showFamiliar}
                hideFamiliarLabel={ui.skills.hideFamiliar}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
