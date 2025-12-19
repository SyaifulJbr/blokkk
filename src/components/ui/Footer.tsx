'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer(){
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'

  return (
    <footer className="bg-dark-secondary border-t border-dark mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-accent-green-light rounded-xl flex items-center justify-center glow-green">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-2xl font-bold text-gradient">GiorBaliTour</span>
            </div>
            <p className="text-secondary leading-relaxed">
              Trusted car rental in Bali with professional service and unforgettable experiences.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-green to-accent-green-light rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                <span className="text-white text-sm font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-accent-yellow to-accent-yellow-light rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                <span className="text-dark-primary text-sm font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-gradient-to-br from-accent-green to-accent-green-light rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform cursor-pointer">
                <span className="text-white text-sm font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Contact</h3>
            <div className="space-y-3">
              <a 
                href="mailto:giorginomalik@gmail.com" 
                className="flex items-center space-x-3 text-secondary hover:text-accent-green transition-colors group"
              >
                <div className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>giorginomalik@gmail.com</span>
              </a>
              
              <a 
                href="https://wa.me/6285854965523" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-3 text-secondary hover:text-accent-green transition-colors group"
              >
                <div className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center group-hover:bg-accent-green/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+62 858 5496 5523</span>
              </a>
              
              <a 
                href="https://instagram.com/gior.malik" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-3 text-secondary hover:text-accent-yellow transition-colors group"
              >
                <div className="w-10 h-10 bg-dark-tertiary rounded-lg flex items-center justify-center group-hover:bg-accent-yellow/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>@gior.malik</span>
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: 'Home', href: `/${locale}` },
                { name: 'Cars', href: `/${locale}/cars` },
                { name: 'About', href: `/${locale}/about` },
                { name: 'Contact', href: `/${locale}/contact` }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary hover:text-accent-green transition-colors duration-300 py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-4">
              <div className="p-4 bg-dark-tertiary rounded-xl border border-dark">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-2 h-2 bg-accent-green rounded-full pulse"></div>
                  <span className="text-sm font-semibold text-accent-green">Available 24/7</span>
                </div>
                <p className="text-xs text-secondary">
                  We're always here to help with your Bali travel needs
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary text-sm">
              © {new Date().getFullYear()} GiorBaliTour. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#" className="text-secondary hover:text-accent-green transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-secondary hover:text-accent-green transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
