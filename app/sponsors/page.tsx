import { getSponsorsGrouped } from "@/lib/data/sponsors"

export const metadata = {
  title: "Sponsors — Adelaide Space Society",
  description: "The organisations that make our mission possible.",
}

function SponsorLogo({ name, logoUrl, websiteUrl, tierSize }: {
  name: string
  logoUrl: string
  websiteUrl: string
  tierSize: string
}) {
  return (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full sm:max-w-[320px] transition-all duration-300 hover:scale-[1.03] group"
    >
      <div className="flex items-center justify-center p-6 rounded-xs bg-white/10 backdrop-blur-md border border-white/10 group-hover:border-white/20 w-full min-h-[120px] sm:min-h-[140px] shadow-xl shadow-black/30 transition-colors">
        <img 
          src={logoUrl} 
          alt={name} 
          className={`${tierSize} w-auto object-contain max-w-[85%] max-h-[80px]`} 
        />
      </div>
    </a>
  )
}

export default function SponsorsPage() {
  const grouped = getSponsorsGrouped()

  const galaxy    = grouped["galaxy"] || []
  const supernova = grouped["supernova"] || []
  const milkyWay  = grouped["milky way"] || []
  const nebula    = grouped["nebula"] || []
  const eclipse   = grouped["eclipse"] || []

  return (
    <div className="min-h-screen bg-space-dark py-16 sm:py-24 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
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
          
          {/* Galaxy Tier */}
          {galaxy.length > 0 && (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <h2 className="text-xl font-bold text-white">Galaxy</h2>
              </div>
              <p className="text-white/40 text-sm mb-6 max-w-xl leading-relaxed">
                Our premier partnership tier driving space innovation.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
                {galaxy.map((s) => (
                  <SponsorLogo key={s.id} {...s} tierSize="h-16 sm:h-20" />
                ))}
              </div>
            </div>
          )}

          {/* Supernova Tier */}
          {supernova.length > 0 && (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <h2 className="text-xl font-bold text-white">Supernova</h2>
              </div>
              <p className="text-white/40 text-sm mb-6 max-w-xl leading-relaxed">
                Major supporters fueling our primary missions.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
                {supernova.map((s) => (
                  <SponsorLogo key={s.id} {...s} tierSize="h-12 sm:h-16" />
                ))}
              </div>
            </div>
          )}

          {/* Milky Way Tier */}
          {milkyWay.length > 0 && (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <h2 className="text-xl font-bold text-white">Milky Way</h2>
              </div>
              <p className="text-white/40 text-sm mb-6 max-w-xl leading-relaxed">
                Core partners helping expand our network outreach.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto w-full">
                {milkyWay.map((s) => (
                  <SponsorLogo key={s.id} {...s} tierSize="h-10 sm:h-12" />
                ))}
              </div>
            </div>
          )}

          {/* Nebula Tier */}
          {nebula.length > 0 && (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-orange-700" />
                <h2 className="text-xl font-bold text-white">Nebula</h2>
              </div>
              <p className="text-white/40 text-sm mb-6 max-w-xl leading-relaxed">
                Vital foundational support community partners.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                {nebula.map((s) => (
                  <SponsorLogo key={s.id} {...s} tierSize="h-8 sm:h-10" />
                ))}
              </div>
            </div>
          )}

          {/* Eclipse Tier */}
          {eclipse.length > 0 && (
            <div className="w-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2 h-2 rounded-full bg-blue-900" />
                <h2 className="text-xl font-bold text-white">Eclipse</h2>
              </div>
              <p className="text-white/40 text-sm mb-6 max-w-xl leading-relaxed">
                Valued event contributors and program providers.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                {eclipse.map((s) => (
                  <SponsorLogo key={s.id} {...s} tierSize="h-7 sm:h-8" />
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}