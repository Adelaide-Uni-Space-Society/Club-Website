// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ratelimit } from "@/lib/ratelimit"; // Adapts your existing Upstash Redis rate limit instance
import { sanitiseEmail, sanitiseString } from "@/lib/validate";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const senderEmail = process.env.SENDER_EMAIL_ADDR?.trim();
    const receiverEmail = process.env.RECEIVER_EMAIL_ADDR || "fallback@auspacesociety.org";

    if (!senderEmail) {
      console.error("Missing SENDER_EMAIL_ADDR environment variable");
      return NextResponse.json(
        { error: "Server configuration error." }, 
        { status: 500 }
      );
    }

    const raw = await req.json();
    const name = sanitiseString(raw.name);
    const email = sanitiseEmail(raw.email);
    const message = sanitiseString(raw.message);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // ... (your rate limiter code) ...

    // 2. Pass the verified 'senderEmail' variable which TypeScript now guarantees is a string
    const { error: emailError } = await resend.emails.send({
      from: senderEmail, 
      to: receiverEmail, 
      replyTo: email, 
      subject: `New Contact Form Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (emailError) throw emailError;

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("Contact Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}