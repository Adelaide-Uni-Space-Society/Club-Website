export function sanitiseString(value: unknown): string {
  if (typeof value !== "string") return ""
  
  const trimmed = value.trim().slice(0, 500)
  
  return trimmed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
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