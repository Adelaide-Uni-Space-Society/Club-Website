import Link from "next/link"
import { getUpcomingEvents } from "@/lib/data/events"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function Events() {
  const events = getUpcomingEvents(3)

  return (
    <section className="bg-space-dark py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 sm:mb-12">
          <div>
            <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-2">
              Lorem Ipsum
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Lorem ipsum
            </h2>
          </div>
          <Link
            href="/events"
            className="text-sm text-white/50 hover:text-white transition-colors hidden sm:block min-h-[44px] flex items-center"
          >
            Lorem ipsum →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-space-navy rounded-xs overflow-hidden border border-white/5 hover:border-white/20 transition-colors group"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-space-blue text-xs font-semibold tracking-widest uppercase mb-2">
                  {formatDate(event.date)}
                </p>
                <h3 className="text-white font-bold text-lg mb-2 leading-snug">
                  {event.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {event.description}
                </p>
                <p className="text-white/30 text-xs">{event.location}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:hidden text-center">
          <Link href="/events" className="text-sm text-white/50 hover:text-white transition-colors inline-block min-h-[44px] py-2">
            Lorem ipsum →
          </Link>
        </div>
      </div>
    </section>
  )
}