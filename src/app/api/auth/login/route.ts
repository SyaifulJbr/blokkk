import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { checkRateLimit, getClientIP, isAccountLocked, getTimeUntilUnlock, getLoginDelayMs, shouldDelayLogin } from '@/lib/auth-utils'

export async function POST(req: Request) {
  try {
    console.log('[Login API] Processing login request')

    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      console.log('[Login API] Missing credentials')
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(req)
    const rateLimitKey = `login:${clientIP}:${email}`

    console.log(`[Login API] Client IP: ${clientIP}, Email: ${email}`)

    // Check rate limit (3 requests per 5 minutes)
    const rateLimitResult = checkRateLimit(rateLimitKey, 3, 5 * 60 * 1000)

    if (!rateLimitResult.allowed) {
      const resetDate = new Date(rateLimitResult.resetTime)
      const minutesRemaining = Math.ceil((rateLimitResult.resetTime - Date.now()) / 60000)
      console.log(`[Login API] Rate limit exceeded for ${email}. Resets at ${resetDate.toISOString()}`)
      return NextResponse.json({
        message: `Too many attempts. Please try again in ${minutesRemaining} minutes.`,
        retryAfter: rateLimitResult.resetTime
      }, { status: 429 })
    }

    // Find user
    const user = await db.user.findUnique({ where: { email } })
    if (!user) {
      console.log(`[Login API] User not found: ${email}`)
      return NextResponse.json({ message: 'Email or password incorrect' }, { status: 401 })
    }

    console.log(`[Login API] User found: ${user.id}, ${user.email}`)
    console.log(`[Login API] Failed attempts: ${user.failedAttempts}`)
    console.log(`[Login API] Lock until: ${user.lockUntil?.toISOString()}`)
    console.log(`[Login API] Is verified: ${user.isVerified}`)

    // Check if user is verified
    if (!user.isVerified) {
      console.log(`[Login API] User not verified: ${email}`)
      return NextResponse.json({
        message: 'Email belum diverifikasi. Silakan verifikasi email Anda terlebih dahulu.',
        requiresVerification: true
      }, { status: 403 })
    }

    // Check if account is locked
    if (isAccountLocked(user.failedAttempts, user.lockUntil)) {
      const timeRemaining = getTimeUntilUnlock(user.lockUntil)
      const minutesRemaining = Math.ceil(timeRemaining / 60000)

      console.log(`[Login API] Account locked for ${email}. Time remaining: ${timeRemaining}ms`)

      return NextResponse.json({
        message: `Account locked due to too many failed attempts. Please try again in ${minutesRemaining} minutes.`,
        locked: true,
        timeRemaining
      }, { status: 423 })
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      // Increment failed attempts
      const newFailedAttempts = user.failedAttempts + 1
      let lockUntil = user.lockUntil

      console.log(`[Login API] Password mismatch. New failed attempts: ${newFailedAttempts}`)

      // Check if account should be locked (5 failed attempts)
      if (newFailedAttempts >= 5) {
        const lockoutDuration = newFailedAttempts === 5 ? 5 * 60 * 1000 : 15 * 60 * 1000 // 5 min for first lockout, 15 min for subsequent
        lockUntil = new Date(Date.now() + lockoutDuration)

        console.log(`[Login API] Account locked for ${email} until ${lockUntil.toISOString()}`)
      }

      // Update user with failed attempts
      await db.user.update({
        where: { email },
        data: {
          failedAttempts: newFailedAttempts,
          lockUntil
        }
      })

      // Apply progressive delay for login attempts (starting from 3rd attempt)
      if (shouldDelayLogin(newFailedAttempts)) {
        const delayMs = getLoginDelayMs(newFailedAttempts)
        console.log(`[Login API] Applying delay: ${delayMs}ms`)
        await new Promise(resolve => setTimeout(resolve, delayMs))
      }

      const remainingAttempts = 5 - newFailedAttempts
      return NextResponse.json({
        message: `Email or password incorrect. ${remainingAttempts > 0 ? `Remaining attempts: ${remainingAttempts}` : 'Account locked.'}`,
        remainingAttempts
      }, { status: 401 })
    }

    // Password is correct - reset failed attempts and login
    console.log(`[Login API] Password correct for ${email}`)

    const updatedUser = await db.user.update({
      where: { email },
      data: {
        failedAttempts: 0,
        lockUntil: null
      }
    })

    console.log(`[Login API] User logged in successfully: ${updatedUser.id}, ${updatedUser.email}`)

    return NextResponse.json({
      ok: true,
      message: 'Login successful',
      user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, role: updatedUser.role }
    })
  } catch (err) {
    console.error('[Login API] Error:', err)
    return NextResponse.json({ message: 'Server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
