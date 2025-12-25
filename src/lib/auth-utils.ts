// Password Policy Enforcement
export interface PasswordValidationResult {
  isValid: boolean
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  score: number
  errors: string[]
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  let score = 0

  // Minimum 8 characters (wajib)
  if (password.length < 8) {
    errors.push('Password harus minimal 8 karakter')
  } else {
    score += 1
  }

  // Cek uppercase
  if (/[A-Z]/.test(password)) {
    score += 1
  }

  // Cek lowercase
  if (/[a-z]/.test(password)) {
    score += 1
  }

  // Cek angka
  if (/[0-9]/.test(password)) {
    score += 1
  }

  // Cek karakter unik
  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1
  }

  // Determine strength
  let strength: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak'
  if (score >= 4) {
    strength = 'very-strong'
  } else if (score === 3) {
    strength = 'strong'
  } else if (score === 2) {
    strength = 'medium'
  } else {
    strength = 'weak'
  }

  // Password valid jika minimal 8 karakter (tidak butuh karakter unik)
  const isValid = password.length >= 8

  return {
    isValid,
    strength,
    score,
    errors
  }
}

// OTP Generation and Validation
export function generateOTP(length: number = 6): string {
  const digits = '0123456789'
  let otp = ''
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)]
  }
  return otp
}

export function isOTPValid(otpExpiry: Date | null): boolean {
  if (!otpExpiry) return false
  return new Date() < otpExpiry
}

// Rate Limiting (in-memory)
interface RateLimitEntry {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 3,
  windowMs: number = 5 * 60 * 1000 // 5 minutes
): { allowed: boolean; remainingRequests: number; resetTime: number } {
  const now = Date.now()

  // Get existing entry or create new one
  let entry = rateLimitStore.get(identifier)

  // Reset if window has expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 1,
      resetTime: now + windowMs
    }
    rateLimitStore.set(identifier, entry)
    console.log(`[RateLimit] New entry for ${identifier}: count=${entry.count}, resetTime=${new Date(entry.resetTime).toISOString()}`)
    return {
      allowed: true,
      remainingRequests: maxRequests - 1,
      resetTime: entry.resetTime
    }
  }

  // Increment count
  entry.count += 1
  rateLimitStore.set(identifier, entry)

  const remainingRequests = Math.max(0, maxRequests - entry.count)
  const allowed = entry.count <= maxRequests

  console.log(`[RateLimit] ${identifier}: count=${entry.count}/${maxRequests}, allowed=${allowed}, remaining=${remainingRequests}`)

  return {
    allowed,
    remainingRequests,
    resetTime: entry.resetTime
  }
}

export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier)
  console.log(`[RateLimit] Reset for ${identifier}`)
}

// Account Lockout
export function calculateLockoutDuration(failedAttempts: number): number {
  // Progressive delay:
  // 1st attempt: 0s
  // 2nd attempt: 30s
  // 3rd attempt: 60s
  // 4th attempt: 120s
  // 5th attempt: 300s (5 minutes)
  // 6th+ attempt: 900s (15 minutes)
  const delays = [0, 30, 60, 120, 300, 900]
  const index = Math.min(failedAttempts, delays.length - 1)
  return delays[index] * 1000 // Convert to milliseconds
}

export function isAccountLocked(failedAttempts: number, lockUntil: Date | null): boolean {
  if (failedAttempts < 5 || !lockUntil) return false
  return new Date() < lockUntil
}

export function getTimeUntilUnlock(lockUntil: Date | null): number {
  if (!lockUntil) return 0
  return Math.max(0, lockUntil.getTime() - Date.now())
}

// Progressive delay for login attempts
export function shouldDelayLogin(failedAttempts: number): boolean {
  // Apply delay starting from 3rd failed attempt
  return failedAttempts >= 3
}

export function getLoginDelayMs(failedAttempts: number): number {
  // Progressive delay for login:
  // 1-2 attempts: 0s
  // 3rd attempt: 2s
  // 4th attempt: 5s
  // 5th attempt: 10s
  const delays = [0, 0, 2000, 5000, 10000]
  const index = Math.min(failedAttempts, delays.length - 1)
  return delays[index]
}

// Utility to get client IP from request
export function getClientIP(request: Request): string {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  if (cfConnectingIP) {
    return cfConnectingIP
  }

  return 'unknown'
}
