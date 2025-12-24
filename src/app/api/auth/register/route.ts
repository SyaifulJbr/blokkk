import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { validatePassword, generateOTP, checkRateLimit, getClientIP } from '@/lib/auth-utils'

// Message codes (t-keys) untuk i18n
const MESSAGE_CODES = {
  EMAIL_ALREADY_REGISTERED: 'EmailAlreadyRegistered',
  REGISTRATION_SUCCESS: 'RegistrationSuccessful',
  REGISTRATION_FAILED: 'RegistrationFailed',
  INVALID_EMAIL: 'InvalidEmail',
  INVALID_NAME: 'InvalidName',
  INVALID_PASSWORD: 'InvalidPassword',
  PASSWORD_TOO_SHORT: 'PasswordTooShort'
}

export async function POST(req: Request) {
  try {
    console.log('[Register API] Processing registration request')

    const body = await req.json()
    const { email, name, password } = body

    // Validate required fields
    if (!email || !name || !password) {
      console.log('[Register API] Missing required fields')
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req)
    const rateLimitKey = `register:${clientIP}:${email}`

    console.log(`[Register API] Client IP: ${clientIP}, Email: ${email}`)

    // Check rate limit (3 requests per 5 minutes)
    const rateLimitResult = checkRateLimit(rateLimitKey, 3, 5 * 60 * 1000)

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime)
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)
      console.log(`[Register API] Rate limit exceeded for ${email}. Resets at ${resetDate.toISOString()}`)
      return NextResponse.json({
        message: `Too many attempts. Please try again in ${minutesRemaining} minutes.`,
        retryAfter: rateLimitResult.resetTime
      }, { status: 429 })
    }

    // Check if email already exists
    const existingUser = await db.user.findUnique({ where: { email } })

    if (existingUser) {
      // Case 1: User sudah verified → block
      if (existingUser.isVerified) {
        console.log(`[Register API] Email already verified: ${email}`)
        return NextResponse.json({ message: MESSAGE_CODES.EMAIL_ALREADY_REGISTERED }, { status: 400 })
      }

      // Case 2: User belum verified → ALLOW re-register with logic
      console.log(`[Register API] Email exists but unverified: ${email}`)

      const now = new Date()
      let finalOTP: string
      let finalOTPExpiry: Date
      let message: string

      // Sub-case 2a: OTP masih valid (belum 3 menit) → PAKAI OTP YANG SAMA
      if (existingUser.otpExpiry && existingUser.otpExpiry > now) {
        finalOTP = existingUser.otp
        finalOTPExpiry = existingUser.otpExpiry
        message = 'Silakan verifikasi email Anda dengan OTP yang telah dikirim.'

        console.log(`[Register API] Using existing OTP: ${finalOTP}, expires at: ${finalOTPExpiry}`)
      }
      // Sub-case 2b: OTP sudah expired (> 3 menit) → GENERATE OTP BARU
      else {
        finalOTP = generateOTP(6)
        finalOTPExpiry = new Date(Date.now() + 3 * 60 * 1000)
        message = 'OTP baru telah dikirim. Silakan verifikasi email Anda.'

        console.log(`[Register API] Generating new OTP: ${finalOTP}, expires at: ${finalOTPExpiry}`)
      }

      // UPDATE user yang sudah ada (bukan create baru)
      // Update nama dan password dengan input baru
      const hashedPassword = await bcrypt.hash(password, 10)

      const updatedUser = await db.user.update({
        where: { email },
        data: {
          name,                    // Update nama
          password: hashedPassword,  // Update password
          otp: finalOTP,
          otpExpiry: finalOTPExpiry,
          isVerified: false
        }
      })

      console.log(`[Register API] Updated unverified user: ${updatedUser.id}`)

      return NextResponse.json({
        ok: true,
        message,
        user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name },
        otp: finalOTP,
        otpExpiry: finalOTPExpiry.toISOString(),
        isDevelopment: process.env.NODE_ENV !== 'production'
      })
    }

    // Password policy validation (minimum 8 characters)
    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      console.log(`[Register API] Password validation failed: ${passwordValidation.errors.join(', ')}`)
      return NextResponse.json({
        message: passwordValidation.errors[0],
        validation: passwordValidation
      }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(`[Register API] Password hashed successfully for ${email}`)

    // Generate OTP (valid for 3 minutes)
    const otp = generateOTP(6)
    const otpExpiry = new Date(Date.now() + 3 * 60 * 1000) // 3 minutes from now

    console.log(`[Register API] Generated OTP for ${email}: ${otp}`)
    console.log(`[Register API] OTP expires at: ${otpExpiry.toISOString()}`)

    // Create user with OTP
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'USER',
        otp,
        otpExpiry,
        isVerified: false
      }
    })

    console.log(`[Register API] User created successfully: ${user.id}, ${user.email}`)

    // Return success with OTP (for development)
    return NextResponse.json({
      ok: true,
      message: MESSAGE_CODES.REGISTRATION_SUCCESS,
      user: { id: user.id, email: user.email, name: user.name },
      // Include OTP in development mode (for frontend display)
      otp: otp,
      otpExpiry: otpExpiry.toISOString(),
      isDevelopment: process.env.NODE_ENV !== 'production'
    })
  } catch (err) {
    console.error('[Register API] Error:', err)
    return NextResponse.json({ message: 'Server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
