import Link from 'next/link'
import { db } from '@/lib/db'

export default async function CarsPage(){
  const cars = await db.car.findMany({
    where: { isAvailable: true }
  })

  return (
    <section className="p-8">
      <h1 className="text-4xl font-bold text-primary mb-8">Our Cars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map(car => (
          <Link key={car.id} href={`/cars/${car.id}`}>
            <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg neon cursor-pointer transform transition hover:scale-105">
              <img src={car.imageUrl} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-primary mb-2">{car.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{car.description}</p>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <p className="text-gray-500">Capacity</p>
                    <p className="font-semibold">{car.capacity} passengers</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Transmission</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                </div>
                <p className="text-lg font-bold text-primary">Rp {car.pricePerDay.toLocaleString('id-ID')}/10 hours</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {cars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No cars available at the moment.</p>
        </div>
      )}
    </section>
  )
}
