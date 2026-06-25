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
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
    setForm({ name: "", email: "", message: "" })
  }

  const inputClass = "w-full px-4 py-3.5 rounded-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors min-h-[44px]"

  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 sm:text-center sm:mb-12">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Lorem Ipsum
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Lorem ipsum
          </h2>
          <p className="text-white/50 text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        {status === "success" ? (
          <div className="text-center py-12">
            <p className="text-space-blue font-semibold text-lg">Lorem ipsum!</p>
            <p className="text-white/50 mt-2 text-sm">Lorem ipsum dolor sit amet.</p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-white/30 hover:text-white transition-colors min-h-[44px] px-4"
            >
              Lorem ipsum
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                required
                placeholder="Lorem ipsum"
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
              placeholder="Lorem ipsum..."
              value={form.message}
              onChange={handleChange}
              className={inputClass + " resize-none"}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-xs bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50 min-h-[44px] flex items-center justify-center"
            >
              {status === "loading" ? "..." : "Lorem ipsum"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}