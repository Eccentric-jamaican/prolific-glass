import { useMemo } from "react"
import type { Variants } from "framer-motion"
import { useReducedMotion } from "framer-motion"

const easings = {
  standard: [0.22, 1, 0.36, 1] as const,
  emphasize: [0.16, 1, 0.3, 1] as const,
  entrance: [0.34, 1.56, 0.64, 1] as const,
}

export const motionDurations = {
  xs: 0.28,
  sm: 0.55,
  md: 0.85,
  lg: 1,
  xl: 1.1,
} as const

type Axis = "x" | "y"

type DirectionalOptions = {
  distance?: number
  exitDistance?: number
  opacity?: number
  transition?: TransitionOverrides
}

type FadeOptions = {
  opacity?: number
  transition?: TransitionOverrides
}

type ScaleOptions = {
  scale?: number
  transition?: TransitionOverrides
}

type BlurOptions = {
  blur?: number
  opacity?: number
  transition?: TransitionOverrides
}

type TransitionOverrides = Record<string, unknown>

const mergeTransition = (
  base: Record<string, unknown>,
  override?: Record<string, unknown>
) => ({
  ...base,
  ...(override ?? {}),
})

const createDirectional = (axis: Axis, defaultDistance: number) => (
  options: DirectionalOptions = {}
): Variants => {
  const { distance = defaultDistance, exitDistance = distance * 0.6, opacity = 0, transition } = options

  const hiddenPosition = axis === "x" ? { x: distance } : { y: distance }
  const showPosition = axis === "x" ? { x: 0 } : { y: 0 }
  const exitPosition = axis === "x" ? { x: exitDistance } : { y: exitDistance }

  return {
    hidden: {
      opacity,
      ...hiddenPosition,
    },
    show: {
      opacity: 1,
      ...showPosition,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.md,
          ease: easings.emphasize,
        },
        transition
      ),
    },
    exit: {
      opacity,
      ...exitPosition,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.sm,
          ease: easings.standard,
        },
        transition
      ),
    },
  } as Variants
}

const fade = (options: FadeOptions = {}): Variants => {
  const { opacity = 0, transition } = options
  return {
    hidden: { opacity },
    show: {
      opacity: 1,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.md,
          ease: easings.standard,
        },
        transition
      ),
    },
    exit: {
      opacity,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.sm,
          ease: easings.standard,
        },
        transition
      ),
    },
  } as Variants
}

const scale = (options: ScaleOptions = {}): Variants => {
  const { scale: initialScale = 0.92, transition } = options
  return {
    hidden: { opacity: 0, scale: initialScale },
    show: {
      opacity: 1,
      scale: 1,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.md,
          ease: easings.entrance,
        },
        transition
      ),
    },
    exit: {
      opacity: 0,
      scale: initialScale,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.sm,
          ease: easings.standard,
        },
        transition
      ),
    },
  } as Variants
}

const blur = (options: BlurOptions = {}): Variants => {
  const { blur: hiddenBlur = 12, opacity = 0, transition } = options
  return {
    hidden: { opacity, filter: `blur(${hiddenBlur}px)` },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.md,
          ease: easings.emphasize,
        },
        transition
      ),
    },
    exit: {
      opacity,
      filter: `blur(${hiddenBlur}px)`,
      transition: mergeTransition(
        {
          type: "tween",
          duration: motionDurations.sm,
          ease: easings.standard,
        },
        transition
      ),
    },
  } as Variants
}

export const motionPresets = {
  fade,
  fadeUp: createDirectional("y", 32),
  fadeDown: createDirectional("y", -32),
  fadeLeft: createDirectional("x", 32),
  fadeRight: createDirectional("x", -32),
  scale,
  blur,
}

export type MotionPresetName = keyof typeof motionPresets

const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
  show: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
}

export function useMotionPreset<T extends MotionPresetName>(
  preset: T,
  options?: Parameters<(typeof motionPresets)[T]>[0]
): Variants {
  const prefersReducedMotion = useReducedMotion()

  return useMemo(() => {
    if (prefersReducedMotion) {
      return reducedMotionVariants
    }
    const factory = motionPresets[preset] as (arg?: unknown) => Variants
    return factory(options)
  }, [options, prefersReducedMotion, preset])
}

type StaggerConfig = {
  delay?: number
  stagger?: number
  direction?: 1 | -1
}

export const staggerContainer = ({
  delay = 0,
  stagger = 0.08,
  direction = 1,
}: StaggerConfig = {}): Variants => ({
  hidden: {},
  show: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
      staggerDirection: direction,
    },
  },
})
