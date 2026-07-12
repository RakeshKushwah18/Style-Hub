import React from 'react'
import { Link } from "react-router-dom"
import { ArrowUpRight } from "lucide-react"

// The three big shoppable tiles (Women / Men / Kids) shown on the landing page.
const categories = [
  {
    to: "/women",
    label: "Women",
    tagline: "Elegant & everyday",
    image: "/images/cat-women.png",
  },
  {
    to: "/men",
    label: "Men",
    tagline: "Smart & casual",
    image: "/images/cat-men.png",
  },
  {
    to: "/kids",
    label: "Kids",
    tagline: "Fun & comfy",
    image: "/images/cat-kids.png",
  },
]

const CategoryShowcase = () => {
  return (
    <div>
       

    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Shop by Category
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          Pick your crowd and dive in — every collection is packed with fresh arrivals.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="group relative overflow-hidden rounded-2xl border border-border"
          >
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={c.image || "/placeholder.svg"}
                alt={`${c.label} collection`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Dark gradient so the label stays readable over any image */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-5">
              <div>
                <h3 className="font-display text-2xl font-bold text-ink-foreground">
                  {c.label}
                </h3>
                <p className="text-sm text-ink-foreground/80">{c.tagline}</p>
              </div>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  
    </div>
  )
}

export default CategoryShowcase