import { useReducedMotionPreference } from './useReducedMotionPreference'
import { createMotionVariants, entranceTrigger } from '@/lib/motion'

type Entrance = 'section' | 'card' | 'listItem' | 'smallGroupItem' | 'page'

/** Animate a heading, a card, or a group, never both a parent and its text. */
export function useEntrance(kind: Entrance = 'section', index = 0) {
  const reducedMotion = useReducedMotionPreference()
  return {
    ...entranceTrigger(reducedMotion),
    variants: createMotionVariants(reducedMotion)[kind],
    custom: index,
  }
}
