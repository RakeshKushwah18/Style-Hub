/*
  Central product catalog.
  Each product has:
    - id: unique string (used as the key in likes/cart buckets)
    - name, price (number), category ("women" | "men" | "kids")
    - image: path served from /public
    - oldPrice + onSale: optional, used by the Hot Deals section
    - rating: for display

  In a real app you'd fetch this from an API (e.g. with Axios).
  Here it is hardcoded so the project stays fully functional and deployable
  with zero backend. Swapping to Axios later only means replacing the import.
*/

export const products = [
  // ---------- WOMEN ----------
  {
    id: "w1",
    name: "Floral Midi Dress",
    price: 59,
    oldPrice: 89,
    onSale: true,
    category: "women",
    image: "/images/w1.png",
    rating: 4.7,
  },
  {
    id: "w2",
    name: "Oversized Denim Jacket",
    price: 74,
    category: "women",
    image: "/images/w2.png",
    rating: 4.5,
  },
  {
    id: "w3",
    name: "Cream Knit Sweater",
    price: 48,
    oldPrice: 65,
    onSale: true,
    category: "women",
    image: "/images/w3.png",
    rating: 4.8,
  },
  {
    id: "w4",
    name: "Pleated Midi Skirt",
    price: 42,
    category: "women",
    image: "/images/w4.png",
    rating: 4.3,
  },
  {
    id: "w5",
    name: "Silk Button Blouse",
    price: 55,
    category: "women",
    image: "/images/w5.png",
    rating: 4.6,
  },

  // ---------- MEN ----------
  {
    id: "m1",
    name: "Classic White Sneakers",
    price: 89,
    oldPrice: 119,
    onSale: true,
    category: "men",
    image: "/images/m1.png",
    rating: 4.9,
  },
  {
    id: "m2",
    name: "Slim Fit Chinos",
    price: 52,
    category: "men",
    image: "/images/m2.png",
    rating: 4.4,
  },
  {
    id: "m3",
    name: "Oxford Button-Up Shirt",
    price: 46,
    category: "men",
    image: "/images/m3.png",
    rating: 4.5,
  },
  {
    id: "m4",
    name: "Olive Bomber Jacket",
    price: 98,
    oldPrice: 135,
    onSale: true,
    category: "men",
    image: "/images/m4.png",
    rating: 4.7,
  },
  {
    id: "m5",
    name: "Charcoal Crew Tee",
    price: 24,
    category: "men",
    image: "/images/m5.png",
    rating: 4.2,
  },

  // ---------- KIDS ----------
  {
    id: "k1",
    name: "Dino Hoodie",
    price: 34,
    oldPrice: 45,
    onSale: true,
    category: "kids",
    image: "/images/k1.png",
    rating: 4.8,
  },
  {
    id: "k2",
    name: "Denim Overalls",
    price: 38,
    category: "kids",
    image: "/images/k2.png",
    rating: 4.5,
  },
  {
    id: "k3",
    name: "Rainbow Stripe Tee",
    price: 18,
    category: "kids",
    image: "/images/k3.png",
    rating: 4.6,
  },
  {
    id: "k4",
    name: "Cozy Red Puffer",
    price: 56,
    oldPrice: 79,
    onSale: true,
    category: "kids",
    image: "/images/k4.png",
    rating: 4.7,
  },
  {
    id: "k5",
    name: "Colorful Sneakers",
    price: 42,
    category: "kids",
    image: "/images/k5.png",
    rating: 4.4,
  },
]

// Helper: get every product in a category ("women" | "men" | "kids")
export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category)
}

// Helper: every product currently on sale (used by the Hot Deals section)
export function getHotDeals() {
  return products.filter((p) => p.onSale)
}

// Helper: find one product by its id
export function getProductById(id) {
  return products.find((p) => p.id === id)
}
