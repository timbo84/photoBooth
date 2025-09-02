"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// This would typically come from context or props
const mockBookingData = {
  selectedDate: "Saturday, December 21, 2024",
  selectedPackage: {
    name: "Premium Package",
    price: 899,
    duration: "6 hours",
  },
  addOns: [
    { name: "Extended hours (+2 hours)", price: 200, selected: false },
    { name: "Additional backdrop", price: 150, selected: false },
    { name: "Travel fee (outside 25 miles)", price: 100, selected: false },
    { name: "Rush delivery (next day)", price: 75, selected: false },
  ],
}

export function BookingSummary() {
  const selectedAddOns = mockBookingData.addOns.filter((addon) => addon.selected)
  const addOnTotal = selectedAddOns.reduce((sum, addon) => sum + addon.price, 0)
  const subtotal = mockBookingData.selectedPackage.price + addOnTotal
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Selected Date */}
          <div className="space-y-2">
            <h4 className="font-heading font-semibold text-sm">Event Date</h4>
            <p className="text-sm text-muted-foreground">{mockBookingData.selectedDate}</p>
          </div>

          <Separator />

          {/* Selected Package */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-heading font-semibold text-sm">Package</h4>
              <Badge variant="secondary">Popular</Badge>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{mockBookingData.selectedPackage.name}</p>
                <p className="text-sm text-muted-foreground">{mockBookingData.selectedPackage.duration}</p>
              </div>
              <p className="font-semibold">${mockBookingData.selectedPackage.price}</p>
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
              <span className="text-lg">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Deposit Info */}
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              A 50% deposit (${(total * 0.5).toFixed(2)}) is required to secure your booking. The remaining balance is
              due 7 days before your event.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-center space-y-2">
          <p className="text-sm font-medium">Need assistance?</p>
          <p className="text-xs text-muted-foreground">Our team is here to help</p>
          <p className="text-sm font-semibold">(555) 123-4567</p>
        </CardContent>
      </Card>
    </div>
  )
}
