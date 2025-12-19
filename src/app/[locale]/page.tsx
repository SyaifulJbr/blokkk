import { prisma } from '@/lib/auth'
import ReviewForm from '@/components/ui/ReviewForm'

export default async function HomePage(){
  const featuredCars = await prisma.car.findMany({
    where: { isAvailable: true },
    take: 3
  })

  const latestReviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' },
    take: 3
  })

  return (
    <section className="p-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-primary">Welcome to GiorBaliTour</h1>
        <p className="mt-2 text-lg text-gray-600">Professional car rental with driver included — 10 hours package includes fuel and professional driver.</p>
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium text-sm">✅ Driver & Fuel Included</p>
          <p className="text-green-700 text-sm mt-1">Professional Service</p>
        </div>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Featured Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCars.map(car => (
            <div key={car.id} className="border rounded-lg overflow-hidden shadow neon p-4">
              <img src={car.imageUrl} alt={car.name} className="w-full h-40 object-cover rounded mb-3" />
              <h3 className="text-xl font-semibold text-primary">{car.name}</h3>
              <p className="text-sm text-gray-600">{car.description}</p>
              <div className="mt-3 flex justify-between text-sm">
                <span>Capacity: {car.capacity} org</span>
                <span>{car.transmission}</span>
              </div>
              <p className="text-lg font-bold text-primary mt-2">Rp {car.pricePerDay.toLocaleString('id-ID')}/10 hours</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Customer Reviews</h2>
        <div className="space-y-4">
          {latestReviews.map(review => (
            <div key={review.id} className="border-l-4 border-primary p-4 bg-gray-50 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{review.userName}</p>
                  <p className="text-sm text-yellow-500">{'★'.repeat(review.rating)}</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
              <p className="text-xs text-gray-500 mt-2">{new Date(review.createdAt).toLocaleDateString('id-ID')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Leave a Review</h2>
        <ReviewForm />
      </section>
    </section>
  )
}