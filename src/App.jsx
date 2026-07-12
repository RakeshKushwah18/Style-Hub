import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import Home from "./pages/Home.jsx"
import Category from "./pages/Category.jsx"
import Favorites from "./pages/Favorites.jsx"
import Cart from "./pages/Cart.jsx"
import NotFound from "./pages/NotFound.jsx"

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Resets scroll to top on every route change */}
      <ScrollToTop />
      <Navbar />

      {/* Page content swaps here based on the URL */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* One reusable page powers Women, Men, and Kids */}
          <Route path="/women" element={<Category category="women" />} />
          <Route path="/men" element={<Category category="men" />} />
          <Route path="/kids" element={<Category category="kids" />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
