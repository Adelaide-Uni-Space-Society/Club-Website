export default function Purpose() {
  return (
    <section className="bg-space-dark py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        <div className="rounded-2xl overflow-hidden aspect-[4/3]">
          <img
            src="https://picsum.photos/seed/purpose/800/600"
            alt="Society members at an event"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-4">
            Who we are
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Our purpose
          </h2>
          <div className="space-y-4 text-white/60 leading-relaxed">
            <p>
              We are a student-run society at the University of Adelaide united
              by a shared fascination with space. From rocketry and satellite
              design to astrophysics and industry networking, we bring together
              students from every discipline.
            </p>
            <p>
              Our goal is simple: make space accessible. Whether you're an
              engineering student building your first rocket or a curious
              newcomer who just wants to look at the stars, there's a place
              for you here.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { stat: "200+", label: "Members" },
              { stat: "5+",   label: "Active projects" },
              { stat: "3rd",  label: "Year running" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-white">{stat}</p>
                <p className="text-white/40 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}