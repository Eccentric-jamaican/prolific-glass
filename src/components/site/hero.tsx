"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { motionPresets, staggerContainer, useMotionPreset } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

const experts = [
  {
    name: "Shanice Brown",
    title: "Lead Glass Technician",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Andre Mitchell",
    title: "Calibration Specialist",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Rochelle James",
    title: "Customer Experience Lead",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80",
  },
]

export function Hero({ className }: { className?: string }) {
  const fadeUp = useMotionPreset("fadeUp", { distance: 40 })

  return (
    <motion.section
      id="hero"
      initial="hidden"
      animate="show"
      aria-labelledby="hero-heading"
      variants={staggerContainer({ delay: 0.1, stagger: 0.12 })}
      className={cn(
        "relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent px-6 pb-16 pt-28 text-center text-slate-900 sm:px-8 lg:px-12",
        className
      )}
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="relative h-full w-full sm:max-w-[1920px] sm:aspect-video">
          <Image
            src="/hero-1.png"
            alt="Glass shards abstract background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10">
        <motion.div variants={motionPresets.fadeUp()} className="flex flex-col items-center gap-5">
          <div className="flex w-full justify-center">
            <div
              tabIndex={0}
              className="flex items-center gap-4 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white/80 backdrop-blur-xs shadow-[0_20px_45px_-32px_rgba(15,23,42,0.45),inset_1px_1px_2px_rgba(255,255,255,0.2),inset_-1px_-1px_3px_rgba(15,23,42,0.25)] transition-all duration-200 hover:-translate-y-1 hover:bg-white/15 focus-visible:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white/10"
            >
              <div className="flex -space-x-3">
                {experts.map((expert) => (
                  <div
                    key={expert.name}
                    className="relative size-11 overflow-hidden rounded-full bg-white/20 transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
                  >
                    <Image
                      src={expert.image}
                      alt={expert.name}
                      width={44}
                      height={44}
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-semibold tracking-wide text-white">
                Meet our experts
              </span>
            </div>
          </div>
          <h1
            id="hero-heading"
            className="text-balance text-white text-[clamp(2.25rem,5vw+0.25rem,3.25rem)] font-semibold leading-snug drop-shadow-md"
          >
            Launch your windshield service experience faster
          </h1>
          <p className="max-w-2xl text-pretty text-white text-[clamp(1rem,2.5vw+0.25rem,1.25rem)] leading-relaxed drop-shadow-sm">
            Seamless windshield replacement and calibration across Jamaica. Fully mobile teams, insurer-ready
            paperwork, and real-time updates for every job.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            size="lg"
            className="group h-14 rounded-full border border-white/40 bg-transparent px-10 text-base font-semibold text-white backdrop-blur-xs transition-transform duration-200 hover:-translate-y-px hover:bg-white/5 focus-visible:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span className="relative flex items-center gap-2">
              Schedule installation
              <ArrowUpRight className="size-4 text-white transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group h-14 rounded-full border border-white/40 bg-transparent px-10 text-base font-semibold text-white backdrop-blur-xs transition-transform duration-200 hover:-translate-y-px hover:bg-white/5 hover:text-white focus-visible:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            <span className="relative flex items-center gap-2">
              Watch process overview
              <Play className="size-4 fill-current text-white transition-transform duration-200 group-hover:scale-110" />
            </span>
          </Button>
        </motion.div>

      </div>
    </motion.section>
  )
}
