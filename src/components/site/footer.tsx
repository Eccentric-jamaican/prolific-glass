"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMotionPreset } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Products", href: "#products" },
  { label: "Services", href: "#services" },
]

const contactDetails = [
  { label: "Kingston HQ", value: "37 Hagley Park Rd, Kingston" },
  { label: "Phone", value: "(876) 555-0126" },
  { label: "Email", value: "install@prolificglass.com" },
]

export function Footer({ className }: { className?: string }) {
  const headlinePreset = useMotionPreset("fadeUp", { distance: 32 })
  const columnPreset = useMotionPreset("fadeUp", { distance: 36 })
  const badgePreset = useMotionPreset("fadeRight", { distance: 30 })

  const year = new Date().getFullYear()

  return (
    <footer className={cn("relative overflow-hidden bg-slate-950 text-slate-100", className)}>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black via-slate-950 to-slate-900 opacity-95" aria-hidden />

      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
        <motion.div
          variants={headlinePreset}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="transform-gpu will-change-transform flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-400">Trusted installs</span>
            <h2 className="mt-4 text-3xl font-semibold uppercase tracking-tight text-white sm:text-[2.5rem]">
              Let’s keep every windshield road-ready
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="h-12 rounded-full px-8">
              Book a technician
            </Button>
            <Button size="lg" variant="outline" className="h-12 rounded-full border-white/30 px-8 text-white hover:border-sky-300">
              View service routes
            </Button>
          </div>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <motion.div
            variants={columnPreset}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="transform-gpu will-change-transform space-y-6"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-500/60 text-lg font-semibold text-sky-400">
                PG
              </span>
              <p className="text-sm text-slate-300">
                Prolific Glass keeps fleets and individual drivers moving with on-site glass, calibration, and route-ready installations.
              </p>
            </div>
            <motion.span
              variants={badgePreset}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              className="transform-gpu will-change-transform inline-flex items-center gap-2 rounded-full border border-sky-500/50 bg-sky-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.32em] text-sky-200"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
              Same-day windshield replacement across Jamaica
            </motion.span>
          </motion.div>

          <motion.nav
            variants={columnPreset}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="transform-gpu will-change-transform space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Map</h3>
            <ul className="space-y-3 text-sm text-slate-200">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition-colors duration-300 hover:text-sky-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            variants={columnPreset}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="transform-gpu will-change-transform space-y-4"
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</h3>
            <ul className="space-y-3 text-sm text-slate-200">
              {contactDetails.map((detail) => (
                <li key={detail.label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{detail.label}</p>
                  <p className="mt-1 text-base text-slate-200">{detail.value}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={headlinePreset}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="transform-gpu will-change-transform mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {year} Prolific Glass Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors duration-300 hover:text-sky-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors duration-300 hover:text-sky-300">
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
