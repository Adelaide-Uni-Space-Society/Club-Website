"use client"

import { useState } from "react"
import FeaturedEventCarousel from "@/components/events/FeaturedEventCarousel"
// FIXED: Adjusted pathing target to point safely to the lib layout folder
import { events } from "@/lib/data/events" 

export default function TicketsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Pull the event dynamically from your backend data file using its ID
  const featuredEvent = events.find(e => e.id === "1" || e.id === "galaxy-ball-2026")

  async function handleCheckout() {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/tickets/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, quantity: 1 }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.")
        setLoading(false)
        return
      }

      if (!data.url) {
        setError("No checkout URL returned.")
        setLoading(false)
        return
      }

      window.location.href = data.url

    } catch (err) {
      console.error("Fetch error:", err)
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors"

  // Fail-safe if data file pathing or array lookup misses
  if (!featuredEvent) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center text-white">
        <p>Event data payload could not be resolved.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24 flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dynamic Featured Event Card */}
          <div className="lg:col-span-7 w-full h-full flex flex-col justify-center">
            <FeaturedEventCarousel event={featuredEvent} />
          </div>

          {/* Right Column: Ticket Checkout Form */}
          <div className="lg:col-span-5 w-full">
            <div className="mb-6">
              <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
                Get your ticket
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Secure Your Place</h1>
            </div>

            <div className="rounded-xs border border-white/5 bg-space-navy p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
              
              <div className="pt-1 text-right">
                <p className="text-[11px] font-mono text-white/30 tracking-wide uppercase">
                  Limit 1 ticket per person
                </p>
              </div>

              {error && <p className="text-red-400 text-sm pt-2">{error}</p>}

              <button
                onClick={handleCheckout}
                disabled={loading || !name || !email}
                className="w-full py-3 mt-2 rounded-xs bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50 min-h-[44px]"
              >
                {loading ? "Redirecting..." : "Buy ticket"}
              </button>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}