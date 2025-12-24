import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  try {
    // Clear existing data
    await prisma.review.deleteMany({})
    await prisma.car.deleteMany({})
    await prisma.user.deleteMany({})

    console.log('Cleared existing data')

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await prisma.user.create({
      data: {
        email: 'admin@giorbalitour.com',
        name: 'Admin',
        password: adminPassword,
        role: 'ADMIN'
      }
    })
    console.log('Created admin user:', admin.email)

    const cars = [
      { name: 'All New Avanza', capacity: 6, transmission: 'MANUAL', pricePerDay: 550000, imageUrl: 'https://www.giorbalitour.com/images/cars/all-new-avanza.png', description: 'Mobil keluarga yang nyaman dan irit untuk perjalanan di Bali.' },
      { name: 'Avanza', capacity: 6, transmission: 'MANUAL', pricePerDay: 500000, imageUrl: 'https://www.giorbalitour.com/images/cars/avanza.png', description: 'Pilihan ekonomis untuk perjalanan Anda.' },
      { name: 'Hiace Commuter', capacity: 12, transmission: 'MANUAL', pricePerDay: 900000, imageUrl: 'https://www.giorbalitour.com/images/cars/hiace-commuter.png', description: 'Sempurna untuk rombongan besar.' },
      { name: 'Hiace Premio', capacity: 12, transmission: 'AUTOMATIC', pricePerDay: 1100000, imageUrl: 'https://www.giorbalitour.com/images/cars/hiace-premio.png', description: 'Versi premium dari Hiace.' },
      { name: 'Innova Reborn', capacity: 7, transmission: 'AUTOMATIC', pricePerDay: 750000, imageUrl: 'https://www.giorbalitour.com/images/cars/innova-reborn.webp', description: 'Mobil MPV medium yang elegan.' },
      { name: 'Toyota Alphard', capacity: 7, transmission: 'AUTOMATIC', pricePerDay: 1500000, imageUrl: 'https://www.giorbalitour.com/images/cars/toyota-alphard.png.webp', description: 'Luxury class, pengalaman premium.' },
      { name: 'Toyota Vellfire', capacity: 7, transmission: 'AUTOMATIC', pricePerDay: 1500000, imageUrl: 'https://www.giorbalitour.com/images/cars/toyota-vellfire.png', description: 'Kemewahan dan gaya dalam satu paket.' },
      { name: 'Xpander', capacity: 7, transmission: 'MANUAL', pricePerDay: 600000, imageUrl: 'https://www.giorbalitour.com/images/cars/xpander.png', description: 'Mobil modern dan tangguh.' }
    ]

    const createdCars = await prisma.car.createMany({ data: cars })
    console.log('Created cars:', createdCars.count)

    const reviews = [
      { userName: 'Budi Santoso', comment: 'Layanan sangat memuaskan! Driver ramah dan mobil nyaman.', rating: 5 },
      { userName: 'Sarah Johnson', comment: 'Excellent service! The car was clean and the driver was very professional.', rating: 5 },
      { userName: 'Ahmad Fauzi', comment: 'Sangat puas dengan layanan GiorBaliTour. Recommended!', rating: 4 },
      { userName: 'Michael Chen', comment: 'Great experience in Bali. The driver knows all the best spots.', rating: 5 },
      { userName: 'Dewi Lestari', comment: 'Mobilnya bersih dan driver sangat helpful. Terima kasih!', rating: 4 },
      { userName: 'Robert Wilson', comment: 'Professional service and reasonable prices. Will use again.', rating: 4 },
      { userName: 'Putu Indah', comment: 'Sangat membantu liburan keluarga kami. Driver sabar dan ramah.', rating: 5 },
      { userName: 'James Taylor', comment: 'Good communication and comfortable vehicles. Highly recommended.', rating: 4 },
      { userName: 'Maya Sari', comment: 'Pelayanan terbaik! Driver tepat waktu dan mobil terawat.', rating: 5 },
      { userName: 'David Brown', comment: 'Excellent tour service. Made our Bali trip memorable.', rating: 5 }
    ]

    for (const review of reviews) {
      await prisma.review.create({ data: review })
    }
    console.log('Created reviews:', reviews.length)

    console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()