import { Link } from "react-router-dom"

// Shown for any unknown URL.
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="font-display text-6xl font-extrabold text-primary">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
        Page not found
      </h1>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist or was moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-ink-foreground transition-colors hover:bg-ink/90"
      >
        Back to home
      </Link>
    </div>
  )
}
