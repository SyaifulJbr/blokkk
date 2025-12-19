import { prisma } from '@/lib/auth'
import ReviewForm from '@/components/ui/ReviewForm'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function HomePage({ params }: { params: { locale: string } }){
  const t = await getTranslations({ locale: params.locale })
  const featuredCars = await prisma.car.findMany({
    where: { isAvailable: true },
    take: 3
  })

  const latestReviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent-green/10 to-accent-yellow/10"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center fade-in">
              <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6 leading-tight">
              {t('Welcome')}
              <br />
              <span>GiorBaliTour</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary mb-8 leading-relaxed">
              {t('ProfessionalDescription')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="card-modern p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-green to-accent-green-light rounded-2xl flex items-center justify-center mx-auto mb-4 glow-green">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Driver & Fuel Included</h3>
                <p className="text-secondary text-sm">Professional driver and premium fuel included in every package</p>
              </div>
              
              <div className="card-modern p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-2xl flex items-center justify-center mx-auto mb-4 glow-yellow">
                  <svg className="w-8 h-8 text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">10 Hours Duration</h3>
                <p className="text-secondary text-sm">Full day service to explore Bali at your own pace</p>
              </div>
              
              <div className="card-modern p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-accent-green to-accent-green-light rounded-2xl flex items-center justify-center mx-auto mb-4 glow-green">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">Professional Service</h3>
                <p className="text-secondary text-sm">Experienced drivers and well-maintained vehicles</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${params.locale}/cars`} className="btn-modern px-8 py-4 text-lg">
                Explore Our Fleet
              </Link>
              <Link href={`/${params.locale}/contact`} className="btn-accent px-8 py-4 text-lg">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="section-gradient py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">{t('FeaturedCars')}</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              {t('ChooseFromPremium')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars.map((car, index) => (
              <Link key={car.id} href={`/${params.locale}/cars/${car.id}`} className="group">
                <div className="card-modern overflow-hidden fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <img 
                      src={car.imageUrl} 
                      alt={car.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-accent-green/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        Available
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-accent-green transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-secondary mb-4 line-clamp-2">{car.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-dark-tertiary rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-secondary">Capacity</p>
                          <p className="text-sm font-semibold text-primary">{car.capacity} people</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-dark-tertiary rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-accent-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-secondary">Transmission</p>
                          <p className="text-sm font-semibold text-primary">{car.transmission}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-secondary">Price per 10 hours</p>
                        <p className="text-2xl font-bold text-gradient">Rp {car.pricePerDay.toLocaleString('id-ID')}</p>
                      </div>
                      <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-green-light rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">{t('CustomerReviews')}</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              {t('SeeWhatCustomers')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {latestReviews.map((review, index) => (
              <div key={review.id} className="card-modern p-6 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green-light rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {review.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{review.userName}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-sm ${
                              i < review.rating 
                                ? 'text-accent-yellow drop-shadow-glow' 
                                : 'text-muted'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-secondary mb-4 line-clamp-3">"{review.comment}"</p>
                
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>{new Date(review.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="section-gradient py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">{t('LeaveReview')}</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              {t('YourReviewHelps')}
            </p>
          </div>
          
          <ReviewForm />
        </div>
      </section>
    </div>
  )
}