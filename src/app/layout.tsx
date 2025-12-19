import '../styles/globals.css'

export const metadata = {
  title: 'GiorBaliTour',
  description: 'Rental mobil di Bali - GiorBaliTour'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
