export type Sponsor = {
  id: string
  name: string
  logoUrl: string
  websiteUrl: string
  tier: "gold" | "silver" | "bronze"
}