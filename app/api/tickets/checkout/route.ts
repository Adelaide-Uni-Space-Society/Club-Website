// app/api/tickets/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { sanitiseEmail, sanitiseString } from "@/lib/validate";
import { ratelimit } from "@/lib/ratelimit";

const EVENT_CAP = 160; // Maximum number of tickets

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const name = sanitiseString(raw.name);
    const email = sanitiseEmail(raw.email);
    const quantity = Math.floor(Number(raw.quantity));

    if (!name || !email || !quantity || quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: "Please enter valid details." }, { status: 400 });
    }

    const { success } = await ratelimit.limit(`checkout:${email}`)

    if (!success) {
      return NextResponse.json(
        { error: "Too many attempts for this email. Please wait a few minutes." }, 
        { status: 429 }
      );
    }

    // Sum up all tickets already sold in ticket_orders table
    const { data: orders, error: fetchError } = await supabaseServer
      .from("ticket_orders")
      .select("quantity");

    if (fetchError) throw fetchError;

    const totalSold = orders?.reduce((sum, order) => sum + order.quantity, 0) || 0;

    // Block checkout if it exceeds ticket cap
    if (totalSold + quantity > EVENT_CAP) {
      return NextResponse.json({ error: "Sorry, this event is completely sold out!" }, { status: 400 });
    }

    // Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted_page",
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity }],
      customer_email: email,
      metadata: { name, quantity: String(quantity) }, 
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets`,
    });

    return NextResponse.json({ url: session.url });

  } catch (err) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}