import React from 'react'
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <div>

        <section className="relative overflow-hidden border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
        {/* Left: copy + CTAs */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            New Season 2026
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
            Style for <span className="text-primary">everyone</span> in the family
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            Discover fresh looks for Women, Men, and Kids. Quality pieces,
            honest prices, and hot deals you will actually love.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/women"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink/90"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#hot-deals"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
            >
              View Hot Deals
            </a>
          </div>

          {/* Small trust stats */}
          <div className="mt-10 flex gap-8">
            <Stat value="500+" label="Products" />
            <Stat value="4.8★" label="Avg. Rating" />
            <Stat value="Free" label="Shipping" />
          </div>
        </div>

        {/* Right: hero image */}
        <div className="relative animate-fade-up">
          <div className="overflow-hidden rounded-2xl border border-border">
            <img
              src="/images/hero.png"
              alt="Models wearing the new StyleHub collection"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Floating sale chip for a bit of life */}
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-lg sm:block">
            <p className="font-display text-2xl font-bold text-primary">-40%</p>
            <p className="text-xs text-muted-foreground">on selected items</p>
          </div>
        </div>
      </div>
    </section>

    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="font-display text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  )
}