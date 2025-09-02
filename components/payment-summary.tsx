"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface BookingData {
  firstName: string
  lastName: string
  email: string
  eventType: string
  eventDate: string
  eventTime: string
  venueName: string
  venueCity: string
  venueState: string
  extendedHours: boolean
  additionalBackdrop: boolean
  travelFee: boolean
  rushDelivery: boolean
}

export function PaymentSummary() {
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  useEffect(() => {
    const savedData = localStorage.getItem("bookingFormData")
    if (savedData) {
      setBookingData(JSON.parse(savedData))
    }
  }, [])

  if (!bookingData) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Loading booking details...</p>
        </CardContent>
      </Card>
    )
  }

  // Calculate pricing
  const basePrice = 899 // Premium package
  const addOnPrices = {
    extendedHours: 200,
    additionalBackdrop: 150,
    travelFee: 100,
    rushDelivery: 75,
  }

  const selectedAddOns = [
    { name: "Extended hours (+2 hours)", price: addOnPrices.extendedHours, selected: bookingData.extendedHours },
    { name: "Additional backdrop", price: addOnPrices.additionalBackdrop, selected: bookingData.additionalBackdrop },
    { name: "Travel fee (outside 25 miles)", price: addOnPrices.travelFee, selected: bookingData.travelFee },
    { name: "Rush delivery (next day)", price: addOnPrices.rushDelivery, selected: bookingData.rushDelivery },
  ].filter((addon) => addon.selected)

  const addOnTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)
  const subtotal = basePrice + addOnTotal
  const tax = subtotal * 0.08
  const total = subtotal + tax
  const deposit = total * 0.5
  const remaining = total - deposit

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Customer Info */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm">Customer</h4>
            <p className="text-sm">
              {bookingData.firstName} {bookingData.lastName}
            </p>
            <p className="text-sm text-muted-foreground">{bookingData.email}</p>
          </div>

          <Separator />

          {/* Event Info */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm">Event Details</h4>
            <p className="text-sm capitalize">{bookingData.eventType}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(bookingData.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
              at {bookingData.eventTime}
            </p>
            <p className="text-sm text-muted-foreground">
              {bookingData.venueName}, {bookingData.venueCity}, {bookingData.venueState}
            </p>
          </div>

          <Separator />

          {/* Package Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-semibold text-sm">Package</h4>
              <Badge variant="secondary">Premium</Badge>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Premium Package</p>
                <p className="text-xs text-muted-foreground">6 hours of service</p>
              </div>
              <p className="text-sm font-semibold">${basePrice}</p>
            </div>
          </div>

          {/* Add-ons */}
          {selectedAddOns.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <h4 className="font-heading font-semibold text-sm">Add-On Services</h4>
                {selectedAddOns.map((addon, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span>{addon.name}</span>
                    <span className="font-semibold">+${addon.price}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <Separator />

          {/* Pricing Breakdown */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-primary">
              <span>Deposit (50%)</span>
              <span className="font-semibold">${deposit.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Remaining Balance</span>
              <span>${remaining.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Security */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="font-heading font-semibold text-sm">Secure Payment</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Your payment is protected by 256-bit SSL encryption and processed securely through Stripe.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="text-xs text-muted-foreground">Accepted:</div>
            <div className="flex gap-2">
              <div className="px-2 py-1 bg-background rounded text-xs font-medium">Visa</div>
              <div className="px-2 py-1 bg-background rounded text-xs font-medium">MC</div>
              <div className="px-2 py-1 bg-background rounded text-xs font-medium">Amex</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Policy */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 space-y-2">
          <h4 className="font-heading font-semibold text-sm">Booking Policy</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Remaining balance due 7 days before event</li>
            <li>• Modifications allowed up to 14 days prior</li>
            <li>• Full refund if cancelled 30+ days in advance</li>
            <li>• 50% refund if cancelled 14-29 days prior</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
