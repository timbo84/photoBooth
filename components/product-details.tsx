"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

const packages = [
  {
    id: "essential",
    name: "Essential Package",
    price: 599,
    duration: "4 hours",
    features: [
      "Professional photo booth setup",
      "Unlimited photos during event",
      "Instant printing (4x6 prints)",
      "Digital gallery access",
      "Basic props included",
      "Professional attendant",
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 899,
    duration: "6 hours",
    features: [
      "Everything in Essential",
      "Custom backdrop design",
      "Premium prop collection",
      "Social media integration",
      "Custom photo templates",
      "USB drive with all photos",
      "Setup and breakdown included",
    ],
    popular: true,
  },
  {
    id: "luxury",
    name: "Luxury Package",
    price: 1299,
    duration: "8 hours",
    features: [
      "Everything in Premium",
      "Red carpet entrance",
      "Professional lighting setup",
      "Video messaging feature",
      "Custom branding throughout",
      "Same-day photo delivery",
      "Dedicated event coordinator",
    ],
    popular: false,
  },
]

export function ProductDetails() {
  const [selectedPackage, setSelectedPackage] = useState("premium")

  const currentPackage = packages.find((pkg) => pkg.id === selectedPackage)

  return (
    <div className="space-y-6">
      {/* Package Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Choose Your Package</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedPackage === pkg.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">Most Popular</Badge>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-heading font-semibold text-lg">{pkg.name}</h4>
                  <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                </div>
                <div className="text-right">
                  <div className="font-heading font-bold text-2xl">${pkg.price}</div>
                  <div className="text-sm text-muted-foreground">starting price</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Selected Package Details */}
      {currentPackage && (
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-xl flex items-center justify-between">
              {currentPackage.name}
              {currentPackage.popular && <Badge variant="secondary">Popular Choice</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-semibold">{currentPackage.duration}</span>
            </div>

            <Separator />

            <div className="space-y-3">
              <h5 className="font-heading font-semibold">What's Included:</h5>
              <ul className="space-y-2">
                {currentPackage.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <svg
                      className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="font-heading font-semibold">Total:</span>
                <span className="font-heading font-bold text-2xl">${currentPackage.price}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Final pricing may vary based on location, date, and additional services. A consultation will be
                scheduled to finalize details.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Services */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-lg">Add-On Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span>Extended hours (+2 hours)</span>
            <span className="font-semibold">+$200</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Additional backdrop</span>
            <span className="font-semibold">+$150</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Travel fee (outside 25 miles)</span>
            <span className="font-semibold">+$100</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Rush delivery (next day)</span>
            <span className="font-semibold">+$75</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="bg-muted/50">
        <CardContent className="p-4 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Questions about packages?</p>
          <Button variant="outline" size="sm">
            Call (555) 123-4567
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
