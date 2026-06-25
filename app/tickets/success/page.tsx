export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-full bg-space-blue/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-space-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">You're in! 🚀</h1>
        <p className="text-white/50 leading-relaxed">
          Your ticket is confirmed. Check your email for a confirmation — see you there!
        </p>
      </div>
    </div>
  )
}