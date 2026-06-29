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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">

        <Link href="/" className="flex-shrink-0">
          <img
            src="/high-def-light-background.svg"
            alt="Society logo"
            className="h-8 sm:h-9 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">

          {/* About dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setAboutOpen((o) => !o)}
              className={`flex items-center gap-1 text-sm transition-colors min-h-[44px] ${
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
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-xs border border-white/10 bg-space-navy/95 backdrop-blur-sm overflow-hidden shadow-xl">
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
          <Link href="/tickets" className={`text-sm transition-colors ${pathname === "/tickets" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Tickets
          </Link>
          <Link href="/sponsors" className={`text-sm transition-colors ${pathname === "/sponsors" ? "text-white" : "text-white/60 hover:text-white"}`}>
            Sponsors
          </Link>
          <Link
            href="/join"
            className="ml-2 px-4 py-2 rounded-xs bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors whitespace-nowrap"
          >
            Join us
          </Link>
        </div>

        <button
          className="md:hidden text-white/60 hover:text-white min-h-[44px] min-w-[44px] flex items-center justify-end"
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
        <div className="md:hidden border-t border-white/10 bg-space-dark/95 backdrop-blur-sm max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
            <p className="text-white/20 text-xs tracking-widest uppercase py-2">About</p>
            {aboutLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-white/60 hover:text-white text-sm py-2.5 transition-colors pl-2 min-h-[44px] flex items-center"
              >
                {label}
              </Link>
            ))}
            <div className="border-t border-white/5 my-2" />
            <Link href="/events" className="text-white/60 hover:text-white text-sm py-2.5 transition-colors min-h-[44px] flex items-center">Events</Link>
            <Link href="/tickets" className="text-white/60 hover:text-white text-sm py-2.5 transition-colors min-h-[44px] flex items-center">Tickets</Link>
            <Link href="/sponsors" className="text-white/60 hover:text-white text-sm py-2.5 transition-colors min-h-[44px] flex items-center">Sponsors</Link>
            <Link
              href="/join"
              className="mt-4 px-4 py-3 rounded-xs bg-space-blue text-white text-sm font-semibold text-center hover:bg-space-blue/80 transition-colors min-h-[44px] flex items-center justify-center"
            >
              Join us
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}