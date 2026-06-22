"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

const images = [
  "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((index: number) => {
    if (transitioning) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(index)
      setTransitioning(false)
    }, 500)
  }, [transitioning])

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((current + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [current, goTo])

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-950 flex items-center">
      
      {/* Background Images - Fixed Opacity & Replaced with reliable high-quality space photography URLs */}
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === current ? (transitioning ? 0 : 0.7) : 0,
          }}
        />
      ))}

      {/* Solid High-Contrast Overlays to keep text readable */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Left-Aligned, Sharp Design Elements */}
      <div className="relative z-10 flex flex-col items-start text-left px-6 md:px-16 max-w-5xl w-full mx-auto">
        
        {/* Simple Accent Line Indicator */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-6 bg-amber-400" />
          <p className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
            University of Adelaide
          </p>
        </div>

        {/* Vibrant, Flat Text Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl">
          Lorem ipsum{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-fuchsia-500">
            dolor sit amet
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-200 max-w-xl font-normal leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur.
        </p>

        {/* Sharp-edged, high-contrast buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/join"
            className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white text-sm font-bold tracking-wider uppercase hover:brightness-110 transition-all text-center"
          >
            Join Our Community
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 border border-white/40 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/10 transition-all text-center"
          >
            Sponsor & Partner
          </Link>
        </div>

        {/* Flat, functional timeline sliders */}
        <div className="absolute bottom-[-10vh] md:bottom-[-12vh] flex gap-3">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group py-2 focus:outline-none"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div 
                className={`h-[3px] transition-all duration-300 ${
                  i === current ? "bg-amber-400 w-12" : "bg-white/30 w-4 hover:bg-white/60"
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}