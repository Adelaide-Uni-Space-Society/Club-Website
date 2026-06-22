"use client"

import { useState } from "react"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    // TODO: wire up to app/api/contact/route.ts with Resend
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
    setForm({ name: "", email: "", message: "" })
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors"

  return (
    <section className="bg-space-dark py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Get in touch
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contact us
          </h2>
          <p className="text-white/50">
            Questions, sponsorship enquiries, or just want to say hi — we'd love to hear from you.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-12">
            <p className="text-space-blue font-semibold text-lg">Message sent!</p>
            <p className="text-white/50 mt-2">We'll get back to you within a few days.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-white/30 hover:text-white transition-colors"
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your message..."
              value={form.message}
              onChange={handleChange}
              className={inputClass + " resize-none"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 rounded-full bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}