export default function ContactPage(){
  return (
    <div className="min-h-screen section-gradient py-20">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-6">Get in Touch</h1>
          <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
            Have questions about our services? Want to book your Bali adventure? 
            We're here to help you plan the perfect trip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
              <p className="text-secondary mb-8">
                Reach out to us through any of the following channels. We typically respond within 24 hours.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="card-modern p-6 group hover:border-accent-green transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green-light rounded-xl flex items-center justify-center flex-shrink-0 glow-green">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2">Email</h3>
                    <a 
                      href="mailto:giorginomalik@gmail.com" 
                      className="text-secondary hover:text-accent-green transition-colors duration-300"
                    >
                      giorginomalik@gmail.com
                    </a>
                    <p className="text-sm text-secondary mt-1">Best for detailed inquiries</p>
                  </div>
                </div>
              </div>

              <div className="card-modern p-6 group hover:border-accent-green transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green-light rounded-xl flex items-center justify-center flex-shrink-0 glow-green">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2">WhatsApp</h3>
                    <a 
                      href="https://wa.me/6285854965523" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-secondary hover:text-accent-green transition-colors duration-300"
                    >
                      +62 858 5496 5523
                    </a>
                    <p className="text-sm text-secondary mt-1">Fastest response time</p>
                  </div>
                </div>
              </div>

              <div className="card-modern p-6 group hover:border-accent-yellow transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-xl flex items-center justify-center flex-shrink-0 glow-yellow">
                    <svg className="w-6 h-6 text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-primary mb-2">Instagram</h3>
                    <a 
                      href="https://instagram.com/gior.malik" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-secondary hover:text-accent-yellow transition-colors duration-300"
                    >
                      @gior.malik
                    </a>
                    <p className="text-sm text-secondary mt-1">Follow for Bali travel tips</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="card-modern p-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Business Hours</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Monday - Friday</span>
                  <span className="text-accent-green font-medium">08:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Saturday</span>
                  <span className="text-accent-green font-medium">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary">Sunday</span>
                  <span className="text-accent-green font-medium">09:00 - 17:00</span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-accent-green/10 rounded-lg">
                <p className="text-sm text-accent-green font-medium flex items-center">
                  <div className="w-2 h-2 bg-accent-green rounded-full mr-2 pulse"></div>
                  Available 24/7 for emergencies
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="card-modern p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              <p className="text-secondary mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="input-modern w-full"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="input-modern w-full"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Email</label>
                  <input 
                    type="email" 
                    className="input-modern w-full"
                    placeholder="john.doe@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Phone (Optional)</label>
                  <input 
                    type="tel" 
                    className="input-modern w-full"
                    placeholder="+62 812-3456-7890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Subject</label>
                  <select className="input-modern w-full">
                    <option>Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Booking Request</option>
                    <option>Custom Tour</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">Message</label>
                  <textarea 
                    className="input-modern w-full h-32 resize-none"
                    placeholder="Tell us about your Bali travel plans or questions..."
                  ></textarea>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newsletter" className="w-4 h-4 text-accent-green rounded focus:ring-accent-green/20" />
                  <label htmlFor="newsletter" className="text-sm text-secondary">
                    I'd like to receive travel tips and special offers
                  </label>
                </div>

                <button type="submit" className="btn-modern w-full py-4 text-lg">
                  Send Message
                </button>
              </form>
            </div>

            {/* Quick Info */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card-modern p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green-light rounded-xl flex items-center justify-center mx-auto mb-3 glow-green">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-primary">Quick Response</p>
                <p className="text-xs text-secondary">Usually within 2 hours</p>
              </div>
              
              <div className="card-modern p-4 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-xl flex items-center justify-center mx-auto mb-3 glow-yellow">
                  <svg className="w-6 h-6 text-dark-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-primary">Free Consultation</p>
                <p className="text-xs text-secondary">No obligation quotes</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Frequently Asked Questions</h2>
            <p className="text-secondary text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 2-3 days in advance, especially during peak season. However, we can often accommodate same-day requests depending on availability."
              },
              {
                question: "What's included in the price?",
                answer: "Our prices include the vehicle, professional driver, fuel for 10 hours, and insurance. No hidden fees or extra charges."
              },
              {
                question: "Can you create custom itineraries?",
                answer: "Absolutely! Our experienced drivers can suggest and create custom itineraries based on your interests and time constraints."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept cash, bank transfer, and major credit cards. Payment can be made on the day of service or in advance."
              },
              {
                question: "Do you provide child seats?",
                answer: "Yes, we can provide child seats upon request. Please let us know the age and weight of your child when booking."
              },
              {
                question: "What if I need to extend beyond 10 hours?",
                answer: "Extensions are possible based on driver availability. Additional hours are charged at our standard hourly rate."
              }
            ].map((faq, index) => (
              <div key={index} className="card-modern p-6">
                <h3 className="text-lg font-semibold text-primary mb-3">{faq.question}</h3>
                <p className="text-secondary leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}