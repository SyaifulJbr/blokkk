'use client'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LOCALES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
]

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  const getHref = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`
    const segments = pathname.split('/')
    segments[1] = newLocale
    return segments.join('/')
  }

  const currentLocale = LOCALES.find(l => l.code === locale) || LOCALES[0]

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 px-4 py-2 bg-dark-tertiary border border-dark rounded-xl hover:border-accent-green transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-green/20">
        <span className="text-lg">{currentLocale.flag}</span>
        <span className="text-sm font-medium text-secondary group-hover:text-primary transition-colors hidden sm:inline">
          {currentLocale.code.toUpperCase()}
        </span>
        <svg 
          className="w-4 h-4 text-secondary group-hover:text-primary transition-colors transform group-hover:rotate-180 duration-300" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-64 bg-dark-secondary border border-dark rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 max-h-80 overflow-y-auto">
        <div className="p-2">
          {LOCALES.map((loc) => (
            <Link
              key={loc.code}
              href={getHref(loc.code)}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-dark-tertiary transition-colors duration-200 group/item"
            >
              <span className="text-xl">{loc.flag}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary group-hover/item:text-accent-green transition-colors">
                  {loc.name}
                </p>
                <p className="text-xs text-secondary">
                  {loc.code.toUpperCase()}
                </p>
              </div>
              {loc.code === locale && (
                <div className="w-2 h-2 bg-accent-green rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
