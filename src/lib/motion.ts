import type { Transition, Variants } from 'framer-motion'

/** Seconds, except for distance (CSS pixels). Shared by Motion and CSS consumers. */
export const motionTokens = {
  duration: { fast: 0.16, medium: 0.28, slow: 0.4 },
  ease: {
    enter: [0.22, 1, 0.36, 1],
    standard: [0.4, 0, 0.2, 1],
  },
  distance: 8,
  opacity: { initial: 0.85, visible: 1 },
  stagger: { step: 0.05, maxDelay: 0.15 },
  interaction: { hoverScale: 1.015, pressScale: 0.985 },
  viewport: { once: true, amount: 0.15 },
} as const

type Duration = keyof typeof motionTokens.duration
type Ease = keyof typeof motionTokens.ease

export function motionTransition(
  reducedMotion: boolean,
  duration: Duration = 'medium',
  ease: Ease = 'enter',
): Transition {
  return {
    type: 'tween',
    duration: reducedMotion ? 0 : motionTokens.duration[duration],
    ease: motionTokens.ease[ease],
    delay: 0,
  }
}

/** Use a viewport-local index, never the position in the entire page. */
export function staggerDelay(index: number, reducedMotion: boolean): number {
  if (reducedMotion || !Number.isFinite(index)) return 0
  return Math.min(
    Math.max(0, index) * motionTokens.stagger.step,
    motionTokens.stagger.maxDelay,
  )
}

/**
 * Pick one entrance per element: do not nest an animated section around
 * animated cards. Section variants belong on headings or static groups.
 * List items use custom={localIndex}; no unbounded parent staggerChildren.
 */
export function createMotionVariants(reducedMotion: boolean) {
  const visible = { opacity: motionTokens.opacity.visible, y: 0 }
  const initial = reducedMotion
    ? visible
    : { opacity: motionTokens.opacity.initial, y: motionTokens.distance }

  const entrance = (duration: Duration): Variants => ({
    initial,
    visible: {
      ...visible,
      transition: motionTransition(reducedMotion, duration),
    },
  })

  const listItem: Variants = {
    initial,
    visible: (index: number = 0) => ({
      ...visible,
      transition: {
        ...motionTransition(reducedMotion),
        delay: staggerDelay(index, reducedMotion),
      },
    }),
  }

  return {
    section: entrance('slow'),
    listItem,
    card: entrance('medium'),
    // Animate a route heading/shell only if its children have no entrance.
    // Do not wait for an exit before mounting the next page.
    page: entrance('fast'),
    interaction: {
      rest: {
        scale: 1,
        transition: motionTransition(reducedMotion, 'fast', 'standard'),
      },
      hover: {
        scale: reducedMotion ? 1 : motionTokens.interaction.hoverScale,
        transition: motionTransition(reducedMotion, 'fast', 'standard'),
      },
      press: {
        scale: reducedMotion ? 1 : motionTokens.interaction.pressScale,
        transition: motionTransition(reducedMotion, 'fast', 'standard'),
      },
    } satisfies Variants,
  }
}

/** IntersectionObserver via whileInView; no continuous scroll subscriptions. */
export function entranceTrigger(reducedMotion: boolean) {
  return {
    initial: reducedMotion ? false : 'initial',
    whileInView: 'visible',
    viewport: motionTokens.viewport,
  } as const
}
