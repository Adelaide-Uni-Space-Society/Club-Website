"use client"

import { useState } from "react"
import FeaturedEventCarousel from "@/components/events/FeaturedEventCarousel"
import { events } from "@/lib/data/events" 

// --- CONFIGURATION TOGGLE ---
// Set this to true to close checkout. Change to false to open sales back up!
const IS_SOLD_OUT = true

export default function TicketsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const featuredEvent = events.find(e => e.id === "1" || e.id === "galaxy-ball-2026")

  async function handleCheckout() {
    // Extra safety barrier in case an element bypasses disabled states
    if (IS_SOLD_OUT) return

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

  const inputClass = "w-full px-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors disabled:opacity-40 disabled:cursor-not-allowed"

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
              {/* Conditional Title messaging */}
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {IS_SOLD_OUT ? "Tier 1: Sold Out" : "Secure Your Place"}
              </h1>
            </div>

            <div className="rounded-xs border border-white/5 bg-space-navy p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                disabled={IS_SOLD_OUT} // Disables name entry
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                disabled={IS_SOLD_OUT} // Disables email entry
              />
              
              <div className="pt-1 text-right">
                <p className="text-[11px] font-mono text-white/30 tracking-wide uppercase">
                  {IS_SOLD_OUT ? "Stay tuned for future releases" : "Limit 1 ticket per person"}
                </p>
              </div>

              {error && <p className="text-red-400 text-sm pt-2">{error}</p>}

              <button
                onClick={handleCheckout}
                /* Hard block actions if loading or if sold out flag evaluates true */
                disabled={IS_SOLD_OUT || loading || !name || !email}
                className="w-full py-3 mt-2 rounded-xs text-white font-semibold text-sm transition-colors min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed bg-space-blue hover:bg-space-blue/80"
              >
                {IS_SOLD_OUT ? "SOLD OUT" : loading ? "Redirecting..." : "Buy ticket"}
              </button>
            </div>
          </div>

        </div>
        
      </div>
    </div>
  )
}