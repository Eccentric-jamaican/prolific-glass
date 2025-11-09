"use client"

import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { motionPresets, staggerContainer, useMotionPreset } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "Prolific Glass handled everything with professionalism and speed. The new windshield looks OEM and our driver was back on the road within hours.",
    name: "Alicia Brown",
    role: "Fleet coordinator, Kingston",
    layout: "lg:col-span-1 lg:row-span-2",
  },
  {
    quote:
      "Insurance paperwork used to slow us down. Now Prolific Glass preps every document before the adjuster even calls.",
    name: "Deon Richards",
    role: "Claims specialist",
    layout: "lg:col-span-2 lg:row-span-1",
  },
  {
    quote:
      "Their island-wide routes mean our rural drivers finally get the same service as Kingston—no rescheduling, no excuses.",
    name: "Simone Ellis",
    role: "Logistics manager",
    layout: "lg:col-span-1 lg:row-span-2",
  },
  {
    quote:
      "Technicians arrived on time, calibrated sensors, and cleaned up better than they found the vehicle. Effortless from start to finish.",
    name: "Paul Thompson",
    role: "Operations lead",
    layout: "lg:col-span-1",
  },
]

export function Testimonials({ className }: { className?: string }) {
  const headingPreset = useMotionPreset("fadeUp", { distance: 36 })

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className={cn("relative scroll-mt-24 overflow-hidden bg-slate-50 py-24 text-slate-900 sm:scroll-mt-32 sm:py-28", className)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-linear-to-b from-sky-100/80 via-white to-transparent" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={headingPreset}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-500">How it works</span>
          <h2
            id="testimonials-heading"
            className="mt-4 text-balance text-[clamp(2rem,4vw+0.5rem,2.75rem)] font-semibold"
          >
            Our customers say it best
          </h2>
          <p className="mt-4 text-[clamp(1rem,2.6vw+0.2rem,1.25rem)] text-slate-600">
            Thousands of Jamaican drivers trust Prolific Glass to deliver precise windshield replacement without slowing
            down their day.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer({ delay: 0.08, stagger: 0.08 })}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="grid gap-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:auto-rows-[minmax(220px,1fr)] lg:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.name} index={index} {...testimonial} />
          ))}
        </motion.div>

        <motion.div
          variants={motionPresets.fadeUp({ distance: 28 })}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="group h-12 w-full rounded-full border border-slate-900/10 bg-white/50 px-8 text-slate-900 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/70 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
          >
            Share your experience
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group h-12 w-full rounded-full border border-slate-900/20 bg-white/20 px-8 text-slate-900 backdrop-blur-md transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/40 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
          >
            View more testimonials
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

type TestimonialCardProps = (typeof testimonials)[number] & { index: number }

const cardVariants = [
  () => useMotionPreset("fadeUp", { distance: 36 }),
  () => useMotionPreset("fadeLeft", { distance: 40 }),
  () => useMotionPreset("fadeRight", { distance: 40 }),
  () => useMotionPreset("fadeUp", { distance: 28 }),
]

function TestimonialCard({ quote, name, role, layout, index }: TestimonialCardProps) {
  const variantFactory = cardVariants[index % cardVariants.length]
  const cardVariant = variantFactory()

  return (
    <motion.article
      variants={cardVariant}
      className={cn(
        "transform-gpu will-change-transform flex h-full flex-col justify-between rounded-3xl border border-white/25 bg-white/15 p-5 text-slate-900 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.35),inset_1px_1px_2px_rgba(255,255,255,0.32),inset_-1px_-1px_3px_rgba(15,23,42,0.18)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_40px_90px_-50px_rgba(15,23,42,0.45),inset_1px_1px_3px_rgba(255,255,255,0.4),inset_-1px_-2px_4px_rgba(15,23,42,0.24)] sm:p-6",
        layout
      )}
    >
      <div className="space-y-3 text-sm leading-relaxed text-slate-800">
        <div className="flex items-center gap-1 text-sky-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <span key={starIndex} className="text-base drop-shadow-sm">★</span>
          ))}
        </div>
        <p>{quote}</p>
      </div>
      <div className="mt-6 flex flex-col text-sm font-semibold text-slate-900">
        <span>{name}</span>
        <span className="text-xs font-normal text-slate-600">{role}</span>
      </div>
    </motion.article>
  )
}
