"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

interface BookingFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Event Information
  eventType: string
  eventDate: string
  eventTime: string
  guestCount: string

  // Venue Information
  venueName: string
  venueAddress: string
  venueCity: string
  venueState: string
  venueZip: string

  // Additional Details
  specialRequests: string
  hearAboutUs: string

  // Add-ons
  extendedHours: boolean
  additionalBackdrop: boolean
  travelFee: boolean
  rushDelivery: boolean
}

export function BookingForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    venueName: "",
    venueAddress: "",
    venueCity: "",
    venueState: "",
    venueZip: "",
    specialRequests: "",
    hearAboutUs: "",
    extendedHours: false,
    additionalBackdrop: false,
    travelFee: false,
    rushDelivery: false,
  })

  const handleInputChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in localStorage for the cart
    localStorage.setItem("bookingFormData", JSON.stringify(formData))
    // Navigate to cart/checkout
    router.push("/booking/cart")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type *</Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange("eventType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="birthday">Birthday Party</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="holiday">Holiday Party</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="guestCount">Expected Guest Count *</Label>
              <Select value={formData.guestCount} onValueChange={(value) => handleInputChange("guestCount", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select guest count" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-25">1-25 guests</SelectItem>
                  <SelectItem value="26-50">26-50 guests</SelectItem>
                  <SelectItem value="51-100">51-100 guests</SelectItem>
                  <SelectItem value="101-200">101-200 guests</SelectItem>
                  <SelectItem value="200+">200+ guests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="eventDate">Event Date *</Label>
              <Input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleInputChange("eventDate", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventTime">Event Start Time *</Label>
              <Input
                id="eventTime"
                type="time"
                value={formData.eventTime}
                onChange={(e) => handleInputChange("eventTime", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Venue Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Venue Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="venueName">Venue Name *</Label>
            <Input
              id="venueName"
              value={formData.venueName}
              onChange={(e) => handleInputChange("venueName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="venueAddress">Street Address *</Label>
            <Input
              id="venueAddress"
              value={formData.venueAddress}
              onChange={(e) => handleInputChange("venueAddress", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venueCity">City *</Label>
              <Input
                id="venueCity"
                value={formData.venueCity}
                onChange={(e) => handleInputChange("venueCity", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venueState">State *</Label>
              <Input
                id="venueState"
                value={formData.venueState}
                onChange={(e) => handleInputChange("venueState", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="venueZip">ZIP Code *</Label>
              <Input
                id="venueZip"
                value={formData.venueZip}
                onChange={(e) => handleInputChange("venueZip", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add-On Services */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Add-On Services</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="extendedHours"
                checked={formData.extendedHours}
                onCheckedChange={(checked) => handleInputChange("extendedHours", checked as boolean)}
              />
              <Label htmlFor="extendedHours" className="flex-1 cursor-pointer">
                Extended hours (+2 hours) - $200
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="additionalBackdrop"
                checked={formData.additionalBackdrop}
                onCheckedChange={(checked) => handleInputChange("additionalBackdrop", checked as boolean)}
              />
              <Label htmlFor="additionalBackdrop" className="flex-1 cursor-pointer">
                Additional backdrop - $150
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="travelFee"
                checked={formData.travelFee}
                onCheckedChange={(checked) => handleInputChange("travelFee", checked as boolean)}
              />
              <Label htmlFor="travelFee" className="flex-1 cursor-pointer">
                Travel fee (outside 25 miles) - $100
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rushDelivery"
                checked={formData.rushDelivery}
                onCheckedChange={(checked) => handleInputChange("rushDelivery", checked as boolean)}
              />
              <Label htmlFor="rushDelivery" className="flex-1 cursor-pointer">
                Rush delivery (next day) - $75
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-xl">Additional Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests or Notes</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              placeholder="Any special requirements, themes, or additional information..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hearAboutUs">How did you hear about us?</Label>
            <Select value={formData.hearAboutUs} onValueChange={(value) => handleInputChange("hearAboutUs", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google Search</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Friend/Family Referral</SelectItem>
                <SelectItem value="vendor">Wedding Vendor</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button type="submit" size="lg" className="min-w-[200px]">
          Continue to Cart
        </Button>
      </div>
    </form>
  )
}
