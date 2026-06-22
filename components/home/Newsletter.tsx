"use client"

import { useState } from "react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    // TODO: wire up to Mailchimp / Beehiiv / Resend
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
    setEmail("")
  }

  return (
    <section className="bg-space-navy py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-4">
          Stay in the loop
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Mission updates, straight to your inbox
        </h2>
        <p className="text-white/50 mb-10">
          Event announcements, project milestones, and space news — no spam, unsubscribe any time.
        </p>

        {status === "success" ? (
          <p className="text-space-blue font-semibold">
            You're in! We'll be in touch soon. 🚀
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 rounded-full bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}