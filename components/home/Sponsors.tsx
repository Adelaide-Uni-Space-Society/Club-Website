import { getSponsorsByTier } from "@/lib/data/sponsors"

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
      {/* Identical Frosted Glass implementation to keep the UI uniform across both views */}
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

export default function Sponsors() {
  const galaxy    = getSponsorsByTier("galaxy")
  const supernova = getSponsorsByTier("supernova")
  const milkyWay  = getSponsorsByTier("milky way")
  const nebula    = getSponsorsByTier("nebula")
  const eclipse   = getSponsorsByTier("eclipse")

  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Our Supporters
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Sponsors
          </h2>
        </div>

        {/* Galaxy */}
        {galaxy.length > 0 && (
          <div className="mb-14 sm:mb-16 w-full">
            <p className="text-purple-400 text-xs tracking-widest uppercase text-center mb-5 sm:mb-6 font-bold">
              Galaxy
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {galaxy.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-16 sm:h-20" />
              ))}
            </div>
          </div>
        )}

        {/* Supernova */}
        {supernova.length > 0 && (
          <div className="mb-14 sm:mb-16 w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-5 sm:mb-6">
              Supernova
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-4xl mx-auto">
              {supernova.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-12 sm:h-16" />
              ))}
            </div>
          </div>
        )}

        {/* Milky Way */}
        {milkyWay.length > 0 && (
          <div className="mb-14 sm:mb-16 w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-5 sm:mb-6">
              Milky Way
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl mx-auto w-full">
              {milkyWay.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-10 sm:h-12" />
              ))}
            </div>
          </div>
        )}

        {/* Nebula */}
        {nebula.length > 0 && (
          <div className="mb-14 sm:mb-16 w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-5 sm:mb-6">
              Nebula
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              {nebula.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-8 sm:h-10" />
              ))}
            </div>
          </div>
        )}

        {/* Eclipse */}
        {eclipse.length > 0 && (
          <div className="w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-5 sm:mb-6">
              Eclipse
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              {eclipse.map((s) => (
                <SponsorLogo key={s.id} {...s} tierSize="h-7 sm:h-8" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}