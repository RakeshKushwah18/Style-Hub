import React from 'react'
import { Shirt } from "lucide-react"
const Footer = () => {
    return (



        /*
        Simple placeholder footer.
        You said you'll build this part yourself — this is just a clean stub
        so the layout looks finished. Replace the inside however you like.
        */
        <div>

            <footer className="border-t border-border bg-ink text-white bg-slate-800  text-ink-foreground">
                <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                            <Shirt className="h-4 w-4" />
                        </span>
                        <span className="font-display text-lg font-extrabold">StyleHub</span>
                    </div>
                    <p className="max-w-md text-sm text-ink-foreground/70">
                        {"Your footer goes here — links, newsletter, socials, and legal. This is a placeholder."}
                    </p>
                    <p className="text-xs text-ink-foreground/50">
                        © {new Date().getFullYear()} StyleHub. Built as a demo project.
                    </p>
                </div>
            </footer>

        </div>
    )
}

export default Footer