import type { Event } from "@/lib/types/event"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function FeaturedEvent({ event }: { event: Event }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
      <div className="aspect-[21/9] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags?.map((tag : any) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-space-blue/20 text-space-blue text-xs font-medium capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-space-blue text-sm font-semibold mb-2">
          {formatDate(event.date)}
        </p>
        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2">
          {event.title}
        </h3>
        <p className="text-white/60 text-sm max-w-xl mb-4">
          {event.description}
        </p>
        <p className="text-white/30 text-xs">{event.location}</p>
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block px-6 py-2.5 rounded-full bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors"
          >
            Register →
          </a>
        )}
      </div>
    </div>
  )
}