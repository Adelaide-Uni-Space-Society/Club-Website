"use client"

import { useState } from "react"
import type { Event } from "@/lib/types/event"
import EventCard from "@/components/events/EventCard"
import FeaturedEvent from "@/components/events/FeaturedEvent"

type Props = {
  upcoming: Event[]
  past: Event[]
  tags: string[]
}

export default function EventsClient({ upcoming, past, tags }: Props) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  function filterByTag(events: Event[]) {
    if (!activeTag) return events
    return events.filter((e) => e.tags?.includes(activeTag))
  }

  const filteredUpcoming = filterByTag(upcoming)
  const filteredPast = filterByTag(past)
  const featured = filteredUpcoming[0]
  const rest = filteredUpcoming.slice(1)

  return (
    <>
      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeTag === null
              ? "bg-space-blue text-white"
              : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
              activeTag === tag
                ? "bg-space-blue text-white"
                : "border border-white/10 text-white/50 hover:text-white hover:border-white/30"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Upcoming */}
      {filteredUpcoming.length > 0 ? (
        <section className="mb-20">
          <h2 className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-8">
            Upcoming
          </h2>
          {featured && <FeaturedEvent event={featured} />}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {rest.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <p className="text-white/30 text-sm mb-20">No upcoming events match that filter.</p>
      )}

      {/* Past */}
      {filteredPast.length > 0 && (
        <section>
          <h2 className="text-white/30 text-xs font-semibold tracking-widest uppercase mb-8">
            Past events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPast.map((event) => (
              <EventCard key={event.id} event={event} past />
            ))}
          </div>
        </section>
      )}
    </>
  )
}