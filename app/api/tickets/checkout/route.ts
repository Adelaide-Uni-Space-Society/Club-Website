import Stripe from "stripe";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { sanitiseEmail, sanitiseString } from "@/lib/validate";
import { ratelimit } from "@/lib/ratelimit";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const name = sanitiseString(raw.name);
    const email = sanitiseEmail(raw.email);
    const dietaries = sanitiseString(raw.dietaries);
    const eventId = sanitiseString(raw.eventId) || "galaxy-ball-2026";
    const quantity = Math.floor(Number(raw.quantity));

    if (!name || !email || !dietaries || !quantity || quantity < 1 || quantity > 10) {
      return NextResponse.json({ error: "Please enter valid details." }, { status: 400 });
    }

    const { success } = await ratelimit.limit(`checkout:${email}`);
    if (!success) {
      return NextResponse.json(
        { error: "Too many attempts for this email. Please wait a few minutes." }, 
        { status: 429 }
      );
    }

    // 1. Look up price and capacity directly from the events table
    const { data: event, error: eventError } = await supabaseServer
      .from("events")
      .select("slug, stripe_price_id, ticket_cap, is_published")
      .eq("slug", eventId)
      .single();

    if (eventError || !event || !event.is_published) {
      return NextResponse.json({ error: "Event not found or unavailable for purchase." }, { status: 404 });
    }

    // 2. Count tickets sold specifically for this event
    const { data: orders, error: fetchError } = await supabaseServer
      .from("ticket_orders")
      .select("quantity")
      .eq("event_id", event.slug);

    if (fetchError) throw fetchError;

    const totalSold = orders?.reduce((sum, order) => sum + (Number(order.quantity) || 0), 0) || 0;

    if (totalSold + quantity > event.ticket_cap) {
      return NextResponse.json({ error: "Sorry, this batch of tickets is completely sold out!" }, { status: 409 });
    }

    // 3. Create Stripe Checkout Session using DB price ID and passing event_id to metadata
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "hosted_page",
      line_items: [{ price: event.stripe_price_id, quantity }], // Dynamic Price ID from DB
      customer_email: email,
      metadata: { 
        name, 
        quantity: String(quantity), 
        dietaries,
        event_id: event.slug, // Metadata passed to Webhook
      }, 
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tickets`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error?.message },
      { status: 500 }
    );
  }
}