import { getSponsorsGrouped, TIER_ORDER } from "@/lib/data/sponsors"
import SponsorTier from "@/components/sponsors/SponsorTier"

export const metadata = {
  title: "Sponsors — Adelaide Space Society",
  description: "The organisations that make our mission possible.",
}

const tierConfig = {
  gold: {
    label: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logoHeight: "h-16",
    gridCols: "grid-cols-1 md:grid-cols-3",
    cardPadding: "p-10",
    accent: "from-yellow-400/10 to-transparent border-yellow-400/20",
    dot: "bg-yellow-400",
  },
  silver: {
    label: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logoHeight: "h-10",
    gridCols: "grid-cols-2 md:grid-cols-4",
    cardPadding: "p-7",
    accent: "from-slate-300/10 to-transparent border-slate-300/20",
    dot: "bg-slate-300",
  },
  bronze: {
    label: "Lorem",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    logoHeight: "h-8",
    gridCols: "grid-cols-2 sm:grid-cols-3 md:grid-cols-5", // Optimized to grid-cols-2 on small phones for readability
    cardPadding: "p-5",
    accent: "from-orange-700/10 to-transparent border-orange-700/20",
    dot: "bg-orange-700",
  },
} as const

export default function SponsorsPage() {
  const grouped = getSponsorsGrouped()

  return (
    <div className="min-h-screen bg-space-dark py-16 sm:py-24 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
            Lorem Ipsum
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Lorem ipsum
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed text-sm sm:text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus.
          </p>
        </div>

        {/* Become a sponsor CTA - Optimized to flex-col on mobile */}
        <div className="mb-16 sm:mb-20 mt-8 sm:mt-10 rounded-xs border border-white/10 bg-space-navy px-6 sm:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
          <div>
            <p className="text-white font-semibold mb-1">Lorem ipsum dolor sit amet?</p>
            <p className="text-white/40 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <a
            href="mailto:hello@adelaidespacesociety.com"
            className="w-full md:w-auto flex-shrink-0 px-6 py-3.5 rounded-xs bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors text-center min-h-[44px] flex items-center justify-center whitespace-nowrap"
          >
            Lorem ipsum
          </a>
        </div>

        {/* Tiers Matrix */}
        <div className="space-y-16 sm:space-y-20 w-full">
          {TIER_ORDER.map((tier) => {
            const sponsors = grouped[tier]
            if (!sponsors.length) return null
            return (
              <SponsorTier
                key={tier} // CHANGED: Using 'tier' ensures the key is uniquely "gold", "silver", or "bronze"
                tier={tier}
                sponsors={sponsors}
                config={tierConfig[tier]}
              />
            )
          })}
        </div>

      </div>
    </div>
  )
}