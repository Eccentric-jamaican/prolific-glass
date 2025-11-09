"use client"

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { ReactNode } from "react"
import Lenis from "@studio-freight/lenis"
import type { LenisOptions } from "@studio-freight/lenis"

export type SmoothScrollContextValue = {
  lenis: Lenis | null
  /** Indicates Lenis has been initialized and is controlling scroll. */
  isReady: boolean
  /** Whether the user has requested reduced motion, in which case Lenis is disabled. */
  prefersReducedMotion: boolean
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | undefined>(undefined)

const LENIS_OPTIONS: LenisOptions = {
  smoothWheel: true,
  syncTouch: true,
  touchMultiplier: 1.15,
  touchInertiaMultiplier: 1.15,
  duration: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  gestureOrientation: "vertical",
  orientation: "vertical",
  wheelMultiplier: 1,
  lerp: 0.08,
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const frameRef = useRef<number | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches)
    }

    handleChange(mediaQuery)

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange as EventListener)
    } else {
      mediaQuery.addListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handleChange as EventListener)
      } else {
        mediaQuery.removeListener(handleChange as (this: MediaQueryList, ev: MediaQueryListEvent) => void)
      }
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) {
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      setIsReady(false)
      return
    }

    const lenis = new Lenis(LENIS_OPTIONS)
    lenisRef.current = lenis
    setIsReady(true)

    const onRaf = (time: number) => {
      lenis.raf(time)
      frameRef.current = requestAnimationFrame(onRaf)
    }

    frameRef.current = requestAnimationFrame(onRaf)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      lenis.destroy()
      lenisRef.current = null
      frameRef.current = null
    }
  }, [prefersReducedMotion])

  const contextValue = useMemo<SmoothScrollContextValue>(() => ({
    lenis: lenisRef.current,
    isReady,
    prefersReducedMotion,
  }), [isReady, prefersReducedMotion])

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  const context = useContext(SmoothScrollContext)
  if (!context) {
    throw new Error("useSmoothScroll must be used within a SmoothScrollProvider")
  }
  return context
}

export function useLenis(callback?: (lenis: Lenis) => void) {
  const { lenis, isReady } = useSmoothScroll()

  useEffect(() => {
    if (!lenis || !isReady || !callback) return

    callback(lenis)

    return () => {
      // No persistent subscriptions added here; callback is run once on ready.
    }
  }, [callback, isReady, lenis])

  return lenis
}

export type LenisScrollData = {
  scroll: number
  limit: number
  velocity: number
  direction: number
  progress: number
}

export function useLenisScroll(callback: (event: LenisScrollData) => void) {
  const { lenis, isReady } = useSmoothScroll()

  useEffect(() => {
    if (!lenis || !isReady) return

    const handler = (event: LenisScrollData) => {
      callback(event)
    }

    lenis.on("scroll", handler)

    return () => {
      lenis.off("scroll", handler)
    }
  }, [callback, isReady, lenis])
}
