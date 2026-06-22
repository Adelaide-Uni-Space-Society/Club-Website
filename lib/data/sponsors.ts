import type { Sponsor } from "@/lib/types/sponsor"

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Arasaka",
    logoUrl: "https://cyberpunk.fandom.com/wiki/Arasaka?file=Arasaka_Logo_CP2077.png",
    websiteUrl: "https://example.com",
    tier: "gold",
  },
  {
    id: "2",
    name: "Arasaka",
    logoUrl: "https://cyberpunk.fandom.com/wiki/Arasaka?file=Arasaka_Logo_CP2077.png",
    websiteUrl: "https://example.com",
    tier: "silver",
  },
  {
    id: "3",
    name: "Arasaka",
    logoUrl: "https://cyberpunk.fandom.com/wiki/Arasaka?file=Arasaka_Logo_CP2077.png",
    websiteUrl: "https://example.com",
    tier: "bronze",
  },
]

export function getSponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier)
}

export const TIER_ORDER = ["gold", "silver", "bronze"] as const

export function getSponsorsGrouped(): Record<Sponsor["tier"], Sponsor[]> {
  return {
    gold:   getSponsorsByTier("gold"),
    silver: getSponsorsByTier("silver"),
    bronze: getSponsorsByTier("bronze"),
  }
}