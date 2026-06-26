"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
    setEmail("")
  }

  return (
    <section className="bg-space-navy py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-4">
          Sign up for our newsletter
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
          UNDER CONSTRUCTION
        </h2>
        <p className="text-white/50 mb-8 sm:mb-10 text-sm sm:text-base">
          Stay up to date with the latest news and events with the AUSS. Sign up for our newsletter and never miss an update!
        </p>

        {status === "success" ? (
          <p className="text-space-blue font-semibold min-h-[44px] flex items-center justify-center">
            Success!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="UNDER CONSTRUCTION"
              className="w-full flex-1 px-4 py-3.5 rounded-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors min-h-[44px]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xs bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}