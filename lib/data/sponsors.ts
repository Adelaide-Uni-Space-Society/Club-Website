import type { Sponsor } from "@/lib/types/sponsor"

export const sponsors: Sponsor[] = [
  {
    id: "1",
    name: "Silentium Defence",
    logoUrl: "/sponsors/SD-Vertical-PNG.png",
    websiteUrl: "https://example.com",
    tier: "supernova",
  },
  {
    id: "2",
    name: "Engineers Australia",
    logoUrl: "/sponsors/Engineers_Australia_Logo.png",
    websiteUrl: "https://example.com",
    tier: "milky way",
  },
  {
    id: "3",
    name: "KPMG",
    logoUrl: "/sponsors/KPMG_blue_logo.svg.png",
    websiteUrl: "https://example.com",
    tier: "nebula",
  },
  {
    id: "4",
    name: "South Australian Space Industry Centre",
    logoUrl: "/sponsors/SASIC_Horiz-RGB.png",
    websiteUrl: "https://example.com",
    tier: "nebula",
  },
  {
    id: "5",
    name: "Boeing",
    logoUrl: "/sponsors/Boeing.png",
    websiteUrl: "https://example.com",
    tier: "nebula",
  },
  {
    id: "6",
    name: "Nova Systems",
    logoUrl: "/sponsors/Nova_Systems_Logo.png",
    websiteUrl: "https://example.com",
    tier: "nebula",
  },
  {
    id: "7",
    name: "Southern Launch",
    logoUrl: "/sponsors/SouthernLaunch.png",
    websiteUrl: "https://example.com",
    tier: "nebula",
  },
  {
    id: "8",
    name: "Robinson Aerospace",
    logoUrl: "/sponsors/robinson_aerospace_logo_black.png",
    websiteUrl: "https://example.com",
    tier: "eclipse",
  },
]

export function getSponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier)
}

export const TIER_ORDER = ["supernova", "milky way", "nebula", "eclipse"] as const

export function getSponsorsGrouped(): Record<Sponsor["tier"], Sponsor[]> {
  return {
    galaxy:    getSponsorsByTier("galaxy"),
    supernova:   getSponsorsByTier("supernova"),
    "milky way": getSponsorsByTier("milky way"),
    nebula: getSponsorsByTier("nebula"),
    eclipse: getSponsorsByTier("eclipse"),
  }
}