import Image from "next/image"

const images = [
  "https://picsum.photos/seed/about1/1200/800",
  "https://picsum.photos/seed/about2/1200/800",
  "https://picsum.photos/seed/about3/1200/800",
]

const values = [
  {
    title: "Example",
    description: "Example",
  },
]

export const metadata = {
  title: "Who we are — Adelaide Space Society",
}

export default function WhoWeArePage() {
  return (
    <div className="min-h-screen bg-space-dark pt-24">

      {/* Purpose section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-4">
              Lorem ipsum dolor sit amet
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Lorem ipsum
            </h1>
            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. Nulla rhoncus feugiat eros quis consectetur.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { stat: "x", label: "Members" },
                { stat: "x",    label: "Years running" },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-white">{stat}</p>
                  <p className="text-white/40 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — stacked images with offset */}
          <div className="relative h-[480px] hidden md:block">
            <div className="absolute top-0 right-0 w-[85%] h-[55%] rounded-2xl overflow-hidden">
              <img
                src="https://picsum.photos/seed/about-a/800/600"
                alt="Society members"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[75%] h-[50%] rounded-2xl overflow-hidden border-4 border-space-dark">
              <img
                src="https://picsum.photos/seed/about-b/800/600"
                alt="Rocket launch"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Accent dot */}
            <div className="absolute top-[52%] right-[13%] w-4 h-4 rounded-full bg-space-blue" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-white/5 bg-space-navy py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
              What drives us
            </p>
            <h2 className="text-3xl font-bold text-white">Our values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-white/5 bg-space-dark p-6 hover:border-white/15 transition-colors"
              >
                <div className="w-8 h-1 rounded-full bg-space-blue mb-5" />
                <h3 className="text-white font-bold text-lg mb-3">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}