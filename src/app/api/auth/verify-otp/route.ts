import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { checkRateLimit, getClientIP } from '@/lib/auth-utils'

export async function POST(req: Request) {
  try {
    console.log('[VerifyOTP API] Processing OTP verification request')

    const body = await req.json()
    const { email, otp } = body

    // Validate required fields
    if (!email || !otp) {
      console.log('[VerifyOTP API] Missing required fields')
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req)
    const rateLimitKey = `verify-otp:${clientIP}:${email}`

    console.log(`[VerifyOTP API] Client IP: ${clientIP}, Email: ${email}`)

    // Check rate limit (3 requests per 5 minutes)
    const rateLimitResult = checkRateLimit(rateLimitKey, 3, 5 * 60 * 1000)

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime)
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)
      console.log(`[VerifyOTP API] Rate limit exceeded for ${email}. Resets at ${resetDate.toISOString()}`)
      return NextResponse.json({
        message: `Too many attempts. Please try again in ${minutesRemaining} minutes.`,
        retryAfter: rateLimitResult.resetTime
      }, { status: 429 })
    }

    // Find user by email
    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      console.log(`[VerifyOTP API] User not found: ${email}`)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    console.log(`[VerifyOTP API] User found: ${user.id}, ${user.email}`)
    console.log(`[VerifyOTP API] Provided OTP: ${otp}`)
    console.log(`[VerifyOTP API] Stored OTP: ${user.otp}`)
    console.log(`[VerifyOTP API] OTP Expiry: ${user.otpExpiry?.toISOString()}`)
    console.log(`[VerifyOTP API] Is Verified: ${user.isVerified}`)

    // Check if already verified
    if (user.isVerified) {
      console.log(`[VerifyOTP API] User already verified: ${email}`)
      return NextResponse.json({
        ok: true,
        message: 'Email sudah diverifikasi',
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      })
    }

    // Check if OTP exists
    if (!user.otp || !user.otpExpiry) {
      console.log(`[VerifyOTP API] No OTP found for user: ${email}`)
      return NextResponse.json({ message: 'OTP is invalid or has expired' }, { status: 400 })
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      console.log(`[VerifyOTP API] OTP expired for user: ${email}`)
      return NextResponse.json({ message: 'OTP sudah kadaluarsa (3 menit). Silakan daftar ulang.' }, { status: 400 })
    }

    // Verify OTP
    if (user.otp !== otp) {
      console.log(`[VerifyOTP API] Invalid OTP for user: ${email}`)
      return NextResponse.json({ message: 'OTP is invalid' }, { status: 400 })
    }

    // OTP is correct - verify user and clear OTP
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpiry: null,
        failedAttempts: 0,
        lockUntil: null
      }
    })

    console.log(`[VerifyOTP API] User verified successfully: ${updatedUser.id}, ${updatedUser.email}`)

    return NextResponse.json({
      ok: true,
      message: 'Verifikasi berhasil. Anda sekarang dapat login.',
      user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, role: updatedUser.role }
    })
  } catch (err) {
    console.error('[VerifyOTP API] Error:', err)
    return NextResponse.json({ message: 'Server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
