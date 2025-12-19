"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from './LanguageSwitcher'

const translations: { [key: string]: { [key: string]: string } } = {
  en: { Home: 'Home', Cars: 'Cars', About: 'About', Contact: 'Contact' },
  id: { Home: 'Beranda', Cars: 'Mobil', About: 'Tentang', Contact: 'Kontak' },
  zh: { Home: '首页', Cars: '汽车', About: '关于', Contact: '联系' },
  ko: { Home: '홈', Cars: '자동차', About: '정보', Contact: '연락처' },
  ar: { Home: 'الرئيسية', Cars: 'السيارات', About: 'حول', Contact: 'اتصل' },
  tr: { Home: 'Anasayfa', Cars: 'Arabalar', About: 'Hakkında', Contact: 'İletişim' },
  ru: { Home: 'Главная', Cars: 'Машины', About: 'О нас', Contact: 'Контакты' },
  pt: { Home: 'Início', Cars: 'Carros', About: 'Sobre', Contact: 'Contato' }
}

export default function Header(){
  const pathname = usePathname()
  const locale = pathname.split('/')[1] || 'en'
  const t = translations[locale] || translations.en

  return (
    <header className="sticky top-0 z-50 bg-dark-primary/95 backdrop-blur-md border-b border-dark">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="group flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-accent-green to-accent-green-light rounded-lg flex items-center justify-center transform transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform">
              GiorBaliTour
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { key: 'Home', href: `/${locale}` },
                { key: 'Cars', href: `/${locale}/cars` },
                { key: 'About', href: `/${locale}/about` },
                { key: 'Contact', href: `/${locale}/contact` }
              ].map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="relative text-secondary hover:text-primary transition-colors duration-300 group"
                >
                  {t[item.key]}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-green to-accent-yellow transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 text-secondary hover:text-primary transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
