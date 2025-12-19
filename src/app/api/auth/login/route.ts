import { NextResponse } from 'next/server'
import { prisma, verifyPassword } from '@/lib/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body
    if (!email || !password) return NextResponse.json({ message: 'Missing credentials' }, { status: 400 })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })

    const ok = await verifyPassword(password, user.password)
    if (!ok) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
  } catch (err) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
