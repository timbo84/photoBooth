import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookingCalendar } from "@/components/booking-calendar"
import { ProductDetails } from "@/components/product-details"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Header Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground">Book Your Photo Booth</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Select your preferred date and package to get started. Our team will contact you within 24 hours to
                finalize the details.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Calendar Section */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Select Your Event Date</CardTitle>
                    <p className="text-muted-foreground">
                      Choose an available date for your photo booth rental. Unavailable dates are shown in grey.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <BookingCalendar />
                  </CardContent>
                </Card>
              </div>

              {/* Product Details Sidebar */}
              <div className="space-y-6">
                <ProductDetails />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
