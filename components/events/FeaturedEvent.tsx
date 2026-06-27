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
    <div className="relative rounded-xs overflow-hidden border border-white/10 w-full mx-auto flex flex-col bg-space-navy shadow-2xl shadow-black/40">
      
      {/* Fixed Widescreen Cinematic Image Viewport */}
      <div className="relative overflow-hidden w-full bg-black/40 aspect-video md:aspect-[21/9]">
        <img
          src={event.imageUrl}
          alt={event.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Pure Content Info Block */}
      <div className="p-5 sm:p-6 w-full bg-space-navy flex flex-col flex-grow">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {event.tags?.map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-xs bg-space-blue/20 text-space-blue text-[11px] font-medium capitalize flex items-center"
            >
              {tag} 
            </span>
          ))}
        </div>
        
        <p className="text-space-blue text-[11px] font-semibold mb-1">
          {formatDate(event.date)}
        </p>
        
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 leading-tight">
          {event.title} 
        </h3>

        {/* Prominent Location Block */}
        {event.location && (
          <div className="flex items-start gap-1.5 text-white/80 font-medium text-xs sm:text-sm mt-1 mb-3 bg-white/5 border border-white/5 p-2.5 rounded-xs">
            <span className="text-space-blue flex-shrink-0">📍</span>
            <span>{event.location}</span>
          </div>
        )}
        
        <p className="text-white/60 text-xs sm:text-sm max-w-2xl mb-4 leading-relaxed">
          {event.description} 
        </p>
        
        <div className="mt-auto pt-2">
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-4 py-2 rounded-xs bg-space-blue text-white text-xs sm:text-sm font-semibold hover:bg-space-blue/80 transition-colors min-h-[38px] items-center justify-center w-full sm:w-auto px-6"
            >
              Register Now →
            </a>
          )}
        </div>
      </div>

    </div>
  )
}