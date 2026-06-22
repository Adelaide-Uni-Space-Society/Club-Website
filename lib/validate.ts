export function sanitiseString(value: unknown): string {
  if (typeof value !== "string") return ""
  return value.trim().slice(0, 500)
}

export function sanitiseEmail(value: unknown): string {
  const str = sanitiseString(value)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(str) ? str.toLowerCase() : ""
}

export function sanitiseStudentId(value: unknown): string {
  const str = sanitiseString(value)
  return str.replace(/[^a-zA-Z0-9]/g, "").slice(0, 20)
}