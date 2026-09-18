import { motionTokens, motionTransition, createMotionVariants } from '@/lib/motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotionPreference'
import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, MessageCircle } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { MeshDistortMaterial, Environment } from '@react-three/drei'
import { MagneticButton } from '../effects/MagneticButton'
import { SpotlightGrid } from '../effects/SpotlightGrid'
import { scrollToSection } from '@/lib/utils'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'
import { useMediaQuery } from '@/hooks/useMediaQuery'

/* ========== 3D ORB CLUSTER ========== */

function Scene() {
  return <>
    <ambientLight intensity={0.35} />
    <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a78bff" />
    <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#5a3fff" />
    {([
      { position: [0, 0, 0], scale: 1.5, color: '#7c5cff', distort: 0.45 },
      { position: [1.9, 1.2, -1], scale: 0.5, color: '#1a1730', distort: 0.2 },
      { position: [-2, -1, -0.5], scale: 0.6, color: '#a78bff', distort: 0.3 },
      { position: [1.6, -1.4, 0.4], scale: 0.4, color: '#3d2a8c', distort: 0.25 },
      { position: [-1.4, 1.6, -1.1], scale: 0.45, color: '#7c5cff', distort: 0.35 },
    ] satisfies Array<{ position: [number, number, number]; scale: number; color: string; distort: number }>).map((orb, index) =>
      <mesh key={index} position={orb.position} scale={orb.scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={orb.color} distort={orb.distort} speed={0} roughness={0.15} metalness={0.55} />
      </mesh>
    )}
    <Environment preset="city" />
  </>
}

/* ========== PILL CTA ========== */

function PillCTA({
  children,
  onClick,
  primary = false,
}: {
  children: React.ReactNode
  onClick: () => void
  primary?: boolean
}) {
  return (
    <MagneticButton onClick={onClick} variant={primary ? 'primary' : 'outline'}>
      <span className="inline-flex items-center gap-3">
        <span>{children}</span>
        <span
          className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-[var(--motion-fast)] group-hover:rotate-45 ${primary ? 'bg-background/15' : 'bg-foreground/10'}`}
        >
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
      </span>
    </MagneticButton>
  )
}

/* ========== HEADLINE STAGGERED ========== */

function StaggeredHeadline({ name, reduceMotion }: { name: string; reduceMotion: boolean | null }) {
  const parts = name.split(' ')
  const first = parts[0]
  const rest = parts.slice(1).join(' ')
  const variants = createMotionVariants(Boolean(reduceMotion)).smallGroupItem

  return (
    <h1 className="hero-name text-foreground">
      <span className="block">
        <motion.span
          className="block"
          variants={variants}
          initial={reduceMotion ? false : 'initial'}
          animate="visible"
          custom={0}
        >
          {first}
        </motion.span>
      </span>
      <span className="block">
        <motion.span
          className="text-gradient block hero-name-rest"
          variants={variants}
          initial={reduceMotion ? false : 'initial'}
          animate="visible"
          custom={1}
        >
          {rest}
        </motion.span>
      </span>
    </h1>
  )
}

/* ========== HERO ========== */

export function Hero() {
  const reduceMotion = useReducedMotionPreference()
  const { personalInfo, socialLinks, ui } = useLocalizedContent()
  const entry = (index: number) => ({
    initial: reduceMotion ? false as const : 'initial',
    animate: 'visible',
    variants: createMotionVariants(reduceMotion).smallGroupItem,
    custom: index,
  })
  const isMobile = useMediaQuery('(max-width: 768px)')

  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-x-hidden pt-0"
    >
      <SpotlightGrid />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div
        className="relative z-10 mx-auto w-full max-w-editorial px-4 pt-6 pb-4 sm:px-6 sm:py-16 lg:px-8"
      >
        {/* Main content grid */}
        <div className="grid items-center gap-8 sm:gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">

          {/* CLUSTER 3D — desktop: right column */}
          {!isMobile && (
            <motion.div
              {...entry(4)}
              className="order-first lg:order-last relative mx-auto aspect-square w-full justify-self-center lg:justify-self-end"
              style={{ maxWidth: 'min(82vw, 560px)' }}
            >
              <div className="absolute inset-[10%] rounded-full bg-accent/20 blur-3xl" />
              <div className="relative h-full w-full overflow-hidden rounded-3xl">
                <Canvas
                frameloop="demand"
                  camera={{ position: [0, 0, 8.5], fov: 45 }}
                  dpr={[1, 1.5]}
                  gl={{ antialias: true, alpha: true }}
                >
                  <Suspense fallback={null}>
                    <Scene />
                  </Suspense>
                </Canvas>

              </div>
            </motion.div>
          )}

          {/* CONTENIDO */}
          <div className={`space-y-7 sm:space-y-10 text-center ${isMobile ? 'flex flex-col items-center' : 'lg:text-left lg:order-first'}`}>
            <div className="space-y-4 sm:space-y-5">
              <StaggeredHeadline name={personalInfo.name} reduceMotion={reduceMotion} />
            </div>

            <motion.div {...entry(2)} className="mx-auto w-full max-w-xl rounded-2xl border border-border bg-background-secondary/80 p-5 text-left shadow-lg shadow-black/5 sm:p-6 lg:mx-0">
              <p className="max-w-lg font-display text-xl font-semibold leading-snug text-foreground sm:text-2xl">{personalInfo.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-foreground-secondary sm:text-base">
                {personalInfo.summary}
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-accent">
                {personalInfo.location.split(' · ').map(item => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-5 border-t border-border pt-4 text-sm leading-relaxed text-foreground-secondary">{personalInfo.availability}</p>
            </motion.div>

            <motion.div
              {...entry(3)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <PillCTA primary onClick={() => scrollToSection('cases')}>
                {ui.hero.viewProjects}
              </PillCTA>
              <PillCTA onClick={() => scrollToSection('contact')}>{ui.navbar.talk}</PillCTA>
              <button
                type="button"
                onClick={() => scrollToSection('experience')}
                className="hidden sm:inline-flex group ml-1 items-center gap-2 text-sm text-foreground-tertiary transition-none hover:text-foreground"
              >
                {ui.hero.viewExperience}
                <span className="h-px w-8 bg-border transition-transform origin-left group-hover:scale-x-125 group-hover:bg-foreground-secondary" />
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              {...entry(4)}
              className="hidden sm:block sm:!mt-5"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={reduceMotion ? undefined : { scale: motionTokens.interaction.hoverScale }}
                    transition={motionTransition(reduceMotion, 'fast', 'standard')}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background-secondary/40 text-foreground-secondary transition-none hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Canvas 3D mobile — debajo del texto, en el flujo */}
        {isMobile && (
          <motion.div
            {...entry(4)}
            className="mx-auto mt-8 h-[280px] w-full max-w-sm"
          >
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <div className="absolute inset-[10%] rounded-full" />
              <Canvas
                  frameloop="demand"
                camera={{ position: [0, 0, 8.5], fov: 45 }}
                dpr={[1, 1]}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <Scene />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
