"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMotionPreset } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

type FeatureItem = {
  title: string
  subtitle: string
  description: string
}

const FEATURES: FeatureItem[] = [
  {
    title: "Retail & wholesale expertise",
    subtitle: "OEM-quality inventory on standby",
    description:
      "From dealer fleets to solo drivers, we stock premium glass ready for installation without sourcing delays.",
  },
  {
    title: "Insurance-ready paperwork",
    subtitle: "Proforma invoices delivered fast",
    description:
      "We coordinate claim documents so your insurer signs off quickly—no back-and-forth phone calls or office visits.",
  },
  {
    title: "Island-wide delivery routes",
    subtitle: "Technicians on the road twice weekly",
    description:
      "Tuesdays we drive south to Santa Cruz; Thursdays we head north through St Ann and St Mary, meeting clients along every route.",
  },
  {
    title: "Certified installation teams",
    subtitle: "Precision fitment and recalibration",
    description:
      "Installers handle ADAS recalibration on-site so the glass we provide is fitted to specification in a single visit.",
  },
]

export function Features({ className }: { className?: string }) {
  const headingPreset = useMotionPreset("fadeUp", { distance: 42 })
  const ctaPreset = useMotionPreset("fadeUp", { distance: 32 })

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className={cn("relative bg-slate-950 text-slate-50", className)}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-900 via-slate-950 to-black opacity-85 sm:opacity-90 lg:opacity-95" />

      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:px-12">
        <aside className="scroll-mt-24 lg:sticky lg:top-0 lg:h-screen">
          <div className="flex h-full flex-col justify-center py-10 lg:py-0">
            <motion.div
              variants={headingPreset}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-stretch sm:gap-6 sm:text-left"
            >
              <span className="hidden w-1 rounded-full bg-sky-400 sm:block" aria-hidden />
              <h2
                id="features-heading"
                className="text-center text-[clamp(2.5rem,6vw+0.5rem,4.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-left"
              >
                <span className="block">Why choose</span>
                <span className="block">Prolific Glass?</span>
              </h2>
            </motion.div>

            <motion.div
              variants={ctaPreset}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                size="lg"
                className="h-12 w-full rounded-full bg-sky-500 px-8 text-white hover:bg-sky-400 sm:w-auto"
              >
                Schedule installation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-full border-white/30 px-8 text-white hover:border-sky-300 hover:text-sky-200 sm:w-auto"
              >
                View service routes
              </Button>
            </motion.div>
          </div>
        </aside>

        <div className="relative">
          <ul className="flex flex-col gap-12">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={feature.title} index={index + 1} feature={feature} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feature, index }: { feature: FeatureItem; index: number }) {
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 35%"],
  })

  const translateY = useSpring(useTransform(scrollYProgress, [0, 1], [120, 0]), {
    stiffness: 160,
    damping: 26,
    mass: 0.85,
  })
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5], [0.2, 1]), {
    stiffness: 120,
    damping: 22,
    mass: 0.8,
  })
  const borderOpacity = useTransform(scrollYProgress, [0, 1], [0.15, 1])

  return (
    <motion.li
      ref={ref}
      style={{ y: translateY, opacity }}
      className="relative min-h-[55vh] rounded-3xl border border-white/20 bg-white/10 p-6 text-white shadow-[0_25px_60px_-35px_rgba(8,145,178,0.45),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_3px_rgba(15,23,42,0.22)] backdrop-blur-[18px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_-45px_rgba(8,145,178,0.55),inset_1px_1px_3px_rgba(255,255,255,0.38),inset_-1px_-2px_4px_rgba(15,23,42,0.28)] sm:p-8 lg:min-h-[70vh] lg:p-10"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="pointer-events-none absolute inset-px -z-10 rounded-3xl border border-white/15"
        aria-hidden
      />
      <span className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70">{String(index).padStart(2, "0")}</span>
      <h3 className="mt-6 text-[clamp(1.5rem,3vw+0.4rem,2.25rem)] font-semibold text-white">{feature.title}</h3>
      <p className="mt-2 text-[clamp(0.95rem,2.6vw+0.2rem,1.05rem)] font-medium text-sky-200/90">
        {feature.subtitle}
      </p>
      <p className="mt-4 text-[clamp(1rem,2.8vw+0.2rem,1.1875rem)] leading-relaxed text-slate-200">
        {feature.description}
      </p>
    </motion.li>
  )
}

