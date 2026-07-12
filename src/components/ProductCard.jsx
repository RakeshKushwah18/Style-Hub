import { Heart, Plus, Check, Star } from "lucide-react"
import { useShop } from "../context/ShopContext"

/*
  A single product tile.
  - The heart toggles the LIKED bucket.
  - The "Add" button drops the item into the CART bucket (and shows a check once in).
  - A red "SALE" badge + struck-through price appear when the product is on sale.
*/
export default function ProductCard({ product }) {
  const { isLiked, toggleLike, addToCart, inCart } = useShop()
  const liked = isLiked(product.id)
  const added = inCart(product.id)

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      {/* Image + overlay buttons */}
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {product.onSale && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
            SALE
          </span>
        )}

        {/* Like / favorite button */}
        <button
          type="button"
          onClick={() => toggleLike(product.id)}
          aria-label={liked ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={liked}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur transition-transform hover:scale-110"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${
              liked ? "fill-primary text-primary" : "text-foreground"
            }`}
          />
        </button>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span>{product.rating.toFixed(1)}</span>
          <span className="capitalize">· {product.category}</span>
        </div>

        <h3 className="text-sm font-medium text-foreground">{product.name}</h3>

        <div className="mt-2 flex items-center gap-2">
          <span className="font-display text-lg font-bold text-foreground">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>

        {/* Add-to-cart button pinned to the bottom of the card */}
        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className={`mt-4 inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
            added
              ? "bg-muted text-foreground"
              : "bg-ink text-ink-foreground hover:bg-ink/90"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" /> Added
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" /> Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  )
}
