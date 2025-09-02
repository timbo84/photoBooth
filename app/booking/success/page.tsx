import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { payment_intent?: string }
}) {
  const paymentIntentId = searchParams.payment_intent

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Success Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground">Booking Confirmed!</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Thank you for choosing Elite Photo Booth! Your deposit has been processed and your booking is
                  confirmed.
                </p>
              </div>

              {/* Confirmation Details */}
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Confirmation Email</h4>
                        <p className="text-sm text-muted-foreground">
                          You'll receive a detailed confirmation email within the next few minutes with your booking
                          details and receipt.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Team Contact</h4>
                        <p className="text-sm text-muted-foreground">
                          Our event coordinator will contact you within 24 hours to finalize details and answer any
                          questions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Final Payment</h4>
                        <p className="text-sm text-muted-foreground">
                          The remaining balance of $449.50 is due 7 days before your event date.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details */}
              {paymentIntentId && (
                <Card className="max-w-2xl mx-auto bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Payment ID:</span>
                      <span className="font-mono text-xs">{paymentIntentId}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/">Return Home</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

              {/* Support Info */}
              <div className="bg-muted/50 p-6 rounded-lg max-w-2xl mx-auto">
                <h4 className="font-heading font-semibold mb-2">Need Assistance?</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Our team is here to help with any questions about your booking.
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">(555) 123-4567</p>
                  <p className="text-sm text-muted-foreground">info@elitephotobooth.com</p>
                  <p className="text-xs text-muted-foreground">Available 7 days a week, 9 AM - 8 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
