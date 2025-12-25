import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { validatePassword, checkRateLimit, getClientIP } from '@/lib/auth-utils'

export async function POST(req: Request) {
  try {
    console.log('[ResetPassword API] Processing reset password request')

    const body = await req.json()
    const { email, otp, newPassword } = body

    // Validate required fields
    if (!email || !otp || !newPassword) {
      console.log('[ResetPassword API] Missing required fields')
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req)
    const rateLimitKey = `reset-password:${clientIP}:${email}`

    console.log(`[ResetPassword API] Client IP: ${clientIP}, Email: ${email}`)

    // Check rate limit (3 requests per 5 minutes)
    const rateLimitResult = checkRateLimit(rateLimitKey, 3, 5 * 60 * 1000)

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime)
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)
      console.log(`[ResetPassword API] Rate limit exceeded for ${email}. Resets at ${resetDate.toISOString()}`)
      return NextResponse.json({
        message: `Too many attempts. Please try again in ${minutesRemaining} minutes.`,
        retryAfter: rateLimitResult.resetTime
      }, { status: 429 })
    }

    // Find user by email
    const user = await db.user.findUnique({ where: { email } })

    if (!user) {
      console.log(`[ResetPassword API] User not found: ${email}`)
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    console.log(`[ResetPassword API] User found: ${user.id}, ${user.email}`)
    console.log(`[ResetPassword API] Provided OTP: ${otp}`)
    console.log(`[ResetPassword API] Stored OTP: ${user.otp}`)
    console.log(`[ResetPassword API] OTP Expiry: ${user.otpExpiry?.toISOString()}`)

    // Check if OTP exists
    if (!user.otp || !user.otpExpiry) {
      console.log(`[ResetPassword API] No OTP found for user: ${email}`)
      return NextResponse.json({ message: 'NoOTPFound' }, { status: 400 })
    }

    // Check if OTP is expired
    if (new Date() > user.otpExpiry) {
      console.log(`[ResetPassword API] OTP expired for user: ${email}`)
      return NextResponse.json({ message: 'OTPExpired' }, { status: 400 })
    }

    // Verify OTP
    if (user.otp !== otp) {
      console.log(`[ResetPassword API] Invalid OTP for user: ${email}`)
      return NextResponse.json({ message: 'OTPInvalid' }, { status: 400 })
    }

    // Password policy validation (minimum 8 characters)
    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      console.log(`[ResetPassword API] Password validation failed: ${passwordValidation.errors.join(', ')}`)
      return NextResponse.json({
        message: passwordValidation.errors[0],
        validation: passwordValidation
      }, { status: 400 })
    }

    console.log(`[ResetPassword API] Password validation passed for ${email}`)

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    console.log(`[ResetPassword API] Password hashed successfully for ${email}`)

    // Update user with new password and clear OTP
    const updatedUser = await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        otp: null,
        otpExpiry: null,
        // Reset failed attempts
        failedAttempts: 0,
        lockUntil: null
      }
    })

    console.log(`[ResetPassword API] Password updated successfully for ${updatedUser.id}, ${updatedUser.email}`)

    return NextResponse.json({
      ok: true,
      message: 'Password berhasil diubah. Silakan login dengan password baru.',
      user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name }
    })
  } catch (err) {
    console.error('[ResetPassword API] Error:', err)
    return NextResponse.json({ message: 'Server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
