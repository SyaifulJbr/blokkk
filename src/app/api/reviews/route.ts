import { NextResponse } from 'next/server'
import { prisma } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userName, comment, rating } = body

    if (!comment || !rating) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const review = await prisma.review.create({
      data: {
        userName: userName || 'Anonymous',
        comment,
        rating,
        userId: null
      }
    })

    return NextResponse.json({ ok: true, review })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
