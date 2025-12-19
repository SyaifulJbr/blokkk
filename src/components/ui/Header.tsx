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
    <header className="bg-white shadow p-4 neon">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-primary">GiorBaliTour</Link>
        <div className="flex items-center gap-6">
          <nav className="space-x-4 hidden md:inline-flex">
            <Link href={`/${locale}`}>{t.Home}</Link>
            <Link href={`/${locale}/cars`}>{t.Cars}</Link>
            <Link href={`/${locale}/about`}>{t.About}</Link>
            <Link href={`/${locale}/contact`}>{t.Contact}</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
