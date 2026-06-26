"use client"

import { useState } from "react"

export default function TicketsPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleCheckout() {
    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/tickets/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Hardcoded quantity to 1 since it's the strict maximum
        body: JSON.stringify({ name, email, quantity: 1 }),
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
          Get your ticket
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
          
          {/* Subtle subtext to indicate the single-ticket policy */}
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
  )
}