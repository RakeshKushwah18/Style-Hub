import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { getProductById } from "../data/products"

/*
  ShopContext is the single source of truth for:
    - likes:  an array of product ids that the user "hearted"  (the LIKED bucket)
    - cart:   an array of { id, qty } objects                  (the CART bucket)
    - orders: an array of past orders once the user checks out

  All three are saved to localStorage so they survive a page refresh.
  Any component can read/update them via the useShop() hook below.
*/

const ShopContext = createContext(null)

// Small helper that safely reads + parses a value from localStorage.
function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function ShopProvider({ children }) {
  // Lazy initial state: read once on first render so we don't flash empty data.
  const [likes, setLikes] = useState(() => loadFromStorage("stylehub_likes", []))
  const [cart, setCart] = useState(() => loadFromStorage("stylehub_cart", []))
  const [orders, setOrders] = useState(() => loadFromStorage("stylehub_orders", []))

  // Persist each bucket whenever it changes.
  useEffect(() => {
    localStorage.setItem("stylehub_likes", JSON.stringify(likes))
  }, [likes])

  useEffect(() => {
    localStorage.setItem("stylehub_cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("stylehub_orders", JSON.stringify(orders))
  }, [orders])

  /* ----------------------------- LIKES ----------------------------- */

  const isLiked = (id) => likes.includes(id)

  // Add if missing, remove if already there.
  const toggleLike = (id) => {
    setLikes((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  /* ------------------------------ CART ------------------------------ */

  const inCart = (id) => cart.some((item) => item.id === id)

  // Add one to the cart, or bump quantity if it already exists.
  const addToCart = (id, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === id)
      if (existing) {
        return prev.map((item) =>
          item.id === id ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { id, qty }]
    })
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  // Change quantity; if it drops to 0 the item is removed.
  const setQty = (id, qty) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0)
    )
  }

  // Move an item out of the LIKED bucket and into the CART bucket.
  const moveLikeToCart = (id) => {
    addToCart(id, 1)
    setLikes((prev) => prev.filter((x) => x !== id))
  }

  /* ----------------------------- ORDERS ----------------------------- */

  // "Order them all together": snapshot the cart, save it as an order, empty cart.
  const placeOrder = ({ name, address } = {}) => {
    if (cart.length === 0) return null
    const order = {
      id: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      name: name || "Guest",
      address: address || "",
      items: cart.map((item) => {
        const product = getProductById(item.id)
        return {
          id: item.id,
          name: product?.name ?? "Item",
          price: product?.price ?? 0,
          qty: item.qty,
        }
      }),
      total: cartTotal,
    }
    setOrders((prev) => [order, ...prev])
    setCart([])
    return order
  }

  /* --------------------------- DERIVED DATA -------------------------- */

  // Total number of items in the cart (sum of quantities) for the navbar badge.
  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  )

  // Total price of everything in the cart.
  const cartTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = getProductById(item.id)
        return sum + (product ? product.price * item.qty : 0)
      }, 0),
    [cart]
  )

  const value = {
    likes,
    cart,
    orders,
    isLiked,
    toggleLike,
    inCart,
    addToCart,
    removeFromCart,
    setQty,
    moveLikeToCart,
    placeOrder,
    likeCount: likes.length,
    cartCount,
    cartTotal,
  }

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

// Custom hook so components can do: const { addToCart } = useShop()
export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error("useShop must be used inside a ShopProvider")
  return ctx
}
