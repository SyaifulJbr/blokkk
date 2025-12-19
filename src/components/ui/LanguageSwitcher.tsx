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
    <div className="relative inline-block">
      <select
        onChange={(e) => {
          window.location.href = getHref(e.target.value)
        }}
        value={locale}
        className="px-3 py-2 rounded bg-white border border-gray-300 text-sm cursor-pointer hover:border-primary appearance-none pr-8"
      >
        {LOCALES.map(loc => (
          <option key={loc.code} value={loc.code}>
            {loc.flag} {loc.name}
          </option>
        ))}
      </select>
      <span className="absolute right-2 top-2 pointer-events-none text-gray-600">▼</span>
    </div>
  )
}
