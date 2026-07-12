import { Link } from "react-router-dom"
import { Heart, ShoppingBag, X } from "lucide-react"
import { useShop } from "../context/ShopContext.jsx"
import { getProductById } from "../data/products"

/*
  The LIKED bucket.
  Every product whose id is in `likes` shows up here. From each row you can:
    - move it straight into the cart (moveLikeToCart), or
    - remove it from favorites (toggleLike).
*/
export default function Favorites() {
  const { likes, toggleLike, moveLikeToCart } = useShop()

  // Turn the array of ids into full product objects (ignoring any stale ids).
  const items = likes.map(getProductById).filter(Boolean)

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<Heart className="h-8 w-8 text-primary" />}
        title="No favorites yet"
        text="Tap the heart on any product to save it here for later."
        cta="Browse products"
        to="/women"
      />
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center gap-2">
        <Heart className="h-6 w-6 fill-primary text-primary" />
        <h1 className="font-display text-3xl font-bold text-foreground">
          Your Favorites
        </h1>
        <span className="rounded-full bg-muted px-2.5 py-0.5 text-sm font-medium text-muted-foreground">
          {items.length}
        </span>
      </div>

      <ul className="flex flex-col gap-4">
        {items.map((product) => (
          <li
            key={product.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-3 sm:p-4"
          >
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="h-20 w-16 shrink-0 rounded-lg object-cover sm:h-24 sm:w-20"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-medium text-foreground">{product.name}</h3>
              <p className="text-sm capitalize text-muted-foreground">{product.category}</p>
              <p className="mt-1 font-display font-bold text-foreground">${product.price}</p>
            </div>

            <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => moveLikeToCart(product.id)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink/90"
              >
                <ShoppingBag className="h-4 w-4" /> Move to Cart
              </button>
              <button
                type="button"
                onClick={() => toggleLike(product.id)}
                aria-label="Remove from favorites"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Reused empty-state card (also used by the cart when empty).
export function EmptyState({ icon, title, text, cta, to }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h1 className="mt-5 font-display text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 text-muted-foreground">{text}</p>
      <Link
        to={to}
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink/90"
      >
        {cta}
      </Link>
    </div>
  )
}
