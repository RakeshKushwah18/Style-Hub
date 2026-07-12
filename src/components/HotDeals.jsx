import React, {useRef} from 'react'
import { Flame, ChevronLeft, ChevronRight } from "lucide-react"
import { getHotDeals } from "../data/products"
import ProductCard from "./ProductCard.jsx"


export default function HotDeals() {
     const deals = getHotDeals()
  const trackRef = useRef(null)

  // Scroll the horizontal track left/right by roughly one card width.
  const scroll = (direction) => {
    const track = trackRef.current
    if (!track) return
    const amount = 280
    track.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" })
  }


  return (
    <div>

         <section id="hot-deals" className="bg-muted/50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Promo banner */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-border">
          <img
            src="/images/deals-banner.png"
            alt=""
            aria-hidden="true"
            className="h-56 w-full object-cover sm:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center gap-3 p-6 sm:p-10">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground">
              <Flame className="h-3.5 w-3.5" /> Limited Time
            </span>
            <h2 className="max-w-md font-display text-3xl font-extrabold text-ink-foreground text-balance sm:text-4xl">
              Hot Deals up to 40% off
            </h2>
            <p className="max-w-sm text-sm text-ink-foreground/80">
              Grab your favorites before they are gone. New markdowns added every week.
            </p>
          </div>
        </div>

        {/* Section header + scroll controls */}
        <div className="mb-5 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-foreground">
            <Flame className="h-6 w-6 text-primary" /> Today&apos;s Hot Deals
          </h3>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll deals left"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll deals right"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-muted"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Horizontal scrolling deal track */}
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {deals.map((product) => (
            <div
              key={product.id}
              className="w-64 shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  )
}

