"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const aboutLinks = [
  { label: "Who we are",        href: "/about/club" },
  { label: "Meet the committee", href: "/about/committee" },
  { label: "Volunteer with us",  href: "/about/volunteer" },
]

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    setAboutOpen(false)
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAboutOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const isAboutActive = pathname.startsWith("/about")

  return (
    <nav className="fixed top-0 w-full z-50 bg-space-dark/80 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">

        <Link href="/" className="flex-shrink-0">
          <img
            src="https://logoipsum.com/artwork/329"
            alt="Society logo"
            className="h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">

          {/* About dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutOpen((o) => !o)}
              className={`flex items-center gap-1 text-sm transition-colors ${
                isAboutActive ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              About
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {aboutOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xl border border-white/10 bg-space-navy/95 backdrop-blur-sm overflow-hidden shadow-xl">
                <div className="py-1">
                  {aboutLinks.map(({ label, href }) => (
                    <Link
                      key={href}
                      href={href}
                      className={`block px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                        pathname === href ? "text-space-blue" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/events" className={`text-sm transition-colors ${pathname === "/events" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Events
          </Link>
          <Link href="/sponsors" className={`text-sm transition-colors ${pathname === "/sponsors" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Sponsors
          </Link>
          <Link
            href="/join"
            className="ml-2 px-4 py-2 rounded-full bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors"
          >
            Join us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/60 hover:text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-space-dark/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-10 py-4 flex flex-col gap-1">
            <p className="text-white/20 text-xs tracking-widest uppercase py-2">About</p>
            {aboutLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/60 hover:text-white text-sm py-2 transition-colors pl-2"
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-white/5 my-2" />
            <Link href="/events"  className="text-white/60 hover:text-white text-sm py-2 transition-colors">Events</Link>
            <Link href="/sponsors" className="text-white/60 hover:text-white text-sm py-2 transition-colors">Sponsors</Link>
            <Link
              href="/join"
              className="mt-2 px-4 py-2.5 rounded-full bg-space-blue text-white text-sm font-semibold text-center hover:bg-space-blue/80 transition-colors"
            >
              Join us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}