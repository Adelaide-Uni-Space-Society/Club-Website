export default function Purpose() {
  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        <div className="rounded-xs overflow-hidden aspect-[4/3] w-full">
          <img
            src="/hero/SpaceSocietyHackathon.jpg"
            alt="Space Society Hackathon"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-4">
            Who we are
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            The Club's Purpose
          </h2>
          <div className="space-y-4 text-white/60 leading-relaxed text-sm sm:text-base">
            <p>
              Based at the University of Adelaide in South Australia, we are a student-run not-for-profit space society. Our objectives are to create an inclusive community for everyone who is interested in space while connecting students with the space industry and professionals. 

We aim to provide high-calibre events such as the Space and Innovation Hackathon, Galaxy Ball, Industry Night, Conspiracy Night, Your Place in Space Panels, and many more!

The AUSS has grown significantly since its founding in 2017 and continues to grow consistently from year to year. In 2024, we were able to set new records across the board and expect to grow even further in 2025.

We aim to empower the brightest and most passionate students to find their place in the up-and-coming space sector, to become the space leaders of tomorrow.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}