import { notFound } from 'next/navigation'

// Server component untuk proteksi admin
export default async function TanianLayout({ children }: { children: React.ReactNode }){
  // TODO: Integrate getServerSession for real session check
  // Untuk saat ini, hanya menampilkan warning
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
