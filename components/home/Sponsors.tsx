import { getSponsorsByTier } from "@/lib/data/sponsors"

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
      className="flex items-center justify-center p-5 sm:p-6 rounded-xs border border-white/5 hover:border-white/20 transition-colors opacity-60 hover:opacity-100 min-h-[60px] w-full"
    >
      <img src={logoUrl} alt={name} className="h-8 sm:h-10 w-auto filter invert object-contain" />
    </a>
  )
}

export default function Sponsors() {
  const gold     = getSponsorsByTier("gold")
  const silver   = getSponsorsByTier("silver")
  const bronze   = getSponsorsByTier("bronze")

  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
            Lorem Ipsum
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Lorem ipsum
          </h2>
        </div>

        {gold.length > 0 && (
          <div className="mb-10 w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-4 sm:mb-6">
              Lorem
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 max-w-md mx-auto gap-4">
              {gold.map((s) => (
                <SponsorLogo key={s.id} {...s} />
              ))}
            </div>
          </div>
        )}

        {silver.length > 0 && (
          <div className="mb-10 w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-4 sm:mb-6">
              Lorem
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto w-full">
              {silver.map((s) => (
                <SponsorLogo key={s.id} {...s} />
              ))}
            </div>
          </div>
        )}

        {bronze.length > 0 && (
          <div className="w-full">
            <p className="text-white/20 text-xs tracking-widest uppercase text-center mb-4 sm:mb-6">
              Lorem
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
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