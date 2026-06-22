"use client"

import { useState } from "react"

const opportunities = [
  {
    title: "Event volunteer",
    commitment: "2–4 hrs per event",
    description: "Help set up, run, and pack down society events. Great for meeting members and getting involved without a long commitment.",
    skills: ["Communication", "Reliability"],
  },
  {
    title: "Project team member",
    commitment: "3–5 hrs per week",
    description: "Join one of our active projects — rocketry, CanSat, ground station. Work alongside experienced students on real engineering challenges.",
    skills: ["Engineering", "Teamwork", "Problem solving"],
  },
  {
    title: "Social media & content",
    commitment: "2–3 hrs per week",
    description: "Create content, manage our social channels, and help tell the story of what we're building.",
    skills: ["Writing", "Design", "Social media"],
  },
  {
    title: "Sponsorship outreach",
    commitment: "Flexible",
    description: "Help identify and approach potential sponsors. Great experience for students interested in business development.",
    skills: ["Communication", "Research", "Networking"],
  },
]

export default function VolunteerPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 800))
    setStatus("success")
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors"

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
            Get involved
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Volunteer with us
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            You don't need to be a committee member to shape the society.
            Volunteers are the engine behind everything we do.
          </p>
        </div>

        {/* Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {opportunities.map(({ title, commitment, description, skills }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/5 bg-space-navy p-7 hover:border-white/15 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-white font-bold text-lg">{title}</h3>
                <span className="flex-shrink-0 text-xs text-white/30 border border-white/10 rounded-full px-3 py-1">
                  {commitment}
                </span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">{description}</p>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-space-blue/10 text-space-blue">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Expression of interest form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white mb-3">Express your interest</h2>
            <p className="text-white/40 text-sm">
              Fill this in and we'll be in touch about the best fit for you.
            </p>
          </div>

          {status === "success" ? (
            <div className="text-center py-12 rounded-2xl border border-white/5 bg-space-navy">
              <p className="text-space-blue font-semibold text-lg mb-2">We'd love to have you! 🚀</p>
              <p className="text-white/40 text-sm">We'll reach out within a few days.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name"  type="text"  required placeholder="Your name"       value={form.name}  onChange={handleChange} className={inputClass} />
                <input name="email" type="email" required placeholder="your@email.com"  value={form.email} onChange={handleChange} className={inputClass} />
              </div>
              <select name="role" value={form.role} onChange={handleChange} className={inputClass} required>
                <option value="" disabled>Which role interests you?</option>
                {opportunities.map((o) => (
                  <option key={o.title} value={o.title}>{o.title}</option>
                ))}
                <option value="Not sure">Not sure yet</option>
              </select>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us a bit about yourself and why you'd like to get involved..."
                value={form.message}
                onChange={handleChange}
                className={inputClass + " resize-none"}
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 rounded-full bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}