// import { type NextRequest, NextResponse } from "next/server"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
//   apiVersion: "2024-06-20",
// })

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

// export async function POST(request: NextRequest) {
//   const body = await request.text()
//   const sig = request.headers.get("stripe-signature") || ""

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err)
//     return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
//   }

//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.succeeded":
//       const paymentIntent = event.data.object as Stripe.PaymentIntent
//       console.log("Payment succeeded:", paymentIntent.id)

//       // Here you would typically:
//       // 1. Update your database with the successful payment
//       // 2. Send confirmation emails
//       // 3. Update booking status
//       // 4. Trigger any other business logic

//       break
//     case "payment_intent.payment_failed":
//       const failedPayment = event.data.object as Stripe.PaymentIntent
//       console.log("Payment failed:", failedPayment.id)

//       // Handle failed payment
//       // 1. Log the failure
//       // 2. Notify customer service
//       // 3. Send failure notification to customer

//       break
//     default:
//       console.log(`Unhandled event type ${event.type}`)
//   }

//   return NextResponse.json({ received: true })
// }
