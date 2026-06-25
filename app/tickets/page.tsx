"use client"

import { useState } from "react"

export default function TicketsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleCheckout() {
    setLoading(true)
    setError("")

    try {
        const res = await fetch("/api/tickets/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, quantity }),
        })

        const data = await res.json()
        console.log("Response status:", res.status)
        console.log("Response data:", data)

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

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-lg mx-auto px-6">
        <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
          Get your tickets
        </p>
        <h1 className="text-4xl font-bold text-white mb-8">Galaxy Ball 2026</h1>

        <div className="rounded-xs border border-white/5 bg-space-navy p-8 space-y-4">
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
          
          {/* Modified Quantity Block Container Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-white/50 text-sm">Quantity</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xs border border-white/10 text-white hover:border-white/30 transition-colors flex items-center justify-center min-h-[32px]"
                >−</button>
                <span className="text-white font-bold w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(3, quantity + 1))}
                  className="w-8 h-8 rounded-xs border border-white/10 text-white hover:border-white/30 transition-colors flex items-center justify-center min-h-[32px]"
                >+</button>
              </div>
            </div>
            
            {/* NEW: Explicit inline warning tag design to flag quantity thresholds */}
            <p className="text-[11px] font-mono text-white/30 tracking-wide uppercase sm:text-right">
              Maximum 3 tickets per person
            </p>
          </div>

          {error && <p className="text-red-400 text-sm pt-2">{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading || !name || !email}
            className="w-full py-3 mt-2 rounded-xs bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50 min-h-[44px]"
          >
            {loading ? "Redirecting..." : "Buy tickets"}
          </button>
        </div>
      </div>
    </div>
  )
}