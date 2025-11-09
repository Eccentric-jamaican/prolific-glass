import { Features } from "@/components/site/features"
import { Hero } from "@/components/site/hero"
import { Navbar } from "@/components/site/navbar"
import { Products } from "@/components/site/products"
import { Testimonials } from "@/components/site/testimonials"
import { Footer } from "@/components/site/footer"

function SectionPlaceholder({
  id,
  title,
  description,
  primaryCta,
  secondaryCta,
}: {
  id: string
  title: string
  description: string
  primaryCta: string
  secondaryCta?: string
}) {
  return (
    <section
      id={id}
      className="border-t border-slate-100 bg-white px-6 py-16 sm:px-8 md:py-20"
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 text-slate-900">
        <div className="space-y-3">
          <h2 id={`${id}-title`} className="text-balance text-2xl font-semibold sm:text-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href="#"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            {primaryCta}
          </a>
          {secondaryCta ? (
            <a
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-6 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              {secondaryCta}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
        <Testimonials />
        <Products />
      </main>
      <Footer />
    </div>
  )
}
