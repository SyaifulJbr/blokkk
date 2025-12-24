import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = searchParams.get('limit')
    
    const reviews = await db.review.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit) : undefined
    })

    return NextResponse.json(reviews)
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userName, comment, rating } = body

    if (!comment || !rating) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const review = await db.review.create({
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
