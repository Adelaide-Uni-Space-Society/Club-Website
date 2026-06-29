"use client"

import { useState } from "react"
import type { Event } from "@/lib/types/event"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

interface CarouselEvent extends Event {
  imageUrls?: string[]
}

export default function FeaturedEventCarousel({ event }: { event: CarouselEvent }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = event.imageUrls && event.imageUrls.length > 0 
    ? event.imageUrls 
    : [event.imageUrl]

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative rounded-xs overflow-hidden border border-white/10 w-full mx-auto flex flex-col bg-space-navy shadow-2xl shadow-black/40 lg:max-w-[420px]">
      
      {/* 4:5 Image Container */}
      <div className="relative overflow-hidden w-full bg-black/40 aspect-[4/5]">
        <img
          src={images[currentIndex]}
          alt={`${event.title} - Image ${currentIndex + 1}`} 
          className="w-full h-full object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-space-navy/50 select-none">
          <button
            onClick={prevImage}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-white border border-white/10 flex items-center justify-center text-xs transition-all"
            aria-label="Previous image"
          >
            ←
          </button>

          <div className="flex gap-1.5 px-2 py-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentIndex(index)
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-3 bg-space-blue" : "w-1.5 bg-white/25"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextImage}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-white border border-white/10 flex items-center justify-center text-xs transition-all"
            aria-label="Next image"
          >
            →
          </button>
        </div>
      )}

      {/* Info */}
      <div className="p-5 w-full bg-space-navy flex flex-col flex-grow">
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
        
        <h3 className="text-white text-lg sm:text-xl font-bold mb-1 leading-tight">
          {event.title} 
        </h3>

        {/* Location */}
        {event.location && (
          <div className="flex items-start gap-1.5 text-white/80 font-medium text-xs mt-1 mb-3 bg-white/5 border border-white/5 p-2.5 rounded-xs">
            <span className="text-space-blue flex-shrink-0">📍</span>
            <span>{event.location}</span>
          </div>
        )}
        
        <p className="text-white/60 text-xs max-w-2xl mb-4 leading-relaxed">
          {event.description} 
        </p>
        
        <div className="mt-auto pt-2">
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-4 py-2 rounded-xs bg-space-blue text-white text-xs font-semibold hover:bg-space-blue/80 transition-colors min-h-[38px] items-center justify-center w-full text-center"
            >
              Register Now →
            </a>
          )}
        </div>
      </div>

    </div>
  )
}