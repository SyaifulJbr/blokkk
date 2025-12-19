import { notFound } from 'next/navigation'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import '../../styles/globals.css'

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
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className="dark">
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-dark-primary text-primary antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
