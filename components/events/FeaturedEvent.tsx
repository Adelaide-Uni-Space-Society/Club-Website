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
    <div className="relative rounded-xs overflow-hidden border border-white/10 group w-full flex flex-col justify-end min-h-[400px] sm:min-h-0">
      
      <div className="absolute inset-0 sm:relative sm:aspect-[21/9] overflow-hidden w-full h-full sm:h-auto">
        <img
          src={event.imageUrl}
          alt="Lorem ipsum"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 sm:via-black/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 p-5 sm:p-8 mt-auto sm:mt-0 w-full">
        <div className="flex flex-wrap gap-2 mb-3">
          {event.tags?.map((tag : any) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-xs bg-space-blue/20 text-space-blue text-xs font-medium capitalize min-h-[26px] flex items-center"
            >
              Lorem ipsum
            </span>
          ))}
        </div>
        
        <p className="text-space-blue text-xs sm:text-sm font-semibold mb-2">
          {formatDate(event.date)}
        </p>
        
        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 leading-tight">
          Lorem ipsum
        </h3>
        
        <p className="text-white/60 text-sm max-w-xl mb-4 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        
        <p className="text-white/30 text-xs">Lorem ipsum</p>
        
        {event.registrationLink && (
          <a
            href={event.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex px-6 py-3.5 rounded-xs bg-space-blue text-white text-sm font-semibold hover:bg-space-blue/80 transition-colors min-h-[44px] items-center justify-center w-full sm:w-auto text-center"
          >
            Lorem ipsum →
          </a>
        )}
      </div>

    </div>
  )
}