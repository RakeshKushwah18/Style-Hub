import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingBag, Minus, Plus, Trash2, CheckCircle2 } from "lucide-react"
import { useShop } from "../context/ShopContext.jsx"
import { getProductById } from "../data/products"
import { EmptyState } from "./Favorites.jsx"

/*
  The CART bucket + checkout.
  - Each line has quantity steppers and a remove button.
  - The summary on the right totals everything up.
  - "Place Order" takes a name + address, calls placeOrder() (which snapshots
    the whole cart into one order and empties the cart), then shows a success card.
*/
export default function Cart() {
  const { cart, setQty, removeFromCart, cartTotal, placeOrder } = useShop()
  const [checkingOut, setCheckingOut] = useState(false)
  const [form, setForm] = useState({ name: "", address: "" })
  const [placedOrder, setPlacedOrder] = useState(null)

  // Build full line items (product details + quantity) from the cart ids.
  const lines = cart
    .map((item) => {
      const product = getProductById(item.id)
      return product ? { ...product, qty: item.qty } : null
    })
    .filter(Boolean)

  // Order-confirmation screen after a successful checkout.
  if (placedOrder) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <CheckCircle2 className="h-16 w-16 text-primary" />
        <h1 className="mt-5 font-display text-2xl font-bold text-foreground">
          Order placed!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Thanks, {placedOrder.name}. Your order{" "}
          <span className="font-medium text-foreground">{placedOrder.id}</span> for{" "}
          <span className="font-medium text-foreground">
            ${placedOrder.total}
          </span>{" "}
          is confirmed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink/90"
        >
          Continue shopping
        </Link>
      </div>
    )
  }

  // Empty cart.
  if (lines.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="h-8 w-8 text-primary" />}
        title="Your cart is empty"
        text="Add some pieces you love and they will show up here."
        cta="Start shopping"
        to="/women"
      />
    )
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const order = placeOrder(form)
    if (order) setPlacedOrder(order)
  }

  const shipping = cartTotal > 100 ? 0 : 6
  const grandTotal = cartTotal + shipping

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-6 flex items-center gap-2 font-display text-3xl font-bold text-foreground">
        <ShoppingBag className="h-6 w-6" /> Your Cart
      </h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Line items */}
        <ul className="flex flex-col gap-4">
          {lines.map((item) => (
            <li
              key={item.id}
              className="flex gap-4 rounded-xl border border-border bg-card p-3 sm:p-4"
            >
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="h-24 w-20 shrink-0 rounded-lg object-cover"
              />

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm capitalize text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {/* Quantity stepper */}
                  <div className="inline-flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className="inline-flex h-9 w-9 items-center justify-center text-foreground hover:bg-muted"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-9 text-center text-sm font-medium">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label="Increase quantity"
                      className="inline-flex h-9 w-9 items-center justify-center text-foreground hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="font-display font-bold text-foreground">
                    ${item.price * item.qty}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Order summary / checkout */}
        <aside className="h-fit rounded-xl border border-border bg-card p-5 lg:sticky lg:top-20">
          <h2 className="font-display text-lg font-bold text-foreground">
            Order Summary
          </h2>

          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`$${cartTotal}`} />
            <Row
              label="Shipping"
              value={shipping === 0 ? "Free" : `$${shipping}`}
            />
            <div className="my-2 border-t border-border" />
            <Row
              label="Total"
              value={`$${grandTotal}`}
              strong
            />
          </dl>

          {!checkingOut ? (
            <button
              type="button"
              onClick={() => setCheckingOut(true)}
              className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Order All Together
            </button>
          ) : (
            <form onSubmit={handlePlaceOrder} className="mt-5 flex flex-col gap-3">
              <input
                required
                type="text"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                required
                rows={3}
                placeholder="Shipping address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
              >
                Place Order · ${grandTotal}
              </button>
              <button
                type="button"
                onClick={() => setCheckingOut(false)}
                className="text-center text-xs text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
            </form>
          )}

          <p className="mt-3 text-center text-xs text-muted-foreground">
            Free shipping on orders over $100
          </p>
        </aside>
      </div>
    </div>
  )
}

function Row({ label, value, strong }) {
  return (
    <div className="flex items-center justify-between">
      <dt className={strong ? "font-semibold text-foreground" : "text-muted-foreground"}>
        {label}
      </dt>
      <dd
        className={
          strong
            ? "font-display text-lg font-bold text-foreground"
            : "font-medium text-foreground"
        }
      >
        {value}
      </dd>
    </div>
  )
}
