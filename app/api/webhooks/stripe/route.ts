import Stripe from "stripe"
import { headers } from "next/headers"
import { supabaseServer } from "@/lib/supabase-server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature")

  if (!signature) {
    console.error(JSON.stringify({
      event: "webhook_missing_signature",
      timestamp: new Date().toISOString(),
    }))
    return new Response("Missing signature", { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error(JSON.stringify({
      event: "webhook_signature_failed",
      error: String(err),
      timestamp: new Date().toISOString(),
    }))
    return new Response("Invalid signature", { status: 400 })
  }

  // Idempotency Check: Verify that event ID is not fully completed
  const { data: existing } = await supabaseServer
    .from("stripe_events")
    .select("id")
    .eq("stripe_event_id", event.id)
    .maybeSingle()

  if (existing) {
    console.log(JSON.stringify({
      event: "webhook_duplicate_skipped",
      stripe_event_id: event.id,
      timestamp: new Date().toISOString(),
    }))
    return new Response("Already processed", { status: 200 })
  }

  // Process only on completed checkout sessions
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Double check the session id itself isn't duplicate order
    const { data: existingOrder } = await supabaseServer
      .from("ticket_orders")
      .select("id")
      .eq("stripe_session_id", session.id)
      .maybeSingle()

    if (existingOrder) {
      return new Response("Already processed", { status: 200 })
    }

    try {
      const insertData = {
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent as string,
        email: session.customer_email ?? "test@stripe-trigger.com",
        name: session.metadata?.name ?? "Test User",
        quantity: parseInt(session.metadata?.quantity ?? "1"),
        amount_cents: session.amount_total!,
        currency: session.currency!,
        status: "paid",
      }

      console.log("Attempting order insert:", JSON.stringify(insertData))

      // Insert  ticket order
      const { error: orderError } = await supabaseServer.from("ticket_orders").insert(insertData)
      if (orderError) throw orderError

      // Record event in stripe_events after successful order insert to ensure idempotency
      const { error: eventError } = await supabaseServer.from("stripe_events").insert({
        stripe_event_id: event.id,
        event_type: event.type,
        payload: event,
      })
      if (eventError) throw eventError

      // Log success tracking metrics
      await supabaseServer.from("payment_logs").insert({
        event_type: "ticket_purchase_completed",
        stripe_session_id: session.id,
        email: session.customer_email,
        amount_cents: session.amount_total,
        metadata: {
          name: session.metadata?.name,
          quantity: session.metadata?.quantity,
        },
        status: "success",
      })

      console.log(JSON.stringify({
        event: "ticket_purchase_completed",
        stripe_session_id: session.id,
        email: session.customer_email,
        timestamp: new Date().toISOString(),
      }))

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : JSON.stringify(err)

      console.error(JSON.stringify({
        event: "ticket_processing_failed",
        stripe_session_id: session.id,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      }))

      // Log exact database error state to payment logs
      await supabaseServer.from("payment_logs").insert({
        event_type: "ticket_purchase_failed",
        stripe_session_id: session.id,
        email: session.customer_email,
        amount_cents: session.amount_total,
        metadata: { error: errorMessage },
        status: "error",
      })

      // Returning 500 tells Stripe code crashed, forcing it to retry safely later
      return new Response("Processing failed", { status: 500 })
    }
  }

  return new Response("OK", { status: 200 })
}