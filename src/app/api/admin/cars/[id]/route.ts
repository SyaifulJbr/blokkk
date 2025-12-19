import { NextResponse } from 'next/server'
import { prisma } from '@/lib/auth'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const { name, capacity, transmission, pricePerDay, imageUrl, description, isAvailable } = body

    const car = await prisma.car.update({
      where: { id: params.id },
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

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.car.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
