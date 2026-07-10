import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { sanitiseEmail, sanitiseString } from "@/lib/validate";

export async function POST(req: Request) {
  try {
    const raw = await req.json();

    // Required
    const firstName = sanitiseString(raw.firstName);
    const lastName = sanitiseString(raw.lastName);
    const email = sanitiseEmail(raw.email);

    // Optional
    const phone = raw.phone ? sanitiseString(raw.phone) : null;
    const referralSource = raw.referralSource ? sanitiseString(raw.referralSource) : null;
    const comments = raw.comments ? sanitiseString(raw.comments) : null;

    // Check for compulsory
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: "First name, last name, and email are strictly required." }, 
        { status: 400 }
      );
    }

    // Insert into table
    const { error: dbError } = await supabaseServer
      .from("volunteer_applications")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        referral_source: referralSource,
        comments: comments
      });

    if (dbError) throw dbError;

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error: any) {
    console.error("Volunteer submission error:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." }, 
      { status: 500 }
    );
  }
}