import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { BookingForm } from "@/components/booking-form"
import { BookingSummary } from "@/components/booking-summary"

export default function BookingDetailsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-16">
        {/* Header Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground">Event Details</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Please provide your event details so we can create the perfect photo booth experience for you.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2">
                <BookingForm />
              </div>

              {/* Booking Summary Sidebar */}
              <div>
                <BookingSummary />
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
