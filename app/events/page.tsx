import { getUpcomingEvents, getPastEvents, getAllTags } from "@/lib/data/events"
import EventsClient from "@/components/events/EventsClient"

export const metadata = {
  title: "Events — Adelaide Space Society",
  description: "Upcoming and past events from the Adelaide Space Society.",
}

export default function EventsPage() {
  const upcoming = getUpcomingEvents()
  const past = getPastEvents()
  const tags = getAllTags()

  return (
    <div className="min-h-screen bg-space-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <p className="text-space-blue text-sm font-semibold tracking-widest uppercase mb-3">
            What's on
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Events
          </h1>
        </div>

        <EventsClient upcoming={upcoming} past={past} />
      </div>
    </div>
  )
}