"use client"

import { motion } from "framer-motion"

import { motionPresets, staggerContainer, useMotionPreset } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

const products = [
  {
    name: "Door Glass",
    blurb: "OEM-spec replacements for every driver and passenger door style.",
  },
  {
    name: "Float Glass",
    blurb: "Crystal-clear panes cut to size for architectural and custom installs.",
  },
  {
    name: "Front Glass",
    blurb: "Panoramic wind screens with tint and sensor integrations handled in-house.",
  },
  {
    name: "Hiace Sliding Frames",
    blurb: "Toyota Hiace door systems refurbished with smooth action and secure seals.",
  },
  {
    name: "Quarter Glass",
    blurb: "Precise contour matching for SUVs, vans, and fleet vehicles.",
  },
  {
    name: "Vent & Pivot Glass",
    blurb: "Custom-fit vents that maintain airflow without sacrificing durability.",
  },
  {
    name: "Windshield",
    blurb: "Bonded replacements with ADAS calibration ready before keys are returned.",
  },
]

export function Products({ className }: { className?: string }) {
  const headingPreset = useMotionPreset("fadeUp", { distance: 36 })
  const trackPreset = useMotionPreset("fadeLeft", { distance: 120 })

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className={cn("relative scroll-mt-24 overflow-hidden bg-slate-950 py-20 text-slate-50 sm:scroll-mt-32 sm:py-24", className)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-linear-to-b from-slate-900 via-slate-950 to-transparent" aria-hidden />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={headingPreset}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.55 }}
          className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left lg:items-end lg:justify-between"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch sm:gap-4">
            <span className="hidden w-1 rounded-full bg-sky-400 sm:block" aria-hidden />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">Inventory</p>
              <h2
                id="products-heading"
                className="mt-3 text-balance text-[clamp(2.2rem,5vw+0.4rem,2.75rem)] font-semibold uppercase tracking-tight"
              >
                Premium auto glass, ready for install
              </h2>
            </div>
          </div>
          <p className="max-w-xl text-[clamp(1rem,2.6vw+0.2rem,1.15rem)] text-slate-300 lg:text-right">
            From quick replacements to full fleet refits, these are the glass products we deliver across Jamaica with
            the same meticulous calibration you expect from our technicians.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer({ delay: 0.2, stagger: 0.12 })}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25, margin: "-15% 0px" }}
        >
          <div className="relative">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-slate-950 via-slate-950/60 to-transparent sm:w-16"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-linear-to-l from-slate-950 via-slate-950/60 to-transparent sm:w-16"
              aria-hidden
            />
            <motion.div
              variants={trackPreset}
              data-lenis-prevent
              className="flex snap-x snap-mandatory snap-always gap-5 overflow-x-auto pb-4 pr-4 pl-1 scrollbar-hide touch-pan-x overscroll-x-contain sm:gap-6 sm:pl-2"
            >
              {products.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

type Product = (typeof products)[number]

type ProductCardProps = {
  product: Product
  index: number
}

function ProductCard({ product, index }: ProductCardProps) {
  const cardPreset = useMotionPreset(index % 2 === 0 ? "fadeUp" : "fadeRight", { distance: 36 })

  return (
    <motion.article
      variants={cardPreset}
      tabIndex={0}
      className="group relative flex w-[220px] shrink-0 snap-center flex-col justify-between rounded-3xl border border-white/20 bg-white/12 px-6 py-7 text-left text-white shadow-[0_30px_70px_-40px_rgba(56,189,248,0.55),inset_1px_1px_2px_rgba(255,255,255,0.32),inset_-1px_-2px_4px_rgba(15,23,42,0.28)] backdrop-blur-[18px] transition-transform duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-[0_40px_90px_-55px_rgba(56,189,248,0.65),inset_1px_1px_3px_rgba(255,255,255,0.4),inset_-1px_-3px_6px_rgba(15,23,42,0.32)] focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-[240px] lg:w-[260px]"
    >
      <span className="text-4xl font-black text-sky-300/90 drop-shadow-sm sm:text-[2.75rem]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-6 space-y-3">
        <h3 className="text-[clamp(1.1rem,2.6vw+0.2rem,1.35rem)] font-semibold text-white">{product.name}</h3>
        <p className="text-[clamp(0.95rem,2.4vw+0.18rem,1.05rem)] text-slate-200">
          {product.blurb}
        </p>
      </div>
    </motion.article>
  )
}
