import '../styles/globals.css'

export const metadata = {
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
        width: 1200,
        height: 630,
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
    <html className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-dark-primary text-primary antialiased">
        {children}
      </body>
    </html>
  )
}
