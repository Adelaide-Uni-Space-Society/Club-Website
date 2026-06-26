import type { Event } from "@/lib/types/event"

export const events: Event[] = [
  // --- upcoming ---
  {
    id: "1",
    title: "Galaxy Ball 2026",
    description: "SAVE THE DATE!! - September 5th. Join us for our annual Galaxy Ball, a fantastic night to remember. Get ready to chanel your inner astronaut and explore the possibilities, with old friends and new faces. Be prepared for a night dancing among the stars, dreaming beyond the clouds",
    date: "2026-07-15",
    location: "To be revealed on Friday (little hint, it's a conservatory hehe)",
    imageUrl: "/events/GalaxyBall.jpg",
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