import { getSponsorsGrouped, TIER_ORDER } from "@/lib/data/sponsors"
import type { Sponsor } from "@/lib/types/sponsor"
import SponsorTier from "@/components/sponsors/SponsorTier"

export const metadata = {
  title: "Sponsors — Adelaide Space Society",
  description: "The organisations that make our mission possible.",
}

const tierConfig = {
  gold: {
    label: "Gold",
    description: "Our principal partners — without whom none of this would be possible.",
    logoHeight: "h-16",
    gridCols: "grid-cols-1 md:grid-cols-3",
    cardPadding: "p-10",
    accent: "from-yellow-400/10 to-transparent border-yellow-400/20",
    dot: "bg-yellow-400",
  },
  silver: {
    label: "Silver",
    description: "Major supporters powering our projects and events.",
    logoHeight: "h-10",
    gridCols: "grid-cols-2 md:grid-cols-4",
    cardPadding: "p-7",
    accent: "from-slate-300/10 to-transparent border-slate-300/20",
    dot: "bg-slate-300",
  },
  bronze: {
    label: "Bronze",
    description: "Valued partners contributing to our community.",
    logoHeight: "h-8",
    gridCols: "grid-cols-3 md:grid-cols-5",
    cardPadding: "p-5",
    accent: "from-orange-700/10 to-transparent border-orange-700/20",
    dot: "bg-orange-700",
  },
} as const

export default function SponsorsPage() {
  const grouped = getSponsorsGrouped()

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-6">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
            Partners & supporters
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our sponsors
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed">
            These organisations share our passion for space and support
            the Adelaide Space Society through funding, resources, and expertise.
          </p>
        </div>

        {/* Become a sponsor CTA */}
        <div className="mb-20 mt-10 rounded-2xl border border-white/10 bg-space-navy px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold mb-1">Interested in sponsoring us?</p>
            <p className="text-white/40 text-sm">
              We offer a range of partnership packages to suit organisations of all sizes.
            </p>
          </div>
          <a
            href="mailto:hello@adelaidespacesociety.com"
            className="flex-shrink-0 px-6 py-2.5 rounded-full bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors"
          >
            Get in touch:
          </a>
        </div>

        {/* Tiers */}
        <div className="space-y-20">
          {TIER_ORDER.map((tier) => {
            const sponsors = grouped[tier]
            if (!sponsors.length) return null
            return (
              <SponsorTier
                key={tier}
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