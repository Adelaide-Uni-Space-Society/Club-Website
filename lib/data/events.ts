import type { Event } from "@/lib/types/event"

export const events: Event[] = [
  // --- upcoming ---
  {
    id: "1",
    title: "Galaxy Ball 2026",
    description: "This year, Galaxy Ball is living up to its name. Join us in a stunning conservatory under the stars for an unforgettable night full of elegance and magic.\nA limited number of Early Bird tickets are available now, so don’t miss your chance to drink wine and dance under the stars 🌌🪐",
    date: "2026-09-05",
    location: "Ayers House, Adelaide",
    imageUrl: "/events/GalaxyBall.jpg",
    imageUrls: [
      "/events/GalaxyBallAnnouncement.png",
      "/events/AyersHouse1.png",
      "/events/AyersHouse2.png"
    ],
    tags: ["ball", "social", "formal"],
  },
]

export function getUpcomingEvents(count?: number): Event[] {
  const now = new Date()
  const sorted = events
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  return count ? sorted.slice(0, count) : sorted
}

export function getPastEvents(): Event[] {
  const now = new Date()
  return events
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getAllTags(): string[] {
  const tags = events.flatMap((e) => e.tags ?? [])
  return [...new Set(tags)].sort()
}