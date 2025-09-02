"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  eventTime: string
  guestCount: string
  venueName: string
  venueAddress: string
  venueCity: string
  venueState: string
  venueZip: string
  specialRequests: string
  hearAboutUs: string
  extendedHours: boolean
  additionalBackdrop: boolean
  travelFee: boolean
  rushDelivery: boolean
}

export function CartSummary() {
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
          <p className="text-muted-foreground">No booking data found. Please start over.</p>
          <Button className="mt-4" onClick={() => (window.location.href = "/booking")}>
            Start New Booking
          </Button>
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

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Customer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">
                {bookingData.firstName} {bookingData.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{bookingData.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{bookingData.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Event Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Event Type</p>
              <p className="font-medium capitalize">{bookingData.eventType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Guest Count</p>
              <p className="font-medium">{bookingData.guestCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="font-medium">
                {new Date(bookingData.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at {bookingData.eventTime}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Venue</p>
            <p className="font-medium">{bookingData.venueName}</p>
            <p className="text-sm text-muted-foreground">
              {bookingData.venueAddress}, {bookingData.venueCity}, {bookingData.venueState} {bookingData.venueZip}
            </p>
          </div>

          {bookingData.specialRequests && (
            <>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Special Requests</p>
                <p className="text-sm">{bookingData.specialRequests}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Package & Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Package & Pricing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Premium Package</p>
              <p className="text-sm text-muted-foreground">6 hours of service</p>
            </div>
            <div className="text-right">
              <Badge variant="secondary">Popular</Badge>
              <p className="font-semibold">${basePrice}</p>
            </div>
          </div>

          {selectedAddOns.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <p className="font-medium text-sm">Add-On Services</p>
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
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Deposit Required (50%)</span>
              <span>${deposit.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
