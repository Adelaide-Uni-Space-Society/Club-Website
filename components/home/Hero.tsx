"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"

const images = [
  "/hero/earthset-artemis-ii.jpg",
  "/hero/auss-women-in-space-091.jpg",
  "/hero/SpaceSocietyHackathon.jpg",
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
    <section className="relative min-h-screen w-full overflow-hidden bg-slate-950 flex items-center py-20">
      
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

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-slate-950 to-transparent" />

      <div className="relative z-10 flex flex-col items-start text-left px-4 sm:px-6 md:px-16 max-w-5xl w-full mx-auto">
        
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-6 bg-amber-400" />
          <p className="text-amber-400 text-xs font-bold tracking-[0.2em] uppercase">
            Lorem Ipsum
          </p>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight max-w-3xl">
          Lorem ipsum{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-fuchsia-500">
            dolor sit amet
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link
            href="/join"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-fuchsia-600 text-white text-sm font-bold tracking-wider uppercase hover:brightness-110 transition-all text-center min-h-[44px] flex items-center justify-center"
          >
            Join Us
          </Link>
          <Link
            href="/about/club"
            className="w-full sm:w-auto px-8 py-4 border border-white/40 text-white text-sm font-bold tracking-wider uppercase hover:bg-white/10 transition-all text-center min-h-[44px] flex items-center justify-center"
          >
            About Us
          </Link>
        </div>

        <div className="absolute bottom-[-6vh] sm:bottom-[-10vh] md:bottom-[-12vh] flex gap-3 left-4 sm:left-auto">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group py-3 focus:outline-none min-h-[44px]"
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