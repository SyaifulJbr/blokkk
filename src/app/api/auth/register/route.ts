import { NextResponse } from 'next/server'
import { prisma, hashPassword } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER'
      }
    })

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
