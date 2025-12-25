import { notFound } from 'next/navigation'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import { AuthProvider } from '@/contexts/AuthContext'

const locales = ['en', 'id', 'zh', 'ko', 'ar', 'tr', 'ru', 'pt']

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params
  
  if (!locales.includes(locale as any)) {
    notFound()
  }

  unstable_setRequestLocale(locale)
  const messages = await getMessages()
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </NextIntlClientProvider>
  )
}
