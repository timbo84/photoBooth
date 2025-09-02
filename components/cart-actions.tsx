"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export function CartActions() {
  const router = useRouter()
  const [isSchedulingConsultation, setIsSchedulingConsultation] = useState(false)

  const handleScheduleConsultation = async () => {
    setIsSchedulingConsultation(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, this would schedule the consultation
    alert("Consultation scheduled! We'll contact you within 24 hours to finalize details.")
    setIsSchedulingConsultation(false)
  }

  const handleProceedToPayment = () => {
    router.push("/booking/payment")
  }

  return (
    <div className="space-y-6">
      {/* Payment Options */}
      <Card className="sticky top-24">
        <CardHeader>
          <CardTitle className="font-heading text-xl">Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-semibold">Schedule Consultation</h4>
                <Badge variant="outline">Recommended</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Speak with our team to customize your package and finalize all details before payment.
              </p>
              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={handleScheduleConsultation}
                disabled={isSchedulingConsultation}
              >
                {isSchedulingConsultation ? "Scheduling..." : "Schedule Free Consultation"}
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">or</div>

            <div className="p-4 border rounded-lg space-y-3">
              <h4 className="font-heading font-semibold">Pay Deposit Now</h4>
              <p className="text-sm text-muted-foreground">
                Secure your booking immediately with a 50% deposit. Final details can be adjusted later.
              </p>
              <Button className="w-full" onClick={handleProceedToPayment}>
                Pay Deposit ($449.50)
              </Button>
            </div>
          </div>

          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Flexible booking:</strong> You can modify your package details up to 14 days before your event.
              Deposits are fully refundable up to 30 days before your event date.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Support */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 text-center space-y-2">
          <p className="text-sm font-medium">Questions about your booking?</p>
          <p className="text-xs text-muted-foreground">Our team is available 7 days a week</p>
          <div className="space-y-1">
            <p className="text-sm font-semibold">(555) 123-4567</p>
            <p className="text-xs text-muted-foreground">info@elitephotobooth.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
