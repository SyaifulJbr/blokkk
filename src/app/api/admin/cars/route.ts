import { NextResponse } from 'next/server'
import { prisma } from '@/lib/auth'

export async function GET(req: Request) {
  try {
    const cars = await prisma.car.findMany()
    return NextResponse.json({ cars })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, capacity, transmission, pricePerDay, imageUrl, description, isAvailable } = body

    if (!name || !imageUrl || !description) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
    }

    const car = await prisma.car.create({
      data: {
        name,
        capacity,
        transmission,
        pricePerDay,
        imageUrl,
        description,
        isAvailable
      }
    })

    return NextResponse.json({ ok: true, car })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
