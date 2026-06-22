import type { Event } from "@/lib/types/event"

export const events: Event[] = [
  // --- upcoming ---
  {
    id: "1",
    title: "Introduction to CubeSats",
    description: "A beginner-friendly talk on small satellite design and the future of low-cost space access.",
    date: "2026-07-15",
    location: "Engineering Building, Room 204",
    imageUrl: "https://picsum.photos/seed/cubesat/800/500",
    tags: ["talk", "satellites"],
  },
  {
    id: "2",
    title: "Rocket Propulsion Workshop",
    description: "Hands-on session covering solid and liquid propellant systems with live demonstrations.",
    date: "2026-08-02",
    location: "Physics Lab, Level 3",
    imageUrl: "https://picsum.photos/seed/rocket/800/500",
    tags: ["workshop", "propulsion"],
  },
  {
    id: "3",
    title: "Stargazing Night",
    description: "Join us at the observatory for a guided tour of the winter sky.",
    date: "2026-08-20",
    location: "University Observatory",
    imageUrl: "https://picsum.photos/seed/stars/800/500",
    tags: ["social", "astronomy"],
  },
  // --- past ---
  {
    id: "4",
    title: "Space Industry Panel",
    description: "Local aerospace professionals discussed careers and the Australian space sector.",
    date: "2026-05-10",
    location: "Business School Auditorium",
    imageUrl: "https://picsum.photos/seed/panel/800/500",
    tags: ["talk", "careers"],
  },
  {
    id: "5",
    title: "Soldering Workshop",
    description: "Hands-on electronics session for the CanSat project team.",
    date: "2026-04-22",
    location: "Electronics Lab",
    imageUrl: "https://picsum.photos/seed/solder/800/500",
    tags: ["workshop"],
  },
  {
    id: "6",
    title: "Welcome BBQ",
    description: "Semester one welcome event for new and returning members.",
    date: "2026-03-05",
    location: "North Terrace Campus Lawns",
    imageUrl: "https://picsum.photos/seed/bbq/800/500",
    tags: ["social"],
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