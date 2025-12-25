import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GiorBaliTour',
  description: 'Professional car rental in Bali with driver included - 10 hours package with fuel and professional driver',
  metadataBase: new URL('https://giorbalitour.com'),
  openGraph: {
    title: 'GiorBaliTour - Professional Car Rental in Bali',
    description: 'Explore Bali with our premium car rental service. Professional drivers, fuel included, 10-hour packages.',
    url: 'https://giorbalitour.com',
    siteName: 'GiorBaliTour',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1344,
        height: 768,
        alt: 'GiorBaliTour - Professional Car Rental in Bali',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GiorBaliTour - Professional Car Rental in Bali',
    description: 'Explore Bali with our premium car rental service. Professional drivers, fuel included, 10-hour packages.',
    images: ['/images/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-dark-primary text-primary antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}