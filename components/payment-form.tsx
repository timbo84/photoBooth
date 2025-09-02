"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_example")

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
}

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  // Billing information state
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  useEffect(() => {
    // Create payment intent when component mounts
    createPaymentIntent()
  }, [])

  const createPaymentIntent = async () => {
    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 44950, // $449.50 in cents (50% deposit)
          currency: "usd",
        }),
      })

      const { clientSecret } = await response.json()
      setClientSecret(clientSecret)
    } catch (error) {
      console.error("Error creating payment intent:", error)
      setPaymentError("Failed to initialize payment. Please try again.")
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements || !clientSecret) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setPaymentError("Card information is required")
      setIsProcessing(false)
      return
    }

    // Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: billingInfo.name,
          email: billingInfo.email,
          address: {
            line1: billingInfo.address,
            city: billingInfo.city,
            state: billingInfo.state,
            postal_code: billingInfo.zip,
          },
        },
      },
    })

    if (error) {
      setPaymentError(error.message || "Payment failed. Please try again.")
      setIsProcessing(false)
    } else if (paymentIntent.status === "succeeded") {
      // Payment successful - redirect to success page
      router.push(`/booking/success?payment_intent=${paymentIntent.id}`)
    }
  }

  const handleInputChange = (field: keyof typeof billingInfo, value: string) => {
    setBillingInfo((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Billing Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billing-name">Full Name *</Label>
              <Input
                id="billing-name"
                value={billingInfo.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-email">Email Address *</Label>
              <Input
                id="billing-email"
                type="email"
                value={billingInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-address">Street Address *</Label>
            <Input
              id="billing-address"
              value={billingInfo.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billing-city">City *</Label>
              <Input
                id="billing-city"
                value={billingInfo.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-state">State *</Label>
              <Input
                id="billing-state"
                value={billingInfo.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-zip">ZIP Code *</Label>
              <Input
                id="billing-zip"
                value={billingInfo.zip}
                onChange={(e) => handleInputChange("zip", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Payment Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Card Information *</Label>
            <div className="p-3 border rounded-md bg-background">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {paymentError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive">{paymentError}</p>
            </div>
          )}

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Your payment information is encrypted and secure. We use Stripe for payment processing and never store
              your card details.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Deposit Amount:</span>
              <span>$449.50</span>
            </div>
            <Separator />
            <Button type="submit" size="lg" className="w-full" disabled={!stripe || !clientSecret || isProcessing}>
              {isProcessing ? "Processing Payment..." : "Pay Deposit $449.50"}
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By completing this payment, you agree to our terms of service and booking policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

export function PaymentForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
