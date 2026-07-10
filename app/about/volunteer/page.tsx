"use client"

import { useState } from "react"

export default function VolunteersPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [referralSource, setReferralSource] = useState("")
  const [comments, setComments] = useState("")
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Safety check on required fields before triggering API call
    if (!firstName || !lastName || !email) {
      setError("Please complete all required fields.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          referralSource,
          comments,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? "Failed to submit application.")
        setLoading(false)
        return
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Network error. Please try again.")
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xs bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-space-blue transition-colors disabled:opacity-40"

  if (submitted) {
    return (
      <div className="min-h-screen bg-space-dark flex items-center justify-center text-white p-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-3xl font-bold text-space-blue">Application Received!</h1>
          <p className="text-white/70 text-sm">
            Thank you for applying to volunteer. Our team will reach out to you soon via email.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24 flex items-center">
      <div className="max-w-2xl mx-auto px-6 w-full">
        <div className="mb-8 text-center sm:text-left">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Join the team
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Volunteer With Us
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xs border border-white/5 bg-space-navy p-6 sm:p-8 space-y-4 shadow-xl shadow-black/20">
          
          {/* Split Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="First Name *"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                disabled={loading}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name *"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                disabled={loading}
              />
            </div>
          </div>

          {/* Compulsory Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              disabled={loading}
            />
          </div>

          {/* Optional Phone Field */}
          <div>
            <input
              type="text"
              placeholder="Phone Number (Optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              disabled={loading}
            />
          </div>

          {/* Optional Referral Textbox */}
          <div>
            <input
              type="text"
              placeholder="How did you hear about us? (Optional)"
              value={referralSource}
              onChange={(e) => setReferralSource(e.target.value)}
              className={inputClass}
              disabled={loading}
            />
          </div>

          {/* Larger Optional Comments Textbox */}
          <div>
            <textarea
              placeholder="Additional comments or experience (Optional)"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={5}
              className={`${inputClass} resize-none`}
              disabled={loading}
            />
          </div>

          {error && <p className="text-red-400 text-sm pt-2">{error}</p>}

          <button
            type="submit"
            disabled={loading || !firstName || !lastName || !email}
            className="w-full py-3 mt-2 rounded-xs text-white font-semibold text-sm transition-colors min-h-[44px] bg-space-blue hover:bg-space-blue/80 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  )
}