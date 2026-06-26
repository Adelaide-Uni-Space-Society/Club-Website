import Image from "next/image"

const images = [
  "/hero/auss-women-in-space-091.jpg",
  "/hero/earthset-artemis-ii.jpg",
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
              Who we are
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
              Adelaide University{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-fuchsia-500">
                Space Society
              </span>
            </h1>
            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Based at the University of Adelaide in South Australia, we are a student-run not-for-profit space society. Our objectives are to create an inclusive community for everyone who is interested in space while connecting students with the space industry and professionals. 

We aim to provide high-calibre events such as the Space and Innovation Hackathon, Galaxy Ball, Industry Night, Conspiracy Night, Your Place in Space Panels, and many more!

The AUSS has grown significantly since its founding in 2017 and continues to grow consistently from year to year. In 2024, we were able to set new records across the board and expect to grow even further in 2025.

We aim to empower the brightest and most passionate students to find their place in the up-and-coming space sector, to become the space leaders of tomorrow.
              </p>
            </div>
            
          </div>

          {/* Right — stacked images with offset */}
          <div className="relative h-[480px] hidden md:block">
            <div className="absolute top-0 right-0 w-[85%] h-[55%] rounded-xs overflow-hidden">
              <img
                src={images[1]}
                alt="Society members"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 w-[75%] h-[50%] rounded-xs overflow-hidden border-4 border-space-dark">
              <img
                src={images[0]}
                alt="Rocket launch"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}