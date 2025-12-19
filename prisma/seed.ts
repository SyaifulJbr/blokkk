import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
  await prisma.review.deleteMany({})
  await prisma.car.deleteMany({})
  await prisma.user.deleteMany({})

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      email: 'admin@giorbalitour.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

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

  await prisma.car.createMany({ data: cars })

  const reviews = Array.from({ length: 10 }).map((_, i) => ({
    userName: `User${i + 1}`,
    comment: `Ini adalah review contoh nomor ${i + 1}. Layanan cukup baik.`,
    rating: Math.floor(Math.random() * 2) + 4,
  }))

  await Promise.all(reviews.map(r => prisma.review.create({ data: r })))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
