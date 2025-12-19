import { notFound } from 'next/navigation'

export default async function TanianLayout({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
