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