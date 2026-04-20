import { Suspense, useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, MessageCircle } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { MagneticButton } from '../effects/MagneticButton'
import { SpotlightGrid } from '../effects/SpotlightGrid'
import { scrollToSection } from '@/lib/utils'
import { usePortfolioMode } from '@/context/PortfolioModeContext'
import { useLocalizedContent } from '@/hooks/useLocalizedContent'

/* ========== 3D ORB CLUSTER ========== */

type OrbProps = {
  position: [number, number, number]
  scale: number
  color: string
  distort?: number
  speed?: number
}

function Orb({ position, scale, color, distort = 0.3, speed = 1 }: OrbProps) {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.1 * speed
    ref.current.rotation.y = state.clock.elapsedTime * 0.15 * speed
  })
  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.7}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={speed * 1.4}
          roughness={0.15}
          metalness={0.55}
        />
      </mesh>
    </Float>
  )
}

const MAX_ROT = 0.12 // clamp de rotación en radianes (≈7°) — evita que los orbs se salgan del frustum

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function Scene({
  mx,
  my,
}: {
  mx: ReturnType<typeof useMotionValue<number>>
  my: ReturnType<typeof useMotionValue<number>>
}) {
  const groupRef = useRef<THREE.Group>(null!)
  useFrame(() => {
    if (!groupRef.current) return
    const targetY = clamp(mx.get() * 0.0004, -MAX_ROT, MAX_ROT)
    const targetX = clamp(my.get() * 0.0004, -MAX_ROT, MAX_ROT)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.06)
  })
  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#a78bff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#5a3fff" />
      {/* Posiciones más conservadoras (radios reducidos ~15%) para que con la rotación no toquen los bordes */}
      <Orb position={[0, 0, 0]} scale={1.5} color="#7c5cff" distort={0.45} speed={0.8} />
      <Orb position={[1.9, 1.2, -1]} scale={0.5} color="#1a1730" distort={0.2} speed={1.2} />
      <Orb position={[-2.0, -1.0, -0.5]} scale={0.6} color="#a78bff" distort={0.3} speed={0.9} />
      <Orb position={[1.6, -1.4, 0.4]} scale={0.4} color="#3d2a8c" distort={0.25} speed={1.5} />
      <Orb position={[-1.4, 1.6, -1.1]} scale={0.45} color="#7c5cff" distort={0.35} speed={1.1} />
      <Environment preset="city" />
    </group>
  )
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
          className={`grid h-7 w-7 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${primary ? 'bg-background/15' : 'bg-foreground/10'
            }`}
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
  const variants = {
    hidden: { opacity: 0, y: '110%' },
    show: (i: number) => ({
      opacity: 1,
      y: '0%',
      transition: { delay: 0.15 + i * 0.08, duration: 0.85, ease: [0.19, 1, 0.22, 1] },
    }),
  }
  return (
    <h1 className="hero-name text-foreground">
      <span className="block overflow-hidden">
        <motion.span
          className="block"
          variants={variants}
          initial={reduceMotion ? 'show' : 'hidden'}
          animate="show"
          custom={0}
        >
          {first}
        </motion.span>
      </span>
      <span className="block overflow-hidden">
        <motion.span
          className="text-gradient block hero-name-rest"
          variants={variants}
          initial={reduceMotion ? 'show' : 'hidden'}
          animate="show"
          custom={1}
        >
          {rest}
        </motion.span>
      </span>
    </h1>
  )
}

/* ========== STACK MARQUEE ========== */

const STACK = [
  'React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion',
  'Three.js', 'Node', 'PostgreSQL', 'Vite', 'Zod', 'Vitest', 'Figma',
]

