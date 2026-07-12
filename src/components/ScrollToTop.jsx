import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Whenever the route (pathname) changes, jump back to the top of the page.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return null
}
