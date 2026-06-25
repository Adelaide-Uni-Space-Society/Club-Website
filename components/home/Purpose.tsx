export default function Purpose() {
  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        <div className="rounded-xs overflow-hidden aspect-[4/3] w-full">
          <img
            src="https://picsum.photos/seed/purpose/800/600"
            alt="Lorem Ipsum"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-4">
            Lorem Ipsum
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            Lorem ipsum
          </h2>
          <div className="space-y-4 text-white/60 leading-relaxed text-sm sm:text-base">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. 
              Nulla rhoncus feugiat eros quis consectetur.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque aliquam odio et faucibus. 
              Nulla rhoncus feugiat eros quis consectetur.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6 border-t border-white/10 pt-8">
            {[
              { stat: "200+", label: "Lorem" },
              { stat: "5+",   label: "Lorem" },
              { stat: "3rd",  label: "Lorem" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <p className="text-xl sm:text-2xl font-bold text-white">{stat}</p>
                <p className="text-white/40 text-xs sm:text-sm mt-1 break-words">{label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}