function StackMarquee({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <div className="relative mt-14 sm:mt-20 overflow-hidden border-y border-border/60 py-5">
      <motion.div
        className="flex gap-12 whitespace-nowrap text-xs sm:text-sm uppercase tracking-[0.18em] text-foreground-tertiary"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {[...STACK, ...STACK].map((tech, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="h-1 w-1 rounded-full bg-accent/70" />
            {tech}
          </span>
        ))}
      </motion.div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}

/* ========== HERO ========== */

export function Hero() {
  const reduceMotion = useReducedMotion()
  const { isRecruiterMode } = usePortfolioMode()
  const { modeLabels, personalInfo, socialLinks, ui } = useLocalizedContent()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const smoothMx = useSpring(mx, { stiffness: 60, damping: 20 })
  const smoothMy = useSpring(my, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mx.set(e.clientX - window.innerWidth / 2)
      my.set(e.clientY - window.innerHeight / 2)
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [mx, my])

  const socials = [
    { icon: Github, href: socialLinks.github, label: 'GitHub' },
    { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp' },
  ]

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-center overflow-x-hidden pt-20 sm:pt-16"
    >
      <SpotlightGrid />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background via-background/80 to-transparent" />

      <div
        className="relative z-10 mx-auto w-full py-8 sm:py-16"
        style={{
          maxWidth: '1480px',
          paddingLeft: 'clamp(1.25rem, 4vw, 4rem)',
          paddingRight: 'clamp(1.25rem, 4vw, 4rem)',
        }}
      >
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-20">

          {/* CLUSTER 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="order-first lg:order-last relative mx-auto aspect-square w-full justify-self-center lg:justify-self-end"
            style={{ maxWidth: 'min(82vw, 560px)' }}
          >
            <div className="absolute inset-[10%] rounded-full bg-accent/20 blur-3xl" />

            {/* overflow-hidden + padding interno: el cluster nunca se sale visualmente */}
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Canvas
                camera={{ position: [0, 0, 8.5], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <Scene mx={smoothMx} my={smoothMy} />
                </Suspense>
              </Canvas>

              <div className="pointer-events-none absolute bottom-3 right-3 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background-secondary/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-foreground-tertiary backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {ui.hero.move}
              </div>
            </div>
          </motion.div>

          {/* CONTENIDO */}
          <div className="order-last lg:order-first space-y-7 sm:space-y-10 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-5">
              <p className="eyebrow">
                {isRecruiterMode ? modeLabels.recruiter : modeLabels.deep}
              </p>
              <StaggeredHeadline name={personalInfo.name} reduceMotion={reduceMotion} />
              <p className="mx-auto lg:mx-0 max-w-md text-sm sm:text-base text-foreground-secondary">
                {personalInfo.role}
              </p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto lg:mx-0 max-w-xl text-base sm:text-lg leading-relaxed text-foreground-secondary"
            >
              {isRecruiterMode ? personalInfo.recruiterSummary : personalInfo.deepDiveSummary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <PillCTA primary onClick={() => scrollToSection('projects')}>
                {ui.hero.viewProjects}
              </PillCTA>
              <PillCTA onClick={() => scrollToSection('contact')}>{ui.navbar.talk}</PillCTA>
              <button
                type="button"
                onClick={() => scrollToSection('experience')}
                className="hidden sm:inline-flex group ml-1 items-center gap-2 text-sm text-foreground-tertiary transition-colors hover:text-foreground"
              >
                {ui.hero.viewExperience}
                <span className="h-px w-8 bg-border transition-all group-hover:w-12 group-hover:bg-foreground-secondary" />
              </button>
            </motion.div>

            {/* Proof + socials — solo desde sm+ (en mobile va limpio tipo dialedweb) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="hidden sm:block space-y-6 pt-2"
            >
              <ul className="flex flex-wrap justify-center lg:justify-start gap-2">
                {personalInfo.proof.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border/70 bg-background-secondary/40 px-3 py-1.5 text-xs text-foreground-secondary backdrop-blur-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -2 }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-border/70 bg-background-secondary/40 text-foreground-secondary transition-colors hover:border-accent/50 hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <StackMarquee reduceMotion={reduceMotion} />
      </div>
    </section>
  )
}