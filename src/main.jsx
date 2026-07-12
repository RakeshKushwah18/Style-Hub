import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { ShopProvider } from "./context/ShopContext.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter enables client-side routing (Home, Women, Men, Kids, etc.) */}
    <BrowserRouter>
      {/* ShopProvider makes likes + cart state available to the whole app */}
      <ShopProvider>
        <App />
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>
)
