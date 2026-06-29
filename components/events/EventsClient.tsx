"use client"

import type { Event } from "@/lib/types/event"
import EventCard from "@/components/events/EventCard"
import FeaturedEvent from "@/components/events/FeaturedEvent"

type Props = {
  upcoming: Event[]
  past: Event[]
  tags: string[]
}

export default function EventsClient({ upcoming, past }: Omit<Props, "tags">) {
  const featured = upcoming[0]
  const rest = upcoming.slice(1)

  return (
    <div className="w-full px-1 sm:px-0">
      {/* Upcoming Container */}
      {upcoming.length > 0 ? (
        <section className="mb-16 sm:mb-20 w-full">
          <h2 className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-6 sm:mb-8">
            Upcoming Events
          </h2>
          {featured && <FeaturedEvent event={featured} />}
          
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
              {rest.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <p className="text-white/30 text-sm mb-16 sm:mb-20">No upcoming events at this time.</p>
      )}

      {/* Past Container */}
      {past.length > 0 && (
        <section className="w-full">
          <h2 className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-6 sm:mb-8">
            Past Events
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {past.map((event) => (
              <EventCard key={event.id} event={event} past />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}