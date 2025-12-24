import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

export default async function CarDetailPage({ params }: { params: { id: string } }){
  const car = await db.car.findUnique({
    where: { id: params.id }
  })

  if (!car || !car.isAvailable) {
    notFound()
  }

  return (
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
                <p className="text-sm text-gray-500">Passenger Capacity</p>
                <p className="text-2xl font-semibold text-primary">{car.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transmission</p>
                <p className="text-2xl font-semibold text-primary">{car.transmission}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price per 10 Hours</p>
                <p className="text-2xl font-semibold text-primary">Rp {car.pricePerDay.toLocaleString('id-ID')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p className="text-2xl font-semibold text-green-600">Available</p>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Book Now
          </button>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">💡 Duration: 10 hours | Includes: Driver & Fuel</p>
          </div>
        </div>
      </div>
    </section>
  )
}
