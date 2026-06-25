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

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors"

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-lg mx-auto px-6">
        <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
          Get your tickets
        </p>
        <h1 className="text-4xl font-bold text-white mb-8">Event Tickets</h1>

        <div className="rounded-2xl border border-white/5 bg-space-navy p-8 space-y-4">
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
          <div className="flex items-center gap-4">
            <span className="text-white/50 text-sm">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full border border-white/10 text-white hover:border-white/30 transition-colors"
              >−</button>
              <span className="text-white font-bold w-4 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(10, quantity + 1))}
                className="w-8 h-8 rounded-full border border-white/10 text-white hover:border-white/30 transition-colors"
              >+</button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading || !name || !email}
            className="w-full py-3 rounded-full bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Buy tickets"}
          </button>
        </div>
      </div>
    </div>
  )
}