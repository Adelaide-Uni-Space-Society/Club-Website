import { getSponsorsGrouped } from "@/lib/data/sponsors"
import SponsorTier from "@/components/sponsors/SponsorTier" // Double check this matches your exact component path

export const metadata = {
  title: "Sponsors — Adelaide Space Society",
  description: "The organisations that make our mission possible.",
}

export default function SponsorsPage() {
  const grouped = getSponsorsGrouped()

  // Clean, literal configurations mapping the layout style rules per tier
  const tiersConfig = [
    {
      key: "galaxy" as const,
      label: "Galaxy",
      description: "Our premier partnership tier driving space innovation.",
      logoHeight: "h-16 sm:h-20",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto",
      cardPadding: "p-6",
      accent: "from-white/10 to-white/[0.02]",
      dot: "bg-purple-500"
    },
    {
      key: "supernova" as const,
      label: "Supernova",
      description: "Major supporters fueling our primary missions.",
      logoHeight: "h-12 sm:h-16",
      gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto",
      cardPadding: "p-5",
      accent: "from-white/5 to-white/[0.01]",
      dot: "bg-yellow-400"
    },
    {
      key: "milky way" as const,
      label: "Milky Way",
      description: "Core partners helping expand our network outreach.",
      logoHeight: "h-10 sm:h-12",
      gridCols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-w-5xl mx-auto",
      cardPadding: "p-4",
      accent: "from-white/5 to-white/0",
      dot: "bg-slate-300"
    },
    {
      key: "nebula" as const,
      label: "Nebula",
      description: "Vital foundational support community partners.",
      logoHeight: "h-8 sm:h-10",
      gridCols: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5",
      cardPadding: "p-4",
      accent: "from-white/5 to-white/0",
      dot: "bg-orange-700"
    },
    {
      key: "eclipse" as const,
      label: "Eclipse",
      description: "Valued event contributors and program providers.",
      logoHeight: "h-7 sm:h-8",
      gridCols: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-6",
      cardPadding: "p-3",
      accent: "from-white/5 to-white/0",
      dot: "bg-blue-900"
    }
  ]

  return (
    <div className="min-h-screen bg-space-dark py-16 sm:py-24 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Dynamic Header Block */}
        <div className="mb-10 sm:mb-12">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
            Our Partners
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Empowering the Future
          </h1>
          <p className="text-white/50 max-w-xl leading-relaxed text-sm sm:text-base">
            The organisations that make our space exploration and community missions a reality.
          </p>
        </div>

        {/* Become a Sponsor Callout Banner */}
        <div className="mb-16 sm:mb-20 mt-8 sm:mt-10 rounded-xs border border-white/10 bg-space-navy px-6 sm:px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 w-full">
          <div>
            <p className="text-white font-semibold mb-1">Want to support our mission?</p>
            <p className="text-white/40 text-sm">
              Get in touch with us to explore corporate alignment and tier benefits.
            </p>
          </div>
          <a
            href="mailto:hello@adelaidespacesociety.com"
            className="w-full md:w-auto flex-shrink-0 px-6 py-3.5 rounded-xs bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors text-center min-h-[44px] flex items-center justify-center whitespace-nowrap"
          >
            Become a Sponsor
          </a>
        </div>

        <div className="space-y-16 sm:space-y-20 w-full">
          {tiersConfig.map((config) => {
            // Safely looks up the list matching the literal keys allowed by TypeScript
            const sponsorsList = grouped[config.key] || []
            
            if (sponsorsList.length === 0) return null

            return (
              <SponsorTier 
                key={config.key}
                tier={config.key}
                sponsors={sponsorsList}
                config={config}
              />
            )
          })}
        </div>

      </div>
    </div>
  )
}