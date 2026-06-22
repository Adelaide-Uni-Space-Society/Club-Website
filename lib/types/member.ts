export type MemberFormData = {
  fullName: string
  email: string
  studentId: string
  faculty: string
  degree: string
  yearOfStudy: string
  referral: string
  message: string
}

export type Member = {
  id: string
  createdAt: string
  fullName: string
  email: string
  studentId: string
  faculty: string
  degree: string
  yearOfStudy: string
  referral?: string
  message?: string
  status: "pending" | "active" | "paid"
}