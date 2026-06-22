import { supabaseServer } from "@/lib/supabase-server"
import { NextResponse } from "next/server"
import type { MemberFormData } from "@/lib/types/member"
import { sanitiseEmail, sanitiseString, sanitiseStudentId } from "@/lib/validate"

import { ratelimit } from "@/lib/ratelimit"
import { headers } from "next/headers"

export async function POST(req: Request) {
  
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for") ?? "unknown"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 }
    )
  }
  
  try {


    const body = await req.json()
    const fullName    = sanitiseString(body.fullName)
    const email       = sanitiseEmail(body.email)
    const studentId   = sanitiseStudentId(body.studentId)
    const faculty     = sanitiseString(body.faculty)
    const degree      = sanitiseString(body.degree)
    const yearOfStudy = sanitiseString(body.yearOfStudy)
    const referral    = sanitiseString(body.referral)
    const message     = sanitiseString(body.message).slice(0, 1000)

    if (!fullName || !email || !studentId || !faculty || !degree || !yearOfStudy) {
        return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
        )
    }

    if (!email) {
        return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
        )
    }

    const { error } = await supabaseServer.from("members").insert({
        full_name:     fullName,
        email:         email,
        student_id:    studentId,
        faculty:       faculty,
        degree:        degree,
        year_of_study: yearOfStudy,
        referral:      referral || null,
        message:       message || null,
    })


    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This email is already registered." },
          { status: 409 }
        )
      }
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Join API error:", err)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}