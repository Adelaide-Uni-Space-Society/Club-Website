import type { Event } from "@/lib/types/event"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export default function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-colors group ${
        past
          ? "border-white/5 opacity-60 hover:opacity-80"
          : "border-white/5 hover:border-white/20"
      }`}
    >
      <div className="aspect-video overflow-hidden bg-space-navy">
        <img
          src={event.imageUrl}
          alt={event.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            past ? "grayscale" : ""
          }`}
        />
      </div>
      <div className="p-5 bg-space-navy">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {event.tags?.map((tag : any) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-xs capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className={`text-xs font-semibold mb-2 ${past ? "text-white/30" : "text-space-blue"}`}>
          {formatDate(event.date)}
        </p>
        <h3 className="text-white font-bold text-base leading-snug mb-2">
          {event.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-3">
          {event.description}
        </p>
        <p className="text-white/20 text-xs">{event.location}</p>
      </div>
    </div>
  )
}