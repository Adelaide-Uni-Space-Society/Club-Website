export const metadata = {
  title: "Meet the committee — Adelaide Space Society",
}

export default function MeetTheCommitteePage() {
  return (
    <div className="min-h-screen bg-space-dark flex items-center justify-center py-24 px-4 sm:px-6 w-full">
      <div className="max-w-xl w-full text-center p-8 sm:p-12 rounded-xs border border-white/5 bg-space-navy relative overflow-hidden">
        
        {/* Status Indicator Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-white/5 border border-white/10 mb-6">
          <span className="w-2 h-2 rounded-xs bg-amber-400 animate-pulse" />
          <p className="text-white/60 font-mono text-xs tracking-wider uppercase">
            Lorem Ipsum
          </p>
        </div>

        {/* Main Header Block */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
          Under Construction
        </h1>
        
        {/* Descriptive Body */}
        <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.
        </p>

        {/* Layout Bottom Spacer */}
        <div className="mt-8 pt-6 border-t border-white/5 text-[11px] font-mono text-white/20 uppercase tracking-widest">
          Lorem ipsum
        </div>

      </div>
    </div>
  )
}