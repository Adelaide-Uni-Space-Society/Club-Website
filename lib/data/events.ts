import type { Event } from "@/lib/types/event"

export const events: Event[] = [
  // --- upcoming ---
  {
    id: "1",
    title: "Galaxy Ball 2026",
    description: "THE event of the year. Do not miss it.",
    date: "2026-07-15",
    location: "Engineering Building, Room 204",
    imageUrl: "https://picsum.photos/seed/cubesat/800/500",
    tags: ["talk", "satellites"],
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