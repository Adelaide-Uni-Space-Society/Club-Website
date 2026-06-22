import { sponsors, getSponsorsByTier } from "@/lib/data/sponsors"

function SponsorLogo({ name, logoUrl, websiteUrl }: {
  name: string
  logoUrl: string
  websiteUrl: string
}) {
  return (
    <a
      href={websiteUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors opacity-60 hover:opacity-100"
    >
      <img src={logoUrl} alt={name} className="h-10 w-auto filter invert" />
    </a>
  )
}

export default function Sponsors() {
  const gold     = getSponsorsByTier("gold")
  const silver   = getSponsorsByTier("silver")
  const bronze   = getSponsorsByTier("bronze")

  return (
    <section className="bg-space-dark py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Supported by
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Our sponsors
          </h2>
        </div>

        {gold.length > 0 && (
          <div className="mb-10">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-6">
              Gold
            </p>
            <div className="max-w-sm mx-auto">
              {gold.map((s) => (
                <SponsorLogo key={s.id} {...s} />
              ))}
            </div>
          </div>
        )}

        {silver.length > 0 && (
          <div className="mb-10">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-6">
              Silver
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {silver.map((s) => (
                <SponsorLogo key={s.id} {...s} />
              ))}
            </div>
          </div>
        )}

        {bronze.length > 0 && (
          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-6">
              Bronze
            </p>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {bronze.map((s) => (
                <SponsorLogo key={s.id} {...s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}