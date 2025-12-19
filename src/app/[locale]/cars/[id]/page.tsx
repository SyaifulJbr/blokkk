import { notFound } from 'next/navigation'
import { prisma } from '@/lib/auth'

export default async function CarDetailPage({ params }: { params: { id: string, locale: string } }){
  const car = await prisma.car.findUnique({
    where: { id: params.id }
  })

  if (!car || !car.isAvailable) {
    notFound()
  }

  return (
    <div className="min-h-screen section-gradient py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Car Image Section */}
          <div className="fade-in">
            <div className="card-modern overflow-hidden">
              <div className="relative h-96 lg:h-full min-h-[500px]">
                <img 
                  src={car.imageUrl} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <div className="bg-accent-green/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full pulse"></div>
                    <span>Available Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Car Details Section */}
          <div className="space-y-8 fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">{car.name}</h1>
              <p className="text-secondary text-lg leading-relaxed mb-6">{car.description}</p>
              
              <div className="flex items-baseline space-x-2">
                <span className="text-sm text-secondary">Starting from</span>
                <span className="text-4xl font-bold text-gradient">
                  Rp {car.pricePerDay.toLocaleString('id-ID')}
                </span>
                <span className="text-sm text-secondary">/10 hours</span>
              </div>
              
              <div className="mt-4 flex items-center space-x-2">
                <div className="w-5 h-5 bg-accent-green rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-accent-green font-medium">Driver & fuel included</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="card-modern p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary mb-1">Passenger Capacity</p>
                    <p className="text-2xl font-bold text-primary">{car.capacity} People</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-secondary mb-1">Transmission</p>
                    <p className="text-2xl font-bold text-primary">{car.transmission}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="card-modern p-6">
              <h2 className="text-2xl font-bold text-primary mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Professional driver",
                  "Fuel for 10 hours",
                  "Insurance coverage",
                  "Air conditioning",
                  "Clean, well-maintained vehicle",
                  "Flexible route planning"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Buttons */}
            <div className="space-y-4">
              <button className="btn-modern w-full py-4 text-lg font-semibold">
                Book This Car Now
              </button>
              <div className="grid grid-cols-2 gap-4">
                <button className="btn-accent w-full py-3 text-sm font-medium">
                  Save to Wishlist
                </button>
                <button className="card-modern w-full py-3 text-sm font-medium hover:border-accent-green transition-colors">
                  Compare Cars
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="card-modern p-6 bg-gradient-to-r from-accent-green/5 to-accent-yellow/5">
              <h3 className="text-lg font-bold text-primary mb-4">Why Book With Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">Instant Confirmation</p>
                    <p className="text-xs text-secondary">Book now, confirm immediately</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">Best Price Guarantee</p>
                    <p className="text-xs text-secondary">Competitive rates with no hidden fees</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">Trusted Service</p>
                    <p className="text-xs text-secondary">500+ happy customers served</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-accent-yellow/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary">24/7 Support</p>
                    <p className="text-xs text-secondary">Always here to help you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}