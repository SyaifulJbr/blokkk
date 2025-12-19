export default function AboutPage(){
  return (
    <div className="min-h-screen section-gradient py-20">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">About GiorBaliTour</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Your trusted partner for unforgettable Bali experiences with professional car rental services
          </p>
        </div>

        {/* Story Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
              <div className="space-y-4 text-secondary leading-relaxed">
                <p>
                  Founded with a passion for showcasing Bali's beauty, GiorBaliTour has been serving travelers 
                  from around the world with exceptional car rental services. We understand that every journey is unique, 
                  and we're committed to making your Bali experience truly memorable.
                </p>
                <p>
                  Our team consists of experienced local drivers who know Bali's roads, hidden gems, and cultural 
                  landmarks like the back of their hands. We combine local expertise with professional service to 
                  deliver experiences that go beyond ordinary transportation.
                </p>
              </div>
            </div>
            
            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="card-modern p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-green/20 to-accent-yellow/20 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gradient mb-2">500+</div>
                      <p className="text-secondary text-sm">Happy Clients</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gradient mb-2">10+</div>
                      <p className="text-secondary text-sm">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gradient mb-2">50+</div>
                      <p className="text-secondary text-sm">Tourist Destinations</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
                      <p className="text-secondary text-sm">Support Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Why Choose GiorBaliTour?</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              We go beyond just providing transportation – we deliver complete travel experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Professional Drivers",
                description: "Experienced, licensed drivers who double as local guides with deep knowledge of Bali's culture and attractions."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Flexible Duration",
                description: "10-hour packages give you ample time to explore multiple destinations at your own pace without rushing."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "All-Inclusive Pricing",
                description: "Transparent pricing with no hidden fees. Fuel, driver, and insurance are all included in our rates."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: "Premium Fleet",
                description: "Well-maintained, modern vehicles equipped with air conditioning, safety features, and comfortable seating."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: "Personalized Service",
                description: "Customized itineraries based on your preferences, with recommendations for hidden gems and local experiences."
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "24/7 Support",
                description: "Round-the-clock customer support to assist you with any questions or changes to your travel plans."
              }
            ].map((feature, index) => (
              <div key={index} className="card-modern p-6 text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 bg-gradient-to-br from-accent-green to-accent-green-light rounded-2xl flex items-center justify-center mx-auto mb-4 glow-green">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="card-modern p-12 bg-gradient-to-r from-accent-green/5 to-accent-yellow/5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">Our Mission</h2>
                <p className="text-secondary leading-relaxed mb-6">
                  To provide exceptional travel experiences in Bali by combining professional transportation 
                  services with local expertise, ensuring every journey becomes a cherished memory.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-secondary">Safety first with well-maintained vehicles and experienced drivers</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-secondary">Authentic local experiences beyond typical tourist routes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-secondary">Sustainable tourism practices that respect local culture and environment</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-full flex items-center justify-center mx-auto mb-6 glow-yellow">
                  <svg className="w-16 h-16 text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2v2.945m-6 0a2 2 0 104 0 2 2 0 00-4 0z" />
                  </svg>
                </div>
                <p className="text-secondary italic">
                  "We don't just drive you places – we help you discover the heart and soul of Bali"
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Meet Our Team</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Dedicated professionals committed to making your Bali experience unforgettable
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Gior Malik",
                role: "Founder & Lead Driver",
                experience: "15+ years",
                description: "Passionate about sharing Bali's beauty with travelers from around the world."
              },
              {
                name: "Wayan Sudana",
                role: "Senior Driver",
                experience: "10+ years",
                description: "Expert in Bali's roads and hidden gems, fluent in English and Japanese."
              },
              {
                name: "Made Wijaya",
                role: "Operations Manager",
                experience: "8+ years",
                description: "Ensuring smooth operations and exceptional customer service."
              }
            ].map((member, index) => (
              <div key={index} className="card-modern p-6 text-center fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-accent-green to-accent-green-light rounded-full flex items-center justify-center mx-auto mb-4 glow-green">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-accent-green font-medium mb-2">{member.role}</p>
                <p className="text-sm text-secondary mb-3">{member.experience} experience</p>
                <p className="text-secondary leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}