export type Sponsor = {
  id: string
  name: string
  logoUrl: string
  websiteUrl: string
  tier: "galaxy" | "supernova" | "milky way" | "nebula" | "eclipse"
}