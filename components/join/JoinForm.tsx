"use client"

import { useState } from "react"
import type { MemberFormData } from "@/lib/types/member"

const faculties = [
  "Engineering, Computer & Mathematical Sciences",
  "Sciences",
  "Arts",
  "Business",
  "Health & Medical Sciences",
  "Law",
  "Architecture & Landscape Architecture",
  "Education",
  "Other",
]

const referralOptions = [
  "Word of mouth",
  "Instagram",
  "Facebook",
  "Discord",
  "University orientation",
  "Poster / flyer",
  "Other",
]

const years = ["1", "2", "3", "4", "5+", "Postgraduate", "PhD"]

const inputClass = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors"
const labelClass = "block text-white/60 text-xs font-medium mb-1.5 uppercase tracking-wide"

const empty: MemberFormData = {
  fullName:    "",
  email:       "",
  studentId:   "",
  faculty:     "",
  degree:      "",
  yearOfStudy: "",
  referral:    "",
  message:     "",
}

export default function JoinForm() {
  const [form, setForm] = useState<MemberFormData>(empty)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((f : MemberFormData) => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.")
        setStatus("error")
        return
      }

      setStatus("success")
      setForm(empty)
    } catch {
      setErrorMsg("Network error. Please try again.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-space-blue/20 bg-space-navy p-10 text-center">
        <div className="w-14 h-14 rounded-full bg-space-blue/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-space-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-white font-bold text-xl mb-2">Welcome aboard! 🚀</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          You're now a member of the Adelaide Space Society. Keep an eye on
          your inbox — we'll be in touch with next steps.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/5 bg-space-navy p-8">
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full name *</label>
            <input
              name="fullName"
              type="text"
              required
              placeholder="Jane Smith"
              value={form.fullName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="a1234567@adelaide.edu.au"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Student ID + Year */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Student ID *</label>
            <input
              name="studentId"
              type="text"
              required
              placeholder="a1234567"
              value={form.studentId}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Year of study *</label>
            <select
              name="yearOfStudy"
              required
              value={form.yearOfStudy}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="" disabled>Select year</option>
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Faculty */}
        <div>
          <label className={labelClass}>Faculty *</label>
          <select
            name="faculty"
            required
            value={form.faculty}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>Select faculty</option>
            {faculties.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Degree */}
        <div>
          <label className={labelClass}>Degree / program *</label>
          <input
            name="degree"
            type="text"
            required
            placeholder="Bachelor of Engineering (Aerospace)"
            value={form.degree}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Referral */}
        <div>
          <label className={labelClass}>How did you hear about us?</label>
          <select
            name="referral"
            value={form.referral}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Prefer not to say</option>
            {referralOptions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>Anything else?</label>
          <textarea
            name="message"
            rows={3}
            placeholder="Questions, interests, what you'd like to get out of the society..."
            value={form.message}
            onChange={handleChange}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Error */}
        {status === "error" && (
          <p className="text-red-400 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-3 rounded-full bg-space-blue text-white font-semibold text-sm hover:bg-space-blue/80 transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Submitting..." : "Join the society"}
        </button>

        <p className="text-white/20 text-xs text-center">
          By submitting you agree to be contacted by Adelaide Space Society via email.
        </p>
      </form>
    </div>
  )
}