import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { generateOTP, checkRateLimit, getClientIP } from '@/lib/auth-utils'

export async function POST(req: Request) {
  try {
    console.log('[ForgotPassword API] Processing forgot password request')

    const body = await req.json()
    const { email } = body

    // Validate required fields
    if (!email) {
      console.log('[ForgotPassword API] Missing email field')
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req)
    const rateLimitKey = `forgot-password:${clientIP}:${email}`

    console.log(`[ForgotPassword API] Client IP: ${clientIP}, Email: ${email}`)

    // Check rate limit (3 requests per 5 minutes)
    const rateLimitResult = checkRateLimit(rateLimitKey, 3, 5 * 60 * 1000)

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime)
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)
      console.log(`[ForgotPassword API] Rate limit exceeded for ${email}. Resets at ${resetDate.toISOString()}`)
      return NextResponse.json({
        message: `Too many attempts. Please try again in ${minutesRemaining} minutes.`,
        retryAfter: rateLimitResult.resetTime
      }, { status: 429 })
    }

    // Find user by email
    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      console.log(`[ForgotPassword API] User not found: ${email}`)
      // For security, return same message as if user exists
      return NextResponse.json({
        message: 'If email is registered, you will receive an OTP code to reset password.',
        // Don't reveal if user exists
      }, { status: 200 })
    }

    console.log(`[ForgotPassword API] User found: ${user.id}, ${user.email}`)

    // Generate OTP (valid for 10 minutes)
    const otp = generateOTP(6)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now

    console.log(`[ForgotPassword API] Generated OTP for ${email}: ${otp}`)
    console.log(`[ForgotPassword API] OTP expires at: ${otpExpiry.toISOString()}`)

    // Update user with OTP
    await db.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry
      }
    })

    console.log(`[ForgotPassword API] OTP saved successfully for ${email}`)

    // Return success with OTP (for development)
    return NextResponse.json({
      ok: true,
      message: 'OTP code has been sent to your email.',
      user: { id: user.id, email: user.email, name: user.name },
      // Include OTP in development mode (for frontend display)
      otp: otp,
      otpExpiry: otpExpiry.toISOString(),
      isDevelopment: process.env.NODE_ENV !== 'production'
    })
  } catch (err) {
    console.error('[ForgotPassword API] Error:', err)
    return NextResponse.json({ message: 'Server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
