import React from 'react'
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Heart, ShoppingBag, Shirt, Menu, X } from "lucide-react"
import { useShop } from "../context/ShopContext"
// const { likeCount, cartCount } = useShop()

const likeCount = 0
const cartCount = 0

// Nav links reused for both desktop and mobile menus.
const links = [
    { to: "/", label: "Home", end: true },
    { to: "/women", label: "Women" },
    { to: "/men", label: "Men" },
    { to: "/kids", label: "Kids" },
]
const Navbar = () => {
    const { likeCount, cartCount } = useShop(false)
    const [open, setOpen] = useState(false)

    // Shared class logic for NavLink active/inactive states.
    const linkClass = ({ isActive }) =>
        [
            "relative py-1 text-sm font-medium transition-colors",
            isActive
                ? "text-foreground after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                : "text-muted-foreground hover:text-foreground",
        ].join(" ")

    return (
        <div>
            <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
                <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo (Lucide icon + wordmark) */}
                    <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-ink-foreground">
                            <Shirt className="h-5 w-5" />
                        </span>
                        <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
                            Style<span className="text-primary">Hub</span>
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <ul className="hidden items-center gap-8 md:flex">
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink to={l.to} end={l.end} className={linkClass}>
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Action buttons: favorites + cart (both routed) */}
                    <div className="flex items-center gap-1">
                        <IconButton to="/favorites" label="Favorites" count={likeCount}>
                            <Heart className="h-5 w-5" />
                        </IconButton>
                        <IconButton to="/cart" label="Cart" count={cartCount}>
                            <ShoppingBag className="h-5 w-5" />
                        </IconButton>

                        {/* Mobile menu toggle */}
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground hover:bg-muted md:hidden"
                            aria-label={open ? "Close menu" : "Open menu"}
                            aria-expanded={open}
                        >
                            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile dropdown menu */}
                {open && (
                    <ul className="flex flex-col gap-1 border-t border-border bg-background px-4 py-3 md:hidden">
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    end={l.end}
                                    onClick={() => setOpen(false)}
                                    className={({ isActive }) =>
                                        [
                                            "block rounded-md px-3 py-2 text-base font-medium",
                                            isActive
                                                ? "bg-muted text-foreground"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                        ].join(" ")
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                )}
            </header>

        </div>
    )
}

function IconButton({ to, label, count, children }) {
    return (
        <Link
            to={to}
            aria-label={label}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
            {children}
            {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                    {count}
                </span>
            )}
        </Link>
    )
}
export default Navbar