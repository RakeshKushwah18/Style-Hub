import { useMemo, useState } from "react"
import { getProductsByCategory } from "../data/products"
import ProductCard from "../components/ProductCard.jsx"

// Human-friendly heading + blurb for each category.
const meta = {
  women: {
    title: "Women",
    blurb: "Elegant essentials and everyday favorites, curated for her.",
    image: "/images/cat-women.png",
  },
  men: {
    title: "Men",
    blurb: "Smart, casual, and everything in between.",
    image: "/images/cat-men.png",
  },
  kids: {
    title: "Kids",
    blurb: "Fun, comfy, and tough enough for playtime.",
    image: "/images/cat-kids.png",
  },
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

// `category` is passed in from the route ("women" | "men" | "kids").
export default function Category({ category }) {
  const info = meta[category]
  const [sort, setSort] = useState("featured")

  // Grab this category's products, then sort a copy based on the dropdown.
  const items = useMemo(() => {
    const list = [...getProductsByCategory(category)]
    switch (sort) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price)
      case "price-desc":
        return list.sort((a, b) => b.price - a.price)
      case "rating":
        return list.sort((a, b) => b.rating - a.rating)
      default:
        return list
    }
  }, [category, sort])

  return (
    <div>
      {/* Category banner */}
      <div className="relative border-b border-border">
        <div className="aspect-[16/6] w-full overflow-hidden bg-muted sm:aspect-[16/5]">
          <img
            src={info.image || "/placeholder.svg"}
            alt={`${info.title} collection`}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-ink/20" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-extrabold text-ink-foreground sm:text-5xl">
            {info.title}
          </h1>
          <p className="mt-2 max-w-md text-ink-foreground/85">{info.blurb}</p>
        </div>
      </div>

      {/* Toolbar: item count + sort */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"}
        </p>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Sort by</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Product grid */}
      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
