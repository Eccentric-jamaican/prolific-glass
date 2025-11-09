"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useMotionPreset } from "@/lib/motion-presets"
import { cn } from "@/lib/utils"

const links = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
]

export function Navbar({ className }: { className?: string }) {
  const fadeDown = useMotionPreset("fadeDown", { distance: -24, exitDistance: -16 })

  return (
    <motion.header
      initial="hidden"
      animate="show"
      variants={fadeDown}
      className={cn(
        "fixed inset-x-0 top-0 z-30 w-full bg-transparent text-white",
        className,
      )}
    >
      <div className="mx-auto flex w-full justify-center px-4 pt-4 sm:px-6">
        <div className="relative flex w-full max-w-5xl items-center justify-between gap-3 overflow-hidden rounded-full border border-white/25 bg-white/10 px-5 py-3 text-white shadow-[0_30px_60px_-40px_rgba(15,23,42,0.85),inset_1px_1px_2px_rgba(255,255,255,0.3),inset_-1px_-1px_2px_rgba(15,23,42,0.45)] backdrop-blur-xl supports-backdrop-filter:bg-white/5">
          <div className="relative flex w-full items-center justify-between gap-3">
            <Link
              href="#"
              className="group flex items-center gap-3 text-base font-semibold text-white transition-colors duration-200 hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/40 bg-white/10 text-sm font-bold text-white shadow-[0_12px_30px_-20px_rgba(15,23,42,0.75),inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-1px_-1px_2px_rgba(15,23,42,0.55)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:bg-white/15">
                PG
              </span>
              Prolific Glass
            </Link>
            <nav className="hidden items-center gap-6 text-sm font-medium text-white/70 md:flex">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="inline-flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-[0_12px_30px_-20px_rgba(15,23,42,0.75),inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-1px_-1px_2px_rgba(15,23,42,0.55)] backdrop-blur-sm transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:hidden"
                    aria-label="Open navigation"
                  >
                    <MenuIcon className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="h-[min(460px,90vh)] w-full border-b border-white/10 bg-slate-950/85 px-6 py-6 text-white backdrop-blur-2xl sm:px-8"
                >
                  <div className="flex h-full flex-col">
                    <SheetHeader className="sr-only">
                      <SheetTitle>Site navigation</SheetTitle>
                    </SheetHeader>
                    <div className="flex items-center justify-between">
                      <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40"
                      >
                        <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-white/10 text-sm font-bold text-white shadow-[0_12px_30px_-20px_rgba(15,23,42,0.75),inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-1px_-1px_2px_rgba(15,23,42,0.55)]">
                          PG
                        </span>
                        Prolific Glass
                      </Link>
                    </div>

                    <nav className="mt-8 flex flex-col gap-2 text-base font-medium text-white/80">
                      {links.map((link) => (
                        <SheetClose asChild key={link.href}>
                          <Link
                            href={link.href}
                            className="rounded-full border border-white/10 bg-white/5 px-4 py-3 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-3 pt-8">
                      <SheetClose asChild>
                        <Button className="h-12 rounded-full border border-white/25 bg-white/15 text-base font-semibold text-white shadow-[0_18px_36px_-22px_rgba(15,23,42,0.7),inset_1px_1px_2px_rgba(255,255,255,0.4),inset_-1px_-1px_2px_rgba(15,23,42,0.45)] hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40">
                          Book an Appointment
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          variant="outline"
                          className="h-12 rounded-full border border-white/30 bg-transparent text-base font-semibold text-white hover:border-white/45 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900/40"
                        >
                          Call (876) 555-0126
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
              <Button
                size="sm"
                className="hidden rounded-full border border-white/25 bg-white/10 px-5 text-white shadow-[0_12px_30px_-20px_rgba(15,23,42,0.75),inset_1px_1px_2px_rgba(255,255,255,0.35),inset_-1px_-1px_2px_rgba(15,23,42,0.55)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/15 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent md:inline-flex"
              >
                Book an Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
