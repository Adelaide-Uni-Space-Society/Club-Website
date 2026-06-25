import type { Sponsor } from "@/lib/types/sponsor"

type TierConfig = {
  label: string
  description: string
  logoHeight: string
  gridCols: string
  cardPadding: string
  accent: string
  dot: string
}

type Props = {
  tier: Sponsor["tier"]
  sponsors: Sponsor[]
  config: TierConfig
}

export default function SponsorTier({ sponsors, config }: Props) {
  return (
    <section className="w-full">
      {/* Tier label header layout */}
      <div className="flex items-center gap-3 mb-3">
        <span className={`w-2 h-2 rounded-xs flex-shrink-0 ${config.dot}`} />
        <h2 className="text-white font-bold text-xl tracking-tight">{config.label}</h2>
      </div>
      <p className="text-white/40 text-sm mb-6 sm:mb-8 ml-5 leading-relaxed">{config.description}</p>

      {/* Structural horizontal rule line */}
      <div className="border-t border-white/5 mb-6 sm:mb-8 w-full" />

      {/* Multi-column layout grid */}
      <div className={`grid ${config.gridCols} gap-4 w-full`}>
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              group flex items-center justify-center rounded-xs border
              bg-gradient-to-b ${config.accent}
              ${config.cardPadding}
              transition-all duration-300
              hover:bg-white/5 hover:scale-105
              min-h-[80px] w-full
            `}
          >
            <img
              src={sponsor.logoUrl}
              alt="Lorem ipsum"
              className={`${config.logoHeight} w-auto max-w-full object-contain filter invert opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
            />
          </a>
        ))}
      </div>
    </section>
  )
}