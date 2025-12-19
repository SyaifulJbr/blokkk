import { notFound } from 'next/navigation'
import { prisma } from '@/lib/auth'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'
import '@/styles/globals.css'

export default async function CarDetailPage({ params }: { params: { id: string } }){
  const car = await prisma.car.findUnique({
    where: { id: params.id }
  })

  if (!car || !car.isAvailable) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img src={car.imageUrl} alt={car.name} className="w-full rounded-lg shadow neon" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-primary mb-4">{car.name}</h1>
              <p className="text-gray-600 mb-6">{car.description}</p>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Kapasitas Penumpang</p>
                    <p className="text-2xl font-semibold text-primary">{car.capacity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Transmisi</p>
                    <p className="text-2xl font-semibold text-primary">{car.transmission}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Harga per 10 Jam</p>
                    <p className="text-2xl font-semibold text-primary">Rp {car.pricePerDay.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ketersediaan</p>
                    <p className="text-2xl font-semibold text-green-600">Tersedia</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Pesan Sekarang
              </button>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">💡 Durasi: 10 jam | Sudah termasuk: Sopir & Bensin</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
