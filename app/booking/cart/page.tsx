import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CartSummary } from "@/components/cart-summary"
import { CartActions } from "@/components/cart-actions"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Header Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground">Review Your Booking</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Please review your booking details below. You can schedule a consultation or proceed directly to
                payment.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Summary */}
              <div className="lg:col-span-2">
                <CartSummary />
              </div>

              {/* Cart Actions */}
              <div>
                <CartActions />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
