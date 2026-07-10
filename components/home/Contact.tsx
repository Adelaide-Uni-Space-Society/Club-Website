"use client"

import { useState } from "react"

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [form, setForm] = useState({ name: "", email: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to deliver message.")
        setStatus("error")
        return
      }

      setStatus("success")
      setForm({ name: "", email: "", message: "" })
    } catch (err) {
      console.error(err)
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  const inputClass = "w-full px-4 py-3.5 rounded-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors min-h-[44px]"

  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Contact Us
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
        </div>

        {status === "success" ? (
          <div className="text-center py-12 rounded-xs border border-white/5 bg-space-navy p-8 shadow-xl shadow-black/20">
            <p className="text-space-blue font-semibold text-lg">Message Sent!</p>
            <p className="text-white/50 mt-2 text-sm">
              Thank you for reaching out. Your message has been routed to our team, and we will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-sm text-white/30 hover:text-white transition-colors min-h-[44px] px-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="rounded-xs border border-white/5 bg-space-navy p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                disabled={status === "loading"}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                disabled={status === "loading"}
              />
            </div>
            <textarea
              name="message"
              required
              rows={6}
              placeholder="Your message details..."
              value={form.message}
              onChange={handleChange}
              className={`${inputClass} resize-none`}
              disabled={status === "loading"}
            />
            
            {status === "error" && (
              <p className="text-red-400 text-sm font-medium pt-1">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading" || !form.name || !form.email || !form.message}
              className="w-full py-4 rounded-xs bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px] flex items-center justify-center"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}