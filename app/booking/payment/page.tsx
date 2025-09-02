import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PaymentForm } from "@/components/payment-form"
import { PaymentSummary } from "@/components/payment-summary"

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Header Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground">Secure Payment</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete your booking with our secure payment system. Your deposit secures your date and package.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <div>
                <PaymentForm />
              </div>

              {/* Payment Summary */}
              <div>
                <PaymentSummary />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
